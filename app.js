// AiduRight - Main Application Logic

// State
let currentQuestion = 0;
let answers = {};
let questionMode = 'basic'; // 'basic' or 'detailed'
let basicResultsShown = false;

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

// ========== BASIC QUESTIONS (Quick Scan - ~15 questions) ==========
const basicQuestions = [
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
            { value: 'employed', label: 'Employed (full-time or part-time)' },
            { value: 'self_employed', label: 'Self-employed' },
            { value: 'student_working', label: 'Student with part-time job' },
            { value: 'student', label: 'Student (not working)' },
            { value: 'unemployed', label: 'Unemployed, looking for work' },
            { value: 'disabled', label: 'Unable to work (disabled)' },
            { value: 'retired', label: 'Retired' },
            { value: 'caregiver', label: 'Caregiver / Stay-at-home parent' }
        ]
    },
    {
        id: 'recently_lost_job',
        text: 'Did you lose your job in the past 12 months?',
        type: 'select',
        showIf: (answers) => answers.employment === 'unemployed',
        options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No, unemployed longer' }
        ]
    },
    {
        id: 'is_veteran',
        text: 'Are you or anyone in your household a U.S. military veteran?',
        type: 'select',
        options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
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
        id: 'has_chronic_condition',
        text: 'Do you have any chronic health conditions? (diabetes, heart disease, etc.)',
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
            { value: 'shelter', label: 'Shelter or transitional housing' },
            { value: 'rural', label: 'Renting/owning in rural area' }
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
            { value: 'education', label: 'Education / college' },
            { value: 'senior_care', label: 'Senior care / in-home help' },
            { value: 'job', label: 'Job training or employment' },
            { value: 'legal', label: 'Legal help' }
        ]
    }
];

