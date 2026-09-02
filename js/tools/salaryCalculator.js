// Tool 7: 7th CPC In-Hand Salary Calculator (Central Govt & Banking)
import { SALARY_PRESETS } from '../data/examPresets.js';

export function renderSalaryCalculator(container) {
  let activePreset = SALARY_PRESETS[1]; // SSC CGL Level 7 default

  container.innerHTML = `
    <div class="tool-card">
      <div class="tool-header">
        <div class="tool-icon-badge">💰</div>
        <div>
          <h2 class="tool-title">In-Hand Salary Calculator (7th CPC Pay Matrix)</h2>
          <p class="tool-subtitle">Calculate gross salary, monthly deductions (NPS, CGHS, CGEGIS, Tax), and net in-hand take-home pay for SSC, Railways RRB, UPSC, Defence, and Banking posts.</p>
        </div>
      </div>

      <div class="privacy-callout">
        <span class="lock-icon">🔒</span>
        <span><strong>100% In-Browser Privacy:</strong> Your financial and salary calculations run purely on your device. No data is tracked or transmitted.</span>
      </div>

      <!-- Quick Preset Selector -->
      <div class="preset-selector-bar">
        <label class="form-label" for="salary-preset-select"><strong>Select Govt Exam / Post Preset:</strong></label>
        <select id="salary-preset-select" class="form-control select-lg">
          ${SALARY_PRESETS.map(p => `
            <option value="${p.id}">${p.exam} - ${p.postName} (Level ${p.level || 'Scale I'} • Basic ₹${p.basicPay.toLocaleString('en-IN')})</option>
          `).join('')}
        </select>
        <div id="salary-preset-notes" class="preset-badge-note"></div>
      </div>

      <div class="tool-grid-2col">
        
        <!-- Left: Salary Parameters Form -->
        <div class="form-panel">
          <h3 class="panel-heading">1. Pay & City Parameters</h3>

          <div class="form-group">
            <label class="form-label" for="basic-pay-input">Basic Pay (₹ per month) <span class="required">*</span></label>
            <input type="number" id="basic-pay-input" class="form-control font-bold" value="44900" step="100" />
            <small class="form-helper">As per 7th Central Pay Commission matrix level.</small>
          </div>

          <div class="form-group">
            <label class="form-label"><strong>Posting City Category (HRA Rate):</strong></label>
            <div class="city-selector-grid">
              <label class="city-card-radio">
                <input type="radio" name="city-class" value="X" checked />
                <div class="city-card-body">
                  <span class="city-tag">Class X (30% HRA)</span>
                  <span class="city-names">Delhi, Mumbai, Kolkata, Chennai, Bengaluru, Hyderabad, Pune, Ahmedabad</span>
                </div>
              </label>
              <label class="city-card-radio">
                <input type="radio" name="city-class" value="Y" />
                <div class="city-card-body">
                  <span class="city-tag">Class Y (20% HRA)</span>
                  <span class="city-names">Jaipur, Lucknow, Patna, Bhopal, Chandigarh, Kochi, Tier-2 cities (5-50L pop)</span>
                </div>
              </label>
              <label class="city-card-radio">
                <input type="radio" name="city-class" value="Z" />
                <div class="city-card-body">
                  <span class="city-tag">Class Z (10% HRA)</span>
                  <span class="city-names">Rural areas, small towns & other cities (population &lt; 5 Lakhs)</span>
                </div>
              </label>
            </div>
          </div>

          <div class="form-group">
            <div class="label-with-action">
              <label class="form-label" for="da-slider">Dearness Allowance (DA %): <strong id="da-val-text">50%</strong></label>
              <div class="quick-tags">
                <button type="button" class="tag-btn" data-da="50">50% (Current)</button>
                <button type="button" class="tag-btn" data-da="53">53% (Updated)</button>
                <button type="button" class="tag-btn" data-da="56">56% (Projected)</button>
              </div>
            </div>
            <input type="range" id="da-slider" min="30" max="70" step="1" value="50" class="slider-control" />
          </div>

          <div class="form-group">
            <label class="form-label" for="tpta-select">Transport Allowance (TPTA Location):</label>
            <select id="tpta-select" class="form-control">
              <option value="higher" selected>Higher TPTA City (Delhi, Mumbai, Metro cities)</option>
              <option value="other">Other Cities & Towns</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="other-allowances-input">Special / Departmental Allowances (₹/mo):</label>
            <input type="number" id="other-allowances-input" class="form-control" value="0" placeholder="e.g. Risk, Ration Money, Running Allowance" />
          </div>

          <div class="form-group">
            <label class="form-label" for="tax-regime-select">Income Tax Slab Estimation:</label>
            <select id="tax-regime-select" class="form-control">
              <option value="new_zero" selected>New Tax Regime (Zero Tax if taxable income &le; ₹7.75 Lakhs/yr with rebate)</option>
              <option value="standard">Standard Tax Estimate (~₹1,500 - ₹3,500/mo for high scales)</option>
              <option value="zero">No Monthly Tax Deduction (Declared 80C/Exempt)</option>
            </select>
          </div>

        </div>

        <!-- Right: In-Hand Salary Breakdown Card -->
        <div class="results-panel">
          <h3 class="panel-heading">2. Monthly In-Hand Salary Breakdown</h3>

          <div class="salary-hero-card">
            <span class="hero-sub">Estimated Monthly In-Hand (Take-Home)</span>
            <div class="hero-amount" id="net-salary-display">₹ 68,450</div>
            <span class="hero-annual" id="annual-package-display">Approx Annual CTC: ₹ 9.85 Lakhs / yr</span>
          </div>

          <!-- Visual Bar Breakdown -->
          <div class="salary-visual-bar mt-3">
            <div class="bar-segment seg-basic" id="bar-basic" style="width: 55%;" title="Basic Pay"></div>
            <div class="bar-segment seg-da" id="bar-da" style="width: 25%;" title="DA"></div>
            <div class="bar-segment seg-hra" id="bar-hra" style="width: 15%;" title="HRA"></div>
            <div class="bar-segment seg-ta" id="bar-ta" style="width: 5%;" title="TA"></div>
          </div>
          <div class="bar-legend">
            <span><i class="dot dot-basic"></i> Basic</span>
            <span><i class="dot dot-da"></i> DA</span>
            <span><i class="dot dot-hra"></i> HRA</span>
            <span><i class="dot dot-ta"></i> TA</span>
          </div>

          <!-- Itemized Breakdown Table -->
          <div class="table-responsive mt-3">
            <table class="data-table salary-table">
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Type</th>
                  <th class="text-right">Monthly Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Basic Pay</td>
                  <td><span class="pill-tag">Core Pay</span></td>
                  <td class="text-right" id="item-basic">₹ 44,900</td>
                </tr>
                <tr>
                  <td>Dearness Allowance (DA @ <span id="item-da-rate">50%</span>)</td>
                  <td><span class="pill-tag pill-green">Allowance</span></td>
                  <td class="text-right" id="item-da">₹ 22,450</td>
                </tr>
                <tr>
                  <td>House Rent Allowance (HRA @ <span id="item-hra-rate">30%</span>)</td>
                  <td><span class="pill-tag pill-green">Allowance</span></td>
                  <td class="text-right" id="item-hra">₹ 13,470</td>
                </tr>
                <tr>
                  <td>Transport Allowance (TA + DA on TA)</td>
                  <td><span class="pill-tag pill-green">Allowance</span></td>
                  <td class="text-right" id="item-ta">₹ 5,400</td>
                </tr>
                <tr id="row-other-allowance" class="hidden">
                  <td>Special / Running Allowance</td>
                  <td><span class="pill-tag pill-green">Allowance</span></td>
                  <td class="text-right" id="item-other-allowance">₹ 0</td>
                </tr>
                <tr class="highlight-row">
                  <td><strong>Gross Monthly Earnings</strong></td>
                  <td><strong>Total</strong></td>
                  <td class="text-right text-success"><strong id="item-gross">₹ 86,220</strong></td>
                </tr>
                <tr>
                  <td>NPS Employee Contribution (10% of Basic+DA)</td>
                  <td><span class="pill-tag pill-red">Deduction</span></td>
                  <td class="text-right text-danger" id="item-nps">- ₹ 6,735</td>
                </tr>
                <tr>
                  <td>CGHS (Central Health Scheme)</td>
                  <td><span class="pill-tag pill-red">Deduction</span></td>
                  <td class="text-right text-danger" id="item-cghs">- ₹ 650</td>
                </tr>
                <tr>
                  <td>CGEGIS (Group Insurance) + Prof Tax</td>
                  <td><span class="pill-tag pill-red">Deduction</span></td>
                  <td class="text-right text-danger" id="item-cgegis">- ₹ 260</td>
                </tr>
                <tr>
                  <td>Income Tax (TDS Estimate)</td>
                  <td><span class="pill-tag pill-red">Deduction</span></td>
                  <td class="text-right text-danger" id="item-tax">- ₹ 0</td>
                </tr>
                <tr class="highlight-row-danger">
                  <td><strong>Total Monthly Deductions</strong></td>
                  <td><strong>Deductions</strong></td>
                  <td class="text-right text-danger"><strong id="item-deductions">- ₹ 7,645</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="nps-govt-contribution-box mt-3">
            <span class="nps-icon">🏛️</span>
            <div>
              <strong>Government NPS Contribution (14% Employer Share):</strong>
              <div class="nps-amount" id="item-nps-govt">+ ₹ 9,429 / month</div>
              <small class="text-muted">Deposited directly to your PRAN account by the Govt of India over and above gross pay.</small>
            </div>
          </div>

        </div>

      </div>

      <div class="disclaimer-note">
        ⚠️ <strong>Official Disclaimer:</strong> Salary computations are approximate and based on standard 7th Central Pay Commission formulas, notified DA percentages, and standard deductions. Actual in-hand salary may vary slightly depending on state-specific Professional Tax, individual income tax choices (Old vs New Regime), local allowances, and department-specific pay structures. Cross-check with official recruitment gazettes and joining instructions.
      </div>
    </div>
  `;

  // Selectors
  const presetSelect = container.querySelector('#salary-preset-select');
  const presetNotes = container.querySelector('#salary-preset-notes');
  const basicPayInput = container.querySelector('#basic-pay-input');
  const cityRadios = container.querySelectorAll('input[name="city-class"]');
  const daSlider = container.querySelector('#da-slider');
  const daValText = container.querySelector('#da-val-text');
  const daTags = container.querySelectorAll('.tag-btn[data-da]');
  const tptaSelect = container.querySelector('#tpta-select');
  const otherAllowInput = container.querySelector('#other-allowances-input');
  const taxRegimeSelect = container.querySelector('#tax-regime-select');

  // Output elements
  const netSalaryDisplay = container.querySelector('#net-salary-display');
  const annualPackageDisplay = container.querySelector('#annual-package-display');
  const barBasic = container.querySelector('#bar-basic');
  const barDa = container.querySelector('#bar-da');
  const barHra = container.querySelector('#bar-hra');
  const barTa = container.querySelector('#bar-ta');

  const itemBasic = container.querySelector('#item-basic');
  const itemDa = container.querySelector('#item-da');
  const itemDaRate = container.querySelector('#item-da-rate');
  const itemHra = container.querySelector('#item-hra');
  const itemHraRate = container.querySelector('#item-hra-rate');
  const itemTa = container.querySelector('#item-ta');
  const rowOther = container.querySelector('#row-other-allowance');
  const itemOther = container.querySelector('#item-other-allowance');
  const itemGross = container.querySelector('#item-gross');
  const itemNps = container.querySelector('#item-nps');
  const itemCghs = container.querySelector('#item-cghs');
  const itemCgegis = container.querySelector('#item-cgegis');
  const itemTax = container.querySelector('#item-tax');
  const itemDeductions = container.querySelector('#item-deductions');
  const itemNpsGovt = container.querySelector('#item-nps-govt');

  function updatePreset() {
    activePreset = SALARY_PRESETS.find(p => p.id === presetSelect.value) || SALARY_PRESETS[0];
    presetNotes.innerHTML = `<strong>${activePreset.exam} - ${activePreset.postName}:</strong> Pay Level ${activePreset.level || 'Scale I'}, Initial Basic ₹${activePreset.basicPay.toLocaleString('en-IN')}. ${activePreset.description}`;
    basicPayInput.value = activePreset.basicPay;
    
    if (activePreset.runningAllowance) {
      otherAllowInput.value = activePreset.runningAllowance;
    } else if (activePreset.rationMoney) {
      otherAllowInput.value = activePreset.rationMoney;
    } else {
      otherAllowInput.value = 0;
    }

    calculateSalary();
  }

  presetSelect.addEventListener('change', updatePreset);
  updatePreset();

  daSlider.addEventListener('input', () => {
    daValText.textContent = daSlider.value + '%';
    calculateSalary();
  });

  daTags.forEach(btn => {
    btn.addEventListener('click', () => {
      daSlider.value = btn.dataset.da;
      daValText.textContent = btn.dataset.da + '%';
      calculateSalary();
    });
  });

  basicPayInput.addEventListener('input', calculateSalary);
  cityRadios.forEach(r => r.addEventListener('change', calculateSalary));
  tptaSelect.addEventListener('change', calculateSalary);
  otherAllowInput.addEventListener('input', calculateSalary);
  taxRegimeSelect.addEventListener('change', calculateSalary);

  function calculateSalary() {
    const basic = parseFloat(basicPayInput.value) || 0;
    const daRate = parseFloat(daSlider.value) / 100;
    const selectedCity = Array.from(cityRadios).find(r => r.checked)?.value || 'X';
    const isHigherTpta = tptaSelect.value === 'higher';
    const otherAllow = parseFloat(otherAllowInput.value) || 0;
    const taxMode = taxRegimeSelect.value;

    // 1. Dearness Allowance (DA)
    const daAmount = Math.round(basic * daRate);

    // 2. House Rent Allowance (HRA)
    // 7th CPC rule: when DA >= 50%, HRA is 30% (X), 20% (Y), 10% (Z). If DA < 50%, 27%, 18%, 9%.
    let hraPercent = 30;
    if (daRate >= 0.50) {
      hraPercent = selectedCity === 'X' ? 30 : (selectedCity === 'Y' ? 20 : 10);
    } else {
      hraPercent = selectedCity === 'X' ? 27 : (selectedCity === 'Y' ? 18 : 9);
    }
    const hraAmount = Math.round(basic * (hraPercent / 100));

    // 3. Transport Allowance (TA)
    // Pay Level 9 & above: ₹7200 / ₹3600
    // Pay Level 3 to 8: ₹3600 / ₹1800
    // Pay Level 1 & 2: ₹1350 / ₹900
    let baseTa = 3600;
    if (basic >= 53100) {
      baseTa = isHigherTpta ? 7200 : 3600;
    } else if (basic >= 21700) {
      baseTa = isHigherTpta ? 3600 : 1800;
    } else {
      baseTa = isHigherTpta ? 1350 : 900;
    }
    const daOnTa = Math.round(baseTa * daRate);
    const totalTa = baseTa + daOnTa;

    // Gross Salary
    const gross = basic + daAmount + hraAmount + totalTa + otherAllow;

    // 4. Deductions
    // NPS (Employee 10% of Basic + DA)
    const npsEmployee = Math.round((basic + daAmount) * 0.10);
    const npsGovt = Math.round((basic + daAmount) * 0.14);

    // CGHS (based on pay level)
    let cghs = 650;
    if (basic <= 25500) cghs = 250;
    else if (basic <= 44900) cghs = 450;
    else if (basic <= 78800) cghs = 650;
    else cghs = 1000;

    // CGEGIS + Professional Tax
    const cgegis = basic >= 44900 ? 60 : 30;
    const profTax = 200;

    // Income Tax estimate
    let taxEstimate = 0;
    const annualGross = gross * 12;
    if (taxMode === 'standard') {
      if (annualGross > 1000000) taxEstimate = Math.round(annualGross * 0.08 / 12);
      else if (annualGross > 750000) taxEstimate = Math.round(annualGross * 0.04 / 12);
    } else if (taxMode === 'new_zero') {
      if (annualGross > 900000) taxEstimate = Math.round((annualGross - 775000) * 0.10 / 12);
    }

    const totalDeductions = npsEmployee + cghs + cgegis + profTax + taxEstimate;
    const netSalary = gross - totalDeductions;
    const annualCtc = (gross + npsGovt) * 12;

    // Update UI elements
    netSalaryDisplay.textContent = `₹ ${netSalary.toLocaleString('en-IN')}`;
    annualPackageDisplay.textContent = `Gross ₹ ${(gross * 12).toLocaleString('en-IN')} / yr • Total Annual CTC with 14% NPS: ₹ ${(annualCtc / 100000).toFixed(2)} Lakhs`;

    itemBasic.textContent = `₹ ${basic.toLocaleString('en-IN')}`;
    itemDaRate.textContent = `${Math.round(daRate * 100)}%`;
    itemDa.textContent = `₹ ${daAmount.toLocaleString('en-IN')}`;
    itemHraRate.textContent = `${hraPercent}%`;
    itemHra.textContent = `₹ ${hraAmount.toLocaleString('en-IN')}`;
    itemTa.textContent = `₹ ${totalTa.toLocaleString('en-IN')} (₹${baseTa} + ₹${daOnTa} DA)`;
    
    if (otherAllow > 0) {
      rowOther.classList.remove('hidden');
      itemOther.textContent = `₹ ${otherAllow.toLocaleString('en-IN')}`;
    } else {
      rowOther.classList.add('hidden');
    }

    itemGross.textContent = `₹ ${gross.toLocaleString('en-IN')}`;
    itemNps.textContent = `- ₹ ${npsEmployee.toLocaleString('en-IN')}`;
    itemCghs.textContent = `- ₹ ${cghs.toLocaleString('en-IN')}`;
    itemCgegis.textContent = `- ₹ ${cgegis + profTax.toLocaleString('en-IN')}`;
    itemTax.textContent = `- ₹ ${taxEstimate.toLocaleString('en-IN')}`;
    itemDeductions.textContent = `- ₹ ${totalDeductions.toLocaleString('en-IN')}`;
    itemNpsGovt.textContent = `+ ₹ ${npsGovt.toLocaleString('en-IN')} / month`;

    // Visual bar widths
    const basicPct = Math.round((basic / gross) * 100);
    const daPct = Math.round((daAmount / gross) * 100);
    const hraPct = Math.round((hraAmount / gross) * 100);
    const taPct = 100 - basicPct - daPct - hraPct;

    barBasic.style.width = basicPct + '%';
    barDa.style.width = daPct + '%';
    barHra.style.width = hraPct + '%';
    barTa.style.width = Math.max(2, taPct) + '%';
  }
}
