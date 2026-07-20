// AiduRight - Benefits Database
// California-focused benefits programs with detailed eligibility rules

const benefits = [
    // ========== HEALTHCARE ==========
    {
        id: 'medi-cal',
        name: 'Medi-Cal',
        category: 'healthcare',
        description: 'Free or low-cost health coverage for Californians with limited income. Covers doctor visits, hospital, prescriptions, dental, vision, and mental health.',
        requirements: {
            state: ['CA'],
            income_fpl: 138, // up to 138% FPL
            citizenship: ['citizen', 'green_card', 'refugee', 'qualified_immigrant']
        },
        url: 'https://www.dhcs.ca.gov/services/medi-cal',
        howToApply: [
            'Apply online at CoveredCA.com or BenefitsCal.com',
            'Visit your county human services office',
            'Bring proof of income, ID, and immigration status if applicable',
            'Processing takes 45 days or less'
        ]
    },
    {
        id: 'medicare',
        name: 'Medicare',
        category: 'healthcare',
        description: 'Federal health insurance for people 65+ or with certain disabilities. Part A (hospital), Part B (medical), Part D (prescriptions).',
        requirements: {
            age: ['65plus'],
            citizenship: ['citizen', 'green_card']
        },
        url: 'https://www.medicare.gov/',
        howToApply: [
            'Sign up 3 months before turning 65',
            'Apply at ssa.gov or call 1-800-772-1213',
            'Choose Original Medicare or Medicare Advantage',
            'Consider Part D for prescription coverage'
        ]
    },
    {
        id: 'covered-ca',
        name: 'Covered California',
        category: 'healthcare',
        description: 'Health insurance marketplace with subsidies for middle-income families. If you earn too much for Medi-Cal but need help affording insurance.',
        requirements: {
            state: ['CA'],
            income_fpl_min: 139,
            income_fpl_max: 400,
            citizenship: ['citizen', 'green_card', 'daca']
        },
        url: 'https://www.coveredca.com/',
        howToApply: [
            'Apply during Open Enrollment (Nov-Jan) or after qualifying life event',
            'Compare plans at CoveredCA.com',
            'Subsidies based on income - many pay $0-50/month'
        ]
    },

    // ========== FOOD ASSISTANCE ==========
    {
        id: 'calfresh',
        name: 'CalFresh (SNAP/Food Stamps)',
        category: 'food',
        description: 'Monthly EBT card to buy groceries. About $234/month for individuals, more for families.',
        requirements: {
            state: ['CA'],
            income_fpl: 200, // gross income limit
            citizenship: ['citizen', 'green_card', 'refugee', 'qualified_immigrant']
        },
        url: 'https://www.getcalfresh.org/',
        howToApply: [
            'Apply online at GetCalFresh.org (easiest)',
            'Complete phone interview within 10 days',
            'Submit verification documents',
            'Benefits start within 30 days (or 3 days if emergency)'
        ]
    },
    {
        id: 'wic',
        name: 'WIC (Women, Infants, Children)',
        category: 'food',
        description: 'Nutrition program for pregnant women, new moms, and children under 5. Free healthy food, nutrition education, breastfeeding support.',
        requirements: {
            state: ['CA'],
            income_fpl: 185,
            has_children_under_5: true,
            special: 'pregnant_or_infant'
        },
        url: 'https://www.cdph.ca.gov/Programs/CFH/DWICSN',
        howToApply: [
            'Find your local WIC office',
            'Bring ID, proof of address, income, and child health records',
            'No citizenship requirement - all residents eligible'
        ]
    },
    {
        id: 'school-meals',
        name: 'Free School Meals',
        category: 'food',
        description: 'Free breakfast and lunch for K-12 students. California now offers free meals to ALL students regardless of income.',
        requirements: {
            state: ['CA'],
            has_school_age_children: true
        },
        url: 'https://www.cde.ca.gov/ls/nu/sn/',
        howToApply: [
            'California Universal Meals - all students qualify',
            'No application needed in most districts',
            'Check with your school if unsure'
        ]
    },
    {
        id: 'csfp',
        name: 'CSFP (Senior Food Box)',
        category: 'food',
        description: 'Monthly box of nutritious food for seniors 60+. Includes cheese, milk, cereal, canned goods, and more.',
        requirements: {
            age: ['60plus', '65plus'],
            income_fpl: 130,
            citizenship: ['citizen', 'green_card', 'qualified_immigrant']
        },
        url: 'https://www.fns.usda.gov/csfp',
        howToApply: [
            'Contact your local food bank',
            'Bring ID and proof of income',
            'Pick up monthly food box at distribution site'
        ]
    },

    // ========== CASH ASSISTANCE ==========
    {
        id: 'ssi',
        name: 'SSI (Supplemental Security Income)',
        category: 'cash',
        description: 'Monthly cash for seniors 65+, blind, or disabled with little income. California adds SSP on top - up to $1,182/month total for individuals.',
        requirements: {
            age: ['65plus'],
            income_fpl: 100,
            citizenship: ['citizen', 'green_card'],
            assets_low: true
        },
        url: 'https://www.ssa.gov/ssi/',
        howToApply: [
            'Apply at your local Social Security office',
            'Call 1-800-772-1213 to start',
            'Bring medical records if applying for disability',
            'Processing can take 3-6 months'
        ]
    },
    {
        id: 'calworks',
        name: 'CalWORKs (TANF)',
        category: 'cash',
        description: 'Temporary cash assistance for families with children. Also provides job training and childcare support.',
        requirements: {
            state: ['CA'],
            has_children: true,
            income_fpl: 130,
            citizenship: ['citizen', 'green_card', 'qualified_immigrant']
        },
        url: 'https://www.cdss.ca.gov/calworks',
        howToApply: [
            'Apply at BenefitsCal.com or county office',
            'Must participate in welfare-to-work activities',
            'Benefits based on family size and income'
        ]
    },
    {
        id: 'ga',
        name: 'General Assistance',
        category: 'cash',
        description: 'Cash aid for adults without children who do not qualify for other programs. Amount varies by county.',
        requirements: {
            state: ['CA'],
            no_children: true,
            income_fpl: 100,
            not_receiving_ssi: true
        },
        url: 'https://www.cdss.ca.gov/general-assistance',
        howToApply: [
            'Apply at your county human services office',
            'Rules vary by county',
            'May require job search activities'
        ]
    },

    // ========== HOUSING ==========
    {
        id: 'section8',
        name: 'Section 8 (Housing Choice Voucher)',
        category: 'housing',
        description: 'Voucher to help pay rent for private housing. You pay 30% of income, voucher covers the rest.',
        requirements: {
            income_fpl: 80, // 80% AMI actually, but approximating
            citizenship: ['citizen', 'green_card']
        },
        url: 'https://www.hud.gov/topics/housing_choice_voucher_program_section_8',
        howToApply: [
            'Apply when your local housing authority opens waitlist',
            'Waitlists can be years long - apply early',
            'Check multiple housing authorities in your area'
        ]
    },
    {
        id: 'lihtc',
        name: 'Affordable Housing (LIHTC)',
        category: 'housing',
        description: 'Below-market rent apartments. Income-restricted housing developments throughout California.',
        requirements: {
            income_fpl: 150 // varies by property
        },
        url: 'https://www.hcd.ca.gov/',
        howToApply: [
            'Search for affordable housing at AffordableHousing.com',
            'Apply directly to each property',
            'Income limits vary by property and area'
        ]
    },
    {
        id: 'erap',
        name: 'Emergency Rental Assistance',
        category: 'housing',
        description: 'Help paying back rent or preventing eviction. Availability varies - check your county.',
        requirements: {
            state: ['CA'],
            income_fpl: 80,
            rental_hardship: true
        },
        url: 'https://housing.ca.gov/',
        howToApply: [
            'Check your county website for current programs',
            'Gather lease, income proof, and hardship documentation',
            'Apply as soon as possible - funds limited'
        ]
    },

    // ========== UTILITIES ==========
    {
        id: 'liheap',
        name: 'LIHEAP (Utility Bill Help)',
        category: 'utilities',
        description: 'One-time payment to help with heating/cooling bills. Up to several hundred dollars.',
        requirements: {
            income_fpl: 200
        },
        url: 'https://www.csd.ca.gov/Pages/LIHEAPProgram.aspx',
        howToApply: [
            'Contact your local Community Action Agency',
            'Apply before funds run out (usually fall/winter)',
            'Bring utility bills and income proof'
        ]
    },
    {
        id: 'care',
        name: 'CARE (California Alternate Rates for Energy)',
        category: 'utilities',
        description: '30-35% discount on gas and electric bills for low-income households. Ongoing monthly savings.',
        requirements: {
            state: ['CA'],
            income_fpl: 200
        },
        url: 'https://www.cpuc.ca.gov/care/',
        howToApply: [
            'Apply through your utility company (PG&E, SCE, etc.)',
            'Auto-enrolled if you receive CalFresh, Medi-Cal, etc.',
            'Discount applies every month'
        ]
    },
    {
        id: 'fera',
        name: 'FERA (Family Electric Rate Assistance)',
        category: 'utilities',
        description: '18% discount on electric bills for households of 3+ people with slightly higher income than CARE.',
        requirements: {
            state: ['CA'],
            income_fpl_min: 200,
            income_fpl_max: 250,
            household_size_min: 3
        },
        url: 'https://www.cpuc.ca.gov/fera/',
        howToApply: [
            'Apply through your electric company',
            'For families who earn too much for CARE',
            'Must have 3+ people in household'
        ]
    },
    {
        id: 'lifeline',
        name: 'Lifeline (Phone/Internet Discount)',
        category: 'utilities',
        description: 'Discount on phone or internet service. $9.25/month federal + California additions.',
        requirements: {
            income_fpl: 135
        },
        url: 'https://www.cpuc.ca.gov/lifeline/',
        howToApply: [
            'Apply through your phone/internet provider',
            'Or apply at LifelineSupport.org',
            'Auto-qualify if on Medi-Cal, CalFresh, SSI, etc.'
        ]
    },
    {
        id: 'acp',
        name: 'Affordable Connectivity Program',
        category: 'utilities',
        description: '$30/month off internet bill. Can combine with Lifeline for nearly free internet.',
        requirements: {
            income_fpl: 200
        },
        url: 'https://www.fcc.gov/acp',
        howToApply: [
            'Apply at GetInternet.gov',
            'Choose a participating internet provider',
            'Discount applies automatically each month'
        ]
    },

    // ========== SENIORS & DISABILITY ==========
    {
        id: 'ihss',
        name: 'IHSS (In-Home Supportive Services)',
        category: 'seniors',
        description: 'Pays for a caregiver to help you live at home. Can pay family members to be your caregiver.',
        requirements: {
            state: ['CA'],
            age: ['65plus'],
            needs_help_daily: true,
            on_medi_cal: true
        },
        url: 'https://www.cdss.ca.gov/in-home-supportive-services',
        howToApply: [
            'Contact your county social services',
            'A social worker will assess your needs',
            'You can hire your own caregiver, even family',
            'Must be on Medi-Cal'
        ]
    },
    {
        id: 'mssp',
        name: 'MSSP (Multipurpose Senior Services)',
        category: 'seniors',
        description: 'Care management to help seniors stay at home instead of nursing homes. Coordinates all your services.',
        requirements: {
            state: ['CA'],
            age: ['65plus'],
            on_medi_cal: true,
            nursing_home_eligible: true
        },
        url: 'https://www.dhcs.ca.gov/services/ltc/Pages/MSSP.aspx',
        howToApply: [
            'Must be certified as nursing home eligible',
            'Contact your local MSSP site',
            'Free if on Medi-Cal'
        ]
    },
    {
        id: 'senior-nutrition',
        name: 'Senior Nutrition Program',
        category: 'seniors',
        description: 'Free meals at senior centers or delivered to your home (Meals on Wheels). For adults 60+.',
        requirements: {
            age: ['60plus', '65plus']
        },
        url: 'https://aging.ca.gov/Programs_and_Services/Nutrition/',
        howToApply: [
            'Contact your local Area Agency on Aging',
            'Or call your senior center directly',
            'No income requirement'
        ]
    },

    // ========== OTHER ==========
    {
        id: 'eitc',
        name: 'EITC (Earned Income Tax Credit)',
        category: 'tax',
        description: 'Tax refund up to $7,430 for working families. California adds CalEITC for extra money.',
        requirements: {
            has_earned_income: true,
            income_fpl: 300
        },
        url: 'https://www.ftb.ca.gov/file/personal/credits/california-earned-income-tax-credit.html',
        howToApply: [
            'Claim when you file taxes',
            'Use free tax prep (VITA) if income under $64,000',
            'Must have earned income from work',
            'File even if you do not owe taxes'
        ]
    },
    {
        id: 'free-tax-prep',
        name: 'VITA Free Tax Preparation',
        category: 'tax',
        description: 'Free tax filing help for people earning under $64,000. IRS-certified volunteers.',
        requirements: {
            income_max: 64000
        },
        url: 'https://www.irs.gov/individuals/free-tax-return-preparation-for-qualifying-taxpayers',
        howToApply: [
            'Find a VITA site at irs.gov or call 211',
            'Bring all tax documents, ID, Social Security cards',
            'Available January through April'
        ]
    }
];

// Federal Poverty Level 2024 (monthly)
const fpl2024Monthly = {
    1: 1255,
    2: 1703,
    3: 2150,
    4: 2598,
    5: 3045,
    6: 3493,
    7: 3940,
    8: 4388
};

// Calculate FPL percentage
function calculateFPLPercent(monthlyIncome, householdSize) {
    const baseFPL = fpl2024Monthly[Math.min(householdSize, 8)];
    return Math.round((monthlyIncome / baseFPL) * 100);
}

// Categories for organizing results
const categories = {
    healthcare: { name: 'Healthcare', icon: '🏥' },
    food: { name: 'Food Assistance', icon: '🍎' },
    cash: { name: 'Cash Assistance', icon: '💵' },
    housing: { name: 'Housing', icon: '🏠' },
    utilities: { name: 'Utilities & Internet', icon: '💡' },
    seniors: { name: 'Seniors & Disability', icon: '👴' },
    tax: { name: 'Tax Credits', icon: '💰' }
};
