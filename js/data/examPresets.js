// Testbook Govt Exam Tools - Presets & Official Parameters

export const PHOTO_PRESETS = [
  {
    id: 'ssc',
    name: 'SSC (CGL, CHSL, MTS, CPO, GD)',
    widthCm: 3.5,
    heightCm: 4.5,
    widthPx: 350,
    heightPx: 450,
    aspectRatio: 3.5 / 4.5,
    minKb: 20,
    maxKb: 50,
    format: 'image/jpeg',
    formatName: 'JPEG/JPG',
    notes: 'Recent colored photo with light/white background. Spectacles/caps strictly prohibited.',
    requiresNameDate: false,
    dopOption: true
  },
  {
    id: 'upsc',
    name: 'UPSC (CSE, CDS, NDA, CAPF)',
    widthCm: 3.5,
    heightCm: 4.5,
    widthPx: 350,
    heightPx: 450,
    aspectRatio: 3.5 / 4.5,
    minKb: 20,
    maxKb: 300,
    format: 'image/jpeg',
    formatName: 'JPEG/JPG',
    notes: 'Min 350x350px up to 1000x1000px. Name & Date of Photo (DOP) at bottom may be required.',
    requiresNameDate: true,
    dopOption: true
  },
  {
    id: 'ibps',
    name: 'IBPS / SBI (PO, Clerk, SO, RRB)',
    widthCm: 3.5,
    heightCm: 4.5,
    widthPx: 200,
    heightPx: 230,
    aspectRatio: 200 / 230,
    minKb: 20,
    maxKb: 50,
    format: 'image/jpeg',
    formatName: 'JPEG/JPG',
    notes: 'Dimensions 200 x 230 pixels, white background preferred, clear face view.',
    requiresNameDate: false,
    dopOption: false
  },
  {
    id: 'rrb',
    name: 'Railways RRB (NTPC, Group D, ALP, JE)',
    widthCm: 3.5,
    heightCm: 4.5,
    widthPx: 320,
    heightPx: 400,
    aspectRatio: 320 / 400,
    minKb: 20,
    maxKb: 50,
    format: 'image/jpeg',
    formatName: 'JPEG/JPG',
    notes: '35mm x 45mm, clear face without sunglasses/caps. Plain light background.',
    requiresNameDate: false,
    dopOption: true
  },
  {
    id: 'state_psc',
    name: 'State PSC (BPSC, UPPSC, MPPSC, MPSC, TNPSC)',
    widthCm: 3.5,
    heightCm: 4.5,
    widthPx: 350,
    heightPx: 450,
    aspectRatio: 3.5 / 4.5,
    minKb: 20,
    maxKb: 100,
    format: 'image/jpeg',
    formatName: 'JPEG/JPG',
    notes: 'Standard passport proportion (3.5 x 4.5 cm). Light background.',
    requiresNameDate: false,
    dopOption: true
  },
  {
    id: 'custom',
    name: 'Custom Dimensions & Size Target',
    widthCm: 3.5,
    heightCm: 4.5,
    widthPx: 350,
    heightPx: 450,
    aspectRatio: 3.5 / 4.5,
    minKb: 20,
    maxKb: 50,
    format: 'image/jpeg',
    formatName: 'JPEG/JPG',
    notes: 'Set your own custom width, height, and target file size.',
    requiresNameDate: false,
    dopOption: true
  }
];

