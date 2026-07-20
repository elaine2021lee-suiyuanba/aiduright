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

// Questions - comprehensive
const questions = [
    {
        id: 'state',
        text: 'What state do you live in?',
        type: 'select',
        options: [
            { value: 'CA', label: 'California' },
            { value: 'other', label: 'Other state' }
        ]
    },
    {
        id: 'age',
        text: 'How old are you?',
        type: 'select',
        options: [
            { value: 'under18', label: 'Under 18' },
            { value: '18-59', label: '18-59' },
            { value: '60-64', label: '60-64' },
            { value: '65plus', label: '65 or older' }
        ]
    },
    {
        id: 'household_size',
        text: 'How many people live in your household (including you)?',
        type: 'select',
        options: [
            { value: '1', label: '1 (just me)' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' },
            { value: '5', label: '5' },
            { value: '6', label: '6' },
            { value: '7', label: '7' },
            { value: '8plus', label: '8 or more' }
        ]
    },
    {
        id: 'monthly_income',
        text: 'What is your household\'s total monthly income (before taxes)?',
        type: 'select',
        options: [
            { value: '0', label: '$0 (no income)' },
            { value: '500', label: 'Under $500' },
            { value: '1000', label: '$500 - $1,000' },
            { value: '1500', label: '$1,000 - $1,500' },
            { value: '2000', label: '$1,500 - $2,000' },
            { value: '2500', label: '$2,000 - $2,500' },
            { value: '3000', label: '$2,500 - $3,000' },
            { value: '4000', label: '$3,000 - $4,000' },
            { value: '5000', label: '$4,000 - $5,000' },
            { value: '6000', label: '$5,000 - $6,000' },
            { value: '8000', label: '$6,000 - $8,000' },
            { value: '10000', label: 'Over $8,000' }
        ]
    },
    {
        id: 'citizenship',
        text: 'What is your immigration status?',
        type: 'select',
        options: [
            { value: 'citizen', label: 'U.S. Citizen' },
            { value: 'green_card', label: 'Green Card (Permanent Resident)' },
            { value: 'refugee', label: 'Refugee or Asylee' },
            { value: 'qualified_immigrant', label: 'Other qualified immigrant' },
            { value: 'daca', label: 'DACA' },
            { value: 'undocumented', label: 'Undocumented' },
            { value: 'other_visa', label: 'Other visa (work, student, etc.)' }
        ]
    },
    {
        id: 'has_children',
        text: 'Do you have children under 18 in your household?',
        type: 'select',
        options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
        ]
    },
    {
        id: 'children_ages',
        text: 'What are the ages of your children?',
        type: 'multiselect',
        showIf: (answers) => answers.has_children === 'yes',
        options: [
            { value: 'under1', label: 'Under 1 year' },
            { value: '1-4', label: '1-4 years old' },
            { value: '5-12', label: '5-12 years old (school age)' },
            { value: '13-17', label: '13-17 years old' }
        ]
    },
    {
        id: 'pregnant',
        text: 'Are you or anyone in your household currently pregnant?',
        type: 'select',
        options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
        ]
    },
    {
        id: 'employment',
        text: 'What is your current employment status?',
        type: 'select',
        options: [
            { value: 'employed', label: 'Employed' },
            { value: 'self_employed', label: 'Self-employed' },
            { value: 'unemployed', label: 'Unemployed, looking for work' },
            { value: 'disabled', label: 'Unable to work (disabled)' },
            { value: 'retired', label: 'Retired' },
            { value: 'student', label: 'Student' },
            { value: 'caregiver', label: 'Caregiver / Stay-at-home parent' }
        ]
    },
    {
        id: 'has_disability',
        text: 'Do you or anyone in your household have a disability?',
        type: 'select',
        options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
        ]
    },
    {
        id: 'health_insurance',
        text: 'Do you currently have health insurance?',
        type: 'select',
        options: [
            { value: 'none', label: 'No insurance' },
            { value: 'medi-cal', label: 'Medi-Cal' },
            { value: 'medicare', label: 'Medicare' },
            { value: 'employer', label: 'Employer insurance' },
            { value: 'covered_ca', label: 'Covered California' },
            { value: 'other', label: 'Other insurance' }
        ]
    },
    {
        id: 'housing',
        text: 'What is your current housing situation?',
        type: 'select',
        options: [
            { value: 'rent', label: 'Renting' },
            { value: 'own', label: 'Own my home' },
            { value: 'living_with', label: 'Living with family/friends' },
            { value: 'homeless', label: 'Homeless or at risk' },
            { value: 'shelter', label: 'Shelter or transitional housing' }
        ]
    },
    {
        id: 'needs_help',
        text: 'What do you need help with? (Select all that apply)',
        type: 'multiselect',
        options: [
            { value: 'healthcare', label: 'Health insurance or medical care' },
            { value: 'food', label: 'Food and groceries' },
            { value: 'rent', label: 'Rent or housing' },
            { value: 'utilities', label: 'Utility bills (electric, gas, internet)' },
            { value: 'cash', label: 'Cash / money for basics' },
            { value: 'childcare', label: 'Childcare' },
            { value: 'senior_care', label: 'Senior care / in-home help' },
            { value: 'job', label: 'Job training or employment' }
        ]
    }
];

