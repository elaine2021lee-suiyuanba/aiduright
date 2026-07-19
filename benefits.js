// AiduRight - Benefits Database
// This file contains all benefit programs and their eligibility requirements

const benefits = [
    {
        id: 'medi-cal',
        name: 'Medi-Cal',
        category: 'healthcare',
        description: 'Free or low-cost health coverage for Californians with limited income.',
        requirements: {
            state: ['CA'],
            income: ['under1500', '1500-3000']
        },
        url: 'https://www.dhcs.ca.gov/services/medi-cal',
        howToApply: [
            'Visit Covered California or your county office',
            'Bring proof of income and ID',
            'Fill out the application'
        ]
    },
    {
        id: 'calfresh',
        name: 'CalFresh (SNAP)',
        category: 'food',
        description: 'Monthly food benefits to help buy groceries. Formerly known as Food Stamps.',
        requirements: {
            state: ['CA'],
            income: ['under1500', '1500-3000']
        },
        url: 'https://www.getcalfresh.org/',
        howToApply: [
            'Apply online at GetCalFresh.org',
            'Complete phone interview',
            'Submit verification documents'
        ]
    },
    {
        id: 'medicare',
        name: 'Medicare',
        category: 'healthcare',
        description: 'Federal health insurance for people 65 or older.',
        requirements: {
            age: ['65plus']
        },
        url: 'https://www.medicare.gov/',
        howToApply: [
            'Sign up during your Initial Enrollment Period',
            'Apply at ssa.gov or call Social Security',
            'Choose your coverage options'
        ]
    },
    {
        id: 'ssi',
        name: 'Supplemental Security Income (SSI)',
        category: 'cash',
        description: 'Monthly cash assistance for people 65+, blind, or disabled with limited income.',
        requirements: {
            age: ['65plus'],
            income: ['under1500', '1500-3000']
        },
        url: 'https://www.ssa.gov/ssi/',
        howToApply: [
            'Apply at your local Social Security office',
            'Bring medical records if applying for disability',
            'Provide proof of income and resources'
        ]
    },
    {
        id: 'liheap',
        name: 'LIHEAP (Utility Assistance)',
        category: 'utilities',
        description: 'Help paying heating and cooling bills for low-income households.',
        requirements: {
            income: ['under1500', '1500-3000', '3000-5000']
        },
        url: 'https://www.acf.hhs.gov/ocs/low-income-home-energy-assistance-program-liheap',
        howToApply: [
            'Contact your local LIHEAP agency',
            'Provide proof of income',
            'Show recent utility bills'
        ]
    }
];

// Categories for organizing results
const categories = {
    healthcare: { name: 'Healthcare', icon: '🏥' },
    food: { name: 'Food Assistance', icon: '🍎' },
    cash: { name: 'Cash Assistance', icon: '💵' },
    housing: { name: 'Housing', icon: '🏠' },
    utilities: { name: 'Utilities', icon: '💡' },
    jobs: { name: 'Jobs & Training', icon: '💼' }
};
