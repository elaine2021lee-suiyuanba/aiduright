// AiduRight — AI assistant chat
//
// Loaded after app.js. Owns the #ai-modal dialog: opening it from a question's
// "Ask AI" link, streaming replies from the Worker, and keyboard/focus handling.
//
// The transcript lives in `history` and nowhere else — it is dropped when the
// modal closes, and never written to localStorage.

(function () {
    'use strict';

    // The Cloudflare Worker that holds ANTHROPIC_API_KEY. Override before this
    // script loads (e.g. to point at `wrangler dev`) with:
    //   <script>window.AIDURIGHT_AI_ENDPOINT = 'http://127.0.0.1:8787';</script>
    const ENDPOINT = window.AIDURIGHT_AI_ENDPOINT ||
        'https://aiduright-ai.aiduright.workers.dev';

    const modal = document.getElementById('ai-modal');
    const panel = modal.querySelector('.ai-panel');
    const log = document.getElementById('ai-log');
    const form = document.getElementById('ai-form');
    const input = document.getElementById('ai-input');
    const sendBtn = form.querySelector('.ai-send');

    let history = [];        // [{ role, content }] — the conversation, in memory only
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

    function addBubble(role, text) {
        const el = document.createElement('div');
        el.className = 'ai-msg ai-msg-' + role;
        el.textContent = clean(text);
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
        panel.classList.toggle('is-sending', on);
    }

    // Grows the textarea with its content, up to the CSS max-height.
    function autosize() {
        input.style.height = 'auto';
        input.style.height = input.scrollHeight + 'px';
    }

    // ---------------------------------------------------------------- network

    async function ask(text) {
        history.push({ role: 'user', content: text });
        addBubble('user', text);

        setSending(true);
        const pending = addBubble('assistant', '');
        pending.classList.add('is-streaming');
        pending.textContent = t('aiThinking');

        let answer = '';
        let failure = null;

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
                failure = res.status === 429 ? 'aiErrorBusy' : 'aiError';
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
                        } else if (event.type === 'error') {
                            failure = event.code === 'busy' ? 'aiErrorBusy'
                                : event.code === 'refusal' ? 'aiErrorRefusal'
                                : 'aiError';
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
        } else {
            pending.remove();
            // The failed turn is dropped so a retry doesn't resend a dangling
            // user message the model never answered.
            history.pop();
        }
        if (failure) addNotice(failure);

        setSending(false);
        if (!modal.hidden) input.focus();
    }

    // ---------------------------------------------------------------- open/close

    function open(q) {
        question = q || null;
        history = [];
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
        // Drop the transcript: nothing about this chat outlives the modal.
        history = [];
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
        if (!text || sending) return;
        input.value = '';
        autosize();
        ask(text);
    });

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
