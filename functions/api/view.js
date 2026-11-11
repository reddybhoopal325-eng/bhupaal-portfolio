export async function onRequestPost({ request, env }) {
  try {
    const { visitorId } = await request.json();
    if (!visitorId || String(visitorId).length > 80) return Response.json({error:"Invalid visitor"}, {status:400});
    await env.DB.prepare("INSERT INTO views (visitor_id, created_at) VALUES (?, datetime('now'))").bind(visitorId).run();
    return Response.json({ok:true});
  } catch { return Response.json({error:"Database not configured"}, {status:503}); }
}