export const SIGNATURE_PRESETS = [
  {
    id: 'ssc_sig',
    name: 'SSC (CGL, CHSL, MTS, CPO, GD)',
    widthCm: 4.0,
    heightCm: 2.0,
    widthPx: 140,
    heightPx: 60,
    aspectRatio: 140 / 60,
    minKb: 10,
    maxKb: 20,
    format: 'image/jpeg',
    notes: '4.0 cm (width) x 2.0 cm (height). Running handwriting, black ink preferred. Capital letters forbidden.'
  },
  {
    id: 'upsc_sig',
    name: 'UPSC (CSE, CDS, NDA, CAPF)',
    widthCm: 3.5,
    heightCm: 1.5,
    widthPx: 350,
    heightPx: 150,
    aspectRatio: 350 / 150,
    minKb: 20,
    maxKb: 300,
    format: 'image/jpeg',
    notes: 'Min 350x150px or 350x350px. Clear black ink signature on white paper.'
  },
  {
    id: 'ibps_sig',
    name: 'IBPS / SBI (PO, Clerk, SO)',
    widthCm: 4.0,
    heightCm: 2.0,
    widthPx: 140,
    heightPx: 60,
    aspectRatio: 140 / 60,
    minKb: 10,
    maxKb: 20,
    format: 'image/jpeg',
    notes: '140 x 60 pixels, 10KB to 20KB. Black ink only. Signature in BLOCK letters will not be accepted.'
  },
  {
    id: 'rrb_sig',
    name: 'Railways RRB (NTPC, Group D, ALP)',
    widthCm: 3.5,
    heightCm: 1.5,
    widthPx: 140,
    heightPx: 60,
    aspectRatio: 140 / 60,
    minKb: 10,
    maxKb: 20,
    format: 'image/jpeg',
    notes: 'Running hand signature on white paper. No block letters.'
  },
  {
    id: 'custom_sig',
    name: 'Custom Dimensions',
    widthCm: 4.0,
    heightCm: 2.0,
    widthPx: 140,
    heightPx: 60,
    aspectRatio: 140 / 60,
    minKb: 10,
    maxKb: 50,
    format: 'image/jpeg',
    notes: 'Customize pixel dimensions and file size range.'
  }
];

export const EXAM_AGE_RULES = [
  {
    id: 'ssc_cgl',
    exam: 'SSC CGL',
    postCategory: 'Group B & C Posts',
    minAge: 18,
    maxAge: 32,
    subLimits: '18-27 (Auditor/UDC), 18-30 (ASO/Inspector), 18-32 (JSO)',
    typicalCutoff: '01-Aug',
    notes: 'Cutoff date is usually 1st August of exam year.'
  },
  {
    id: 'ssc_chsl',
    exam: 'SSC CHSL',
    postCategory: 'LDC, JSA, DEO',
    minAge: 18,
    maxAge: 27,
    subLimits: '18-27 years for all posts',
    typicalCutoff: '01-Aug',
    notes: 'Cutoff is typically 1st August of the notification year.'
  },
  {
    id: 'ssc_mts',
    exam: 'SSC MTS & Havaldar',
    postCategory: 'Multi-Tasking Staff & Havaldar',
    minAge: 18,
    maxAge: 27,
    subLimits: '18-25 (MTS general) & 18-27 (Havaldar & specific MTS posts)',
    typicalCutoff: '01-Aug',
    notes: 'Two distinct age bands (18-25 and 18-27).'
  },
  {
    id: 'ssc_cpo',
    exam: 'SSC CPO',
    postCategory: 'Sub-Inspector in Delhi Police & CAPF',
    minAge: 20,
    maxAge: 25,
    subLimits: '20-25 years',
    typicalCutoff: '01-Aug',
    notes: 'Physical standards & driving license (for Delhi Police) also required.'
  },
  {
    id: 'ssc_gd',
    exam: 'SSC GD Constable',
    postCategory: 'General Duty Constable in CAPFs, SSF, Assam Rifles',
    minAge: 18,
    maxAge: 23,
    subLimits: '18-23 years',
    typicalCutoff: '01-Jan',
    notes: 'Often 1st January cutoff date.'
  },
  {
    id: 'upsc_cse',
    exam: 'UPSC Civil Services (IAS/IPS/IFS)',
    postCategory: 'All Services (Group A & B)',
    minAge: 21,
    maxAge: 32,
    subLimits: '21-32 years (General: max 6 attempts)',
    typicalCutoff: '01-Aug',
    notes: 'Must have attained 21 years and not 32 on 1st August.'
  },
  {
    id: 'upsc_cds',
    exam: 'UPSC CDS',
    postCategory: 'IMA, INA, AFA, OTA',
    minAge: 19,
    maxAge: 25,
    subLimits: 'IMA: 19-24, INA: 19-24, AFA: 20-24, OTA: 19-25',
    typicalCutoff: 'Course Specific',
    notes: 'Specific birth window specified in notification.'
  },
  {
    id: 'upsc_nda',
    exam: 'UPSC NDA & NA',
    postCategory: 'Army, Navy, Air Force Wings',
    minAge: 16.5,
    maxAge: 19.5,
    subLimits: '16.5 - 19.5 years',
    typicalCutoff: 'Course Specific',
    notes: 'Exact birth date window given in notification.'
  },
  {
    id: 'rrb_ntpc',
    exam: 'RRB NTPC (Graduate & Under-Graduate)',
    postCategory: 'Station Master, Goods Guard, Clerks',
    minAge: 18,
    maxAge: 33,
    subLimits: 'Under-Grad: 18-30 (+3 COVID relief), Grad: 18-33 (+3 COVID relief)',
    typicalCutoff: '01-Jul',
    notes: 'Recent notifications often gave 3 years one-time relaxation.'
  },
  {
    id: 'rrb_alp',
    exam: 'RRB Assistant Loco Pilot (ALP)',
    postCategory: 'ALP & Technicians',
    minAge: 18,
    maxAge: 33,
    subLimits: '18-30 (Standard), 18-33 (with special relief)',
    typicalCutoff: '01-Jul',
    notes: 'Cutoff date is typically 1st July.'
  },
  {
    id: 'rrb_group_d',
    exam: 'RRB Group D (Level 1)',
    postCategory: 'Track Maintainer, Pointsman, Helpers',
    minAge: 18,
    maxAge: 33,
    subLimits: '18-33 years',
    typicalCutoff: '01-Jul',
    notes: 'Relaxation up to 36 (OBC) and 38 (SC/ST).'
  },
  {
    id: 'ibps_po',
    exam: 'IBPS / SBI PO',
    postCategory: 'Probationary Officer (Scale 1)',
    minAge: 20,
    maxAge: 30,
    subLimits: '20-30 years',
    typicalCutoff: '01-Aug / 01-Sep',
    notes: 'Age on 1st of notification month.'
  },
  {
    id: 'ibps_clerk',
    exam: 'IBPS / SBI Clerk',
    postCategory: 'Junior Associate / Customer Support',
    minAge: 20,
    maxAge: 28,
    subLimits: '20-28 years',
    typicalCutoff: '01-Aug / 01-Sep',
    notes: '20 to 28 years for general candidates.'
  },
  {
    id: 'state_psc_general',
    exam: 'State PSCs (BPSC, UPPSC, MPPSC, etc.)',
    postCategory: 'Administrative Services / SDM / DSP',
    minAge: 21,
    maxAge: 40,
    subLimits: 'UPPSC: 21-40, BPSC: 20/21/22-37 (Male)/40 (Female), MPPSC: 21-40',
    typicalCutoff: '01-Jan / 01-Jul',
    notes: 'State PSCs offer higher upper age limits (up to 37-40 for General).'
  }
];

