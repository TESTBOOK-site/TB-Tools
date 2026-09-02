// Tool 9: Shift Normalization Score Estimator (SSC & RRB Mathematical Model)

export function renderNormalization(container) {
  container.innerHTML = `
    <div class="tool-card">
      <div class="tool-header">
        <div class="tool-icon-badge">📊</div>
        <div>
          <h2 class="tool-title">Shift Normalization Score Estimator</h2>
          <p class="tool-subtitle">Understand and estimate how your raw marks get adjusted across tough, moderate, and easy shifts using the official SSC & RRB multi-shift normalization formula.</p>
        </div>
      </div>

      <div class="privacy-callout">
        <span class="lock-icon">🔒</span>
        <span><strong>100% In-Browser Computation:</strong> Statistical formulas are calculated client-side with zero data transmission.</span>
      </div>

      <!-- Mode Selector -->
      <div class="tab-nav-bar">
        <button type="button" class="tab-nav-btn active" id="norm-tab-quick">⚡ Quick Shift Simulator</button>
        <button type="button" class="tab-nav-btn" id="norm-tab-advanced">📐 Official Commission Formula Mode</button>
      </div>

      <!-- QUICK SIMULATOR VIEW -->
      <div id="norm-view-quick" class="tab-view-content">
        <div class="tool-grid-2col">
          
          <div class="form-panel">
            <h3 class="panel-heading">1. Your Raw Score & Shift Details</h3>

            <div class="form-group">
              <label class="form-label" for="quick-raw-score">Your Raw Marks (out of 200):</label>
              <input type="number" id="quick-raw-score" class="form-control form-control-lg font-bold" value="135.0" step="0.5" min="0" max="200" />
            </div>

            <div class="form-group">
              <label class="form-label"><strong>Perceived Difficulty of Your Shift:</strong></label>
              <div class="shift-difficulty-grid">
                <label class="shift-card-radio">
                  <input type="radio" name="shift-diff" value="tough" checked />
                  <div class="shift-card-body">
                    <span class="shift-tag badge-danger">🔥 Tough Shift</span>
                    <span class="shift-desc">Low shift average (~110-120). Hard math/reasoning questions.</span>
                  </div>
                </label>
                <label class="shift-card-radio">
                  <input type="radio" name="shift-diff" value="moderate" />
                  <div class="shift-card-body">
                    <span class="shift-tag badge-warning">⚖️ Moderate Shift</span>
                    <span class="shift-desc">Average difficulty (~130-135). Balanced paper.</span>
                  </div>
                </label>
                <label class="shift-card-radio">
                  <input type="radio" name="shift-diff" value="easy" />
                  <div class="shift-card-body">
                    <span class="shift-tag badge-success">✨ Easy Shift</span>
                    <span class="shift-desc">High shift average (~145-155). High scoring paper.</span>
                  </div>
                </label>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="exam-max-marks">Exam Maximum Marks:</label>
              <select id="exam-max-marks" class="form-control">
                <option value="200" selected>SSC CGL Tier 1 / CHSL (Max 200 Marks)</option>
                <option value="390">SSC CGL Tier 2 (Max 390 Marks)</option>
                <option value="100">Railways RRB NTPC CBT 1 (Max 100 Marks)</option>
                <option value="160">SSC GD Constable (Max 160 Marks)</option>
              </select>
            </div>

            <button type="button" class="btn btn-primary btn-block" id="calc-norm-quick-btn">
              <span>⚡ Estimate Normalized Marks</span>
            </button>
          </div>

          <div class="results-panel">
            <h3 class="panel-heading">2. Estimated Normalization Result</h3>

            <div class="norm-hero-card">
              <span class="hero-sub">Estimated Normalized Score</span>
              <div class="hero-amount text-primary" id="norm-final-score">151.25</div>
              <div class="norm-shift-impact" id="norm-impact-badge">
                <span class="badge badge-success">+16.25 Marks Normalization Boost</span>
              </div>
            </div>

            <div class="stats-mini-grid mt-3">
              <div class="mini-stat-card">
                <span class="mini-stat-label">Your Raw Score</span>
                <span class="mini-stat-value" id="norm-stat-raw">135.00</span>
              </div>
              <div class="mini-stat-card">
                <span class="mini-stat-label">Shift Adjustment</span>
                <span class="mini-stat-value text-success" id="norm-stat-diff">+16.25</span>
              </div>
            </div>

            <div class="formula-explainer-card mt-3">
              <h4 class="card-title">Why did this score change?</h4>
              <p class="text-sm" id="norm-explainer-text">
                Because your shift was <strong>Tough</strong> with a lower candidate mean, the statistical formula scales up candidate marks to equate them with easier shifts.
              </p>
            </div>
          </div>

        </div>
      </div>

      <!-- ADVANCED FORMULA VIEW -->
      <div id="norm-view-advanced" class="tab-view-content hidden">
        <div class="formula-box">
          <h4 class="formula-heading">Official Commission Formula (SSC & Indian Railways):</h4>
          <div class="formula-math-display">
            $$M_{ij} = \\frac{\\bar{M}_t^g - M_q^g}{\\bar{M}_{ti} - M_{iq}} (M_{ij} - M_{iq}) + M_q^{gm}$$
          </div>
        </div>

        <div class="tool-grid-2col mt-3">
          <div class="form-panel">
            <h3 class="panel-heading">Formula Input Variables</h3>

            <div class="form-group">
              <label class="form-label" for="adv-mij"><strong>$M_{ij}$</strong> - Your Actual Raw Score:</label>
              <input type="number" id="adv-mij" class="form-control font-bold" value="142.5" step="0.5" />
            </div>

            <div class="form-group">
              <label class="form-label" for="adv-mtg"><strong>$\\bar{M}_t^g$</strong> - Average of Top 0.1% across all shifts:</label>
              <input type="number" id="adv-mtg" class="form-control" value="184.2" step="0.1" />
            </div>

            <div class="form-group">
              <label class="form-label" for="adv-mqg"><strong>$M_q^g$</strong> - Sum of Mean and SD across all shifts:</label>
              <input type="number" id="adv-mqg" class="form-control" value="128.5" step="0.1" />
            </div>

            <div class="form-group">
              <label class="form-label" for="adv-mti"><strong>$\\bar{M}_{ti}$</strong> - Average of Top 0.1% in your shift:</label>
              <input type="number" id="adv-mti" class="form-control" value="172.0" step="0.1" />
            </div>

            <div class="form-group">
              <label class="form-label" for="adv-miq"><strong>$M_{iq}$</strong> - Sum of Mean and SD of your shift:</label>
              <input type="number" id="adv-miq" class="form-control" value="116.8" step="0.1" />
            </div>

            <div class="form-group">
              <label class="form-label" for="adv-mqgm"><strong>$M_q^{gm}$</strong> - Mean marks of shift having maximum average:</label>
              <input type="number" id="adv-mqgm" class="form-control" value="138.0" step="0.1" />
            </div>

            <button type="button" class="btn btn-primary btn-block" id="calc-adv-norm-btn">
              <span>📐 Calculate Step-by-Step</span>
            </button>
          </div>

          <div class="results-panel">
            <h3 class="panel-heading">Step-by-Step Computation</h3>

            <div class="step-card">
              <div class="step-title">Step 1: Shift Spread Ratio (Numerator / Denominator)</div>
              <div class="step-val" id="adv-step1">Ratio = (184.2 - 128.5) / (172.0 - 116.8) = 1.009</div>
            </div>

            <div class="step-card mt-2">
              <div class="step-title">Step 2: Difference from Shift Mean (Raw - Shift Base)</div>
              <div class="step-val" id="adv-step2">(142.5 - 116.8) = 25.70</div>
            </div>

            <div class="step-card mt-2">
              <div class="step-title">Step 3: Base Shift Adjustment ($M_q^{gm}$)</div>
              <div class="step-val" id="adv-step3">Scaled Marks + 138.0 = Normalized Score</div>
            </div>

            <div class="norm-hero-card mt-3">
              <span class="hero-sub">Calculated Normalized Score ($M_{ij}$)</span>
              <div class="hero-amount text-primary" id="adv-final-score">163.93</div>
            </div>
          </div>
        </div>
      </div>

      <div class="disclaimer-note">
        ⚠️ <strong>Important Statistical Disclaimer:</strong> This tool demonstrates the official mathematical principles used by SSC and Indian Railways. Exact official normalized scores depend on full multi-shift candidate master datasets consisting of hundreds of thousands of aspirants, which only the commission possesses. Treat these figures as a conceptual simulator.
      </div>
    </div>
  `;

  // Selectors
  const tabQuick = container.querySelector('#norm-tab-quick');
  const tabAdv = container.querySelector('#norm-tab-advanced');
  const viewQuick = container.querySelector('#norm-view-quick');
  const viewAdv = container.querySelector('#norm-view-advanced');

  // Quick inputs
  const quickRaw = container.querySelector('#quick-raw-score');
  const shiftRadios = container.querySelectorAll('input[name="shift-diff"]');
  const maxMarksSelect = container.querySelector('#exam-max-marks');
  const quickBtn = container.querySelector('#calc-norm-quick-btn');

  const normFinalScore = container.querySelector('#norm-final-score');
  const normImpactBadge = container.querySelector('#norm-impact-badge');
  const normStatRaw = container.querySelector('#norm-stat-raw');
  const normStatDiff = container.querySelector('#norm-stat-diff');
  const normExplainer = container.querySelector('#norm-explainer-text');

  // Advanced inputs
  const advMij = container.querySelector('#adv-mij');
  const advMtg = container.querySelector('#adv-mtg');
  const advMqg = container.querySelector('#adv-mqg');
  const advMti = container.querySelector('#adv-mti');
  const advMiq = container.querySelector('#adv-miq');
  const advMqgm = container.querySelector('#adv-mqgm');
  const advBtn = container.querySelector('#calc-adv-norm-btn');

  const advStep1 = container.querySelector('#adv-step1');
  const advStep2 = container.querySelector('#adv-step2');
  const advStep3 = container.querySelector('#adv-step3');
  const advFinalScore = container.querySelector('#adv-final-score');

  // Tab switching
  tabQuick.addEventListener('click', () => {
    tabQuick.classList.add('active');
    tabAdv.classList.remove('active');
    viewQuick.classList.remove('hidden');
    viewAdv.classList.add('hidden');
  });

  tabAdv.addEventListener('click', () => {
    tabAdv.classList.add('active');
    tabQuick.classList.remove('active');
    viewAdv.classList.remove('hidden');
    viewQuick.classList.add('hidden');
  });

  // Quick Calculation
  function calculateQuick() {
    const raw = parseFloat(quickRaw.value) || 0;
    const diff = Array.from(shiftRadios).find(r => r.checked)?.value || 'tough';
    const maxM = parseFloat(maxMarksSelect.value) || 200;

    let adjustment = 0;
    if (diff === 'tough') {
      adjustment = (maxM * 0.08) * (raw / maxM * 0.9 + 0.3);
    } else if (diff === 'moderate') {
      adjustment = (maxM * 0.015) * (raw / maxM);
    } else {
      adjustment = -(maxM * 0.02) * (1 - raw / maxM);
    }

    const finalScore = raw + adjustment;
    normFinalScore.textContent = finalScore.toFixed(2);
    normStatRaw.textContent = raw.toFixed(2);

    const diffStr = adjustment >= 0 ? `+${adjustment.toFixed(2)}` : `${adjustment.toFixed(2)}`;
    normStatDiff.textContent = diffStr;

    if (adjustment > 0) {
      normImpactBadge.innerHTML = `<span class="badge badge-success">${diffStr} Marks Normalization Boost</span>`;
      normStatDiff.className = 'mini-stat-value text-success';
      normExplainer.innerHTML = `Because your shift was <strong>${diff.toUpperCase()}</strong> with a lower candidate mean, the statistical formula scales up candidate marks to equate them with easier shifts.`;
    } else if (adjustment < 0) {
      normImpactBadge.innerHTML = `<span class="badge badge-warning">${diffStr} Marks (High Shift Average)</span>`;
      normStatDiff.className = 'mini-stat-value text-warning';
      normExplainer.innerHTML = `Because your shift was <strong>EASY</strong> with a very high candidate mean, candidate scores undergo slight downward balancing to normalize across harder shifts.`;
    } else {
      normImpactBadge.innerHTML = `<span class="badge badge-info">Neutral Adjustment</span>`;
      normExplainer.innerHTML = `Your shift is close to the benchmark base shift mean.`;
    }
  }

  quickRaw.addEventListener('input', calculateQuick);
  shiftRadios.forEach(r => r.addEventListener('change', calculateQuick));
  maxMarksSelect.addEventListener('change', calculateQuick);
  quickBtn.addEventListener('click', calculateQuick);

  // Advanced Calculation
  function calculateAdvanced() {
    const mij = parseFloat(advMij.value) || 0;
    const mtg = parseFloat(advMtg.value) || 184.2;
    const mqg = parseFloat(advMqg.value) || 128.5;
    const mti = parseFloat(advMti.value) || 172.0;
    const miq = parseFloat(advMiq.value) || 116.8;
    const mqgm = parseFloat(advMqgm.value) || 138.0;

    const numerator = mtg - mqg;
    const denominator = mti - miq;
    const ratio = denominator !== 0 ? (numerator / denominator) : 1;
    const diff = mij - miq;
    const normalized = (ratio * diff) + mqgm;

    advStep1.textContent = `Ratio = (${mtg} - ${mqg}) / (${mti} - ${miq}) = ${ratio.toFixed(4)}`;
    advStep2.textContent = `(${mij} - ${miq}) = ${diff.toFixed(2)}`;
    advStep3.textContent = `(${ratio.toFixed(4)} × ${diff.toFixed(2)}) + ${mqgm} = ${normalized.toFixed(2)}`;
    advFinalScore.textContent = normalized.toFixed(2);
  }

  [advMij, advMtg, advMqg, advMti, advMiq, advMqgm].forEach(inp => inp.addEventListener('input', calculateAdvanced));
  advBtn.addEventListener('click', calculateAdvanced);

  // Run initial
  calculateQuick();
  calculateAdvanced();
}
