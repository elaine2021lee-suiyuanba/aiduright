// Official application routes and document sources are recorded per program below.
// Each source URL cites the official checklist (where available).
// See next-steps-research.md for verification limitations.
const NEXT_STEPS = {
  "211": {
    "url": "https://211ca.org/find-your-local-211/",
    "documents": [],
    "source": "https://211ca.org/find-your-local-211/",
    "kind": "local",
    "phone": "211"
  },
  "medi-cal": {
    "url": "https://benefitscal.com/ApplyForBenefits/begin/ABOVR?lang=en",
    "documents": [
      "photo_id",
      "ssn",
      "immigration_docs",
      "proof_income"
    ],
    "source": "https://www.dhcs.ca.gov/medi-cal/help",
    "kind": "apply"
  },
  "medicare": {
    "url": "https://www.ssa.gov/medicare/sign-up",
    "documents": [],
    "source": "https://www.ssa.gov/medicare/sign-up",
    "kind": "apply"
  },
  "covered-ca": {
    "url": "https://www.coveredca.com/apply/",
    "documents": [
      "proof_income",
      "photo_id",
      "immigration_docs",
      "ssn",
      "tax_return"
    ],
    "source": "https://www.coveredca.com/enrollment/documents",
    "kind": "apply"
  },
  "calfresh": {
    "url": "https://benefitscal.com/ApplyForBenefits/begin/ABOVR?lang=en",
    "documents": [
      "photo_id",
      "proof_income",
      "immigration_docs"
    ],
    "source": "https://www.cdss.ca.gov/Portals/9/calfreshoutreach/Partners/CalFresh%20General%20Toolkit%20One%20Pager-%20Application%20Journey.pdf",
    "kind": "apply"
  },
  "wic": {
    "url": "https://myfamily.wic.ca.gov/Home/WICOfficeGrocer",
    "documents": [
      "photo_id",
      "child_info",
      "proof_address",
      "proof_income"
    ],
    "source": "https://myfamily.wic.ca.gov/Home/HowCanIGetWIC",
    "kind": "local",
    "phone": "1-800-852-5770"
  },
  "school-meals": {
    "url": "https://www.cde.ca.gov/ls/nu/sn/eligmaterials.asp",
    "documents": [],
    "source": "https://www.cde.ca.gov/ls/nu/sn/eligmaterials.asp",
    "kind": "info"
  },
  "summer-ebt": {
    "url": "https://www.cdss.ca.gov/sun-bucks",
    "documents": [],
    "source": "https://www.cdss.ca.gov/sun-bucks",
    "kind": "info",
    "phone": "1-877-328-9677"
  },
  "sfsp": {
    "url": "https://www.cde.ca.gov/ds/sh/sn/summersites.asp",
    "documents": [],
    "source": "https://www.cde.ca.gov/ds/sh/sn/summersites.asp",
    "kind": "local"
  },
  "csfp": {
    "url": "https://www.cdss.ca.gov/inforesources/fdu",
    "documents": [],
    "source": "https://www.cdss.ca.gov/inforesources/fdu",
    "kind": "local"
  },
  "ssi": {
    "url": "https://www.ssa.gov/apply/ssi",
    "documents": [
      "ssn",
      "birth_certificate",
      "immigration_docs",
      "proof_income",
      "bank_statements",
      "lease",
      "medical_records"
    ],
    "source": "https://www.ssa.gov/ssi/text-documents-ussi.htm",
    "kind": "apply"
  },
  "calworks": {
    "url": "https://benefitscal.com/ApplyForBenefits/begin/ABOVR?lang=en",
    "documents": [],
    "source": "https://www.benefitscal.com/",
    "kind": "apply"
  },
  "ga": {
    "url": "https://benefitscal.com/ApplyForBenefits/begin/ABOVR?lang=en",
    "documents": [],
    "source": "https://www.benefitscal.com/",
    "kind": "apply"
  },
  "section8": {
    "url": "https://www.hud.gov/contactus/public-housing-contacts",
    "documents": [],
    "source": "https://www.hud.gov/contactus/public-housing-contacts",
    "kind": "local"
  },
  "lihtc": {
    "url": "https://resources.hud.gov/",
    "documents": [],
    "source": "https://www.hud.gov/states/california",
    "kind": "local"
  },
  "erap": {
    "url": "https://211ca.org/find-your-local-211/",
    "documents": [],
    "source": "https://211ca.org/find-your-local-211/",
    "kind": "local",
    "phone": "211"
  },
  "liheap": {
    "url": "https://www.csd.ca.gov/Pages/FindServicesInYourArea.aspx?ct=Energy_Bill",
    "documents": [
      "proof_income",
      "proof_address",
      "photo_id"
    ],
    "source": "https://www.csd.ca.gov/Shared%20Documents/2026-Final-LIHEAP-State-Plan.pdf",
    "kind": "local",
    "phone": "1-866-675-6623"
  },
  "care": {
    "url": "https://www.cpuc.ca.gov/care",
    "documents": [],
    "source": "https://www.cpuc.ca.gov/care",
    "kind": "local"
  },
  "fera": {
    "url": "https://www.cpuc.ca.gov/care",
    "documents": [],
    "source": "https://www.cpuc.ca.gov/care",
    "kind": "local"
  },
  "lifeline": {
    "url": "https://www.californialifeline.com/en/provider_search",
    "documents": [],
    "source": "https://www.californialifeline.com/en",
    "kind": "local"
  },
  "ihss": {
    "url": "https://www.cdss.ca.gov/inforesources/county-ihss-offices",
    "documents": [
      "benefit_proof",
      "medical_records"
    ],
    "source": "https://www.cdss.ca.gov/in-home-supportive-services/ihss/apply-for-ihss",
    "kind": "local"
  },
  "mssp": {
    "url": "https://www.aging.ca.gov/Find_Services_in_My_County/",
    "documents": [],
    "source": "https://aging.ca.gov/Programs_and_Services/Multipurpose_Senior_Services_Program/",
    "kind": "local"
  },
  "senior-nutrition": {
    "url": "https://www.aging.ca.gov/Find_Services_in_My_County/",
    "documents": [],
    "source": "https://www.aging.ca.gov/Find_Services_in_My_County/",
    "kind": "local"
  },
  "head-start": {
    "url": "https://headstart.gov/center-locator",
    "documents": [],
    "source": "https://headstart.gov/center-locator",
    "kind": "local"
  },
  "ccap": {
    "url": "https://mychildcareplan.org/",
    "documents": [],
    "source": "https://mychildcareplan.org/",
    "kind": "local"
  },
  "pell-grant": {
    "url": "https://studentaid.gov/h/apply-for-aid/fafsa",
    "documents": [
      "ssn",
      "tax_return",
      "bank_statements",
      "proof_income"
    ],
    "source": "https://studentaid.gov/help/info-needed",
    "kind": "apply"
  },
  "cal-grant": {
    "url": "https://www.csac.ca.gov/cal-grant",
    "documents": [],
    "source": "https://www.csac.ca.gov/cal-grant",
    "kind": "info"
  },
  "ssdi": {
    "url": "https://www.ssa.gov/applyfordisability/",
    "documents": [
      "ssn",
      "medical_records"
    ],
    "source": "https://www.ssa.gov/disability/Documents/Adult%20Disability%20Starter%20Kit%20Checklist.pdf",
    "kind": "apply"
  },
  "sdi": {
    "url": "https://edd.ca.gov/sdi_online",
    "documents": [
      "medical_records",
      "proof_income"
    ],
    "source": "https://edd.ca.gov/en/disability/how_to_file_a_di_claim_by_mail",
    "kind": "apply"
  },
  "pfl": {
    "url": "https://edd.ca.gov/sdi_online",
    "documents": [
      "medical_records"
    ],
    "source": "https://edd.ca.gov/en/Disability/Am_I_Eligible_for_PFL_Benefits",
    "kind": "apply"
  },
  "transit-discount": {
    "url": "https://www.transit.dot.gov/ntd/transit-agency-profiles?field_address_administrative_area=CA",
    "documents": [],
    "source": "https://www.transit.dot.gov/ntd/transit-agency-profiles?field_address_administrative_area=CA",
    "kind": "local"
  },
  "paratransit": {
    "url": "https://www.transit.dot.gov/ntd/transit-agency-profiles?field_address_administrative_area=CA",
    "documents": [],
    "source": "https://www.transit.dot.gov/ntd/transit-agency-profiles?field_address_administrative_area=CA",
    "kind": "local"
  },
  "legal-aid": {
    "url": "https://lawhelpca.org/",
    "documents": [],
    "source": "https://lawhelpca.org/",
    "kind": "local"
  },
  "food-bank": {
    "url": "https://www.cafoodbanks.org/our-members/",
    "documents": [],
    "source": "https://www.cdss.ca.gov/inforesources/fdu",
    "kind": "local"
  },
  "eitc": {
    "url": "https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit-eitc",
    "documents": [
      "ssn",
      "proof_income",
      "tax_return"
    ],
    "source": "https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit/how-to-work-with-a-tax-professional-to-claim-the-earned-income-tax-credit-eitc",
    "kind": "info"
  },
  "free-tax-prep": {
    "url": "https://www.irs.gov/individuals/free-tax-return-preparation-for-qualifying-taxpayers",
    "documents": [],
    "source": "https://www.irs.gov/individuals/free-tax-return-preparation-for-qualifying-taxpayers",
    "kind": "local"
  },
  "va-healthcare": {
    "url": "https://www.va.gov/health-care/how-to-apply/",
    "documents": [
      "ssn",
      "dd214"
    ],
    "source": "https://www.va.gov/health-care/how-to-apply/",
    "kind": "apply"
  },
  "gi-bill": {
    "url": "https://www.va.gov/education/how-to-apply/",
    "documents": [],
    "source": "https://www.va.gov/education/how-to-apply/",
    "kind": "apply"
  },
  "calvet-fee-waiver": {
    "url": "https://www.calvet.ca.gov/VetServices/Pages/County-Veterans-Service-Offices.aspx",
    "documents": [],
    "source": "https://www.calvet.ca.gov/VetServices/Pages/College-Fee-Waiver.aspx",
    "kind": "local"
  },
  "vhhp": {
    "url": "https://www.calvet.ca.gov/VetServices/Pages/VetHousing-Region-All.aspx",
    "documents": [],
    "source": "https://www.hcd.ca.gov/grants-and-funding/programs-active/veterans-housing-and-homelessness-prevention-program",
    "kind": "info",
    "phone": "1-877-424-3838"
  },
  "va-disability": {
    "url": "https://www.va.gov/disability/how-to-file-claim/",
    "documents": [
      "dd214",
      "medical_records"
    ],
    "source": "https://www.va.gov/disability/how-to-file-claim/evidence-needed",
    "kind": "apply"
  },
  "va-pension": {
    "url": "https://www.va.gov/pension/how-to-apply/",
    "documents": [
      "dd214",
      "proof_income",
      "medical_records"
    ],
    "source": "https://www.va.gov/resources/evidence-to-support-va-pension-dic-or-accrued-benefits-claims",
    "kind": "apply"
  },
  "capi": {
    "url": "https://www.cdss.ca.gov/Benefits-Services/Cash-Assistance/CalWORKS/County-Offices",
    "documents": [],
    "source": "https://www.cdss.ca.gov/capi",
    "kind": "local"
  },
  "rca": {
    "url": "https://www.cdss.ca.gov/inforesources/refugees",
    "documents": [],
    "source": "https://www.cdss.ca.gov/inforesources/refugees",
    "kind": "info"
  },
  "rma": {
    "url": "https://www.cdss.ca.gov/inforesources/refugees",
    "documents": [],
    "source": "https://www.cdss.ca.gov/inforesources/refugees",
    "kind": "info"
  },
  "cfap": {
    "url": "https://calfresh.dss.ca.gov/food/",
    "documents": [],
    "source": "https://www.cdss.ca.gov/inforesources/cdss-programs/calfresh/cfap/how-to-apply",
    "kind": "apply",
    "phone": "1-877-847-3663"
  },
  "calworks-ha": {
    "url": "https://www.cdss.ca.gov/Benefits-Services/Cash-Assistance/CalWORKS/County-Offices",
    "documents": [],
    "source": "https://www.cdss.ca.gov/inforesources/cdss-programs/housing-programs/calworks-homeless-assistance",
    "kind": "local"
  },
  "hdap": {
    "url": "https://www.cdss.ca.gov/Benefits-Services/Cash-Assistance/CalWORKS/County-Offices",
    "documents": [],
    "source": "https://www.cdss.ca.gov/inforesources/cdss-programs/housing-programs/hdap",
    "kind": "local"
  },
  "public-housing": {
    "url": "https://www.hud.gov/contactus/public-housing-contacts",
    "documents": [],
    "source": "https://www.hud.gov/contactus/public-housing-contacts",
    "kind": "local"
  },
  "usda-rural": {
    "url": "https://www.rd.usda.gov/programs-services/single-family-housing-programs",
    "documents": [],
    "source": "https://www.rd.usda.gov/programs-services/single-family-housing-programs",
    "kind": "info"
  },
  "denti-cal": {
    "url": "https://www.denti-cal.ca.gov/",
    "documents": [],
    "source": "https://www.denti-cal.ca.gov/",
    "kind": "info"
  },
  "chip": {
    "url": "https://benefitscal.com/ApplyForBenefits/begin/ABOVR?lang=en",
    "documents": [],
    "source": "https://www.dhcs.ca.gov/medi-cal/apply/",
    "kind": "apply"
  },
  "family-pact": {
    "url": "https://familypact.org/provider-search/",
    "documents": [],
    "source": "https://familypact.org/provider-search/",
    "kind": "local"
  },
  "cmsp": {
    "url": "https://cmspcounties.org/apply-now/",
    "documents": [],
    "source": "https://cmspcounties.org/apply-now/",
    "kind": "local"
  },
  "fseog": {
    "url": "https://studentaid.gov/h/apply-for-aid/fafsa",
    "documents": [
      "ssn",
      "tax_return",
      "bank_statements",
      "proof_income"
    ],
    "source": "https://studentaid.gov/help/info-needed",
    "kind": "apply"
  },
  "work-study": {
    "url": "https://studentaid.gov/h/apply-for-aid/fafsa",
    "documents": [
      "ssn",
      "tax_return",
      "bank_statements",
      "proof_income"
    ],
    "source": "https://studentaid.gov/help/info-needed",
    "kind": "apply"
  },
  "ca-dream-act": {
    "url": "https://dream.csac.ca.gov/landing",
    "documents": [],
    "source": "https://www.csac.ca.gov/apply",
    "kind": "apply"
  },
  "middle-class-scholarship": {
    "url": "https://www.csac.ca.gov/middle-class-scholarship",
    "documents": [],
    "source": "https://www.csac.ca.gov/middle-class-scholarship",
    "kind": "info"
  },
  "bog-fee-waiver": {
    "url": "https://www.cccapply.org/us/money/california-college-promise-grant",
    "documents": [],
    "source": "https://www.cccco.edu/Students/Support-Services",
    "kind": "info"
  },
  "unemployment": {
    "url": "https://edd.ca.gov/en/unemployment/",
    "documents": [
      "ssn",
      "photo_id",
      "proof_address",
      "proof_income",
      "immigration_docs",
      "dd214"
    ],
    "source": "https://edd.ca.gov/en/unemployment/step-1-get-your-information-in-order",
    "kind": "apply"
  },
  "calfresh-employment": {
    "url": "https://www.cdss.ca.gov/Benefits-Services/Cash-Assistance/CalWORKS/County-Offices",
    "documents": [],
    "source": "https://www.cdss.ca.gov/inforesources/cdss-programs/calfresh/employment-and-training",
    "kind": "local"
  },
  "wap": {
    "url": "https://www.csd.ca.gov/Pages/FindServicesInYourArea.aspx",
    "documents": [],
    "source": "https://www.csd.ca.gov/Pages/ProgramsList.aspx",
    "kind": "local"
  },
  "reach": {
    "url": "https://www.pge.com/en/account/billing-and-assistance/financial-assistance.html",
    "documents": [],
    "source": "https://www.pge.com/en/account/billing-and-assistance/financial-assistance.html",
    "kind": "local"
  },
  "medical-baseline": {
    "url": "https://www.cpuc.ca.gov/consumer-support/financial-assistance-savings-and-discounts/medical-baseline",
    "documents": [],
    "source": "https://www.cpuc.ca.gov/consumer-support/financial-assistance-savings-and-discounts/medical-baseline",
    "kind": "local"
  },
  "calfresh-restaurant": {
    "url": "https://www.cdss.ca.gov/inforesources/calfresh/restaurant-meals-program",
    "documents": [],
    "source": "https://www.cdss.ca.gov/inforesources/calfresh/restaurant-meals-program",
    "kind": "info"
  },
  "produce-rx": {
    "url": "https://211ca.org/find-your-local-211/",
    "documents": [],
    "source": "https://211ca.org/find-your-local-211/",
    "kind": "info",
    "phone": "211"
  },
  "senior-legal": {
    "url": "https://www.aging.ca.gov/Find_Services_in_My_County/",
    "documents": [],
    "source": "https://www.aging.ca.gov/Find_Services_in_My_County/",
    "kind": "local"
  },
  "ombudsman": {
    "url": "https://www.aging.ca.gov/Find_Services_in_My_County/",
    "documents": [],
    "source": "https://www.aging.ca.gov/Programs_and_Services/Long-Term_Care_Ombudsman/",
    "kind": "local"
  },
  "healthy-sf": {
    "url": "https://healthysanfrancisco.org/",
    "documents": [],
    "source": "https://healthysanfrancisco.org/",
    "kind": "local"
  },
  "ccs": {
    "url": "https://www.dhcs.ca.gov/services/ccs/Pages/CountyOffices.aspx",
    "documents": [],
    "source": "https://www.dhcs.ca.gov/services/ccs/Pages/CountyOffices.aspx",
    "kind": "local"
  },
  "ghpp": {
    "url": "https://www.dhcs.ca.gov/services/genetically-handicapped-persons-program/how-to-apply-apply",
    "documents": [
      "proof_address",
      "proof_income",
      "medical_records"
    ],
    "source": "https://www.dhcs.ca.gov/services/genetically-handicapped-persons-program/how-to-apply-apply",
    "kind": "apply",
    "phone": "916-713-8400"
  },
  "every-woman-counts": {
    "url": "https://apps.dhcs.ca.gov/PCPSearch/",
    "documents": [],
    "source": "https://www.dhcs.ca.gov/services/every-woman-counts/",
    "kind": "local",
    "phone": "1-800-511-2300"
  },
  "mcap": {
    "url": "https://www.coveredca.com/enrollment",
    "documents": [],
    "source": "https://www.dhcs.ca.gov/services/medi-cal-resources/medi-cal-eligibility-division/welcome-to-the-medi-cal-access-program-en-espanol/",
    "kind": "apply"
  },
  "medi-cal-wdp": {
    "url": "https://www.dhcs.ca.gov/services/medi-cal-resources/county-offices/",
    "documents": [],
    "source": "https://www.dhcs.ca.gov/services/working-disabled-program/",
    "kind": "local"
  },
  "medicare-savings": {
    "url": "https://benefitscal.com/ApplyForBenefits/begin/ABOVR?lang=en",
    "documents": [],
    "source": "https://www.dhcs.ca.gov/individuals/medicare-savings-programs-in-california/",
    "kind": "apply"
  },
  "medicare-extra-help": {
    "url": "https://www.ssa.gov/extrahelp",
    "documents": [],
    "source": "https://www.ssa.gov/extrahelp",
    "kind": "apply"
  },
  "pace": {
    "url": "https://www.dhcs.ca.gov/individuals/california-program-of-all-inclusive-care-for-the-elderly-plans/",
    "documents": [],
    "source": "https://www.dhcs.ca.gov/individuals/california-program-of-all-inclusive-care-for-the-elderly-plans/",
    "kind": "local"
  },
  "cbas": {
    "url": "https://www.dhcs.ca.gov/individuals/medi-cal-managed-care-health-plan-directory/",
    "documents": [],
    "source": "https://www.dhcs.ca.gov/services/community-based-adult-services/",
    "kind": "local"
  },
  "caleitc": {
    "url": "https://www.ftb.ca.gov/file/personal/credits/california-earned-income-tax-credit.html",
    "documents": [],
    "source": "https://www.ftb.ca.gov/file/personal/credits/california-earned-income-tax-credit.html",
    "kind": "info"
  },
  "yctc": {
    "url": "https://www.ftb.ca.gov/file/personal/credits/young-child-tax-credit.html",
    "documents": [],
    "source": "https://www.ftb.ca.gov/file/personal/credits/young-child-tax-credit.html",
    "kind": "info"
  },
  "fytc": {
    "url": "https://www.ftb.ca.gov/file/personal/credits/foster-youth-tax-credit.html",
    "documents": [],
    "source": "https://www.ftb.ca.gov/file/personal/credits/foster-youth-tax-credit.html",
    "kind": "info"
  },
  "ctc": {
    "url": "https://www.irs.gov/credits-deductions/individuals/child-tax-credit",
    "documents": [],
    "source": "https://www.irs.gov/credits-deductions/individuals/child-tax-credit",
    "kind": "info"
  },
  "renters-credit": {
    "url": "https://www.ftb.ca.gov/file/personal/credits/nonrefundable-renters-credit.html",
    "documents": [],
    "source": "https://www.ftb.ca.gov/file/personal/credits/nonrefundable-renters-credit.html",
    "kind": "info"
  },
  "child-dependent-care-credit": {
    "url": "https://www.irs.gov/credits-deductions/individuals/child-and-dependent-care-credit-information",
    "documents": [],
    "source": "https://www.irs.gov/credits-deductions/individuals/child-and-dependent-care-credit-information",
    "kind": "info"
  },
  "savers-credit": {
    "url": "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-savings-contributions-credit-savers-credit",
    "documents": [],
    "source": "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-savings-contributions-credit-savers-credit",
    "kind": "info"
  },
  "aotc": {
    "url": "https://www.irs.gov/credits-deductions/individuals/education-credits-aotc-and-llc",
    "documents": [],
    "source": "https://www.irs.gov/credits-deductions/individuals/education-credits-aotc-and-llc",
    "kind": "info"
  },
  "regional-center": {
    "url": "https://www.dds.ca.gov/rc/lookup-rcs/",
    "documents": [],
    "source": "https://www.dds.ca.gov/rc/",
    "kind": "local"
  },
  "early-start": {
    "url": "https://www.dds.ca.gov/rc/lookup-rcs/",
    "documents": [],
    "source": "https://www.dds.ca.gov/services/early-start/",
    "kind": "local"
  },
  "dor-vr": {
    "url": "https://www.dor.ca.gov/Home/ContactUs",
    "documents": [],
    "source": "https://www.dor.ca.gov/Home/GettingStarted",
    "kind": "local"
  },
  "calable": {
    "url": "https://www.calable.ca.gov/",
    "documents": [],
    "source": "https://www.calable.ca.gov/",
    "kind": "apply"
  },
  "ticket-to-work": {
    "url": "https://choosework.ssa.gov/findhelp/",
    "documents": [],
    "source": "https://choosework.ssa.gov/",
    "kind": "local"
  },
  "home-safe": {
    "url": "https://www.cdss.ca.gov/Benefits-Services/Cash-Assistance/CalWORKS/County-Offices",
    "documents": [],
    "source": "https://www.cdss.ca.gov/inforesources/cdss-programs/housing-programs/home-safe-program",
    "kind": "local"
  },
  "aps": {
    "url": "https://www.cdss.ca.gov/adult-protective-services",
    "documents": [],
    "source": "https://www.cdss.ca.gov/adult-protective-services",
    "kind": "local",
    "phone": "1-833-401-0832"
  },
  "hicap": {
    "url": "https://www.aging.ca.gov/hicap/",
    "documents": [],
    "source": "https://www.aging.ca.gov/hicap/",
    "kind": "local"
  },
  "hud-vash": {
    "url": "https://www.va.gov/homeless/hud-vash.asp",
    "documents": [],
    "source": "https://www.va.gov/homeless/hud-vash.asp",
    "kind": "info"
  },
  "ssvf": {
    "url": "https://www.va.gov/homeless/ssvf",
    "documents": [],
    "source": "https://department.va.gov/homeless/supportive-services-for-veteran-families/",
    "kind": "info"
  },
  "calvet-home-loan": {
    "url": "https://www.calvet.ca.gov/HomeLoans",
    "documents": [],
    "source": "https://www.calvet.ca.gov/HomeLoans",
    "kind": "info"
  },
  "vre-ch31": {
    "url": "https://www.va.gov/careers-employment/vocational-rehabilitation/how-to-apply/",
    "documents": [],
    "source": "https://www.va.gov/careers-employment/vocational-rehabilitation/",
    "kind": "apply"
  },
  "calvet-veterans-homes": {
    "url": "https://www.calvet.ca.gov/VetHomes",
    "documents": [],
    "source": "https://www.calvet.ca.gov/VetHomes",
    "kind": "info"
  },
  "dic": {
    "url": "https://www.va.gov/family-and-caregiver-benefits/survivor-compensation/dependency-indemnity-compensation/",
    "documents": [],
    "source": "https://www.va.gov/family-and-caregiver-benefits/survivor-compensation/dependency-indemnity-compensation/",
    "kind": "apply"
  },
  "champva": {
    "url": "https://www.va.gov/family-and-caregiver-benefits/health-and-disability/champva/",
    "documents": [],
    "source": "https://www.va.gov/family-and-caregiver-benefits/health-and-disability/champva/",
    "kind": "apply"
  },
  "va-aid-attendance": {
    "url": "https://www.va.gov/pension/how-to-apply/",
    "documents": [],
    "source": "https://www.va.gov/pension/how-to-apply/",
    "kind": "apply"
  },
  "trio-sss": {
    "url": "https://www.ed.gov/grants-and-programs/grants-higher-education/federal-trio-programs",
    "documents": [],
    "source": "https://www.ed.gov/grants-and-programs/grants-higher-education/federal-trio-programs",
    "kind": "info"
  },
  "upward-bound": {
    "url": "https://www.ed.gov/grants-and-programs/grants-higher-education/federal-trio-programs",
    "documents": [],
    "source": "https://www.ed.gov/grants-and-programs/grants-higher-education/federal-trio-programs",
    "kind": "info"
  },
  "talent-search": {
    "url": "https://www.ed.gov/grants-and-programs/grants-higher-education/federal-trio-programs",
    "documents": [],
    "source": "https://www.ed.gov/grants-and-programs/grants-higher-education/federal-trio-programs",
    "kind": "info"
  },
  "gear-up": {
    "url": "https://www.ed.gov/grants-and-programs/grants-higher-education/federal-trio-programs",
    "documents": [],
    "source": "https://www.ed.gov/grants-and-programs/grants-higher-education/federal-trio-programs",
    "kind": "info"
  },
  "americorps": {
    "url": "https://my.americorps.gov/mp/listing/publicRequestSearch.do",
    "documents": [],
    "source": "https://www.americorps.gov/join",
    "kind": "local"
  },
  "chafee-grant": {
    "url": "https://mygrantinfo.csac.ca.gov/fosteryouthapplication",
    "documents": [],
    "source": "https://www.csac.ca.gov/chafee",
    "kind": "apply"
  },
  "eops": {
    "url": "https://www.cccco.edu/Students/Find-a-College/",
    "documents": [],
    "source": "https://www.cccco.edu/about-us/chancellors-office/divisions/educational-services-and-support/student-service/what-we-do/extended-opportunity-programs-and-services/",
    "kind": "local"
  },
  "golden-state-teacher": {
    "url": "https://gstg.csac.ca.gov/",
    "documents": [],
    "source": "https://www.csac.ca.gov/gstg",
    "kind": "apply"
  },
  "college-corps": {
    "url": "https://www.californiavolunteers.ca.gov/californiansforall-college-corps/",
    "documents": [],
    "source": "https://www.californiavolunteers.ca.gov/college-corps/",
    "kind": "local"
  },
  "calkids": {
    "url": "https://www.calkids.org/",
    "documents": [],
    "source": "https://www.calkids.org",
    "kind": "info"
  },
  "early-head-start": {
    "url": "https://headstart.gov/center-locator",
    "documents": [],
    "source": "https://headstart.gov/center-locator",
    "kind": "local"
  },
  "state-preschool": {
    "url": "https://mychildcareplan.org/",
    "documents": [],
    "source": "https://www.cde.ca.gov/sp/cd/op/cdprograms.asp",
    "kind": "local"
  },
  "child-care-bridge": {
    "url": "https://www.cdss.ca.gov/Benefits-Services/Cash-Assistance/CalWORKS/County-Offices",
    "documents": [],
    "source": "https://www.cdss.ca.gov/inforesources/calworks-child-care/ecc-bridge-program",
    "kind": "local"
  },
  "cacfp": {
    "url": "https://www.fns.usda.gov/cacfp",
    "documents": [],
    "source": "https://www.fns.usda.gov/cacfp",
    "kind": "info"
  },
  "tefap": {
    "url": "https://www.cdss.ca.gov/inforesources/fdu",
    "documents": [],
    "source": "https://www.cdss.ca.gov/inforesources/fdu",
    "kind": "local"
  },
  "senior-farmers-market": {
    "url": "https://www.aging.ca.gov/Find_Services_in_My_County/",
    "documents": [],
    "source": "https://www.cdfa.ca.gov/SeniorFarmersMrktNutritionPrgm/",
    "kind": "local"
  },
  "wic-fmnp": {
    "url": "https://myfamily.wic.ca.gov/Home/WICOfficeGrocer",
    "documents": [],
    "source": "https://www.cdph.ca.gov/Programs/CFH/DWICSN/Pages/WIC-Agencies.aspx",
    "kind": "local"
  },
  "market-match": {
    "url": "https://marketmatch.org/",
    "documents": [],
    "source": "https://marketmatch.org/",
    "kind": "local"
  },
  "fss": {
    "url": "https://www.hud.gov/contactus/public-housing-contacts",
    "documents": [],
    "source": "https://www.hud.gov/program_offices/public_indian_housing/programs/hcv/fss",
    "kind": "local"
  },
  "calworks-hsp": {
    "url": "https://www.cdss.ca.gov/Benefits-Services/Cash-Assistance/CalWORKS/County-Offices",
    "documents": [],
    "source": "https://www.cdss.ca.gov/inforesources/cdss-programs/housing-programs/calworks-housing-support-program",
    "kind": "local"
  },
  "bringing-families-home": {
    "url": "https://www.cdss.ca.gov/Benefits-Services/Cash-Assistance/CalWORKS/County-Offices",
    "documents": [],
    "source": "https://www.cdss.ca.gov/inforesources/cdss-programs/housing-programs/bringing-families-home",
    "kind": "local"
  },
  "esa": {
    "url": "https://www.cpuc.ca.gov/consumer-support/financial-assistance-savings-and-discounts/energy-savings-assistance",
    "documents": [],
    "source": "https://www.cpuc.ca.gov/consumer-support/financial-assistance-savings-and-discounts/energy-savings-assistance",
    "kind": "local"
  },
  "wioa": {
    "url": "https://edd.ca.gov/en/jobs_and_training/",
    "documents": [],
    "source": "https://edd.ca.gov/en/jobs_and_training/",
    "kind": "local"
  },
  "scsep": {
    "url": "https://www.careeronestop.org/LocalHelp/EmploymentAndTraining/find-older-worker-programs.aspx?location=California",
    "documents": [],
    "source": "https://www.dol.gov/agencies/eta/seniors/contact",
    "kind": "local",
    "phone": "1-877-872-5627"
  },
  "ajcc": {
    "url": "https://www.careeronestop.org/LocalHelp/AmericanJobCenters/find-american-job-centers.aspx",
    "documents": [],
    "source": "https://edd.ca.gov/en/Office_Locator/",
    "kind": "local",
    "phone": "1-916-654-7799"
  }
};
