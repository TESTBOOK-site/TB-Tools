// Testbook Govt Exam Tools - Unified Standalone Bundle
// Ensures 100% functionality whether loaded via http:// server or opened directly via file:/// protocol.

(function() {
  'use strict';

  // --- 1. DATA: EXAM PRESETS ---
  const PHOTO_PRESETS = [
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

  const SIGNATURE_PRESETS = [
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

  const EXAM_AGE_RULES = [
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

  const CATEGORY_RELAXATIONS = [
    { id: 'ur', name: 'General / Unreserved (UR)', relaxationYears: 0, description: 'No age relaxation applicable' },
    { id: 'obc', name: 'OBC (Non-Creamy Layer)', relaxationYears: 3, description: '+3 Years over upper age limit' },
    { id: 'sc_st', name: 'SC / ST', relaxationYears: 5, description: '+5 Years over upper age limit' },
    { id: 'ews', name: 'EWS (Economically Weaker Section)', relaxationYears: 0, description: 'No general age relaxation (fee/seat reservation applies)' },
    { id: 'pwd_ur', name: 'PwBD / PwD (General / EWS)', relaxationYears: 10, description: '+10 Years relaxation' },
    { id: 'pwd_obc', name: 'PwBD / PwD (OBC-NCL)', relaxationYears: 13, description: '+13 Years relaxation (10 PwD + 3 OBC)' },
    { id: 'pwd_sc_st', name: 'PwBD / PwD (SC / ST)', relaxationYears: 15, description: '+15 Years relaxation (10 PwD + 5 SC/ST)' },
    { id: 'esm', name: 'Ex-Servicemen (ESM)', relaxationYears: 3, description: 'Military service rendered + 3 years (subject to exam rules)' }
  ];

  const SALARY_PRESETS = [
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
      specialAllowanceRate: 0.265,
      daRate: 0.17,
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

  const MARKING_PRESETS = [
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

  const UPCOMING_EXAMS = [
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

  // --- 2. DATA: FAQS ---
  const TOOL_FAQS = {
    age_calculator: [
      {
        q: 'What is the standard cutoff date for age eligibility in SSC and UPSC exams?',
        a: 'For exams whose notification is released in the first half of the year (Jan-Jun), the cutoff date is typically 1st January of that exam year. For notifications released in the second half of the year (Jul-Dec), commissions usually fix 1st August as the critical cutoff date. However, always verify the exact date from the official notification.'
      },
      {
        q: 'Does EWS category get age relaxation in SSC or UPSC?',
        a: 'No. As per Government of India guidelines, EWS (Economically Weaker Section) candidates are entitled to a 10% reservation in vacancies and relaxation in application fees/cutoffs, but there is NO age relaxation for EWS candidates. The upper age limit for EWS is identical to the General (Unreserved) category.'
      },
      {
        q: 'Which document is considered valid proof of Date of Birth (DOB) during Document Verification (DV)?',
        a: 'The Date of Birth recorded in your Matriculation / Secondary Examination Certificate (10th Board Certificate) or equivalent recognized certificate is treated as final proof. Birth certificates, Aadhaar cards, or affidavits are not accepted in lieu of the 10th marksheet by SSC/UPSC/RRB.'
      },
      {
        q: 'Can OBC candidates avail both OBC age relaxation and PwD age relaxation simultaneously?',
        a: 'Yes. PwBD candidates belonging to the OBC category receive a cumulative relaxation of 13 years (10 years for PwD + 3 years for OBC). Similarly, PwBD candidates from SC/ST categories receive 15 years (10 + 5 years).'
      }
    ],
    photo_resizer: [
      {
        q: 'Why do government exam portals reject uploaded passport photographs?',
        a: 'Common reasons for photo rejection include: (1) File size outside the mandated range (e.g. less than 20KB or greater than 50KB), (2) Wearing caps, hats, or dark/tinted spectacles, (3) Background is dark, patterned, or not plain white/light, (4) Blurry, low-resolution, or skewed selfie photo, (5) Missing Date of Photo (DOP) banner when explicitly required.'
      },
      {
        q: 'Is spectacles allowed in SSC and UPSC photo uploads?',
        a: 'SSC strictly prohibits spectacles/glasses in application photographs. If you wear glasses, take them off for the application photograph, as glare on lenses or frames covering the eyes is the #1 reason for automatic software rejection.'
      },
      {
        q: 'What is Date of Photo (DOP) and how should it be written?',
        a: 'Certain notifications (such as UPSC or specific SSC exams) mandate that the photograph must not be older than 10 days from the date of online application, and should clearly display the candidate’s name and the date on which the photograph was taken printed in clear text at the bottom. Our tool has a built-in toggle to add this banner automatically.'
      },
      {
        q: 'Are my uploaded photos sent to any server or stored anywhere?',
        a: 'Absolutely not! Our tool operates 100% inside your web browser using the HTML5 Canvas API. Your photos never leave your phone or computer, ensuring total privacy and data security.'
      }
    ],
    signature_crop: [
      {
        q: 'Why was my signature rejected for having CAPITAL / BLOCK letters?',
        a: 'All major exam bodies (SSC, IBPS, SBI, RRB, UPSC) explicitly state that signatures written entirely in CAPITAL or BLOCK letters are invalid and will result in instant cancellation of candidature. A valid signature must be in running, cursive handwriting.'
      },
      {
        q: 'Should I sign with a Blue pen or a Black pen?',
        a: 'Most government exam portals (especially IBPS, SBI, and SSC) specifically request a signature using a BLACK ink pen on clear white paper. Black ink provides superior contrast when scanned and downsampled to low resolutions (140x60px).'
      },
      {
        q: 'How does the Auto-Enhance / Background Shadow Cleanup feature work?',
        a: 'When you take a photo of your signature with a smartphone, shadows and ambient room lighting often make the white paper appear grey or yellow. Our tool applies an automatic contrast-threshold filter that turns grey background paper pure white and makes the ink dark and sharp for 100% portal acceptance.'
      }
    ],
    pdf_compressor: [
      {
        q: 'What is the maximum allowed PDF file size for caste and educational certificates?',
        a: 'Most government exam portals (SSC, State PSCs, RRB) set document upload limits between 100 KB and 300 KB per certificate. Uploading files larger than this threshold triggers an error on the portal.'
      },
      {
        q: 'Will compressing my certificate PDF make the text unreadable for Document Verification?',
        a: 'Our client-side compression algorithm intelligently re-encodes embedded images and optimizes internal streams while preserving vector text and key details. Always open and review the downloaded compressed PDF to ensure your roll number, marks, and official stamp are clearly legible.'
      },
      {
        q: 'Can I compress a password-protected PDF document?',
        a: 'For security reasons, please remove password protection or save an unlocked copy of your PDF (e.g. Print to PDF in your browser) before compressing it.'
      }
    ],
    image_to_pdf: [
      {
        q: 'How do I combine multi-semester marksheets into a single PDF for document upload?',
        a: 'Select or drag all your semester marksheet photos into our Image to PDF Converter, drag the preview tiles into chronological order (Semester 1 to Semester 8), choose "A4" page size, and click "Generate PDF". The tool compiles them into a single ordered PDF in seconds.'
      },
      {
        q: 'How can I combine Aadhaar Card Front and Back into one page?',
        a: 'You can upload both front and back photos, or arrange multiple certificates. The tool lets you organize pages with standard margins and auto-orientation for clean printing.'
      }
    ],
    pdf_merge_split: [
      {
        q: 'Can I extract only the syllabus pages from a 150-page exam notification PDF?',
        a: 'Yes! Use the Split mode, upload the large notification PDF, and enter the specific page range (e.g. "12-18, 24"). The tool will extract only those specific pages and generate a lightweight new PDF.'
      },
      {
        q: 'Can I merge my Admit Card with the COVID / Self-Declaration slip?',
        a: 'Yes! Upload both files in Merge mode, ensure the Admit Card is first, and click "Merge PDFs" to get a combined single file ready for printing or submission.'
      }
    ],
    salary_calculator: [
      {
        q: 'What is the difference between X, Y, and Z class cities for HRA?',
        a: 'Cities are classified by population under 7th Central Pay Commission: Class X (population 50 Lakhs+: Delhi, Mumbai, Kolkata, Chennai, Bengaluru, Hyderabad, Pune, Ahmedabad) receives 30% HRA; Class Y (population 5 to 50 Lakhs: Jaipur, Lucknow, Patna, Bhopal, etc.) receives 20% HRA; Class Z (rural areas & small towns with population <5 Lakhs) receives 10% HRA.'
      },
      {
        q: 'Why did HRA rates increase from 27/18/9% to 30/20/10%?',
        a: 'As recommended by the 7th CPC, when Dearness Allowance (DA) crossed 50%, the House Rent Allowance (HRA) automatically revised upward from 27%/18%/9% to 30%/20%/10% across X, Y, and Z category cities respectively.'
      },
      {
        q: 'How is the NPS (National Pension System) deduction calculated?',
        a: 'The employee contributes 10% of (Basic Pay + DA) monthly. The Central Government contributes an additional 14% of (Basic Pay + DA) to the employee’s PRAN account. This 14% is over and above your gross pay.'
      },
      {
        q: 'Is this in-hand salary estimate 100% exact?',
        a: 'The calculator provides a realistic estimate based on 7th CPC pay matrices, prevailing DA rates, and standard deductions. Actual salary slips may vary slightly due to state-specific Professional Tax, individual Income Tax slab deductions (New vs Old tax regime), and department-specific allowances (e.g., uniform, mobile, newspaper allowance).'
      }
    ],
    negative_marking: [
      {
        q: 'What is the difference between 1/3rd and 1/4th negative marking?',
        a: 'In a 1/4th scheme (like SSC CGL Tier 1 or IBPS), for every 4 wrong answers, you lose the marks equivalent to 1 correct answer (e.g., +2 for correct, -0.50 for wrong). In a 1/3rd scheme (like RRB or UPSC CSE), for every 3 wrong answers you lose the marks of 1 correct answer (e.g., +2 for correct, -0.66 for wrong). 1/3rd penalty is significantly more punishing.'
      },
      {
        q: 'Is it mathematically beneficial to make educated guesses in Prelims exams?',
        a: 'If you can eliminate at least 2 options out of 4 (leaving a 50% probability), the mathematical expected value is positive in both 1/4th and 1/3rd marking schemes. However, blind random guessing with all 4 options open has an expected value of zero or negative and should be avoided.'
      }
    ],
    normalization_score: [
      {
        q: 'Why is normalization necessary in SSC and RRB exams?',
        a: 'When an exam is conducted across multiple shifts and dates with different question papers, the difficulty level varies naturally. Normalization uses a statistical formula based on shift averages and standard deviations to adjust candidate scores to an equal footing.'
      },
      {
        q: 'Can a candidate’s normalized score be higher than the maximum marks of the exam?',
        a: 'Yes! Under the formula used by SSC and RRB, candidates in tough shifts who score very high relative to their shift average can have their normalized score exceed the theoretical maximum marks (e.g. 202/200 in past SSC CGL Tier 1 results).'
      },
      {
        q: 'Does attempting fewer questions with 100% accuracy boost normalized score?',
        a: 'No. The official commission normalization formula relies strictly on raw scores, shift mean, and standard deviation. Individual candidate accuracy percentage is NOT an input in the formula.'
      }
    ],
    cgpa_converter: [
      {
        q: 'What formula does SSC and UPSC accept for CBSE 10th CGPA to percentage conversion?',
        a: 'The official CBSE formula is: Percentage (%) = CGPA × 9.5. For example, a CGPA of 8.4 equals 8.4 × 9.5 = 79.8%.'
      },
      {
        q: 'How do I convert engineering/university CGPA if no formula is printed on my marksheet?',
        a: 'Most Indian universities and AICTE guidelines specify: Percentage (%) = (CGPA - 0.75) × 10 or simply CGPA × 10 for pure 10-point scales. Always obtain and preserve the official conversion certificate from your university registrar for Document Verification.'
      }
    ],
    dpi_calculator: [
      {
        q: 'What is DPI and why do govt exam portals ask for 200 DPI scans?',
        a: 'DPI stands for Dots Per Inch. It measures the scanning resolution. A 200 DPI scan of a document (like an A4 marksheet or caste certificate) strikes the perfect balance between crisp legible text and a small file size (under 200-300 KB).'
      },
      {
        q: 'How do I calculate pixel dimensions from physical cm/inch requirements?',
        a: 'The formula is: Pixels = (Centimeters / 2.54) × DPI. For example, a 3.5cm wide photo at 200 DPI is (3.5 / 2.54) × 200 ≈ 276 pixels.'
      }
    ],
    exam_countdown: [
      {
        q: 'When are admit cards generally released before the exam date?',
        a: 'SSC typically releases exam city intimation slips 10-12 days prior, and downloadable Admit Cards with exam center details 3-4 days before the candidate’s exam date. UPSC releases e-Admit Cards 3 weeks prior, while IBPS/SBI releases them 7-10 days before the exam.'
      },
      {
        q: 'Are my customized exam dates saved if I close the browser tab?',
        a: 'Yes! All your tracked exams and custom countdowns are automatically saved in your browser’s local storage on your device. When you return to the page, your personalized timers are instantly restored.'
      }
    ]
  };

  // Expose to window for tool renderers
  window.TB_DATA = {
    PHOTO_PRESETS,
    SIGNATURE_PRESETS,
    EXAM_AGE_RULES,
    CATEGORY_RELAXATIONS,
    SALARY_PRESETS,
    MARKING_PRESETS,
    UPCOMING_EXAMS,
    TOOL_FAQS
  };

})();
