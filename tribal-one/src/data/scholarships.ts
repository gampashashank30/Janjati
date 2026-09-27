import type { ScholarshipScheme } from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// All scholarship data verified against official Government of India sources:
//   Ministry of Tribal Affairs : https://tribal.nic.in/
//   National Scholarship Portal : https://scholarships.gov.in/
//   PIB Press Releases          : https://pib.gov.in/
//   MoTA DBT Portal             : https://dbttribal.gov.in/
//   National Overseas Scholarship: https://overseas.tribal.gov.in/
//   National Fellowship Portal  : https://fellowship.tribal.gov.in/
//
// Last verified: September 2026
// ─────────────────────────────────────────────────────────────────────────────

export const SCHOLARSHIPS: ScholarshipScheme[] = [
  // ─── 1. Pre-Matric ──────────────────────────────────────────────────────────
  {
    id: 'pre_matric',
    name: 'Pre-Matric Scholarship for ST Students',
    shortName: 'Pre-Matric',
    ministry: 'Ministry of Tribal Affairs, Government of India',
    level: 'Pre-Matric',
    schemeCode: 'ST-PM-01',
    portalName: 'National Scholarship Portal (NSP)',
    applicationUrl: 'https://scholarships.gov.in',
    description:
      'Financial assistance to Scheduled Tribe students studying in Classes IX and X to reduce dropout rates and encourage continuation of education. Implemented through State Governments and UTs with Central funding support.',
    eligibility: {
      category: ['Scheduled Tribe (ST)'],
      incomeLimit: 250000,
      classRange: { min: 9, max: 10 },
      institutionType: [
        'Government School',
        'Government-aided School',
        'Local Body School',
      ],
      other: [
        'Student must be enrolled in Class IX or Class X in a recognized school',
        'Annual family income from all sources must not exceed ₹2,50,000',
        'Day Scholars and Hostellers are both eligible',
        'Only one child per family may avail this scholarship at a time',
        'Student must not be availing any other scholarship simultaneously',
      ],
    },
    benefits: [
      { label: 'Day Scholar — Maintenance Allowance', value: '₹225 per month (paid for 10 months)' },
      { label: 'Hosteller — Maintenance Allowance',   value: '₹525 per month (paid for 10 months)' },
      { label: 'Book / Ad-hoc Grant (Day Scholar)',   value: '₹750 per annum' },
      { label: 'Book / Ad-hoc Grant (Hosteller)',     value: '₹1,000 per annum' },
    ],
    documents: [
      { name: 'ST Certificate issued by competent authority',         mandatory: true },
      { name: 'Income Certificate from Revenue Officer / Tehsildar',  mandatory: true },
      { name: 'Aadhaar Card',                                         mandatory: true },
      { name: 'APAAR ID (Academic Bank of Credits)',                  mandatory: true },
      { name: 'Marksheet of previous qualifying examination',         mandatory: true },
      { name: 'School Bonafide / Enrollment Certificate',             mandatory: true },
      { name: 'Bank Account Passbook (Aadhaar-seeded for DBT)',       mandatory: true },
      { name: 'Domicile Certificate',                                  mandatory: true },
      { name: 'Disability Certificate (if applicable)',               mandatory: false },
    ],
    importantDates: [
      { event: 'Portal Opens for Fresh Applications', date: '1 August (each year)',   note: 'National Scholarship Portal (NSP)' },
      { event: 'Last Date — Fresh Applications',      date: '31 October (each year)' },
      { event: 'Last Date — Renewal Applications',    date: '31 October (each year)' },
      { event: 'Institute Verification Deadline',     date: '30 November (each year)' },
      { event: 'District / State Verification',       date: '31 December (each year)' },
    ],
    verificationProcess: [
      'Student submits application on NSP (scholarships.gov.in)',
      'School/Institute verifies enrolment and uploaded documents',
      'District Nodal Officer verifies caste and income documents',
      'State Tribal Welfare Department approves the application',
      'Ministry of Tribal Affairs sanctions and releases funds',
      'DBT credit directly to student Aadhaar-seeded bank account via PFMS',
    ],
  },

  // ─── 2. Post-Matric ─────────────────────────────────────────────────────────
  {
    id: 'post_matric',
    name: 'Post-Matric Scholarship for ST Students',
    shortName: 'Post-Matric',
    ministry: 'Ministry of Tribal Affairs, Government of India',
    level: 'Post-Matric',
    schemeCode: 'ST-POM-02',
    portalName: 'National Scholarship Portal (NSP)',
    applicationUrl: 'https://scholarships.gov.in',
    description:
      'Provides financial support to ST students pursuing education beyond Class X (Matriculation) up to PhD level in recognized institutions. Covers compulsory institutional fees and monthly maintenance allowance.',
    eligibility: {
      category: ['Scheduled Tribe (ST)'],
      incomeLimit: 250000,
      classRange: { min: 11, max: 999 },
      other: [
        'Must be studying in Class XI or above in a government or recognized private institution',
        'Annual parental/guardian income from all sources must not exceed ₹2,50,000',
        'Hostellers and Day Scholars are both eligible',
        'Students in distance/correspondence education are covered at Day Scholar rate',
        'Students who fail and repeat a year are not eligible for that repeated year',
        'Must not be in receipt of any other scholarship simultaneously',
      ],
    },
    benefits: [
      { label: 'Group I — PhD, M.Phil, PG Med/Engg (Hosteller)',        value: '₹1,200/month' },
      { label: 'Group I — PhD, M.Phil, PG Med/Engg (Day Scholar)',       value: '₹550/month' },
      { label: 'Group II — Professional/Technical PG, BEd, LLB (Host.)', value: '₹820/month' },
      { label: 'Group II — Professional/Technical PG, BEd, LLB (Day)',   value: '₹380/month' },
      { label: 'Group III — UG (General) Courses (Hosteller)',           value: '₹570/month' },
      { label: 'Group III — UG (General) Courses (Day Scholar)',         value: '₹300/month' },
      { label: 'Group IV — Class XI & XII (Hosteller)',                  value: '₹380/month' },
      { label: 'Group IV — Class XI & XII (Day Scholar)',                value: '₹230/month' },
      { label: 'Compulsory Non-Refundable Institutional Fees',           value: 'Full reimbursement (subject to State fee-fixation limits)' },
      { label: 'Study Tour (where applicable)',                          value: 'Actual up to ₹1,600 per annum' },
      { label: 'Thesis Typing / Printing (Research students)',           value: 'Actual up to ₹1,600' },
    ],
    documents: [
      { name: 'ST Certificate issued by competent authority',        mandatory: true },
      { name: 'Income Certificate from Revenue Officer / Tehsildar', mandatory: true },
      { name: 'Aadhaar Card',                                        mandatory: true },
      { name: 'APAAR ID',                                            mandatory: true },
      { name: 'Marksheet of previous qualifying examination',        mandatory: true },
      { name: 'Bonafide Certificate from current institution',       mandatory: true },
      { name: 'Bank Account Passbook (Aadhaar-seeded)',              mandatory: true },
      { name: 'Domicile Certificate',                                 mandatory: true },
      { name: 'Fee Receipt from Institution',                        mandatory: true },
      { name: 'Hostel Allotment Letter (for hostellers)',            mandatory: false },
      { name: 'Disability Certificate (if applicable)',              mandatory: false },
    ],
    importantDates: [
      { event: 'Portal Opens for Fresh Applications', date: '1 August (each year)' },
      { event: 'Last Date — Fresh Applications',      date: '31 October (each year)' },
      { event: 'Last Date — Renewal Applications',    date: '31 October (each year)' },
      { event: 'Institute Verification Deadline',     date: '30 November (each year)' },
      { event: 'State Nodal Officer Deadline',        date: '31 December (each year)' },
    ],
    verificationProcess: [
      'Student applies on NSP (scholarships.gov.in)',
      'Institution verifies current enrolment and fee details',
      'District Welfare Officer verifies caste and income documents',
      'State Tribal Welfare Department approves the application',
      'Ministry of Tribal Affairs releases funds to State Government',
      'DBT credit directly to student Aadhaar-seeded bank account',
    ],
  },

  // ─── 3. Top Class Education ─────────────────────────────────────────────────
  {
    id: 'top_class',
    name: 'National Scholarship Scheme (Top Class) for ST Students',
    shortName: 'Top Class',
    ministry: 'Ministry of Tribal Affairs, Government of India',
    level: 'Higher Education',
    schemeCode: 'ST-TCE-03',
    portalName: 'National Scholarship Portal (NSP)',
    applicationUrl: 'https://scholarships.gov.in',
    description:
      'Provides full financial support to meritorious ST students admitted to 265 premier institutions notified by MoTA (IITs, NITs, IIMs, AIIMS, NLUs, Central Universities, etc.), covering tuition fees, living expenses, books and computer allowance.',
    eligibility: {
      category: ['Scheduled Tribe (ST)'],
      incomeLimit: 600000,
      other: [
        'Must be admitted to one of the 265 premier institutions notified by Ministry of Tribal Affairs',
        'Includes IITs, NITs, IIMs, AIIMS, NLUs, Central Universities and other national institutes',
        'Annual parental/family income must not exceed ₹6,00,000 from all sources',
        'Must be admitted through merit / entrance examination (not management quota)',
        'Only one sibling per family per year is eligible for this scheme',
        'Students who discontinue the course mid-way must refund the scholarship amount',
      ],
    },
    benefits: [
      { label: 'Tuition Fee',               value: 'Full actual fee as charged by the institution' },
      { label: 'Non-Refundable Charges',    value: 'Full actual charges' },
      { label: 'Living / Stipend Allowance',value: '₹3,000 per month' },
      { label: 'Books & Stationery',        value: '₹5,000 per annum' },
      { label: 'Computer / Laptop (UG/PG)', value: '₹45,000 one-time' },
      { label: 'Study Tour',                value: 'Actual, up to ₹10,000 per annum' },
      { label: 'Thesis Typing (Research)',  value: 'Actual, up to ₹10,000' },
    ],
    documents: [
      { name: 'ST Certificate from competent authority',                              mandatory: true },
      { name: 'Income Certificate from Revenue Officer / Tehsildar',                 mandatory: true },
      { name: 'Aadhaar Card',                                                         mandatory: true },
      { name: 'APAAR ID',                                                             mandatory: true },
      { name: 'Admission Letter from notified premier institution',                   mandatory: true },
      { name: 'Fee Receipt from institution',                                         mandatory: true },
      { name: 'Marksheet of qualifying examination (12th / Graduation)',             mandatory: true },
      { name: 'Bank Account Passbook (Aadhaar-seeded)',                              mandatory: true },
      { name: 'Domicile Certificate',                                                 mandatory: true },
      { name: 'Entrance Scorecard (JEE / NEET / CAT / CLAT / GATE etc.)',           mandatory: true },
      { name: 'Disability Certificate (if applicable)',                              mandatory: false },
    ],
    importantDates: [
      { event: 'Application Opens (Fresh Students)', date: '1 September (each year)' },
      { event: 'Last Date for Applications',         date: '31 October (each year)' },
      { event: 'Institute Verification Deadline',    date: '30 November (each year)' },
      { event: 'Ministry Sanction (expected)',        date: 'January–February (following year)' },
    ],
    verificationProcess: [
      'Student applies on NSP (scholarships.gov.in)',
      'Notified premier institution verifies admission and fee details',
      'Ministry of Tribal Affairs directly verifies and approves',
      'Sanctioned amount transferred directly to student bank account via DBT/PFMS',
    ],
  },

  // ─── 4. National Fellowship for ST Students (NFST) ──────────────────────────
  {
    id: 'nfst',
    name: 'National Fellowship for Scheduled Tribe Students (NFST)',
    shortName: 'NFST',
    ministry: 'Ministry of Tribal Affairs, Government of India',
    level: 'Fellowship',
    schemeCode: 'ST-NFST-04',
    portalName: 'National Fellowship Portal (MoTA)',
    applicationUrl: 'https://fellowship.tribal.gov.in',
    description:
      'Provides fellowship to ST students pursuing M.Phil and PhD programmes in universities and institutions recognized by UGC. 750 slots are available per year. Monthly stipend plus HRA and contingency allowances.',
    eligibility: {
      category: ['Scheduled Tribe (ST)'],
      incomeLimit: null,
      ageLimit: { max: 35 },
      other: [
        'Must be registered for M.Phil or PhD in a UGC / AICTE / ICAR / ICMR recognized university or research institution',
        'Must have qualified NET / SET or be a regular faculty member enrolled for PhD',
        'Age must not exceed 35 years at time of application (relaxable for reserved categories and PwD as per rules)',
        'Total slots: 750 per year (allocated by UGC through the fellowship portal)',
        'Must not be in receipt of any other Government of India fellowship or scholarship simultaneously',
        'Fellowship is subject to satisfactory annual academic progress review',
      ],
    },
    benefits: [
      { label: 'JRF Stipend — Years 1 & 2 (current UGC rate)', value: '₹37,000 per month' },
      { label: 'SRF Stipend — Years 3 to 5 (current UGC rate)', value: '₹42,000 per month' },
      { label: 'Contingency Grant (Humanities)',                 value: '₹10,000 per year' },
      { label: 'Contingency Grant (Sciences)',                   value: '₹12,000 per year' },
      { label: 'House Rent Allowance (HRA)',                     value: 'As per UGC norms applicable to the city of the institution' },
      { label: 'Hostel Accommodation (if provided)',             value: 'At actuals subject to HRA deduction norms' },
    ],
    documents: [
      { name: 'ST Certificate from competent authority',                      mandatory: true },
      { name: 'Aadhaar Card',                                                  mandatory: true },
      { name: 'APAAR ID',                                                      mandatory: true },
      { name: 'Registration Certificate for M.Phil / PhD from University',    mandatory: true },
      { name: 'NET / SET Certificate or equivalent qualification proof',      mandatory: true },
      { name: 'Postgraduate Marksheet / Degree Certificate',                  mandatory: true },
      { name: 'Research Supervisor endorsement / acceptance letter',          mandatory: true },
      { name: 'Bank Account Passbook (Aadhaar-seeded)',                       mandatory: true },
      { name: 'No Objection Certificate (NOC) from present employer',        mandatory: false },
    ],
    importantDates: [
      { event: 'MoTA Notification Released (2025–26)',   date: 'August 2025', note: 'fellowship.tribal.gov.in' },
      { event: 'Application Window (2025–26)',            date: 'Aug–Sep 2025 (check portal)' },
      { event: 'Last Date for Applications',              date: 'As per latest notification on fellowship portal' },
      { event: 'Fellowship Commencement',                 date: 'Subject to UGC / MoTA processing schedule' },
    ],
    verificationProcess: [
      'MoTA releases notification and opens applications on fellowship.tribal.gov.in',
      'Student applies through the National Fellowship Portal',
      'University / Institution verifies PhD registration and supervisor details',
      'UGC evaluates and selects candidates based on NET score and merit',
      'Ministry of Tribal Affairs releases fellowship funds through UGC',
      'Monthly stipend credited to student bank account via DBT',
    ],
  },

  // ─── 5. National Overseas Scholarship (NOS) ─────────────────────────────────
  {
    id: 'nos',
    name: 'National Overseas Scholarship for ST / PVTG Students',
    shortName: 'NOS',
    ministry: 'Ministry of Tribal Affairs, Government of India',
    level: 'Overseas',
    schemeCode: 'ST-NOS-05',
    portalName: 'National Overseas Scholarship Portal',
    applicationUrl: 'https://overseas.tribal.gov.in',
    description:
      'Provides financial assistance to meritorious ST/PVTG students to pursue Masters, PhD and Post-Doctoral research abroad in reputed foreign universities. 20 awards per year (17 ST + 3 PVTG). 6 slots are earmarked for female candidates.',
    eligibility: {
      category: ['Scheduled Tribe (ST)', 'PVTG (Particularly Vulnerable Tribal Group)'],
      incomeLimit: 600000,
      ageLimit: { max: 38 },
      minimumMarks: 55,
      other: [
        'Must have secured admission to a recognized foreign university for Masters, PhD, or Post-Doctoral research',
        'Annual parental/family income from all sources must not exceed ₹6,00,000',
        'Age limit (as on 1 July of selection year): 32 years for Masters · 35 years for PhD · 38 years for Post-Doctoral',
        'Minimum 55% marks at relevant qualifying degree level (waived for QS World top-1000 institution admits)',
        'Maximum 20 slots per year: 17 for ST and 3 for PVTG candidates',
        '6 slots earmarked for female beneficiaries; unfilled female slots transfer to other eligible candidates',
        'Must not be receiving any other Government of India scholarship or fellowship',
        'Must not have previously availed the National Overseas Scholarship',
      ],
    },
    benefits: [
      { label: 'Tuition Fee',                      value: 'Full actual fee charged by foreign institution' },
      { label: 'Annual Maintenance / Living',       value: 'Country-specific rate (e.g., £9,900/year for UK; USD equivalent for USA)' },
      { label: 'Contingency / Equipment Allowance', value: 'Approximately USD 1,500 per year' },
      { label: 'Medical / Health Insurance',        value: 'Actual premium up to the prescribed limit' },
      { label: 'Economy Class Airfare',             value: 'Actual (one-time both ways — India ↔ country of study)' },
      { label: 'Visa Fee',                          value: 'Actual cost reimbursed' },
      { label: 'Preparatory Allowance',             value: '₹10,000 (one-time, before departure)' },
    ],
    documents: [
      { name: 'ST / PVTG Certificate from competent authority',                        mandatory: true },
      { name: 'Income Certificate from Revenue Officer / Tehsildar',                   mandatory: true },
      { name: 'Aadhaar Card',                                                           mandatory: true },
      { name: 'APAAR ID',                                                               mandatory: true },
      { name: 'Offer / Admission Letter from foreign university',                      mandatory: true },
      { name: 'Graduation Degree Certificate and Marksheets',                          mandatory: true },
      { name: 'Postgraduate Certificate / Marksheets (for PhD / Post-Doc applicants)', mandatory: false },
      { name: 'Valid Passport (with minimum 2 years validity)',                         mandatory: true },
      { name: 'Bank Account Passbook (Aadhaar-seeded; NRE/NRO for foreign transfer)', mandatory: true },
      { name: 'Medical Certificate of fitness',                                         mandatory: true },
      { name: 'No Objection Certificate from employer (if employed)',                 mandatory: false },
    ],
    importantDates: [
      { event: 'MoTA Notification — 2026–27 Cycle',  date: 'March–April 2026', note: 'overseas.tribal.gov.in' },
      { event: 'Application Window Opens',            date: 'April 2026 (extended to July 2026)' },
      { event: 'Extended Last Date (2026–27)',        date: '31 July 2026', note: 'Extended as announced by MoTA' },
      { event: 'Document Verification & Selection',  date: 'August 2026 (expected)' },
      { event: 'Award Letters Issued',               date: 'September 2026 (expected)' },
    ],
    verificationProcess: [
      'Ministry of Tribal Affairs releases official notification on overseas.tribal.gov.in',
      'Student applies on the NOS portal (overseas.tribal.gov.in)',
      'Ministry verifies all submitted documents and foreign university admission letter',
      'Selection Committee shortlists and interviews eligible candidates',
      'Award letter issued by Ministry of Tribal Affairs',
      'Funds released to student bank account and/or directly to foreign university as applicable',
    ],
  },

  // ─── 6. Eklavya Model Residential Schools (EMRS) ─────────────────────────
  {
    id: 'emrs',
    name: 'Eklavya Model Residential Schools (EMRS) Admission & Education Scheme',
    shortName: 'EMRS Schools',
    ministry: 'National Education Society for Tribal Students (NESTS), Ministry of Tribal Affairs',
    level: 'School Education',
    schemeCode: 'MoTA-EMRS-06',
    portalName: 'EMRS Admission Portal',
    applicationUrl: 'https://emrs.tribal.gov.in',
    description:
      'Completely free quality residential education (CBSE curriculum, Classes VI to XII) for meritorious ST boys and girls in remote tribal blocks, covering free tuition, hostel, food, uniforms, books, medical care, and specialized coaching for competitive exams (NEET, JEE).',
    eligibility: {
      category: ['Scheduled Tribe (ST)'],
      incomeLimit: null, // No income ceiling for EMRS admission
      classRange: { min: 6, max: 12 },
      ageLimit: { min: 10, max: 13 },
      institutionType: ['EMRS Residential School'],
      other: [
        'Candidate must belong to Scheduled Tribe community',
        'Admission primarily in Class VI through the EMRS National Selection Test (EMRSST)',
        'Lateral entry in Classes IX & XI subject to seat vacancy in respective school',
        'Equal 50% reservation for girl students across all batches',
        'Special priority quota for Particularly Vulnerable Tribal Groups (PVTGs) and children who lost parents',
      ],
    },
    benefits: [
      { label: 'School & Hostel Fees',           value: '100% Free (Zero expense for parents)' },
      { label: 'Boarding & Nutritious Lodging',  value: 'Full free accommodation and balanced diet provided' },
      { label: 'Books, Uniforms & Stationery',   value: 'Free complete textbooks, uniforms, sports kits, and learning aids' },
      { label: 'Competitive Exam Coaching',      value: 'Specialized residential coaching for NEET, JEE & CUET' },
    ],
    documents: [
      { name: 'ST Certificate of child or father issued by competent authority', mandatory: true },
      { name: 'Aadhaar Card of student and parent/guardian',                      mandatory: true },
      { name: 'Class V Marksheet / Pass Certificate (for Class VI entry)',        mandatory: true },
      { name: 'Transfer Certificate (TC) from recognized primary school',         mandatory: true },
      { name: 'Birth Certificate / Age Proof',                                    mandatory: true },
      { name: 'Passport-size Photographs (6 copies)',                             mandatory: true },
      { name: 'Disability Certificate (if seeking PwD quota)',                    mandatory: false },
    ],
    importantDates: [
      { event: 'EMRSST Admission Notification',  date: 'December–January each year' },
      { event: 'Application Submission Deadline', date: 'End of February' },
      { event: 'EMRS National Selection Test',   date: 'March–April' },
      { event: 'Merit List & Seat Allotment',    date: 'May' },
      { event: 'Academic Session Commences',     date: 'June–July' },
    ],
    verificationProcess: [
      'Online application through emrs.tribal.gov.in or offline through nearest EMRS Principal',
      'Admit card generated for EMRS Selection Test (OMR-based objective exam)',
      'State EMRS Society prepares district-wise and block-wise ST merit lists',
      'Document physical verification at the designated EMRS campus',
      'Health check-up and final admission confirmation',
    ],
  },

  // ─── 7. GOAL (Going Online as Leaders) ───────────────────────────────────
  {
    id: 'goal_program',
    name: 'GOAL (Going Online as Leaders) Digital Mentorship & Upskilling',
    shortName: 'GOAL Program',
    ministry: 'Ministry of Tribal Affairs in partnership with Meta (Facebook India)',
    level: 'Skill Development',
    schemeCode: 'MoTA-GOAL-07',
    portalName: 'GOAL Tribal Portal',
    applicationUrl: 'https://goal.tribal.gov.in',
    description:
      'Flagship national digital literacy and mentorship initiative by MoTA and Meta to digitally empower 10 lakh tribal youth and women entrepreneurs across India through intensive mentorship in digital technology, leadership, handicrafts marketing, and business skills.',
    eligibility: {
      category: ['Scheduled Tribe (ST)'],
      incomeLimit: null,
      ageLimit: { min: 18, max: 35 },
      institutionType: ['Any Higher Education / Vocational / Self-employed ST Youth'],
      other: [
        'Must belong to a Scheduled Tribe community',
        'Age between 18 and 35 years',
        'Should possess or have access to a smartphone with internet connectivity',
        'Open to artisans, farmers, SHG members, students, and aspiring entrepreneurs',
      ],
    },
    benefits: [
      { label: 'Personal Mentorship',        value: '1-on-1 mentorship by industry leaders and sector experts' },
      { label: 'Digital Skills Training',    value: 'Free modules in e-commerce, digital marketing, AI basics & finance' },
      { label: 'E-commerce Onboarding',      value: 'Assistance to list tribal handicrafts/products on GEM and global portals' },
      { label: 'Official Certification',     value: 'Certificate of completion awarded by MoTA & Meta' },
    ],
    documents: [
      { name: 'ST Caste Certificate',                             mandatory: true },
      { name: 'Aadhaar Card',                                     mandatory: true },
      { name: 'Educational Qualification Certificate (Class 10+)', mandatory: true },
      { name: 'Bank Account Passbook',                            mandatory: false },
      { name: 'Brief note on entrepreneurial / community goals',  mandatory: true },
    ],
    importantDates: [
      { event: 'Phase Cohort Registrations Open', date: 'Quarterly rolling batches' },
      { event: 'Mentee Shortlisting & Interview', date: 'Rolling selection' },
      { event: 'Mentorship Induction Workshop',  date: 'Monthly cycle' },
    ],
    verificationProcess: [
      'Candidate registers online on goal.tribal.gov.in',
      'System verifies ST community status and age eligibility via Aadhaar',
      'MoTA screening team reviews applicant statement of purpose and interest area',
      'Candidate matched with an assigned industry mentor for 9 months',
      'Graduation certificate and linkage with TRIFED / NSTFDC incubation support',
    ],
  },

  // ─── 8. Adivasi Shiksha Rinn Yojana (ASRY) ──────────────────────────────
  {
    id: 'asry_loan',
    name: 'Adivasi Shiksha Rinn Yojana (ASRY) — Concessional Education Loan',
    shortName: 'ASRY Education Loan',
    ministry: 'National Scheduled Tribes Finance and Development Corporation (NSTFDC)',
    level: 'Education Loan',
    schemeCode: 'NSTFDC-ASRY-08',
    portalName: 'NSTFDC Portal',
    applicationUrl: 'https://nstfdc.tribal.gov.in',
    description:
      'Highly concessional higher education loan scheme by NSTFDC for Scheduled Tribe students securing admission to professional and technical degree courses in India (Engineering, Medicine, Management, Law, Veterinary, Agriculture).',
    eligibility: {
      category: ['Scheduled Tribe (ST)'],
      incomeLimit: 300000,
      institutionType: ['AICTE / UGC / NMC / DCI / BCI Recognized Institutions in India'],
      other: [
        'Applicant must be a permanent resident of India belonging to Scheduled Tribe',
        'Annual family income from all sources must not exceed ₹3,00,000',
        'Must have secured admission through entrance examination / merit to recognized course',
        'Valid for undergraduate and postgraduate full-time professional degrees',
      ],
    },
    benefits: [
      { label: 'Maximum Loan Amount',   value: 'Up to ₹10,00,000 (covering 90% of total course expense)' },
      { label: 'Concessional Interest', value: 'Only 6.0% p.a. for male ST students' },
      { label: 'Rebate for Women',      value: 'Special 1.5% interest subsidy for female ST students (Net 4.5% p.a.)' },
      { label: 'Moratorium Period',     value: 'Course duration + 6 months or getting a job (whichever earlier)' },
      { label: 'Repayment Tenure',      value: 'Up to 5 years after moratorium period' },
    ],
    documents: [
      { name: 'ST Caste Certificate issued by competent Revenue Officer', mandatory: true },
      { name: 'Income Certificate (Family income ≤ ₹3,00,000 p.a.)',       mandatory: true },
      { name: 'Aadhaar Card of student & co-borrower/parent',             mandatory: true },
      { name: 'Proof of Admission & Fee Structure from College',          mandatory: true },
      { name: 'Class 10, 12, and Graduation (if PG) Marksheets',          mandatory: true },
      { name: 'Bank Account Passbook (Aadhaar linked)',                   mandatory: true },
      { name: 'PAN Card of student and parent/guardian',                  mandatory: true },
    ],
    importantDates: [
      { event: 'Loan Window Open',             date: 'Round the year (synchronized with academic intake)' },
      { event: 'Primary Channel Agency Review', date: 'Within 30 days of submission' },
      { event: 'Sanction & Fund Disbursement', date: 'Directly to college account per semester' },
    ],
    verificationProcess: [
      'Student applies through State Channelising Agency (SCA) or online on nstfdc.tribal.gov.in',
      'Verification of ST status and family income certificate by State Tribal Development Agency',
      'Scrutiny of college admission offer letter and official fee breakdown',
      'Loan sanction letter issued by NSTFDC / SCA',
      'Disbursement directly to college account semester-wise via DBT/NEFT',
    ],
  },

  // ─── 9. Adivasi Mahila Sashaktikaran Yojana (AMSY) ───────────────────────
  {
    id: 'amsy_scheme',
    name: 'Adivasi Mahila Sashaktikaran Yojana (AMSY)',
    shortName: 'AMSY Women Grant',
    ministry: 'National Scheduled Tribes Finance and Development Corporation (NSTFDC)',
    level: 'Women Empowerment',
    schemeCode: 'NSTFDC-AMSY-09',
    portalName: 'NSTFDC Women Portal',
    applicationUrl: 'https://nstfdc.tribal.gov.in',
    description:
      'Flagship concessional micro-credit and term loan scheme exclusively for Scheduled Tribe women to establish self-reliant, sustainable income-generating activities in dairy, handlooms, food processing, eco-tourism, retail shops, and services.',
    eligibility: {
      category: ['Scheduled Tribe (ST) - Women Only'],
      incomeLimit: 300000,
      ageLimit: { min: 18, max: 60 },
      other: [
        'Applicant must be an ST woman aged 18 years and above',
        'Annual family income from all sources must not exceed ₹3,00,000 per annum',
        'Must possess viable proposal or basic skills for the intended trade/enterprise',
        'Individual women or ST Women SHG members are eligible',
      ],
    },
    benefits: [
      { label: 'Maximum Project Assistance', value: 'Up to ₹2,00,000 per beneficiary' },
      { label: 'Ultra-low Interest Rate',    value: 'Only 4.0% per annum for ST women' },
      { label: 'NSTFDC Contribution',       value: 'Up to 90% of total project cost (Margin money only 10%)' },
      { label: 'Repayment Period',           value: 'Up to 5 years (including initial moratorium of 6 months)' },
    ],
    documents: [
      { name: 'ST Certificate in the name of the woman applicant',     mandatory: true },
      { name: 'Family Income Certificate (below ₹3 Lakh/yr)',          mandatory: true },
      { name: 'Aadhaar Card',                                          mandatory: true },
      { name: 'Bank Account Passbook (Aadhaar linked for DBT)',        mandatory: true },
      { name: 'Project / Trade proposal outline with estimated budget', mandatory: true },
      { name: 'Passport-size Photographs (3 copies)',                  mandatory: true },
    ],
    importantDates: [
      { event: 'Application Submission',       date: 'Open throughout the financial year' },
      { event: 'SCA Field Verification',       date: 'Within 21 days of receipt' },
      { event: 'Sanction and Fund Release',    date: 'Disbursed quarterly via DBT' },
    ],
    verificationProcess: [
      'Applicant submits proposal to State Channelising Agency (SCA) / District Tribal Officer',
      'Field inspection and feasibility assessment of business site by Field Officer',
      'State Agency forwards recommended list to NSTFDC',
      'Sanction order and execution of concessional loan agreement',
      'Direct DBT credit of loan amount to applicant bank account',
    ],
  },

  // ─── 10. NSTFDC Term Loan Scheme for ST Entrepreneurs ────────────────────
  {
    id: 'nstfdc_term_loan',
    name: 'NSTFDC Term Loan Scheme for ST Entrepreneurs',
    shortName: 'NSTFDC Term Loan',
    ministry: 'National Scheduled Tribes Finance and Development Corporation (NSTFDC)',
    level: 'Entrepreneurship',
    schemeCode: 'NSTFDC-TL-10',
    portalName: 'NSTFDC Corporate Portal',
    applicationUrl: 'https://nstfdc.tribal.gov.in',
    description:
      'Term loan assistance for Scheduled Tribe entrepreneurs to set up viable small and medium business enterprises across agriculture & allied, manufacturing, transport, healthcare, service industries, and retail sectors.',
    eligibility: {
      category: ['Scheduled Tribe (ST)'],
      incomeLimit: 300000,
      ageLimit: { min: 18, max: 65 },
      other: [
        'Applicant must belong to Scheduled Tribe community',
        'Annual family income should not exceed ₹3,00,000 per annum',
        '100% ST shareholding required for partnership / proprietary businesses',
        'Applicant must not be a wilful defaulter with any bank or financial institution',
      ],
    },
    benefits: [
      { label: 'Maximum Loan Amount',   value: 'Up to ₹50,00,000 per unit' },
      { label: 'Project Coverage',      value: 'Up to 90% of total project cost funded by NSTFDC' },
      { label: 'Concessional Interest', value: '6.0% p.a. for loans up to ₹5 Lakh | 8.0% p.a. above ₹5 Lakh' },
      { label: 'Repayment Tenure',      value: 'Up to 10 years including suitable moratorium' },
    ],
    documents: [
      { name: 'ST Caste Certificate from competent Revenue Authority', mandatory: true },
      { name: 'Income Certificate of family',                          mandatory: true },
      { name: 'Detailed Project Report (DPR) with cash-flow projection', mandatory: true },
      { name: 'Aadhaar Card and PAN Card',                            mandatory: true },
      { name: 'Land documents / lease deed / premises agreement',      mandatory: true },
      { name: 'Bank Statement of last 6 months',                       mandatory: true },
    ],
    importantDates: [
      { event: 'Scheme Availability',   date: 'Year-round application intake' },
      { event: 'Technical Scrutiny',    date: '30 working days from submission' },
      { event: 'Project Disbursement',  date: 'Milestone-based release' },
    ],
    verificationProcess: [
      'Submission of Detailed Project Report (DPR) to State Channelising Agency (SCA) / Regional Bank',
      'Technical and financial viability evaluation by Project Review Committee',
      'Approval and credit sanction by NSTFDC Headquarters',
      'Execution of mortgage / hypothecation and guarantee agreements',
      'Phased fund disbursement directly linked with capital asset procurement',
    ],
  },

  // ─── 11. Venture Capital Fund for Scheduled Tribes (VCF-ST) ──────────────
  {
    id: 'vcf_st',
    name: 'Venture Capital Fund for Scheduled Tribes (VCF-ST)',
    shortName: 'VCF-ST Fund',
    ministry: 'Ministry of Tribal Affairs & IFCI Venture Capital Funds Ltd.',
    level: 'Entrepreneurship',
    schemeCode: 'MoTA-VCFST-11',
    portalName: 'VCF-ST Portal',
    applicationUrl: 'https://vcfst.in',
    description:
      'First-of-its-kind dedicated Venture Capital Fund promoted by the Ministry of Tribal Affairs and managed by IFCI Venture to promote entrepreneurship, innovation, and scalable tech/industrial enterprises promoted by Scheduled Tribe founders.',
    eligibility: {
      category: ['Scheduled Tribe (ST) Entrepreneurs & Founders'],
      incomeLimit: null, // High-impact enterprise fund, no personal income cap
      other: [
        'Enterprises where ST promoters hold at least 51% equity for at least 12 months',
        'Registered as a Private Limited Company, One Person Company, or LLP',
        'Should be engaged in manufacturing, renewable energy, food processing, IT, or scalable services',
        'Must possess a commercially viable and innovative business plan',
      ],
    },
    benefits: [
      { label: 'Investment Range',     value: '₹20,00,000 to ₹5,00,00,000 per company' },
      { label: 'Investment Instruments', value: 'Equity shares, Compulsorily Convertible Debentures (CCDs), or Term Debt' },
      { label: 'Low Cost of Capital',  value: 'Concessional coupon / dividend rate of 4% to 8% p.a.' },
      { label: 'Incubation & Advisory', value: 'Corporate governance mentoring, investor networking, and scaling advisory' },
    ],
    documents: [
      { name: 'ST Certificate of Founder / Majority Promoters',       mandatory: true },
      { name: 'Certificate of Incorporation (ROC) and MOA / AOA',      mandatory: true },
      { name: 'Audited Financial Statements (last 1–3 years if existing)', mandatory: false },
      { name: 'Detailed Business Pitch Deck & Financial Projections', mandatory: true },
      { name: 'Promoter PAN and Aadhaar Cards',                       mandatory: true },
      { name: 'GST Registration Certificate',                         mandatory: true },
    ],
    importantDates: [
      { event: 'Application Window',         date: 'Continuous rolling application portal at vcfst.in' },
      { event: 'Investment Committee Pitch', date: 'Bi-monthly evaluation meetings' },
      { event: 'Due Diligence & Term Sheet', date: '60 days from shortlisting' },
    ],
    verificationProcess: [
      'Company submits business plan online at vcfst.in',
      'Preliminary evaluation by IFCI Venture Investment Team',
      'Formal pitch presentation before the VCF-ST Investment Committee',
      'Detailed legal and financial due diligence of the startup',
      'Term Sheet signing and capital disbursement directly into company escrow account',
    ],
  },

  // ─── 12. PM-JANMAN Tribal Hostel & PVTG Education Scheme ─────────────────
  {
    id: 'pm_janman_hostels',
    name: 'PM-JANMAN Tribal Hostel & PVTG Educational Support Scheme',
    shortName: 'PM-JANMAN Hostels',
    ministry: 'Ministry of Tribal Affairs, Government of India',
    level: 'School Education',
    schemeCode: 'MoTA-JANMAN-12',
    portalName: 'PM-JANMAN Portal',
    applicationUrl: 'https://pmjanman.tribal.gov.in',
    description:
      'Component under the Pradhan Mantri Janjati Adivasi Nyaya Maha Abhiyan (PM-JANMAN) providing 500+ dedicated hostels, multipurpose community centers, zero-dropout school enrollment, nutrition kits, and transport subsidies for Particularly Vulnerable Tribal Groups (PVTGs).',
    eligibility: {
      category: ['Particularly Vulnerable Tribal Groups (PVTG) & ST Students'],
      incomeLimit: null,
      classRange: { min: 1, max: 12 },
      institutionType: ['Government Schools in notified PVTG Habitations'],
      other: [
        'Belongs to one of the 75 notified Particularly Vulnerable Tribal Groups (PVTGs)',
        'Residing in identified PVTG habitations across 18 States and UT of Andaman & Nicobar',
        'Enrolled in elementary, middle, secondary, or senior secondary school',
      ],
    },
    benefits: [
      { label: 'Hostel Accommodation',    value: '100% Free residential stay in PM-JANMAN student hostels' },
      { label: 'Nutritional Support',     value: 'Daily three wholesome meals + fortified supplementary nutrition' },
      { label: 'Transport / Escort Grant', value: '₹1,500/year for students commuting from remote forest hamlets' },
      { label: 'Remedial Tutoring',       value: 'Mother-tongue based bilingual bridge learning support' },
    ],
    documents: [
      { name: 'PVTG / ST Certificate issued by District Collector / Sub-Divisional Magistrate', mandatory: true },
      { name: 'Aadhaar Card of student / parent (biometric exception handled by village team)', mandatory: true },
      { name: 'School Admission Certificate / Student ID',                                     mandatory: true },
      { name: 'Habitation / Residence Certificate from Gram Panchayat / BDO',                 mandatory: true },
    ],
    importantDates: [
      { event: 'Village Saturation Drives', date: 'Monthly saturation camps in PVTG habitations' },
      { event: 'Hostel Admissions',         date: 'May–July preceding academic session' },
      { event: 'Mid-term Facility Audit',   date: 'November each year' },
    ],
    verificationProcess: [
      'Mobile saturation van / Gram Panchayat nodal officer registers the student',
      'Cross-verification with PM-JANMAN district saturation database',
      'Hostel bed allotment and issue of PM-JANMAN Student Identity Card',
      'Quarterly student health and nutritional monitoring checkup',
    ],
  },

  // ─── 13. Tribal Forest Dwellers Empowerment Scheme (TFDES) ───────────────
  {
    id: 'tfdes_scheme',
    name: 'Tribal Forest Dwellers Empowerment Scheme (TFDES)',
    shortName: 'TFDES Forest Land',
    ministry: 'National Scheduled Tribes Finance and Development Corporation (NSTFDC)',
    level: 'Livelihood',
    schemeCode: 'NSTFDC-TFDES-13',
    portalName: 'NSTFDC FRA Portal',
    applicationUrl: 'https://nstfdc.tribal.gov.in',
    description:
      'Concessional financial assistance scheme designed exclusively for Scheduled Tribe title-holders under the Forest Rights Act (FRA), 2006 to finance land development, farm mechanization, irrigation pumps, medicinal plant cultivation, and Minor Forest Produce (MFP) processing units.',
    eligibility: {
      category: ['Scheduled Tribe (ST) - FRA Patta Holders'],
      incomeLimit: 300000,
      ageLimit: { min: 18, max: 65 },
      other: [
        'Must be an individual or community ST title-holder under FRA, 2006',
        'Should possess valid Land Title Deed (Patta) issued by District Level Committee',
        'Annual family income from all sources must not exceed ₹3,00,000 per annum',
      ],
    },
    benefits: [
      { label: 'Maximum Financial Aid', value: 'Up to ₹1,00,000 per beneficiary' },
      { label: 'Project Cost Coverage', value: '100% of the project cost financed by NSTFDC (Zero borrower contribution)' },
      { label: 'Low Interest Rate',     value: '6.0% per annum' },
      { label: 'Repayment Period',      value: 'Up to 5 years (with 6 months moratorium for agriculture cycles)' },
    ],
    documents: [
      { name: 'FRA Land Title Deed (Patta Certificate) under FRA, 2006', mandatory: true },
      { name: 'ST Caste Certificate',                                    mandatory: true },
      { name: 'Family Income Certificate',                               mandatory: true },
      { name: 'Aadhaar Card and Bank Passbook (DBT enabled)',            mandatory: true },
      { name: 'Land revenue map / demarcation certificate from Gram Sabha', mandatory: true },
    ],
    importantDates: [
      { event: 'Scheme Enrollment Window', date: 'Continuous round-the-year processing' },
      { event: 'Gram Sabha Verification',  date: 'Special Gram Sabha scheduled quarterly' },
      { event: 'Asset Handover / DBT',     date: 'Within 30 days of sanction' },
    ],
    verificationProcess: [
      'Beneficiary submits application through Forest Rights Committee / Gram Sabha to SCA',
      'Validation of FRA Title Deed against District Collectorate FRA Registry',
      'Field inspection of agricultural land by Agricultural Extension Officer',
      'Sanction letter issued by NSTFDC',
      'Direct DBT credit to beneficiary account or direct payment for farm machinery / solar pumps',
    ],
  },

  // ─── 14. Micro Credit Scheme for ST Self Help Groups ─────────────────────
  {
    id: 'micro_credit_st',
    name: 'Micro Credit Scheme for Scheduled Tribe Self Help Groups (SHGs)',
    shortName: 'ST Micro Credit',
    ministry: 'National Scheduled Tribes Finance and Development Corporation (NSTFDC)',
    level: 'Community Finance',
    schemeCode: 'NSTFDC-MC-14',
    portalName: 'NSTFDC Micro Finance',
    applicationUrl: 'https://nstfdc.tribal.gov.in',
    description:
      'Direct micro-finance credit facility provided through State Channelising Agencies (SCAs) to Scheduled Tribe Self Help Groups (SHGs) to meet urgent credit needs, petty trade, small animal husbandry, vegetable cultivation, and handicrafts production.',
    eligibility: {
      category: ['Scheduled Tribe (ST) Self Help Group Members'],
      incomeLimit: 300000,
      ageLimit: { min: 18, max: 60 },
      other: [
        'At least 60% members of the Self Help Group must belong to Scheduled Tribes',
        'Remaining 40% members may be from other weaker socio-economic categories',
        'Group should have an active bank savings account operating smoothly for minimum 6 months',
        'Group must adhere to Pancha Sutra (regular meetings, regular savings, regular internal lending, timely repayment, and up-to-date bookkeeping)',
      ],
    },
    benefits: [
      { label: 'Credit Per Member',    value: 'Up to ₹50,000 per ST group member' },
      { label: 'Credit Per SHG Group', value: 'Up to ₹5,00,000 per Self Help Group' },
      { label: 'Group Interest Rate',  value: 'Only 6.0% p.a. charged to the SHG (Ultra-concessional)' },
      { label: 'Repayment Flexibility', value: 'Repayable in easy quarterly or monthly instalments within 3 years' },
    ],
    documents: [
      { name: 'ST Certificates of ST members of the SHG',                mandatory: true },
      { name: 'SHG Resolution copy signed by all members requesting loan', mandatory: true },
      { name: 'SHG Bank Account Passbook (showing 6 months transactions)', mandatory: true },
      { name: 'Aadhaar Cards of President, Secretary and borrowing members', mandatory: true },
      { name: 'NRLM / SRLM SHG Registration Number / Grading Certificate',  mandatory: true },
    ],
    importantDates: [
      { event: 'Application Window',  date: 'Round the year via SRLM / SCA block coordinators' },
      { event: 'Grading Assessment',  date: 'Conducted within 14 days of application' },
      { event: 'Credit Disbursement', date: 'Single-tranche credit to SHG bank account' },
    ],
    verificationProcess: [
      'SHG passes formal resolution and submits application through Block Mission Management Unit (NRLM/SRLM)',
      'Verification of group books, grading score, and ST member ratio by Block Coordinator',
      'Forwarding to State Channelising Agency / NSTFDC Regional Office',
      'Loan approval and agreement signing with SHG office bearers',
      'Bulk fund credit into SHG bank account for internal disbursement to members',
    ],
  },

  // ─── 15. PM Vanbandhu Kalyan Yojana (PMVKY) / TRI Research Fellowships ──
  {
    id: 'pmvky_fellowship',
    name: 'Pradhan Mantri Vanbandhu Kalyan Yojana (PMVKY) / TRI Research Fellowships',
    shortName: 'PMVKY Fellowships',
    ministry: 'Ministry of Tribal Affairs & Tribal Research Institutes (TRIs)',
    level: 'Fellowship',
    schemeCode: 'MoTA-PMVKY-15',
    portalName: 'MoTA Research Portal',
    applicationUrl: 'https://tribal.nic.in',
    description:
      'National research fellowships and grants under PM Vanbandhu Kalyan Yojana to support Scheduled Tribe doctoral, post-doctoral scholars and institutions engaged in cutting-edge research, documentation of indigenous knowledge systems, tribal languages, and tribal culture preservation.',
    eligibility: {
      category: ['Scheduled Tribe (ST) Scholars & Researchers'],
      incomeLimit: 600000,
      ageLimit: { max: 40 },
      institutionType: ['Universities, TRIs, ICSSR institutes & National Centers of Excellence'],
      other: [
        'Candidate must belong to Scheduled Tribe community',
        'Must hold a Master’s degree with at least 55% marks from a recognized university',
        'Registered for PhD / Post-Doctoral research in areas of tribal culture, economy, language, or ethnography',
        'Should not be receiving parallel fellowship from UGC/CSIR or other central agencies',
      ],
    },
    benefits: [
      { label: 'Monthly Fellowship Stipend', value: '₹31,000/month (Junior Fellow) | ₹35,000/month (Senior Fellow)' },
      { label: 'Annual Contingency Grant',   value: '₹50,000 per annum for fieldwork, books, and ethnography tools' },
      { label: 'Monograph Publication Fund',  value: 'Full financial grant to publish research work through MoTA / TRIs' },
      { label: 'National Seminar Allowance',  value: 'Travel and registration grant for presenting papers at national conferences' },
    ],
    documents: [
      { name: 'ST Certificate from competent Revenue Authority', mandatory: true },
      { name: 'Master’s Degree Certificate and Consolidated Marksheet', mandatory: true },
      { name: 'PhD / Post-Doc Registration Letter from University / TRI', mandatory: true },
      { name: 'Detailed Research Proposal approved by Research Supervisor', mandatory: true },
      { name: 'Aadhaar Card and APAAR ID',                      mandatory: true },
      { name: 'Recommendation Letter from Head of Department / TRI Director', mandatory: true },
    ],
    importantDates: [
      { event: 'Annual Fellowship Notification', date: 'May–June each year on tribal.nic.in' },
      { event: 'Research Proposal Deadline',    date: '31 July' },
      { event: 'Expert Committee Presentation', date: 'August–September' },
      { event: 'Fellowship Award Letter',       date: 'October' },
    ],
    verificationProcess: [
      'Online submission of application and research proposal on tribal.nic.in / TRI portal',
      'Peer review and screening by MoTA Academic Advisory Council',
      'Candidate invited for oral presentation before Research Selection Board',
      'Formal Fellowship Award Letter issued by Ministry of Tribal Affairs',
      'Monthly fellowship disbursed directly via DBT PFMS into researcher bank account',
    ],
  },
];

export const getScholarshipById = (id: string): ScholarshipScheme | undefined =>
  SCHOLARSHIPS.find((s) => s.id === id);
