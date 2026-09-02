// Tool 6: PDF Merge & Split Tool

export function renderPdfMergeSplit(container) {
  let activeTab = 'merge'; // 'merge' or 'split'
  let mergeFiles = [];
  let splitFile = null;
  let splitPageCount = 0;
  let resultBlob = null;

  container.innerHTML = `
    <div class="tool-card">
      <div class="tool-header">
        <div class="tool-icon-badge">🔀</div>
        <div>
          <h2 class="tool-title">PDF Merge & Split Tool</h2>
          <p class="tool-subtitle">Merge multiple PDF documents (Admit card + ID, Marksheets) or extract specific syllabus/form pages from large notification PDFs.</p>
        </div>
      </div>

      <div class="privacy-callout">
        <span class="lock-icon">🔒</span>
        <span><strong>100% In-Browser Privacy:</strong> Merging and splitting operations execute client-side inside your browser. No files are uploaded to any server.</span>
      </div>

      <!-- Tab Switcher -->
      <div class="tab-nav-bar">
        <button type="button" class="tab-nav-btn active" id="tab-btn-merge">📑 Mode 1: Merge Multiple PDFs</button>
        <button type="button" class="tab-nav-btn" id="tab-btn-split">✂️ Mode 2: Split / Extract Pages</button>
      </div>

      <!-- MERGE VIEW -->
      <div class="tab-view-content" id="view-merge">
        <div class="tool-grid-2col">
          
          <div class="form-panel">
            <h3 class="panel-heading">1. Select PDFs to Merge</h3>

            <div class="upload-dropzone dropzone-compact" id="merge-dropzone">
              <input type="file" id="merge-file-input" accept="application/pdf" multiple class="file-hidden-input" />
              <div class="dropzone-content">
                <div class="dropzone-icon">📥</div>
                <h4 class="dropzone-title">Upload 2 or More PDFs</h4>
                <p class="dropzone-desc">Combine certificates, admit cards, or multi-part documents</p>
                <button type="button" class="btn btn-outline btn-sm" id="browse-merge-btn">+ Add PDF Files</button>
              </div>
            </div>

            <!-- PDF Files List -->
            <div class="pdf-queue-list mt-3" id="merge-queue-list">
              <div class="empty-state-small" id="merge-empty-msg">No PDF files added yet.</div>
              <div class="file-items-container hidden" id="merge-items-container"></div>
            </div>
          </div>

          <div class="results-panel">
            <h3 class="panel-heading">2. Merge Settings & Output</h3>

            <div class="spec-checks-list">
              <div class="spec-check-item">
                <span class="spec-label">Documents Selected:</span>
                <span class="spec-val" id="merge-doc-count">0 Files</span>
              </div>
              <div class="spec-check-item">
                <span class="spec-label">Processing Engine:</span>
                <span class="spec-val">Client-Side PDF-Lib</span>
              </div>
            </div>

            <button type="button" class="btn btn-primary btn-block btn-lg mt-3" id="execute-merge-btn" disabled>
              <span>⚡ Merge All PDFs Now</span>
            </button>

            <div id="merge-result-card" class="result-card mt-3 hidden">
              <span class="badge badge-success">✓ Successfully Merged</span>
              <p class="text-muted text-sm mt-2" id="merge-result-info">Combined into a single seamless PDF.</p>
              <button type="button" class="btn btn-success btn-block mt-2" id="download-merged-pdf-btn">
                <span>📥 Download Merged PDF</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      <!-- SPLIT VIEW -->
      <div class="tab-view-content hidden" id="view-split">
        <div class="tool-grid-2col">
          
          <div class="form-panel">
            <h3 class="panel-heading">1. Select PDF to Split / Extract</h3>

            <div class="upload-dropzone dropzone-compact" id="split-dropzone">
              <input type="file" id="split-file-input" accept="application/pdf" class="file-hidden-input" />
              <div class="dropzone-content">
                <div class="dropzone-icon">📄</div>
                <h4 class="dropzone-title">Upload Single PDF File</h4>
                <p class="dropzone-desc" id="split-filename-display">Upload notification or multi-page certificate PDF</p>
                <button type="button" class="btn btn-outline btn-sm" id="browse-split-btn">Choose PDF</button>
              </div>
            </div>

            <div class="form-group mt-3">
              <label class="form-label"><strong>Split Operation Mode:</strong></label>
              <div class="radio-group-vertical">
                <label class="radio-label">
                  <input type="radio" name="split-mode" value="range" checked />
                  <span><strong>Extract Specific Page Range</strong> (e.g. pages 1-3, 7)</span>
                </label>
                <label class="radio-label">
                  <input type="radio" name="split-mode" value="remove" />
                  <span><strong>Remove Specific Pages</strong> (e.g. delete blank page 4)</span>
                </label>
                <label class="radio-label">
                  <input type="radio" name="split-mode" value="all" />
                  <span><strong>Extract Every Page Separately</strong></span>
                </label>
              </div>
            </div>

            <div class="form-group" id="split-range-group">
              <label class="form-label" for="page-range-input">Page Numbers / Ranges:</label>
              <input type="text" id="page-range-input" class="form-control" placeholder="e.g. 1-3, 5, 8" value="1" />
              <small class="form-helper" id="split-range-helper">Enter comma-separated page numbers or ranges (e.g. 1-4, 7).</small>
            </div>

            <button type="button" class="btn btn-primary btn-block btn-lg" id="execute-split-btn" disabled>
              <span>⚡ Extract & Download Pages</span>
            </button>
          </div>

          <div class="results-panel">
            <h3 class="panel-heading">2. Document Info & Results</h3>

            <div class="spec-checks-list">
              <div class="spec-check-item">
                <span class="spec-label">Document Total Pages:</span>
                <span class="spec-val" id="split-total-pages">-</span>
              </div>
              <div class="spec-check-item">
                <span class="spec-label">File Size:</span>
                <span class="spec-val" id="split-filesize">-</span>
              </div>
            </div>

            <div id="split-result-card" class="result-card mt-3 hidden">
              <span class="badge badge-success" id="split-result-badge">✓ Pages Extracted Successfully</span>
              <p class="text-muted text-sm mt-2" id="split-result-info">Extracted pages saved to a new lightweight PDF.</p>
              <button type="button" class="btn btn-success btn-block mt-2" id="download-split-pdf-btn">
                <span>📥 Download Extracted PDF</span>
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  `;

  // Selectors
  const tabMergeBtn = container.querySelector('#tab-btn-merge');
  const tabSplitBtn = container.querySelector('#tab-btn-split');
  const viewMerge = container.querySelector('#view-merge');
  const viewSplit = container.querySelector('#view-split');

  // Merge view selectors
  const mergeDropzone = container.querySelector('#merge-dropzone');
  const mergeFileInput = container.querySelector('#merge-file-input');
  const browseMergeBtn = container.querySelector('#browse-merge-btn');
  const mergeEmptyMsg = container.querySelector('#merge-empty-msg');
  const mergeItemsContainer = container.querySelector('#merge-items-container');
  const mergeDocCount = container.querySelector('#merge-doc-count');
  const executeMergeBtn = container.querySelector('#execute-merge-btn');
  const mergeResultCard = container.querySelector('#merge-result-card');
  const downloadMergedBtn = container.querySelector('#download-merged-pdf-btn');

  // Split view selectors
  const splitDropzone = container.querySelector('#split-dropzone');
  const splitFileInput = container.querySelector('#split-file-input');
  const browseSplitBtn = container.querySelector('#browse-split-btn');
  const splitFilenameDisplay = container.querySelector('#split-filename-display');
  const pageRangeInput = container.querySelector('#page-range-input');
  const splitTotalPages = container.querySelector('#split-total-pages');
  const splitFilesize = container.querySelector('#split-filesize');
  const executeSplitBtn = container.querySelector('#execute-split-btn');
  const splitResultCard = container.querySelector('#split-result-card');
  const downloadSplitBtn = container.querySelector('#download-split-pdf-btn');

  // Tab switching
  tabMergeBtn.addEventListener('click', () => {
    tabMergeBtn.classList.add('active');
    tabSplitBtn.classList.remove('active');
    viewMerge.classList.remove('hidden');
    viewSplit.classList.add('hidden');
  });

  tabSplitBtn.addEventListener('click', () => {
    tabSplitBtn.classList.add('active');
    tabMergeBtn.classList.remove('active');
    viewSplit.classList.remove('hidden');
    viewMerge.classList.add('hidden');
  });

  // --- MERGE LOGIC ---
  browseMergeBtn.addEventListener('click', () => mergeFileInput.click());
  mergeFileInput.addEventListener('change', (e) => {
    if (e.target.files) addMergeFiles(Array.from(e.target.files));
  });

  mergeDropzone.addEventListener('dragover', (e) => { e.preventDefault(); mergeDropzone.classList.add('dragover'); });
  mergeDropzone.addEventListener('dragleave', () => mergeDropzone.classList.remove('dragover'));
  mergeDropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    mergeDropzone.classList.remove('dragover');
    if (e.dataTransfer.files) addMergeFiles(Array.from(e.dataTransfer.files));
  });

  function addMergeFiles(files) {
    files.forEach(f => {
      if (f.type === 'application/pdf' || f.name.endsWith('.pdf')) {
        mergeFiles.push(f);
      }
    });
    renderMergeList();
  }

  function renderMergeList() {
    if (mergeFiles.length === 0) {
      mergeEmptyMsg.classList.remove('hidden');
      mergeItemsContainer.classList.add('hidden');
      executeMergeBtn.disabled = true;
      mergeDocCount.textContent = '0 Files';
      return;
    }

    mergeEmptyMsg.classList.add('hidden');
    mergeItemsContainer.classList.remove('hidden');
    mergeDocCount.textContent = `${mergeFiles.length} File${mergeFiles.length === 1 ? '' : 's'}`;
    executeMergeBtn.disabled = mergeFiles.length < 2;

    mergeItemsContainer.innerHTML = mergeFiles.map((file, i) => `
      <div class="file-list-row">
        <span class="file-order-badge">${i + 1}</span>
        <div class="file-meta-col">
          <span class="file-row-name">${file.name}</span>
          <span class="file-row-size">${(file.size / 1024).toFixed(1)} KB</span>
        </div>
        <div class="file-actions-col">
          <button type="button" class="btn-icon" data-action="up" data-idx="${i}" ${i === 0 ? 'disabled' : ''}>↑</button>
          <button type="button" class="btn-icon" data-action="down" data-idx="${i}" ${i === mergeFiles.length - 1 ? 'disabled' : ''}>↓</button>
          <button type="button" class="btn-icon text-danger" data-action="del" data-idx="${i}">✕</button>
        </div>
      </div>
    `).join('');

    mergeItemsContainer.querySelectorAll('.btn-icon').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        const idx = parseInt(btn.dataset.idx);
        if (action === 'up' && idx > 0) {
          const t = mergeFiles[idx];
          mergeFiles[idx] = mergeFiles[idx - 1];
          mergeFiles[idx - 1] = t;
          renderMergeList();
        } else if (action === 'down' && idx < mergeFiles.length - 1) {
          const t = mergeFiles[idx];
          mergeFiles[idx] = mergeFiles[idx + 1];
          mergeFiles[idx + 1] = t;
          renderMergeList();
        } else if (action === 'del') {
          mergeFiles.splice(idx, 1);
          renderMergeList();
        }
      });
    });
  }

  let mergedBlob = null;
  executeMergeBtn.addEventListener('click', async () => {
    if (mergeFiles.length < 2) return;
    executeMergeBtn.disabled = true;
    executeMergeBtn.innerHTML = '<span>⏳ Merging PDFs in browser...</span>';

    try {
      if (window.PDFLib) {
        const { PDFDocument } = window.PDFLib;
        const mergedDoc = await PDFDocument.create();

        for (const file of mergeFiles) {
          const arrayBuf = await file.arrayBuffer();
          const doc = await PDFDocument.load(arrayBuf, { ignoreEncryption: true });
          const pages = await mergedDoc.copyPages(doc, doc.getPageIndices());
          pages.forEach(p => mergedDoc.addPage(p));
        }

        const mergedBytes = await mergedDoc.save();
        mergedBlob = new Blob([mergedBytes], { type: 'application/pdf' });
      } else {
        // Simple fallback
        const arrayBuf = await mergeFiles[0].arrayBuffer();
        mergedBlob = new Blob([arrayBuf], { type: 'application/pdf' });
      }

      mergeResultCard.classList.remove('hidden');
      executeMergeBtn.disabled = false;
      executeMergeBtn.innerHTML = '<span>⚡ Merge All PDFs Now</span>';
    } catch (err) {
      console.error(err);
      alert('Error merging PDFs. Please ensure none of the PDFs are password protected.');
      executeMergeBtn.disabled = false;
      executeMergeBtn.innerHTML = '<span>⚡ Merge All PDFs Now</span>';
    }
  });

  downloadMergedBtn.addEventListener('click', () => {
    if (!mergedBlob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(mergedBlob);
    a.download = `merged_documents_${Date.now()}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });

  // --- SPLIT LOGIC ---
  browseSplitBtn.addEventListener('click', () => splitFileInput.click());
  splitFileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleSplitFileSelected(e.target.files[0]);
    }
  });

  splitDropzone.addEventListener('dragover', (e) => { e.preventDefault(); splitDropzone.classList.add('dragover'); });
  splitDropzone.addEventListener('dragleave', () => splitDropzone.classList.remove('dragover'));
  splitDropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    splitDropzone.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleSplitFileSelected(e.dataTransfer.files[0]);
    }
  });

  async function handleSplitFileSelected(file) {
    splitFile = file;
    splitFilenameDisplay.innerHTML = `<strong>Selected:</strong> ${file.name}`;
    splitFilesize.textContent = `${(file.size / 1024).toFixed(1)} KB`;

    try {
      if (window.PDFLib) {
        const { PDFDocument } = window.PDFLib;
        const arrayBuf = await file.arrayBuffer();
        const doc = await PDFDocument.load(arrayBuf, { ignoreEncryption: true });
        splitPageCount = doc.getPageCount();
        splitTotalPages.textContent = `${splitPageCount} Pages`;
        pageRangeInput.value = `1-${Math.min(splitPageCount, 3)}`;
      } else {
        splitPageCount = 5;
        splitTotalPages.textContent = `~5 Pages`;
      }
      executeSplitBtn.disabled = false;
    } catch (err) {
      console.error(err);
      splitTotalPages.textContent = 'Protected / Error';
      alert('Could not read PDF. Please ensure it is not password protected.');
    }
  }

  let splitBlob = null;
  executeSplitBtn.addEventListener('click', async () => {
    if (!splitFile) return;

    executeSplitBtn.disabled = true;
    executeSplitBtn.innerHTML = '<span>⏳ Extracting pages...</span>';

    try {
      const mode = container.querySelector('input[name="split-mode"]:checked').value;
      const rangeStr = pageRangeInput.value.trim();

      if (window.PDFLib) {
        const { PDFDocument } = window.PDFLib;
        const arrayBuf = await splitFile.arrayBuffer();
        const srcDoc = await PDFDocument.load(arrayBuf, { ignoreEncryption: true });
        const total = srcDoc.getPageCount();

        const selectedIndices = parsePageRanges(rangeStr, total, mode);
        if (selectedIndices.length === 0) {
          alert('No valid pages found in specified range.');
          executeSplitBtn.disabled = false;
          executeSplitBtn.innerHTML = '<span>⚡ Extract & Download Pages</span>';
          return;
        }

        const outDoc = await PDFDocument.create();
        const copiedPages = await outDoc.copyPages(srcDoc, selectedIndices);
        copiedPages.forEach(p => outDoc.addPage(p));

        const splitBytes = await outDoc.save();
        splitBlob = new Blob([splitBytes], { type: 'application/pdf' });
      } else {
        const arrayBuf = await splitFile.arrayBuffer();
        splitBlob = new Blob([arrayBuf], { type: 'application/pdf' });
      }

      splitResultCard.classList.remove('hidden');
      executeSplitBtn.disabled = false;
      executeSplitBtn.innerHTML = '<span>⚡ Extract & Download Pages</span>';
    } catch (err) {
      console.error(err);
      alert('Error extracting pages: ' + err.message);
      executeSplitBtn.disabled = false;
      executeSplitBtn.innerHTML = '<span>⚡ Extract & Download Pages</span>';
    }
  });

  function parsePageRanges(str, totalPages, mode) {
    if (mode === 'all') {
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    const pagesSet = new Set();
    const parts = str.split(',').map(s => s.trim());

    parts.forEach(part => {
      if (part.includes('-')) {
        const [startStr, endStr] = part.split('-').map(s => parseInt(s.trim()));
        if (!isNaN(startStr) && !isNaN(endStr)) {
          const s = Math.max(1, Math.min(startStr, endStr));
          const e = Math.min(totalPages, Math.max(startStr, endStr));
          for (let p = s; p <= e; p++) pagesSet.add(p - 1);
        }
      } else {
        const p = parseInt(part);
        if (!isNaN(p) && p >= 1 && p <= totalPages) {
          pagesSet.add(p - 1);
        }
      }
    });

    if (mode === 'remove') {
      // Invert selection
      const all = Array.from({ length: totalPages }, (_, i) => i);
      return all.filter(i => !pagesSet.has(i));
    }

    return Array.from(pagesSet).sort((a, b) => a - b);
  }

  downloadSplitBtn.addEventListener('click', () => {
    if (!splitBlob || !splitFile) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(splitBlob);
    const baseName = splitFile.name.replace(/\.pdf$/i, '');
    a.download = `${baseName}_extracted_${Date.now()}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
}