// Show a screen
function showScreen(screenName) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[screenName].classList.add('active');
}

// Check if question should be shown
function shouldShowQuestion(question) {
    if (!question.showIf) return true;
    return question.showIf(answers);
}

// Get visible questions
function getVisibleQuestions() {
    return questions.filter(q => shouldShowQuestion(q));
}

// Render current question
function renderQuestion() {
    const visibleQuestions = getVisibleQuestions();
    const q = visibleQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / visibleQuestions.length) * 100;
    progressBar.style.width = progress + '%';
    
    let html = `<h3>${q.text}</h3>`;
    html += '<div class="options">';
    
    if (q.type === 'multiselect') {
        const selected = answers[q.id] || [];
        q.options.forEach(opt => {
            const isSelected = selected.includes(opt.value) ? 'selected' : '';
            html += `<div class="option ${isSelected}" data-value="${opt.value}">${opt.label}</div>`;
        });
    } else {
        q.options.forEach(opt => {
            const selected = answers[q.id] === opt.value ? 'selected' : '';
            html += `<div class="option ${selected}" data-value="${opt.value}">${opt.label}</div>`;
        });
    }
    
    html += '</div>';
    questionContainer.innerHTML = html;
    
    // Add click listeners to options
    document.querySelectorAll('.option').forEach(opt => {
        opt.addEventListener('click', () => selectOption(q, opt.dataset.value));
    });
    
    // Update buttons
    backBtn.style.display = currentQuestion === 0 ? 'none' : 'block';
    nextBtn.textContent = currentQuestion === visibleQuestions.length - 1 ? 'See Results' : 'Next';
}

// Select an option
function selectOption(question, value) {
    if (question.type === 'multiselect') {
        if (!answers[question.id]) answers[question.id] = [];
        const idx = answers[question.id].indexOf(value);
        if (idx > -1) {
            answers[question.id].splice(idx, 1);
        } else {
            answers[question.id].push(value);
        }
    } else {
        answers[question.id] = value;
    }
    
    // Re-render to update selection
    renderQuestion();
}

// Calculate FPL percentage
function calculateFPLPercent() {
    const income = parseInt(answers.monthly_income) || 0;
    let householdSize = parseInt(answers.household_size) || 1;
    if (answers.household_size === '8plus') householdSize = 8;
    
    const fpl = fpl2024Monthly[householdSize];
    return Math.round((income / fpl) * 100);
}

// Match benefits based on answers
function matchBenefits() {
    const matched = [];
    const fplPercent = calculateFPLPercent();
    
    benefits.forEach(benefit => {
        if (checkEligibility(benefit, fplPercent)) {
            matched.push(benefit);
        }
    });
    
    return matched;
}

