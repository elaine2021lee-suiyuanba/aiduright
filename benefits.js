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
