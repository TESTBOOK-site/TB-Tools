// Tool 12: Exam Countdown Timer & Target Study Tracker
import { UPCOMING_EXAMS } from '../data/examPresets.js';

export function renderExamCountdown(container) {
  const STORAGE_KEY = 'testbook_tracked_exams_v1';
  let trackedExams = loadSavedExams();
  let timerInterval = null;
  let activeFilter = 'all';

  container.innerHTML = `
    <div class="tool-card">
      <div class="tool-header">
        <div class="tool-icon-badge">⏳</div>
        <div>
          <h2 class="tool-title">Govt Exam Live Countdown & Schedule Tracker</h2>
          <p class="tool-subtitle">Track real-time live countdowns to exam dates, admit card releases, and result declarations for SSC, UPSC, RRB, IBPS, and State PSCs with local browser persistence.</p>
        </div>
      </div>

      <div class="privacy-callout">
        <span class="lock-icon">🔒</span>
        <span><strong>100% Local Device Storage:</strong> Your custom exam targets and study timelines are stored locally in your browser and never uploaded.</span>
      </div>

      <!-- Controls & Add Exam Bar -->
      <div class="countdown-controls-bar">
        <div class="filter-pills" id="countdown-filters">
          <button class="pill-btn active" data-filter="all">All Exams</button>
          <button class="pill-btn" data-filter="SSC">SSC</button>
          <button class="pill-btn" data-filter="UPSC">UPSC</button>
          <button class="pill-btn" data-filter="Railways">Railways</button>
          <button class="pill-btn" data-filter="Banking">Banking</button>
        </div>

        <button type="button" class="btn btn-primary" id="open-add-modal-btn">
          <span>+ Add Custom Exam Target</span>
        </button>
      </div>

      <!-- Live Exam Countdown Grid -->
      <div class="countdown-cards-grid" id="countdown-grid">
        <!-- Dynamically rendered and ticked every second -->
      </div>

      <!-- Add Custom Exam Modal / Drawer -->
      <div class="custom-modal-backdrop hidden" id="add-exam-modal">
        <div class="custom-modal-card">
          <div class="modal-header">
            <h3 class="modal-title">Add New Exam to Track</h3>
            <button type="button" class="btn-close" id="close-modal-btn">✕</button>
          </div>

          <div class="modal-body">
            <div class="form-group">
              <label class="form-label" for="new-exam-name">Exam Name <span class="required">*</span></label>
              <input type="text" id="new-exam-name" class="form-control" placeholder="e.g. BPSC 71st CCE Prelims" />
            </div>

            <div class="form-row">
              <div class="form-group col-6">
                <label class="form-label" for="new-exam-cat">Category:</label>
                <select id="new-exam-cat" class="form-control">
                  <option value="SSC">SSC</option>
                  <option value="UPSC">UPSC</option>
                  <option value="Railways">Railways/RRB</option>
                  <option value="Banking">Banking</option>
                  <option value="State PSC" selected>State PSC</option>
                  <option value="Defence">Defence</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div class="form-group col-6">
                <label class="form-label" for="new-exam-stage">Stage / Tier:</label>
                <input type="text" id="new-exam-stage" class="form-control" placeholder="e.g. Prelims / Tier 1" value="Prelims" />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="new-exam-date">Target Exam Date & Time <span class="required">*</span></label>
              <input type="datetime-local" id="new-exam-date" class="form-control" />
            </div>

            <div class="form-group">
              <label class="form-label" for="new-admit-date">Expected Admit Card Release Date (Optional):</label>
              <input type="datetime-local" id="new-admit-date" class="form-control" />
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-outline" id="cancel-add-btn">Cancel</button>
            <button type="button" class="btn btn-primary" id="save-new-exam-btn">Save & Start Countdown</button>
          </div>
        </div>
      </div>

    </div>
  `;

  // Selectors
  const grid = container.querySelector('#countdown-grid');
  const filterBtns = container.querySelectorAll('#countdown-filters .pill-btn');
  const openModalBtn = container.querySelector('#open-add-modal-btn');
  const modal = container.querySelector('#add-exam-modal');
  const closeModalBtn = container.querySelector('#close-modal-btn');
  const cancelAddBtn = container.querySelector('#cancel-add-btn');
  const saveNewExamBtn = container.querySelector('#save-new-exam-btn');

  const newName = container.querySelector('#new-exam-name');
  const newCat = container.querySelector('#new-exam-cat');
  const newStage = container.querySelector('#new-exam-stage');
  const newDate = container.querySelector('#new-exam-date');
  const newAdmit = container.querySelector('#new-admit-date');

  function loadSavedExams() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('LocalStorage unavailable', e);
    }
    return JSON.parse(JSON.stringify(UPCOMING_EXAMS));
  }

  function saveExams() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trackedExams));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderCards();
    });
  });

  openModalBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    // Set default date to 3 months from now
    const d = new Date();
    d.setMonth(d.getMonth() + 3);
    newDate.value = d.toISOString().slice(0, 16);
  });

  closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));
  cancelAddBtn.addEventListener('click', () => modal.classList.add('hidden'));

  saveNewExamBtn.addEventListener('click', () => {
    const nameVal = newName.value.trim();
    const dateVal = newDate.value;
    if (!nameVal || !dateVal) {
      alert('Please enter Exam Name and Target Date');
      return;
    }

    const newExamObj = {
      id: 'custom_' + Date.now(),
      name: nameVal,
      category: newCat.value,
      stage: newStage.value.trim() || 'Main Exam',
      examDate: dateVal,
      admitCardDate: newAdmit.value || '',
      isCustom: true,
      description: 'Custom tracked exam schedule.'
    };

    trackedExams.unshift(newExamObj);
    saveExams();
    modal.classList.add('hidden');
    newName.value = '';
    renderCards();
  });

  function calculateTimeRemaining(targetDateStr) {
    const target = new Date(targetDateStr).getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) {
      return { isPast: true, days: 0, hours: 0, minutes: 0, seconds: 0, totalHours: 0 };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { isPast: false, days, hours, minutes, seconds, totalHours: Math.floor(diff / (1000 * 60 * 60)) };
  }

  function renderCards() {
    const filtered = trackedExams.filter(e => {
      if (activeFilter === 'all') return true;
      return e.category.toLowerCase().includes(activeFilter.toLowerCase());
    });

    if (filtered.length === 0) {
      grid.innerHTML = `<div class="empty-state-card">No exams match the "${activeFilter}" filter. Click "+ Add Custom Exam Target" to create one.</div>`;
      return;
    }

    grid.innerHTML = filtered.map(exam => {
      const time = calculateTimeRemaining(exam.examDate);
      const examDateFormatted = new Date(exam.examDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });

      let admitText = '';
      if (exam.admitCardDate) {
        const admitTime = calculateTimeRemaining(exam.admitCardDate);
        if (admitTime.isPast) {
          admitText = `<span class="badge badge-success">Admit Card: Out Now</span>`;
        } else {
          admitText = `<span class="badge badge-info">Admit Card: in ~${admitTime.days} Days</span>`;
        }
      }

      return `
        <div class="countdown-card" data-id="${exam.id}">
          <div class="countdown-card-header">
            <div class="exam-title-row">
              <span class="exam-cat-pill">${exam.category}</span>
              <span class="exam-stage-pill">${exam.stage}</span>
            </div>
            ${exam.isCustom ? `<button type="button" class="btn-icon text-danger del-exam-btn" data-id="${exam.id}" title="Remove Exam">✕</button>` : ''}
          </div>

          <h3 class="countdown-exam-name">${exam.name}</h3>
          <p class="countdown-exam-date">Target Date: <strong>${examDateFormatted}</strong></p>

          ${time.isPast ? `
            <div class="countdown-completed-banner">
              🎉 Exam Date has Arrived / Concluded!
            </div>
          ` : `
            <div class="countdown-timer-boxes" data-target="${exam.examDate}">
              <div class="timer-unit">
                <span class="unit-val val-days">${time.days}</span>
                <span class="unit-label">Days</span>
              </div>
              <div class="timer-colon">:</div>
              <div class="timer-unit">
                <span class="unit-val val-hours">${String(time.hours).padStart(2, '0')}</span>
                <span class="unit-label">Hours</span>
              </div>
              <div class="timer-colon">:</div>
              <div class="timer-unit">
                <span class="unit-val val-mins">${String(time.minutes).padStart(2, '0')}</span>
                <span class="unit-label">Mins</span>
              </div>
              <div class="timer-colon">:</div>
              <div class="timer-unit">
                <span class="unit-val val-secs">${String(time.seconds).padStart(2, '0')}</span>
                <span class="unit-label">Secs</span>
              </div>
            </div>
          `}

          <div class="countdown-card-footer">
            ${admitText}
            ${time.days <= 15 && !time.isPast ? `<span class="badge badge-danger">🔥 Final Revision Phase!</span>` : ''}
          </div>
        </div>
      `;
    }).join('');

    // Attach delete listeners
    grid.querySelectorAll('.del-exam-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.dataset.id;
        trackedExams = trackedExams.filter(x => x.id !== id);
        saveExams();
        renderCards();
      });
    });
  }

  function tickTimers() {
    const timerBoxes = grid.querySelectorAll('.countdown-timer-boxes');
    timerBoxes.forEach(box => {
      const targetStr = box.dataset.target;
      if (!targetStr) return;
      const t = calculateTimeRemaining(targetStr);
      if (t.isPast) {
        renderCards();
        return;
      }
      const daysEl = box.querySelector('.val-days');
      const hoursEl = box.querySelector('.val-hours');
      const minsEl = box.querySelector('.val-mins');
      const secsEl = box.querySelector('.val-secs');

      if (daysEl) daysEl.textContent = t.days;
      if (hoursEl) hoursEl.textContent = String(t.hours).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(t.minutes).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(t.seconds).padStart(2, '0');
    });
  }

  renderCards();
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(tickTimers, 1000);
}
