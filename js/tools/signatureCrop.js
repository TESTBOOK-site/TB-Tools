// Tool 3: Signature Crop & Resize (Govt Exam Presets + Shadow Cleaner)
import { SIGNATURE_PRESETS } from '../data/examPresets.js';

export function renderSignatureCrop(container) {
  let currentImage = null;
  let cropState = {
    zoom: 1,
    rotation: 0,
    offsetX: 0,
    offsetY: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    autoEnhance: true,
    contrast: 1.3,
    brightness: 1.1,
    threshold: 160
  };
  let processedBlob = null;
  let activePreset = SIGNATURE_PRESETS[0];

  container.innerHTML = `
    <div class="tool-card">
      <div class="tool-header">
        <div class="tool-icon-badge">✍️</div>
        <div>
          <h2 class="tool-title">Signature Crop, Enhance & Resizer</h2>
          <p class="tool-subtitle">Clean shadows from paper photos, enhance ink contrast, and resize strictly to 10KB - 20KB (140x60px) for SSC, IBPS, UPSC, and RRB portals.</p>
        </div>
      </div>

      <div class="privacy-callout">
        <span class="lock-icon">🔒</span>
        <span><strong>100% In-Browser Privacy:</strong> Your signature is cleaned, cropped, and compressed strictly inside your browser. No file is ever sent over the internet.</span>
      </div>

      <!-- Preset Selector Bar -->
      <div class="preset-selector-bar">
        <label class="form-label" for="sig-preset-select"><strong>Select Target Exam Preset:</strong></label>
        <select id="sig-preset-select" class="form-control select-lg">
          ${SIGNATURE_PRESETS.map(p => `
            <option value="${p.id}">${p.name} (${p.minKb}-${p.maxKb} KB, ${p.widthPx}x${p.heightPx} px)</option>
          `).join('')}
        </select>
        <div id="sig-preset-notes" class="preset-badge-note"></div>
      </div>

      <!-- Main Workspace -->
      <div class="photo-workspace-layout" id="sig-workspace">
        
        <!-- Upload Dropzone -->
        <div class="upload-dropzone" id="sig-dropzone">
          <input type="file" id="sig-file-input" accept="image/jpeg,image/png,image/webp,image/jpg" class="file-hidden-input" />
          <div class="dropzone-content">
            <div class="dropzone-icon">📝</div>
            <h3 class="dropzone-title">Upload Signature Photo / Scan</h3>
            <p class="dropzone-desc">Take a photo of your signature with your phone camera or select from gallery</p>
            <div class="dropzone-actions">
              <button type="button" class="btn btn-primary" id="browse-sig-btn">Choose Signature Image</button>
              <button type="button" class="btn btn-outline" id="sample-sig-btn">Load Sample Signature</button>
            </div>
          </div>
        </div>

        <!-- Editor View -->
        <div class="photo-editor-view hidden" id="sig-editor-view">
          <div class="editor-main-area">
            
            <!-- Canvas Viewport -->
            <div class="canvas-viewport-container">
              <div class="viewport-canvas-wrapper" id="sig-canvas-wrapper" style="aspect-ratio: 140 / 60;">
                <canvas id="sig-edit-canvas"></canvas>
                <div class="crop-guides-overlay">
                  <div class="guide-line h-1"></div>
                  <div class="guide-line h-2"></div>
                  <div class="guide-line v-1"></div>
                  <div class="guide-line v-2"></div>
                </div>
              </div>
              <div class="viewport-helper-text">👆 Drag to position signature inside the box</div>
            </div>

            <!-- Toolbar & Enhancement Controls -->
            <div class="editor-controls-toolbar">
              <div class="control-row">
                <label for="sig-zoom-slider">🔍 Zoom:</label>
                <input type="range" id="sig-zoom-slider" min="0.5" max="3" step="0.05" value="1" class="slider-control" />
                <span id="sig-zoom-val">100%</span>
              </div>

              <div class="action-buttons-row">
                <button type="button" class="btn btn-sm btn-secondary" id="sig-rot-left">↺ Rotate 90°</button>
                <button type="button" class="btn btn-sm btn-secondary" id="sig-rot-right">↻ Rotate 90°</button>
                <button type="button" class="btn btn-sm btn-secondary" id="sig-reset-btn">Reset</button>
                <button type="button" class="btn btn-sm btn-outline" id="sig-change-btn">Change Image</button>
              </div>

              <!-- Shadow Cleanup & Ink Filter Box -->
              <div class="filter-enhancement-box">
                <h4 class="box-title">✨ Paper Shadow Cleaner & Ink Contrast Filter</h4>
                
                <div class="custom-checkbox">
                  <input type="checkbox" id="enable-auto-clean" checked />
                  <label for="enable-auto-clean"><strong>Auto-Clean Background Paper Shadows</strong> (Turns grey phone paper to pure white)</label>
                </div>

                <div class="filter-sliders-grid" id="filter-sliders">
                  <div class="slider-group">
                    <label for="clean-threshold">Shadow Removal Level: <span id="threshold-val">Medium</span></label>
                    <input type="range" id="clean-threshold" min="100" max="230" value="160" class="slider-control" />
                  </div>
                  <div class="slider-group">
                    <label for="contrast-slider">Ink Darkness: <span id="contrast-val">High</span></label>
                    <input type="range" id="contrast-slider" min="1.0" max="2.5" step="0.1" value="1.4" class="slider-control" />
                  </div>
                </div>
              </div>

              <!-- Custom Dimensions (if custom preset) -->
              <div class="custom-dim-box hidden" id="sig-custom-box">
                <div class="form-row">
                  <div class="form-group col-3">
                    <label class="form-label">Width (px):</label>
                    <input type="number" id="sig-custom-w" class="form-control form-control-sm" value="140" />
                  </div>
                  <div class="form-group col-3">
                    <label class="form-label">Height (px):</label>
                    <input type="number" id="sig-custom-h" class="form-control form-control-sm" value="60" />
                  </div>
                  <div class="form-group col-3">
                    <label class="form-label">Min KB:</label>
                    <input type="number" id="sig-custom-min" class="form-control form-control-sm" value="10" />
                  </div>
                  <div class="form-group col-3">
                    <label class="form-label">Max KB:</label>
                    <input type="number" id="sig-custom-max" class="form-control form-control-sm" value="20" />
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- Sidebar Preview & Specs -->
          <div class="editor-sidebar-panel">
            <h3 class="panel-heading">Output Preview & Verification</h3>
            
            <div class="output-preview-card">
              <div class="preview-frame sig-frame" id="sig-preview-frame">
                <img id="sig-preview-img" alt="Processed Signature" />
              </div>

              <div class="spec-checks-list">
                <div class="spec-check-item">
                  <span class="spec-label">File Format:</span>
                  <span class="spec-val">JPEG (JPG)</span>
                </div>
                <div class="spec-check-item">
                  <span class="spec-label">Pixel Dimensions:</span>
                  <span class="spec-val" id="sig-spec-dim">140 x 60 px</span>
                </div>
                <div class="spec-check-item">
                  <span class="spec-label">Physical Size:</span>
                  <span class="spec-val" id="sig-spec-cm">4.0 x 2.0 cm</span>
                </div>
                <div class="spec-check-item highlight">
                  <span class="spec-label">Output File Size:</span>
                  <span class="spec-val text-success" id="sig-spec-size">14.2 KB</span>
                </div>
                <div class="spec-check-item">
                  <span class="spec-label">Portal Status:</span>
                  <span class="badge badge-success" id="sig-spec-status">✓ 100% Portal Compliant</span>
                </div>
              </div>

              <button type="button" class="btn btn-primary btn-block btn-lg" id="download-sig-btn">
                <span>📥 Download Ready Signature</span>
              </button>

              <div class="alert-tip">
                💡 <strong>Commission Rule:</strong> Ensure your signature is in running cursive hand (not BLOCK letters) with dark ink.
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  `;

  // Selectors
  const presetSelect = container.querySelector('#sig-preset-select');
  const presetNotes = container.querySelector('#sig-preset-notes');
  const dropzone = container.querySelector('#sig-dropzone');
  const fileInput = container.querySelector('#sig-file-input');
  const browseBtn = container.querySelector('#browse-sig-btn');
  const sampleBtn = container.querySelector('#sample-sig-btn');
  const editorView = container.querySelector('#sig-editor-view');
  const canvas = container.querySelector('#sig-edit-canvas');
  const ctx = canvas.getContext('2d');
  const canvasWrapper = container.querySelector('#sig-canvas-wrapper');
  const zoomSlider = container.querySelector('#sig-zoom-slider');
  const zoomVal = container.querySelector('#sig-zoom-val');
  const rotLeftBtn = container.querySelector('#sig-rot-left');
  const rotRightBtn = container.querySelector('#sig-rot-right');
  const resetBtn = container.querySelector('#sig-reset-btn');
  const changeBtn = container.querySelector('#sig-change-btn');
  const enableAutoClean = container.querySelector('#enable-auto-clean');
  const thresholdSlider = container.querySelector('#clean-threshold');
  const contrastSlider = container.querySelector('#contrast-slider');
  const customBox = container.querySelector('#sig-custom-box');
  const previewImg = container.querySelector('#sig-preview-img');
  const specDim = container.querySelector('#sig-spec-dim');
  const specCm = container.querySelector('#sig-spec-cm');
  const specSize = container.querySelector('#sig-spec-size');
  const specStatus = container.querySelector('#sig-spec-status');
  const downloadBtn = container.querySelector('#download-sig-btn');

  function updatePreset() {
    activePreset = SIGNATURE_PRESETS.find(p => p.id === presetSelect.value) || SIGNATURE_PRESETS[0];
    presetNotes.innerHTML = `<strong>Specs:</strong> ${activePreset.widthPx}x${activePreset.heightPx} px (${activePreset.widthCm}x${activePreset.heightCm} cm) | <strong>Size Limit:</strong> ${activePreset.minKb} KB to ${activePreset.maxKb} KB. ${activePreset.notes}`;

    if (activePreset.id === 'custom_sig') {
      customBox.classList.remove('hidden');
    } else {
      customBox.classList.add('hidden');
    }

    if (currentImage) {
      drawCanvas();
      generateOutput();
    }
  }

  presetSelect.addEventListener('change', updatePreset);
  updatePreset();

  browseBtn.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      loadImage(e.target.files[0]);
    }
  });

  dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('dragover'); });
  dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      loadImage(e.dataTransfer.files[0]);
    }
  });

  sampleBtn.addEventListener('click', () => {
    // Generate an illustrative realistic cursive signature canvas
    const sampleCanvas = document.createElement('canvas');
    sampleCanvas.width = 400;
    sampleCanvas.height = 180;
    const sCtx = sampleCanvas.getContext('2d');

    // Slight realistic paper tone
    sCtx.fillStyle = '#F8F7F2';
    sCtx.fillRect(0, 0, 400, 180);

    // Cursive stroke
    sCtx.strokeStyle = '#0F172A';
    sCtx.lineWidth = 4;
    sCtx.lineCap = 'round';
    sCtx.lineJoin = 'round';

    sCtx.beginPath();
    // First letter 'R'
    sCtx.moveTo(50, 130);
    sCtx.lineTo(60, 50);
    sCtx.bezierCurveTo(70, 40, 110, 40, 110, 75);
    sCtx.bezierCurveTo(110, 100, 70, 100, 60, 100);
    sCtx.bezierCurveTo(80, 105, 110, 130, 120, 135);
    // Flowing letters 'ahul'
    sCtx.bezierCurveTo(130, 120, 140, 95, 150, 105);
    sCtx.bezierCurveTo(160, 115, 165, 80, 175, 110);
    sCtx.bezierCurveTo(185, 120, 195, 90, 205, 125);
    sCtx.bezierCurveTo(215, 130, 230, 100, 240, 115);
    sCtx.bezierCurveTo(250, 120, 270, 80, 285, 130);
    // Flourish underline
    sCtx.moveTo(70, 145);
    sCtx.bezierCurveTo(150, 135, 260, 140, 340, 125);
    sCtx.stroke();

    const img = new Image();
    img.onload = () => {
      currentImage = img;
      onImageLoaded();
    };
    img.src = sampleCanvas.toDataURL('image/jpeg', 0.95);
  });

  function loadImage(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        currentImage = img;
        onImageLoaded();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function onImageLoaded() {
    dropzone.classList.add('hidden');
    editorView.classList.remove('hidden');
    resetCropState();
    drawCanvas();
    generateOutput();
  }

  function resetCropState() {
    cropState.zoom = 1;
    cropState.rotation = 0;
    cropState.offsetX = 0;
    cropState.offsetY = 0;
    zoomSlider.value = 1;
    zoomVal.textContent = '100%';
  }

  changeBtn.addEventListener('click', () => {
    editorView.classList.add('hidden');
    dropzone.classList.remove('hidden');
    fileInput.value = '';
  });

  resetBtn.addEventListener('click', () => {
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

  rotLeftBtn.addEventListener('click', () => {
    cropState.rotation = (cropState.rotation - 90) % 360;
    drawCanvas();
    generateOutput();
  });

  rotRightBtn.addEventListener('click', () => {
    cropState.rotation = (cropState.rotation + 90) % 360;
    drawCanvas();
    generateOutput();
  });

  enableAutoClean.addEventListener('change', () => {
    cropState.autoEnhance = enableAutoClean.checked;
    drawCanvas();
    generateOutput();
  });

  thresholdSlider.addEventListener('input', () => {
    cropState.threshold = parseInt(thresholdSlider.value);
    drawCanvas();
    generateOutput();
  });

  contrastSlider.addEventListener('input', () => {
    cropState.contrast = parseFloat(contrastSlider.value);
    drawCanvas();
    generateOutput();
  });

  // Drag listeners
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

  // Touch
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

  function getTargetDim() {
    if (activePreset.id === 'custom_sig') {
      const w = parseInt(container.querySelector('#sig-custom-w').value) || 140;
      const h = parseInt(container.querySelector('#sig-custom-h').value) || 60;
      const minK = parseInt(container.querySelector('#sig-custom-min').value) || 10;
      const maxK = parseInt(container.querySelector('#sig-custom-max').value) || 20;
      return { widthPx: w, heightPx: h, minKb: minK, maxKb: maxK, widthCm: (w * 2.54 / 200).toFixed(1), heightCm: (h * 2.54 / 200).toFixed(1) };
    }
    return activePreset;
  }

  function applyPaperCleaningFilter(ctx, width, height) {
    if (!cropState.autoEnhance) return;
    const imgData = ctx.getImageData(0, 0, width, height);
    const d = imgData.data;
    const threshold = cropState.threshold;
    const contrast = cropState.contrast;

    for (let i = 0; i < d.length; i += 4) {
      const r = d[i];
      const g = d[i + 1];
      const b = d[i + 2];
      
      // Perceived luminance
      let lum = 0.299 * r + 0.587 * g + 0.114 * b;

      // Contrast stretching
      lum = ((lum - 128) * contrast) + 128;

      if (lum > threshold) {
        // High brightness paper -> Pure White
        d[i] = 255;
        d[i + 1] = 255;
        d[i + 2] = 255;
      } else {
        // Ink -> Sharp Dark
        const factor = Math.max(0, lum / threshold);
        d[i] = Math.round(r * factor * 0.7);
        d[i + 1] = Math.round(g * factor * 0.7);
        d[i + 2] = Math.round(b * factor * 0.8);
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }

  function drawCanvas() {
    if (!currentImage) return;
    const target = getTargetDim();
    const aspect = target.widthPx / target.heightPx;

    const viewW = 350;
    const viewH = Math.round(viewW / aspect);
    canvas.width = viewW;
    canvas.height = viewH;
    canvasWrapper.style.aspectRatio = `${target.widthPx} / ${target.heightPx}`;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, viewW, viewH);
    ctx.save();

    ctx.translate(viewW / 2 + cropState.offsetX, viewH / 2 + cropState.offsetY);
    ctx.rotate((cropState.rotation * Math.PI) / 180);
    ctx.scale(cropState.zoom, cropState.zoom);

    const imgRatio = currentImage.width / currentImage.height;
    let drawW, drawH;
    if (imgRatio > aspect) {
      drawH = viewH;
      drawW = drawH * imgRatio;
    } else {
      drawW = viewW;
      drawH = drawW / imgRatio;
    }
    ctx.drawImage(currentImage, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();

    applyPaperCleaningFilter(ctx, viewW, viewH);
  }

  function generateOutput() {
    if (!currentImage) return;
    const target = getTargetDim();
    const outCanvas = document.createElement('canvas');
    outCanvas.width = target.widthPx;
    outCanvas.height = target.heightPx;
    const outCtx = outCanvas.getContext('2d');

    const aspect = target.widthPx / target.heightPx;
    const scaleFactor = target.widthPx / 350;

    outCtx.fillStyle = '#FFFFFF';
    outCtx.fillRect(0, 0, target.widthPx, target.heightPx);
    outCtx.save();

    outCtx.translate(target.widthPx / 2 + cropState.offsetX * scaleFactor, target.heightPx / 2 + cropState.offsetY * scaleFactor);
    outCtx.rotate((cropState.rotation * Math.PI) / 180);
    outCtx.scale(cropState.zoom, cropState.zoom);

    const imgRatio = currentImage.width / currentImage.height;
    let drawW, drawH;
    if (imgRatio > aspect) {
      drawH = target.heightPx;
      drawW = drawH * imgRatio;
    } else {
      drawW = target.widthPx;
      drawH = drawW / imgRatio;
    }
    outCtx.drawImage(currentImage, -drawW / 2, -drawH / 2, drawW, drawH);
    outCtx.restore();

    applyPaperCleaningFilter(outCtx, target.widthPx, target.heightPx);

    compressSignature(outCanvas, target.minKb, target.maxKb, (blob) => {
      processedBlob = blob;
      const url = URL.createObjectURL(blob);
      previewImg.src = url;

      const sizeKb = (blob.size / 1024).toFixed(1);
      specDim.textContent = `${target.widthPx} x ${target.heightPx} px`;
      specCm.textContent = `${target.widthCm} x ${target.heightCm} cm`;
      specSize.textContent = `${sizeKb} KB`;

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

  function compressSignature(sourceCanvas, minKb, maxKb, callback) {
    let lowQ = 0.1;
    let highQ = 0.98;
    let iterations = 0;

    function tryQ(q) {
      sourceCanvas.toBlob((blob) => {
        if (!blob) return;
        iterations++;
        const kb = blob.size / 1024;

        if (kb >= minKb && kb <= maxKb) {
          callback(blob);
          return;
        }

        if (kb > maxKb) {
          highQ = q;
        } else {
          lowQ = q;
        }

        if (iterations < 7 && Math.abs(highQ - lowQ) > 0.05) {
          tryQ((lowQ + highQ) / 2);
        } else {
          callback(blob);
        }
      }, 'image/jpeg', q);
    }

    tryQ(0.85);
  }

  downloadBtn.addEventListener('click', () => {
    if (!processedBlob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(processedBlob);
    a.download = `${activePreset.id}_${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
}
