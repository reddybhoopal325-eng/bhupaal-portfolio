export async function onRequestGet({ request, env }) {
  try {
    const visitorId = new URL(request.url).searchParams.get("visitorId") || "";
    const [views, likes, comments, recent, liked] = await Promise.all([
      env.DB.prepare("SELECT COUNT(*) AS total FROM views").first(),
      env.DB.prepare("SELECT COUNT(*) AS total FROM likes").first(),
      env.DB.prepare("SELECT COUNT(*) AS total FROM comments WHERE status='approved'").first(),
      env.DB.prepare("SELECT name, comment, created_at FROM comments WHERE status='approved' ORDER BY created_at DESC LIMIT 6").all(),
      visitorId ? env.DB.prepare("SELECT visitor_id FROM likes WHERE visitor_id=?").bind(visitorId).first() : null
    ]);
    return Response.json({views:views.total, likes:likes.total, comments:comments.total, recentComments:recent.results, liked:!!liked});
  } catch { return Response.json({error:"Database not configured"}, {status:503}); }
}