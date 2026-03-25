function toggleMenu() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  btn.classList.toggle('open');
  menu.classList.toggle('open');
}

function openOverlay() {
  document.getElementById('menu-overlay').classList.add('open');
}

function closeOverlay() {
  document.getElementById('menu-overlay').classList.remove('open');
}

function toggleFaq(btn) {
  const item = btn.parentElement;
  const wasOpen = item.classList.contains('open');
  // Close all
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  // Toggle clicked one
  if (!wasOpen) item.classList.add('open');
}

// ── Community Sketch Pad ─────────────────────────────
(function() {
  let canvas, ctx, isDrawing = false;
  let currentColor = '#3D2623';
  let brushSize = 4;
  let history = [];
  let hasDrawn = false;

  function initSketchPad() {
    canvas = document.getElementById('sketch-canvas');
    if (!canvas) return;

    // Load Weekly Prompt
    if (typeof SKETCH_PROMPTS !== 'undefined' && SKETCH_PROMPTS.length > 0) {
      const weekIndex = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
      const currentPromptText = SKETCH_PROMPTS[weekIndex % SKETCH_PROMPTS.length];
      const promptEl = document.getElementById('weekly-prompt-text');
      if (promptEl) promptEl.textContent = currentPromptText;
    }

    ctx = canvas.getContext('2d');

    // Set canvas resolution properly
    function resizeCanvas() {
      const wrapper = canvas.parentElement;
      const rect = wrapper.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      const isMobile = window.innerWidth <= 768;
      // On mobile, give a generous minimum height (for example, 70vh) to offset the toolbar size.
      const targetHeight = isMobile ? Math.max(550, window.innerHeight * 0.65) : Math.max(400, rect.width * 0.5);
      
      canvas.width = rect.width * dpr;
      canvas.height = targetHeight * dpr;
      canvas.style.height = targetHeight + 'px';
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      // Redraw from history
      redrawHistory();
    }

    function redrawHistory() {
      history.forEach(stroke => {
        ctx.beginPath();
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.size;
        stroke.points.forEach((pt, i) => {
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();
      });
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let currentStroke = null;

    function getPos(e) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / (window.devicePixelRatio || 1) / rect.width;
      const scaleY = canvas.height / (window.devicePixelRatio || 1) / rect.height;
      let x, y;
      if (e.touches) {
        x = (e.touches[0].clientX - rect.left) * scaleX;
        y = (e.touches[0].clientY - rect.top) * scaleY;
      } else {
        x = (e.clientX - rect.left) * scaleX;
        y = (e.clientY - rect.top) * scaleY;
      }
      return { x, y };
    }

    function startDraw(e) {
      e.preventDefault();
      isDrawing = true;
      if (!hasDrawn) {
        document.getElementById('canvas-placeholder').classList.add('hidden');
        hasDrawn = true;
      }
      const pos = getPos(e);
      currentStroke = { color: currentColor, size: brushSize, points: [pos] };
      ctx.beginPath();
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = brushSize;
      ctx.moveTo(pos.x, pos.y);
    }

    function draw(e) {
      if (!isDrawing) return;
      e.preventDefault();
      const pos = getPos(e);
      currentStroke.points.push(pos);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    }

    function endDraw(e) {
      if (!isDrawing) return;
      isDrawing = false;
      if (currentStroke && currentStroke.points.length > 0) {
        history.push(currentStroke);
        currentStroke = null;
      }
    }

    // Mouse events
    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', endDraw);
    canvas.addEventListener('mouseleave', endDraw);

    // Touch events
    canvas.addEventListener('touchstart', startDraw, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', endDraw);

    // Color swatches
    document.querySelectorAll('.swatch').forEach(sw => {
      sw.addEventListener('click', () => {
        document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
        sw.classList.add('active');
        currentColor = sw.dataset.color;
      });
    });

    // Brush size slider
    const slider = document.getElementById('brush-size');
    const display = document.getElementById('brush-size-display');
    if (slider) {
      slider.addEventListener('input', () => {
        brushSize = parseInt(slider.value);
        display.textContent = brushSize + 'px';
      });
    }

    // Undo
    document.getElementById('btn-undo').addEventListener('click', () => {
      if (history.length === 0) return;
      history.pop();
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      redrawHistory();
      if (history.length === 0) {
        hasDrawn = false;
        document.getElementById('canvas-placeholder').classList.remove('hidden');
      }
    });

    // Clear
    document.getElementById('btn-clear').addEventListener('click', () => {
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      history = [];
      hasDrawn = false;
      document.getElementById('canvas-placeholder').classList.remove('hidden');
    });

    // Save
    document.getElementById('btn-save').addEventListener('click', () => {
      if (!hasDrawn) return;
      const overlay = document.getElementById('save-modal');
      overlay.classList.add('open');
      document.getElementById('artist-name').focus();
    });

    // Load gallery
    loadSketchGallery();

    // Custom brush cursor logic
    const globalCursor = document.getElementById('custom-cursor');
    if (globalCursor) {
      const updateBrushCursor = () => {
        if (!canvas.matches(':hover')) return;
        globalCursor.style.width = brushSize + 'px';
        globalCursor.style.height = brushSize + 'px';
        globalCursor.style.background = currentColor;
        globalCursor.style.border = 'none';
        globalCursor.classList.remove('hover'); // Override default hover states
      };
      
      const resetCursor = () => {
        globalCursor.style.width = '';
        globalCursor.style.height = '';
        globalCursor.style.background = '';
        globalCursor.style.border = '';
      };

      canvas.addEventListener('mouseenter', updateBrushCursor);
      canvas.addEventListener('mouseleave', resetCursor);
      
      // Update cursor immediately when settings change if mouse is over canvas
      document.querySelectorAll('.swatch').forEach(sw => {
        sw.addEventListener('click', updateBrushCursor);
      });
      if (slider) {
        slider.addEventListener('input', updateBrushCursor);
      }
    }
  }

  // Save modal functions (global)
  window.closeSaveModal = function() {
    document.getElementById('save-modal').classList.remove('open');
  };

  window.confirmSave = async function() {
    const name = document.getElementById('artist-name').value.trim() || 'Anonymous Artist';
    const canvas = document.getElementById('sketch-canvas');
    const imageData = canvas.toDataURL('image/png');

    const now = new Date();
    const newSketch = {
      image: imageData,
      name: name,
      date: now.toISOString(),
      dateDisplay: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };

    // Fast UX: clear canvas and close modal immediately
    closeSaveModal();
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    history = [];
    hasDrawn = false;
    document.getElementById('canvas-placeholder').classList.remove('hidden');
    document.getElementById('artist-name').value = '';

    try {
      await fetch('/api/sketches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSketch)
      });
      loadSketchGallery();
    } catch (e) {
      console.error('Failed to save sketch to server', e);
    }
  };

  async function loadSketchGallery() {
    const container = document.getElementById('sketch-gallery');
    const empty = document.getElementById('gallery-empty');
    if (!container) return;

    try {
      const res = await fetch('/api/sketches');
      if (!res.ok) throw new Error('Failed to fetch gallery');
      const filtered = await res.json();

      // Clear existing items (except empty state)
      container.querySelectorAll('.sketch-gallery-item').forEach(el => el.remove());

      if (filtered.length === 0) {
        empty.classList.remove('hidden');
      } else {
        empty.classList.add('hidden');
        filtered.forEach(item => {
          const el = document.createElement('div');
          el.className = 'sketch-gallery-item anim visible';

          const img = document.createElement('img');
          img.src = item.image;
          img.alt = 'Community sketch by ' + item.name;
          el.appendChild(img);

          const meta = document.createElement('div');
          meta.className = 'sketch-gallery-meta';

          const nameSpan = document.createElement('span');
          nameSpan.className = 'sketch-gallery-name';
          nameSpan.textContent = item.name;
          meta.appendChild(nameSpan);

          const dateSpan = document.createElement('span');
          dateSpan.className = 'sketch-gallery-date';
          dateSpan.textContent = item.dateDisplay;
          meta.appendChild(dateSpan);

          el.appendChild(meta);
          container.insertBefore(el, empty);
        });
      }
    } catch (e) {
      console.error('Error loading gallery from server', e);
    }
  }

  // Init when DOM ready
  document.addEventListener('DOMContentLoaded', initSketchPad);
})();

// Close mobile menu on resize to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    document.getElementById('hamburger').classList.remove('open');
    document.getElementById('mobile-menu').classList.remove('open');
  }
});

