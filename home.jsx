/* Homepage components */

function BeforeAfterSlider() {
  const sliderRef = React.useRef(null);
  const [pos, setPos] = React.useState(50);
  const dragging = React.useRef(false);

  const updatePos = React.useCallback((e) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  }, []);

  React.useEffect(() => {
    const onMove = (e) => { if (dragging.current) { updatePos(e); e.preventDefault(); } };
    const onUp = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [updatePos]);

  return (
    <section className="ba-section anim">
      <div className="ba-slider" ref={sliderRef}>
        <img src="../assets/slider-after.png" alt="Student work after 8 weeks" />
        <div className="ba-before" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <img src="../assets/slider-before.png" alt="Student work at week 1" />
        </div>
        <span className="ba-label left">Week 1</span>
        <span className="ba-label right">Week 8</span>
        <div
          className="ba-handle"
          style={{ left: pos + '%' }}
          onMouseDown={() => { dragging.current = true; }}
          onTouchStart={() => { dragging.current = true; }}
        >
          <div className="ba-handle-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2c2220" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2c2220" strokeWidth="2.5" strokeLinecap="round" style={{marginLeft:-4}}><polyline points="9 18 15 12 9 6"></polyline></svg>
          </div>
        </div>
      </div>
      <div className="ba-caption">Student progress · 8 weeks</div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    { quote: "My daughter went from stick figures to actual portraits in two months. She literally runs to the door when Milky arrives.", name: "Sarah M.", role: "Parent of a 9-year-old student", img: "../assets/test-sarah.png" },
    { quote: "I always wanted to learn to draw but felt too old to start. Milky made me realize that's nonsense. I'm 47 and I just finished my first charcoal portrait.", name: "David R.", role: "Adult beginner, age 47", img: "../assets/test-david.png" },
    { quote: "The Intuitive Flow track is my therapy. No pressure, no grades, just paint and whatever comes out. I look forward to it all week.", name: "Ava T.", role: "Intuitive Flow student", img: "../assets/test-ava.png" },
  ];
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="testimonials-section anim">
      <div className="label">What students say</div>
      {testimonials.map((t, i) => (
        <div key={i} className={`testimonial-card${i === current ? ' active' : ''}`}>
          <div className="testimonial-quote">"{t.quote}"</div>
          <div className="testimonial-name">{t.name}</div>
          <div className="testimonial-role">{t.role}</div>
        </div>
      ))}
      <div className="testimonial-dots">
        {testimonials.map((_, i) => (
          <span key={i} className={i === current ? 'active' : ''} onClick={() => setCurrent(i)}></span>
        ))}
      </div>
    </section>
  );
}

