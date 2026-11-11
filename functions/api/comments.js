export async function onRequestGet({ env }) {
  try {
    const result = await env.DB.prepare("SELECT name, comment, created_at FROM comments WHERE status='approved' ORDER BY created_at DESC LIMIT 20").all();
    return Response.json({comments:result.results});
  } catch { return Response.json({error:"Database not configured"}, {status:503}); }
}
export async function onRequestPost({ request, env }) {
  try {
    const {name, comment, visitorId} = await request.json();
    const cleanName=String(name||"").trim().slice(0,60);
    const cleanComment=String(comment||"").trim().slice(0,600);
    if(cleanName.length<2 || cleanComment.length<3 || !visitorId) return Response.json({error:"Please enter a name and comment."},{status:400});
    const recent=await env.DB.prepare("SELECT COUNT(*) AS total FROM comments WHERE visitor_id=? AND created_at > datetime('now','-10 minutes')").bind(String(visitorId).slice(0,80)).first();
    if(recent.total>=3) return Response.json({error:"Please wait before posting another comment."},{status:429});
    await env.DB.prepare("INSERT INTO comments (visitor_id,name,comment,status,created_at) VALUES (?,?,?,'pending',datetime('now'))").bind(String(visitorId).slice(0,80),cleanName,cleanComment).run();
    return Response.json({ok:true,message:"Thank you! Your comment was submitted and will appear after review."});
  } catch { return Response.json({error:"Database not configured"},{status:503}); }
}