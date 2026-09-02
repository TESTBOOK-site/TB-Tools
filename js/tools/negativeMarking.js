// Tool 8: Negative Marking & Raw Score Calculator
import { MARKING_PRESETS } from '../data/examPresets.js';

export function renderNegativeMarking(container) {
  let activePreset = MARKING_PRESETS[0]; // SSC CGL Tier 1 default

  container.innerHTML = `
    <div class="tool-card">
      <div class="tool-header">
        <div class="tool-icon-badge">🎯</div>
        <div>
          <h2 class="tool-title">Negative Marking & Raw Score Calculator</h2>
          <p class="tool-subtitle">Calculate your net raw score, accuracy percentage, and penalty marks lost across SSC, UPSC, RRB, and Banking exam marking schemes.</p>
        </div>
      </div>

      <div class="privacy-callout">
        <span class="lock-icon">🔒</span>
        <span><strong>100% In-Browser Calculation:</strong> Your answer key marks and test attempts are computed locally and kept completely private.</span>
      </div>

      <!-- Preset Selector Bar -->
      <div class="preset-selector-bar">
        <label class="form-label" for="marking-preset-select"><strong>Select Exam Marking Pattern:</strong></label>
        <select id="marking-preset-select" class="form-control select-lg">
          ${MARKING_PRESETS.map(p => `
            <option value="${p.id}">${p.name} (+${p.marksPerCorrect} / -${p.negativePerWrong.toFixed(2)} • Total ${p.totalQuestions} Qs)</option>
          `).join('')}
        </select>
        <div id="marking-preset-notes" class="preset-badge-note"></div>
      </div>

      <div class="tool-grid-2col">
        
        <!-- Left: User Inputs Form -->
        <div class="form-panel">
          <h3 class="panel-heading">1. Enter Your Answer Key Stats</h3>

          <div class="form-group">
            <label class="form-label" for="total-q-input">Total Questions in Exam:</label>
            <input type="number" id="total-q-input" class="form-control font-bold" value="100" min="1" max="500" />
          </div>

          <div class="form-row">
            <div class="form-group col-6">
              <label class="form-label" for="marks-correct-input">Marks per Correct (+):</label>
              <input type="number" id="marks-correct-input" class="form-control" value="2.0" step="0.1" />
            </div>
            <div class="form-group col-6">
              <label class="form-label" for="penalty-wrong-input">Penalty per Wrong (-):</label>
              <input type="number" id="penalty-wrong-input" class="form-control" value="0.50" step="0.01" />
            </div>
          </div>

          <hr class="form-divider" />

          <div class="form-group">
            <label class="form-label" for="correct-input">Number of Correct Answers (✓):</label>
            <input type="number" id="correct-input" class="form-control form-control-lg text-success font-bold" value="78" min="0" />
          </div>

          <div class="form-group">
            <label class="form-label" for="incorrect-input">Number of Incorrect / Wrong Answers (✗):</label>
            <input type="number" id="incorrect-input" class="form-control form-control-lg text-danger font-bold" value="14" min="0" />
          </div>

          <div class="form-group">
            <label class="form-label" for="unattempted-input">Unattempted Questions (Auto-Calculated):</label>
            <input type="number" id="unattempted-input" class="form-control text-muted" value="8" readonly />
          </div>

          <button type="button" class="btn btn-primary btn-block" id="calc-score-btn">
            <span>⚡ Calculate Raw Score & Analytics</span>
          </button>
        </div>

        <!-- Right: Score Summary & Diagnostics -->
        <div class="results-panel">
          <h3 class="panel-heading">2. Performance & Score Breakdown</h3>

          <div class="score-hero-card">
            <span class="hero-sub">Your Final Net Raw Score</span>
            <div class="hero-amount text-primary" id="net-score-display">149.00</div>
            <span class="hero-annual" id="score-percentage-display">74.5% of Max Marks (200.00)</span>
          </div>

          <div class="stats-mini-grid mt-3">
            <div class="mini-stat-card">
              <span class="mini-stat-label">Positive Marks (+)</span>
              <span class="mini-stat-value text-success" id="res-positive-marks">+156.00</span>
            </div>
            <div class="mini-stat-card">
              <span class="mini-stat-label">Negative Penalty (-)</span>
              <span class="mini-stat-value text-danger" id="res-negative-penalty">-7.00</span>
            </div>
            <div class="mini-stat-card">
              <span class="mini-stat-label">Accuracy Rate</span>
              <span class="mini-stat-value" id="res-accuracy">84.8%</span>
            </div>
            <div class="mini-stat-card">
              <span class="mini-stat-label">Attempt Rate</span>
              <span class="mini-stat-value" id="res-attempt-rate">92.0%</span>
            </div>
          </div>

          <!-- Diagnostic Feedback Alert -->
          <div class="diagnostic-box mt-3" id="diagnostic-box">
            <div class="diag-header">
              <span class="diag-icon" id="diag-icon">💡</span>
              <strong id="diag-title">Attempt Analysis & Advice</strong>
            </div>
            <p class="diag-text" id="diag-message">
              You scored well with 84.8% accuracy. Minimizing those 14 wrong guesses would have saved 7.00 penalty marks!
            </p>
          </div>

        </div>

      </div>

      <div class="disclaimer-note">
        ⚠️ <strong>Note on Normalization:</strong> This is your <em>Raw Score</em> calculated from your response sheet. If your exam is conducted across multiple shifts (e.g. SSC CGL / RRB NTPC), your final rank list score will be normalized based on shift difficulty. Use our <strong>Shift Normalization Estimator</strong> to evaluate shift-adjusted scores.
      </div>
    </div>
  `;

  // Selectors
  const presetSelect = container.querySelector('#marking-preset-select');
  const presetNotes = container.querySelector('#marking-preset-notes');
  const totalQInput = container.querySelector('#total-q-input');
  const marksCorrectInput = container.querySelector('#marks-correct-input');
  const penaltyWrongInput = container.querySelector('#penalty-wrong-input');
  const correctInput = container.querySelector('#correct-input');
  const incorrectInput = container.querySelector('#incorrect-input');
  const unattemptedInput = container.querySelector('#unattempted-input');
  const calcBtn = container.querySelector('#calc-score-btn');

  // Outputs
  const netScoreDisplay = container.querySelector('#net-score-display');
  const scorePercentageDisplay = container.querySelector('#score-percentage-display');
  const resPositiveMarks = container.querySelector('#res-positive-marks');
  const resNegativePenalty = container.querySelector('#res-negative-penalty');
  const resAccuracy = container.querySelector('#res-accuracy');
  const resAttemptRate = container.querySelector('#res-attempt-rate');
  const diagTitle = container.querySelector('#diag-title');
  const diagMessage = container.querySelector('#diag-message');

  function updatePreset() {
    activePreset = MARKING_PRESETS.find(p => p.id === presetSelect.value) || MARKING_PRESETS[0];
    presetNotes.innerHTML = `<strong>${activePreset.name}:</strong> ${activePreset.notes}`;

    totalQInput.value = activePreset.totalQuestions;
    marksCorrectInput.value = activePreset.marksPerCorrect;
    penaltyWrongInput.value = activePreset.negativePerWrong;

    // Adjust default sample attempts proportionally
    const defaultCorrect = Math.round(activePreset.totalQuestions * 0.72);
    const defaultIncorrect = Math.round(activePreset.totalQuestions * 0.14);
    correctInput.value = defaultCorrect;
    incorrectInput.value = defaultIncorrect;

    calculateScores();
  }

  presetSelect.addEventListener('change', updatePreset);
  updatePreset();

  correctInput.addEventListener('input', calculateScores);
  incorrectInput.addEventListener('input', calculateScores);
  totalQInput.addEventListener('input', calculateScores);
  marksCorrectInput.addEventListener('input', calculateScores);
  penaltyWrongInput.addEventListener('input', calculateScores);
  calcBtn.addEventListener('click', calculateScores);

  function calculateScores() {
    const totalQ = parseInt(totalQInput.value) || 100;
    const correct = parseInt(correctInput.value) || 0;
    const incorrect = parseInt(incorrectInput.value) || 0;
    const marksPerCorrect = parseFloat(marksCorrectInput.value) || 1.0;
    const penaltyPerWrong = parseFloat(penaltyWrongInput.value) || 0.25;

    const attempted = correct + incorrect;
    const unattempted = Math.max(0, totalQ - attempted);
    unattemptedInput.value = unattempted;

    const positiveMarks = correct * marksPerCorrect;
    const negativePenalty = incorrect * penaltyPerWrong;
    const netRawScore = Math.max(-totalQ * penaltyPerWrong, positiveMarks - negativePenalty);
    const maxMarks = totalQ * marksPerCorrect;
    const scorePct = ((netRawScore / maxMarks) * 100).toFixed(1);

    const accuracy = attempted > 0 ? ((correct / attempted) * 100).toFixed(1) : 0;
    const attemptRate = totalQ > 0 ? ((attempted / totalQ) * 100).toFixed(1) : 0;

    // Update UI
    netScoreDisplay.textContent = netRawScore.toFixed(2);
    scorePercentageDisplay.textContent = `${scorePct}% of Max Marks (${maxMarks.toFixed(2)})`;
    resPositiveMarks.textContent = `+${positiveMarks.toFixed(2)}`;
    resNegativePenalty.textContent = `-${negativePenalty.toFixed(2)}`;
    resAccuracy.textContent = `${accuracy}%`;
    resAttemptRate.textContent = `${attemptRate}% (${attempted}/${totalQ})`;

    // Diagnostic advice
    if (accuracy >= 90) {
      diagTitle.textContent = 'Excellent Accuracy! 🌟';
      diagMessage.textContent = `Outstanding accuracy of ${accuracy}%. Your negative penalty was kept under control (-${negativePenalty.toFixed(2)} marks).`;
    } else if (accuracy >= 75) {
      diagTitle.textContent = 'Good Performance — Fine-Tune Elimination 🎯';
      diagMessage.textContent = `Solid attempt with ${accuracy}% accuracy. Reducing your ${incorrect} incorrect guesses would have saved ${negativePenalty.toFixed(2)} penalty marks.`;
    } else {
      diagTitle.textContent = 'High Negative Marking Penalty ⚠️';
      diagMessage.textContent = `Your accuracy is ${accuracy}%. You lost ${negativePenalty.toFixed(2)} marks in penalties. Avoid 50-50 blind guesses where you have no solid clue.`;
    }

    // Special check for UPSC CSAT
    if (activePreset.id === 'upsc_csat') {
      if (netRawScore >= 66.0) {
        diagMessage.innerHTML += `<br><span class="badge badge-success mt-1">✓ CSAT Qualifying Threshold (66 Marks) Cleared!</span>`;
      } else {
        diagMessage.innerHTML += `<br><span class="badge badge-danger mt-1">❌ CSAT Qualifying Threshold (66 Marks) Missed by ${(66 - netRawScore).toFixed(2)} marks!</span>`;
      }
    }
  }
}