export const CATEGORY_RELAXATIONS = [
  { id: 'ur', name: 'General / Unreserved (UR)', relaxationYears: 0, description: 'No age relaxation applicable' },
  { id: 'obc', name: 'OBC (Non-Creamy Layer)', relaxationYears: 3, description: '+3 Years over upper age limit' },
  { id: 'sc_st', name: 'SC / ST', relaxationYears: 5, description: '+5 Years over upper age limit' },
  { id: 'ews', name: 'EWS (Economically Weaker Section)', relaxationYears: 0, description: 'No general age relaxation (fee/seat reservation applies)' },
  { id: 'pwd_ur', name: 'PwBD / PwD (General / EWS)', relaxationYears: 10, description: '+10 Years relaxation' },
  { id: 'pwd_obc', name: 'PwBD / PwD (OBC-NCL)', relaxationYears: 13, description: '+13 Years relaxation (10 PwD + 3 OBC)' },
  { id: 'pwd_sc_st', name: 'PwBD / PwD (SC / ST)', relaxationYears: 15, description: '+15 Years relaxation (10 PwD + 5 SC/ST)' },
  { id: 'esm', name: 'Ex-Servicemen (ESM)', relaxationYears: 3, description: 'Military service rendered + 3 years (subject to exam rules)' }
];

