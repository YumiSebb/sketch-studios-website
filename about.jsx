/* About page — Letter direction (B) */
function AboutPage() {
  useScrollAnim();
  return (
    <div className="page about-letter">
      <section className="about-letter-inner">
        <div className="about-letter-from anim">
          <img src="https://picsum.photos/seed/milky-letter/300/300" alt="Milky" className="about-letter-avatar" />
          <div>
            <div className="about-letter-from-label">From</div>
            <div className="about-letter-from-name">Milky</div>
          </div>
        </div>

        <h1 className="about-letter-title anim">
          A note from <span className="script">Milky.</span>
        </h1>

        <div className="about-letter-body">
          <p className="anim">I am a Brooklyn-based artist and instructor. I've spent the last decade identifying the difference between teachers who simply show you how to copy an image and those who actually teach you how to see and create.</p>
          <p className="anim">That experience led me to develop a curriculum focused on true independence, confidence, and skill mastery. My ultimate goal is for my students to eventually not need me anymore, because they've gained the tools to create anything they can imagine.</p>

          <div className="about-letter-section-head anim">Two Paths to Creativity</div>
          <p className="anim">I've developed two distinct tracks to meet students where they are:</p>
          <p className="anim"><strong>The Technical Track:</strong> For those hungry for foundational skills and technical mastery.</p>
          <p className="anim"><strong>The Intuitive Track:</strong> For those looking to embrace creativity, move past self-judgment, and use art as a powerful tool for self-expression.</p>

          <div className="about-letter-section-head anim">The Studio Milky Approach</div>
          <p className="anim">Every student receives a curriculum tailored specifically to their goals and current level. I believe in the power of practice, so I do provide and encourage homework. True progress happens in those few minutes of daily practice between our sessions.</p>
          <blockquote className="about-letter-quote anim">The thing that never gets old? Watching a student realize they actually <em>can</em> do this. All that is required is interest and perseverance. Everyone can learn; everyone can create.</blockquote>

          <div className="about-letter-section-head anim">Let's Begin</div>
          <p className="anim">I teach kids, teens, and adults in your home, at my Brooklyn studio, or via Zoom.</p>
          <p className="anim">If you've been thinking about starting your art journey, let's do it.</p>
        </div>

        <div className="about-letter-sign anim">
          <div className="about-letter-signature">Milky</div>
          <div className="about-letter-meta">Brooklyn · 2026</div>
        </div>
      </section>

      <section className="about-letter-cta-wrap">
        <a href="/booking/" className="btn btn-red about-letter-cta">Book a lesson →</a>
      </section>

      <SiteFooter />
    </div>
  );
}
window.AboutPage = AboutPage;
