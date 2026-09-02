// Tool 1: Age Calculator & Govt Exam Eligibility Checker
import { EXAM_AGE_RULES, CATEGORY_RELAXATIONS } from '../data/examPresets.js';

export function renderAgeCalculator(container) {
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
        <!-- Input Form Panel -->
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

        <!-- Result Summary Cards -->
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

      <!-- Eligibility Table Section -->
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
            <tbody id="eligibility-tbody">
              <!-- Dynamically populated -->
            </tbody>
          </table>
        </div>

        <div class="disclaimer-note">
          ⚠️ <strong>Official Verification Reminder:</strong> Age limits, cutoff dates (1st Jan vs 1st Aug), and relaxation rules are illustrative based on standard commission patterns. Some specific posts (e.g. Sub-Inspector, Police, Aviator) have custom age bands. Always confirm against the latest official recruitment notification before applying.
        </div>
      </div>
    </div>
  `;

  // Attach event listeners
  const dobInput = container.querySelector('#dob-input');
  const cutoffInput = container.querySelector('#cutoff-date-input');
  const categorySelect = container.querySelector('#category-select');
  const categoryDesc = container.querySelector('#category-desc');
  const calcBtn = container.querySelector('#calculate-age-btn');
  const tagBtns = container.querySelectorAll('.tag-btn');
  const filterPills = container.querySelectorAll('#exam-filter-pills .pill-btn');

  tagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      cutoffInput.value = btn.dataset.cutoff;
      calculateAndRender();
    });
  });

  categorySelect.addEventListener('change', () => {
    const selectedCat = CATEGORY_RELAXATIONS.find(c => c.id === categorySelect.value);
    if (selectedCat) {
      categoryDesc.textContent = selectedCat.description;
    }
    calculateAndRender();
  });

  calcBtn.addEventListener('click', calculateAndRender);
  dobInput.addEventListener('change', calculateAndRender);
  cutoffInput.addEventListener('change', calculateAndRender);

  let activeFilter = 'all';
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
    if (dob > cutoff) {
      return { error: 'Date of birth cannot be after the cutoff date.' };
    }

    let years = cutoff.getFullYear() - dob.getFullYear();
    let months = cutoff.getMonth() - dob.getMonth();
    let days = cutoff.getDate() - dob.getDate();

    if (days < 0) {
      months--;
      // Get days in previous month
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
    
    // Decimal age for precise eligibility comparison
    const decimalAge = years + (months / 12) + (days / 365.25);

    // Day of birth
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const birthDayName = daysOfWeek[dob.getDay()];

    // Next birthday calculation relative to cutoff
    let nextBday = new Date(cutoff.getFullYear(), dob.getMonth(), dob.getDate());
    if (nextBday < cutoff) {
      nextBday.setFullYear(cutoff.getFullYear() + 1);
    }
    const daysToNextBday = Math.ceil((nextBday - cutoff) / (1000 * 60 * 60 * 24));

    return {
      years,
      months,
      days,
      totalDays,
      totalMonths,
      decimalAge,
      birthDayName,
      daysToNextBday,
      cutoffFormatted: cutoff.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
    };
  }

  function calculateAndRender() {
    const dobVal = dobInput.value;
    const cutoffVal = cutoffInput.value;
    const catVal = categorySelect.value;

    const res = calculateAgeDetails(dobVal, cutoffVal);
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

    renderEligibilityRows(res, catVal);
  }

  function renderEligibilityRows(ageRes, catId) {
    if (!ageRes) return;
    const tbody = container.querySelector('#eligibility-tbody');
    const selectedCat = CATEGORY_RELAXATIONS.find(c => c.id === catId) || CATEGORY_RELAXATIONS[0];
    const relaxationYears = selectedCat.relaxationYears;

    let filteredExams = EXAM_AGE_RULES;
    if (activeFilter !== 'all') {
      filteredExams = EXAM_AGE_RULES.filter(e => {
        if (activeFilter === 'SSC') return e.id.startsWith('ssc');
        if (activeFilter === 'UPSC') return e.id.startsWith('upsc');
        if (activeFilter === 'Railways') return e.id.startsWith('rrb');
        if (activeFilter === 'Banking') return e.id.startsWith('ibps');
        if (activeFilter === 'State') return e.id.startsWith('state');
        return true;
      });
    }

    tbody.innerHTML = filteredExams.map(rule => {
      // Special rule: NDA and CDS do not provide category age relaxations under standard MoD rules
      const isDefenceAcademy = rule.id === 'upsc_nda' || rule.id === 'upsc_cds';
      const effectiveRelaxation = isDefenceAcademy ? 0 : relaxationYears;
      const effectiveMaxAge = rule.maxAge + effectiveRelaxation;
      const effectiveMinAge = rule.minAge;

      let statusHtml = '';
      if (ageRes.decimalAge < effectiveMinAge) {
        const diffMonths = Math.round((effectiveMinAge - ageRes.decimalAge) * 12);
        statusHtml = `<span class="badge badge-warning">⏳ Under-age (by ~${diffMonths} mos)</span>`;
      } else if (ageRes.decimalAge > effectiveMaxAge) {
        const overYears = (ageRes.decimalAge - effectiveMaxAge).toFixed(1);
        statusHtml = `<span class="badge badge-danger">❌ Over-age (by ${overYears} yrs)</span>`;
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
          <td>
            <span class="pill-tag ${effectiveRelaxation > 0 ? 'pill-green' : ''}">
              ${isDefenceAcademy && relaxationYears > 0 ? 'None (Defence rule)' : (effectiveRelaxation > 0 ? `+${effectiveRelaxation} Yrs` : '0 Yrs')}
            </span>
          </td>
          <td><strong>${effectiveMinAge} – ${effectiveMaxAge} Yrs</strong></td>
          <td>${statusHtml}</td>
        </tr>
      `;
    }).join('');
  }

  // Initial calculation run
  calculateAndRender();
}
