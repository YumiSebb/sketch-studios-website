/* Store — Full e-commerce with size selector, cart, WhatsApp checkout */
function StorePage() {
  useScrollAnim();
  const [tab, setTab] = React.useState('originals');
  const [selected, setSelected] = React.useState(null);
  const [sizeIdx, setSizeIdx] = React.useState(0);
  const [cart, setCart] = React.useState([]);
  const [showCart, setShowCart] = React.useState(false);

  const originals = [
    { id:'p1', title:'Portrait Commission', priceLabel:'From $350', desc:'Custom portrait in pencil, charcoal, or oil. From a photo or live sitting.', img:'https://picsum.photos/seed/portrait-store/500/625', tag:'Most popular', details:'Work with Milky to create a one-of-a-kind portrait. Choose your medium — graphite, charcoal, or oil on canvas. Commissions typically take 2–4 weeks. Includes one round of revisions.', sizes:['8×10','11×14','16×20'], sizePrices:[350,450,600] },
    { id:'p2', title:'Custom Oil Painting', priceLabel:'From $500', desc:"Oil on canvas — landscapes, portraits, or abstract. Your vision, Milky's hand.", img:'https://picsum.photos/seed/oil-store/500/625', details:'A fully custom oil painting on stretched canvas. Share your vision and Milky will bring it to life. Allow 4–6 weeks.', sizes:['12×16','18×24','24×36'], sizePrices:[500,750,1100] },
    { id:'p3', title:'Pet Portrait', priceLabel:'From $200', desc:'Your pet in charcoal or colored pencil. From your favorite photo.', img:'https://picsum.photos/seed/pet-store/500/625', details:'Send your favorite photo and Milky creates a detailed portrait. A perfect gift for any animal lover. 1–2 weeks.', sizes:['8×10','11×14'], sizePrices:[200,300] },
    { id:'p4', title:'Watercolor Piece', priceLabel:'From $250', desc:'Florals, cityscapes, or portraits in watercolor.', img:'https://picsum.photos/seed/watercolor-store/500/625', details:'Delicate, expressive watercolor paintings on archival paper. Choose a subject or let Milky surprise you.', sizes:['9×12','11×14'], sizePrices:[250,350] },
    { id:'p5', title:'Gift Package', priceLabel:'From $150', desc:'A custom sketch or painting, wrapped and ready.', img:'https://picsum.photos/seed/gift-store/500/625', tag:'Great gift', details:'Milky creates a small custom piece — beautifully wrapped and ready to give.', sizes:['Small sketch','Mini painting'], sizePrices:[150,250] },
    { id:'p6', title:'Original Charcoal', priceLabel:'$280', desc:'One-of-a-kind charcoal drawing.', img:'https://picsum.photos/seed/charcoal-store/500/625', details:'Rich, dramatic tonal work on textured paper. Each piece is unique and signed by Milky.', sizes:['11×14','16×20'], sizePrices:[280,400] },
  ];

  const prints = [
    { id:'r1', title:'Brooklyn Botanicals', priceLabel:'$45', desc:'Archival giclée print on matte paper.', img:'https://picsum.photos/seed/print-botanicals/500/625', tag:'Bestseller', details:"High-quality giclée reproduction of Milky's watercolor botanical studies. Archival matte paper, fade-resistant inks.", sizes:['11×14','16×20'], sizePrices:[45,65] },
    { id:'r2', title:'Prospect Park', priceLabel:'$45', desc:'Oil painting reproduction on archival paper.', img:'https://picsum.photos/seed/print-prospect/500/625', details:"A print of Milky's plein air oil painting of Prospect Park in autumn.", sizes:['11×14','16×20'], sizePrices:[45,65] },
    { id:'r3', title:'Flow Series No. 3', priceLabel:'$35', desc:'Abstract acrylic and ink print.', img:'https://picsum.photos/seed/print-flow3/500/625', details:"From Milky's ongoing abstract series exploring intuitive mark-making.", sizes:['8×10','11×14'], sizePrices:[35,50] },
    { id:'r4', title:'Evening Light', priceLabel:'$45', desc:'Warm-toned oil painting print.', img:'https://picsum.photos/seed/print-evening/500/625', details:"A reproduction of one of Milky's most popular oil paintings.", sizes:['11×14','16×20'], sizePrices:[45,65] },
    { id:'r5', title:'Gesture Studies', priceLabel:'$25', desc:'Set of 3 graphite gesture drawings.', img:'https://picsum.photos/seed/print-gesture/500/625', details:'Minimal, elegant line work. Looks beautiful grouped on a wall.', sizes:['Set of 3, 8×10'], sizePrices:[25] },
    { id:'r6', title:'Peonies', priceLabel:'$35', desc:'Delicate watercolor florals.', img:'https://picsum.photos/seed/print-peonies/500/625', tag:'New', details:'Soft, loose watercolor peonies. Available framed or unframed.', sizes:['8×10 unframed','8×10 framed','11×14 unframed'], sizePrices:[35,65,50] },
  ];

  const items = tab === 'originals' ? originals : prints;
  const cartTotal = cart.reduce((s,i) => s + i.selectedPrice, 0);

  function addToCart() {
    if (!selected) return;
    setCart(c => [...c, { ...selected, selectedSize: selected.sizes[sizeIdx], selectedPrice: selected.sizePrices[sizeIdx], cartId: Date.now() }]);
    setSelected(null);
    setSizeIdx(0);
  }

  function buildWhatsAppMsg() {
    let msg = "Hi Milky! I'd like to order:\n\n";
    cart.forEach(item => { msg += `• ${item.title} (${item.selectedSize}) — $${item.selectedPrice}\n`; });
    msg += `\nTotal: $${cartTotal}\n\nPlease let me know how to proceed!`;
    return `https://wa.me/19298849382?text=${encodeURIComponent(msg)}`;
  }

  React.useEffect(() => {
    if (selected || showCart) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [selected, showCart]);

  return (
    <div className="page">
      {/* Browse view — always in DOM */}
      <section className="store-b-header">
        <div className="label">Store</div>
        <h1 className="section-title">Shop <span className="script">artwork.</span></h1>
        <p className="body-text" style={{maxWidth:360,marginBottom:20}}>Original commissions and fine art prints. Every piece made or curated by Milky.</p>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div className="store-tabs" style={{flex:1}}>
            <button className={`store-tab${tab==='originals'?' active':''}`} onClick={()=>setTab('originals')}>Originals</button>
            <button className={`store-tab${tab==='prints'?' active':''}`} onClick={()=>setTab('prints')}>Prints</button>
          </div>
          <CartButton count={cart.length} onClick={() => setShowCart(true)} />
        </div>
      </section>

      <div className="store-shop-grid" key={tab}>
        {items.map(item => (
          <div key={item.id} className="store-shop-card" onClick={() => { setSelected(item); setSizeIdx(0); }}>
            <div className="store-shop-img-wrap">
              <img src={item.img} alt={item.title} loading="lazy" />
              {item.tag && <span className="store-b-tag">{item.tag}</span>}
            </div>
            <div className="store-shop-meta">
              <div className="store-shop-title">{item.title}</div>
              <div className="store-shop-price">{item.priceLabel}</div>
            </div>
          </div>
        ))}
      </div>

      <CtaBanner
        title={"Have something in mind?<br/><span class=\"script\">Let's talk.</span>"}
        subtitle="Every commission starts with a conversation."
        primaryLabel="WhatsApp Milky"
        primaryHref="https://wa.me/19298849382"
      />
      <SiteFooter />

      {/* Product detail overlay */}
      {selected && (
        <div className="store-product-view">
          <div className="store-pv-topbar">
            <button className="store-pv-back" onClick={() => { setSelected(null); setSizeIdx(0); }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              Back
            </button>
            <CartButton count={cart.length} onClick={() => { setSelected(null); setShowCart(true); }} />
          </div>
          <div className="store-pv-scroll">
            <img src={selected.img} alt={selected.title} className="store-pv-img" />
            <div className="store-pv-body">
              {selected.tag && <div className="store-pv-tag">{selected.tag}</div>}
              <h2 className="store-pv-title">{selected.title}</h2>
              <div className="store-pv-price">${selected.sizePrices[sizeIdx]}</div>
              <p className="store-pv-desc">{selected.details}</p>
              <div className="store-pv-sizes-label">Select size</div>
              <div className="store-pv-sizes">
                {selected.sizes.map((s, i) => (
                  <button key={i} className={`store-pv-size${sizeIdx === i ? ' active' : ''}`} onClick={() => setSizeIdx(i)}>
                    <span>{s}</span>
                    <span className="store-pv-size-price">${selected.sizePrices[i]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="store-pv-footer">
            <button className="btn btn-red store-pv-add" onClick={addToCart}>Add to cart — ${selected.sizePrices[sizeIdx]}</button>
            <a href="https://wa.me/19298849382" className="btn btn-ghost store-pv-msg">Message Milky first</a>
          </div>
        </div>
      )}

      {/* Cart overlay */}
      {showCart && (
        <div className="store-cart-view">
          <div className="store-pv-topbar">
            <button className="store-pv-back" onClick={() => setShowCart(false)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              Back
            </button>
            <span className="store-cart-title">Cart ({cart.length})</span>
            <div style={{width:50}}></div>
          </div>
          <div className="store-cart-body">
            {cart.length === 0 ? (
              <div className="store-cart-empty">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(26,15,10,0.15)" strokeWidth="1.5"><path d="M6 2 3 7v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7l-3-5z"></path><line x1="3" y1="7" x2="21" y2="7"></line><path d="M16 11a4 4 0 0 1-8 0"></path></svg>
                <p>Your cart is empty.</p>
                <button className="btn btn-ghost" onClick={() => setShowCart(false)} style={{marginTop:12,fontSize:11}}>Browse store</button>
              </div>
            ) : (
              cart.map((item, i) => (
                <div key={item.cartId} className="store-cart-item">
                  <img src={item.img} alt={item.title} className="store-cart-thumb" />
                  <div className="store-cart-item-info">
                    <div className="store-cart-item-title">{item.title}</div>
                    <div className="store-cart-item-size">{item.selectedSize}</div>
                  </div>
                  <div className="store-cart-item-price">${item.selectedPrice}</div>
                  <button className="store-cart-remove" onClick={() => setCart(c => c.filter((_, j) => j !== i))}>×</button>
                </div>
              ))
            )}
          </div>
          {cart.length > 0 && (
            <div className="store-cart-footer">
              <div className="store-cart-total">
                <span>Total</span>
                <span>${cartTotal}</span>
              </div>
              <a href={buildWhatsAppMsg()} target="_blank" className="btn btn-red store-pv-add">
                <WhatsAppIcon size={16} />
                Checkout via WhatsApp
              </a>
              <p className="store-cart-note">Your cart will be sent to Milky via WhatsApp to confirm and arrange payment.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CartButton({ count, onClick }) {
  return (
    <button className="store-cart-btn" onClick={onClick}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 7v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7l-3-5z"></path><line x1="3" y1="7" x2="21" y2="7"></line><path d="M16 11a4 4 0 0 1-8 0"></path></svg>
      {count > 0 && <div className="store-cart-badge">{count}</div>}
    </button>
  );
}

window.StorePage = StorePage;