// Close mobile menu automatically when the user scrolls
window.addEventListener('scroll', () => {
  const menu = document.getElementById('mobile-menu');
  const btn = document.getElementById('hamburger');
  if (menu && menu.classList.contains('open')) {
    menu.classList.remove('open');
    if (btn) btn.classList.remove('open');
  }
}, { passive: true });

// ── Scroll-triggered animations ──────────────────────────
function initAnimations() {
  // Elements to animate on scroll
  const animTargets = [
    // Home page — hero children stagger individually
    { sel: '.hero-script',   cls: '' },
    { sel: '.hero-art',      cls: '' },
    { sel: '.hero-sub',      cls: '' },
    { sel: '.hero-tagline',  cls: '' },
    { sel: '.hero-buttons',  cls: '' },
    { sel: '.proof-strip',          cls: '' },
    { sel: '.trust-bar',            cls: '' },
    { sel: '.section-header',       cls: '' },
    { sel: '.track-card',           cls: '' },
    { sel: '.studio-section',       cls: '' },
    { sel: '.format-card',          cls: '' },
    { sel: '.testimonial-card',     cls: '' },
    { sel: '.cta-banner',           cls: '' },
    // About page
    { sel: '.about-hero > div:first-child', cls: 'from-left' },
    { sel: '.about-photo-real',              cls: 'from-right' },
    { sel: '.value-card',           cls: '' },
    // Tracks page
    { sel: '.tracks-hero',          cls: '' },
    { sel: '.track-panel',          cls: '' },
    { sel: '.track-compare',        cls: '' },
    // Gallery page
    { sel: '.gallery-hero',         cls: '' },
    { sel: '.gallery-item',         cls: 'from-scale' },
    // Booking page
    { sel: '.booking-hero > div:first-child', cls: 'from-left' },
    { sel: '.booking-hero > div:nth-child(2)', cls: 'from-right' },
    { sel: '.booking-locations .section-header', cls: '' },
    { sel: '.location-pill',        cls: '' },
    { sel: '.booking-faq .section-header', cls: '' },
    { sel: '.faq-item',             cls: '' },
    // Sketch Pad page
    { sel: '.sketch-hero',          cls: '' },
    { sel: '.canvas-wrapper',       cls: 'from-scale' },
    { sel: '.sketch-gallery-item',  cls: '' },
    // Shared
    { sel: '.contact-option',       cls: '' },
  ];

  animTargets.forEach(({ sel, cls }) => {
    document.querySelectorAll(sel).forEach(el => {
      if (!el.classList.contains('anim')) {
        el.classList.add('anim');
        if (cls) el.classList.add(cls);
      }
    });
  });

  // Add stagger class to grid parents
  document.querySelectorAll('.hero-content, .tracks-grid, .values-grid, .gallery-grid, .location-pills, .contact-options, .testimonials-carousel, .faq-list, .sketch-gallery-grid').forEach(parent => {
    parent.classList.add('anim-stagger');
  });

  // Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.anim').forEach(el => observer.observe(el));
}

