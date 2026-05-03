/* Booking page */
function BookingPage() {
  useScrollAnim();
  const faqs = [
    { q: 'How much do lessons cost?', a: "Pricing depends on format (in home, studio, or Zoom), session length, and whether it's private or a small group. Send Milky a WhatsApp message or give her a call — she'll talk through options with you directly." },
    { q: 'What materials do I need?', a: "Just yourself for the first lesson — Milky provides materials for trial sessions. After that she'll give you a simple, affordable supply list based on your track and level." },
    { q: 'Can I switch tracks later?', a: "Absolutely. Many students start with one track and try the other, or mix both. There's no lock-in. Milky will help you figure out what feels right." },
    { q: 'Do you teach complete beginners?', a: "Yes — most students start with zero experience. That's the whole point of personalized lessons. Milky meets you exactly where you are." },
    { q: 'How does the Zoom format work?', a: "Set up a camera so Milky can see your work in real time. She guides you step by step, gives feedback, and demonstrates techniques — all live." },
    { q: 'How long are sessions?', a: "Sessions are typically 60 minutes, with 90-minute options available. Milky can discuss what works best for your schedule and goals when you book." },
  ];

  return (
    <div className="page">
      <section className="booking-hero">
        <div className="label anim" style={{justifyContent:'center'}}>Get started</div>
        <h1 className="booking-headline anim">
          <span className="script">Let's make art.</span>
          Reach out to Milky.
        </h1>
        <p className="booking-desc anim">Ready to start? Send Milky a message on WhatsApp or give her a call. She'll chat with you about what you're looking for and set up your first session.</p>
        <a href="https://wa.me/19298849382" className="btn btn-whatsapp anim" target="_blank" style={{margin:'0 auto 28px',display:'inline-flex'}}>
          <WhatsAppIcon />
          Message Milky on WhatsApp
        </a>
        <div className="contact-options anim">
          <div className="contact-option">
            <div className="co-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <div>
              <div className="co-label">Call or Text</div>
              <div className="co-value"><a href="tel:9298849382" style={{color:'var(--text)'}}>929.884.9382</a></div>
            </div>
          </div>
          <div className="contact-option">
            <div className="co-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <div>
              <div className="co-label">Location</div>
              <div className="co-value">Brooklyn, NY · Live on Zoom</div>
            </div>
          </div>
        </div>
      </section>

      <section className="locations-section">
        <div className="label anim" style={{justifyContent:'center'}}>Where we meet</div>
        <h2 className="section-title anim" style={{textAlign:'center'}}>Three formats.<br/><span className="script">Zero excuses.</span></h2>
        <div className="location-pills anim">
          {[
            {icon:'🏠',title:'In Home',name:'Milky comes to you'},
            {icon:'🎨',title:'At the Studio',name:'Come to Milky'},
            {icon:'💻',title:'Zoom',name:'Anywhere in the world'},
          ].map((l,i) => (
            <div key={i} className="location-pill">
              <div className="lp-icon" style={{fontSize:18}}>{l.icon}</div>
              <div><div className="lp-title">{l.title}</div><div className="lp-name">{l.name}</div></div>
            </div>
          ))}
        </div>
      </section>

      <section className="faq-section">
        <div className="label anim">Common questions</div>
        <h2 className="section-title anim">Before you <span className="script">book.</span></h2>
        <div className="faq-grid">
          {faqs.map((f,i) => (
            <div key={i} className="faq-cell anim">
              <div className="faq-q">{f.q}</div>
              <div className="faq-a">{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
window.BookingPage = BookingPage;
