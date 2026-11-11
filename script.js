const projects = [
  {title:"Gym Poster",category:"photoshop",type:"image",src:"assets/works/photoshop/gym-poster.webp"},
  {title:"Creative Poster",category:"photoshop",type:"image",src:"assets/works/photoshop/creative-poster.webp"},
  {title:"Food Flyer",category:"illustrator",type:"image",src:"assets/works/illustrator/food-flyer.webp"},
  {title:"ID Card — Front",category:"illustrator",type:"image",src:"assets/works/illustrator/id-card-front.webp"},
  {title:"ID Card — Back",category:"illustrator",type:"image",src:"assets/works/illustrator/id-card-back.webp"},
  {title:"Letterhead Design",category:"illustrator",type:"image",src:"assets/works/illustrator/letterhead.webp"},
  {title:"Logo Design",category:"illustrator",type:"image",src:"assets/works/illustrator/logo-design.webp"},
  {title:"Menu Card — 01",category:"illustrator",type:"image",src:"assets/works/illustrator/menu-card-01.webp"},
  {title:"Menu Card — 02",category:"illustrator",type:"image",src:"assets/works/illustrator/menu-card-02.webp"},
  {title:"Travel Flyer",category:"illustrator",type:"image",src:"assets/works/illustrator/travel-flyer.webp"},
  {title:"Trifold Brochure",category:"illustrator",type:"image",src:"assets/works/illustrator/trifold-brochure.webp"},
  {title:"Visiting Card — 01",category:"illustrator",type:"image",src:"assets/works/illustrator/visiting-card-01.webp"},
  {title:"Visiting Card — 02",category:"illustrator",type:"image",src:"assets/works/illustrator/visiting-card-02.webp"},
  {title:"History of Animation",category:"after-effects",type:"video",src:"assets/works/after-effects/history-of-animation.mp4"},
  {title:"Task Flow",category:"after-effects",type:"video",src:"assets/works/after-effects/task-flow.mp4"},
  {title:"Video Edit — 01",category:"premiere-pro",type:"video",src:"assets/works/premiere-pro/video-edit-01.mp4"},
  {title:"Klickpin Edit",category:"premiere-pro",type:"video",src:"assets/works/premiere-pro/klickpin-edit.mp4"},
  {title:"Wedding Invitation",category:"premiere-pro",type:"video",src:"assets/works/premiere-pro/wedding-invitation.mp4"}
];
const labels={"photoshop":"Photoshop","illustrator":"Illustrator","after-effects":"After Effects","premiere-pro":"Premiere Pro"};
const gallery=document.querySelector("#gallery");
function renderGallery(filter="all"){
  const list=projects.filter(p=>filter==="all"||p.category===filter);
  gallery.innerHTML=list.map(p=>`<article class="project-card"><div class="project-media">${p.type==="video"?`<video src="${p.src}" controls preload="metadata" playsinline aria-label="${p.title}"></video>`:`<img src="${p.src}" loading="lazy" alt="${p.title}">`}<button class="project-open" type="button" data-open="${p.src}" data-type="${p.type}">Open ↗</button></div><div class="project-info"><small>${labels[p.category]}</small><h3>${p.title}</h3></div></article>`).join("");
}
renderGallery();
document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");renderGallery(btn.dataset.filter);
}));
gallery.addEventListener("click",e=>{
  const b=e.target.closest("[data-open]");if(!b)return;
  if(b.dataset.type==="image")window.open(b.dataset.open,"_blank","noopener");
  else {const v=gallery.querySelector(`video[src="${CSS.escape(b.dataset.open)}"]`);if(v){v.scrollIntoView({behavior:"smooth",block:"center"});v.focus();}}
});
const nav=document.querySelector(".nav"),toggle=document.querySelector(".menu-toggle");
toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
document.querySelector("#year").textContent=new Date().getFullYear();

function visitorId(){
  let id=localStorage.getItem("bhupaal_visitor_id");
  if(!id){id=crypto.randomUUID();localStorage.setItem("bhupaal_visitor_id",id);}
  return id;
}
const api=async(path,options={})=>{
  const response=await fetch(`/api/${path}`,{...options,headers:{"Content-Type":"application/json",...(options.headers||{})}});
  if(!response.ok)throw new Error("API unavailable");
  return response.json();
};
async function refreshCommunity(){
  try{
    const data=await api("stats?visitorId="+encodeURIComponent(visitorId()));
    document.querySelector("#view-count").textContent=Number(data.views||0).toLocaleString();
    document.querySelector("#like-count").textContent=Number(data.likes||0).toLocaleString();
    document.querySelector("#comment-count").textContent=Number(data.comments||0).toLocaleString();
    document.querySelector("#like-button").classList.toggle("liked",!!data.liked);
    document.querySelector("#like-button b").textContent=data.liked?"Liked":"Like this portfolio";
    const list=document.querySelector("#comments-list");
    list.innerHTML=data.recentComments?.length?data.recentComments.map(c=>`<article class="comment"><b>${escapeHTML(c.name)}</b><time>${new Date(c.created_at).toLocaleDateString()}</time><p>${escapeHTML(c.comment)}</p></article>`).join(""):'<p class="muted">Be the first to leave a comment.</p>';
  }catch{
    ["#view-count","#like-count","#comment-count"].forEach(sel=>document.querySelector(sel).textContent="—");
    document.querySelector("#comments-list").innerHTML='<p class="muted">Engagement counters will activate after Cloudflare D1 is connected.</p>';
  }
}
function escapeHTML(value){return String(value).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));}
(async()=>{
  try{await api("view",{method:"POST",body:JSON.stringify({visitorId:visitorId()})});}catch{}
  refreshCommunity();
})();
document.querySelector("#like-button").addEventListener("click",async()=>{
  const button=document.querySelector("#like-button");button.disabled=true;
  try{await api("like",{method:"POST",body:JSON.stringify({visitorId:visitorId()})});document.querySelector("#like-note").textContent="Thanks for supporting my work!";await refreshCommunity();}
  catch{document.querySelector("#like-note").textContent="Likes will activate after the site database is connected.";}
  finally{button.disabled=false;}
});
document.querySelector("#comment-form").addEventListener("submit",async e=>{
  e.preventDefault();const form=e.currentTarget;const message=document.querySelector("#form-message");
  const body=Object.fromEntries(new FormData(form).entries());body.visitorId=visitorId();
  try{const result=await api("comments",{method:"POST",body:JSON.stringify(body)});message.textContent=result.message||"Thanks! Your comment was submitted for review.";form.reset();await refreshCommunity();}
  catch{message.textContent="Comments will activate after Cloudflare D1 is connected.";}
});
