/* Tracks page — Tab Switcher direction (B) */

const TRACKS = [
  {
    id: 'core',
    n: '01',
    label: 'Track One',
    short: 'Core',
    title: 'Core Technique',
    pitch: 'For students who want to actually learn to draw and paint, not just dabble.',
    long: 'Structured, personalized instruction that builds real, measurable skills. Homework between sessions. Results in weeks, not years.',
    bestFor: 'Skill builders',
    structure: 'Structured, progressive',
    materials: 'Pencil, charcoal, paint',
    homework: 'Yes',
    tone: 'dark',
    img: 'https://picsum.photos/seed/track-core-prod/800/500',
  },
  {
    id: 'flow',
    n: '02',
    label: 'Track Two',
    short: 'Flow',
    title: 'Intuitive Flow',
    pitch: 'For students who want art as a creative outlet: a mindful, pressure-free practice.',
    long: "Mixed media exploration with no grades, no pressure. Express what words can't. Art as practice, not performance.",
    bestFor: 'Creative expression',
    structure: 'Open, exploratory',
    materials: 'Mixed media, collage',
    homework: 'Optional',
    tone: 'light',
    img: 'https://picsum.photos/seed/track-flow-prod/800/500',
  },
  {
    id: 'master',
    n: '03',
    label: 'Track Three',
    short: 'Mastery',
    title: 'Advanced Mastery',
    pitch: 'Go deeper with oil painting, watercolor, and hyper-realistic portrait drawing.',
    long: 'For students who have built a foundation and are ready to push further into advanced techniques and longer-form projects.',
    bestFor: 'Pushing further',
    structure: 'Advanced projects',
    materials: 'Oil, watercolor, charcoal',
    homework: 'Yes',
    tone: 'red',
    img: 'https://picsum.photos/seed/track-master-prod/800/500',
  },
];

function TracksPage() {
  useScrollAnim();
  const [active, setActive] = React.useState(0);
  const t = TRACKS[active];

  // Read ?track=core|flow|master from URL on mount
  React.useEffect(() => {
    const url = new URL(window.location.href);
    const q = url.searchParams.get('track');
    if (!q) return;
    const idx = TRACKS.findIndex(tt => tt.id === q);
    if (idx >= 0) setActive(idx);
  }, []);

  return (
    <div className="page tracks-page-b">
      <section className="tracks-hero-b anim">
        <div className="label" style={{justifyContent:'center'}}>Three tracks</div>
        <h1 className="tracks-h1-b">Choose your <span className="script">path.</span></h1>
        <p className="tracks-sub-b">Tap a track below to learn more, or scroll to the bottom and let Milky help you choose.</p>
      </section>

      <div className="tracks-tabs-wrap">
        <div className="tracks-tabs-inner">
          <div className="tracks-tabs">
            {TRACKS.map((tt, i) => (
              <button
                key={tt.id}
                onClick={() => setActive(i)}
                className={`tracks-tab${active === i ? ' active' : ''}`}
              >
                {tt.n}
              </button>
            ))}
          </div>
          <div className="tracks-tab-labels">
            {TRACKS.map((tt, i) => (
              <div key={tt.id} className={`tracks-tab-label${active === i ? ' active' : ''}`}>
                {tt.short}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section key={t.id} className={`track-detail-b tone-${t.tone}`}>
        <div className="track-detail-inner">
          <div className="track-detail-eyebrow">{t.label}</div>
          <h2 className="track-detail-title">{t.title}</h2>
          <p className="track-detail-pitch">{t.pitch}</p>

          <div className="track-detail-img">
            <img src={t.img} alt={t.title} />
          </div>

          <p className="track-detail-long">{t.long}</p>

          <div className="track-spec-grid">
            <div className="track-spec">
              <div className="track-spec-k">Best for</div>
              <div className="track-spec-v">{t.bestFor}</div>
            </div>
            <div className="track-spec">
              <div className="track-spec-k">Structure</div>
              <div className="track-spec-v">{t.structure}</div>
            </div>
            <div className="track-spec">
              <div className="track-spec-k">Materials</div>
              <div className="track-spec-v">{t.materials}</div>
            </div>
            <div className="track-spec">
              <div className="track-spec-k">Homework</div>
              <div className="track-spec-v">{t.homework}</div>
            </div>
          </div>

          <a href="/booking/" className="track-detail-cta">Start {t.title} →</a>
        </div>
      </section>

      <section className="tracks-help-b">
        <div className="label" style={{justifyContent:'center'}}>Still deciding?</div>
        <h2 className="tracks-help-title">
          Book a lesson and<br/><span className="script">Milky will help you choose.</span>
        </h2>
        <p className="tracks-help-sub">One lesson is all it takes.</p>
        <a href="/booking/" className="btn btn-red">Book a lesson →</a>
      </section>

      <SiteFooter />
    </div>
  );
}
window.TracksPage = TracksPage;
