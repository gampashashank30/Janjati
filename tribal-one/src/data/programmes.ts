// ─────────────────────────────────────────────────────────────────────────────
// All programme data verified against:
//   Ministry of Tribal Affairs (tribal.nic.in)
//   PIB Press Releases (pib.gov.in)
//   NSTFDC (nstfdc.tribal.gov.in)
//   GOAL Portal (goal.tribal.gov.in)
//
// Last verified: September 2026
// ─────────────────────────────────────────────────────────────────────────────

export type ProgrammeCategory =
  | 'School & Education'
  | 'Education Loan'
  | 'Youth & Skill Development'
  | 'PVTG / Tribal Welfare'
  | 'Tribal Development'
  | 'Livelihood & Economic'
  | 'Entrepreneurship & Finance';

export type ProgrammeStatus = 'Active' | 'Historical / Absorbed';

export interface Programme {
  id: string;
  name: string;
  shortName: string;
  fullName?: string;
  category: ProgrammeCategory;
  status: ProgrammeStatus;
  absorbedInto?: string;           // For historical/absorbed programmes
  launchDate?: string;
  implementingBody: string;
  target: string;
  tagColor: string;
  tagBg: string;
  overview: string;
  keyFacts: { label: string; value: string }[];
  whatItProvides: string[];
  howToAccess: string;
  applicationRoute: 'individual_apply' | 'institutional' | 'awareness_only' | 'historical';
  officialUrl: string;
  portalUrl?: string;
  guidelinesUrl?: string;
  currentStatusNote?: string;
}