// Check if user is eligible for a benefit
function checkEligibility(benefit, fplPercent) {
    const req = benefit.requirements;
    
    // State check
    if (req.state && !req.state.includes(answers.state)) {
        return false;
    }
    
    // Age check
    if (req.age) {
        const userAge = answers.age;
        if (!req.age.includes(userAge)) {
            // Special handling for 60plus including 65plus
            if (req.age.includes('60plus') && (userAge === '60-64' || userAge === '65plus')) {
                // OK
            } else if (req.age.includes('65plus') && userAge !== '65plus') {
                return false;
            } else {
                return false;
            }
        }
    }
    
    // Income FPL check
    if (req.income_fpl && fplPercent > req.income_fpl) {
        return false;
    }
    
    // Income FPL range check
    if (req.income_fpl_min && fplPercent < req.income_fpl_min) {
        return false;
    }
    if (req.income_fpl_max && fplPercent > req.income_fpl_max) {
        return false;
    }
    
    // Citizenship check
    if (req.citizenship && !req.citizenship.includes(answers.citizenship)) {
        return false;
    }
    
    // Children check
    if (req.has_children && answers.has_children !== 'yes') {
        return false;
    }
    
    // No children check
    if (req.no_children && answers.has_children === 'yes') {
        return false;
    }
    
    // School age children check
    if (req.has_school_age_children) {
        const childAges = answers.children_ages || [];
        if (!childAges.includes('5-12') && !childAges.includes('13-17')) {
            return false;
        }
    }
    
    // Children under 5 check (for WIC)
    if (req.has_children_under_5) {
        const childAges = answers.children_ages || [];
        const pregnant = answers.pregnant === 'yes';
        if (!childAges.includes('under1') && !childAges.includes('1-4') && !pregnant) {
            return false;
        }
    }
    
    // Household size minimum
    if (req.household_size_min) {
        let size = parseInt(answers.household_size) || 1;
        if (answers.household_size === '8plus') size = 8;
        if (size < req.household_size_min) {
            return false;
        }
    }
    
    // Medi-Cal requirement
    if (req.on_medi_cal && answers.health_insurance !== 'medi-cal') {
        return false;
    }
    
    // Has earned income (for EITC)
    if (req.has_earned_income) {
        if (!['employed', 'self_employed'].includes(answers.employment)) {
            return false;
        }
    }
    
    // Has disability check
    if (req.has_disability && answers.has_disability !== 'yes') {
        return false;
    }
    
    // Has work history check (for SDI, PFL - must be employed or self-employed)
    if (req.has_work_history) {
        if (!['employed', 'self_employed'].includes(answers.employment)) {
            return false;
        }
    }
    
    // Student or has student children check (for Pell Grant, Cal Grant)
    if (req.student_or_child_student) {
        const isStudent = answers.employment === 'student';
        const hasTeenChildren = (answers.children_ages || []).includes('13-17');
        if (!isStudent && !hasTeenChildren) {
            return false;
        }
    }
    
    // Age OR disability check (for IHSS - 65+ OR has disability)
    if (req.age_or_disability) {
        const is65plus = answers.age === '65plus';
        const hasDisability = answers.has_disability === 'yes';
        if (!is65plus && !hasDisability) {
            return false;
        }
    }
    
    // Age OR disability OR low income check (for transit discounts)
    if (req.age_or_disability_or_low_income) {
        const is60plus = answers.age === '60-64' || answers.age === '65plus';
        const hasDisability = answers.has_disability === 'yes';
        const lowIncome = fplPercent <= 200;
        if (!is60plus && !hasDisability && !lowIncome) {
            return false;
        }
    }
    
    // Employment or school check (for childcare assistance)
    if (req.employment_or_school) {
        const working = ['employed', 'self_employed'].includes(answers.employment);
        const inSchool = answers.employment === 'student';
        if (!working && !inSchool) {
            return false;
        }
    }
    
    return true;
}

// Render results
function renderResults(matchedBenefits) {
    // Group by category
    const grouped = {};
    matchedBenefits.forEach(b => {
        if (!grouped[b.category]) grouped[b.category] = [];
        grouped[b.category].push(b);
    });
    
    let html = `<h2>You may qualify for ${matchedBenefits.length} programs</h2>`;
    
    // Disclaimer
    html += '<div class="disclaimer-box">⚠️ These are preliminary matches based on basic criteria. Actual eligibility depends on additional factors. Always verify with the official program before applying.</div>';
    
    if (matchedBenefits.length === 0) {
        html += '<p>Based on your answers, we did not find matching programs. This does not mean you are ineligible - please check official resources or contact 211 for help.</p>';
    } else {
        html += '<p>Review each program below. Click "Learn how to apply" for next steps.</p>';
        
        for (const [catId, benefits] of Object.entries(grouped)) {
            const cat = categories[catId];
            html += `<h3 style="margin-top: 1.5rem;">${cat.icon} ${cat.name}</h3>`;
            
            benefits.forEach(b => {
                html += `
                    <div class="result-card">
                        <h3>${b.name}</h3>
                        <p>${b.description}</p>
                        <a href="${b.url}" target="_blank" class="learn-more">Learn how to apply →</a>
                    </div>
                `;
            });
        }
    }
    
    html += '<button id="restart-btn" class="btn-secondary" style="margin-top: 1.5rem;">Start Over</button>';
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
    const visibleQuestions = getVisibleQuestions();
    const q = visibleQuestions[currentQuestion];
    
    // Validate
    if (q.type === 'multiselect') {
        // Multiselect can be empty
    } else if (!answers[q.id]) {
        alert('Please select an answer');
        return;
    }
    
    if (currentQuestion < visibleQuestions.length - 1) {
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
