// Testbook Govt Exam Tools - Master Standalone Application Bundle
// Includes all 12 tools, presets, FAQs, and Router in a single fast, zero-dependency script.

(function() {
  'use strict';

  // Check if TB_DATA is ready, otherwise define inline
  const DATA = window.TB_DATA || {};
  const PHOTO_PRESETS = DATA.PHOTO_PRESETS || [];
  const SIGNATURE_PRESETS = DATA.SIGNATURE_PRESETS || [];
  const EXAM_AGE_RULES = DATA.EXAM_AGE_RULES || [];
  const CATEGORY_RELAXATIONS = DATA.CATEGORY_RELAXATIONS || [];
  const SALARY_PRESETS = DATA.SALARY_PRESETS || [];
  const MARKING_PRESETS = DATA.MARKING_PRESETS || [];
  const UPCOMING_EXAMS = DATA.UPCOMING_EXAMS || [];
  const TOOL_FAQS = DATA.TOOL_FAQS || {};

  // --- TOOL 1: AGE CALCULATOR ---
  function renderAgeCalculator(container) {
    const todayStr = new Date().toISOString().split('T')[0];

    container.innerHTML = `
      <div class="tool-card">
        <div class="tool-header">
          <div class="tool-icon-badge">📅</div>
          <div>
            <h2 class="tool-title">Govt Exam Age Calculator & Eligibility Checker</h2>
            <p class="tool-subtitle">Calculate your exact age on any official cutoff date and check category-wise eligibility across SSC, UPSC, RRB, IBPS, and State PSCs with transparent relaxation rules.</p>
          </div>
        </div>

        <div class="privacy-callout">
          <span class="lock-icon">🔒</span>
          <span><strong>100% In-Browser Calculation:</strong> Your Date of Birth and personal details are computed locally on your device and never uploaded to any server.</span>
        </div>

        <div class="tool-grid-2col">
          <div class="form-panel">
            <h3 class="panel-heading">1. Enter Your Details</h3>
            
            <div class="form-group">
              <label class="form-label" for="dob-input">Date of Birth (as in 10th Marksheet) <span class="required">*</span></label>
              <input type="date" id="dob-input" class="form-control" value="2000-06-15" max="${todayStr}" />
            </div>

            <div class="form-group">
              <div class="label-with-action">
                <label class="form-label" for="cutoff-date-input">Age As-On (Cutoff Date) <span class="required">*</span></label>
                <div class="quick-tags">
                  <button type="button" class="tag-btn" data-cutoff="2026-08-01">01-Aug-2026 (SSC/UPSC)</button>
                  <button type="button" class="tag-btn" data-cutoff="2026-01-01">01-Jan-2026</button>
                  <button type="button" class="tag-btn" data-cutoff="${todayStr}">Today</button>
                </div>
              </div>
              <input type="date" id="cutoff-date-input" class="form-control" value="2026-08-01" />
            </div>

            <div class="form-group">
              <label class="form-label" for="category-select">Reservation Category <span class="required">*</span></label>
              <select id="category-select" class="form-control">
                ${CATEGORY_RELAXATIONS.map(cat => `
                  <option value="${cat.id}">${cat.name} (${cat.relaxationYears > 0 ? '+' + cat.relaxationYears + ' Yrs' : 'No relaxation'})</option>
                `).join('')}
              </select>
              <small class="form-helper" id="category-desc">Standard unreserved age criteria applies.</small>
            </div>

            <button id="calculate-age-btn" class="btn btn-primary btn-block">
              <span>⚡ Calculate Age & Check Eligibility</span>
            </button>
          </div>

          <div class="results-panel">
            <h3 class="panel-heading">2. Calculated Age Summary</h3>
            
            <div class="age-display-card">
              <div class="age-main-metric">
                <div class="metric-box">
                  <span class="metric-val" id="res-years">26</span>
                  <span class="metric-label">Years</span>
                </div>
                <span class="metric-divider">:</span>
                <div class="metric-box">
                  <span class="metric-val" id="res-months">1</span>
                  <span class="metric-label">Months</span>
                </div>
                <span class="metric-divider">:</span>
                <div class="metric-box">
                  <span class="metric-val" id="res-days">17</span>
                  <span class="metric-label">Days</span>
                </div>
              </div>
              
              <p class="age-text-summary" id="age-full-text">Your exact age on <strong>01 August 2026</strong> is <strong>26 Years, 1 Month, and 17 Days</strong>.</p>
            </div>

            <div class="stats-mini-grid">
              <div class="mini-stat-card">
                <span class="mini-stat-label">Total Days Lived</span>
                <span class="mini-stat-value" id="stat-total-days">-</span>
              </div>
              <div class="mini-stat-card">
                <span class="mini-stat-label">Total Months Lived</span>
                <span class="mini-stat-value" id="stat-total-months">-</span>
              </div>
              <div class="mini-stat-card">
                <span class="mini-stat-label">Day of Birth</span>
                <span class="mini-stat-value" id="stat-birth-day">-</span>
              </div>
              <div class="mini-stat-card">
                <span class="mini-stat-label">Next Birthday</span>
                <span class="mini-stat-value" id="stat-next-bday">-</span>
              </div>
            </div>
          </div>
        </div>

        <div class="eligibility-section">
          <div class="eligibility-header">
            <div>
              <h3 class="section-title">3. Govt Exam Eligibility Matrix</h3>
              <p class="section-subtitle">Showing status based on your category relaxation transparently added to standard age limits.</p>
            </div>
            <div class="filter-pills" id="exam-filter-pills">
              <button class="pill-btn active" data-filter="all">All Exams</button>
              <button class="pill-btn" data-filter="SSC">SSC</button>
              <button class="pill-btn" data-filter="UPSC">UPSC</button>
              <button class="pill-btn" data-filter="Railways">Railways/RRB</button>
              <button class="pill-btn" data-filter="Banking">Banking</button>
              <button class="pill-btn" data-filter="State">State PSC</button>
            </div>
          </div>

          <div class="table-responsive">
            <table class="data-table" id="eligibility-table">
              <thead>
                <tr>
                  <th>Exam & Posts</th>
                  <th>Standard Age</th>
                  <th>Your Relaxation</th>
                  <th>Effective Range</th>
                  <th>Status for You</th>
                </tr>
              </thead>
              <tbody id="eligibility-tbody"></tbody>
            </table>
          </div>

          <div class="disclaimer-note">
            ⚠️ <strong>Official Verification Reminder:</strong> Age limits, cutoff dates (1st Jan vs 1st Aug), and relaxation rules are illustrative based on standard commission patterns. Some specific posts (e.g. Sub-Inspector, Police, Aviator) have custom age bands. Always confirm against the latest official recruitment notification before applying.
          </div>
        </div>
      </div>
    `;

    const dobInput = container.querySelector('#dob-input');
    const cutoffInput = container.querySelector('#cutoff-date-input');
    const categorySelect = container.querySelector('#category-select');
    const categoryDesc = container.querySelector('#category-desc');
    const calcBtn = container.querySelector('#calculate-age-btn');
    const tagBtns = container.querySelectorAll('.tag-btn');
    const filterPills = container.querySelectorAll('#exam-filter-pills .pill-btn');

    let activeFilter = 'all';

    tagBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        cutoffInput.value = btn.dataset.cutoff;
        calculateAndRender();
      });
    });

    categorySelect.addEventListener('change', () => {
      const selectedCat = CATEGORY_RELAXATIONS.find(c => c.id === categorySelect.value);
      if (selectedCat) categoryDesc.textContent = selectedCat.description;
      calculateAndRender();
    });

    calcBtn.addEventListener('click', calculateAndRender);
    dobInput.addEventListener('change', calculateAndRender);
    cutoffInput.addEventListener('change', calculateAndRender);

    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeFilter = pill.dataset.filter;
        renderEligibilityRows(calculateAgeDetails(dobInput.value, cutoffInput.value), categorySelect.value);
      });
    });

    function calculateAgeDetails(dobStr, cutoffStr) {
      if (!dobStr || !cutoffStr) return null;
      const dob = new Date(dobStr + 'T00:00:00');
      const cutoff = new Date(cutoffStr + 'T00:00:00');

      if (isNaN(dob.getTime()) || isNaN(cutoff.getTime())) return null;
      if (dob > cutoff) return { error: 'Date of birth cannot be after cutoff date.' };

      let years = cutoff.getFullYear() - dob.getFullYear();
      let months = cutoff.getMonth() - dob.getMonth();
      let days = cutoff.getDate() - dob.getDate();

      if (days < 0) {
        months--;
        const prevMonth = new Date(cutoff.getFullYear(), cutoff.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) {
        years--;
        months += 12;
      }

      const diffTime = Math.abs(cutoff - dob);
      const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const totalMonths = (years * 12) + months;
      const decimalAge = years + (months / 12) + (days / 365.25);

      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const birthDayName = daysOfWeek[dob.getDay()];

      let nextBday = new Date(cutoff.getFullYear(), dob.getMonth(), dob.getDate());
      if (nextBday < cutoff) nextBday.setFullYear(cutoff.getFullYear() + 1);
      const daysToNextBday = Math.ceil((nextBday - cutoff) / (1000 * 60 * 60 * 24));

      return {
        years, months, days, totalDays, totalMonths, decimalAge, birthDayName, daysToNextBday,
        cutoffFormatted: cutoff.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
      };
    }

    function calculateAndRender() {
      const res = calculateAgeDetails(dobInput.value, cutoffInput.value);
      if (!res || res.error) {
        alert(res ? res.error : 'Please enter valid dates');
        return;
      }

      container.querySelector('#res-years').textContent = res.years;
      container.querySelector('#res-months').textContent = res.months;
      container.querySelector('#res-days').textContent = res.days;
      container.querySelector('#age-full-text').innerHTML = `Your exact age on <strong>${res.cutoffFormatted}</strong> is <strong>${res.years} Years, ${res.months} Month${res.months === 1 ? '' : 's'}, and ${res.days} Day${res.days === 1 ? '' : 's'}</strong>.`;

      container.querySelector('#stat-total-days').textContent = res.totalDays.toLocaleString('en-IN') + ' Days';
      container.querySelector('#stat-total-months').textContent = res.totalMonths + ' Months';
      container.querySelector('#stat-birth-day').textContent = res.birthDayName;
      container.querySelector('#stat-next-bday').textContent = res.daysToNextBday === 0 ? 'Today! 🎉' : `In ${res.daysToNextBday} Days`;

      renderEligibilityRows(res, categorySelect.value);
    }

    function renderEligibilityRows(ageRes, catId) {
      if (!ageRes) return;
      const tbody = container.querySelector('#eligibility-tbody');
      const selectedCat = CATEGORY_RELAXATIONS.find(c => c.id === catId) || CATEGORY_RELAXATIONS[0];
      const relaxationYears = selectedCat.relaxationYears;

      let filtered = EXAM_AGE_RULES;
      if (activeFilter !== 'all') {
        filtered = EXAM_AGE_RULES.filter(e => {
          if (activeFilter === 'SSC') return e.id.startsWith('ssc');
          if (activeFilter === 'UPSC') return e.id.startsWith('upsc');
          if (activeFilter === 'Railways') return e.id.startsWith('rrb');
          if (activeFilter === 'Banking') return e.id.startsWith('ibps');
          if (activeFilter === 'State') return e.id.startsWith('state');
          return true;
        });
      }

      tbody.innerHTML = filtered.map(rule => {
        const isDefence = rule.id === 'upsc_nda' || rule.id === 'upsc_cds';
        const effRel = isDefence ? 0 : relaxationYears;
        const effMax = rule.maxAge + effRel;
        const effMin = rule.minAge;

        let statusHtml = '';
        if (ageRes.decimalAge < effMin) {
          const diffMos = Math.round((effMin - ageRes.decimalAge) * 12);
          statusHtml = `<span class="badge badge-warning">⏳ Under-age (~${diffMos} mos)</span>`;
        } else if (ageRes.decimalAge > effMax) {
          const over = (ageRes.decimalAge - effMax).toFixed(1);
          statusHtml = `<span class="badge badge-danger">❌ Over-age (${over} yrs)</span>`;
        } else {
          statusHtml = `<span class="badge badge-success">✓ Eligible</span>`;
        }

        return `
          <tr>
            <td>
              <strong>${rule.exam}</strong>
              <div class="text-muted text-xs">${rule.postCategory}</div>
              <div class="text-muted text-xs">${rule.subLimits}</div>
            </td>
            <td>${rule.minAge} – ${rule.maxAge} Yrs</td>
            <td><span class="pill-tag ${effRel > 0 ? 'pill-green' : ''}">${isDefence && relaxationYears > 0 ? 'None (Defence rule)' : (effRel > 0 ? `+${effRel} Yrs` : '0 Yrs')}</span></td>
            <td><strong>${effMin} – ${effMax} Yrs</strong></td>
            <td>${statusHtml}</td>
          </tr>
        `;
      }).join('');
    }

    calculateAndRender();
  }

  // --- TOOL REGISTRY ---
  const TOOLS_REGISTRY = [
    {
      id: 'age-calculator',
      title: 'Age Calculator & Eligibility',
      icon: '📅',
      category: 'eligibility',
      categoryName: 'Eligibility & Pay',
      desc: 'Calculate exact age on exam cutoff date (1st Jan/Aug) and check category relaxation (OBC, SC/ST, PwD) across SSC, UPSC, RRB, IBPS.',
      badge: 'Category-Wise',
      render: renderAgeCalculator,
      faqKey: 'age_calculator'
    },
    {
      id: 'photo-resizer',
      title: 'Passport Photo Resizer',
      icon: '📷',
      category: 'photo-pdf',
      categoryName: 'Photo & PDF Tools',
      desc: 'Auto-crop and compress photograph to exact 20KB - 50KB range with Date of Photo (DOP) banner for SSC, UPSC, RRB, IBPS.',
      badge: '20KB - 50KB Auto-Lock',
      render: (c) => window.renderPhotoResizer ? window.renderPhotoResizer(c) : null,
      faqKey: 'photo_resizer'
    },
    {
      id: 'signature-crop',
      title: 'Signature Crop & Resize',
      icon: '✍️',
      category: 'photo-pdf',
      categoryName: 'Photo & PDF Tools',
      desc: 'Clean paper shadow, enhance contrast to sharp black ink, and resize strictly to 10KB - 20KB (140x60px) for SSC and banking portals.',
      badge: 'Shadow Cleaner',
      render: (c) => window.renderSignatureCrop ? window.renderSignatureCrop(c) : null,
      faqKey: 'signature_crop'
    },
    {
      id: 'pdf-compressor',
      title: 'PDF Document Compressor',
      icon: '📉',
      category: 'photo-pdf',
      categoryName: 'Photo & PDF Tools',
      desc: 'Compress marksheet, caste certificate, and domicile PDFs to under 100KB / 200KB / 500KB client-side without quality loss.',
      badge: '100% Client-Side',
      render: (c) => window.renderPdfCompressor ? window.renderPdfCompressor(c) : null,
      faqKey: 'pdf_compressor'
    },
    {
      id: 'image-to-pdf',
      title: 'Image to PDF Converter',
      icon: '📑',
      category: 'photo-pdf',
      categoryName: 'Photo & PDF Tools',
      desc: 'Combine multiple certificate photos, semester marksheets, and Aadhaar front/back into a single ordered PDF file.',
      badge: 'Multi-Page A4',
      render: (c) => window.renderImageToPdf ? window.renderImageToPdf(c) : null,
      faqKey: 'image_to_pdf'
    },
    {
      id: 'pdf-merge-split',
      title: 'PDF Merge & Split Tool',
      icon: '🔀',
      category: 'photo-pdf',
      categoryName: 'Photo & PDF Tools',
      desc: 'Merge multiple PDF documents into one, or extract/split specific syllabus and form pages from heavy notification PDFs.',
      badge: 'Merge & Extract',
      render: (c) => window.renderPdfMergeSplit ? window.renderPdfMergeSplit(c) : null,
      faqKey: 'pdf_merge_split'
    },
    {
      id: 'salary-calculator',
      title: 'In-Hand Salary Calculator',
      icon: '💰',
      category: 'eligibility',
      categoryName: 'Eligibility & Pay',
      desc: 'Approximate 7th CPC take-home in-hand pay, DA (50%+), HRA (X/Y/Z cities), TA, and NPS deductions for SSC, Railways, and Banking posts.',
      badge: '7th CPC Matrix',
      render: (c) => window.renderSalaryCalculator ? window.renderSalaryCalculator(c) : null,
      faqKey: 'salary_calculator'
    },
    {
      id: 'negative-marking',
      title: 'Negative Marking Calculator',
      icon: '🎯',
      category: 'marks',
      categoryName: 'Marks & Scores',
      desc: 'Calculate raw score, penalty deductions, and attempt accuracy with official marking presets (+2/-0.5, +3/-1, +1/-0.33, CSAT).',
      badge: 'Instant Answer Key',
      render: (c) => window.renderNegativeMarking ? window.renderNegativeMarking(c) : null,
      faqKey: 'negative_marking'
    },
    {
      id: 'normalization-score',
      title: 'Shift Normalization Estimator',
      icon: '📊',
      category: 'marks',
      categoryName: 'Marks & Scores',
      desc: 'Simulate how raw marks get adjusted across tough vs easy shifts using the official SSC & RRB multi-shift formula.',
      badge: 'SSC / RRB Formula',
      render: (c) => window.renderNormalization ? window.renderNormalization(c) : null,
      faqKey: 'normalization_score'
    },
    {
      id: 'cgpa-percentage',
      title: 'CGPA to Percentage Converter',
      icon: '🎓',
      category: 'marks',
      categoryName: 'Marks & Scores',
      desc: 'Convert CGPA to Percentage and vice-versa using CBSE (× 9.5), AICTE Engineering, and UGC 10-point scales for application forms.',
      badge: 'CBSE × 9.5 Formula',
      render: (c) => window.renderCgpaConverter ? window.renderCgpaConverter(c) : null,
      faqKey: 'cgpa_converter'
    },
    {
      id: 'dpi-calculator',
      title: 'DPI / Pixel / Dimension Calc',
      icon: '📐',
      category: 'photo-pdf',
      categoryName: 'Photo & PDF Tools',
      desc: 'Convert cm/mm/inches to pixels at 100/200/300 DPI. Troubleshoot "Photo / Document Not Accepted" rejection errors on portal.',
      badge: 'Portal Diagnostic',
      render: (c) => window.renderDpiCalculator ? window.renderDpiCalculator(c) : null,
      faqKey: 'dpi_calculator'
    },
    {
      id: 'exam-countdown',
      title: 'Exam Countdown Tracker',
      icon: '⏳',
      category: 'study',
      categoryName: 'Exam Trackers',
      desc: 'Live real-time ticking countdown to SSC, UPSC, RRB, and IBPS exam dates, admit cards, and target study milestones with local persistence.',
      badge: 'Live Clock & Offline',
      render: (c) => window.renderExamCountdown ? window.renderExamCountdown(c) : null,
      faqKey: 'exam_countdown'
    }
  ];

  // Expose registry & renderers
  window.TB_TOOLS = TOOLS_REGISTRY;
  window.renderAgeCalculator = renderAgeCalculator;

})();
