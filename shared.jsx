/* Shared site components: Nav, Footer, CTA Banner */

function SiteNav({ activePage }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const isHome = activePage === 'home';

  React.useEffect(() => {
    const handleResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    const handleScroll = () => {
      if (menuOpen) setMenuOpen(false);
      if (isHome) setScrolled(window.scrollY > 100);
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [menuOpen, isHome]);

  let navClass = 'site-nav';

  const pages = [
    { href: '/', label: 'Home', id: 'home' },
    { href: '/about/', label: 'About', id: 'about' },
    { href: '/tracks/', label: 'Tracks', id: 'tracks' },
    { href: '/gallery/', label: 'Gallery', id: 'gallery' },
    { href: '/store/', label: 'Store', id: 'store' },
    { href: '/sketch/', label: 'Sketch Pad', id: 'sketch' },
  ];

  return (
    <>
      <nav className={navClass}>
        <div className="nav-inner">
          <a className="nav-logo" href="/">· Sketch Studios</a>
          <ul className="nav-links">
            {pages.map(p => (
              <li key={p.id}><a href={p.href} className={activePage === p.id ? 'active' : ''}>{p.label}</a></li>
            ))}
            <li><a href="/booking/" className={`nav-cta${activePage === 'booking' ? ' active' : ''}`}>Book a Lesson</a></li>
          </ul>
        </div>
      </nav>
      {/* Mobile: floating bottom tab bar */}
      <MobileTabBar activePage={activePage} />
    </>
  );
}

const tabBarItems = [
  { href: '/', id: 'home', label: 'Home', icon: (c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> },
  { href: '/tracks/', id: 'tracks', label: 'Tracks', icon: (c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg> },
  { href: '/gallery/', id: 'gallery', label: 'Gallery', icon: (c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect></svg> },
  { href: '/store/', id: 'store', label: 'Store', icon: (c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 7v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7l-3-5z"></path><line x1="3" y1="7" x2="21" y2="7"></line><path d="M16 11a4 4 0 0 1-8 0"></path></svg> },
  { href: '/booking/', id: 'booking', label: 'Book', isPrimary: true, icon: (c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg> },
];

function MobileTabBar({ activePage }) {
  return (
    <div className="mobile-tab-dock">
      <div className="mobile-tab-pill">
        {tabBarItems.map(t => {
          const isActive = activePage === t.id;
          const color = t.isPrimary ? 'white' : (isActive ? 'var(--red)' : 'rgba(26,15,10,0.3)');
          return (
            <a key={t.id} href={t.href} className={`tab-item${t.isPrimary ? ' tab-primary' : ''}${isActive ? ' tab-active' : ''}`}>
              {t.isPrimary ? (
                <div className="tab-primary-circle">
                  {t.icon('white')}
                </div>
              ) : (
                <>
                  {t.icon(color)}
                  <span className="tab-label" style={{color}}>{t.label}</span>
                </>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}

function CtaBanner({ eyebrow, title, subtitle, primaryLabel, primaryHref, secondaryLabel, secondaryHref }) {
  return (
    <section className="cta-banner">
      {eyebrow && <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(255,255,255,0.4)',marginBottom:12}}>{eyebrow}</div>}
      <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>
      {subtitle && <p>{subtitle}</p>}
      <div className="cta-btns">
        <a href={primaryHref || '/booking/'} className="btn btn-white">{primaryLabel || 'Book a lesson'}</a>
        {secondaryLabel && <a href={secondaryHref || '#'} className="btn btn-whatsapp">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          {secondaryLabel}
        </a>}
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <div className="footer-logo">· Sketch Studios</div>
          <div className="footer-tagline">Three tracks. One place to start.</div>
        </div>
        <div className="footer-contact">
          <div><a href="tel:9298849382">929.884.9382</a></div>
          <div>Brooklyn, New York · Zoom</div>
          <div>Kids · Teens · Adults</div>
        </div>
      </div>
      <div className="footer-legal">
        © 2026 .Sketch Studios &nbsp;·&nbsp; <a href="#">Privacy Policy</a> &nbsp;·&nbsp; <a href="#">Terms of Service</a>
      </div>
    </footer>
  );
}

/* Scroll animation observer */
function useScrollAnim() {
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.anim').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* WhatsApp SVG icon */
function WhatsAppIcon({ size = 16, color = 'white' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  );
}

Object.assign(window, { SiteNav, CtaBanner, SiteFooter, useScrollAnim, WhatsAppIcon });
