export async function onRequestPost({ request, env }) {
  try {
    const { visitorId } = await request.json();
    if (!visitorId || String(visitorId).length > 80) return Response.json({error:"Invalid visitor"}, {status:400});
    const existing = await env.DB.prepare("SELECT visitor_id FROM likes WHERE visitor_id=?").bind(visitorId).first();
    if (existing) await env.DB.prepare("DELETE FROM likes WHERE visitor_id=?").bind(visitorId).run();
    else await env.DB.prepare("INSERT INTO likes (visitor_id, created_at) VALUES (?, datetime('now'))").bind(visitorId).run();
    return Response.json({ok:true, liked:!existing});
  } catch { return Response.json({error:"Database not configured"}, {status:503}); }
}