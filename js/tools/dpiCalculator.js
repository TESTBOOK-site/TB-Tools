// Tool 11: DPI / Pixel / Dimension Calculator & Rejection Troubleshooter

export function renderDpiCalculator(container) {
  container.innerHTML = `
    <div class="tool-card">
      <div class="tool-header">
        <div class="tool-icon-badge">📐</div>
        <div>
          <h2 class="tool-title">DPI / Pixel / Dimension Converter & Diagnostic Tool</h2>
          <p class="tool-subtitle">Convert between DPI, Pixels, Centimeters (cm), and Inches for government exam portals. Troubleshoot and fix "Photo / Document Not Accepted" rejection errors.</p>
        </div>
      </div>

      <div class="privacy-callout">
        <span class="lock-icon">🔒</span>
        <span><strong>100% In-Browser Computation:</strong> Calculations run purely on your device.</span>
      </div>

      <!-- Mode Switcher -->
      <div class="tab-nav-bar">
        <button type="button" class="tab-nav-btn active" id="tab-dpi-convert">1. DPI ⇄ Pixels ⇄ CM Converter</button>
        <button type="button" class="tab-nav-btn" id="tab-dpi-troubleshoot">2. "Photo Rejected?" Diagnostic Wizard</button>
        <button type="button" class="tab-nav-btn" id="tab-dpi-ref">3. Official Dimension Standards Cheat-Sheet</button>
      </div>

      <!-- VIEW 1: BIDIRECTIONAL CONVERTER -->
      <div id="view-dpi-convert" class="tab-view-content">
        <div class="tool-grid-2col">
          
          <div class="form-panel">
            <h3 class="panel-heading">Input Dimensions & Resolution</h3>

            <div class="form-row">
              <div class="form-group col-6">
                <label class="form-label" for="phys-width">Width:</label>
                <input type="number" id="phys-width" class="form-control font-bold" value="3.5" step="0.1" />
              </div>
              <div class="form-group col-6">
                <label class="form-label" for="phys-height">Height:</label>
                <input type="number" id="phys-height" class="form-control font-bold" value="4.5" step="0.1" />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="unit-select">Physical Unit:</label>
              <select id="unit-select" class="form-control">
                <option value="cm" selected>Centimeters (cm) - Standard in India</option>
                <option value="mm">Millimeters (mm)</option>
                <option value="in">Inches (in)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="dpi-select">Resolution (DPI - Dots Per Inch):</label>
              <select id="dpi-select" class="form-control">
                <option value="100">100 DPI (Web & Standard SSC Uploads)</option>
                <option value="200" selected>200 DPI (Standard Govt Document Scan)</option>
                <option value="300">300 DPI (High Resolution / Passport Print)</option>
                <option value="72">72 DPI (Standard Screen Resolution)</option>
                <option value="custom">Custom DPI...</option>
              </select>
            </div>

            <div class="form-group hidden" id="custom-dpi-box">
              <label class="form-label" for="custom-dpi-input">Enter Custom DPI:</label>
              <input type="number" id="custom-dpi-input" class="form-control" value="200" min="1" max="1200" />
            </div>

            <button type="button" class="btn btn-primary btn-block" id="calc-dpi-btn">
              <span>⚡ Convert to Pixels</span>
            </button>
          </div>

          <div class="results-panel">
            <h3 class="panel-heading">Calculated Pixel Dimensions</h3>

            <div class="score-hero-card">
              <span class="hero-sub">Required Pixel Dimensions</span>
              <div class="hero-amount text-primary" id="res-pixel-dim">276 × 354 px</div>
              <span class="hero-annual" id="res-pixel-aspect">Aspect Ratio: 3.5 : 4.5 (0.78)</span>
            </div>

            <div class="stats-mini-grid mt-3">
              <div class="mini-stat-card">
                <span class="mini-stat-label">Total Pixels</span>
                <span class="mini-stat-value" id="res-total-mp">97.7 KP (0.1 MP)</span>
              </div>
              <div class="mini-stat-card">
                <span class="mini-stat-label">Uncompressed Raw</span>
                <span class="mini-stat-value" id="res-raw-size">~286 KB</span>
              </div>
            </div>

            <div class="formula-explainer-card mt-3">
              <h4 class="card-title">Conversion Formula:</h4>
              <p class="text-sm" id="res-formula-explanation">
                <code>Pixels = (Centimeters ÷ 2.54) × DPI</code><br>
                Width: (3.5 ÷ 2.54) × 200 = 276 px<br>
                Height: (4.5 ÷ 2.54) × 200 = 354 px
              </p>
            </div>
          </div>

        </div>
      </div>

      <!-- VIEW 2: REJECTION TROUBLESHOOTER -->
      <div id="view-dpi-troubleshoot" class="tab-view-content hidden">
        <div class="tool-grid-2col">
          
          <div class="form-panel">
            <h3 class="panel-heading">Enter Rejected Image Properties</h3>

            <div class="form-group">
              <label class="form-label" for="diag-exam-select">Target Exam Portal:</label>
              <select id="diag-exam-select" class="form-control">
                <option value="ssc_photo" selected>SSC Photograph (20-50 KB, 3.5x4.5cm / 350x450px)</option>
                <option value="ssc_sig">SSC Signature (10-20 KB, 140x60px, Black Ink)</option>
                <option value="upsc_photo">UPSC Photograph (20-300 KB, min 350x350px)</option>
                <option value="ibps_photo">IBPS / SBI Photo (20-50 KB, 200x230px)</option>
                <option value="ibps_sig">IBPS / SBI Signature (10-20 KB, 140x60px)</option>
                <option value="pdf_cert">SSC / State PSC Certificate PDF (max 200-300 KB)</option>
              </select>
            </div>

            <div class="form-row">
              <div class="form-group col-6">
                <label class="form-label" for="diag-w">Current Width (px):</label>
                <input type="number" id="diag-w" class="form-control" value="800" />
              </div>
              <div class="form-group col-6">
                <label class="form-label" for="diag-h">Current Height (px):</label>
                <input type="number" id="diag-h" class="form-control" value="1200" />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="diag-size">Current File Size (in KB):</label>
              <input type="number" id="diag-size" class="form-control font-bold" value="145" step="1" />
            </div>

            <button type="button" class="btn btn-primary btn-block" id="run-diag-btn">
              <span>🔍 Diagnose Why Portal Rejected It</span>
            </button>
          </div>

          <div class="results-panel">
            <h3 class="panel-heading">Diagnostic Report & 1-Click Fix</h3>

            <div id="diag-report-box" class="diag-report-container">
              <!-- Dynamically populated -->
            </div>
          </div>

        </div>
      </div>

      <!-- VIEW 3: CHEAT SHEET TABLE -->
      <div id="view-dpi-ref" class="tab-view-content hidden">
        <div class="form-panel-full">
          <h3 class="panel-heading">Govt Exam Dimension & DPI Reference Standards</h3>
          
          <div class="table-responsive mt-2">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Commission & Item</th>
                  <th>Physical Size</th>
                  <th>Pixel Dimensions</th>
                  <th>DPI</th>
                  <th>File Size Limit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>SSC Photograph</strong></td>
                  <td>3.5 × 4.5 cm</td>
                  <td>350 × 450 px</td>
                  <td>~200 DPI</td>
                  <td><span class="badge badge-info">20 KB – 50 KB</span></td>
                </tr>
                <tr>
                  <td><strong>SSC Signature</strong></td>
                  <td>4.0 × 2.0 cm</td>
                  <td>140 × 60 px</td>
                  <td>~100 DPI</td>
                  <td><span class="badge badge-info">10 KB – 20 KB</span></td>
                </tr>
                <tr>
                  <td><strong>UPSC Photograph</strong></td>
                  <td>3.5 × 4.5 cm</td>
                  <td>350 × 350 to 1000 × 1000 px</td>
                  <td>200–300 DPI</td>
                  <td><span class="badge badge-info">20 KB – 300 KB</span></td>
                </tr>
                <tr>
                  <td><strong>IBPS / SBI Photograph</strong></td>
                  <td>3.5 × 4.5 cm</td>
                  <td>200 × 230 px</td>
                  <td>~150 DPI</td>
                  <td><span class="badge badge-info">20 KB – 50 KB</span></td>
                </tr>
                <tr>
                  <td><strong>IBPS / SBI Signature</strong></td>
                  <td>4.0 × 2.0 cm</td>
                  <td>140 × 60 px</td>
                  <td>~100 DPI</td>
                  <td><span class="badge badge-info">10 KB – 20 KB</span></td>
                </tr>
                <tr>
                  <td><strong>IBPS Left Thumb Impression</strong></td>
                  <td>3.0 × 3.0 cm</td>
                  <td>240 × 240 px</td>
                  <td>~200 DPI</td>
                  <td><span class="badge badge-info">20 KB – 50 KB</span></td>
                </tr>
                <tr>
                  <td><strong>A4 Certificate / Marksheet Scan</strong></td>
                  <td>21.0 × 29.7 cm</td>
                  <td>1654 × 2339 px</td>
                  <td>200 DPI</td>
                  <td><span class="badge badge-info">100 KB – 300 KB</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  `;

  // Selectors
  const tabConvert = container.querySelector('#tab-dpi-convert');
  const tabTroubleshoot = container.querySelector('#tab-dpi-troubleshoot');
  const tabRef = container.querySelector('#tab-dpi-ref');

  const viewConvert = container.querySelector('#view-dpi-convert');
  const viewTroubleshoot = container.querySelector('#view-dpi-troubleshoot');
  const viewRef = container.querySelector('#view-dpi-ref');

  // Converter elements
  const physW = container.querySelector('#phys-width');
  const physH = container.querySelector('#phys-height');
  const unitSelect = container.querySelector('#unit-select');
  const dpiSelect = container.querySelector('#dpi-select');
  const customDpiBox = container.querySelector('#custom-dpi-box');
  const customDpiInput = container.querySelector('#custom-dpi-input');
  const calcDpiBtn = container.querySelector('#calc-dpi-btn');

  const resPixelDim = container.querySelector('#res-pixel-dim');
  const resPixelAspect = container.querySelector('#res-pixel-aspect');
  const resTotalMp = container.querySelector('#res-total-mp');
  const resRawSize = container.querySelector('#res-raw-size');
  const resFormulaExplanation = container.querySelector('#res-formula-explanation');

  // Troubleshooter elements
  const diagExam = container.querySelector('#diag-exam-select');
  const diagW = container.querySelector('#diag-w');
  const diagH = container.querySelector('#diag-h');
  const diagSize = container.querySelector('#diag-size');
  const runDiagBtn = container.querySelector('#run-diag-btn');
  const diagReportBox = container.querySelector('#diag-report-box');

  // Tab switching
  tabConvert.addEventListener('click', () => {
    tabConvert.classList.add('active');
    tabTroubleshoot.classList.remove('active');
    tabRef.classList.remove('active');
    viewConvert.classList.remove('hidden');
    viewTroubleshoot.classList.add('hidden');
    viewRef.classList.add('hidden');
  });

  tabTroubleshoot.addEventListener('click', () => {
    tabTroubleshoot.classList.add('active');
    tabConvert.classList.remove('active');
    tabRef.classList.remove('active');
    viewTroubleshoot.classList.remove('hidden');
    viewConvert.classList.add('hidden');
    viewRef.classList.add('hidden');
    runTroubleshooter();
  });

  tabRef.addEventListener('click', () => {
    tabRef.classList.add('active');
    tabConvert.classList.remove('active');
    tabTroubleshoot.classList.remove('active');
    viewRef.classList.remove('hidden');
    viewConvert.classList.add('hidden');
    viewTroubleshoot.classList.add('hidden');
  });

  dpiSelect.addEventListener('change', () => {
    if (dpiSelect.value === 'custom') {
      customDpiBox.classList.remove('hidden');
    } else {
      customDpiBox.classList.add('hidden');
    }
    calculatePixels();
  });

  function calculatePixels() {
    const w = parseFloat(physW.value) || 0;
    const h = parseFloat(physH.value) || 0;
    const unit = unitSelect.value;
    const dpi = dpiSelect.value === 'custom' ? (parseFloat(customDpiInput.value) || 200) : parseFloat(dpiSelect.value);

    // Convert to inches
    let wInches = w;
    let hInches = h;
    if (unit === 'cm') {
      wInches = w / 2.54;
      hInches = h / 2.54;
    } else if (unit === 'mm') {
      wInches = w / 25.4;
      hInches = h / 25.4;
    }

    const pxW = Math.round(wInches * dpi);
    const pxH = Math.round(hInches * dpi);
    const totalPx = pxW * pxH;
    const rawBytes = totalPx * 3; // 24-bit RGB

    resPixelDim.textContent = `${pxW} × ${pxH} px`;
    resPixelAspect.textContent = `Aspect Ratio: ${(pxW / pxH).toFixed(2)} (${w} : ${h} ${unit})`;
    resTotalMp.textContent = totalPx >= 1000000 ? `${(totalPx / 1000000).toFixed(2)} Megapixels` : `${(totalPx / 1000).toFixed(1)} KiloPixels`;
    resRawSize.textContent = `~${(rawBytes / 1024).toFixed(0)} KB uncompressed`;

    resFormulaExplanation.innerHTML = `
      <code>Pixels = (${unit === 'in' ? 'Inches' : unit.toUpperCase() + ' ÷ ' + (unit === 'cm' ? '2.54' : '25.4')}) × ${dpi} DPI</code><br>
      Width: (${w} ÷ ${unit === 'cm' ? '2.54' : '25.4'}) × ${dpi} = <strong>${pxW} px</strong><br>
      Height: (${h} ÷ ${unit === 'cm' ? '2.54' : '25.4'}) × ${dpi} = <strong>${pxH} px</strong>
    `;
  }

  [physW, physH, unitSelect, customDpiInput].forEach(el => el.addEventListener('input', calculatePixels));
  calcDpiBtn.addEventListener('click', calculatePixels);

  // Troubleshooter Logic
  function runTroubleshooter() {
    const exam = diagExam.value;
    const w = parseInt(diagW.value) || 0;
    const h = parseInt(diagH.value) || 0;
    const size = parseFloat(diagSize.value) || 0;

    let issues = [];
    let fixToolHash = '#photo-resizer';
    let fixToolName = 'Passport Photo Resizer';

    if (exam === 'ssc_photo') {
      fixToolHash = '#photo-resizer';
      fixToolName = 'Passport Photo Resizer';
      if (size > 50) issues.push(`❌ <strong>File Size Too Large:</strong> Your file is <strong>${size} KB</strong>, but SSC strictly caps photo uploads at <strong>50 KB</strong>.`);
      if (size < 20) issues.push(`❌ <strong>File Size Too Small:</strong> Your file is <strong>${size} KB</strong> (must be at least 20 KB).`);
      if (w < 200 || h < 250) issues.push(`⚠️ <strong>Resolution Low:</strong> Dimensions (${w}x${h}px) are below recommended clarity (350x450px).`);
    } else if (exam === 'ssc_sig' || exam === 'ibps_sig') {
      fixToolHash = '#signature-crop';
      fixToolName = 'Signature Crop Tool';
      if (size > 20) issues.push(`❌ <strong>File Size Too Large:</strong> Your signature is <strong>${size} KB</strong>, exceeding the strict <strong>20 KB</strong> portal limit.`);
      if (size < 10) issues.push(`❌ <strong>File Size Too Small:</strong> Your signature is <strong>${size} KB</strong> (minimum 10 KB required).`);
      if (w !== 140 || h !== 60) issues.push(`⚠️ <strong>Dimension Mismatch:</strong> Portal mandates exactly <strong>140 × 60 px</strong>. Your file is ${w} × ${h} px.`);
    } else if (exam === 'ibps_photo') {
      fixToolHash = '#photo-resizer';
      fixToolName = 'Passport Photo Resizer';
      if (size > 50) issues.push(`❌ <strong>File Size Too Large:</strong> Size ${size} KB exceeds max 50 KB.`);
      if (size < 20) issues.push(`❌ <strong>File Size Too Small:</strong> Size ${size} KB is below min 20 KB.`);
      if (w !== 200 || h !== 230) issues.push(`⚠️ <strong>IBPS Aspect Mismatch:</strong> IBPS specifies 200 × 230 px. Your image is ${w} × ${h} px.`);
    } else if (exam === 'pdf_cert') {
      fixToolHash = '#pdf-compressor';
      fixToolName = 'PDF Compressor';
      if (size > 300) issues.push(`❌ <strong>PDF Exceeds Portal Limit:</strong> Document size ${size} KB exceeds standard 200–300 KB limit.`);
    }

    if (issues.length === 0) {
      diagReportBox.innerHTML = `
        <div class="alert-box alert-success">
          <h4>✓ Specifications Look Correct!</h4>
          <p>Your file dimensions (${w}x${h}px) and size (${size} KB) fit official parameters. If the portal is still rejecting it, check for non-technical issues (glasses/goggles, blurry selfie, wrong format like PNG instead of JPG).</p>
        </div>
      `;
    } else {
      diagReportBox.innerHTML = `
        <div class="diag-issues-card">
          <h4 class="text-danger font-bold">Identified Portal Rejection Causes (${issues.length}):</h4>
          <ul class="diag-issues-list">
            ${issues.map(iss => `<li>${iss}</li>`).join('')}
          </ul>
          
          <div class="fix-action-box mt-3">
            <p><strong>Recommended Instant Fix:</strong> Fix dimensions and compress to exact KB limits directly in our tool:</p>
            <a href="${fixToolHash}" class="btn btn-primary btn-block">
              <span>🚀 Open ${fixToolName} to Fix Automatically</span>
            </a>
          </div>
        </div>
      `;
    }
  }

  diagExam.addEventListener('change', runTroubleshooter);
  [diagW, diagH, diagSize].forEach(inp => inp.addEventListener('input', runTroubleshooter));
  runDiagBtn.addEventListener('click', runTroubleshooter);

  calculatePixels();
}
