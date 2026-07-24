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
        id: 'summer-ebt',
        name: 'Summer EBT',
        category: 'food',
        description: 'Summer grocery money for kids who get free school meals. About $120 per child loaded onto EBT card.',
        requirements: {
            state: ['CA'],
            has_school_age_children: true
        },
        url: 'https://www.cdss.ca.gov/inforesources/summer-ebt',
        howToApply: [
            'If your child gets free school meals, you may be auto-enrolled',
            'Check with your school district',
            'Benefits come on EBT card during summer months'
        ]
    },
    {
        id: 'sfsp',
        name: 'Summer Meals Program',
        category: 'food',
        description: 'Free breakfast and lunch for kids during summer at schools, parks, and community centers. No signup needed.',
        requirements: {
            has_children: true
        },
        url: 'https://www.fns.usda.gov/sfsp/summer-food-service-program',
        howToApply: [
            'Find a site near you at SummerMeals.org or text "FOOD" to 304-304',
            'Just show up - no application or ID needed',
            'Available to all children 18 and under'
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
    // ========== SENIORS & DISABILITY ==========
    {
        id: 'ihss',
        name: 'IHSS (In-Home Supportive Services)',
        category: 'seniors',
        description: 'Pays for a caregiver to help you live at home. Can pay family members to be your caregiver. For seniors 65+ OR people with disabilities.',
        requirements: {
            state: ['CA'],
            age_or_disability: true,
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

    // ========== CHILDCARE & EDUCATION ==========
    {
        id: 'head-start',
        name: 'Head Start / Early Head Start',
        category: 'childcare',
        description: 'Free preschool and child development for children 0-5 from low-income families. Includes meals, health screenings, and parent support.',
        requirements: {
            income_fpl: 100,
            has_children_under_5: true
        },
        url: 'https://www.benefits.gov/benefit/1904',
        howToApply: [
            'Find a Head Start program near you at eclkc.ohs.acf.hhs.gov',
            'Contact your local program directly',
            'Priority for families below poverty line'
        ]
    },
    {
        id: 'ccap',
        name: 'Childcare Assistance (CalWORKs)',
        category: 'childcare',
        description: 'Help paying for childcare while you work or go to school. Part of CalWORKs program.',
        requirements: {
            state: ['CA'],
            has_children: true,
            income_fpl: 200,
            employment_or_school: true
        },
        url: 'https://www.cdss.ca.gov/inforesources/child-care-and-development',
        howToApply: [
            'Apply through your county social services',
            'Must be working, in school, or in job training',
            'Copay based on income'
        ]
    },
    {
        id: 'pell-grant',
        name: 'Pell Grant',
        category: 'education',
        description: 'Free money for college - up to $7,395/year. Does not need to be repaid.',
        requirements: {
            income_fpl: 400,
            student_or_child_student: true
        },
        url: 'https://studentaid.gov/understand-aid/types/grants/pell',
        howToApply: [
            'Fill out FAFSA at studentaid.gov',
            'Deadline is June 30 each year',
            'Award based on family income and college cost'
        ]
    },
    {
        id: 'cal-grant',
        name: 'Cal Grant',
        category: 'education',
        description: 'California state grant for college students. Up to $14,000+ per year at UC/private schools.',
        requirements: {
            state: ['CA'],
            income_fpl: 400,
            student_or_child_student: true
        },
        url: 'https://www.csac.ca.gov/cal-grants',
        howToApply: [
            'File FAFSA and Cal Grant GPA Verification Form',
            'Deadline is March 2 for high school seniors',
            'Must maintain minimum GPA'
        ]
    },

    // ========== DISABILITY ==========
    {
        id: 'ssdi',
        name: 'SSDI (Social Security Disability)',
        category: 'disability',
        description: 'Monthly income for workers who become disabled. Based on your work history. Average payment ~$1,500/month.',
        requirements: {
            has_disability: true,
            has_work_history: true
        },
        url: 'https://www.ssa.gov/disability/',
        howToApply: [
            'Apply at ssa.gov or local Social Security office',
            'Gather medical records documenting disability',
            'Process takes 3-6 months, appeals common'
        ]
    },
    {
        id: 'sdi',
        name: 'State Disability Insurance (SDI)',
        category: 'disability',
        description: 'Short-term disability payments when you cannot work due to illness, injury, or pregnancy. ~60-70% of wages.',
        requirements: {
            state: ['CA'],
            has_work_history: true
        },
        url: 'https://edd.ca.gov/en/disability/',
        howToApply: [
            'Apply online at edd.ca.gov within 49 days of disability',
            'Need certification from doctor',
            'Benefits last up to 52 weeks'
        ]
    },
    {
        id: 'pfl',
        name: 'Paid Family Leave (PFL)',
        category: 'disability',
        description: 'Up to 8 weeks paid leave to care for seriously ill family member or bond with new child. ~60-70% of wages.',
        requirements: {
            state: ['CA'],
            has_work_history: true
        },
        url: 'https://edd.ca.gov/en/disability/paid-family-leave/',
        howToApply: [
            'Apply through EDD after leave begins',
            'Can be used for new baby, adoption, foster care, or sick family',
            'Does not provide job protection - check FMLA/CFRA'
        ]
    },

    // ========== TRANSPORTATION ==========
    {
        id: 'transit-discount',
        name: 'Reduced Fare Transit',
        category: 'transportation',
        description: 'Half-price or discounted bus and train fares for seniors, disabled, and low-income riders.',
        requirements: {
            age_or_disability_or_low_income: true
        },
        url: 'https://www.transit.dot.gov/',
        howToApply: [
            'Contact your local transit agency',
            'Bring proof of age, disability, or income',
            'Get a discount ID card'
        ]
    },
    {
        id: 'paratransit',
        name: 'Paratransit Services',
        category: 'transportation',
        description: 'Door-to-door transportation for people who cannot use regular buses/trains due to disability.',
        requirements: {
            has_disability: true
        },
        url: 'https://www.transit.dot.gov/regulations-and-guidance/civil-rights-ada/part-37-transportation-services-individuals-disabilities',
        howToApply: [
            'Apply through your local transit agency',
            'Requires eligibility assessment',
            'Service area usually within 3/4 mile of fixed routes'
        ]
    },

    // ========== LEGAL & OTHER ==========
    {
        id: 'legal-aid',
        name: 'Free Legal Aid',
        category: 'other',
        description: 'Free lawyers for low-income people. Help with housing, family law, immigration, benefits, and more.',
        requirements: {
            income_fpl: 200
        },
        url: 'https://www.lawhelpcalifornia.org/',
        howToApply: [
            'Find your local legal aid at LawHelpCalifornia.org',
            'Call 211 for referrals',
            'Many offer free clinics and hotlines'
        ]
    },
    {
        id: '211',
        name: '211 - Community Resource Helpline',
        category: 'other',
        description: 'Free helpline connecting you to local services - food, housing, utilities, healthcare, and more. Available 24/7.',
        requirements: {},
        url: 'https://www.211.org/',
        howToApply: [
            'Dial 2-1-1 from any phone',
            'Or text your zip code to 898-211',
            'Or visit 211.org to search online'
        ]
    },
    {
        id: 'food-bank',
        name: 'Local Food Banks',
        category: 'food',
        description: 'Free groceries from community food banks and pantries. No income verification at most locations.',
        requirements: {},
        url: 'https://www.feedingamerica.org/find-your-local-foodbank',
        howToApply: [
            'Find a food bank at FeedingAmerica.org',
            'Or call 211',
            'Most do not require proof of income'
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
    },

    // ========== VETERANS ==========
    {
        id: 'va-healthcare',
        detailedOnly: false,
        name: 'VA Healthcare',
        category: 'veterans',
        description: 'Free or low-cost healthcare for veterans. Covers medical, mental health, prescriptions, and more.',
        requirements: {
            is_veteran: true
        },
        url: 'https://www.va.gov/health-care/',
        howToApply: [
            'Apply online at va.gov/health-care/apply',
            'Call 1-877-222-8387',
            'Visit your local VA medical center',
            'Bring DD-214 discharge papers'
        ]
    },
    {
        id: 'gi-bill',
        name: 'GI Bill (Education Benefits)',
        category: 'veterans',
        description: 'Pays for college, trade school, or training for veterans. Covers tuition, housing, and books.',
        requirements: {
            is_veteran: true
        },
        url: 'https://www.va.gov/education/',
        howToApply: [
            'Apply online at va.gov/education',
            'Post-9/11 GI Bill covers up to 36 months',
            'Can transfer to spouse or children in some cases'
        ]
    },
    {
        id: 'calvet-fee-waiver',
        name: 'CalVet College Fee Waiver',
        category: 'veterans',
        description: 'Free tuition at California public colleges for children and dependents of veterans who are disabled or deceased.',
        requirements: {
            state: ['CA'],
            is_veteran_dependent: true
        },
        url: 'https://www.calvet.ca.gov/VetServices/Pages/College-Fee-Waiver.aspx',
        howToApply: [
            'Check eligibility at CalVet website',
            'Apply through your college financial aid office',
            'Multiple plans for different situations'
        ]
    },
    {
        id: 'vhhp',
        name: 'Veterans Housing Program (VHHP)',
        category: 'veterans',
        description: 'Housing assistance for homeless veterans or at risk of homelessness. Emergency housing, rental help, and permanent housing.',
        requirements: {
            state: ['CA'],
            is_veteran: true,
            housing_unstable: true
        },
        url: 'https://www.calvet.ca.gov/VetServices/Pages/VHHP.aspx',
        howToApply: [
            'Contact CalVet or your county veterans services',
            'Call HUD-VASH: 1-877-4AID-VET',
            'Priority for homeless or at-risk veterans'
        ]
    },
    {
        id: 'va-disability',
        name: 'VA Disability Compensation',
        category: 'veterans',
        description: 'Monthly tax-free payment for injuries or illnesses caused or worsened by military service. Amount based on disability rating.',
        requirements: {
            is_veteran: true,
            has_disability: true
        },
        url: 'https://www.va.gov/disability/',
        howToApply: [
            'Apply online at va.gov/disability/apply',
            'Gather medical records and service records',
            'C&P exam may be required'
        ]
    },
    {
        id: 'va-pension',
        name: 'VA Pension',
        category: 'veterans',
        description: 'Monthly income for wartime veterans 65+ or disabled with limited income. Aid & Attendance adds extra for daily care needs.',
        requirements: {
            is_veteran: true,
            age: ['65plus'],
            income_fpl: 150
        },
        url: 'https://www.va.gov/pension/',
        howToApply: [
            'Apply at va.gov/pension/apply',
            'Must have served during wartime',
            'Aid & Attendance adds $300-400/month extra'
        ]
    },

    // ========== IMMIGRANTS ==========
    {
        id: 'capi',
        name: 'CAPI (Cash Assistance for Immigrants)',
        category: 'immigrants',
        description: 'Monthly cash for immigrants 65+, blind, or disabled who cannot get SSI due to immigration status. Same amount as SSI.',
        requirements: {
            state: ['CA'],
            age: ['65plus'],
            is_immigrant: true,
            income_fpl: 100
        },
        url: 'https://www.cdss.ca.gov/capi',
        howToApply: [
            'Apply at your county social services office',
            'Must be denied SSI due to immigration status',
            'Bring immigration documents and income proof'
        ]
    },
    {
        id: 'rca',
        name: 'Refugee Cash Assistance (RCA)',
        category: 'immigrants',
        description: 'Up to 8 months of cash assistance for newly arrived refugees who do not qualify for other programs.',
        requirements: {
            is_refugee: true,
            arrived_within_8_months: true
        },
        url: 'https://www.cdss.ca.gov/inforesources/refugees',
        howToApply: [
            'Contact your local refugee resettlement agency',
            'Apply within first 8 months of arrival',
            'May transition to CalWORKs or other programs'
        ]
    },
    {
        id: 'rma',
        name: 'Refugee Medical Assistance (RMA)',
        category: 'immigrants',
        description: 'Up to 8 months of health coverage for newly arrived refugees not eligible for Medi-Cal.',
        requirements: {
            is_refugee: true,
            arrived_within_8_months: true
        },
        url: 'https://www.cdss.ca.gov/inforesources/refugees',
        howToApply: [
            'Apply through your resettlement agency',
            'Coverage starts immediately upon arrival',
            'After 8 months, apply for Medi-Cal'
        ]
    },
    {
        id: 'cfap',
        name: 'CFAP (CA Food Assistance Program)',
        category: 'immigrants',
        description: 'Food benefits like CalFresh for legal immigrants who do not qualify for federal SNAP due to immigration status.',
        requirements: {
            state: ['CA'],
            is_immigrant: true,
            income_fpl: 200
        },
        url: 'https://www.cdss.ca.gov/food-nutrition/calfresh',
        howToApply: [
            'Apply at BenefitsCal.com or county office',
            'Same process as CalFresh',
            'State-funded for immigrants not eligible for federal SNAP'
        ]
    },

    // ========== MORE HOUSING ==========
    {
        id: 'calworks-ha',
        name: 'CalWORKs Homeless Assistance',
        category: 'housing',
        description: 'Emergency shelter and move-in help for families with children who are homeless. Up to 16 days temporary shelter or security deposit.',
        requirements: {
            state: ['CA'],
            has_children: true,
            is_homeless: true
        },
        url: 'https://www.cdss.ca.gov/homeless-assistance',
        howToApply: [
            'Apply at county social services',
            'Must be eligible for CalWORKs',
            'Temporary shelter up to 16 days, permanent help for deposits'
        ]
    },
    {
        id: 'hdap',
        name: 'HDAP (Housing & Disability Advocacy)',
        category: 'housing',
        description: 'Housing help plus benefits advocacy for homeless people likely eligible for disability. Helps get SSI while providing housing.',
        requirements: {
            state: ['CA'],
            is_homeless: true,
            likely_disabled: true
        },
        url: 'https://www.cdss.ca.gov/inforesources/cdss-programs/housing-programs/hdap',
        howToApply: [
            'Referred through county social services',
            'Combines housing with SSI application help',
            'For homeless individuals likely to qualify for SSI/SSDI'
        ]
    },
    {
        id: 'public-housing',
        name: 'Public Housing',
        category: 'housing',
        description: 'Government-owned apartments with rent based on income (30% of income). Different from Section 8 vouchers.',
        requirements: {
            income_fpl: 80,
            citizenship: ['citizen', 'green_card']
        },
        url: 'https://www.hud.gov/topics/rental_assistance/phprog',
        howToApply: [
            'Apply through your local housing authority',
            'Waitlists often long - apply early',
            'Rent is 30% of your income'
        ]
    },
    {
        id: 'usda-rural',
        name: 'USDA Rural Housing Loans',
        category: 'housing',
        description: 'Low-interest home loans for rural areas. Zero down payment for eligible buyers. Also rental assistance.',
        requirements: {
            rural_area: true,
            income_fpl: 200
        },
        url: 'https://www.rd.usda.gov/programs-services/single-family-housing-programs',
        howToApply: [
            'Check if your area qualifies at eligibility.sc.egov.usda.gov',
            'Apply through approved lenders',
            'Zero down payment possible'
        ]
    },

    // ========== MORE HEALTHCARE ==========
    {
        id: 'denti-cal',
        name: 'Denti-Cal (Medi-Cal Dental)',
        category: 'healthcare',
        description: 'Free dental care for Medi-Cal members. Covers cleanings, fillings, extractions, dentures, and more.',
        requirements: {
            state: ['CA'],
            on_medi_cal: true
        },
        url: 'https://www.denti-cal.ca.gov/',
        howToApply: [
            'Automatic if you have Medi-Cal',
            'Find a Denti-Cal dentist at smilecalifornia.org',
            'No additional application needed'
        ]
    },
    {
        id: 'chip',
        name: 'CHIP (Children\'s Health Insurance)',
        category: 'healthcare',
        description: 'Low-cost health coverage for children whose families earn too much for Medicaid but cannot afford private insurance.',
        requirements: {
            has_children: true,
            income_fpl_min: 138,
            income_fpl_max: 266
        },
        url: 'https://www.healthcare.gov/medicaid-chip/',
        howToApply: [
            'Apply through Covered California or Healthcare.gov',
            'In CA, covered under Medi-Cal for children',
            'Free or very low cost'
        ]
    },
    {
        id: 'family-pact',
        name: 'Family PACT',
        category: 'healthcare',
        description: 'Free reproductive healthcare regardless of income for those without insurance. Birth control, STI testing, exams.',
        requirements: {
            state: ['CA'],
            no_insurance: true
        },
        url: 'https://www.familypact.org/',
        howToApply: [
            'Find a provider at FamilyPact.org',
            'No income limit - based on insurance status',
            'Confidential services available'
        ]
    },
    {
        id: 'cmsp',
        name: 'CMSP (County Medical Services)',
        category: 'healthcare',
        description: 'Health coverage for low-income adults in smaller California counties that do not expand Medi-Cal.',
        requirements: {
            state: ['CA'],
            income_fpl: 138,
            cmsp_county: true
        },
        url: 'https://www.cmspcounties.org/',
        howToApply: [
            'Apply through your county social services',
            'Available in 35 smaller CA counties',
            'Similar benefits to Medi-Cal'
        ]
    },

    // ========== MORE EDUCATION ==========
    {
        id: 'fseog',
        name: 'FSEOG (Supplemental Grant)',
        category: 'education',
        description: 'Extra grant money for students with exceptional financial need. Up to $4,000/year on top of Pell Grant.',
        requirements: {
            income_fpl: 150,
            student_or_child_student: true,
            receives_pell: true
        },
        url: 'https://studentaid.gov/understand-aid/types/grants/fseog',
        howToApply: [
            'File FAFSA - no separate application',
            'Schools award based on need and funds',
            'Priority to students with lowest EFC'
        ]
    },
    {
        id: 'work-study',
        name: 'Federal Work-Study',
        category: 'education',
        description: 'Part-time jobs for students with financial need. Earn money while gaining work experience.',
        requirements: {
            income_fpl: 300,
            student_or_child_student: true
        },
        url: 'https://studentaid.gov/understand-aid/types/work-study',
        howToApply: [
            'File FAFSA and indicate interest in work-study',
            'School assigns jobs based on need and availability',
            'Usually 10-15 hours per week'
        ]
    },
    {
        id: 'ca-dream-act',
        name: 'CA Dream Act',
        category: 'education',
        description: 'Financial aid for undocumented students in California. Access to Cal Grants, fee waivers, and scholarships.',
        requirements: {
            state: ['CA'],
            student_or_child_student: true,
            is_undocumented: true
        },
        url: 'https://dream.csac.ca.gov/',
        howToApply: [
            'File CA Dream Act Application (not FAFSA)',
            'Must meet AB540 requirements',
            'Deadline March 2 for Cal Grant'
        ]
    },
    {
        id: 'middle-class-scholarship',
        name: 'Middle Class Scholarship',
        category: 'education',
        description: 'California scholarship for students from families earning up to $217,000. Covers up to 40% of tuition.',
        requirements: {
            state: ['CA'],
            student_or_child_student: true,
            income_max: 217000
        },
        url: 'https://www.csac.ca.gov/middle-class-scholarship',
        howToApply: [
            'File FAFSA or CA Dream Act Application',
            'No separate application needed',
            'For UC and CSU students'
        ]
    },
    {
        id: 'bog-fee-waiver',
        name: 'CA College Promise Grant',
        category: 'education',
        description: 'Free community college tuition for California residents. Covers enrollment fees at all 116 community colleges.',
        requirements: {
            state: ['CA'],
            student_or_child_student: true,
            income_fpl: 200
        },
        url: 'https://www.cccapply.org/en/money/california-college-promise-grant',
        howToApply: [
            'Apply through CCCApply when enrolling',
            'Automatic if on CalFresh, CalWORKs, SSI, etc.',
            'Or based on income level'
        ]
    },

    // ========== EMPLOYMENT ==========
    {
        id: 'unemployment',
        name: 'Unemployment Insurance (UI)',
        category: 'employment',
        description: 'Weekly payments when you lose your job through no fault. Up to 26 weeks, about 60-70% of prior wages.',
        requirements: {
            state: ['CA'],
            has_work_history: true,
            lost_job: true
        },
        url: 'https://edd.ca.gov/en/unemployment/',
        howToApply: [
            'File claim at edd.ca.gov within 1 week of job loss',
            'Certify for benefits every 2 weeks',
            'Must be actively looking for work'
        ]
    },
    {
        id: 'calfresh-employment',
        name: 'CalFresh Employment & Training',
        category: 'employment',
        description: 'Free job training, education, and job search help for CalFresh recipients. Transportation and supplies provided.',
        requirements: {
            state: ['CA'],
            receives_calfresh: true
        },
        url: 'https://www.cdss.ca.gov/inforesources/calfresh-employment-and-training',
        howToApply: [
            'Ask your CalFresh worker about CFET',
            'Voluntary program with many benefits',
            'Training, transportation, work supplies provided'
        ]
    },

    // ========== MORE UTILITIES ==========
    {
        id: 'wap',
        name: 'Weatherization Assistance Program',
        category: 'utilities',
        description: 'Free home improvements to reduce energy bills. Insulation, sealing, efficient appliances. Saves $200-400/year.',
        requirements: {
            income_fpl: 200
        },
        url: 'https://www.csd.ca.gov/Pages/Weatherization.aspx',
        howToApply: [
            'Contact your local Community Action Agency',
            'Free energy audit and improvements',
            'Priority for elderly, disabled, families with children'
        ]
    },
    {
        id: 'reach',
        name: 'REACH (PG&E Emergency Help)',
        category: 'utilities',
        description: 'One-time energy bill payment assistance for PG&E customers in crisis. Up to $300.',
        requirements: {
            state: ['CA'],
            income_fpl: 200,
            utility_crisis: true
        },
        url: 'https://www.pge.com/en/account/billing-and-assistance/financial-assistance.html',
        howToApply: [
            'Apply through Salvation Army or other agency',
            'Once per year in 18-month period',
            'For unexpected financial hardship'
        ]
    },
    {
        id: 'medical-baseline',
        name: 'Medical Baseline Allowance',
        category: 'utilities',
        description: 'Extra energy at lowest rate for people who depend on medical equipment at home. For life support, dialysis, etc.',
        requirements: {
            state: ['CA'],
            has_medical_equipment: true
        },
        url: 'https://www.cpuc.ca.gov/consumer-support/financial-assistance-savings-and-discounts/medical-baseline',
        howToApply: [
            'Apply through your utility company',
            'Doctor certification required',
            'Extra electricity at lowest tier rate'
        ]
    },

    // ========== MORE FOOD ==========
    {
        id: 'calfresh-restaurant',
        name: 'CalFresh Restaurant Meals',
        category: 'food',
        description: 'Use CalFresh at participating restaurants if you are elderly, disabled, or homeless. Hot meals available.',
        requirements: {
            state: ['CA'],
            receives_calfresh: true,
            age_or_disability_or_homeless: true
        },
        url: 'https://www.cdss.ca.gov/inforesources/calfresh/restaurant-meals-program',
        howToApply: [
            'Must be 60+, disabled, or homeless',
            'Look for "CalFresh Accepted" signs',
            'Participating restaurants in select counties'
        ]
    },
    {
        id: 'produce-rx',
        name: 'Produce Rx Programs',
        category: 'food',
        description: 'Free fruits and vegetables prescribed by doctors. For patients with diet-related conditions like diabetes.',
        requirements: {
            has_chronic_condition: true,
            income_fpl: 200
        },
        url: 'https://thefruitguys.com/community/produce-rx',
        howToApply: [
            'Ask your doctor about food-as-medicine programs',
            'Programs vary by health plan and county',
            'Free fresh produce for qualifying conditions'
        ]
    },

    // ========== SENIORS ==========
    {
        id: 'senior-legal',
        name: 'Senior Legal Services',
        category: 'seniors',
        description: 'Free legal help for adults 60+. Housing, benefits, elder abuse, consumer fraud, healthcare issues.',
        requirements: {
            age: ['60plus', '65plus']
        },
        url: 'https://aging.ca.gov/',
        howToApply: [
            'Contact your Area Agency on Aging',
            'Call 1-800-510-2020 (CA Aging hotline)',
            'No income requirement for 60+'
        ]
    },
    {
        id: 'ombudsman',
        name: 'Long-Term Care Ombudsman',
        category: 'seniors',
        description: 'Free advocates for people in nursing homes and assisted living. Help with complaints, abuse, rights violations.',
        requirements: {
            in_care_facility: true
        },
        url: 'https://www.aging.ca.gov/Programs_and_Services/Long-Term_Care_Ombudsman/',
        howToApply: [
            'Call California Long-Term Care Ombudsman: 1-800-231-4024',
            'Available to all nursing home and assisted living residents',
            'Confidential advocacy services'
        ]
    },

    // ========== COUNTY & SPECIALIZED HEALTHCARE ==========
    {
        id: 'healthy-sf',
        name: 'Healthy San Francisco',
        category: 'healthcare',
        description: 'Program giving uninsured San Francisco residents access to primary and specialty care through a network of participating clinics and hospitals. Not insurance and only covers care within San Francisco; open regardless of immigration status.',
        requirements: {
            state: ['CA'],
            no_insurance: true,
            income_fpl: 500
        },
        url: 'https://healthysanfrancisco.org/',
        howToApply: [
            'Pre-screen and schedule an enrollment appointment at the Healthy SF portal or call 1-415-615-4555',
            'Gather proof of San Francisco residency, income, and identity',
            'Attend the in-person appointment at a participating site and select a medical home'
        ]
    },
    {
        id: 'ccs',
        name: 'California Children\'s Services (CCS)',
        category: 'healthcare',
        description: 'State/county program providing diagnosis, treatment, case management, and therapy for children under 21 with eligible severe or chronic medical conditions like cystic fibrosis, cancer, heart disease, or cerebral palsy.',
        requirements: {
            state: ['CA'],
            has_children: true
        },
        url: 'https://www.dhcs.ca.gov/services/ccs/',
        howToApply: [
            'Complete the CCS Application (DHCS 4480)',
            'Submit it to your county CCS office with medical, residency, and income documents',
            'County reviews medical and financial eligibility and authorizes care through approved providers'
        ]
    },
    {
        id: 'ghpp',
        name: 'Genetically Handicapped Persons Program (GHPP)',
        category: 'healthcare',
        description: 'Statewide program providing comprehensive health coverage and case management to Californians (generally 21+) with specific eligible genetic conditions such as cystic fibrosis, hemophilia, sickle cell disease, and certain metabolic disorders.',
        requirements: {
            state: ['CA'],
            has_chronic_condition: true
        },
        url: 'https://www.dhcs.ca.gov/services/ghpp/',
        howToApply: [
            'Contact GHPP at 916-713-8400 or get a referral from your provider',
            'Submit the GHPP application (DHCS 4000) with medical and residency documentation',
            'GHPP assigns a Special Care Center; an income-based annual fee may apply'
        ]
    },
    {
        id: 'every-woman-counts',
        name: 'Every Woman Counts',
        category: 'healthcare',
        description: 'Free breast and cervical cancer screening and diagnostic services (mammograms, clinical breast exams, Pap and HPV tests) for underserved Californians. Available regardless of immigration status.',
        requirements: {
            state: ['CA'],
            income_fpl: 300
        },
        url: 'https://www.dhcs.ca.gov/services/cancer/ewc',
        howToApply: [
            'Call the referral line 1-800-511-2300 or use the online provider locator',
            'Enroll at the provider visit by confirming residency, income, and insurance status',
            'Receive screening and diagnostic follow-up (treatment referral via BCCTP if needed)'
        ]
    },
    {
        id: 'mcap',
        name: 'Medi-Cal Access Program (MCAP)',
        category: 'healthcare',
        description: 'Low-cost or no-cost comprehensive coverage for uninsured pregnant people whose income is too high for free Medi-Cal. Covers pregnancy through 60 days postpartum and the infant up to age 2, regardless of immigration status.',
        requirements: {
            state: ['CA'],
            pregnant: true,
            income_fpl_min: 213,
            income_fpl_max: 322
        },
        url: 'https://www.dhcs.ca.gov/services/medi-cal-resources/medi-cal-eligibility-division/welcome-to-the-medi-cal-access-program-en-espanol/',
        howToApply: [
            'Apply online at CoveredCA.com or call Covered California 1-800-300-1506',
            'Provide proof of pregnancy, income, and California residency',
            'Once approved, enroll with a participating Medi-Cal managed care plan'
        ]
    },
    {
        id: 'medi-cal-wdp',
        name: 'Medi-Cal 250% Working Disabled Program',
        category: 'healthcare',
        description: 'Lets working Californians with disabilities keep full-scope Medi-Cal (no premium as of 2022) while earning above standard Medi-Cal limits. Disability income is disregarded when counting income.',
        requirements: {
            state: ['CA'],
            has_disability: true,
            has_earned_income: true,
            income_fpl: 250
        },
        url: 'https://www.dhcs.ca.gov/services/working-disabled-program/',
        howToApply: [
            'Contact your county social services and request a 250% WDP evaluation',
            'Submit a Medi-Cal application with proof of disability and earned income',
            'County enrolls you; report ongoing work activity to keep eligibility'
        ]
    },
    {
        id: 'medicare-savings',
        name: 'Medicare Savings Programs (QMB/SLMB/QI)',
        category: 'healthcare',
        description: 'Medi-Cal programs that pay Medicare costs. QMB pays Part A and B premiums, deductibles, and coinsurance; SLMB and QI pay the Part B premium. Can save over $2,000 a year.',
        requirements: {
            on_medicare: true,
            income_fpl: 186
        },
        url: 'https://www.dhcs.ca.gov/individuals/medicare-savings-programs-in-california/',
        howToApply: [
            'Apply through your county Medi-Cal office or online at BenefitsCal.com',
            'Submit proof of Medicare entitlement, income, and identity',
            'County determines your program tier and Medicare premium payments begin'
        ]
    },
    {
        id: 'medicare-extra-help',
        name: 'Extra Help (Medicare Part D Low-Income Subsidy)',
        category: 'healthcare',
        description: 'Federal subsidy that lowers or eliminates Medicare Part D prescription drug premiums, deductibles, and copays. People with Medicaid, SSI, or a Medicare Savings Program qualify automatically.',
        requirements: {
            on_medicare: true,
            income_fpl: 150
        },
        url: 'https://www.ssa.gov/medicare/part-d-extra-help',
        howToApply: [
            'Apply online at secure.ssa.gov/i1020/start',
            'Or call SSA at 1-800-772-1213 or apply at a local SSA office',
            'After approval, enroll in or stay in a Part D plan to get the reduced costs'
        ]
    },
    {
        id: 'pace',
        name: 'PACE (Program of All-Inclusive Care for the Elderly)',
        category: 'seniors',
        description: 'Medicare/Medicaid program delivering fully integrated medical, adult day, and long-term care so frail adults 55+ can live in the community instead of a nursing home. For people age 55+ who need nursing-home level of care.',
        requirements: {
            state: ['CA'],
            age: ['60plus'],
            nursing_home_eligible: true
        },
        url: 'https://www.dhcs.ca.gov/services/long-term-care-alternatives-home-and-community-based-service-options/program-of-all-inclusive-care-for-the-elderly/',
        howToApply: [
            'Find a local PACE organization at calpace.org or Medicare.gov',
            'Contact the program to start enrollment and a needs assessment',
            'Obtain the state nursing-facility level-of-care determination and enroll'
        ]
    },
    {
        id: 'cbas',
        name: 'Community-Based Adult Services (CBAS)',
        category: 'seniors',
        description: 'Medi-Cal benefit delivering nursing care, therapies, personal care, social services, and meals at licensed adult day health centers, helping older and disabled adults avoid institutionalization.',
        requirements: {
            state: ['CA'],
            on_medi_cal: true,
            nursing_home_eligible: true
        },
        url: 'https://www.dhcs.ca.gov/services/community-based-adult-services/',
        howToApply: [
            'Have a referral made to your Medi-Cal managed care plan',
            'Plan conducts a face-to-face CBAS eligibility assessment within ~30 days',
            'If approved, attend a licensed CBAS center under a plan of care'
        ]
    },

    // ========== TAX CREDITS ==========
    {
        id: 'caleitc',
        name: 'CalEITC (California Earned Income Tax Credit)',
        category: 'tax',
        description: 'Refundable state credit for low-income working Californians, worth up to $3,756 for 2025. Paid as cash back even if you owe no tax. A valid SSN or ITIN is accepted.',
        requirements: {
            state: ['CA'],
            has_earned_income: true,
            income_max: 32900
        },
        url: 'https://www.ftb.ca.gov/file/personal/credits/california-earned-income-tax-credit.html',
        howToApply: [
            'File a California state tax return (Form 540 or 540 2EZ)',
            'Complete and attach form FTB 3514, or follow e-file prompts',
            'Use free tax prep (VITA) if you need help filing'
        ]
    },
    {
        id: 'yctc',
        name: 'Young Child Tax Credit (YCTC)',
        category: 'tax',
        description: 'Refundable California credit of up to $1,189 (2025) for CalEITC-eligible families with a child under age 6. Paid on top of CalEITC.',
        requirements: {
            state: ['CA'],
            has_earned_income: true,
            has_children_under_5: true,
            income_max: 35640
        },
        url: 'https://www.ftb.ca.gov/file/personal/credits/young-child-tax-credit.html',
        howToApply: [
            'File a California state tax return',
            'Complete and attach form FTB 3514 with your child\'s information',
            'Follow e-file prompts, or use free VITA tax prep'
        ]
    },
    {
        id: 'fytc',
        name: 'Foster Youth Tax Credit (FYTC)',
        category: 'tax',
        description: 'Refundable California credit of up to $1,189 (up to $2,378 per couple) for current and former foster youth ages 18-25 who were in California foster care at age 13 or older.',
        requirements: {
            state: ['CA'],
            has_earned_income: true,
            income_max: 32900
        },
        url: 'https://www.ftb.ca.gov/file/personal/credits/foster-youth-tax-credit.html',
        howToApply: [
            'File a California state tax return with form FTB 3514',
            'Consent to CDSS foster-care verification on line 33 of FTB 3514',
            'Claim the credit on your return'
        ]
    },
    {
        id: 'ctc',
        name: 'Child Tax Credit (CTC)',
        category: 'tax',
        description: 'Federal credit of up to $2,200 per qualifying child under 17 for 2025, with up to $1,700 per child refundable. Full credit for income up to $200,000 (single) or $400,000 (married filing jointly).',
        requirements: {
            has_children: true,
            income_max: 400000
        },
        url: 'https://www.irs.gov/credits-deductions/individuals/child-tax-credit',
        howToApply: [
            'File Form 1040 and list each qualifying child as a dependent',
            'Complete and attach Schedule 8812',
            'Claim any refundable Additional Child Tax Credit on Schedule 8812'
        ]
    },
    {
        id: 'renters-credit',
        name: 'California Nonrefundable Renter\'s Credit',
        category: 'tax',
        description: 'State tax credit of $60 (single) or $120 (married/head of household) for Californians who rented their main home at least half the year and meet income limits.',
        requirements: {
            state: ['CA'],
            is_renter: true,
            income_max: 54000
        },
        url: 'https://www.ftb.ca.gov/file/personal/credits/nonrefundable-renters-credit.html',
        howToApply: [
            'File a California state tax return (Form 540 or 540 2EZ)',
            'Confirm you meet residency, rent-paid, and income requirements',
            'Enter the credit on the Nonrefundable Renter\'s Credit line'
        ]
    },
    {
        id: 'child-dependent-care-credit',
        name: 'Child and Dependent Care Credit',
        category: 'tax',
        description: 'Federal credit for a percentage of work-related care costs paid so you can work or look for work, on up to $3,000 of expenses for one dependent or $6,000 for two or more.',
        requirements: {
            has_children: true,
            has_earned_income: true
        },
        url: 'https://www.irs.gov/credits-deductions/individuals/child-and-dependent-care-credit-information',
        howToApply: [
            'File Form 1040 and complete Form 2441',
            'Identify each care provider by name, address, and SSN/EIN',
            'Report qualifying expenses and dependents to compute the credit'
        ]
    },
    {
        id: 'savers-credit',
        name: 'Saver\'s Credit (Retirement Savings Contributions Credit)',
        category: 'tax',
        description: 'Federal credit worth 10-50% of what you put into an IRA or workplace retirement plan, up to a $1,000 credit ($2,000 if married filing jointly). Income limits vary by filing status (up to about $79,000 married).',
        requirements: {
            has_earned_income: true,
            income_max: 79000
        },
        url: 'https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-savings-contributions-credit-savers-credit',
        howToApply: [
            'Make eligible retirement contributions during the tax year',
            'Complete Form 8880',
            'Attach Form 8880 to your Form 1040 and claim the credit'
        ]
    },
    {
        id: 'aotc',
        name: 'American Opportunity Tax Credit (AOTC)',
        category: 'education',
        description: 'Federal education credit of up to $2,500 per student for the first four years of college, with up to $1,000 refundable. For income up to $90,000 (single) or $180,000 (married filing jointly).',
        requirements: {
            student_or_child_student: true,
            income_max: 180000
        },
        url: 'https://www.irs.gov/credits-deductions/individuals/american-opportunity-tax-credit',
        howToApply: [
            'Get Form 1098-T from the college',
            'Complete Form 8863 (Education Credits)',
            'Attach Form 8863 to your Form 1040 and claim the credit'
        ]
    },

    // ========== DISABILITY & DEVELOPMENTAL SERVICES ==========
    {
        id: 'regional-center',
        name: 'Regional Center Services (Lanterman Act)',
        category: 'disability',
        description: 'California\'s 21 regional centers coordinate lifelong services for people with developmental disabilities (intellectual disability, cerebral palsy, epilepsy, autism) that began before age 18. No income limit.',
        requirements: {
            state: ['CA'],
            has_disability: true
        },
        url: 'https://www.dds.ca.gov/rc/',
        howToApply: [
            'Contact the regional center serving your county to request an evaluation',
            'Complete the intake interview and diagnostic assessment',
            'If eligible, build an Individual Program Plan (IPP) with a service coordinator'
        ]
    },
    {
        id: 'early-start',
        name: 'Early Start (Early Intervention)',
        category: 'disability',
        description: 'California\'s early intervention system for infants and toddlers from birth to 36 months with a developmental delay or established risk condition, and their families. No income limit.',
        requirements: {
            state: ['CA'],
            has_children_under_5: true
        },
        url: 'https://www.dds.ca.gov/services/early-start/',
        howToApply: [
            'Refer your child to the local regional center or DDS BabyLine (800-515-2229)',
            'Regional center completes an evaluation and assessment',
            'If eligible, develop an Individualized Family Service Plan (IFSP)'
        ]
    },
    {
        id: 'dor-vr',
        name: 'Vocational Rehabilitation (Dept. of Rehabilitation)',
        category: 'disability',
        description: 'State services that help Californians with disabilities prepare for, obtain, keep, or advance in employment. People on SSI or SSDI are presumed eligible; no income limit for eligibility.',
        requirements: {
            state: ['CA'],
            has_disability: true
        },
        url: 'https://www.dor.ca.gov/Home/VocationalRehabilitation',
        howToApply: [
            'Submit the VR Services Application (DR 222) online, by mail, or at a local DOR office',
            'Attend an intake appointment with a VR counselor',
            'Counselor determines eligibility and develops an Individualized Plan for Employment'
        ]
    },
    {
        id: 'calable',
        name: 'CalABLE Savings Accounts',
        category: 'disability',
        description: 'Tax-advantaged savings and investment accounts that let Californians with disabilities save for disability-related expenses without losing means-tested benefits like SSI or Medi-Cal. Disability must have begun before age 46.',
        requirements: {
            has_disability: true
        },
        url: 'https://www.calable.ca.gov/',
        howToApply: [
            'Confirm eligibility using the CalABLE criteria',
            'Enroll online at calable.ca.gov and open an account',
            'Fund the account and choose savings or investment options'
        ]
    },
    {
        id: 'ticket-to-work',
        name: 'Ticket to Work',
        category: 'employment',
        description: 'Free, voluntary Social Security program that connects SSDI and SSI disability beneficiaries ages 18-64 with employment services and protections while they try working toward financial independence.',
        requirements: {
            has_disability: true
        },
        url: 'https://choosework.ssa.gov/',
        howToApply: [
            'Call the Ticket to Work Help Line at 1-866-968-7842 to verify eligibility',
            'Choose an approved Employment Network or State Vocational Rehabilitation agency',
            'Assign your Ticket and develop an Individual Work Plan'
        ]
    },
    {
        id: 'home-safe',
        name: 'Home Safe Program',
        category: 'housing',
        description: 'California program providing housing-related help to Adult Protective Services clients (elders 60+ or dependent adults with disabilities) who are homeless or at imminent risk due to abuse, neglect, or exploitation. No income limit.',
        requirements: {
            state: ['CA'],
            age_or_disability: true,
            housing_unstable: true
        },
        url: 'https://www.cdss.ca.gov/inforesources/cdss-programs/housing-programs/home-safe-program',
        howToApply: [
            'Contact or be referred to county Adult Protective Services (APS)',
            'APS assesses the case and screens for Home Safe eligibility',
            'Enroll to receive housing case management and financial assistance'
        ]
    },
    {
        id: 'aps',
        name: 'Adult Protective Services (APS)',
        category: 'seniors',
        description: 'County program that responds 24/7 to reports of abuse, neglect, self-neglect, and financial exploitation of elders 60+ and dependent adults 18-59 with disabilities, providing investigation, case management, and referrals. No income limit.',
        requirements: {
            state: ['CA'],
            age_or_disability: true
        },
        url: 'https://www.cdss.ca.gov/adult-protective-services',
        howToApply: [
            'Call the 24-hour statewide APS hotline at 1-833-401-0832',
            'APS conducts an in-person investigation and assessment',
            'APS provides case management, services, and referrals as needed'
        ]
    },
    {
        id: 'hicap',
        name: 'HICAP (Medicare Counseling)',
        category: 'seniors',
        description: 'Free, unbiased one-on-one counseling on Medicare, Medigap, Medicare Advantage, Part D, and appeals for Medicare beneficiaries, people approaching eligibility, and their families. No income limit.',
        requirements: {
            state: ['CA'],
            age: ['65plus']
        },
        url: 'https://aging.ca.gov/hicap/',
        howToApply: [
            'Call 1-800-434-0222 or visit aging.ca.gov to find your local HICAP office',
            'Schedule a free counseling appointment',
            'Meet with a certified HICAP counselor for personalized guidance'
        ]
    },

    // ========== VETERANS ==========
    {
        id: 'hud-vash',
        name: 'HUD-VASH (Veteran Supportive Housing)',
        category: 'veterans',
        description: 'Combines a HUD Housing Choice Voucher with VA case management and clinical services to help veterans experiencing homelessness get and keep permanent housing. No service-connected disability required.',
        requirements: {
            is_veteran: true,
            is_homeless: true
        },
        url: 'https://www.va.gov/homeless/hud-vash.asp',
        howToApply: [
            'Contact your nearest VA medical center and ask for the HUD-VASH program',
            'Or call the National Call Center for Homeless Veterans at 877-424-3838 (24/7)',
            'Complete a VA assessment and work with the housing authority to use the voucher'
        ]
    },
    {
        id: 'ssvf',
        name: 'Supportive Services for Veteran Families (SSVF)',
        category: 'veterans',
        description: 'VA-funded case management and time-limited financial help (rent, utilities, deposits) for very low-income veteran families who are homeless or at imminent risk of homelessness.',
        requirements: {
            is_veteran: true,
            housing_unstable: true
        },
        url: 'https://department.va.gov/homeless/supportive-services-for-veteran-families/',
        howToApply: [
            'Call the National Call Center for Homeless Veterans at 877-424-3838 (24/7)',
            'Or find and contact a local VA-funded SSVF grantee',
            'Complete intake and eligibility screening with a case manager'
        ]
    },
    {
        id: 'calvet-home-loan',
        name: 'CalVet Home Loan',
        category: 'veterans',
        description: 'State home financing for veterans buying an owner-occupied California home, with competitive rates, flexible underwriting, and no minimum credit score.',
        requirements: {
            state: ['CA'],
            is_veteran: true
        },
        url: 'https://www.calvet.ca.gov/HomeLoans',
        howToApply: [
            'Apply online at the CalVet Home Loans site or call 866-653-2510',
            'A CalVet representative reviews credit, assets, and repayment ability',
            'Complete underwriting and close on the California home'
        ]
    },
    {
        id: 'vre-ch31',
        name: 'Veteran Readiness and Employment (Chapter 31)',
        category: 'veterans',
        description: 'VA program helping veterans with a service-connected disability explore careers, get training, education, or coaching, and reach employment or independent living. Requires a service-connected disability rating of at least 10%.',
        requirements: {
            is_veteran: true,
            has_disability: true
        },
        url: 'https://www.va.gov/careers-employment/vocational-rehabilitation/',
        howToApply: [
            'Complete the VR&E online orientation on VA.gov',
            'File VA Form 28-1900 online, by mail, or at a VA Regional Office',
            'If eligible, meet a Vocational Rehabilitation Counselor to build a plan'
        ]
    },
    {
        id: 'calvet-veterans-homes',
        name: 'Veterans Homes of California',
        category: 'veterans',
        description: 'State-run residential homes offering veterans levels of care from independent living and residential care to skilled nursing and memory care. Generally for veterans age 55+ (waived for disabled or homeless veterans needing care).',
        requirements: {
            state: ['CA'],
            is_veteran: true
        },
        url: 'https://www.calvet.ca.gov/VetHomes',
        howToApply: [
            'Complete the Veterans Home of California admission application',
            'Gather your DD-214/proof of service, proof of medical insurance, and medical records',
            'Submit the application to CalVet for review and placement'
        ]
    },
    {
        id: 'dic',
        name: 'Dependency and Indemnity Compensation (DIC)',
        category: 'veterans',
        description: 'Tax-free monthly payment for eligible surviving spouses, children, and parents of service members who died in the line of duty or veterans who died from a service-connected condition.',
        requirements: {
            is_veteran_dependent: true
        },
        url: 'https://www.va.gov/family-and-caregiver-benefits/survivor-compensation/dependency-indemnity-compensation/',
        howToApply: [
            'Complete VA Form 21P-534EZ (spouse/child) or 21P-535 (parents)',
            'File online at VA.gov, by mail, or with an accredited representative',
            'Include the death certificate and marriage/dependency documents'
        ]
    },
    {
        id: 'champva',
        name: 'CHAMPVA (Health Coverage for Dependents)',
        category: 'veterans',
        description: 'VA cost-sharing health program covering eligible spouses, dependents, and survivors of veterans who are permanently and totally disabled from a service-connected condition or who died from one. Requires not being eligible for TRICARE.',
        requirements: {
            is_veteran_dependent: true
        },
        url: 'https://www.va.gov/family-and-caregiver-benefits/health-and-disability/champva/',
        howToApply: [
            'Complete VA Form 10-10d and VA Form 10-7959c',
            'Gather proof of the veteran\'s rating or cause of death and family documents',
            'Mail to the VHA Office of Community Care or call 800-733-8387 for help'
        ]
    },
    {
        id: 'va-aid-attendance',
        name: 'VA Aid and Attendance',
        category: 'veterans',
        description: 'Extra monthly amount added to a VA pension for wartime veterans or survivors who need another person\'s help with daily activities, are bedridden, or live in a nursing home. Adds several hundred dollars a month.',
        requirements: {
            is_veteran: true,
            income_fpl: 150
        },
        url: 'https://www.va.gov/pension/aid-attendance-housebound/',
        howToApply: [
            'Have a physician complete VA Form 21-2680',
            'Submit it with your pension claim online, by mail, or at a VA regional office',
            'Include supporting evidence and await the VA decision (call 800-827-1000 for help)'
        ]
    },

    // ========== EDUCATION & YOUTH OPPORTUNITY ==========
    {
        id: 'trio-sss',
        name: 'TRIO Student Support Services',
        category: 'education',
        description: 'Federal program funding colleges to provide tutoring, advising, and financial guidance that helps low-income, first-generation, and disabled students complete their degrees.',
        requirements: {
            student_or_child_student: true,
            income_fpl: 200
        },
        url: 'https://www.ed.gov/grants-and-programs/grants-higher-education/federal-trio-programs/student-support-services-program-84042a',
        howToApply: [
            'Enroll at a college that hosts a funded SSS project',
            'Contact that campus\'s TRIO/SSS office and complete its application',
            'Provide income, first-generation, or disability documentation'
        ]
    },
    {
        id: 'upward-bound',
        name: 'Upward Bound (TRIO)',
        category: 'education',
        description: 'Federal TRIO program giving high school students precollege instruction, tutoring, counseling, and college-prep support. Serves mainly low-income and potential first-generation college students.',
        requirements: {
            student_or_child_student: true,
            income_fpl: 150
        },
        url: 'https://www.ed.gov/grants-and-programs/grants-higher-education/federal-trio-programs/upward-bound-program-84047a',
        howToApply: [
            'Find a local Upward Bound project at a nearby college or school',
            'Submit the project\'s application, often through a school counselor',
            'Provide income and first-generation documentation and complete intake'
        ]
    },
    {
        id: 'talent-search',
        name: 'Educational Talent Search (TRIO)',
        category: 'education',
        description: 'Federal TRIO program helping disadvantaged youth ages 11-27 with counseling, college and career guidance, and financial aid information. Serves mainly low-income, potential first-generation students.',
        requirements: {
            student_or_child_student: true,
            income_fpl: 150
        },
        url: 'https://www.ed.gov/grants-and-programs/grants-higher-education/federal-trio-programs/talent-search-program-84044',
        howToApply: [
            'Locate a Talent Search project serving your school or community',
            'Complete the project\'s enrollment application, often through your school',
            'Submit income and first-generation documentation to begin advising'
        ]
    },
    {
        id: 'gear-up',
        name: 'GEAR UP',
        category: 'education',
        description: 'Federal program funding school-community partnerships to boost college readiness for low-income students, serving whole cohorts starting no later than 7th grade with tutoring, college visits, and scholarships.',
        requirements: {
            has_school_age_children: true,
            income_fpl: 185
        },
        url: 'https://www.ed.gov/grants-and-programs/grants-special-populations/grants-economically-disadvantaged-students/gaining-early-awareness-and-readiness-undergraduate-programs-gear-84334a84334s',
        howToApply: [
            'Confirm your school or district participates in a GEAR UP grant',
            'Opt in through the GEAR UP coordinator at your school',
            'Participate in cohort services like tutoring and college visits'
        ]
    },
    {
        id: 'americorps',
        name: 'AmeriCorps',
        category: 'education',
        description: 'National service program where members age 17+ serve full- or part-time terms addressing community needs and earn a living allowance plus a Segal Education Award for college or student loans.',
        requirements: {},
        url: 'https://www.americorps.gov/serve/americorps',
        howToApply: [
            'Create an account and search positions at my.americorps.gov',
            'Apply to a specific program or position and interview',
            'Accept placement, pass a background check, and begin your service term'
        ]
    },
    {
        id: 'chafee-grant',
        name: 'California Chafee Grant for Foster Youth',
        category: 'education',
        description: 'Grant of up to $5,000 a year for current or former foster youth (not yet 26) to pay for college or vocational training. Must have been in foster care between ages 16 and 18.',
        requirements: {
            state: ['CA'],
            student_or_child_student: true
        },
        url: 'https://www.csac.ca.gov/chafee',
        howToApply: [
            'Complete a FAFSA or California Dream Act Application',
            'Submit the Chafee Grant application at chafee.csac.ca.gov (Oct 1 - Jul 31)',
            'Verify foster-care history and stay enrolled at least half-time'
        ]
    },
    {
        id: 'eops',
        name: 'EOPS (Extended Opportunity Programs and Services)',
        category: 'education',
        description: 'California Community Colleges program providing counseling, financial help, book vouchers, and academic support to students disadvantaged by economic, educational, or language barriers.',
        requirements: {
            state: ['CA'],
            student_or_child_student: true,
            income_fpl: 200
        },
        url: 'https://www.cccco.edu/About-Us/Chancellors-Office/Divisions/Educational-Services-and-Support/Student-Service/What-we-do/Extended-Opportunity-Programs-and-Services',
        howToApply: [
            'Enroll at a California community college and complete the FAFSA or CA Dream Act Application',
            'Apply to that college\'s EOPS office with income and residency documents',
            'Complete EOPS orientation and required counseling appointments'
        ]
    },
    {
        id: 'golden-state-teacher',
        name: 'Golden State Teacher Grant',
        category: 'education',
        description: 'California grant of up to $10,000 for students in approved teacher or pupil-personnel preparation programs, in exchange for committing to teach two years at a high-need school.',
        requirements: {
            state: ['CA'],
            student_or_child_student: true
        },
        url: 'https://www.csac.ca.gov/golden-state-teacher-grant-program',
        howToApply: [
            'Enroll in a Commission on Teacher Credentialing-approved preparation program',
            'Submit the application at gstg.csac.ca.gov and sign the service agreement',
            'Complete the credential and serve two years at a priority school'
        ]
    },
    {
        id: 'college-corps',
        name: '#CaliforniansForAll College Corps',
        category: 'education',
        description: 'California program where undergraduates complete about 450 hours of community service over an academic year in exchange for roughly $10,000 in a living allowance plus an education award. Open to Dream Act students.',
        requirements: {
            state: ['CA'],
            student_or_child_student: true
        },
        url: 'https://www.californiavolunteers.ca.gov/college-corps/',
        howToApply: [
            'Confirm your college is a College Corps partner campus',
            'Submit the interest form through your campus program and attend an info session',
            'Complete onboarding and begin logging service hours'
        ]
    },
    {
        id: 'calkids',
        name: 'CalKIDS (College Savings for Kids)',
        category: 'education',
        description: 'State program that automatically creates college savings accounts with seed money for California newborns and low-income public school students. No application needed to receive the seed deposit.',
        requirements: {
            state: ['CA'],
            has_children: true
        },
        url: 'https://www.calkids.org',
        howToApply: [
            'Confirm eligibility by birth date or school enrollment (accounts are auto-created)',
            'Register and claim the account at calkids.org using your child\'s info',
            'Optionally link a ScholarShare 529 to add your own savings'
        ]
    },

    // ========== CHILDCARE ==========
    {
        id: 'early-head-start',
        name: 'Early Head Start',
        category: 'childcare',
        description: 'Free comprehensive child development, health, and family support for low-income infants and toddlers under age 3 and pregnant women. Families on TANF, SSI, or SNAP, in foster care, or experiencing homelessness qualify regardless of income.',
        requirements: {
            has_children_under_5: true,
            income_fpl: 100
        },
        url: 'https://www.headstart.gov/programs/article/early-head-start-programs',
        howToApply: [
            'Find a local program via the Head Start Locator or call 866-763-6481',
            'Contact the program and complete its enrollment forms',
            'Provide proof of income, child\'s age, and any categorical eligibility'
        ]
    },
    {
        id: 'state-preschool',
        name: 'California State Preschool Program',
        category: 'childcare',
        description: 'California\'s largest state-funded preschool program, offering free or low-cost part-day and full-day early education, meals, and family support to eligible 3- and 4-year-olds.',
        requirements: {
            state: ['CA'],
            has_children_under_5: true,
            income_fpl: 250
        },
        url: 'https://www.cde.ca.gov/sp/cd/op/cdprograms.asp',
        howToApply: [
            'Locate a State Preschool provider through CDE or your local resource & referral agency',
            'Contact the provider and complete its enrollment application',
            'Submit documentation of income, family size, and need'
        ]
    },
    {
        id: 'child-care-bridge',
        name: 'Emergency Child Care Bridge Program',
        category: 'childcare',
        description: 'California program giving foster families time-limited emergency child care vouchers, a child care navigator, and trauma-informed provider training. For foster children birth to age 5 (up to 21 with special needs) and their siblings.',
        requirements: {
            state: ['CA'],
            has_children_under_5: true
        },
        url: 'https://www.cdss.ca.gov/inforesources/calworks-child-care/ecc-bridge-program',
        howToApply: [
            'Ask the child\'s county social worker for a Bridge Program referral',
            'County determines eligibility and issues the emergency child care voucher',
            'Work with the local child care navigator to find a provider'
        ]
    },

    // ========== FOOD ==========
    {
        id: 'cacfp',
        name: 'CACFP (Child & Adult Care Food Program)',
        category: 'food',
        description: 'USDA program that reimburses child care centers, day care homes, afterschool programs, shelters, and adult day care for nutritious meals and snacks. Enrolled children get free meals at or below 130% FPL and reduced-price up to 185% FPL.',
        requirements: {
            has_children: true,
            income_fpl: 185
        },
        url: 'https://www.fns.usda.gov/cacfp',
        howToApply: [
            'Choose a child care provider or center that participates in CACFP',
            'Submit a household income eligibility form to the provider',
            'Your child receives meals at the free or reduced-price tier'
        ]
    },
    {
        id: 'tefap',
        name: 'TEFAP (Emergency Food Assistance)',
        category: 'food',
        description: 'Federal program providing USDA foods at no cost to low-income households through food banks, pantries, and soup kitchens. Recipients of prepared meals at shelters need no income test.',
        requirements: {
            income_fpl: 185
        },
        url: 'https://www.fns.usda.gov/tefap',
        howToApply: [
            'Find a local TEFAP pantry or food bank through your state agency or call 211',
            'Visit the site during distribution hours',
            'Self-certify or show proof of income and residency per your state\'s rules'
        ]
    },
    {
        id: 'senior-farmers-market',
        name: 'Senior Farmers\' Market Nutrition Program',
        category: 'food',
        description: 'Provides low-income seniors 60+ with benefits to buy fresh, locally grown fruits, vegetables, honey, and herbs at farmers\' markets, roadside stands, and CSA programs.',
        requirements: {
            state: ['CA'],
            age: ['60plus'],
            income_fpl: 185
        },
        url: 'https://www.cdfa.ca.gov/SeniorFarmersMrktNutritionPrgm/',
        howToApply: [
            'Apply in person through your local Area Agency on Aging',
            'Provide proof of age, residency, and income',
            'Receive benefits and redeem them at authorized farmers\' markets'
        ]
    },
    {
        id: 'wic-fmnp',
        name: 'WIC Farmers\' Market Nutrition Program',
        category: 'food',
        description: 'Gives WIC participants extra coupons, on top of regular WIC benefits, to buy fresh locally grown fruits, vegetables, and herbs at authorized farmers\' markets.',
        requirements: {
            state: ['CA'],
            has_children_under_5: true,
            income_fpl: 185
        },
        url: 'https://www.fns.usda.gov/fmnp',
        howToApply: [
            'Enroll in or be certified for WIC at your local WIC agency',
            'Request FMNP coupons from the WIC clinic during market season',
            'Redeem coupons at FMNP-authorized farmers\' markets'
        ]
    },
    {
        id: 'market-match',
        name: 'CalFresh Market Match',
        category: 'food',
        description: 'California program that matches CalFresh/EBT spending dollar-for-dollar (up to a daily maximum) on fresh fruits and vegetables at 270+ participating farmers\' markets and farm stands.',
        requirements: {
            state: ['CA'],
            receives_calfresh: true
        },
        url: 'https://marketmatch.org/',
        howToApply: [
            'Enroll in CalFresh (GetCalFresh.org) to get an EBT card',
            'Find a participating market with the Market Match finder',
            'Swipe your EBT card at the market booth to receive matching tokens'
        ]
    },

    // ========== HOUSING ==========
    {
        id: 'fss',
        name: 'Family Self-Sufficiency (FSS)',
        category: 'housing',
        description: 'HUD program for families receiving housing assistance: as your earnings rise, the resulting rent increases are placed into an escrow savings account you can claim after completing a 5-year plan.',
        requirements: {
            is_renter: true,
            income_fpl: 80
        },
        url: 'https://www.hud.gov/program_offices/public_indian_housing/programs/hcv/fss',
        howToApply: [
            'Confirm you receive HUD housing assistance and your PHA runs FSS',
            'Contact the PHA or owner FSS coordinator and submit the application',
            'Sign the Contract of Participation; an escrow account is established'
        ]
    },
    {
        id: 'calworks-hsp',
        name: 'CalWORKs Housing Support Program',
        category: 'housing',
        description: 'California program using a Housing First model to help CalWORKs families who are homeless or at risk of homelessness get rental assistance and wraparound services.',
        requirements: {
            state: ['CA'],
            has_children: true,
            housing_unstable: true
        },
        url: 'https://www.cdss.ca.gov/inforesources/cdss-programs/housing-programs/calworks-housing-support-program',
        howToApply: [
            'Enroll in or be receiving CalWORKs',
            'Contact your county welfare department or its HSP point of contact',
            'Complete county HSP intake to receive rental help and services'
        ]
    },
    {
        id: 'bringing-families-home',
        name: 'Bringing Families Home',
        category: 'housing',
        description: 'California program providing rental assistance and housing services to child-welfare-involved families who are homeless or at risk, to support family reunification and prevent foster placement.',
        requirements: {
            state: ['CA'],
            has_children: true,
            housing_unstable: true
        },
        url: 'https://www.cdss.ca.gov/inforesources/cdss-programs/housing-programs/bringing-families-home',
        howToApply: [
            'Have an open case with your county child welfare agency',
            'Ask your child welfare social worker for a BFH referral',
            'Complete the BFH assessment to receive rental assistance and services'
        ]
    },

    // ========== UTILITIES ==========
    {
        id: 'esa',
        name: 'Energy Savings Assistance Program (ESA)',
        category: 'utilities',
        description: 'Offers income-qualified households free home weatherization and energy-efficiency upgrades — attic insulation, efficient refrigerators and furnaces, weatherstripping, and LEDs — to lower energy bills.',
        requirements: {
            state: ['CA'],
            income_fpl: 200
        },
        url: 'https://www.cpuc.ca.gov/consumer-support/financial-assistance-savings-and-discounts/energy-savings-assistance-program',
        howToApply: [
            'Contact your utility (PG&E, SCE, SoCalGas, or SDG&E) or apply on its ESA page',
            'Submit income documentation or proof of program participation',
            'Schedule the in-home assessment; a contractor installs free upgrades'
        ]
    },

    // ========== EMPLOYMENT & TRAINING ==========
    {
        id: 'wioa',
        name: 'WIOA Employment & Training',
        category: 'employment',
        description: 'Federal employment and training services delivered through job centers for adults and dislocated workers, including career counseling, skills training, and job placement. Priority for low-income and public-assistance recipients; veterans get priority.',
        requirements: {},
        url: 'https://www.dol.gov/agencies/eta/workforce-investment/adult',
        howToApply: [
            'Visit a local America\'s Job Center of California (AJCC)',
            'Complete registration and an eligibility and needs assessment',
            'Receive career services and, if enrolled, a training plan'
        ]
    },
    {
        id: 'scsep',
        name: 'SCSEP (Senior Employment Program)',
        category: 'employment',
        description: 'Paid, part-time community-service job training for low-income adults 55+ to build skills toward regular employment. Participants earn minimum wage for about 20 hours a week.',
        requirements: {
            age: ['60plus'],
            income_fpl: 125
        },
        url: 'https://www.dol.gov/agencies/eta/seniors',
        howToApply: [
            'Contact your local Area Agency on Aging or a SCSEP grantee',
            'Apply and verify age, income, and work authorization',
            'Get a community-service training placement and an employment plan'
        ]
    },
    {
        id: 'ajcc',
        name: 'America\'s Job Center of California (AJCC)',
        category: 'employment',
        description: 'California\'s network of one-stop career centers offering free job search help, resume workshops, skills assessments, labor-market info, and training referrals to all job seekers.',
        requirements: {},
        url: 'https://edd.ca.gov/en/jobs_and_training/TCLobby/',
        howToApply: [
            'Find your nearest AJCC using the EDD office locator',
            'Register in CalJOBS at caljobs.ca.gov or visit a center in person',
            'Meet with staff for assessment and enroll in services or training'
        ]
    },

];

// Federal Poverty Level — monthly, contiguous US.
// Source: 2026 HHS Poverty Guidelines (effective Jan 13, 2026), annual ÷ 12.
// UPDATE ANNUALLY: new guidelines publish each January.
const fplMonthly = {
    1: 1330,  // $15,960/yr
    2: 1803,  // $21,640/yr
    3: 2277,  // $27,320/yr
    4: 2750,  // $33,000/yr
    5: 3223,  // $38,680/yr
    6: 3697,  // $44,360/yr
    7: 4170,  // $50,040/yr
    8: 4643   // $55,720/yr
};

// Calculate FPL percentage
function calculateFPLPercent(monthlyIncome, householdSize) {
    const baseFPL = fplMonthly[Math.min(householdSize, 8)];
    return Math.round((monthlyIncome / baseFPL) * 100);
}

// Categories for organizing results
const categories = {
    healthcare: { name: 'Healthcare', icon: '🏥' },
    food: { name: 'Food Assistance', icon: '🍎' },
    cash: { name: 'Cash Assistance', icon: '💵' },
    housing: { name: 'Housing', icon: '🏠' },
    utilities: { name: 'Utilities & Internet', icon: '⚡' },
    seniors: { name: 'Seniors & Disability', icon: '👴' },
    childcare: { name: 'Childcare', icon: '👶' },
    education: { name: 'Education', icon: '🎓' },
    disability: { name: 'Disability & Leave', icon: '♿' },
    transportation: { name: 'Transportation', icon: '🚌' },
    tax: { name: 'Tax Credits', icon: '💰' },
    veterans: { name: 'Veterans', icon: '🎖️' },
    immigrants: { name: 'Immigrants & Refugees', icon: '🌎' },
    employment: { name: 'Employment & Training', icon: '💼' },
    other: { name: 'Other Resources', icon: '📞' }
};
