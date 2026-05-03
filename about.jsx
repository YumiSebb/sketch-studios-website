/* About page */
function AboutPage() {
  useScrollAnim();
  return (
    <div className="page">
      <section className="about-hero">
        <div className="about-grid">
          <div>
            <div className="label anim">Meet the teacher</div>
            <h1 className="about-headline anim">Hi, I'm</h1>
            <span className="about-script anim">Milky.</span>
            <div className="about-body">
              <p className="anim">I'm a Brooklyn-based art teacher and the founder of .Sketch Studios. I teach drawing and painting to kids, teens, and adults — and the thing that never gets old is watching someone realize they actually <em>can</em> do this.</p>
              <p className="anim">My approach is simple: every student is different, so every lesson should be too. I build personalized curricula, I give homework (yes, homework, because that's how you actually improve), and I make sure every session is something you actually look forward to.</p>
              <p className="anim">I teach in your home, at my studio, or on Zoom — wherever works best for you.</p>
            </div>
            <a href="/booking/" className="btn btn-solid anim">Book a lesson with Milky</a>
          </div>
          <div className="anim">
            <div className="about-photo">
              <img src="https://picsum.photos/seed/milkyart/600/750" alt="Milky, founder of .Sketch Studios" />
            </div>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <div className="label anim">Teaching philosophy</div>
          <h2 className="section-title anim">What makes a <span className="script">great lesson?</span></h2>
          <div className="values-grid">
            {[
              {title:'Personalized, always',text:"No generic curriculum. Every student gets a lesson plan built around their level, goals, and learning style — and it evolves as they grow."},
              {title:'Real progress',text:"Students leave with something tangible — a skill they didn't have before, a drawing that surprised them. And homework to keep that momentum going."},
              {title:'Fun is the point',text:"If you dread your lesson, something's wrong. Art should feel like something you get to do, not something you have to."},
              {title:'Drawing first',text:"The foundation of all visual art is drawing. Students build strong fundamentals before moving to painting, so when they pick up a brush, they're ready."},
              {title:'For everyone',text:"Kids picking up a pencil for the first time. Adults who always wanted to learn. Teens who want to get serious. All welcome."},
              {title:'Adaptable',text:"Lessons evolve with the student. As skills develop, the curriculum shifts — so there's always a new challenge, always a next level."},
            ].map((v,i) => (
              <div key={i} className="value-card anim">
                <div className="value-title">{v.title}</div>
                <p className="value-text">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow="Ready?"
        title={"Let's find your <span class=\"script\">track.</span>"}
        subtitle="Start with a trial lesson — in home, at Milky's studio, or on Zoom."
        primaryLabel="Book a lesson"
      />
      <SiteFooter />
    </div>
  );
}
window.AboutPage = AboutPage;
