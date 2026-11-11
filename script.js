
/* =========================================
   BHUPAAL REDDY PORTFOLIO
   Updated Gallery + Service Cards
========================================= */

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

const labels = {
  "photoshop": "Photoshop",
  "illustrator": "Illustrator",
  "after-effects": "After Effects",
  "premiere-pro": "Premiere Pro"
};

const services = {
  "graphic-design": {
    title: "Graphic Design",
    categories: ["photoshop", "illustrator"]
  },
  "motion-graphics": {
    title: "Motion Graphics",
    categories: ["after-effects"]
  },
  "video-editing": {
    title: "Video Editing",
    categories: ["premiere-pro"]
  }
};

const gallery = document.querySelector("#gallery");
const workSection = document.querySelector("#work");
const serviceCards = [...document.querySelectorAll(".hero-stats .stat-card")];

let currentService = null;

/* =========================================
   GALLERY TOOLBAR
========================================= */

const toolbar = document.createElement("div");
toolbar.className = "gallery-toolbar";

toolbar.innerHTML = `
  <button class="back-to-services" id="back-to-services" type="button">
    ← Back to Services
  </button>
  <p class="gallery-current" id="gallery-current">All Creative Work</p>
`;

gallery.parentNode.insertBefore(toolbar, gallery);

const backButton = document.querySelector("#back-to-services");
const galleryTitle = document.querySelector("#gallery-current");

/* =========================================
   PROJECT CARD TEMPLATE
========================================= */

function createProjectCard(project) {
  return `
    <article class="project-card">
      <div class="project-media">
        ${
          project.type === "video"
            ? `<video
                src="${project.src}"
                controls
                preload="metadata"
                playsinline
                aria-label="${project.title}">
              </video>`
            : `<img
                src="${project.src}"
                loading="lazy"
                alt="${project.title}">`
        }

        <button
          class="project-open"
          type="button"
          data-open="${project.src}"
          data-type="${project.type}">
          Open ↗
        </button>
      </div>

      <div class="project-info">
        <small>${labels[project.category]}</small>
        <h3>${project.title}</h3>
      </div>
    </article>
  `;
}

/* =========================================
   RENDER GALLERY
========================================= */

function renderProjects(list) {
  if (!list.length) {
    gallery.innerHTML = `
      <p class="empty-state">No projects found.</p>
    `;
    return;
  }

  gallery.innerHTML = list.map(createProjectCard).join("");
}

function renderGallery(filter = "all") {
  const list = projects.filter(project =>
    filter === "all" || project.category === filter
  );

  renderProjects(list);
}

function renderServiceGallery(categories) {
  const list = projects.filter(project =>
    categories.includes(project.category)
  );

  renderProjects(list);
}

/* =========================================
   OPEN SELECTED SERVICE
========================================= */

function openService(serviceKey) {
  const service = services[serviceKey];

  if (!service) return;

  currentService = serviceKey;

  galleryTitle.textContent = service.title;

  toolbar.classList.add("service-gallery-active");

  document.querySelectorAll(".filter").forEach(button => {
    button.classList.remove("active");
  });

  renderServiceGallery(service.categories);

  workSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

/* =========================================
   BACK TO SERVICES
========================================= */

backButton.addEventListener("click", () => {
  currentService = null;

  galleryTitle.textContent = "All Creative Work";

  toolbar.classList.remove("service-gallery-active");

  renderGallery("all");

  document.querySelectorAll(".filter").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.filter === "all"
    );
  });

  document.querySelector(".hero-stats").scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});

/* =========================================
   CLICKABLE SERVICE CARDS
========================================= */

const serviceKeys = [
  "graphic-design",
  "motion-graphics",
  "video-editing"
];

serviceCards.forEach((card, index) => {
  const key = card.dataset.service || serviceKeys[index];

  card.dataset.service = key;
  card.style.cursor = "pointer";

  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");

  card.addEventListener("click", () => {
    openService(key);
  });

  card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openService(key);
    }
  });
});

/* =========================================
   PROJECT FILTER BUTTONS
========================================= */

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    currentService = null;

    toolbar.classList.remove("service-gallery-active");

    document.querySelectorAll(".filter").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    renderGallery(button.dataset.filter);

    galleryTitle.textContent =
      button.dataset.filter === "all"
        ? "All Creative Work"
        : labels[button.dataset.filter];
  });
});

/* =========================================
   OPEN PROJECTS
========================================= */

gallery.addEventListener("click", event => {
  const button = event.target.closest("[data-open]");

  if (!button) return;

  if (button.dataset.type === "image") {
    window.open(
      button.dataset.open,
      "_blank",
      "noopener"
    );
  } else {
    const video = [...gallery.querySelectorAll("video")].find(
      item => item.getAttribute("src") === button.dataset.open
    );

    if (video) {
      video.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

      video.focus();
    }
  }
});

