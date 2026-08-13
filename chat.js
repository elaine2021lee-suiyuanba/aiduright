// AiduRight — AI assistant chat
//
// Loaded after app.js. Owns the #ai-modal dialog: opening it from a question's
// "Ask AI" link, streaming replies from the Worker, and keyboard/focus handling.
//
// The transcript lives in `history` and nowhere else — it is dropped when the
// modal closes, and never written to localStorage. Photos are held the same
// way: resized in a canvas, kept as base64 in memory, never uploaded anywhere
// but the Worker and never stored as a file on either end.

(function () {
    'use strict';

    // The Cloudflare Worker that holds ANTHROPIC_API_KEY. Override before this
    // script loads (e.g. to point at `wrangler dev`) with:
    //   <script>window.AIDURIGHT_AI_ENDPOINT = 'http://127.0.0.1:8787';</script>
    const ENDPOINT = window.AIDURIGHT_AI_ENDPOINT ||
        'https://aiduright-ai.aiduright.workers.dev';

    // Photos are downscaled before sending: a phone camera file is several
    // megabytes and far more pixels than the model reads, so shipping the
    // original would cost the user's data plan and our token budget for nothing.
    const MAX_EDGE = 2000;          // px on the long edge — keeps small print legible
    const JPEG_QUALITY = 0.85;
    const MAX_IMAGES = 2;           // per message; the Worker enforces this too

    const modal = document.getElementById('ai-modal');
    const panel = modal.querySelector('.ai-panel');
    const log = document.getElementById('ai-log');
    const form = document.getElementById('ai-form');
    const input = document.getElementById('ai-input');
    const sendBtn = form.querySelector('.ai-send');
    const attachments = document.getElementById('ai-attachments');
    const photoInput = document.getElementById('ai-photo-input');
    const cameraInput = document.getElementById('ai-camera-input');
    const photoBtn = document.getElementById('ai-photo-btn');
    const cameraBtn = document.getElementById('ai-camera-btn');

    let history = [];        // [{ role, content }] — the conversation, in memory only
    let pendingImages = [];  // [{ dataUrl, base64 }] staged for the next message
    let question = null;     // the questionnaire question the chat was opened from
    let sending = false;
    let lastFocused = null;  // element to restore focus to on close

    // ---------------------------------------------------------------- render

    // Model output is inserted as a text node into a `white-space: pre-wrap`
    // element, so newlines and "- " bullets render as written with no parsing
    // and no HTML injection surface. `**` is stripped since we don't style it.
    function clean(text) {
        return text.replace(/\*\*/g, '');
    }

    function addBubble(role, text, images) {
        const el = document.createElement('div');
        el.className = 'ai-msg ai-msg-' + role;
        if (images && images.length) {
            const strip = document.createElement('div');
            strip.className = 'ai-msg-images';
            for (const image of images) {
                const thumb = document.createElement('img');
                thumb.src = image.dataUrl;
                thumb.alt = t('aiPhotoAlt');
                strip.appendChild(thumb);
            }
            el.appendChild(strip);
            const body = document.createElement('span');
            body.textContent = clean(text);
            el.appendChild(body);
        } else {
            // Assistant bubbles take this path, and streaming overwrites
            // textContent directly — keep them free of wrapper elements.
            el.textContent = clean(text);
        }
        log.appendChild(el);
        scrollToEnd();
        return el;
    }

    function addNotice(key) {
        const el = document.createElement('p');
        el.className = 'ai-notice';
        el.setAttribute('role', 'alert');
        el.textContent = t(key);
        log.appendChild(el);
        scrollToEnd();
    }

    function scrollToEnd() {
        log.scrollTop = log.scrollHeight;
    }

    function setSending(on) {
        sending = on;
        input.disabled = on;
        sendBtn.disabled = on;
        photoBtn.disabled = on;
        cameraBtn.disabled = on;
        panel.classList.toggle('is-sending', on);
    }

    // Grows the textarea with its content, up to the CSS max-height.
    function autosize() {
        input.style.height = 'auto';
        input.style.height = input.scrollHeight + 'px';
    }

    // ---------------------------------------------------------------- photos

    // Redraws the photo through a canvas at a bounded size. Two things fall out
    // of that: the payload drops from megabytes to a couple hundred kilobytes,
    // and everything arrives as JPEG — which sidesteps the phone-camera formats
    // (HEIC and friends) the API won't take. Browsers apply the EXIF rotation
    // when they decode, so a sideways phone photo lands upright.
    function shrink(file) {
        return new Promise((resolve, reject) => {
            const url = URL.createObjectURL(file);
            const img = new Image();
            img.onload = () => {
                URL.revokeObjectURL(url);
                const scale = Math.min(1, MAX_EDGE / Math.max(img.width, img.height));
                const canvas = document.createElement('canvas');
                canvas.width = Math.round(img.width * scale);
                canvas.height = Math.round(img.height * scale);
                canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
                const dataUrl = canvas.toDataURL('image/jpeg', JPEG_QUALITY);
                resolve({ dataUrl, base64: dataUrl.slice(dataUrl.indexOf(',') + 1) });
            };
            img.onerror = () => {
                URL.revokeObjectURL(url);
                reject(new Error('could not decode image'));
            };
            img.src = url;
        });
    }

    async function addPhotos(files) {
        for (const file of files) {
            if (pendingImages.length >= MAX_IMAGES) {
                addNotice('aiErrorPhotoCount');
                break;
            }
            if (!file.type.startsWith('image/')) {
                addNotice('aiErrorPhotoType');
                continue;
            }
            try {
                pendingImages.push(await shrink(file));
            } catch {
                addNotice('aiErrorPhotoRead');
            }
        }
        renderAttachments();
    }

    function renderAttachments() {
        attachments.innerHTML = '';
        attachments.hidden = pendingImages.length === 0;
        if (!pendingImages.length) return;

        pendingImages.forEach((image, i) => {
            const wrap = document.createElement('div');
            wrap.className = 'ai-thumb';

            const thumb = document.createElement('img');
            thumb.src = image.dataUrl;
            thumb.alt = '';

            const remove = document.createElement('button');
            remove.type = 'button';
            remove.textContent = '×';
            remove.setAttribute('aria-label', t('aiRemovePhoto'));
            remove.addEventListener('click', () => {
                pendingImages.splice(i, 1);
                renderAttachments();
                input.focus();
            });

            wrap.append(thumb, remove);
            attachments.appendChild(wrap);
        });

        // The reminder rides with the thumbnails rather than living only in the
        // header, so it's on screen at the moment someone is about to send a
        // photo of a letter with their SSN printed on it.
        const reminder = document.createElement('p');
        reminder.className = 'ai-photo-reminder';
        reminder.textContent = t('aiPhotoReminder');
        attachments.appendChild(reminder);
    }

    // ---------------------------------------------------------------- network

    // Both the Worker's error responses and its stream error events carry a
    // `code`; the human-readable text alongside it is English-only, so the code
    // is what we translate. Falls back to the HTTP status for responses that
    // never reached the Worker (a Cloudflare error page, say).
    function errorKey(code, status) {
        switch (code) {
            case 'too_long': return 'aiErrorTooLong';
            case 'message_too_long': return 'aiErrorMessageTooLong';
            case 'image_too_large': return 'aiErrorPhotoTooLarge';
            case 'too_many_images': return 'aiErrorPhotoCount';
            case 'bad_image': return 'aiErrorPhotoType';
            case 'busy': return 'aiErrorBusy';
            case 'refusal': return 'aiErrorRefusal';
        }
        return status === 429 ? 'aiErrorBusy' : 'aiError';
    }

    // A text-only turn stays a plain string; photos turn it into content blocks,
    // images first — the model reads the picture better when the question that
    // goes with it comes after.
    function buildContent(text, images) {
        if (!images.length) return text;
        const blocks = images.map(image => ({
            type: 'image',
            source: { type: 'base64', media_type: 'image/jpeg', data: image.base64 },
        }));
        if (text) blocks.push({ type: 'text', text });
        return blocks;
    }

    async function ask(text, images) {
        history.push({ role: 'user', content: buildContent(text, images) });
        addBubble('user', text, images);

        setSending(true);
        const pending = addBubble('assistant', '');
        pending.classList.add('is-streaming');
        pending.textContent = t('aiThinking');

        let answer = '';
        let failure = null;
        let truncated = false;

        try {
            const res = await fetch(ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: history,
                    lang: document.documentElement.lang || 'en',
                    question: question
                })
            });

            if (!res.ok) {
                const body = await res.json().catch(() => null);
                failure = errorKey(body && body.code, res.status);
            } else {
                // Newline-delimited JSON: {type:'delta'|'done'|'error', …}
                const reader = res.body.getReader();
                const decoder = new TextDecoder();
                let buffer = '';

                for (;;) {
                    const { value, done } = await reader.read();
                    if (done) break;
                    buffer += decoder.decode(value, { stream: true });

                    const lines = buffer.split('\n');
                    buffer = lines.pop();  // last piece may be a partial line

                    for (const line of lines) {
                        if (!line.trim()) continue;
                        let event;
                        try {
                            event = JSON.parse(line);
                        } catch {
                            continue;  // ignore a malformed frame rather than dropping the reply
                        }
                        if (event.type === 'delta') {
                            answer += event.text;
                            pending.textContent = clean(answer);
                            scrollToEnd();
                        } else if (event.type === 'done') {
                            // The reply hit the model's output cap mid-sentence.
                            truncated = Boolean(event.truncated);
                        } else if (event.type === 'error') {
                            failure = errorKey(event.code);
                        }
                    }
                }
            }
        } catch {
            // Network-level failure: offline, DNS, CORS, aborted connection.
            failure = 'aiErrorOffline';
        }

        pending.classList.remove('is-streaming');

        if (answer) {
            history.push({ role: 'assistant', content: answer });
            if (truncated) addNotice('aiTruncated');
        } else {
            pending.remove();
            // The failed turn is dropped so a retry doesn't resend a dangling
            // user message the model never answered.
            history.pop();
            // Nothing came back and nothing said why — don't leave the question
            // sitting there with no response at all.
            if (!failure) failure = 'aiError';
        }
        if (failure) addNotice(failure);

        setSending(false);
        if (!modal.hidden) input.focus();
    }

    // ---------------------------------------------------------------- open/close

    function open(q) {
        question = q || null;
        history = [];
        pendingImages = [];
        renderAttachments();
        log.innerHTML = '';
        addBubble('assistant', t('aiIntro'));

        lastFocused = document.activeElement;
        modal.hidden = false;
        document.body.classList.add('ai-open');
        input.value = '';
        autosize();
        // Defer so the panel is laid out before we move focus into it.
        requestAnimationFrame(() => input.focus());
    }

    function close() {
        if (modal.hidden) return;
        modal.hidden = true;
        document.body.classList.remove('ai-open');
        // Drop the transcript and any staged photos: nothing about this chat —
        // including the images — outlives the modal.
        history = [];
        pendingImages = [];
        renderAttachments();
        question = null;
        log.innerHTML = '';
        if (lastFocused && document.contains(lastFocused)) lastFocused.focus();
        lastFocused = null;
    }

    // Keeps Tab inside the dialog while it's open.
    function trapFocus(e) {
        const focusable = panel.querySelectorAll(
            'button:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }

    // ---------------------------------------------------------------- events

    modal.querySelectorAll('[data-ai-close]').forEach(el => {
        el.addEventListener('click', close);
    });

    document.addEventListener('keydown', e => {
        if (modal.hidden) return;
        if (e.key === 'Escape') {
            e.preventDefault();
            close();
        } else if (e.key === 'Tab') {
            trapFocus(e);
        }
    });

    form.addEventListener('submit', e => {
        e.preventDefault();
        const text = input.value.trim();
        // A photo on its own is a complete question — "what is this letter?" —
        // so it doesn't have to be accompanied by typing.
        if ((!text && !pendingImages.length) || sending) return;
        const images = pendingImages;
        pendingImages = [];
        renderAttachments();
        input.value = '';
        autosize();
        ask(text, images);
    });

    photoBtn.addEventListener('click', () => photoInput.click());
    cameraBtn.addEventListener('click', () => cameraInput.click());

    [photoInput, cameraInput].forEach(el => {
        el.addEventListener('change', () => {
            addPhotos(Array.from(el.files || []));
            el.value = '';  // so picking the same file twice still fires change
        });
    });

    // Paste and drag-and-drop, so a screenshot never has to be saved to disk
    // and fetched back through the file dialog.
    input.addEventListener('paste', e => {
        const files = Array.from((e.clipboardData && e.clipboardData.files) || []);
        if (files.length) {
            e.preventDefault();
            addPhotos(files);
        }
    });
    panel.addEventListener('dragover', e => e.preventDefault());
    panel.addEventListener('drop', e => {
        const files = Array.from((e.dataTransfer && e.dataTransfer.files) || []);
        if (files.length) {
            e.preventDefault();
            addPhotos(files);
        }
    });

    // `capture` is ignored on a desktop browser, where the camera button would
    // just open a second file dialog identical to the one beside it.
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
        cameraBtn.hidden = false;
    }

    // Enter sends; Shift+Enter adds a newline.
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            form.requestSubmit();
        }
    });

    input.addEventListener('input', autosize);

    // app.js calls this from the per-question "Ask AI" link.
    window.openAiChat = open;
})();
