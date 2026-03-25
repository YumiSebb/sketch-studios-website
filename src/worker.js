const ROBOTS_TXT = `User-agent: *
Allow: /
Disallow: /sketch
Disallow: /api/

Sitemap: https://sketchstudios.art/sitemap.xml
`;

const SITEMAP_XML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://sketchstudios.art/</loc><priority>1.0</priority></url>
  <url><loc>https://sketchstudios.art/tracks</loc><priority>0.9</priority></url>
  <url><loc>https://sketchstudios.art/booking</loc><priority>0.9</priority></url>
  <url><loc>https://sketchstudios.art/about</loc><priority>0.8</priority></url>
  <url><loc>https://sketchstudios.art/gallery</loc><priority>0.7</priority></url>
</urlset>
`;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Serve robots.txt and sitemap.xml
    if (url.pathname === '/robots.txt') {
      return new Response(ROBOTS_TXT, { headers: { 'Content-Type': 'text/plain' } });
    }
    if (url.pathname === '/sitemap.xml') {
      return new Response(SITEMAP_XML, { headers: { 'Content-Type': 'application/xml' } });
    }

    if (url.pathname === '/api/sketches') {
      const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      };

      if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
      }

      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

      if (request.method === 'GET') {
        let sketches = [];
        try {
          const stored = await env.SKETCH_KV.get('sketches', { type: 'json' });
          if (stored) sketches = stored;
        } catch (e) {
          console.error("Error reading KV:", e);
        }

        const filtered = sketches.filter(s => new Date(s.date) > weekAgo);

        if (filtered.length !== sketches.length) {
          ctx.waitUntil(env.SKETCH_KV.put('sketches', JSON.stringify(filtered)));
        }

        return new Response(JSON.stringify(filtered), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      if (request.method === 'POST') {
        try {
          const newSketch = await request.json();
          let sketches = await env.SKETCH_KV.get('sketches', { type: 'json' }) || [];
          
          sketches.unshift(newSketch);
          
          if (sketches.length > 50) sketches.length = 50;

          const filtered = sketches.filter(s => new Date(s.date) > weekAgo);

          await env.SKETCH_KV.put('sketches', JSON.stringify(filtered));

          return new Response(JSON.stringify({ success: true }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } catch (e) {
          return new Response(JSON.stringify({ error: e.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      }
    }

    // Serve static assets
    return env.ASSETS.fetch(request);
  }
};
