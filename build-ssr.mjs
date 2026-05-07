// One-shot SSR build script: transforms each .jsx via Babel, runs in Node with
// minimal browser-API stubs, renders each page to HTML using react-dom/server,
// and embeds the result into the corresponding index.html files.

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import * as Babel from '@babel/standalone';
import React from 'react';
import { renderToString } from 'react-dom/server';

const ROOT = '/tmp/yumi-repo';

// ---- Browser-API stubs so JSX files can safely run in Node ----
const noop = () => {};
const fakeWin = {
  innerWidth: 1024,                   // default to desktop
  scrollY: 0,
  addEventListener: noop,
  removeEventListener: noop,
  matchMedia: () => ({ matches: false, addEventListener: noop, removeEventListener: noop }),
};
const fakeDoc = {
  body: { style: {} },
  querySelectorAll: () => ({ forEach: noop }),
  querySelector: () => null,
  addEventListener: noop,
  removeEventListener: noop,
};
globalThis.window = fakeWin;
globalThis.document = fakeDoc;
globalThis.React = React;
globalThis.IntersectionObserver = class {
  observe(){} unobserve(){} disconnect(){}
};

// ---- Load all JSX files concatenated into a single shared scope ----
const files = ['shared.jsx', 'home.jsx', 'about.jsx', 'tracks.jsx', 'gallery.jsx', 'booking.jsx', 'store.jsx'];
const combined = files
  .map(f => `// ===== ${f} =====\n${readFileSync(join(ROOT, f), 'utf-8')}`)
  .join('\n\n');
const out = Babel.transform(combined, { presets: ['react'], filename: 'combined.jsx' });
const exec = new Function('React', out.code);
exec(React);

// ---- Pages to render ----
const PAGES = [
  { path: 'index.html',          comp: 'HomePage',     activePage: 'home' },
  { path: 'about/index.html',    comp: 'AboutPage',    activePage: 'about' },
  { path: 'tracks/index.html',   comp: 'TracksPage',   activePage: 'tracks' },
  { path: 'gallery/index.html',  comp: 'GalleryPage',  activePage: 'gallery' },
  { path: 'booking/index.html',  comp: 'BookingPage',  activePage: 'booking' },
  { path: 'store/index.html',    comp: 'StorePage',    activePage: 'store' },
];

const SiteNav = fakeWin.SiteNav;
if (!SiteNav) throw new Error('SiteNav not registered on window — JSX files may not have loaded');

for (const { path, comp, activePage } of PAGES) {
  const PageComponent = fakeWin[comp];
  if (!PageComponent) { console.error(`Missing component: ${comp}`); continue; }

  const tree = React.createElement(React.Fragment, null,
    React.createElement(SiteNav, { activePage }),
    React.createElement(PageComponent),
  );

  let html;
  try {
    html = renderToString(tree);
  } catch (e) {
    console.error(`Render failed for ${path}:`, e.message);
    continue;
  }

  // Embed the rendered HTML into the index.html
  const fullPath = join(ROOT, path);
  let pageHtml = readFileSync(fullPath, 'utf-8');
  pageHtml = pageHtml.replace(
    /<div id="root"><\/div>/,
    `<div id="root">${html}</div>`
  );
  // Switch createRoot().render() to hydrateRoot() so React doesn't blow away the SSR output
  pageHtml = pageHtml.replace(
    /ReactDOM\.createRoot\(document\.getElementById\('root'\)\)\.render\(<App \/>\);/,
    `ReactDOM.hydrateRoot(document.getElementById('root'), <App />);`
  );
  writeFileSync(fullPath, pageHtml);
  console.log(`✓ Rendered ${path} (${html.length} bytes)`);
}

console.log('\nDone.');