export const SALARY_PRESETS = [
  {
    id: 'cgl_l8',
    exam: 'SSC CGL',
    postName: 'Assistant Audit Officer (AAO) / Assistant Accounts Officer',
    level: 8,
    basicPay: 47600,
    group: 'Group B (Gazetted)',
    description: 'Highest entry-level pay in SSC CGL.'
  },
  {
    id: 'cgl_l7',
    exam: 'SSC CGL',
    postName: 'ASO in CSS/MEA, Inspector CGST, IT Inspector, Examiner, Sub-Inspector CBI',
    level: 7,
    basicPay: 44900,
    group: 'Group B (Non-Gazetted)',
    description: 'Most coveted posts in SSC CGL.'
  },
  {
    id: 'cgl_l6',
    exam: 'SSC CGL',
    postName: 'Assistant / Section Officer, Divisional Accountant, SI NIA, Sub-Inspector Narcotics',
    level: 6,
    basicPay: 35400,
    group: 'Group B',
    description: 'Executive positions in central departments.'
  },
  {
    id: 'cgl_l5',
    exam: 'SSC CGL',
    postName: 'Auditor (CAG / CGDA / CGA), Senior Accountant / Junior Accountant',
    level: 5,
    basicPay: 29200,
    group: 'Group C',
    description: 'Accounting & Auditing cadres.'
  },
  {
    id: 'cgl_l4',
    exam: 'SSC CGL',
    postName: 'Tax Assistant (CBDT & CBIC), Upper Division Clerk (UDC) / SSA',
    level: 4,
    basicPay: 25500,
    group: 'Group C',
    description: 'Ministerial & clerical entry in CGL.'
  },
  {
    id: 'chsl_l4',
    exam: 'SSC CHSL',
    postName: 'Data Entry Operator (DEO) Grade A / PA / SA',
    level: 4,
    basicPay: 25500,
    group: 'Group C',
    description: 'Higher technical band in CHSL.'
  },
  {
    id: 'chsl_l2',
    exam: 'SSC CHSL',
    postName: 'Lower Division Clerk (LDC) / Junior Secretariat Assistant (JSA)',
    level: 2,
    basicPay: 19900,
    group: 'Group C',
    description: 'General clerical cadre across Ministries.'
  },
  {
    id: 'mts_l1',
    exam: 'SSC MTS',
    postName: 'Multi-Tasking Staff (MTS) & Havaldar (CBIC/CBN)',
    level: 1,
    basicPay: 18000,
    group: 'Group C',
    description: 'Central government entry-level staff.'
  },
  {
    id: 'rrb_l6',
    exam: 'Railways RRB NTPC',
    postName: 'Station Master (SM), Commercial Apprentice (CA)',
    level: 6,
    basicPay: 35400,
    group: 'Group C',
    description: 'Key operational cadre in Indian Railways.'
  },
  {
    id: 'rrb_l5',
    exam: 'Railways RRB NTPC',
    postName: 'Goods Guard / Train Manager, Senior Commercial Clerk, Senior Clerk cum Typist',
    level: 5,
    basicPay: 29200,
    group: 'Group C',
    description: 'Running staff enjoy additional mileage/running allowances.'
  },
  {
    id: 'rrb_alp',
    exam: 'Railways RRB ALP',
    postName: 'Assistant Loco Pilot (ALP)',
    level: 2,
    basicPay: 19900,
    runningAllowance: 12000,
    group: 'Group C (Running)',
    description: 'Basic pay + attractive Kilometre Running Allowance (KMA).'
  },
  {
    id: 'rrb_group_d',
    exam: 'Railways RRB Group D',
    postName: 'Track Maintainer Grade IV, Pointsman, Assistant (Workshop/Signal)',
    level: 1,
    basicPay: 18000,
    group: 'Level 1',
    description: 'Risk & Hardship allowance of ₹2,700/mo applies for Track Maintainers.'
  },
  {
    id: 'upsc_ias',
    exam: 'UPSC Civil Services',
    postName: 'IAS / IPS / IRS / IFS Officer (Junior Time Scale / Assistant Secretary / ASP)',
    level: 10,
    basicPay: 56100,
    group: 'Group A (All India Services)',
    description: 'Premier civil services entry scale.'
  },
  {
    id: 'capf_si',
    exam: 'SSC CPO / CAPF',
    postName: 'Sub-Inspector in Delhi Police, CISF, BSF, CRPF, ITBP, SSB',
    level: 6,
    basicPay: 35400,
    rationMoney: 3965,
    group: 'Group B (Non-Gazetted)',
    description: 'Plus Ration Money Allowance (~₹3,965/mo) and Hardship Allowance where posted.'
  },
  {
    id: 'ibps_po',
    exam: 'Banking (IBPS / SBI PO)',
    postName: 'Probationary Officer / Assistant Manager (Scale I - 12th BPS Revision)',
    isBanking: true,
    basicPay: 48480,
    specialAllowanceRate: 0.265, // 26.5% of basic
    daRate: 0.17, // ~17% banking DA index
    learningAllowance: 850,
    group: 'Scale I Officer',
    description: 'Based on 12th Bipartite Settlement with attractive leased accommodation.'
  },
  {
    id: 'ibps_clerk',
    exam: 'Banking (IBPS / SBI Clerk)',
    postName: 'Junior Associate / Customer Service Associate (12th BPS Revision)',
    isBanking: true,
    basicPay: 26730,
    specialAllowanceRate: 0.265,
    daRate: 0.17,
    group: 'Clerical Cadre',
    description: 'Bank clerical entry salary under 12th BPS revision.'
  }
];