function HomePage() {
  useScrollAnim();

  return (
    <div className="page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-overline">Art lessons · Brooklyn & Zoom</div>
        <h1 className="anim">Personalized<br/>drawing &<br/>painting.</h1>
        <p className="hero-desc anim">Private and group lessons for kids, teens, and adults. Three tracks. One teacher who actually cares.</p>
        <div className="hero-btns anim">
          <a href="/booking/" className="btn btn-solid">Book a lesson</a>
          <a href="/tracks/" className="btn btn-ghost">See the tracks</a>
        </div>
      </section>

      {/* Before/After + Quote */}
      <BeforeAfterSlider />
      <div className="ba-quote anim">
        <div className="ba-quote-text">"I couldn't draw a straight line 8 weeks ago."</div>
        <div className="ba-quote-attr">— Core Technique student</div>
      </div>

      {/* Trust Bar */}
      <div className="trust-bar anim">
        <div className="trust-item">Customized</div>
        <div className="trust-item">Brooklyn & Zoom</div>
        <div className="trust-item">All Ages</div>
      </div>

      {/* Tracks */}
      <section className="tracks-section">
        <div className="label anim">Three tracks</div>
        <h2 className="section-title anim">Choose your path.</h2>
        {[
          { num: '1', label: 'Core Technique', title: 'Build real skills', desc: 'Structured, personalized drawing and painting instruction. Measurable progress week to week.' },
          { num: '2', label: 'Intuitive Flow', title: 'Art as practice', desc: 'Mixed media exploration. No pressure, no grades. Express yourself through color and texture.' },
          { num: '3', label: 'Advanced Mastery', title: 'Go deeper', desc: 'Oil painting, watercolor, hyper-realistic portraits. For students ready to push further.' },
        ].map((t, i) => (
          <div key={i} className="track-row anim">
            <div className="track-number">{t.num}</div>
            <div>
              <div className="track-label">{t.label}</div>
              <div className="track-title">{t.title}</div>
              <p className="track-desc">{t.desc}</p>
            </div>
          </div>
        ))}
        <div className="tracks-link anim"><a href="/tracks/">See all tracks →</a></div>
      </section>

      {/* Student Work Preview */}
      <section className="store-section">
        <div className="store-inner">
          <div className="label anim">Student work</div>
          <h2 className="section-title anim">See what students<br/><span className="script">are creating.</span></h2>
          <p className="body-text anim" style={{marginBottom:24,maxWidth:380}}>Real progress from real students — across all three tracks.</p>
          <div className="store-grid anim">
            {[
              { title: 'Portrait Study', meta: 'Core Technique', img: 'https://picsum.photos/seed/studentportrait/400/400' },
              { title: 'Charcoal Still Life', meta: 'Core Technique', img: 'https://picsum.photos/seed/studentcharcoal/400/400' },
              { title: 'Watercolor Landscape', meta: 'Advanced Mastery', img: 'https://picsum.photos/seed/studentwatercolor/400/400' },
              { title: 'Abstract Expression', meta: 'Intuitive Flow', img: 'https://picsum.photos/seed/studentabstract/400/400' },
            ].map((item, i) => (
              <a key={i} className="store-card" href="/gallery/">
                <div className="store-img"><img src={item.img} alt={item.title} loading="lazy" /></div>
                <div className="store-meta">
                  <div className="store-item-title">{item.title}</div>
                  <div className="store-price">{item.meta}</div>
                </div>
              </a>
            ))}
          </div>
          <div className="store-link anim" style={{marginTop:24}}><a href="/gallery/" style={{fontSize:12,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--red)',textDecoration:'underline',textUnderlineOffset:4}}>View full gallery →</a></div>
        </div>
      </section>

      {/* Formats */}
      <section className="formats-section">
        <div className="label anim">How it works</div>
        <h2 className="section-title anim">Your schedule.<br/><span className="script">Your space.</span></h2>
        <div className="format-grid">
          <div className="format-card anim">
            <div className="format-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            </div>
            <div>
              <div className="format-name">In Home</div>
              <div className="format-desc">Milky comes to you. Lessons in the comfort of your own space.</div>
            </div>
          </div>
          <div className="format-card anim">
            <div className="format-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            </div>
            <div>
              <div className="format-name">At the Studio</div>
              <div className="format-desc">Join Milky at her Brooklyn studio for a classic art lesson atmosphere.</div>
            </div>
          </div>
          <div className="format-card anim">
            <div className="format-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"></rect><line x1="8" x2="16" y1="21" y2="21"></line><line x1="12" x2="12" y1="17" y2="21"></line></svg>
            </div>
            <div>
              <div className="format-name">Live on Zoom</div>
              <div className="format-desc">Same quality, fully live and interactive. Anywhere in the world.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA */}
      <CtaBanner
        title='Start with one lesson.<br/><span class="script">See what happens.</span>'
        subtitle="929.884.9382"
        primaryLabel="Book a lesson"
        primaryHref="/booking/"
        secondaryLabel="WhatsApp Milky"
        secondaryHref="https://wa.me/19298849382"
      />

      <SiteFooter />

      {/* Sticky mobile CTA */}
      <StickyMobileCta />
    </div>
  );
}

function StickyMobileCta() {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const obs = new IntersectionObserver(([entry]) => {
      setVisible(!entry.isIntersecting && window.innerWidth < 768);
    }, { threshold: 0 });
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  return (
    <div className={`sticky-cta${visible ? ' visible' : ''}`}>
      <a href="/booking/" className="btn btn-red">Book a lesson</a>
    </div>
  );
}

Object.assign(window, { HomePage, BeforeAfterSlider, Testimonials, StickyMobileCta });