// Init on DOM ready
document.addEventListener('DOMContentLoaded', initAnimations);

// ── Stats counter (trust bar has no numeric stats now, kept for other pages) ──


/* ══════════════════════════════════════
   GALLERY — JSON-driven with tabs
══════════════════════════════════════ */
let galleryData = null;
let activeGalleryTab = 'students';

async function fetchGalleryData() {
  if (!galleryData) {
    const res = await fetch('/gallery-data.json');
    galleryData = await res.json();
  }
  return galleryData;
}

async function loadGallery() {
  await fetchGalleryData();
  renderGallery(activeGalleryTab);
}

function renderGallery(tab) {
  activeGalleryTab = tab;
  const grid = document.getElementById('gallery-grid');
  if (!grid || !galleryData) return;
  const items = galleryData[tab] || [];
  const artistName = tab === 'teacher' ? 'Milky' : 'Student Work';
  grid.innerHTML = items.map(item => `
    <div class="gallery-item">
      <div class="gallery-card-header">
        <span class="gallery-avatar">·S</span>
        <div class="gallery-card-info">
          <span class="gallery-card-name">${artistName}</span>
          <span class="gallery-card-label">${item.track || item.medium || ''}</span>
        </div>
      </div>
      <div class="gallery-card-caption">
        <span class="gallery-title">${item.title}</span>
      </div>
      <div class="gallery-card-img">
        <img src="${item.src}" alt="${item.title}" loading="lazy">
      </div>
      <div class="gallery-overlay">
        <span class="gallery-title">${item.title}</span>
        <span class="gallery-meta">${item.track || item.medium || ''}</span>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.gallery-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });
}

/* Gallery teaser on homepage */
async function loadGalleryTeaser() {
  const data = await fetchGalleryData();
  const grid = document.getElementById('gallery-teaser-grid');
  if (!grid) return;
  const picks = [
    ...(data.students || []).slice(0, 2),
    ...(data.teacher || []).slice(0, 2)
  ];
  grid.innerHTML = picks.map(item => `
    <a class="gallery-teaser-item" href="/gallery">
      <img src="${item.src}" alt="${item.title}" loading="lazy">
    </a>
  `).join('');
}

document.addEventListener('DOMContentLoaded', loadGalleryTeaser);

// Auto-load gallery on gallery page
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('gallery-grid')) loadGallery();
});

// ── Testimonials carousel ───────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.testimonials-dots span');
  if (!cards.length) return;

  let current = 0;
  let autoTimer;

  function showCard(index) {
    cards.forEach(c => c.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    cards[index].classList.add('active');
    dots[index].classList.add('active');
    current = index;
  }

  function nextCard() {
    showCard((current + 1) % cards.length);
  }

  function startAuto() {
    autoTimer = setInterval(nextCard, 5000);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(autoTimer);
      showCard(i);
      startAuto();
    });
  });

  showCard(0);
  startAuto();
});

// ── Before/After Slider ─────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.ba-slider');
  const beforeImage = document.getElementById('ba-before');
  const handle = document.getElementById('ba-handle');
  if (!slider || !beforeImage || !handle) return;

  let isDragging = false;

  function setSliderPosition(e) {
    const rect = slider.getBoundingClientRect();
    // Get mouse or touch position
    let clientX = e.clientX;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
    }
    
    // Calculate percentage
    let xPos = clientX - rect.left;
    let percentage = (xPos / rect.width) * 100;
    
    // Constrain percentage between 0 and 100
    percentage = Math.max(0, Math.min(100, percentage));
    
    // Update handle position and before image clip-path
    handle.style.left = percentage + '%';
    // clip-path: inset(top right bottom left) -> right clip is 100% - percentage
    beforeImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
  }

  // Mouse events
  handle.addEventListener('mousedown', (e) => {
    isDragging = true;
    e.preventDefault();
  });
  
  window.addEventListener('mouseup', () => {
    isDragging = false;
  });
  
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    setSliderPosition(e);
  });

  // Touch events
  handle.addEventListener('touchstart', (e) => {
    isDragging = true;
  }, { passive: true });
  
  window.addEventListener('touchend', () => {
    isDragging = false;
  });
  
  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    setSliderPosition(e);
    // Prevent scrolling while dragging the slider
    e.preventDefault();
  }, { passive: false });
  
  // Custom cursor styling when interacting with slider
  slider.addEventListener('mouseenter', () => {
    const cursor = document.getElementById('custom-cursor');
    if (cursor) cursor.style.opacity = '0';
  });
  slider.addEventListener('mouseleave', () => {
    const cursor = document.getElementById('custom-cursor');
    if (cursor) cursor.style.opacity = '1';
    isDragging = false;
  });
});

// ── Splash: color, entrance, scroll-shrink, nav toggle ──
document.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash');
  const nav = document.querySelector('nav');
  if (!splash || !nav) return;

  const brand = splash.querySelector('.splash-brand');
  const menu = splash.querySelector('.splash-menu');
  const tagline = splash.querySelector('.splash-tagline');

  // 1. Random background color
  const splashColors = [
    { bg: '#FAF0EC', text: '#3D1206', dot: '#8B1F1F' },
    { bg: '#E2AAAA', text: '#3D1206', dot: '#8B1F1F' },
    { bg: '#F5E2E2', text: '#3D1206', dot: '#8B1F1F' },
    { bg: '#8B1F1F', text: '#FAF0EC', dot: '#E2AAAA' },
    { bg: '#3D1206', text: '#FAF0EC', dot: '#E2AAAA' },
  ];
  const scheme = splashColors[Math.floor(Math.random() * splashColors.length)];
  splash.style.backgroundColor = scheme.bg;
  brand.style.color = scheme.text;
  splash.querySelector('.splash-dot').style.color = scheme.dot;
  tagline.style.color = scheme.text;
  menu.style.backgroundColor = scheme.text;
  menu.style.color = scheme.bg;

  // 2. Entrance animation after short delay
  let entranceDone = false;
  setTimeout(() => {
    splash.classList.add('splash-ready');
    // Mark entrance done after transitions finish
    setTimeout(() => { entranceDone = true; }, 900);
  }, 400);

  // 3. Nav hidden on splash
  nav.classList.add('nav-hidden');

  const splashObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Only toggle nav when home page is active
      if (!document.getElementById('page-home')) return;
      if (entry.isIntersecting) {
        nav.classList.add('nav-hidden');
      } else {
        nav.classList.remove('nav-hidden');
      }
    });
  }, { threshold: 0.1 });

  splashObs.observe(splash);

  // 4. Scroll-shrink effect
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        ticking = false;
        // Only run when home page is active and entrance is done
        if (!entranceDone) return;
        if (!document.getElementById('page-home')) return;

        const scrollY = window.scrollY;
        const splashH = splash.offsetHeight;
        const t = Math.min(scrollY / (splashH * 0.7), 1);

        const scale = 1 - (t * 0.85);
        const opacity = 1 - (t * 0.6);
        brand.style.transform = 'scale(' + scale + ')';
        brand.style.opacity = opacity;

        // Fade out menu + tagline faster
        const fadeT = Math.min(scrollY / (splashH * 0.3), 1);
        menu.style.opacity = 1 - fadeT;
        tagline.style.opacity = (1 - fadeT) * 0.5;
      });
      ticking = true;
    }
  }, { passive: true });
});

// ── Sticky Mobile CTA ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const stickyCta = document.getElementById('sticky-cta');
  const hero = document.getElementById('main-content');
  if (!stickyCta || !hero) return;

  // Only activate on mobile
  const mq = window.matchMedia('(max-width: 768px)');

  function setupObserver() {
    if (!mq.matches) {
      stickyCta.classList.remove('visible');
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      stickyCta.classList.toggle('visible', !entry.isIntersecting);
    }, { threshold: 0 });

    observer.observe(hero);
  }

  setupObserver();
  mq.addEventListener('change', setupObserver);
});

// ── Initialize Lucide icons ─────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
});

// ── Custom Cursor ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  const attachCursorEvents = () => {
    const hoverElements = document.querySelectorAll('a, button, input[type="range"], .swatch, .tool-btn, .hamburger, .gallery-teaser-item, .gallery-item');
    hoverElements.forEach(el => {
      // Avoid duplicate listeners
      el.removeEventListener('mouseenter', addHover);
      el.removeEventListener('mouseleave', removeHover);
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });
  };
  
  const addHover = () => cursor.classList.add('hover');
  const removeHover = () => cursor.classList.remove('hover');

  attachCursorEvents();
  
  // Re-attach if DOM changes (like gallery loading)
  const observer = new MutationObserver(() => { attachCursorEvents(); });
  observer.observe(document.body, { childList: true, subtree: true });
  

});