export const MARKING_PRESETS = [
  {
    id: 'ssc_cgl_t1',
    name: 'SSC CGL Tier 1',
    category: 'SSC',
    totalQuestions: 100,
    marksPerCorrect: 2.0,
    negativePerWrong: 0.5,
    durationMinutes: 60,
    maxMarks: 200,
    notes: '25 Qs each in Reasoning, GA, Quant, English. 0.50 negative mark per wrong answer (1/4th penalty).'
  },
  {
    id: 'ssc_cgl_t2',
    name: 'SSC CGL Tier 2 (Paper 1)',
    category: 'SSC',
    totalQuestions: 130,
    marksPerCorrect: 3.0,
    negativePerWrong: 1.0,
    durationMinutes: 135,
    maxMarks: 390,
    notes: 'Section 1 (60 Qs) + Section 2 (70 Qs). Penalty of 1 mark for each wrong answer (1/3rd penalty).'
  },
  {
    id: 'ssc_chsl_t1',
    name: 'SSC CHSL Tier 1',
    category: 'SSC',
    totalQuestions: 100,
    marksPerCorrect: 2.0,
    negativePerWrong: 0.5,
    durationMinutes: 60,
    maxMarks: 200,
    notes: '100 questions, 200 marks, -0.50 negative marking.'
  },
  {
    id: 'ssc_gd',
    name: 'SSC GD Constable',
    category: 'SSC',
    totalQuestions: 80,
    marksPerCorrect: 2.0,
    negativePerWrong: 0.25,
    durationMinutes: 60,
    maxMarks: 160,
    notes: '80 questions, 160 marks, 0.25 negative marks (or 0.50 as per latest corrigendum).'
  },
  {
    id: 'upsc_gs1',
    name: 'UPSC CSE Prelims (Paper 1 - GS)',
    category: 'UPSC',
    totalQuestions: 100,
    marksPerCorrect: 2.0,
    negativePerWrong: 0.6666,
    durationMinutes: 120,
    maxMarks: 200,
    notes: '100 Qs, +2 for correct, -0.66 (1/3rd penalty) for incorrect.'
  },
  {
    id: 'upsc_csat',
    name: 'UPSC CSE Prelims (Paper 2 - CSAT)',
    category: 'UPSC',
    totalQuestions: 80,
    marksPerCorrect: 2.5,
    negativePerWrong: 0.8333,
    durationMinutes: 120,
    maxMarks: 200,
    notes: '80 Qs, +2.5 for correct, -0.833 for incorrect. Qualifying paper (min 33% = 66 marks required).'
  },
  {
    id: 'rrb_ntpc',
    name: 'Railways RRB NTPC CBT 1',
    category: 'Railways',
    totalQuestions: 100,
    marksPerCorrect: 1.0,
    negativePerWrong: 0.3333,
    durationMinutes: 90,
    maxMarks: 100,
    notes: '100 Qs, +1 per correct, 1/3rd (-0.33) deducted for each wrong answer.'
  },
  {
    id: 'rrb_ntpc_cbt2',
    name: 'Railways RRB NTPC CBT 2',
    category: 'Railways',
    totalQuestions: 120,
    marksPerCorrect: 1.0,
    negativePerWrong: 0.3333,
    durationMinutes: 90,
    maxMarks: 120,
    notes: '120 Qs in 90 minutes. 1/3rd negative marking.'
  },
  {
    id: 'rrb_group_d',
    name: 'Railways RRB Group D CBT',
    category: 'Railways',
    totalQuestions: 100,
    marksPerCorrect: 1.0,
    negativePerWrong: 0.3333,
    durationMinutes: 90,
    maxMarks: 100,
    notes: '100 Qs, 1/3rd negative marking.'
  },
  {
    id: 'ibps_prelims',
    name: 'IBPS / SBI PO & Clerk Prelims',
    category: 'Banking',
    totalQuestions: 100,
    marksPerCorrect: 1.0,
    negativePerWrong: 0.25,
    durationMinutes: 60,
    maxMarks: 100,
    notes: '100 Qs (Eng 30, Quant 35, Reas 35). 1/4th (-0.25) negative marking.'
  },
  {
    id: 'custom_marking',
    name: 'Custom Marking Scheme',
    category: 'Custom',
    totalQuestions: 100,
    marksPerCorrect: 1.0,
    negativePerWrong: 0.25,
    durationMinutes: 60,
    maxMarks: 100,
    notes: 'Enter your custom exam marking parameters.'
  }
];

