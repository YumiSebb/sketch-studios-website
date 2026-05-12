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
          A note about <span className="script">how I teach.</span>
        </h1>

        <div className="about-letter-body">
          <p className="anim">I'm a Brooklyn-based art teacher. I've spent the last ten years figuring out what actually helps a student improve, and what just gets in the way.</p>
          <p className="anim">The answer, mostly, is structure. Every student gets a curriculum built around their level and goals. Not pulled off a shelf. Not the same thing I taught the kid before them.</p>
          <p className="anim">I give homework. Yes, homework. Because the lesson is when I teach. The rest of the week is when you get better.</p>
          <blockquote className="about-letter-quote anim">And the thing that never gets old? Watching someone realize they actually <em>can</em> do this.</blockquote>
          <p className="anim">I teach kids, teens, adults. In your home, at my studio, or on Zoom. Whatever works.</p>
          <p className="anim">If you've been thinking about it, let's do it.</p>
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