/* =========================================
   SKILL CHIP & ADOBE ICON EFFECT
========================================= */

document.querySelectorAll(
  ".skill-chips span, .tool-logo"
).forEach(item => {

  item.addEventListener("touchstart", () => {
    item.classList.add("is-touched");
  }, { passive: true });

  ["touchend", "touchcancel"].forEach(eventName => {
    item.addEventListener(eventName, () => {
      item.classList.remove("is-touched");
    }, { passive: true });
  });
});

/* =========================================
   MOBILE NAVIGATION
========================================= */

const nav = document.querySelector(".nav");
const toggle = document.querySelector(".menu-toggle");

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");

  toggle.setAttribute(
    "aria-expanded",
    String(open)
  );
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

/* =========================================
   FOOTER YEAR
========================================= */

document.querySelector("#year").textContent =
  new Date().getFullYear();

/* =========================================
   VISITOR ID
========================================= */

function visitorId() {
  let id = localStorage.getItem("bhupaal_visitor_id");

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("bhupaal_visitor_id", id);
  }

  return id;
}

/* =========================================
   API CONNECTION
========================================= */

const api = async (path, options = {}) => {
  const response = await fetch(`/api/${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    throw new Error("API unavailable");
  }

  return response.json();
};

/* =========================================
   SAFE HTML
========================================= */

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[character]));
}

/* =========================================
   COMMUNITY STATISTICS
========================================= */

async function refreshCommunity() {
  try {
    const data = await api(
      "stats?visitorId=" + encodeURIComponent(visitorId())
    );

    document.querySelector("#view-count").textContent =
      Number(data.views || 0).toLocaleString();

    document.querySelector("#like-count").textContent =
      Number(data.likes || 0).toLocaleString();

    document.querySelector("#comment-count").textContent =
      Number(data.comments || 0).toLocaleString();

    document.querySelector("#like-button").classList.toggle(
      "liked",
      !!data.liked
    );

    document.querySelector("#like-button b").textContent =
      data.liked ? "Liked" : "Like this portfolio";

    const list = document.querySelector("#comments-list");

    list.innerHTML = data.recentComments?.length
      ? data.recentComments.map(comment => `
          <article class="comment">
            <b>${escapeHTML(comment.name)}</b>
            <time>
              ${new Date(comment.created_at).toLocaleDateString()}
            </time>
            <p>${escapeHTML(comment.comment)}</p>
          </article>
        `).join("")
      : '<p class="muted">Be the first to leave a comment.</p>';

  } catch {
    [
      "#view-count",
      "#like-count",
      "#comment-count"
    ].forEach(selector => {
      document.querySelector(selector).textContent = "—";
    });

    document.querySelector("#comments-list").innerHTML =
      '<p class="muted">Engagement counters will activate after Cloudflare D1 is connected.</p>';
  }
}

/* =========================================
   RECORD VISITOR VIEW
========================================= */

(async () => {
  try {
    await api("view", {
      method: "POST",
      body: JSON.stringify({
        visitorId: visitorId()
      })
    });
  } catch {}

  refreshCommunity();
})();

/* =========================================
   LIKE BUTTON
========================================= */

document.querySelector("#like-button").addEventListener(
  "click",
  async () => {

    const button = document.querySelector("#like-button");

    button.disabled = true;

    try {
      await api("like", {
        method: "POST",
        body: JSON.stringify({
          visitorId: visitorId()
        })
      });

      document.querySelector("#like-note").textContent =
        "Thanks for supporting my work!";

      await refreshCommunity();

    } catch {
      document.querySelector("#like-note").textContent =
        "Likes will activate after the site database is connected.";

    } finally {
      button.disabled = false;
    }
  }
);

/* =========================================
   COMMENT FORM
========================================= */

document.querySelector("#comment-form").addEventListener(
  "submit",
  async event => {

    event.preventDefault();

    const form = event.currentTarget;
    const message = document.querySelector("#form-message");

    const body = Object.fromEntries(
      new FormData(form).entries()
    );

    body.visitorId = visitorId();

    try {
      const result = await api("comments", {
        method: "POST",
        body: JSON.stringify(body)
      });

      message.textContent =
        result.message ||
        "Thanks! Your comment was submitted for review.";

      form.reset();

      await refreshCommunity();

    } catch {
      message.textContent =
        "Comments will activate after Cloudflare D1 is connected.";
    }
  }
);

/* =========================================
   INITIAL GALLERY
========================================= */

renderGallery("all");
