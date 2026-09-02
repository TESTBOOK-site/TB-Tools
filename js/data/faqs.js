// Testbook Govt Exam Tools - Comprehensive Tool FAQs

export const TOOL_FAQS = {
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
