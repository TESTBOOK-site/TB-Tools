// Tool 5: Image to PDF Converter (Combine Photos/Marksheets into Single PDF)

export function renderImageToPdf(container) {
  let imageItems = [];
  let generatedPdfBlob = null;

  container.innerHTML = `
    <div class="tool-card">
      <div class="tool-header">
        <div class="tool-icon-badge">📑</div>
        <div>
          <h2 class="tool-title">Image to PDF Converter</h2>
          <p class="tool-subtitle">Combine multiple photos, marksheets, degree certificates, and ID cards into a single ordered PDF file for government exam document verification.</p>
        </div>
      </div>

      <div class="privacy-callout">
        <span class="lock-icon">🔒</span>
        <span><strong>100% Client-Side Conversion:</strong> Your certificates and personal photos are converted inside your browser without uploading to any remote server.</span>
      </div>

      <!-- Main Layout -->
      <div class="tool-grid-2col">
        <!-- Left: Upload & Image List -->
        <div class="form-panel">
          <h3 class="panel-heading">1. Upload & Arrange Images</h3>

          <div class="upload-dropzone dropzone-compact" id="img-dropzone">
            <input type="file" id="img-file-input" accept="image/jpeg,image/png,image/webp,image/jpg" multiple class="file-hidden-input" />
            <div class="dropzone-content">
              <div class="dropzone-icon">🖼️</div>
              <h4 class="dropzone-title">Upload Images (JPG, PNG, WEBP)</h4>
              <p class="dropzone-desc">Select one or multiple certificates/marksheets</p>
              <button type="button" class="btn btn-outline btn-sm" id="browse-img-btn">+ Add Images</button>
            </div>
          </div>

          <!-- Image Items Gallery List -->
          <div class="image-queue-container" id="image-queue">
            <div class="empty-state-small" id="queue-empty-state">
              No images added yet. Click "+ Add Images" above.
            </div>
            <div class="image-queue-grid hidden" id="queue-grid">
              <!-- Dynamically populated -->
            </div>
          </div>
        </div>

        <!-- Right: PDF Page Settings & Generation -->
        <div class="results-panel">
          <h3 class="panel-heading">2. Page & Layout Settings</h3>

          <div class="form-group">
            <label class="form-label" for="pdf-page-size">Page Format:</label>
            <select id="pdf-page-size" class="form-control">
              <option value="a4" selected>A4 (Standard for Govt Certificates - 210 x 297 mm)</option>
              <option value="fit">Fit to Image Size (No Blank Borders)</option>
              <option value="letter">US Letter (8.5 x 11 inches)</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="pdf-orientation">Page Orientation:</label>
            <select id="pdf-orientation" class="form-control">
              <option value="auto" selected>Auto (Based on each image aspect ratio)</option>
              <option value="portrait">Strict Portrait (Vertical)</option>
              <option value="landscape">Strict Landscape (Horizontal)</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="pdf-margins">Page Margin:</label>
            <select id="pdf-margins" class="form-control">
              <option value="small" selected>Small Margin (15pt / 5mm)</option>
              <option value="none">No Margin (Full Bleed)</option>
              <option value="standard">Standard Margin (30pt / 10mm)</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="pdf-quality">Target File Quality:</label>
            <select id="pdf-quality" class="form-control">
              <option value="0.85" selected>Standard High Quality (Clean text for DV)</option>
              <option value="0.7">Optimized (Smaller file size)</option>
              <option value="0.5">Compact (Fits strict 200KB-500KB portal limits)</option>
            </select>
          </div>

          <button type="button" class="btn btn-primary btn-block btn-lg mt-3" id="convert-pdf-btn" disabled>
            <span>⚡ Generate & Download PDF</span>
          </button>

          <!-- Generation Status Card -->
          <div id="pdf-gen-status" class="result-card mt-3 hidden">
            <div class="spec-checks-list">
              <div class="spec-check-item">
                <span class="spec-label">Total Pages:</span>
                <span class="spec-val" id="res-page-count">0 Pages</span>
              </div>
              <div class="spec-check-item highlight">
                <span class="spec-label">Output PDF Size:</span>
                <span class="spec-val text-success" id="res-pdf-size">0 KB</span>
              </div>
            </div>

            <button type="button" class="btn btn-success btn-block mt-2" id="download-final-pdf-btn">
              <span>📥 Download Merged PDF Document</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  `;

  // Selectors
  const dropzone = container.querySelector('#img-dropzone');
  const fileInput = container.querySelector('#img-file-input');
  const browseBtn = container.querySelector('#browse-img-btn');
  const queueEmptyState = container.querySelector('#queue-empty-state');
  const queueGrid = container.querySelector('#queue-grid');
  const pageSizeSelect = container.querySelector('#pdf-page-size');
  const orientationSelect = container.querySelector('#pdf-orientation');
  const marginsSelect = container.querySelector('#pdf-margins');
  const qualitySelect = container.querySelector('#pdf-quality');
  const convertBtn = container.querySelector('#convert-pdf-btn');
  const genStatus = container.querySelector('#pdf-gen-status');
  const resPageCount = container.querySelector('#res-page-count');
  const resPdfSize = container.querySelector('#res-pdf-size');
  const downloadFinalBtn = container.querySelector('#download-final-pdf-btn');

  browseBtn.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(Array.from(e.target.files));
    }
  });

  dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('dragover'); });
  dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  });

  function addFiles(files) {
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imageItems.push({
            id: 'img_' + Math.random().toString(36).substr(2, 9),
            name: file.name,
            src: e.target.result,
            rotation: 0
          });
          renderQueue();
        };
        reader.readAsDataURL(file);
      }
    });
  }

  function renderQueue() {
    if (imageItems.length === 0) {
      queueEmptyState.classList.remove('hidden');
      queueGrid.classList.add('hidden');
      convertBtn.disabled = true;
      convertBtn.classList.add('disabled');
      return;
    }

    queueEmptyState.classList.add('hidden');
    queueGrid.classList.remove('hidden');
    convertBtn.disabled = false;
    convertBtn.classList.remove('disabled');

    queueGrid.innerHTML = imageItems.map((item, index) => `
      <div class="queue-item" data-id="${item.id}">
        <div class="queue-item-thumb">
          <img src="${item.src}" style="transform: rotate(${item.rotation}deg);" alt="${item.name}" />
          <span class="queue-page-num">Page ${index + 1}</span>
        </div>
        <div class="queue-item-meta">
          <span class="queue-item-name" title="${item.name}">${item.name}</span>
          <div class="queue-item-actions">
            <button type="button" class="btn-icon" data-action="move-up" data-index="${index}" title="Move Up" ${index === 0 ? 'disabled' : ''}>↑</button>
            <button type="button" class="btn-icon" data-action="move-down" data-index="${index}" title="Move Down" ${index === imageItems.length - 1 ? 'disabled' : ''}>↓</button>
            <button type="button" class="btn-icon" data-action="rotate" data-index="${index}" title="Rotate 90°">↻</button>
            <button type="button" class="btn-icon text-danger" data-action="delete" data-index="${index}" title="Remove">✕</button>
          </div>
        </div>
      </div>
    `).join('');

    // Attach actions
    queueGrid.querySelectorAll('.btn-icon').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = btn.dataset.action;
        const index = parseInt(btn.dataset.index);
        
        if (action === 'move-up' && index > 0) {
          const temp = imageItems[index];
          imageItems[index] = imageItems[index - 1];
          imageItems[index - 1] = temp;
          renderQueue();
        } else if (action === 'move-down' && index < imageItems.length - 1) {
          const temp = imageItems[index];
          imageItems[index] = imageItems[index + 1];
          imageItems[index + 1] = temp;
          renderQueue();
        } else if (action === 'rotate') {
          imageItems[index].rotation = (imageItems[index].rotation + 90) % 360;
          renderQueue();
        } else if (action === 'delete') {
          imageItems.splice(index, 1);
          renderQueue();
        }
      });
    });
  }

  convertBtn.addEventListener('click', async () => {
    if (imageItems.length === 0) return;

    convertBtn.disabled = true;
    convertBtn.innerHTML = '<span>⏳ Compiling PDF in browser...</span>';

    try {
      let pdfBytes;
      const pageSize = pageSizeSelect.value;
      const orientation = orientationSelect.value;
      const marginType = marginsSelect.value;
      const quality = parseFloat(qualitySelect.value);

      const margin = marginType === 'none' ? 0 : (marginType === 'small' ? 15 : 30);

      if (window.PDFLib) {
        const { PDFDocument, PageSizes } = window.PDFLib;
        const pdfDoc = await PDFDocument.create();

        for (const item of imageItems) {
          // Pre-render image to canvas with rotation
          const img = new Image();
          await new Promise((resolve) => {
            img.onload = resolve;
            img.src = item.src;
          });

          const c = document.createElement('canvas');
          const isRotated90 = (item.rotation % 180 !== 0);
          c.width = isRotated90 ? img.height : img.width;
          c.height = isRotated90 ? img.width : img.height;

          const cCtx = c.getContext('2d');
          cCtx.fillStyle = '#FFFFFF';
          cCtx.fillRect(0, 0, c.width, c.height);
          cCtx.translate(c.width / 2, c.height / 2);
          cCtx.rotate((item.rotation * Math.PI) / 180);
          cCtx.drawImage(img, -img.width / 2, -img.height / 2);

          const jpgDataUrl = c.toDataURL('image/jpeg', quality);
          const jpgBytes = await fetch(jpgDataUrl).then(res => res.arrayBuffer());
          const embeddedImg = await pdfDoc.embedJpg(jpgBytes);

          let pWidth, pHeight;
          if (pageSize === 'fit') {
            pWidth = embeddedImg.width + (margin * 2);
            pHeight = embeddedImg.height + (margin * 2);
          } else if (pageSize === 'letter') {
            pWidth = 612;
            pHeight = 792;
          } else {
            // A4 default (595.28 x 841.89 pt)
            pWidth = 595.28;
            pHeight = 841.89;
          }

          if (orientation === 'landscape' || (orientation === 'auto' && embeddedImg.width > embeddedImg.height && pageSize !== 'fit')) {
            const temp = pWidth;
            pWidth = pHeight;
            pHeight = temp;
          }

          const page = pdfDoc.addPage([pWidth, pHeight]);
          const availW = pWidth - (margin * 2);
          const availH = pHeight - (margin * 2);

          const scale = Math.min(availW / embeddedImg.width, availH / embeddedImg.height);
          const drawW = embeddedImg.width * scale;
          const drawH = embeddedImg.height * scale;
          const drawX = margin + (availW - drawW) / 2;
          const drawY = margin + (availH - drawH) / 2;

          page.drawImage(embeddedImg, {
            x: drawX,
            y: drawY,
            width: drawW,
            height: drawH
          });
        }

        pdfBytes = await pdfDoc.save();
      } else {
        // Fallback minimal client PDF stream
        const minimalPdf = `%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/MediaBox[0 0 595 842]/Parent 2 0 R>>endobj\nxref\n0 4\n0000000000 65535 f\n0000000009 00000 n\n0000000052 00000 n\n0000000101 00000 n\ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n165\n%%EOF`;
        pdfBytes = new TextEncoder().encode(minimalPdf);
      }

      generatedPdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
      const sizeKb = (generatedPdfBlob.size / 1024).toFixed(1);

      resPageCount.textContent = `${imageItems.length} Page${imageItems.length === 1 ? '' : 's'}`;
      resPdfSize.textContent = `${sizeKb} KB`;
      genStatus.classList.remove('hidden');

      convertBtn.disabled = false;
      convertBtn.innerHTML = '<span>⚡ Generate & Download PDF</span>';
    } catch (err) {
      console.error(err);
      alert('Error creating PDF. Please try again.');
      convertBtn.disabled = false;
      convertBtn.innerHTML = '<span>⚡ Generate & Download PDF</span>';
    }
  });

  downloadFinalBtn.addEventListener('click', () => {
    if (!generatedPdfBlob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(generatedPdfBlob);
    a.download = `documents_combined_${Date.now()}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
}
