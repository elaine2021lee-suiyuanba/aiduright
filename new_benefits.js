// Additional benefits to add to database

const newBenefits = [
    // ========== HEALTHCARE ==========
    {
        id: 'pace',
        name: 'PACE (Program of All-inclusive Care for the Elderly)',
        category: 'healthcare',
        description: 'Comprehensive medical and social services for seniors who qualify for nursing home care but want to stay home. Includes doctors, specialists, therapy, meals, and transportation.',
        requirements: {
            state: ['CA'],
            age: ['55plus'],
            citizenship: ['citizen', 'green_card', 'qualified_immigrant'],
            special: 'nursing_home_eligible'
        },
        url: 'https://www.dhcs.ca.gov/services/Pages/PACE.aspx',
        howToApply: [
            'Find a PACE organization in your area',
            'Call for assessment appointment',
            'Must be 55+ and qualify for nursing home level care',
            'Can have both Medicare and Medi-Cal'
        ]
    },
    {
        id: 'my-health-la',
        name: 'My Health LA',
        category: 'healthcare',
        description: 'Free healthcare for uninsured LA County residents regardless of immigration status. Primary care, specialty care, prescriptions.',
        requirements: {
            state: ['CA'],
            income_fpl: 138,
            citizenship: ['undocumented', 'citizen', 'green_card', 'refugee', 'qualified_immigrant', 'daca'],
            county: ['los_angeles']
        },
        url: 'http://dhs.lacounty.gov/mhla/',
        howToApply: [
            'Visit a My Health LA clinic',
            'Bring proof of LA County residence and income',
            'No immigration documents required',
            'Enrollment takes 1 visit'
        ]
    },
    {
        id: 'healthy-sf',
        name: 'Healthy San Francisco',
        category: 'healthcare',
        description: 'Health access program for uninsured San Francisco residents regardless of immigration status or employment.',
        requirements: {
            state: ['CA'],
            income_fpl: 500,
            citizenship: ['undocumented', 'citizen', 'green_card', 'refugee', 'qualified_immigrant', 'daca'],
            county: ['san_francisco']
        },
        url: 'https://healthysanfrancisco.org/',
        howToApply: [
            'Apply online or at SF General Hospital',
            'Must live in SF and be uninsured',
            'Small quarterly payments based on income',
            'No immigration status requirements'
        ]
    },
    
    // ========== CASH ASSISTANCE ==========
    {
        id: 'ca-eitc',
        name: 'California Earned Income Tax Credit (CalEITC)',
        category: 'tax',
        description: 'State tax credit up to $3,529 for low-income workers. Can get refund even if you owe no taxes. Works with ITIN filers.',
        requirements: {
            state: ['CA'],
            income_max: 30950,
            employed: true,
            citizenship: ['citizen', 'green_card', 'undocumented']
        },
        url: 'https://www.ftb.ca.gov/file/personal/credits/california-earned-income-tax-credit.html',
        howToApply: [
            'File California tax return (use ITIN if no SSN)',
            'Claim CalEITC on Form 540',
            'Free filing at VITA sites',
            'Can file for past 4 years if missed'
        ]
    },
    {
        id: 'young-child-tax-credit',
        name: 'Young Child Tax Credit',
        category: 'tax',
        description: 'Extra $1,117 for CalEITC families with a child under 6. Automatically added when you claim CalEITC.',
        requirements: {
            state: ['CA'],
            income_max: 30950,
            has_children_under_6: true,
            citizenship: ['citizen', 'green_card', 'undocumented']
        },
        url: 'https://www.ftb.ca.gov/file/personal/credits/young-child-tax-credit.html',
        howToApply: [
            'File California tax return with CalEITC',
            'List child under 6 as dependent',
            'Credit added automatically',
            'Can use ITIN'
        ]
    },
    {
        id: 'renters-credit',
        name: 'California Renter\'s Credit',
        category: 'tax',
        description: 'Tax credit of $60-120 for low-income renters. Simple to claim on your CA tax return.',
        requirements: {
            state: ['CA'],
            income_max: 50746,
            renter: true,
            citizenship: ['citizen', 'green_card', 'qualified_immigrant']
        },
        url: 'https://www.ftb.ca.gov/file/personal/credits/renters-credit.html',
        howToApply: [
            'File California tax return',
            'Check the renter box',
            'Must have rented in CA for at least half the year',
            'Claim on Form 540'
        ]
    },
    
    // ========== HOUSING ==========
    {
        id: 'hcvp-port',
        name: 'Housing Choice Voucher Portability',
        category: 'housing',
        description: 'If you have a Section 8 voucher, you can move anywhere in the US and keep your voucher. Good for families relocating.',
        requirements: {
            has_section8: true
        },
        url: 'https://www.hud.gov/program_offices/public_indian_housing/programs/hcv/portability',
        howToApply: [
            'Notify your current housing authority 30 days before moving',
            'Request portability paperwork',
            'New housing authority will take over administration',
            'Can port immediately after lease-up'
        ]
    },
    {
        id: 'hud-vash',
        name: 'HUD-VASH (Veterans Homeless Assistance)',
        category: 'veterans',
        description: 'Combines Section 8 housing vouchers with VA supportive services for homeless veterans. Housing first approach.',
        requirements: {
            veteran: true,
            homeless: true
        },
        url: 'https://www.va.gov/homeless/hud-vash.asp',
        howToApply: [
            'Contact your local VA Medical Center',
            'Call National Homeless Hotline: 1-877-424-3838',
            'VA will assess eligibility and connect to case manager',
            'Includes ongoing mental health and support services'
        ]
    },
    {
        id: 'ssvf',
        name: 'Supportive Services for Veteran Families (SSVF)',
        category: 'veterans',
        description: 'Rapid rehousing and homelessness prevention for veteran families. Help with deposits, rent, utilities, and moving costs.',
        requirements: {
            veteran: true,
            income_fpl: 50,
            housing_unstable: true
        },
        url: 'https://www.va.gov/homeless/ssvf/',
        howToApply: [
            'Find local SSVF provider at va.gov/homeless/ssvf',
            'Veteran must be head of household or spouse',
            'Includes case management and employment help',
            'Up to 2 years of assistance'
        ]
    },
    
    // ========== EDUCATION ==========
    {
        id: 'ca-promise',
        name: 'California College Promise',
        category: 'education',
        description: 'Free community college tuition for first-time, full-time students. No income requirement - available to all CA residents.',
        requirements: {
            state: ['CA'],
            age: ['18-24'],
            first_gen_college: true
        },
        url: 'https://www.cccco.edu/About-Us/Chancellors-Office/Divisions/Educational-Services-and-Support/California-College-Promise',
        howToApply: [
            'Apply to any CA community college',
            'Complete FAFSA or CA Dream Act application',
            'Enroll full-time (12+ units)',
            'Maintain 2.0 GPA'
        ]
    },
    {
        id: 'trio-upward-bound',
        name: 'TRIO Upward Bound',
        category: 'education',
        description: 'Free college prep program for high school students from low-income families. Tutoring, SAT prep, college visits, summer programs.',
        requirements: {
            age: ['13-17'],
            income_fpl: 150,
            first_gen_college: true
        },
        url: 'https://www2.ed.gov/programs/trioupbound/index.html',
        howToApply: [
            'Find Upward Bound program at local college',
            'Apply in 9th or 10th grade',
            'Must be first-generation college student',
            'Participate through high school graduation'
        ]
    },
    {
        id: 'americorps',
        name: 'AmeriCorps',
        category: 'employment',
        description: 'National service program. Earn $7,395 education award plus living stipend while serving your community. Great gap year option.',
        requirements: {
            age: ['18plus'],
            citizenship: ['citizen', 'green_card']
        },
        url: 'https://americorps.gov/',
        howToApply: [
            'Search positions at americorps.gov',
            'Apply directly to programs',
            'Most positions are 10-12 months full-time',
            'Includes health insurance during service'
        ]
    },
    
    // ========== CHILDCARE ==========
    {
        id: 'head-start-ehs',
        name: 'Early Head Start',
        category: 'childcare',
        description: 'Free early childhood program for infants and toddlers (0-3) from low-income families. Child development, parenting support, health services.',
        requirements: {
            income_fpl: 100,
            has_children_under_3: true
        },
        url: 'https://eclkc.ohs.acf.hhs.gov/programs/article/early-head-start-programs',
        howToApply: [
            'Find local Early Head Start at eclkc.ohs.acf.hhs.gov/locator',
            'Apply directly to the program',
            'Priority for families below poverty line',
            'Can include pregnant women'
        ]
    },
    {
        id: 'trustline',
        name: 'TrustLine Registry',
        category: 'childcare',
        description: 'Free background check registry for California in-home childcare providers. Helps families find safe caregivers.',
        requirements: {
            state: ['CA']
        },
        url: 'https://www.trustline.org/',
        howToApply: [
            'Caregivers apply at trustline.org',
            'Background check takes 2-4 weeks',
            'Families search registry for free',
            'Required for license-exempt providers using subsidies'
        ]
    },
    
    // ========== DISABILITY ==========
    {
        id: 'ihss-pcsp',
        name: 'IHSS Provider Enrollment',
        category: 'disability',
        description: 'Become a paid caregiver for your family member on IHSS. Get paid while caring for your loved one at home.',
        requirements: {
            state: ['CA'],
            family_on_ihss: true
        },
        url: 'https://www.cdss.ca.gov/inforesources/ihss/ihss-providers',
        howToApply: [
            'Contact county IHSS office',
            'Complete provider enrollment paperwork',
            'Background check required',
            'Can be family member, friend, or hired provider'
        ]
    },
    {
        id: 'regional-center',
        name: 'Regional Center Services',
        category: 'disability',
        description: 'Lifelong services for people with developmental disabilities in California. Includes early intervention, day programs, respite, supported living.',
        requirements: {
            state: ['CA'],
            developmental_disability: true
        },
        url: 'https://www.dds.ca.gov/rc/',
        howToApply: [
            'Contact your local Regional Center',
            'Request intake appointment',
            'Bring medical/school records',
            'Assessment is free, no income requirement'
        ]
    },
    
    // ========== FOOD ==========
    {
        id: 'tefap',
        name: 'TEFAP (Emergency Food Assistance)',
        category: 'food',
        description: 'Free USDA food distributed through food banks. No ID or proof of income usually required - just show up.',
        requirements: {
            income_fpl: 185
        },
        url: 'https://www.fns.usda.gov/tefap/emergency-food-assistance-program',
        howToApply: [
            'Find local food bank at feedingamerica.org',
            'Check distribution schedule',
            'Self-declaration of income is usually enough',
            'No immigration status requirements'
        ]
    },
    {
        id: 'cacfp',
        name: 'Child & Adult Care Food Program',
        category: 'food',
        description: 'Free meals at daycare centers, family childcare homes, and adult day programs. Kids and elderly benefit.',
        requirements: {
            income_fpl: 185,
            in_care_program: true
        },
        url: 'https://www.fns.usda.gov/cacfp',
        howToApply: [
            'Check if your childcare or adult day center participates',
            'Fill out income eligibility form at the center',
            'Benefits provided through the center',
            'No application to government needed'
        ]
    },
    {
        id: 'farmers-market-nutrition',
        name: 'Senior Farmers Market Nutrition Program',
        category: 'food',
        description: 'Free coupons for fresh fruits and vegetables at farmers markets. For low-income seniors 60+.',
        requirements: {
            age: ['60plus'],
            income_fpl: 185
        },
        url: 'https://www.fns.usda.gov/sfmnp/senior-farmers-market-nutrition-program',
        howToApply: [
            'Contact your local Area Agency on Aging',
            'Coupons distributed seasonally (summer/fall)',
            'Usually $20-50 in coupons per year',
            'Must be 60+ and income-eligible'
        ]
    }
];