// ========== DETAILED QUESTIONS (Deep Scan - for unlocking more benefits) ==========
const detailedQuestions = [
    {
        id: 'exact_annual_income',
        text: 'What is your household\'s exact annual income? (Check your tax return or pay stubs)',
        type: 'select',
        options: [
            { value: '0', label: '$0' },
            { value: '10000', label: 'Under $10,000' },
            { value: '15000', label: '$10,000 - $15,000' },
            { value: '20000', label: '$15,000 - $20,000' },
            { value: '25000', label: '$20,000 - $25,000' },
            { value: '30000', label: '$25,000 - $30,000' },
            { value: '40000', label: '$30,000 - $40,000' },
            { value: '50000', label: '$40,000 - $50,000' },
            { value: '60000', label: '$50,000 - $60,000' },
            { value: '75000', label: '$60,000 - $75,000' },
            { value: '100000', label: '$75,000 - $100,000' },
            { value: '150000', label: '$100,000 - $150,000' },
            { value: '200000', label: '$150,000 - $200,000' },
            { value: '250000', label: 'Over $200,000' }
        ]
    },
    {
        id: 'total_assets',
        text: 'What is the total value of your savings, investments, and property? (Not counting your primary home and one car)',
        type: 'select',
        options: [
            { value: '0', label: 'Under $2,000' },
            { value: '2000', label: '$2,000 - $5,000' },
            { value: '5000', label: '$5,000 - $10,000' },
            { value: '10000', label: '$10,000 - $25,000' },
            { value: '25000', label: '$25,000 - $50,000' },
            { value: '50000', label: '$50,000 - $100,000' },
            { value: '100000', label: 'Over $100,000' }
        ]
    },
    {
        id: 'immigration_years',
        text: 'If you are an immigrant, how long have you been in the U.S.?',
        type: 'select',
        showIf: (answers) => !['citizen'].includes(answers.citizenship),
        options: [
            { value: 'under1', label: 'Less than 1 year' },
            { value: '1-5', label: '1-5 years' },
            { value: '5-7', label: '5-7 years' },
            { value: '7plus', label: 'More than 7 years' }
        ]
    },
    {
        id: 'refugee_arrival',
        text: 'If you are a refugee/asylee, did you arrive in the past 8 months?',
        type: 'select',
        showIf: (answers) => answers.citizenship === 'refugee',
        options: [
            { value: 'yes', label: 'Yes, within 8 months' },
            { value: 'no', label: 'No, more than 8 months ago' }
        ]
    },
    {
        id: 'disability_type',
        text: 'What type of disability? (Select all that apply)',
        type: 'multiselect',
        showIf: (answers) => answers.has_disability === 'yes',
        options: [
            { value: 'physical', label: 'Physical / mobility' },
            { value: 'visual', label: 'Blind or low vision' },
            { value: 'hearing', label: 'Deaf or hard of hearing' },
            { value: 'cognitive', label: 'Cognitive / intellectual' },
            { value: 'mental', label: 'Mental health condition' },
            { value: 'chronic', label: 'Chronic illness' }
        ]
    },
    {
        id: 'receives_ssi_ssdi',
        text: 'Do you currently receive SSI or SSDI?',
        type: 'select',
        showIf: (answers) => answers.has_disability === 'yes',
        options: [
            { value: 'ssi', label: 'Yes, SSI' },
            { value: 'ssdi', label: 'Yes, SSDI' },
            { value: 'both', label: 'Yes, both' },
            { value: 'applied', label: 'Applied, waiting for decision' },
            { value: 'no', label: 'No' }
        ]
    },
    {
        id: 'veteran_service',
        text: 'Veteran details:',
        type: 'multiselect',
        showIf: (answers) => answers.is_veteran === 'yes',
        options: [
            { value: 'wartime', label: 'Served during wartime' },
            { value: 'service_disabled', label: 'Service-connected disability' },
            { value: 'honorable', label: 'Honorable discharge' },
            { value: 'va_enrolled', label: 'Already enrolled in VA healthcare' },
            { value: 'combat', label: 'Served in combat zone' }
        ]
    },
    {
        id: 'veteran_dependent',
        text: 'Are you the spouse, child, or dependent of a veteran who is deceased or disabled?',
        type: 'select',
        showIf: (answers) => answers.is_veteran === 'no',
        options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
        ]
    },
    {
        id: 'housing_crisis',
        text: 'Are you facing any housing issues?',
        type: 'multiselect',
        showIf: (answers) => ['rent', 'living_with', 'homeless', 'shelter'].includes(answers.housing),
        options: [
            { value: 'behind_rent', label: 'Behind on rent' },
            { value: 'eviction', label: 'Facing eviction' },
            { value: 'utility_shutoff', label: 'Utility shutoff notice' },
            { value: 'overcrowded', label: 'Overcrowded housing' },
            { value: 'unsafe', label: 'Unsafe living conditions' },
            { value: 'none', label: 'None of these' }
        ]
    },
    {
        id: 'rent_amount',
        text: 'How much is your monthly rent?',
        type: 'select',
        showIf: (answers) => answers.housing === 'rent' || answers.housing === 'rural',
        options: [
            { value: '500', label: 'Under $500' },
            { value: '1000', label: '$500 - $1,000' },
            { value: '1500', label: '$1,000 - $1,500' },
            { value: '2000', label: '$1,500 - $2,000' },
            { value: '2500', label: '$2,000 - $2,500' },
            { value: '3000', label: '$2,500 - $3,000' },
            { value: '4000', label: 'Over $3,000' }
        ]
    },
    {
        id: 'medical_equipment',
        text: 'Does anyone in your household depend on medical equipment that uses electricity? (oxygen, dialysis, etc.)',
        type: 'select',
        options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
        ]
    },
    {
        id: 'care_facility',
        text: 'Does anyone live in a nursing home, assisted living, or care facility?',
        type: 'select',
        options: [
            { value: 'yes', label: 'Yes' },
            { value: 'considering', label: 'Considering it' },
            { value: 'no', label: 'No' }
        ]
    },
    {
        id: 'needs_daily_help',
        text: 'Does anyone need help with daily activities? (bathing, dressing, cooking, etc.)',
        type: 'select',
        showIf: (answers) => answers.age === '65plus' || answers.has_disability === 'yes',
        options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
        ]
    },
    {
        id: 'student_details',
        text: 'Student details:',
        type: 'multiselect',
        showIf: (answers) => ['student', 'student_working'].includes(answers.employment),
        options: [
            { value: 'community_college', label: 'Attending community college' },
            { value: 'csu', label: 'Attending CSU' },
            { value: 'uc', label: 'Attending UC' },
            { value: 'private', label: 'Attending private university' },
            { value: 'first_gen', label: 'First generation college student' },
            { value: 'half_time', label: 'Enrolled at least half-time' }
        ]
    },
    {
        id: 'receives_calfresh',
        text: 'Do you currently receive CalFresh (food stamps)?',
        type: 'select',
        options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
        ]
    },
    {
        id: 'utility_type',
        text: 'Who provides your electricity/gas?',
        type: 'select',
        options: [
            { value: 'pge', label: 'PG&E' },
            { value: 'sce', label: 'Southern California Edison' },
            { value: 'sdge', label: 'SDG&E' },
            { value: 'ladwp', label: 'LADWP' },
            { value: 'other', label: 'Other / Municipal' },
            { value: 'none', label: 'Utilities included in rent' }
        ]
    }
];