export const UPCOMING_EXAMS = [
  {
    id: 'ssc_cgl_2026',
    name: 'SSC CGL 2026 Tier 1',
    category: 'SSC',
    stage: 'Tier-1 CBT',
    examDate: '2026-09-15T09:00:00',
    admitCardDate: '2026-09-08T10:00:00',
    resultExpectedDate: '2026-11-20T18:00:00',
    officialUrl: 'https://ssc.gov.in',
    description: 'Combined Graduate Level Examination for Group B & C posts.'
  },
  {
    id: 'ssc_chsl_2026',
    name: 'SSC CHSL 2026 Tier 1',
    category: 'SSC',
    stage: 'Tier-1 CBT',
    examDate: '2026-10-12T09:00:00',
    admitCardDate: '2026-10-05T10:00:00',
    resultExpectedDate: '2026-12-15T18:00:00',
    officialUrl: 'https://ssc.gov.in',
    description: 'Combined Higher Secondary Level (10+2) Examination for LDC/JSA/DEO.'
  },
  {
    id: 'upsc_cse_2027',
    name: 'UPSC Civil Services Prelims 2027',
    category: 'UPSC',
    stage: 'Prelims (GS + CSAT)',
    examDate: '2027-05-23T09:30:00',
    admitCardDate: '2027-05-05T10:00:00',
    resultExpectedDate: '2027-06-25T18:00:00',
    officialUrl: 'https://upsc.gov.in',
    description: 'Civil Services (Preliminary) Examination for IAS, IPS, IFS & Central Services.'
  },
  {
    id: 'rrb_ntpc_2026',
    name: 'RRB NTPC 2026 CBT 1',
    category: 'Railways',
    stage: 'CBT Stage 1',
    examDate: '2026-11-05T09:00:00',
    admitCardDate: '2026-11-01T10:00:00',
    resultExpectedDate: '2027-01-10T18:00:00',
    officialUrl: 'https://indianrailways.gov.in',
    description: 'Non-Technical Popular Categories for Station Master, Goods Guard, etc.'
  },
  {
    id: 'ibps_po_2026',
    name: 'IBPS PO Prelims 2026',
    category: 'Banking',
    stage: 'Prelims Online Exam',
    examDate: '2026-10-18T08:30:00',
    admitCardDate: '2026-10-08T10:00:00',
    resultExpectedDate: '2026-11-15T18:00:00',
    officialUrl: 'https://ibps.in',
    description: 'Common Recruitment Process for Probationary Officers in Participating Banks.'
  },
  {
    id: 'sbi_po_2026',
    name: 'SBI PO Prelims 2026',
    category: 'Banking',
    stage: 'Phase-I Prelims',
    examDate: '2026-11-28T08:30:00',
    admitCardDate: '2026-11-18T10:00:00',
    resultExpectedDate: '2026-12-28T18:00:00',
    officialUrl: 'https://sbi.co.in/careers',
    description: 'State Bank of India Probationary Officer recruitment.'
  },
  {
    id: 'ssc_cpo_2026',
    name: 'SSC CPO 2026 Paper 1',
    category: 'SSC / Defence',
    stage: 'Paper-1 CBT',
    examDate: '2026-10-25T09:00:00',
    admitCardDate: '2026-10-18T10:00:00',
    resultExpectedDate: '2026-12-10T18:00:00',
    officialUrl: 'https://ssc.gov.in',
    description: 'Sub-Inspectors in Delhi Police and Central Armed Police Forces (CAPFs).'
  }
];
