// AiduRight - Main Application Logic

// State
let currentQuestion = 0;
let answers = {};

// DOM Elements
const screens = {
    intro: document.getElementById('intro'),
    questionnaire: document.getElementById('questionnaire'),
    loading: document.getElementById('loading'),
    results: document.getElementById('results')
};

const startBtn = document.getElementById('start-btn');
const backBtn = document.getElementById('back-btn');
const nextBtn = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const progressBar = document.getElementById('progress');

// Questions - will be expanded
const questions = [
    {
        id: 'age',
        text: 'What is your age?',
        type: 'select',
        options: [
            { value: 'under18', label: 'Under 18' },
            { value: '18-64', label: '18-64' },
            { value: '65plus', label: '65 or older' }
        ]
    },
    {
        id: 'income',
        text: 'What is your household monthly income?',
        type: 'select',
        options: [
            { value: 'under1500', label: 'Under $1,500' },
            { value: '1500-3000', label: '$1,500 - $3,000' },
            { value: '3000-5000', label: '$3,000 - $5,000' },
            { value: 'over5000', label: 'Over $5,000' }
        ]
    },
    {
        id: 'household',
        text: 'How many people live in your household?',
        type: 'select',
        options: [
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3-4', label: '3-4' },
            { value: '5plus', label: '5 or more' }
        ]
    },
    {
        id: 'state',
        text: 'What state do you live in?',
        type: 'select',
        options: [
            { value: 'CA', label: 'California' },
            { value: 'other', label: 'Other state' }
        ]
    }
];

// Show a screen
function showScreen(screenName) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[screenName].classList.add('active');
}

// Render current question
function renderQuestion() {
    const q = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = progress + '%';
    
    let html = `<h3>${q.text}</h3>`;
    html += '<div class="options">';
    
    q.options.forEach(opt => {
        const selected = answers[q.id] === opt.value ? 'selected' : '';
        html += `<div class="option ${selected}" data-value="${opt.value}">${opt.label}</div>`;
    });
    
    html += '</div>';
    questionContainer.innerHTML = html;
    
    // Add click listeners to options
    document.querySelectorAll('.option').forEach(opt => {
        opt.addEventListener('click', () => selectOption(opt.dataset.value));
    });
    
    // Update buttons
    backBtn.style.display = currentQuestion === 0 ? 'none' : 'block';
    nextBtn.textContent = currentQuestion === questions.length - 1 ? 'See Results' : 'Next';
}

// Select an option
function selectOption(value) {
    const q = questions[currentQuestion];
    answers[q.id] = value;
    
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.toggle('selected', opt.dataset.value === value);
    });
}

// Match benefits based on answers
function matchBenefits() {
    const matched = [];
    
    benefits.forEach(benefit => {
        if (checkEligibility(benefit, answers)) {
            matched.push(benefit);
        }
    });
    
    return matched;
}

// Check if user is eligible for a benefit
function checkEligibility(benefit, answers) {
    // Simple matching logic - will be expanded
    for (const [key, value] of Object.entries(benefit.requirements)) {
        if (answers[key] && !value.includes(answers[key])) {
            return false;
        }
    }
    return true;
}

// Render results
function renderResults(matchedBenefits) {
    let html = `<h2>You may qualify for ${matchedBenefits.length} programs</h2>`;
    
    if (matchedBenefits.length === 0) {
        html += '<p>Based on your answers, we did not find matching programs. This does not mean you are ineligible - please check official resources.</p>';
    } else {
        matchedBenefits.forEach(b => {
            html += `
                <div class="result-card">
                    <h3>${b.name}</h3>
                    <p>${b.description}</p>
                    <a href="${b.url}" target="_blank" class="learn-more">Learn how to apply →</a>
                </div>
            `;
        });
    }
    
    html += '<button id="restart-btn" class="btn-secondary" style="margin-top: 1rem;">Start Over</button>';
    screens.results.innerHTML = html;
    
    document.getElementById('restart-btn').addEventListener('click', () => {
        currentQuestion = 0;
        answers = {};
        showScreen('intro');
    });
}

// Event Listeners
startBtn.addEventListener('click', () => {
    showScreen('questionnaire');
    renderQuestion();
});

backBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
});

nextBtn.addEventListener('click', () => {
    const q = questions[currentQuestion];
    if (!answers[q.id]) {
        alert('Please select an answer');
        return;
    }
    
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion();
    } else {
        // Show results
        showScreen('loading');
        setTimeout(() => {
            const matched = matchBenefits();
            renderResults(matched);
            showScreen('results');
        }, 1000);
    }
});
