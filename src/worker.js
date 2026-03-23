export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

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

    // Serve static assets natively for all other routes
    return env.ASSETS.fetch(request);
  }
};
