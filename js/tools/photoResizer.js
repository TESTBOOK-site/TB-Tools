// Tool 2: Passport Photo Resizer & Govt Exam Compressor
import { PHOTO_PRESETS } from '../data/examPresets.js';

export function renderPhotoResizer(container) {
  let currentImage = null;
  let cropState = {
    zoom: 1,
    rotation: 0,
    flipH: false,
    offsetX: 0,
    offsetY: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0
  };
  let processedBlob = null;
  let activePreset = PHOTO_PRESETS[0];

  container.innerHTML = `
    <div class="tool-card">
      <div class="tool-header">
        <div class="tool-icon-badge">📷</div>
        <div>
          <h2 class="tool-title">Passport Photo Resizer for Govt Exams</h2>
          <p class="tool-subtitle">Auto-crop and compress your photograph to official dimensions and exact file size (20KB - 50KB) for SSC, UPSC, RRB, IBPS, and State PSC portals.</p>
        </div>
      </div>

      <div class="privacy-callout">
        <span class="lock-icon">🔒</span>
        <span><strong>100% Client-Side Privacy:</strong> Your photo is processed entirely inside your browser canvas. No image is ever uploaded to or stored on any server.</span>
      </div>

      <!-- Preset Selector Bar -->
      <div class="preset-selector-bar">
        <label class="form-label" for="photo-preset-select"><strong>Select Target Exam Preset:</strong></label>
        <select id="photo-preset-select" class="form-control select-lg">
          ${PHOTO_PRESETS.map(p => `
            <option value="${p.id}">${p.name} (${p.minKb}-${p.maxKb} KB, ${p.widthPx}x${p.heightPx} px)</option>
          `).join('')}
        </select>
        <div id="preset-notes" class="preset-badge-note"></div>
      </div>

      <!-- Upload / Workspace Area -->
      <div class="photo-workspace-layout" id="workspace-layout">
        
        <!-- Upload Dropzone (shown initially) -->
        <div class="upload-dropzone" id="photo-dropzone">
          <input type="file" id="photo-file-input" accept="image/jpeg,image/png,image/webp,image/jpg" class="file-hidden-input" />
          <div class="dropzone-content">
            <div class="dropzone-icon">🖼️</div>
            <h3 class="dropzone-title">Click to Upload Photo or Drag & Drop</h3>
            <p class="dropzone-desc">Supports JPG, PNG, WEBP from phone camera or gallery</p>
            <div class="dropzone-actions">
              <button type="button" class="btn btn-primary" id="browse-photo-btn">Choose Photo</button>
              <button type="button" class="btn btn-outline" id="sample-photo-btn">Load Sample Photo</button>
            </div>
          </div>
        </div>

        <!-- Editor View (shown after image load) -->
        <div class="photo-editor-view hidden" id="photo-editor-view">
          <div class="editor-main-area">
            
            <!-- Canvas Crop Viewport -->
            <div class="canvas-viewport-container">
              <div class="viewport-canvas-wrapper" id="canvas-wrapper">
                <canvas id="photo-edit-canvas"></canvas>
                <div class="crop-guides-overlay" id="crop-overlay">
                  <div class="face-guide-oval"></div>
                  <div class="guide-line h-1"></div>
                  <div class="guide-line h-2"></div>
                  <div class="guide-line v-1"></div>
                  <div class="guide-line v-2"></div>
                </div>
              </div>
              <div class="viewport-helper-text">👆 Drag to position face • Use zoom slider below to frame passport photo</div>
            </div>

            <!-- Controls Toolbar -->
            <div class="editor-controls-toolbar">
              <div class="control-row">
                <label for="zoom-slider">🔍 Zoom:</label>
                <input type="range" id="zoom-slider" min="0.5" max="3" step="0.05" value="1" class="slider-control" />
                <span id="zoom-val">100%</span>
              </div>

              <div class="action-buttons-row">
                <button type="button" class="btn btn-sm btn-secondary" id="rotate-left-btn">↺ Rotate 90°</button>
                <button type="button" class="btn btn-sm btn-secondary" id="rotate-right-btn">↻ Rotate 90°</button>
                <button type="button" class="btn btn-sm btn-secondary" id="flip-btn">⇄ Flip</button>
                <button type="button" class="btn btn-sm btn-secondary" id="reset-crop-btn">Reset</button>
                <button type="button" class="btn btn-sm btn-outline" id="change-photo-btn">Change Photo</button>
              </div>

              <!-- Name & Date of Photo (DOP) Overlay Option -->
              <div class="dop-option-box" id="dop-box">
                <div class="custom-checkbox">
                  <input type="checkbox" id="enable-dop" />
                  <label for="enable-dop"><strong>Add Name & Date of Photo (DOP) strip</strong> (Mandatory for UPSC / SSC specific posts)</label>
                </div>
                
                <div class="dop-inputs-row hidden" id="dop-inputs">
                  <div class="form-group flex-1">
                    <label class="form-label" for="dop-name">Full Name:</label>
                    <input type="text" id="dop-name" class="form-control form-control-sm" placeholder="e.g. RAHUL KUMAR" value="CANDIDATE NAME" />
                  </div>
                  <div class="form-group flex-1">
                    <label class="form-label" for="dop-date">Date of Photo (DOP):</label>
                    <input type="date" id="dop-date" class="form-control form-control-sm" value="${new Date().toISOString().split('T')[0]}" />
                  </div>
                </div>
              </div>

              <!-- Custom Dimensions Controls (shown if custom preset) -->
              <div class="custom-dim-box hidden" id="custom-dim-box">
                <div class="form-row">
                  <div class="form-group col-3">
                    <label class="form-label">Width (px):</label>
                    <input type="number" id="custom-w" class="form-control form-control-sm" value="350" />
                  </div>
                  <div class="form-group col-3">
                    <label class="form-label">Height (px):</label>
                    <input type="number" id="custom-h" class="form-control form-control-sm" value="450" />
                  </div>
                  <div class="form-group col-3">
                    <label class="form-label">Min KB:</label>
                    <input type="number" id="custom-min-kb" class="form-control form-control-sm" value="20" />
                  </div>
                  <div class="form-group col-3">
                    <label class="form-label">Max KB:</label>
                    <input type="number" id="custom-max-kb" class="form-control form-control-sm" value="50" />
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- Preview & Download Sidebar -->
          <div class="editor-sidebar-panel">
            <h3 class="panel-heading">Output Preview & Verification</h3>
            
            <div class="output-preview-card">
              <div class="preview-frame" id="output-preview-frame">
                <img id="output-preview-img" alt="Processed Passport Photo" />
              </div>

              <div class="spec-checks-list">
                <div class="spec-check-item">
                  <span class="spec-label">File Format:</span>
                  <span class="spec-val" id="spec-format">JPEG (JPG)</span>
                </div>
                <div class="spec-check-item">
                  <span class="spec-label">Pixel Dimensions:</span>
                  <span class="spec-val" id="spec-dimensions">350 x 450 px</span>
                </div>
                <div class="spec-check-item">
                  <span class="spec-label">Physical Size:</span>
                  <span class="spec-val" id="spec-cm">3.5 x 4.5 cm</span>
                </div>
                <div class="spec-check-item highlight">
                  <span class="spec-label">Output File Size:</span>
                  <span class="spec-val text-success" id="spec-filesize">Checking...</span>
                </div>
                <div class="spec-check-item">
                  <span class="spec-label">Portal Status:</span>
                  <span class="badge badge-success" id="spec-status">✓ 100% Portal Compliant</span>
                </div>
              </div>

              <button type="button" class="btn btn-primary btn-block btn-lg" id="download-photo-btn">
                <span>📥 Download Ready Photo</span>
              </button>

              <p class="download-note">File will download as high-quality standard JPEG matching commission portal requirements.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  `;

  // Element selections
  const presetSelect = container.querySelector('#photo-preset-select');
  const presetNotes = container.querySelector('#preset-notes');
  const dropzone = container.querySelector('#photo-dropzone');
  const fileInput = container.querySelector('#photo-file-input');
  const browseBtn = container.querySelector('#browse-photo-btn');
  const sampleBtn = container.querySelector('#sample-photo-btn');
  const editorView = container.querySelector('#photo-editor-view');
  const canvas = container.querySelector('#photo-edit-canvas');
  const ctx = canvas.getContext('2d');
  const canvasWrapper = container.querySelector('#canvas-wrapper');
  const zoomSlider = container.querySelector('#zoom-slider');
  const zoomVal = container.querySelector('#zoom-val');
  const rotateLeftBtn = container.querySelector('#rotate-left-btn');
  const rotateRightBtn = container.querySelector('#rotate-right-btn');
  const flipBtn = container.querySelector('#flip-btn');
  const resetCropBtn = container.querySelector('#reset-crop-btn');
  const changePhotoBtn = container.querySelector('#change-photo-btn');
  const enableDop = container.querySelector('#enable-dop');
  const dopInputs = container.querySelector('#dop-inputs');
  const dopName = container.querySelector('#dop-name');
  const dopDate = container.querySelector('#dop-date');
  const customDimBox = container.querySelector('#custom-dim-box');
  const outputPreviewImg = container.querySelector('#output-preview-img');
  const specDimensions = container.querySelector('#spec-dimensions');
  const specCm = container.querySelector('#spec-cm');
  const specFilesize = container.querySelector('#spec-filesize');
  const specStatus = container.querySelector('#spec-status');
  const downloadBtn = container.querySelector('#download-photo-btn');

  function updatePresetDetails() {
    activePreset = PHOTO_PRESETS.find(p => p.id === presetSelect.value) || PHOTO_PRESETS[0];
    presetNotes.innerHTML = `<strong>Specs:</strong> ${activePreset.widthPx}x${activePreset.heightPx} px (${activePreset.widthCm}x${activePreset.heightCm} cm) | <strong>Size Limit:</strong> ${activePreset.minKb} KB to ${activePreset.maxKb} KB. ${activePreset.notes}`;
    
    if (activePreset.id === 'custom') {
      customDimBox.classList.remove('hidden');
    } else {
      customDimBox.classList.add('hidden');
    }

    if (activePreset.id === 'upsc') {
      enableDop.checked = true;
      dopInputs.classList.remove('hidden');
    }

    if (currentImage) {
      drawCanvas();
      generateOutput();
    }
  }

  presetSelect.addEventListener('change', updatePresetDetails);
  updatePresetDetails();

  // File loading
  browseBtn.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      loadImageFromFile(e.target.files[0]);
    }
  });

  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });

  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('dragover');
  });

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      loadImageFromFile(e.dataTransfer.files[0]);
    }
  });

  sampleBtn.addEventListener('click', () => {
    // Generate an illustrative passport-style sample avatar canvas
    const sampleCanvas = document.createElement('canvas');
    sampleCanvas.width = 600;
    sampleCanvas.height = 750;
    const sCtx = sampleCanvas.getContext('2d');
    
    // Background (clean light blue/white)
    sCtx.fillStyle = '#E8F0FE';
    sCtx.fillRect(0, 0, 600, 750);
    
    // Body / Shoulders
    sCtx.fillStyle = '#1E3A8A';
    sCtx.beginPath();
    sCtx.ellipse(300, 700, 240, 200, 0, 0, Math.PI * 2);
    sCtx.fill();

    // Collar
    sCtx.fillStyle = '#FFFFFF';
    sCtx.beginPath();
    sCtx.moveTo(250, 520);
    sCtx.lineTo(300, 590);
    sCtx.lineTo(350, 520);
    sCtx.fill();

    // Neck
    sCtx.fillStyle = '#E0AC69';
    sCtx.fillRect(265, 430, 70, 110);

    // Head
    sCtx.fillStyle = '#F1C27D';
    sCtx.beginPath();
    sCtx.ellipse(300, 330, 120, 150, 0, 0, Math.PI * 2);
    sCtx.fill();

    // Hair
    sCtx.fillStyle = '#2B1D0C';
    sCtx.beginPath();
    sCtx.arc(300, 260, 130, Math.PI, 0);
    sCtx.fill();

    // Eyes
    sCtx.fillStyle = '#2D3748';
    sCtx.beginPath();
    sCtx.ellipse(260, 320, 10, 6, 0, 0, Math.PI * 2);
    sCtx.ellipse(340, 320, 10, 6, 0, 0, Math.PI * 2);
    sCtx.fill();

    // Smile
    sCtx.strokeStyle = '#99582A';
    sCtx.lineWidth = 4;
    sCtx.beginPath();
    sCtx.arc(300, 370, 35, 0.2, Math.PI - 0.2);
    sCtx.stroke();

    const img = new Image();
    img.onload = () => {
      currentImage = img;
      onImageReady();
    };
    img.src = sampleCanvas.toDataURL('image/jpeg', 0.95);
  });

  function loadImageFromFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        currentImage = img;
        onImageReady();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function onImageReady() {
    dropzone.classList.add('hidden');
    editorView.classList.remove('hidden');
    resetCropState();
    drawCanvas();
    generateOutput();
  }

  function resetCropState() {
    cropState = {
      zoom: 1,
      rotation: 0,
      flipH: false,
      offsetX: 0,
      offsetY: 0,
      isDragging: false,
      dragStartX: 0,
      dragStartY: 0
    };
    zoomSlider.value = 1;
    zoomVal.textContent = '100%';
  }

  changePhotoBtn.addEventListener('click', () => {
    editorView.classList.add('hidden');
    dropzone.classList.remove('hidden');
    fileInput.value = '';
  });

  resetCropBtn.addEventListener('click', () => {
    resetCropState();
    drawCanvas();
    generateOutput();
  });

  zoomSlider.addEventListener('input', () => {
    cropState.zoom = parseFloat(zoomSlider.value);
    zoomVal.textContent = Math.round(cropState.zoom * 100) + '%';
    drawCanvas();
    generateOutput();
  });

  rotateLeftBtn.addEventListener('click', () => {
    cropState.rotation = (cropState.rotation - 90) % 360;
    drawCanvas();
    generateOutput();
  });

  rotateRightBtn.addEventListener('click', () => {
    cropState.rotation = (cropState.rotation + 90) % 360;
    drawCanvas();
    generateOutput();
  });

  flipBtn.addEventListener('click', () => {
    cropState.flipH = !cropState.flipH;
    drawCanvas();
    generateOutput();
  });

  enableDop.addEventListener('change', () => {
    if (enableDop.checked) {
      dopInputs.classList.remove('hidden');
    } else {
      dopInputs.classList.add('hidden');
    }
    drawCanvas();
    generateOutput();
  });

  dopName.addEventListener('input', () => { drawCanvas(); generateOutput(); });
  dopDate.addEventListener('input', () => { drawCanvas(); generateOutput(); });

  // Mouse & Touch Pan on Canvas
  canvasWrapper.addEventListener('mousedown', (e) => {
    cropState.isDragging = true;
    cropState.dragStartX = e.clientX - cropState.offsetX;
    cropState.dragStartY = e.clientY - cropState.offsetY;
  });

  window.addEventListener('mousemove', (e) => {
    if (!cropState.isDragging) return;
    cropState.offsetX = e.clientX - cropState.dragStartX;
    cropState.offsetY = e.clientY - cropState.dragStartY;
    drawCanvas();
  });

  window.addEventListener('mouseup', () => {
    if (cropState.isDragging) {
      cropState.isDragging = false;
      generateOutput();
    }
  });

  // Touch handlers
  canvasWrapper.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      cropState.isDragging = true;
      cropState.dragStartX = e.touches[0].clientX - cropState.offsetX;
      cropState.dragStartY = e.touches[0].clientY - cropState.offsetY;
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!cropState.isDragging || e.touches.length !== 1) return;
    cropState.offsetX = e.touches[0].clientX - cropState.dragStartX;
    cropState.offsetY = e.touches[0].clientY - cropState.dragStartY;
    drawCanvas();
  }, { passive: true });

  window.addEventListener('touchend', () => {
    if (cropState.isDragging) {
      cropState.isDragging = false;
      generateOutput();
    }
  });

  function getTargetDimensions() {
    if (activePreset.id === 'custom') {
      const w = parseInt(container.querySelector('#custom-w').value) || 350;
      const h = parseInt(container.querySelector('#custom-h').value) || 450;
      const minK = parseInt(container.querySelector('#custom-min-kb').value) || 20;
      const maxK = parseInt(container.querySelector('#custom-max-kb').value) || 50;
      return { widthPx: w, heightPx: h, minKb: minK, maxKb: maxK, widthCm: (w * 2.54 / 200).toFixed(1), heightCm: (h * 2.54 / 200).toFixed(1) };
    }
    return activePreset;
  }

  function drawCanvas() {
    if (!currentImage) return;

    const target = getTargetDimensions();
    const displayAspect = target.widthPx / target.heightPx;
    
    // Canvas viewport internal resolution
    const viewW = 350;
    const viewH = viewW / displayAspect;
    canvas.width = viewW;
    canvas.height = viewH;
    canvasWrapper.style.aspectRatio = `${target.widthPx} / ${target.heightPx}`;

    ctx.clearRect(0, 0, viewW, viewH);
    ctx.save();

    // Center transform
    ctx.translate(viewW / 2 + cropState.offsetX, viewH / 2 + cropState.offsetY);
    ctx.rotate((cropState.rotation * Math.PI) / 180);
    ctx.scale(cropState.flipH ? -cropState.zoom : cropState.zoom, cropState.zoom);

    // Draw base image centered
    const imgRatio = currentImage.width / currentImage.height;
    let drawW, drawH;
    if (imgRatio > displayAspect) {
      drawH = viewH;
      drawW = drawH * imgRatio;
    } else {
      drawW = viewW;
      drawH = drawW / imgRatio;
    }
    ctx.drawImage(currentImage, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();

    // Draw DOP Banner if enabled
    if (enableDop.checked) {
      const bannerHeight = Math.round(viewH * 0.16);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, viewH - bannerHeight, viewW, bannerHeight);
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 1;
      ctx.strokeRect(0, viewH - bannerHeight, viewW, bannerHeight);

      ctx.fillStyle = '#0F172A';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const nameText = (dopName.value || 'NAME').toUpperCase();
      const dateVal = dopDate.value ? new Date(dopDate.value + 'T00:00:00') : new Date();
      const dateText = 'DOP: ' + dateVal.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');

      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(nameText, viewW / 2, viewH - bannerHeight * 0.65);
      ctx.font = '11px sans-serif';
      ctx.fillText(dateText, viewW / 2, viewH - bannerHeight * 0.25);
    }
  }

  // Generate output image at exact target specs with binary compression
  function generateOutput() {
    if (!currentImage) return;

    const target = getTargetDimensions();
    const outCanvas = document.createElement('canvas');
    outCanvas.width = target.widthPx;
    outCanvas.height = target.heightPx;
    const outCtx = outCanvas.getContext('2d');

    const displayAspect = target.widthPx / target.heightPx;
    const scaleFactor = target.widthPx / 350;

    outCtx.fillStyle = '#FFFFFF';
    outCtx.fillRect(0, 0, target.widthPx, target.heightPx);
    outCtx.save();

    outCtx.translate(target.widthPx / 2 + cropState.offsetX * scaleFactor, target.heightPx / 2 + cropState.offsetY * scaleFactor);
    outCtx.rotate((cropState.rotation * Math.PI) / 180);
    outCtx.scale(cropState.flipH ? -cropState.zoom : cropState.zoom, cropState.zoom);

    const imgRatio = currentImage.width / currentImage.height;
    let drawW, drawH;
    if (imgRatio > displayAspect) {
      drawH = target.heightPx;
      drawW = drawH * imgRatio;
    } else {
      drawW = target.widthPx;
      drawH = drawW / imgRatio;
    }
    outCtx.drawImage(currentImage, -drawW / 2, -drawH / 2, drawW, drawH);
    outCtx.restore();

    // Draw high-res DOP Banner if enabled
    if (enableDop.checked) {
      const bannerH = Math.round(target.heightPx * 0.16);
      outCtx.fillStyle = '#FFFFFF';
      outCtx.fillRect(0, target.heightPx - bannerH, target.widthPx, bannerH);
      outCtx.strokeStyle = '#CCCCCC';
      outCtx.lineWidth = 1;
      outCtx.strokeRect(0, target.heightPx - bannerH, target.widthPx, bannerH);

      outCtx.fillStyle = '#000000';
      outCtx.textAlign = 'center';
      outCtx.textBaseline = 'middle';

      const nameText = (dopName.value || 'NAME').toUpperCase();
      const dateVal = dopDate.value ? new Date(dopDate.value + 'T00:00:00') : new Date();
      const dateText = 'DOP: ' + dateVal.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');

      const fontSize1 = Math.max(12, Math.round(target.heightPx * 0.042));
      const fontSize2 = Math.max(10, Math.round(target.heightPx * 0.036));

      outCtx.font = `bold ${fontSize1}px sans-serif`;
      outCtx.fillText(nameText, target.widthPx / 2, target.heightPx - bannerH * 0.65);
      outCtx.font = `${fontSize2}px sans-serif`;
      outCtx.fillText(dateText, target.widthPx / 2, target.heightPx - bannerH * 0.25);
    }

    // Binary search compression for target file size
    compressToTarget(outCanvas, target.minKb, target.maxKb, (blob) => {
      processedBlob = blob;
      const url = URL.createObjectURL(blob);
      outputPreviewImg.src = url;

      const sizeKb = (blob.size / 1024).toFixed(1);
      specDimensions.textContent = `${target.widthPx} x ${target.heightPx} px`;
      specCm.textContent = `${target.widthCm} x ${target.heightCm} cm`;
      specFilesize.textContent = `${sizeKb} KB`;

      if (sizeKb >= target.minKb && sizeKb <= target.maxKb) {
        specStatus.className = 'badge badge-success';
        specStatus.textContent = `✓ Compliant (${target.minKb}-${target.maxKb} KB)`;
      } else if (sizeKb < target.minKb) {
        specStatus.className = 'badge badge-warning';
        specStatus.textContent = `⚠️ Below ${target.minKb} KB`;
      } else {
        specStatus.className = 'badge badge-danger';
        specStatus.textContent = `❌ Exceeds ${target.maxKb} KB`;
      }
    });
  }

  // Iterative binary search to land in exact minKb-maxKb interval
  function compressToTarget(sourceCanvas, minKb, maxKb, callback) {
    let lowQuality = 0.1;
    let highQuality = 0.98;
    let bestBlob = null;
    let iterations = 0;

    function tryQuality(q) {
      sourceCanvas.toBlob((blob) => {
        if (!blob) return;
        iterations++;
        const kb = blob.size / 1024;

        if (kb >= minKb && kb <= maxKb) {
          callback(blob);
          return;
        }

        if (kb > maxKb) {
          highQuality = q;
        } else {
          lowQuality = q;
          bestBlob = blob;
        }

        if (iterations < 7 && Math.abs(highQuality - lowQuality) > 0.05) {
          const nextQ = (lowQuality + highQuality) / 2;
          tryQuality(nextQ);
        } else {
          // Return closest achieved blob
          callback(blob);
        }
      }, 'image/jpeg', q);
    }

    tryQuality(0.85);
  }

  downloadBtn.addEventListener('click', () => {
    if (!processedBlob) return;
    const a = document.createElement('a');
    const filename = `${activePreset.id}_photo_${Date.now()}.jpg`;
    a.href = URL.createObjectURL(processedBlob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
}
