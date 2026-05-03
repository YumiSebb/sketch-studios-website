/* Gallery page — Instagram-style grid
   Mobile: tap → vertical scrollable feed (swipe up like IG)
   Desktop: tap → centered overlay with left/right arrows */
function GalleryPage() {
  useScrollAnim();
  const [tab, setTab] = React.useState('students');
  const [selected, setSelected] = React.useState(null);
  const feedRef = React.useRef(null);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const galleryData = {
    students: [
      { src: 'https://picsum.photos/seed/studentportrait/600/600', title: 'Portrait Study', meta: 'Core Technique', artist: 'Student Work', date: 'Apr 2026', desc: 'Graphite portrait study focusing on value and proportion. 8 weeks into the Core Technique track.' },
      { src: 'https://picsum.photos/seed/studentcharcoal/600/600', title: 'Charcoal Still Life', meta: 'Core Technique', artist: 'Student Work', date: 'Mar 2026', desc: 'Charcoal still life exploring light, shadow, and composition.' },
      { src: 'https://picsum.photos/seed/studentwatercolor/600/600', title: 'Watercolor Landscape', meta: 'Advanced Mastery', artist: 'Student Work', date: 'Mar 2026', desc: 'Watercolor landscape painted en plein air in Prospect Park.' },
      { src: 'https://picsum.photos/seed/studentabstract/600/600', title: 'Abstract Expression', meta: 'Intuitive Flow', artist: 'Student Work', date: 'Feb 2026', desc: 'Mixed media abstract exploring color and emotion. Intuitive Flow session.' },
      { src: 'https://picsum.photos/seed/studentpencil/600/600', title: 'Pencil Drawing', meta: 'Core Technique', artist: 'Student Work', date: 'Feb 2026', desc: 'Detailed pencil drawing working on fine line control and hatching.' },
      { src: 'https://picsum.photos/seed/studentmixed/600/600', title: 'Mixed Media Collage', meta: 'Intuitive Flow', artist: 'Student Work', date: 'Jan 2026', desc: 'Collage combining paint, paper, and found materials.' },
      { src: 'https://picsum.photos/seed/studentoil1/600/600', title: 'First Oil Painting', meta: 'Advanced Mastery', artist: 'Student Work', date: 'Jan 2026', desc: "A student's first attempt at oil painting after 12 weeks of drawing." },
      { src: 'https://picsum.photos/seed/studentgest/600/600', title: 'Gesture Sketches', meta: 'Core Technique', artist: 'Student Work', date: 'Dec 2025', desc: '2-minute gesture drawings focusing on movement and flow.' },
      { src: 'https://picsum.photos/seed/studentink/600/600', title: 'Ink Wash', meta: 'Intuitive Flow', artist: 'Student Work', date: 'Dec 2025', desc: 'Ink wash experiment exploring tonal range with a single color.' },
    ],
    teacher: [
      { src: 'https://picsum.photos/seed/milkyoil/600/600', title: 'Evening Light', meta: 'Oil on canvas', artist: 'Milky', date: '2025', desc: 'An oil painting capturing the warm light of a Brooklyn evening.' },
      { src: 'https://picsum.photos/seed/milkywatercolor/600/600', title: 'Brooklyn Botanicals', meta: 'Watercolor', artist: 'Milky', date: '2025', desc: 'Watercolor botanical studies from the Brooklyn Botanic Garden.' },
      { src: 'https://picsum.photos/seed/milkyportrait/600/600', title: 'Portrait Commission', meta: 'Charcoal on paper', artist: 'Milky', date: '2024', desc: 'A commissioned charcoal portrait drawn from a live sitting.' },
      { src: 'https://picsum.photos/seed/milkyabstract/600/600', title: 'Flow Series No. 3', meta: 'Acrylic & ink', artist: 'Milky', date: '2024', desc: 'Part of an ongoing series exploring intuitive mark-making.' },
      { src: 'https://picsum.photos/seed/milkypencil/600/600', title: 'Gesture Studies', meta: 'Graphite', artist: 'Milky', date: '2024', desc: 'Quick gesture studies from a figure drawing session.' },
      { src: 'https://picsum.photos/seed/milkylandscape/600/600', title: 'Prospect Park', meta: 'Oil on canvas', artist: 'Milky', date: '2023', desc: 'A plein air oil painting of Prospect Park in autumn.' },
      { src: 'https://picsum.photos/seed/milkyfloral/600/600', title: 'Peonies', meta: 'Watercolor', artist: 'Milky', date: '2023', desc: 'Loose watercolor florals painted from life.' },
      { src: 'https://picsum.photos/seed/milkychar2/600/600', title: 'Self Portrait', meta: 'Charcoal on paper', artist: 'Milky', date: '2023', desc: 'A self-portrait study in vine charcoal.' },
      { src: 'https://picsum.photos/seed/milkyabs2/600/600', title: 'Flow Series No. 7', meta: 'Acrylic & ink', artist: 'Milky', date: '2024', desc: 'Layered acrylic and ink on paper. Exploring texture and depth.' },
    ],
  };
  const items = galleryData[tab];

  // Scroll to tapped post when feed opens (mobile)
  React.useEffect(() => {
    if (selected !== null && isMobile && feedRef.current) {
      requestAnimationFrame(() => {
        const post = feedRef.current.querySelector(`[data-index="${selected}"]`);
        if (post) feedRef.current.scrollTo({ top: post.offsetTop, behavior: 'instant' });
      });
    }
  }, [selected !== null]);

  // Escape to close
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Desktop: arrow key navigation
  React.useEffect(() => {
    if (selected === null || isMobile) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setSelected(s => Math.min(s + 1, items.length - 1));
      if (e.key === 'ArrowLeft') setSelected(s => Math.max(s - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected, items.length, isMobile]);

  // Lock body scroll when open
  React.useEffect(() => {
    if (selected !== null) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  return (
    <div className="page">
      {/* Header */}
      <section className="ig-header">
        <div className="ig-profile">
          <div className="ig-avatar">·S</div>
          <div>
            <h1 className="ig-username">sketch.studios</h1>
            <p className="ig-bio">Art lessons for kids, teens & adults · Brooklyn & Zoom</p>
          </div>
        </div>
        <div className="ig-tabs">
          <button className={`ig-tab${tab==='students'?' active':''}`} onClick={()=>{setTab('students');setSelected(null);}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect></svg>
            Student Work
          </button>
          <button className={`ig-tab${tab==='teacher'?' active':''}`} onClick={()=>{setTab('teacher');setSelected(null);}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            Milky's Work
          </button>
        </div>
      </section>

      {/* Grid */}
      <div className="ig-grid">
        {items.map((item, i) => (
          <div key={`${tab}-${i}`} className="ig-cell" onClick={() => setSelected(i)}>
            <img src={item.src} alt={item.title} loading="lazy" />
          </div>
        ))}
      </div>

      {/* MOBILE: Vertical scrollable feed */}
      {selected !== null && isMobile && (
        <div className="ig-feed-overlay">
          <div className="ig-feed-topbar">
            <button className="ig-feed-back" onClick={() => setSelected(null)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <span className="ig-feed-topbar-title">{tab === 'students' ? 'Student Work' : "Milky's Work"}</span>
            <div style={{width:44}}></div>
          </div>
          <div className="ig-feed-scroll" ref={feedRef}>
            {items.map((item, i) => (
              <div key={`${tab}-feed-${i}`} className="ig-post" data-index={i}>
                <div className="ig-post-header">
                  <div className="ig-detail-avatar">·S</div>
                  <div>
                    <div className="ig-detail-artist">{item.artist}</div>
                    <div className="ig-detail-date">{item.date}</div>
                  </div>
                </div>
                <div className="ig-post-img">
                  <img src={item.src} alt={item.title} loading="lazy" />
                </div>
                <div className="ig-post-info">
                  <div className="ig-detail-title">{item.title}</div>
                  <div className="ig-detail-meta">{item.meta}</div>
                  <p className="ig-detail-desc">{item.desc}</p>
                </div>
              </div>
            ))}
            <div style={{padding:'24px 16px',textAlign:'center'}}>
              <a href="/booking/" className="btn btn-red" style={{width:'100%',maxWidth:300,fontSize:10}}>Book a lesson</a>
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP: Centered overlay with arrows */}
      {selected !== null && !isMobile && (
        <div className="ig-detail-overlay" onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}>
          <div className="ig-detail">
            <div className="ig-detail-header">
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <div className="ig-detail-avatar">·S</div>
                <div>
                  <div className="ig-detail-artist">{items[selected].artist}</div>
                  <div className="ig-detail-date">{items[selected].date}</div>
                </div>
              </div>
              <button className="ig-detail-close" onClick={() => setSelected(null)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div className="ig-detail-img">
              <img src={items[selected].src} alt={items[selected].title} />
              {selected > 0 && (
                <button className="ig-nav ig-nav-prev" onClick={(e) => { e.stopPropagation(); setSelected(selected - 1); }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
              )}
              {selected < items.length - 1 && (
                <button className="ig-nav ig-nav-next" onClick={(e) => { e.stopPropagation(); setSelected(selected + 1); }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              )}
            </div>
            <div className="ig-detail-info">
              <div className="ig-detail-title">{items[selected].title}</div>
              <div className="ig-detail-meta">{items[selected].meta}</div>
              <p className="ig-detail-desc">{items[selected].desc}</p>
              <a href="/booking/" className="btn btn-red" style={{width:'100%',marginTop:16,fontSize:10}}>Book a lesson</a>
            </div>
          </div>
        </div>
      )}

      <CtaBanner
        eyebrow="Your work could be here"
        title='Everyone starts <span class="script">somewhere.</span>'
        subtitle="Book a lesson and start creating."
      />
      <SiteFooter />
    </div>
  );
}
window.GalleryPage = GalleryPage;
