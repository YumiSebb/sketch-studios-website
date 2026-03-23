export async function onRequestGet(context) {
  const { env } = context;
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  
  let sketches = [];
  try {
    if (!env.SKETCH_KV) {
      return new Response(JSON.stringify({ error: "KV binding 'SKETCH_KV' not found" }), { status: 500 });
    }
    const stored = await env.SKETCH_KV.get('sketches', { type: 'json' });
    if (stored) sketches = stored;
  } catch (e) {
    console.error("Error reading KV:", e);
  }

  // Filter older than 7 days
  const filtered = sketches.filter(s => new Date(s.date) > weekAgo);

  // If we filtered out some sketches, trigger a background update to clean up KV
  if (filtered.length !== sketches.length) {
    context.waitUntil(env.SKETCH_KV.put('sketches', JSON.stringify(filtered)));
  }

  return new Response(JSON.stringify(filtered), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  try {
    if (!env.SKETCH_KV) {
      return new Response(JSON.stringify({ error: "KV binding 'SKETCH_KV' not found" }), { status: 500 });
    }

    const newSketch = await request.json();
    let sketches = await env.SKETCH_KV.get('sketches', { type: 'json' }) || [];
    
    sketches.unshift(newSketch);
    
    // Keep only max 50 recent sketches
    if (sketches.length > 50) sketches.length = 50;

    // Also apply the 7-day filter when saving to keep KV clean
    const filtered = sketches.filter(s => new Date(s.date) > weekAgo);

    await env.SKETCH_KV.put('sketches', JSON.stringify(filtered));

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
