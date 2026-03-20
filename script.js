function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  document.getElementById('nav-' + name).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMenu() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  btn.classList.toggle('open');
  menu.classList.toggle('open');
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
  let currentColor = '#1A0A0A';
  let brushSize = 4;
  let history = [];
  let hasDrawn = false;

  function initSketchPad() {
    canvas = document.getElementById('sketch-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    // Set canvas resolution properly
    function resizeCanvas() {
      const wrapper = canvas.parentElement;
      const rect = wrapper.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = Math.max(400, rect.width * 0.5) * dpr;
      canvas.style.height = Math.max(400, rect.width * 0.5) + 'px';
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
    loadGallery();
  }

  // Save modal functions (global)
  window.closeSaveModal = function() {
    document.getElementById('save-modal').classList.remove('open');
  };

  window.confirmSave = function() {
    const name = document.getElementById('artist-name').value.trim() || 'Anonymous Artist';
    const canvas = document.getElementById('sketch-canvas');
    const imageData = canvas.toDataURL('image/png');

    // Save to localStorage
    const gallery = JSON.parse(localStorage.getItem('sketchGallery') || '[]');
    const now = new Date();
    gallery.unshift({
      image: imageData,
      name: name,
      date: now.toISOString(),
      dateDisplay: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    });

    // Keep only last 50 sketches
    if (gallery.length > 50) gallery.length = 50;

    // Weekly cleanup, remove sketches older than 7 days
    const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
    const filtered = gallery.filter(g => new Date(g.date) > weekAgo);
    localStorage.setItem('sketchGallery', JSON.stringify(filtered));

    closeSaveModal();
    loadGallery();

    // Clear canvas after saving
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    history = [];
    hasDrawn = false;
    document.getElementById('canvas-placeholder').classList.remove('hidden');
    document.getElementById('artist-name').value = '';
  };

  function loadGallery() {
    const container = document.getElementById('sketch-gallery');
    const empty = document.getElementById('gallery-empty');
    if (!container) return;

    const gallery = JSON.parse(localStorage.getItem('sketchGallery') || '[]');

    // Weekly cleanup on load
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const filtered = gallery.filter(g => new Date(g.date) > weekAgo);
    if (filtered.length !== gallery.length) {
      localStorage.setItem('sketchGallery', JSON.stringify(filtered));
    }

    // Clear existing items (except empty state)
    container.querySelectorAll('.sketch-gallery-item').forEach(el => el.remove());

    if (filtered.length === 0) {
      empty.classList.remove('hidden');
    } else {
      empty.classList.add('hidden');
      filtered.forEach(item => {
        const el = document.createElement('div');
        el.className = 'sketch-gallery-item';
        el.innerHTML = '<img src="' + item.image + '" alt="Community sketch by ' + item.name + '">' +
          '<div class="sketch-gallery-meta">' +
          '<span class="sketch-gallery-name">' + item.name + '</span>' +
          '<span class="sketch-gallery-date">' + item.dateDisplay + '</span>' +
          '</div>';
        container.insertBefore(el, empty);
      });
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

// ── Scroll-triggered animations ──────────────────────────
function initAnimations() {
  // Elements to animate on scroll
  const animTargets = [
    // Home page — hero children stagger individually
    { sel: '.hero-eyebrow',  cls: '' },
    { sel: '.hero-headline', cls: '' },
    { sel: '.hero-script',   cls: '' },
    { sel: '.hero-art',      cls: '' },
    { sel: '.hero-sub',      cls: '' },
    { sel: '.hero-tagline',  cls: '' },
    { sel: '.hero-buttons',  cls: '' },
    { sel: '.hero-visual',          cls: 'from-right' },
    { sel: '.stats-bar',            cls: '' },
    { sel: '.section-header',       cls: '' },
    { sel: '.track-card',           cls: '' },
    { sel: '.format-card',          cls: '' },
    { sel: '.philosophy',           cls: '' },
    { sel: '.testimonial-card',     cls: '' },
    { sel: '.cta-banner',           cls: '' },
    // About page
    { sel: '.about-hero > div:first-child', cls: 'from-left' },
    { sel: '.about-photo-placeholder',      cls: 'from-right' },
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
    { sel: '.booking-form',         cls: 'from-right' },
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
  document.querySelectorAll('.hero-content, .tracks-grid, .formats-grid, .values-grid, .gallery-grid, .location-pills, .contact-options, .testimonials-grid, .faq-list, .sketch-gallery-grid').forEach(parent => {
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

// Re-trigger animations when switching pages
const origShowPage = showPage;
showPage = function(name) {
  origShowPage(name);
  // Small delay so new page is visible before observing
  setTimeout(() => {
    const page = document.getElementById('page-' + name);
    page.querySelectorAll('.anim').forEach(el => {
      el.classList.remove('visible');
    });
    // Re-observe after brief reset
    setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      page.querySelectorAll('.anim').forEach(el => observer.observe(el));
    }, 50);
  }, 100);
};

// Init on DOM ready
document.addEventListener('DOMContentLoaded', initAnimations);

// ── Stats counter ─────────────────────────────────────
function initStatCounters() {
  const statsBar = document.querySelector('.stats-bar');
  if (!statsBar) return;

  // Only animate numeric stat numbers
  const numEls = Array.from(statsBar.querySelectorAll('.stat-number'))
    .filter(el => /^\d+$/.test(el.textContent.trim()));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      numEls.forEach(el => {
        const target = parseInt(el.textContent, 10);
        const start = performance.now();
        const duration = 900;
        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(eased * target);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.6 });

  observer.observe(statsBar);
}
document.addEventListener('DOMContentLoaded', initStatCounters);

// ── Paint cursor trail (desktop only) ────────────────
(function initCursorTrail() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const NUM = 6;
  const dots = [];
  const pos = [];
  let mx = -300, my = -300;

  for (let i = 0; i < NUM; i++) {
    const d = document.createElement('div');
    const size = Math.round(10 - i * 1.3);
    const opacity = (0.85 - i * 0.12).toFixed(2);
    d.style.cssText = [
      'position:fixed',
      'width:' + size + 'px',
      'height:' + size + 'px',
      'border-radius:50%',
      'background:var(--red)',
      'pointer-events:none',
      'z-index:9998',
      'transform:translate(-50%,-50%)',
      'opacity:' + opacity,
      'mix-blend-mode:multiply',
      'will-change:left,top',
      'left:-300px',
      'top:-300px',
    ].join(';');
    document.body.appendChild(d);
    dots.push(d);
    pos.push({ x: -300, y: -300 });
  }

  // Scale lead dot on interactive elements
  dots[0].style.transition = 'width 0.2s, height 0.2s, opacity 0.2s';
  document.addEventListener('mouseover', e => {
    if (e.target.closest('a, button, [onclick], .track-card, .format-card, .gallery-item')) {
      dots[0].style.width = '20px';
      dots[0].style.height = '20px';
      dots[0].style.opacity = '0.35';
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest('a, button, [onclick], .track-card, .format-card, .gallery-item')) {
      dots[0].style.width = '10px';
      dots[0].style.height = '10px';
      dots[0].style.opacity = '0.85';
    }
  });

  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  const lerp = (a, b, t) => a + (b - a) * t;
  function frame() {
    pos[0].x = lerp(pos[0].x, mx, 0.42);
    pos[0].y = lerp(pos[0].y, my, 0.42);
    for (let i = 1; i < NUM; i++) {
      pos[i].x = lerp(pos[i].x, pos[i - 1].x, 0.36);
      pos[i].y = lerp(pos[i].y, pos[i - 1].y, 0.36);
    }
    dots.forEach((d, i) => {
      d.style.left = pos[i].x + 'px';
      d.style.top  = pos[i].y + 'px';
    });
    requestAnimationFrame(frame);
  }
  frame();
})();
