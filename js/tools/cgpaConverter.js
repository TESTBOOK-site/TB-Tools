// Tool 10: Percentage to CGPA & CGPA to Percentage Converter

export function renderCgpaConverter(container) {
  let semesterRows = [
    { sem: 'Semester 1', sgpa: 8.2, credits: 20 },
    { sem: 'Semester 2', sgpa: 8.5, credits: 20 },
    { sem: 'Semester 3', sgpa: 7.9, credits: 22 },
    { sem: 'Semester 4', sgpa: 8.4, credits: 22 }
  ];

  container.innerHTML = `
    <div class="tool-card">
      <div class="tool-header">
        <div class="tool-icon-badge">🎓</div>
        <div>
          <h2 class="tool-title">CGPA to Percentage & Marks Calculator</h2>
          <p class="tool-subtitle">Convert CGPA to Percentage and vice versa using official CBSE (x9.5), AICTE, UGC, and university conversion formulas required for SSC, UPSC, and IBPS online forms.</p>
        </div>
      </div>

      <div class="privacy-callout">
        <span class="lock-icon">🔒</span>
        <span><strong>100% In-Browser Privacy:</strong> Academic calculations are processed purely on your device.</span>
      </div>

      <!-- Conversion Mode Switcher -->
      <div class="tab-nav-bar">
        <button type="button" class="tab-nav-btn active" id="tab-cgpa-to-pct">1. CGPA ➔ Percentage (%)</button>
        <button type="button" class="tab-nav-btn" id="tab-pct-to-cgpa">2. Percentage (%) ➔ CGPA</button>
        <button type="button" class="tab-nav-btn" id="tab-marksheet">3. Multi-Semester SGPA Aggregator</button>
      </div>

      <!-- VIEW 1: CGPA TO PERCENTAGE -->
      <div id="view-cgpa-to-pct" class="tab-view-content">
        <div class="tool-grid-2col">
          <div class="form-panel">
            <h3 class="panel-heading">Enter Your CGPA</h3>

            <div class="form-group">
              <label class="form-label" for="cgpa-input">Enter CGPA (Cumulative Grade Point Average):</label>
              <input type="number" id="cgpa-input" class="form-control form-control-lg font-bold" value="8.4" step="0.01" min="0" max="10" />
            </div>

            <div class="form-group">
              <label class="form-label" for="cgpa-standard-select">Select Board / University Formula:</label>
              <select id="cgpa-standard-select" class="form-control">
                <option value="cbse" selected>CBSE Standard: % = CGPA × 9.5 (Class 10th/12th)</option>
                <option value="aicte">AICTE Engineering: % = (CGPA - 0.75) × 10</option>
                <option value="ugc">UGC / University 10-Point: % = CGPA × 10</option>
                <option value="mumbai">Mumbai University: % = 7.25 × CGPA + 11</option>
                <option value="custom">Custom Formula Multiplier</option>
              </select>
            </div>

            <div class="form-group hidden" id="custom-multiplier-box">
              <label class="form-label" for="custom-mult-input">Custom Multiplier (X):</label>
              <input type="number" id="custom-mult-input" class="form-control" value="9.5" step="0.1" />
            </div>

            <button type="button" class="btn btn-primary btn-block" id="calc-cgpa-btn">
              <span>⚡ Convert to Percentage</span>
            </button>
          </div>

          <div class="results-panel">
            <h3 class="panel-heading">Equivalent Percentage</h3>

            <div class="score-hero-card">
              <span class="hero-sub">Equivalent Percentage</span>
              <div class="hero-amount text-success" id="res-percentage-val">79.80 %</div>
              <span class="hero-annual" id="res-grade-division">Division: First Class with Distinction</span>
            </div>

            <div class="stats-mini-grid mt-3">
              <div class="mini-stat-card">
                <span class="mini-stat-label">Formula Used</span>
                <span class="mini-stat-value" id="res-formula-text">8.4 × 9.5</span>
              </div>
              <div class="mini-stat-card">
                <span class="mini-stat-label">Letter Grade</span>
                <span class="mini-stat-value text-primary" id="res-letter-grade">A (Very Good)</span>
              </div>
            </div>

            <div class="disclaimer-mini mt-3">
              📌 <strong>Govt Form Tip:</strong> For SSC CGL/CHSL application forms, fill <strong>79.80%</strong> and select 'CBSE' or upload conversion certificate in Document Verification.
            </div>
          </div>
        </div>
      </div>

      <!-- VIEW 2: PERCENTAGE TO CGPA -->
      <div id="view-pct-to-cgpa" class="tab-view-content hidden">
        <div class="tool-grid-2col">
          <div class="form-panel">
            <h3 class="panel-heading">Enter Your Percentage (%)</h3>

            <div class="form-group">
              <label class="form-label" for="pct-input">Percentage Score (%):</label>
              <input type="number" id="pct-input" class="form-control form-control-lg font-bold" value="82.5" step="0.1" min="0" max="100" />
            </div>

            <div class="form-group">
              <label class="form-label" for="pct-standard-select">Select Target Grading Scale:</label>
              <select id="pct-standard-select" class="form-control">
                <option value="cbse" selected>CBSE 10-Point Scale (CGPA = % / 9.5)</option>
                <option value="aicte">AICTE Engineering Scale (CGPA = % / 10 + 0.75)</option>
                <option value="ugc">Standard 10-Point Scale (CGPA = % / 10)</option>
                <option value="scale4">US / 4-Point Scale (CGPA = % / 25)</option>
              </select>
            </div>

            <button type="button" class="btn btn-primary btn-block" id="calc-pct-btn">
              <span>⚡ Convert to CGPA</span>
            </button>
          </div>

          <div class="results-panel">
            <h3 class="panel-heading">Equivalent CGPA</h3>

            <div class="score-hero-card">
              <span class="hero-sub">Equivalent CGPA</span>
              <div class="hero-amount text-primary" id="res-cgpa-val">8.68 / 10.0</div>
              <span class="hero-annual" id="res-pct-division">First Class Distinction</span>
            </div>

            <div class="stats-mini-grid mt-3">
              <div class="mini-stat-card">
                <span class="mini-stat-label">Conversion Math</span>
                <span class="mini-stat-value" id="res-pct-formula">82.5 ÷ 9.5</span>
              </div>
              <div class="mini-stat-card">
                <span class="mini-stat-label">Scale Max</span>
                <span class="mini-stat-value">10.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- VIEW 3: MULTI-SEMESTER SGPA AGGREGATOR -->
      <div id="view-marksheet" class="tab-view-content hidden">
        <div class="form-panel-full">
          <div class="label-with-action">
            <h3 class="panel-heading">Semester-Wise SGPA & Credits Table</h3>
            <button type="button" class="btn btn-sm btn-outline" id="add-sem-row-btn">+ Add Semester</button>
          </div>

          <div class="table-responsive mt-2">
            <table class="data-table" id="sem-table">
              <thead>
                <tr>
                  <th>Semester / Term</th>
                  <th>SGPA / GPA (out of 10)</th>
                  <th>Credits</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody id="sem-tbody">
                <!-- Dynamically populated -->
              </tbody>
            </table>
          </div>

          <div class="score-hero-card mt-3">
            <span class="hero-sub">Cumulative CGPA & Aggregate Percentage</span>
            <div class="hero-amount text-success" id="agg-cgpa-val">8.25 CGPA (78.38%)</div>
            <span class="hero-annual" id="agg-division">First Class with Distinction • Total 84 Credits</span>
          </div>
        </div>
      </div>

    </div>
  `;

  // Selectors
  const tabCgpaToPct = container.querySelector('#tab-cgpa-to-pct');
  const tabPctToCgpa = container.querySelector('#tab-pct-to-cgpa');
  const tabMarksheet = container.querySelector('#tab-marksheet');

  const viewCgpaToPct = container.querySelector('#view-cgpa-to-pct');
  const viewPctToCgpa = container.querySelector('#view-pct-to-cgpa');
  const viewMarksheet = container.querySelector('#view-marksheet');

  // CGPA to %
  const cgpaInput = container.querySelector('#cgpa-input');
  const cgpaStd = container.querySelector('#cgpa-standard-select');
  const customMultBox = container.querySelector('#custom-multiplier-box');
  const customMultInput = container.querySelector('#custom-mult-input');
  const calcCgpaBtn = container.querySelector('#calc-cgpa-btn');
  const resPctVal = container.querySelector('#res-percentage-val');
  const resGradeDiv = container.querySelector('#res-grade-division');
  const resFormula = container.querySelector('#res-formula-text');
  const resLetter = container.querySelector('#res-letter-grade');

  // % to CGPA
  const pctInput = container.querySelector('#pct-input');
  const pctStd = container.querySelector('#pct-standard-select');
  const calcPctBtn = container.querySelector('#calc-pct-btn');
  const resCgpaVal = container.querySelector('#res-cgpa-val');
  const resPctDiv = container.querySelector('#res-pct-division');
  const resPctFormula = container.querySelector('#res-pct-formula');

  // Tab switching
  tabCgpaToPct.addEventListener('click', () => {
    tabCgpaToPct.classList.add('active');
    tabPctToCgpa.classList.remove('active');
    tabMarksheet.classList.remove('active');
    viewCgpaToPct.classList.remove('hidden');
    viewPctToCgpa.classList.add('hidden');
    viewMarksheet.classList.add('hidden');
  });

  tabPctToCgpa.addEventListener('click', () => {
    tabPctToCgpa.classList.add('active');
    tabCgpaToPct.classList.remove('active');
    tabMarksheet.classList.remove('active');
    viewPctToCgpa.classList.remove('hidden');
    viewCgpaToPct.classList.add('hidden');
    viewMarksheet.classList.add('hidden');
  });

  tabMarksheet.addEventListener('click', () => {
    tabMarksheet.classList.add('active');
    tabCgpaToPct.classList.remove('active');
    tabPctToCgpa.classList.remove('active');
    viewMarksheet.classList.remove('hidden');
    viewCgpaToPct.classList.add('hidden');
    viewPctToCgpa.classList.add('hidden');
    renderSemesterTable();
  });

  cgpaStd.addEventListener('change', () => {
    if (cgpaStd.value === 'custom') {
      customMultBox.classList.remove('hidden');
    } else {
      customMultBox.classList.add('hidden');
    }
    calculateCgpaToPct();
  });

  function calculateCgpaToPct() {
    const cgpa = parseFloat(cgpaInput.value) || 0;
    const std = cgpaStd.value;
    let pct = 0;
    let formulaStr = '';

    if (std === 'cbse') {
      pct = cgpa * 9.5;
      formulaStr = `${cgpa} × 9.5`;
    } else if (std === 'aicte') {
      pct = (cgpa - 0.75) * 10;
      formulaStr = `(${cgpa} - 0.75) × 10`;
    } else if (std === 'ugc') {
      pct = cgpa * 10;
      formulaStr = `${cgpa} × 10`;
    } else if (std === 'mumbai') {
      pct = 7.25 * cgpa + 11;
      formulaStr = `7.25 × ${cgpa} + 11`;
    } else if (std === 'custom') {
      const mult = parseFloat(customMultInput.value) || 9.5;
      pct = cgpa * mult;
      formulaStr = `${cgpa} × ${mult}`;
    }

    pct = Math.min(100, Math.max(0, pct));
    resPctVal.textContent = `${pct.toFixed(2)} %`;
    resFormula.textContent = formulaStr;

    if (pct >= 75) {
      resGradeDiv.textContent = 'Division: First Class with Distinction (O / A+)';
      resLetter.textContent = 'A+ (Outstanding)';
    } else if (pct >= 60) {
      resGradeDiv.textContent = 'Division: First Class (A)';
      resLetter.textContent = 'A (Very Good)';
    } else if (pct >= 50) {
      resGradeDiv.textContent = 'Division: Second Class (B)';
      resLetter.textContent = 'B (Good)';
    } else if (pct >= 40) {
      resGradeDiv.textContent = 'Division: Third Class / Pass (C)';
      resLetter.textContent = 'C (Pass)';
    } else {
      resGradeDiv.textContent = 'Status: Below Passing Threshold';
      resLetter.textContent = 'F (Fail)';
    }
  }

  cgpaInput.addEventListener('input', calculateCgpaToPct);
  customMultInput.addEventListener('input', calculateCgpaToPct);
  calcCgpaBtn.addEventListener('click', calculateCgpaToPct);

  function calculatePctToCgpa() {
    const pct = parseFloat(pctInput.value) || 0;
    const std = pctStd.value;
    let cgpa = 0;
    let form = '';

    if (std === 'cbse') {
      cgpa = pct / 9.5;
      form = `${pct} ÷ 9.5`;
    } else if (std === 'aicte') {
      cgpa = (pct / 10) + 0.75;
      form = `(${pct} ÷ 10) + 0.75`;
    } else if (std === 'ugc') {
      cgpa = pct / 10;
      form = `${pct} ÷ 10`;
    } else if (std === 'scale4') {
      cgpa = pct / 25;
      form = `${pct} ÷ 25`;
    }

    resCgpaVal.textContent = `${cgpa.toFixed(2)} / ${std === 'scale4' ? '4.0' : '10.0'}`;
    resPctFormula.textContent = form;
    resPctDiv.textContent = pct >= 75 ? 'First Class with Distinction' : (pct >= 60 ? 'First Class' : (pct >= 50 ? 'Second Class' : 'Pass Class'));
  }

  pctInput.addEventListener('input', calculatePctToCgpa);
  pctStd.addEventListener('change', calculatePctToCgpa);
  calcPctBtn.addEventListener('click', calculatePctToCgpa);

  // Semester table
  const semTbody = container.querySelector('#sem-tbody');
  const addSemBtn = container.querySelector('#add-sem-row-btn');
  const aggCgpaVal = container.querySelector('#agg-cgpa-val');
  const aggDivision = container.querySelector('#agg-division');

  function renderSemesterTable() {
    semTbody.innerHTML = semesterRows.map((row, idx) => `
      <tr>
        <td><strong>${row.sem}</strong></td>
        <td>
          <input type="number" class="form-control form-control-sm sem-sgpa" data-idx="${idx}" value="${row.sgpa}" step="0.01" min="0" max="10" />
        </td>
        <td>
          <input type="number" class="form-control form-control-sm sem-cred" data-idx="${idx}" value="${row.credits}" min="1" max="50" />
        </td>
        <td>
          <button type="button" class="btn-icon text-danger del-sem-btn" data-idx="${idx}" ${semesterRows.length <= 1 ? 'disabled' : ''}>✕</button>
        </td>
      </tr>
    `).join('');

    semTbody.querySelectorAll('.sem-sgpa').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const i = parseInt(e.target.dataset.idx);
        semesterRows[i].sgpa = parseFloat(e.target.value) || 0;
        calculateAggregates();
      });
    });

    semTbody.querySelectorAll('.sem-cred').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const i = parseInt(e.target.dataset.idx);
        semesterRows[i].credits = parseFloat(e.target.value) || 20;
        calculateAggregates();
      });
    });

    semTbody.querySelectorAll('.del-sem-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const i = parseInt(btn.dataset.idx);
        semesterRows.splice(i, 1);
        renderSemesterTable();
      });
    });

    calculateAggregates();
  }

  addSemBtn.addEventListener('click', () => {
    semesterRows.push({
      sem: `Semester ${semesterRows.length + 1}`,
      sgpa: 8.0,
      credits: 20
    });
    renderSemesterTable();
  });

  function calculateAggregates() {
    let totalQualityPoints = 0;
    let totalCredits = 0;

    semesterRows.forEach(r => {
      totalQualityPoints += (r.sgpa * r.credits);
      totalCredits += r.credits;
    });

    const cgpa = totalCredits > 0 ? (totalQualityPoints / totalCredits) : 0;
    const pct = cgpa * 9.5;

    aggCgpaVal.textContent = `${cgpa.toFixed(2)} CGPA (${pct.toFixed(2)}%)`;
    aggDivision.textContent = `${pct >= 75 ? 'First Class with Distinction' : (pct >= 60 ? 'First Class' : 'Second Class')} • Total ${totalCredits} Credits`;
  }

  // Initial runs
  calculateCgpaToPct();
  calculatePctToCgpa();
}