// Get current questions based on mode
function getCurrentQuestions() {
    if (questionMode === 'basic') {
        return basicQuestions;
    } else {
        return detailedQuestions;
    }
}

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
    return getCurrentQuestions().filter(q => shouldShowQuestion(q));
}

// Render current question
function renderQuestion() {
    const visibleQuestions = getVisibleQuestions();
    const q = visibleQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / visibleQuestions.length) * 100;
    progressBar.style.width = progress + '%';
    
    let modeLabel = questionMode === 'basic' ? 'Quick Scan' : 'Deep Scan';
    let html = `<div class="question-mode-label">${modeLabel}</div>`;
    html += `<h3>${q.text}</h3>`;
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
function matchBenefits(includeDetailedOnly = false) {
    const matched = [];
    const fplPercent = calculateFPLPercent();
    
    benefits.forEach(benefit => {
        // Skip detailed-only benefits if we haven't done detailed questions
        if (!includeDetailedOnly && benefit.detailedOnly) {
            return;
        }
        
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
        if (!['employed', 'self_employed', 'student_working'].includes(answers.employment)) {
            return false;
        }
    }
    
    // Has disability check
    if (req.has_disability && answers.has_disability !== 'yes') {
        return false;
    }
    
    // Has work history check (for SDI, PFL)
    if (req.has_work_history) {
        if (!['employed', 'self_employed', 'student_working'].includes(answers.employment)) {
            return false;
        }
    }
    
    // Student or has student children check
    if (req.student_or_child_student) {
        const isStudent = ['student', 'student_working'].includes(answers.employment);
        const hasTeenChildren = (answers.children_ages || []).includes('13-17');
        if (!isStudent && !hasTeenChildren) {
            return false;
        }
    }
    
    // Age OR disability check
    if (req.age_or_disability) {
        const is65plus = answers.age === '65plus';
        const hasDisability = answers.has_disability === 'yes';
        if (!is65plus && !hasDisability) {
            return false;
        }
    }
    
    // Age OR disability OR low income check
    if (req.age_or_disability_or_low_income) {
        const is60plus = answers.age === '60-64' || answers.age === '65plus';
        const hasDisability = answers.has_disability === 'yes';
        const lowIncome = fplPercent <= 200;
        if (!is60plus && !hasDisability && !lowIncome) {
            return false;
        }
    }
    
    // Employment or school check
    if (req.employment_or_school) {
        const working = ['employed', 'self_employed', 'student_working'].includes(answers.employment);
        const inSchool = ['student', 'student_working'].includes(answers.employment);
        if (!working && !inSchool) {
            return false;
        }
    }
    
    // Veteran check
    if (req.is_veteran && answers.is_veteran !== 'yes') {
        return false;
    }
    
    // Veteran dependent check
    if (req.is_veteran_dependent && answers.veteran_dependent !== 'yes') {
        return false;
    }
    
    // Recently lost job (for UI)
    if (req.lost_job && answers.recently_lost_job !== 'yes') {
        return false;
    }
    
    // Homeless check
    if (req.is_homeless) {
        if (!['homeless', 'shelter'].includes(answers.housing)) {
            return false;
        }
    }
    
    // Housing unstable check
    if (req.housing_unstable) {
        if (!['homeless', 'shelter', 'living_with'].includes(answers.housing)) {
            return false;
        }
    }
    
    // Rural area check
    if (req.rural_area && answers.housing !== 'rural') {
        return false;
    }
    
    // Immigrant check
    if (req.is_immigrant) {
        if (['citizen'].includes(answers.citizenship)) {
            return false;
        }
    }
    
    // Refugee check
    if (req.is_refugee && answers.citizenship !== 'refugee') {
        return false;
    }
    
    // Refugee arrived within 8 months
    if (req.arrived_within_8_months && answers.refugee_arrival !== 'yes') {
        return false;
    }
    
    // Undocumented check
    if (req.is_undocumented && answers.citizenship !== 'undocumented') {
        return false;
    }
    
    // Chronic condition check
    if (req.has_chronic_condition && answers.has_chronic_condition !== 'yes') {
        return false;
    }
    
    // Medical equipment check
    if (req.has_medical_equipment && answers.medical_equipment !== 'yes') {
        return false;
    }
    
    // CalFresh recipient check
    if (req.receives_calfresh && answers.receives_calfresh !== 'yes') {
        return false;
    }
    
    // Care facility check
    if (req.in_care_facility && answers.care_facility !== 'yes') {
        return false;
    }
    
    // No insurance check
    if (req.no_insurance && answers.health_insurance !== 'none') {
        return false;
    }
    
    // Age OR disability OR homeless check (for CalFresh Restaurant)
    if (req.age_or_disability_or_homeless) {
        const is60plus = answers.age === '60-64' || answers.age === '65plus';
        const hasDisability = answers.has_disability === 'yes';
        const isHomeless = ['homeless', 'shelter'].includes(answers.housing);
        if (!is60plus && !hasDisability && !isHomeless) {
            return false;
        }
    }
    
    return true;
}

// Render results
function renderResults(matchedBenefits, isDetailed = false) {
    // Group by category
    const grouped = {};
    matchedBenefits.forEach(b => {
        if (!grouped[b.category]) grouped[b.category] = [];
        grouped[b.category].push(b);
    });
    
    let html = `<h2>🎉 You may qualify for ${matchedBenefits.length} programs</h2>`;
    
    // Disclaimer
    html += '<div class="disclaimer-box">⚠️ These are preliminary matches. Actual eligibility depends on additional factors. Always verify with the official program.</div>';
    
    if (matchedBenefits.length === 0) {
        html += '<p>Based on your answers, we did not find matching programs. This does not mean you are ineligible - please contact 211 for help.</p>';
    } else {
        html += '<p>Review each program below. Click "Learn how to apply" for next steps.</p>';
        
        for (const [catId, catBenefits] of Object.entries(grouped)) {
            const cat = categories[catId];
            if (!cat) continue;
            html += `<h3 style="margin-top: 1.5rem;">${cat.icon} ${cat.name}</h3>`;
            
            catBenefits.forEach(b => {
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
    
    // "Want more?" card - only show after basic mode
    if (!isDetailed && !basicResultsShown) {
        basicResultsShown = true;
        html += `
            <div class="unlock-more-card">
                <div class="unlock-icon">🔍</div>
                <h3>Want to find more benefits?</h3>
                <p>Answer a few more detailed questions to unlock additional programs you might qualify for - including veteran benefits, specialized housing, education grants, and more.</p>
                <button id="unlock-btn" class="btn-unlock">Find More Benefits</button>
            </div>
        `;
    }
    
    html += '<button id="restart-btn" class="btn-secondary" style="margin-top: 1.5rem;">Start Over</button>';
    screens.results.innerHTML = html;
    
    // Restart button
    document.getElementById('restart-btn').addEventListener('click', () => {
        currentQuestion = 0;
        answers = {};
        questionMode = 'basic';
        basicResultsShown = false;
        showScreen('intro');
    });
    
    // Unlock more button
    const unlockBtn = document.getElementById('unlock-btn');
    if (unlockBtn) {
        unlockBtn.addEventListener('click', () => {
            questionMode = 'detailed';
            currentQuestion = 0;
            showScreen('questionnaire');
            renderQuestion();
        });
    }
}

// Event Listeners
startBtn.addEventListener('click', () => {
    questionMode = 'basic';
    currentQuestion = 0;
    answers = {};
    basicResultsShown = false;
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
            const isDetailed = questionMode === 'detailed';
            const matched = matchBenefits(isDetailed);
            renderResults(matched, isDetailed);
            showScreen('results');
        }, 1000);
    }
});
