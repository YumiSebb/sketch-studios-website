/* Tracks page */
function TracksPage() {
  useScrollAnim();
  return (
    <div className="page">
      <section className="tracks-hero-page anim">
        <div className="label" style={{justifyContent:'center'}}>Three tracks</div>
        <h1 className="section-title" style={{fontSize:'clamp(32px,6vw,52px)'}}>Choose your path.</h1>
        <p className="body-text" style={{maxWidth:480,margin:'0 auto'}}>Not sure which track is right for you? Start with one and switch, or try a bit of both. Milky will help you figure it out.</p>
      </section>

      <div className="track-detail">
        <div className="track-panel dark anim">
          <div className="track-panel-number" style={{color:'white'}}>1</div>
          <div className="track-panel-label">Track One</div>
          <h2 className="track-panel-title">Core Technique</h2>
          <p className="track-panel-body">For students who want to actually learn to draw and paint — not just dabble. This track builds real, measurable skills through structured, personalized instruction.</p>
          <ul className="track-bullet-list">
            {['Real skills, real progress','Strong fundamentals','Personalized curriculum','Homework between sessions','Results in weeks, not years'].map((b,i) => (
              <li key={i}><div className="bullet-marker" style={{background:'#E2AAAA'}}></div>{b}</li>
            ))}
          </ul>
          <a href="/booking/" className="btn btn-ghost" style={{borderColor:'rgba(255,255,255,0.2)',color:'white'}}>Start the Core Track →</a>
        </div>
        <div className="track-panel light anim">
          <div className="track-panel-number" style={{color:'var(--red)'}}>2</div>
          <div className="track-panel-label">Track Two</div>
          <h2 className="track-panel-title">Intuitive Flow</h2>
          <p className="track-panel-body">For students who want art as a creative outlet, a mindful practice, or a way to express what words can't. No pressure. No grades.</p>
          <ul className="track-bullet-list">
            {['Mixed media exploration','Express your emotions','Mindful, pressure-free','Art as practice, not performance','Exploration and joy'].map((b,i) => (
              <li key={i}><div className="bullet-marker" style={{background:'var(--red)'}}></div>{b}</li>
            ))}
          </ul>
          <a href="/booking/" className="btn btn-red">Start the Flow Track →</a>
        </div>
      </div>

      <div className="track-detail" style={{gridTemplateColumns:'1fr'}}>
        <div className="track-panel anim" style={{textAlign:'center',maxWidth:'100%',background:'#8B1F1F',color:'white'}}>
          <div className="track-panel-number" style={{color:'rgba(255,255,255,0.08)',right:'50%',transform:'translateX(50%)'}}>3</div>
          <div className="track-panel-label">Track Three</div>
          <h2 className="track-panel-title">Advanced Mastery</h2>
          <p className="track-panel-body" style={{margin:'0 auto 24px',maxWidth:480}}>Go deeper with oil painting, watercolor, and hyper-realistic portrait drawing. For students who have built a foundation and are ready to push further.</p>
          <a href="/booking/" className="btn btn-ghost" style={{borderColor:'rgba(255,255,255,0.2)',color:'white'}}>Start Advanced Track →</a>
        </div>
      </div>

      <section className="compare-section anim">
        <div className="label">Side by side</div>
        <h2 className="section-title">Which track is <span className="script">right for you?</span></h2>
        <div style={{overflowX:'auto'}}>
          <table className="compare-table">
            <thead><tr><th></th><th>Core Technique</th><th>Intuitive Flow</th><th>Advanced Mastery</th></tr></thead>
            <tbody>
              <tr><td>Best for</td><td>Building real skills</td><td>Creative expression</td><td>Pushing further</td></tr>
              <tr><td>Structure</td><td>Structured, progressive</td><td>Open, exploratory</td><td>Advanced projects</td></tr>
              <tr><td>Materials</td><td>Pencil, charcoal, paint</td><td>Mixed media, collage</td><td>Oil, watercolor, charcoal</td></tr>
              <tr><td>Homework</td><td>Yes</td><td>Optional</td><td>Yes</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <CtaBanner
        eyebrow="Not sure which track?"
        title='Book a lesson and<br/><span class="script">Milky will help you decide.</span>'
        subtitle="One lesson is all it takes."
      />
      <SiteFooter />
    </div>
  );
}
window.TracksPage = TracksPage;
