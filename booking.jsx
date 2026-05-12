/* Booking page — Direction C: "A Letter from Milky" + Chat-thread Q&A */
function BookingPage() {
  useScrollAnim();

  const faqs = [
    { q: 'How much do lessons cost?', a: "Pricing depends on format (in home, studio, or Zoom), session length, and whether it's private or a small group. Send Milky a WhatsApp message or give her a call. She'll talk through options with you directly." },
    { q: 'What materials do I need?', a: "Just yourself for the first lesson. Milky provides materials for trial sessions. After that she'll give you a simple, affordable supply list based on your track and level." },
    { q: 'Can I switch tracks later?', a: "Absolutely. Many students start with one track and try the other, or mix both. There's no lock-in. Milky will help you figure out what feels right." },
    { q: 'Do you teach complete beginners?', a: "Yes, most students start with zero experience. That's the whole point of personalized lessons. Milky meets you exactly where you are." },
    { q: 'How does the Zoom format work?', a: "Set up a camera so Milky can see your work in real time. She guides you step by step, gives feedback, and demonstrates techniques, all live." },
    { q: 'How long are sessions?', a: "Sessions are typically 60 minutes, with 90-minute options available. Milky can discuss what works best for your schedule and goals when you book." },
  ];

  return (
    <div className="page">
      <section className="bookingC-hero">
        <div className="bookingC-blob"></div>
        <div className="bookingC-inner">
          <div className="bookingC-photo anim" aria-hidden="true">
            <img src="https://picsum.photos/seed/milky-studio-portrait/520/640" alt="" />
          </div>
          <div className="bookingC-eyebrow anim">A note from your teacher</div>
          <div className="bookingC-from anim">Dear future student,</div>
          <h1 className="bookingC-headline anim">I'm so glad<br/>you're <span className="script">here.</span></h1>

          <div className="bookingC-letter">
            <p className="anim">If you've made it this far, you're probably nervous, curious, or both. That's normal. Most of my students arrive convinced they "can't draw a stick figure."</p>
            <p className="anim">The truth is, talent is a myth. It's built from hours of practice. You need someone who meets you exactly where you are, and you need the patience to show up every week and put in the work.</p>
            <p className="anim">Whether you want to level up your portrait skills, explore the quiet of mindful painting, or a place for your kid to really level up their drawings, send me a message. Let's talk.</p>
            <div className="bookingC-sig anim">
              <div className="bookingC-signature">Milky</div>
              <div className="bookingC-sig-meta">Founder · Milky Studio Co</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bookingC-cta-section">
        <div className="bookingC-cta-card anim">
          <h2 className="bookingC-cta-title">Art your <span className="script">way.</span></h2>
          <a href="https://wa.me/19298849382" target="_blank" rel="noopener" className="btn btn-whatsapp bookingC-primary">
            <WhatsAppIcon />
            Message Milky on WhatsApp
          </a>
          <a href="tel:9298849382" className="bookingC-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            Call 929.884.9382
          </a>
          <div className="bookingC-meet">
            <div className="bookingC-meet-row">
              <div className="bookingC-meet-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              </div>
              <div>
                <div className="bookingC-meet-label">In your home</div>
                <div className="bookingC-meet-value">Brooklyn, NY · Milky comes to you</div>
              </div>
            </div>
            <div className="bookingC-meet-row">
              <div className="bookingC-meet-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
              </div>
              <div>
                <div className="bookingC-meet-label">At the studio</div>
                <div className="bookingC-meet-value">Brooklyn · come to Milky</div>
              </div>
            </div>
            <div className="bookingC-meet-row">
              <div className="bookingC-meet-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
              </div>
              <div>
                <div className="bookingC-meet-label">Live on Zoom</div>
                <div className="bookingC-meet-value">Anywhere in the world</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-chat-section">
        <div className="faq-chat-head">
          <div className="label anim" style={{justifyContent:'center'}}>Q &amp; A</div>
          <h2 className="section-title anim" style={{textAlign:'center'}}>Before you <span className="script">book.</span></h2>
          <p className="faq-chat-sub anim">The things students ask before their first lesson.</p>
        </div>
        <div className="faq-chat-grid">
          {faqs.map((f,i) => (
            <div key={i} className="faq-chat-thread anim">
              <div className="faq-chat-you-row">
                <div>
                  <div className="faq-chat-you-bubble">{f.q}</div>
                  <div className="faq-chat-you-name">You</div>
                </div>
              </div>
              <div className="faq-chat-milky-row">
                <div className="faq-chat-avatar">M</div>
                <div className="faq-chat-milky-col">
                  <div className="faq-chat-milky-name">Milky</div>
                  <div className="faq-chat-milky-bubble">{f.a}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
window.BookingPage = BookingPage;