export const PROGRAMMES: Programme[] = [
  // ─── School & Education ────────────────────────────────────────────────────

  {
    id: 'emrs',
    name: 'Eklavya Model Residential Schools (EMRS)',
    shortName: 'EMRS',
    category: 'School & Education',
    status: 'Active',
    implementingBody: 'National Education Society for Tribal Students (NESTS), Ministry of Tribal Affairs',
    target: 'Scheduled Tribe children in tribal/sub-plan areas',
    tagColor: '#1d4ed8',
    tagBg: '#eff6ff',
    overview:
      'Eklavya Model Residential Schools provide quality residential education to ST children in Classes VI–XII, focusing on academics, sports, cultural development and preservation of tribal heritage. Each school has a standard capacity of 480 students.',
    keyFacts: [
      { label: 'Classes Covered',    value: 'Class VI to Class XII' },
      { label: 'School Capacity',    value: '480 students per school' },
      { label: '2026–27 Allocation', value: '₹7,200 crore (Central)' },
      { label: 'Implementing Body',  value: 'NESTS, Ministry of Tribal Affairs' },
      { label: 'Type',               value: 'Residential School (not individual scholarship)' },
    ],
    whatItProvides: [
      'Free quality residential education for ST children from Class VI to XII',
      'Infrastructure: classrooms, hostels, laboratories, libraries, sports facilities',
      'Co-curricular activities: sports coaching, cultural programmes, skill workshops',
      'Preservation and promotion of tribal language, culture and heritage',
      'Mid-day meals, healthcare, and other student support services',
      'Competitive exam coaching and career guidance',
    ],
    howToAccess:
      'Admission is through a transparent merit-based process conducted by NESTS. Contact your nearest EMRS or the State Education Department. No individual online scholarship application is required.',
    applicationRoute: 'institutional',
    officialUrl: 'https://tribal.nic.in/EMRS.aspx',
    portalUrl: 'https://emrs.tribal.gov.in',
    guidelinesUrl: 'https://tribal.nic.in/downloads/EMRS/Guidelines/EMRS%20Guidelines%20November%202020.pdf',
  },

  {
    id: 'st_girls_edu',
    name: 'Strengthening Education Among ST Girls in Low Literacy Districts',
    shortName: 'ST Girls Education',
    category: 'School & Education',
    status: 'Active',
    implementingBody: 'Ministry of Tribal Affairs (through NGOs / Voluntary Organizations)',
    target: 'ST girls in identified low-literacy tribal districts',
    tagColor: '#7c3aed',
    tagBg: '#f5f3ff',
    overview:
      'This scheme improves educational access for Scheduled Tribe girls in districts with low female literacy. It works through voluntary organizations and educational complexes to provide residential/educational facilities in tribal areas. It is NOT an individual scholarship application scheme.',
    keyFacts: [
      { label: 'Target Group',  value: 'ST girls in low-literacy tribal districts' },
      { label: 'Mode',          value: 'Implemented through NGOs / Voluntary Organizations' },
      { label: 'Type',          value: 'Education support scheme (not individual scholarship)' },
      { label: 'Apply Route',   value: 'No individual application route for students' },
    ],
    whatItProvides: [
      'Educational facilities and residential support for ST girls in low-literacy areas',
      'Support for voluntary organizations running educational complexes for ST girls',
      'Bridging educational gaps in notified low tribal literacy districts',
      'Access to schooling, hostel accommodation and basic educational support',
    ],
    howToAccess:
      'This scheme is implemented through NGOs and voluntary organizations, NOT through individual student applications. Contact your District Tribal Welfare Office or the implementing NGO in your district for information on available facilities near you.',
    applicationRoute: 'awareness_only',
    officialUrl: 'https://tribal.nic.in/NGO.aspx',
    currentStatusNote:
      'No individual online application route exists. Benefits are delivered through institutional implementation by approved NGOs.',
  },

  // ─── Education Loan ────────────────────────────────────────────────────────

  {
    id: 'asry',
    name: 'Adivasi Shiksha Rinn Yojana (ASRY)',
    shortName: 'ASRY',
    fullName: 'Adivasi Shiksha Rinn Yojana',
    category: 'Education Loan',
    status: 'Active',
    implementingBody: 'National Scheduled Tribes Finance and Development Corporation (NSTFDC)',
    target: 'Eligible ST students pursuing professional / technical education in India',
    tagColor: '#b45309',
    tagBg: '#fffbeb',
    overview:
      'ASRY is an education loan scheme by NSTFDC (under Ministry of Tribal Affairs) providing concessional loans to ST students for professional and technical education in India, including PhD. Loans are provided at 6% per annum interest with an interest subsidy during the moratorium period.',
    keyFacts: [
      { label: 'Max Loan Amount',    value: '₹10 lakh for professional / technical courses (incl. PhD in India)' },
      { label: 'Interest Rate',      value: '6% per annum (concessional)' },
      { label: 'Interest Subsidy',   value: 'Available under Ministry of Education scheme during moratorium period' },
      { label: 'Implementing Body',  value: 'NSTFDC through State Channelizing Agencies (SCAs)' },
      { label: 'Category',           value: 'Education Loan — not a scholarship' },
    ],
    whatItProvides: [
      'Concessional education loan up to ₹10 lakh for professional and technical courses',
      'Coverage of tuition fees, hostel charges, books and related education expenses',
      'Interest subsidy during the course period and moratorium (Ministry of Education scheme)',
      'Loan disbursed through State Channelizing Agencies (SCAs) of NSTFDC',
    ],
    howToAccess:
      'Apply through the NSTFDC official website or contact your State Channelizing Agency (SCA). Visit nstfdc.tribal.gov.in for the SCA list and application procedure.',
    applicationRoute: 'individual_apply',
    officialUrl: 'https://www.nstfdc.tribal.gov.in',
    portalUrl: 'https://www.nstfdc.tribal.gov.in',
    guidelinesUrl: 'https://nstfdc.tribal.gov.in/CuteSoft_Client/writereaddata/upload/02_AR%20ENGLISH-2023-24.pdf',
  },

  // ─── Youth & Skill Development ─────────────────────────────────────────────

  {
    id: 'goal',
    name: 'GOAL — Going Online as Leaders',
    shortName: 'GOAL',
    fullName: 'Going Online as Leaders',
    category: 'Youth & Skill Development',
    status: 'Active',
    implementingBody: 'Ministry of Tribal Affairs (in partnership with Meta / Facebook)',
    target: 'Scheduled Tribe / tribal youth',
    tagColor: '#0d6560',
    tagBg: '#f0faf9',
    overview:
      'GOAL is a digital mentorship and skilling initiative to empower tribal youth with digital literacy, life skills, leadership and entrepreneurship. The programme connects tribal youth (mentees) with expert mentors for a structured 9-month programme: 7 months of mentorship followed by 2 months of internship.',
    keyFacts: [
      { label: 'Programme Duration', value: '9 months (7 months mentorship + 2 months internship)' },
      { label: 'Original Scale',     value: '5,000 tribal youth over 5 years' },
      { label: 'Skills Covered',     value: 'Digital literacy, life skills, leadership, entrepreneurship, sector skills' },
      { label: 'Partner',            value: 'Meta (Facebook)' },
      { label: 'Type',               value: 'Mentorship & Skilling — not a scholarship' },
    ],
    whatItProvides: [
      '7-month structured mentorship: weekly sessions with expert mentors (28 weeks)',
      '2-month internship in reputed organizations (8 weeks)',
      'Digital literacy and online tools training',
      'Life skills, communication and leadership coaching',
      'Entrepreneurship and self-employment skill development',
      'Sector-specific skills linked to livelihood opportunities',
    ],
    howToAccess:
      'Register on the GOAL portal (goal.tribal.gov.in) when the next cohort opens. Check the portal for eligibility and active registration windows.',
    applicationRoute: 'individual_apply',
    officialUrl: 'https://tribal.nic.in/Goal.aspx',
    portalUrl: 'https://goal.tribal.gov.in',
  },

  // ─── PVTG / Tribal Welfare ─────────────────────────────────────────────────

  {
    id: 'pm_janman',
    name: 'PM-JANMAN — Pradhan Mantri Janjati Adivasi Nyaya Maha Abhiyan',
    shortName: 'PM-JANMAN',
    fullName: 'Pradhan Mantri Janjati Adivasi Nyaya Maha Abhiyan',
    category: 'PVTG / Tribal Welfare',
    status: 'Active',
    launchDate: '15 November 2023',
    implementingBody: '9 Line Ministries coordinated by Ministry of Tribal Affairs',
    target: '75 Particularly Vulnerable Tribal Group (PVTG) communities in 18 States and 1 UT',
    tagColor: '#166534',
    tagBg: '#f0fdf4',
    overview:
      'PM-JANMAN is a flagship mission launched on 15 November 2023 to ensure saturation of the 75 most vulnerable PVTG communities with basic services. It covers safe housing, drinking water, education, health, nutrition, road connectivity, telecom, electrification and sustainable livelihoods through 11 critical interventions by 9 line Ministries.',
    keyFacts: [
      { label: 'PVTG Communities',     value: '75 identified communities' },
      { label: 'States / UTs Covered', value: '18 States + 1 Union Territory' },
      { label: 'Number of Interventions', value: '11 critical interventions' },
      { label: 'Line Ministries',       value: '9 Ministries' },
      { label: 'Total Budget',          value: '₹24,104 crore (Central share: ₹15,336 crore)' },
      { label: 'Launched',              value: '15 November 2023 (Janjatiya Gaurav Divas)' },
    ],
    whatItProvides: [
      'Safe housing under PM Awas Yojana (Gramin) for PVTG families',
      'Clean drinking water and household sanitation facilities',
      'Improved access to education including Anganwadi centres and hostel facilities',
      'Health centres, mobile medical units and nutrition support',
      'Road connectivity to PVTG habitations',
      'Telecom / mobile connectivity to remote PVTG villages',
      'Electrification of unelectrified PVTG households',
      'Sustainable livelihood support and Van Dhan Vikas Kendras',
    ],
    howToAccess:
      'PM-JANMAN is a saturation mission — coverage is automatically extended to eligible PVTG habitations. Individual applications are not required for most interventions. Contact your local District Tribal Welfare Officer for specific programme access.',
    applicationRoute: 'awareness_only',
    officialUrl: 'https://tribal.nic.in/PM-JANMAN.aspx',
  },

  {
    id: 'pvtg_dev',
    name: 'Development of Particularly Vulnerable Tribal Groups (PVTGs)',
    shortName: 'PVTG Development',
    category: 'PVTG / Tribal Welfare',
    status: 'Active',
    implementingBody: 'Ministry of Tribal Affairs (through States / NGOs / Implementing Agencies)',
    target: '75 Identified PVTG communities across India',
    tagColor: '#15803d',
    tagBg: '#f0fdf4',
    overview:
      'A comprehensive socio-economic development programme targeting the 75 most vulnerable tribal communities (PVTGs). Covers livelihood, employment, education, health, housing, basic infrastructure, community development, and protection of tribal culture. Note: PM-JANMAN is the current primary mission for PVTG development.',
    keyFacts: [
      { label: 'Target Communities', value: '75 Particularly Vulnerable Tribal Groups (PVTGs)' },
      { label: 'Focus Areas',        value: 'Livelihood, education, health, housing, culture preservation' },
      { label: 'Coordination',       value: 'See also PM-JANMAN — the current flagship PVTG mission' },
    ],
    whatItProvides: [
      'Livelihood and employment support for PVTG families',
      'Education access and hostel facilities for PVTG children',
      'Healthcare, nutrition and reproductive health support',
      'Housing, drinking water and basic infrastructure',
      'Community development and institutional capacity building',
      'Protection and promotion of tribal culture, language and heritage',
    ],
    howToAccess:
      'These programmes are delivered through State Governments, NGOs and local implementing agencies. For current PVTG support, refer to PM-JANMAN which is the active flagship mission. Contact your District Tribal Welfare Office.',
    applicationRoute: 'awareness_only',
    officialUrl: 'https://tribal.nic.in/STWelfareGrant.aspx',
    guidelinesUrl: 'https://tribal.nic.in/writereaddata/Schemes/4-5NGORevisedScheme.pdf',
  },

  // ─── Tribal Development ────────────────────────────────────────────────────

  {
    id: 'da_jgua',
    name: 'Dharti Aaba Janjatiya Gram Utkarsh Abhiyan (DA-JGUA)',
    shortName: 'DA-JGUA',
    fullName: 'Dharti Aaba Janjatiya Gram Utkarsh Abhiyan',
    category: 'Tribal Development',
    status: 'Active',
    launchDate: '2 October 2024',
    implementingBody: '17 Line Ministries / Departments coordinated by Ministry of Tribal Affairs',
    target: 'Tribal families and villages across 30 States/UTs',
    tagColor: '#9a3412',
    tagBg: '#fff7ed',
    overview:
      'Dharti Aaba Janjatiya Gram Utkarsh Abhiyan was launched on 2 October 2024 as a convergence mission to saturate tribal villages with basic services. It covers 63,843 tribal-dominated villages across 549 districts, 2,911 blocks in 30 States/UTs, through 25 interventions by 17 line Ministries. PMAAGY (Pradhan Mantri Adi Adarsh Gram Yojana) was subsumed into this mission as confirmed by the MoTA Citizen Charter (December 2025).',
    keyFacts: [
      { label: 'Villages Covered',      value: '63,843 tribal-dominated villages' },
      { label: 'Districts',             value: '549 districts across India' },
      { label: 'Blocks',                value: '2,911 blocks' },
      { label: 'States / UTs',          value: '30 States and UTs' },
      { label: 'Interventions',         value: '25 interventions' },
      { label: 'Line Ministries',       value: '17 Ministries / Departments' },
      { label: 'Launched',              value: '2 October 2024' },
      { label: 'Total Budget Outlay',   value: '₹79,156 crore (Central share: ₹56,333 crore)' },
      { label: 'PMAAGY Status',         value: 'Subsumed under DA-JGUA (MoTA Citizen Charter, Dec 2025)' },
    ],
    whatItProvides: [
      'Education: school facilities, Anganwadi centres, hostel infrastructure',
      'Health: PHCs, mobile health units, nutrition support',
      'Drinking water and household sanitation',
      'Road, electricity and telecom connectivity to tribal villages',
      'Livelihood: Van Dhan Vikas Kendras, minor forest produce value chains',
      'Pucca housing under PM Awas Yojana (Gramin)',
      'Convergence of 25 Central schemes in one mission framework',
    ],
    howToAccess:
      'DA-JGUA is a village-level saturation mission. Individual applications are not required. Benefits are delivered through the respective line Ministry schemes. Contact your Gram Panchayat, District Magistrate office, or District Tribal Welfare Officer.',
    applicationRoute: 'awareness_only',
    officialUrl: 'https://tribal.nic.in/dajagua.aspx',
  },

  {
    id: 'pmaagy',
    name: 'Pradhan Mantri Adi Adarsh Gram Yojana (PMAAGY)',
    shortName: 'PMAAGY',
    fullName: 'Pradhan Mantri Adi Adarsh Gram Yojana',
    category: 'Tribal Development',
    status: 'Historical / Absorbed',
    absorbedInto: 'Dharti Aaba Janjatiya Gram Utkarsh Abhiyan (DA-JGUA)',
    implementingBody: 'Ministry of Tribal Affairs',
    target: 'Villages with significant tribal population',
    tagColor: '#6b7280',
    tagBg: '#f1f5f9',
    overview:
      'PMAAGY was a scheme for integrated development of villages with significant tribal populations, focusing on road/telecom connectivity, Anganwadis, health, drinking water, sanitation and other development gaps. Per the MoTA Citizen Charter (December 2025), PMAAGY has been subsumed under the Dharti Aaba Janjatiya Gram Utkarsh Abhiyan (DA-JGUA) launched on 2 October 2024.',
    keyFacts: [
      { label: 'Current Status',  value: 'Subsumed under DA-JGUA (as per MoTA Dec 2025 Citizen Charter)' },
      { label: 'Successor',       value: 'DA-JGUA — Dharti Aaba Janjatiya Gram Utkarsh Abhiyan' },
      { label: 'Historical Focus', value: 'Integrated village development — roads, water, health, education' },
    ],
    whatItProvides: [
      'Historical: Road and telecom connectivity to tribal villages',
      'Historical: Anganwadi and school infrastructure',
      'Historical: Drinking water and sanitation facilities',
      'Historical: Health centre access and nutrition programmes',
      'NOTE: These are now being delivered under DA-JGUA',
    ],
    howToAccess:
      'PMAAGY has been subsumed under DA-JGUA. For current village development support, refer to DA-JGUA and contact your Gram Panchayat or District Tribal Welfare Office.',
    applicationRoute: 'historical',
    officialUrl: 'https://tribal.nic.in/dajagua.aspx',
    guidelinesUrl: 'https://tribal.nic.in/downloads/SCA_To_TSS/PMAAGYGuidelines.pdf',
    currentStatusNote: 'This scheme has been subsumed into DA-JGUA as per MoTA Citizen Charter, December 2025.',
  },

  // ─── Livelihood & Economic ─────────────────────────────────────────────────

  {
    id: 'pmjvm',
    name: 'Pradhan Mantri Janjatiya Vikas Mission (PMJVM)',
    shortName: 'PMJVM',
    fullName: 'Pradhan Mantri Janjatiya Vikas Mission',
    category: 'Livelihood & Economic',
    status: 'Active',
    implementingBody: 'Ministry of Tribal Affairs',
    target: 'Tribal communities involved in forest produce, livelihoods and tribal products',
    tagColor: '#166534',
    tagBg: '#f0fdf4',
    overview:
      'PMJVM focuses on improving tribal livelihoods through value addition, marketing support and economic opportunities centred around tribal products and produce. It was formed by merging earlier tribal livelihood initiatives related to Minor Forest Produce (MFP), Minimum Support Price mechanisms, MFP value chains, and institutional support for tribal products.',
    keyFacts: [
      { label: 'Focus',             value: 'Tribal livelihoods, MFP value chains, marketing, tribal products' },
      { label: 'Key Component',     value: 'Minimum Support Price for Minor Forest Produce (MFP)' },
      { label: 'Van Dhan',          value: 'Van Dhan Vikas Kendras for tribal entrepreneurship' },
      { label: 'Status',            value: 'Active — listed in MoTA 2026–27 financial records' },
    ],
    whatItProvides: [
      'Minimum Support Price (MSP) for Minor Forest Produce collected by tribal communities',
      'Value addition support for forest produce and tribal products',
      'Marketing linkages for tribal goods through TRIFED and State agencies',
      'Van Dhan Vikas Kendras: tribal-run enterprise clusters for processing and value addition',
      'Tribal products promotion through Tribes India and e-commerce platforms',
      'Capacity building and skilling for tribal livelihood enterprises',
    ],
    howToAccess:
      'Benefits are delivered through TRIFED, State Tribal Development Corporations, and Van Dhan Vikas Kendras. Contact your local Van Dhan Vikas Kendra, State Tribal Marketing Federation, or Tribal Cooperative Marketing Development Federation (TRIFED).',
    applicationRoute: 'awareness_only',
    officialUrl: 'https://tribal.nic.in/Livelihood.aspx',
    portalUrl: 'https://trifed.tribal.gov.in',
  },

  // ─── Entrepreneurship & Finance ────────────────────────────────────────────

  {
    id: 'vcf_st',
    name: 'Venture Capital Fund for Scheduled Tribes (VCF-ST)',
    shortName: 'VCF-ST',
    category: 'Entrepreneurship & Finance',
    status: 'Active',
    implementingBody: 'Ministry of Tribal Affairs (Investment fund structure)',
    target: 'Eligible Scheduled Tribe entrepreneurs and ST enterprises',
    tagColor: '#7c3aed',
    tagBg: '#f5f3ff',
    overview:
      'VCF-ST is an investment-fund structure to support eligible ST entrepreneurship and enterprises. It provides venture capital / equity / investment support to ST entrepreneurs who need growth capital for viable business ventures. The 2026–27 allocation is ₹30 crore.',
    keyFacts: [
      { label: '2026–27 Allocation', value: '₹30 crore' },
      { label: 'Type',              value: 'Venture capital / investment fund — not a scholarship or loan' },
      { label: 'Target',            value: 'ST entrepreneurs and ST-owned enterprises' },
      { label: 'Purpose',           value: 'Equity / investment support for viable business ventures' },
    ],
    whatItProvides: [
      'Venture capital / investment support for ST entrepreneurs',
      'Equity funding for viable ST-owned business ventures',
      'Support for scaling up tribal enterprises and businesses',
      'Connection to investment-ready opportunities in tribal economic ecosystem',
    ],
    howToAccess:
      'For current application procedures and eligibility, refer to the official VCF-ST guidelines. Contact the Ministry of Tribal Affairs Livelihood Division or visit the NSTFDC website for investment application procedures.',
    applicationRoute: 'individual_apply',
    officialUrl: 'https://tribal.nic.in/Livelihood.aspx',
    guidelinesUrl: 'https://tribal.nic.in/downloads/Livelihood/Guidelines/VCF-STGuidelines1123.pdf',
  },
];

export const getProgrammeById = (id: string): Programme | undefined =>
  PROGRAMMES.find((p) => p.id === id);

export const getProgrammesByCategory = (category: ProgrammeCategory): Programme[] =>
  PROGRAMMES.filter((p) => p.category === category);

export const PROGRAMME_CATEGORIES: ProgrammeCategory[] = [
  'School & Education',
  'Education Loan',
  'Youth & Skill Development',
  'PVTG / Tribal Welfare',
  'Tribal Development',
  'Livelihood & Economic',
  'Entrepreneurship & Finance',
];
