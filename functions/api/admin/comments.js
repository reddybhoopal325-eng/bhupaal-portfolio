export async function onRequestGet({ request, env }) {
  if (!authorized(request, env)) return Response.json({error:"Unauthorized"},{status:401});
  const result=await env.DB.prepare("SELECT id,name,comment,status,created_at FROM comments ORDER BY created_at DESC LIMIT 100").all();
  return Response.json({comments:result.results});
}
export async function onRequestPost({ request, env }) {
  if (!authorized(request, env)) return Response.json({error:"Unauthorized"},{status:401});
  const {id, action}=await request.json();
  if(!Number.isInteger(id) || !["approve","delete"].includes(action)) return Response.json({error:"Invalid request"},{status:400});
  if(action==="delete") await env.DB.prepare("DELETE FROM comments WHERE id=?").bind(id).run();
  else await env.DB.prepare("UPDATE comments SET status='approved' WHERE id=?").bind(id).run();
  return Response.json({ok:true});
}
function authorized(request,env){return !!env.ADMIN_TOKEN && request.headers.get("Authorization")==="Bearer "+env.ADMIN_TOKEN;}