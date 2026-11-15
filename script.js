
/* =========================================
   BHUPAAL REDDY PORTFOLIO
   Complete Gallery + Descriptions + Preview
========================================= */

const projects = [
  // PHOTOSHOP
  {title:"Gym Poster",category:"photoshop",type:"image",src:"assets/works/photoshop/gym-poster.webp",description:"A bold fitness poster combining dramatic lighting, strong composition and energetic yellow-and-black visuals."},
  {title:"Creative Poster",category:"photoshop",type:"image",src:"assets/works/photoshop/creative-poster.webp",description:"A high-impact promotional design using dynamic typography, powerful imagery and a modern fitness aesthetic."},
  {title:"Nike Shoe Poster",category:"photoshop",type:"image",src:"assets/works/photoshop/shoe%20poster.jpg",description:"A product advertisement concept highlighting the shoe through a clean layout, striking red accents and focused product presentation."},

  // ILLUSTRATOR
  {title:"Cookies Poster",category:"illustrator",type:"image",src:"assets/works/illustrator/cookies.jpg",description:"A colourful food promotion designed to make the product stand out through playful graphics and clear visual hierarchy."},
  {title:"Easy Food Logo",category:"illustrator",type:"image",src:"assets/works/illustrator/LOGO.jpg",description:"A simple brand identity concept created to give a food business a memorable and recognisable visual mark."},
  {title:"Tourism Poster",category:"illustrator",type:"image",src:"assets/works/illustrator/travel.jpg",description:"A travel-themed promotional poster that brings destination imagery and informative design together."},
  {title:"Travel Flyer",category:"illustrator",type:"image",src:"assets/works/illustrator/travel-flyer.webp",description:"A travel flyer layout presenting trip information in an attractive, organised and easy-to-read format."},
  {title:"Visiting Card — Front",category:"illustrator",type:"image",src:"assets/works/illustrator/id-card-front.webp",description:"The front side of a professional business card, designed with clear branding and balanced typography."},
  {title:"Visiting Card — Back",category:"illustrator",type:"image",src:"assets/works/illustrator/id-card-back.webp",description:"The reverse side of the business card, arranged to present contact and supporting details neatly."},

  // AFTER EFFECTS
  {title:"History of Animation",category:"after-effects",type:"video",src:"assets/works/after-effects/history-of-animation.mp4",description:"A motion-graphics video exploring the evolution of animation through timed visuals, titles and transitions."},
  {title:"Task Flow",category:"after-effects",type:"video",src:"assets/works/after-effects/task-flow.mp4",description:"A motion design project demonstrating a clear sequence of steps with animated elements and smooth transitions."},

  // PREMIERE PRO
  {title:"Video Edit — 01",category:"premiere-pro",type:"video",src:"assets/works/premiere-pro/video-edit-01.mp4",description:"A video-editing sample focused on pacing, clean cuts and combining visuals into a cohesive story."},
  {title:"Klickpin Edit",category:"premiere-pro",type:"video",src:"assets/works/premiere-pro/klickpin-edit.mp4",description:"A short-form edit showcasing visual rhythm, clip arrangement and engaging presentation."},
  {title:"Wedding Invitation",category:"premiere-pro",type:"video",src:"assets/works/premiere-pro/wedding-invitation.mp4",description:"A wedding invitation video edit designed to present the celebration details in a polished and memorable way."}
];

/* =========================================
   CATEGORY LABELS
========================================= */

const labels = {
  "photoshop": "Photoshop",
  "illustrator": "Illustrator",
  "after-effects": "After Effects",
  "premiere-pro": "Premiere Pro"
};

/* =========================================
   SERVICES
========================================= */

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

/* =========================================
   MAIN ELEMENTS
========================================= */

const gallery = document.querySelector("#gallery");
const workSection = document.querySelector("#work");
const serviceCards = [...document.querySelectorAll(".hero-stats .stat-card")];
const filterBar = document.querySelector(".filters");

let currentService = null;

/* =========================================
   GALLERY TOOLBAR
========================================= */

if (gallery && gallery.parentNode) {
  const toolbar = document.createElement("div");
  toolbar.className = "gallery-toolbar";

  toolbar.innerHTML = `
    <button class="back-to-services" id="back-to-services" type="button">
      ← Back to Services
    </button>
    <p class="gallery-current" id="gallery-current">All Creative Work</p>
  `;

  gallery.parentNode.insertBefore(toolbar, gallery);
}

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
                alt="${project.title}"
                onerror="this.style.opacity='0.25';">`
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
        <p class="project-description" style="margin:8px 0 0;color:#aab8d0;font-size:13px;line-height:1.7;">
          ${project.description}
        </p>
      </div>
    </article>
  `;
}

/* =========================================
   RENDER GALLERY
========================================= */

function renderProjects(list) {
  if (!gallery) return;

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

  if (!service || !galleryTitle || !workSection) return;

  currentService = serviceKey;

  galleryTitle.textContent = service.title;

  document.querySelector(".gallery-toolbar")?.classList.add("service-gallery-active");
  workSection.classList.add("service-gallery-active");

  if (filterBar) {
    filterBar.style.display = "none";
  }

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

if (backButton) {
  backButton.addEventListener("click", () => {
    currentService = null;

    if (galleryTitle) {
      galleryTitle.textContent = "All Creative Work";
    }

    document.querySelector(".gallery-toolbar")?.classList.remove("service-gallery-active");
    workSection?.classList.remove("service-gallery-active");

    if (filterBar) {
      filterBar.style.display = "flex";
    }

    renderGallery("all");

    document.querySelectorAll(".filter").forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.filter === "all"
      );
    });

    document.querySelector(".hero-stats")?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });
}

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

    document.querySelector(".gallery-toolbar")?.classList.remove("service-gallery-active");
    workSection?.classList.remove("service-gallery-active");

    if (filterBar) {
      filterBar.style.display = "flex";
    }

    document.querySelectorAll(".filter").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    renderGallery(button.dataset.filter);

    if (galleryTitle) {
      galleryTitle.textContent =
        button.dataset.filter === "all"
          ? "All Creative Work"
          : labels[button.dataset.filter];
    }
  });
});

/* =========================================
   PROJECT IMAGE & VIDEO POPUP
========================================= */

const previewModal = document.createElement("div");

previewModal.id = "project-preview-modal";

previewModal.style.cssText = `
  display:none;
  position:fixed;
  inset:0;
  z-index:99999;
  background:rgba(3,8,22,0.94);
  backdrop-filter:blur(12px);
  align-items:center;
  justify-content:center;
  padding:20px;
`;

previewModal.innerHTML = `
  <button id="preview-close" aria-label="Close preview"
    style="position:absolute;top:20px;right:25px;
    width:46px;height:46px;border-radius:50%;
    border:1px solid #52617d;background:#14213a;
    color:white;font-size:28px;cursor:pointer;z-index:2;">
    &times;
  </button>

  <div id="preview-content"
    style="width:100%;height:100%;display:flex;
    align-items:center;justify-content:center;">
  </div>
`;

document.body.appendChild(previewModal);

function closeProjectPreview() {
  const content = document.querySelector("#preview-content");

  content.querySelectorAll("video").forEach(video => {
    video.pause();
    video.removeAttribute("src");
    video.load();
  });

  content.innerHTML = "";
  previewModal.style.display = "none";
  document.body.style.overflow = "";
}

function openProjectPreview(src, type, title) {
  const content = document.querySelector("#preview-content");

  content.innerHTML = "";

  if (type === "image") {
    const img = document.createElement("img");

    img.src = src;
    img.alt = title;

    img.style.cssText = `
      max-width:95%;
      max-height:90vh;
      object-fit:contain;
      border-radius:12px;
      box-shadow:0 20px 70px rgba(0,0,0,.5);
    `;

    img.onerror = () => {
      img.alt = "Image could not be loaded. Please check the image filename.";
    };

    content.appendChild(img);

  } else {
    const video = document.createElement("video");

    video.src = src;
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    video.preload = "auto";

    video.style.cssText = `
      max-width:95%;
      max-height:85vh;
      width:100%;
      border-radius:12px;
      background:#000;
    `;

    content.appendChild(video);

    video.play().catch(() => {
      // Visitor can press Play if autoplay is blocked.
    });
  }

  previewModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

if (gallery) {
  gallery.addEventListener("click", event => {
    const button = event.target.closest("[data-open]");

    if (!button) return;

    event.preventDefault();

    const card = button.closest(".project-card");
    const title = card?.querySelector("h3")?.textContent || "Project";

    openProjectPreview(
      button.dataset.open,
      button.dataset.type,
      title
    );
  });
}

document.querySelector("#preview-close").addEventListener(
  "click",
  closeProjectPreview
);

previewModal.addEventListener("click", event => {
  if (event.target === previewModal) {
    closeProjectPreview();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" &&
      previewModal.style.display === "flex") {
    closeProjectPreview();
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

if (nav && toggle) {
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
}

/* =========================================
   FOOTER YEAR
========================================= */

const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

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

    const viewCount = document.querySelector("#view-count");
    const likeCount = document.querySelector("#like-count");
    const commentCount = document.querySelector("#comment-count");
    const likeButton = document.querySelector("#like-button");

    if (viewCount) viewCount.textContent = Number(data.views || 0).toLocaleString();
    if (likeCount) likeCount.textContent = Number(data.likes || 0).toLocaleString();
    if (commentCount) commentCount.textContent = Number(data.comments || 0).toLocaleString();

    if (likeButton) {
      likeButton.classList.toggle("liked", !!data.liked);

      const buttonText = likeButton.querySelector("b");
      if (buttonText) {
        buttonText.textContent = data.liked ? "Liked" : "Like this portfolio";
      }
    }

    const list = document.querySelector("#comments-list");

    if (list) {
      list.innerHTML = data.recentComments?.length
        ? data.recentComments.map(comment => `
            <article class="comment">
              <b>${escapeHTML(comment.name)}</b>
              <time>${new Date(comment.created_at).toLocaleDateString()}</time>
              <p>${escapeHTML(comment.comment)}</p>
            </article>
          `).join("")
        : '<p class="muted">Be the first to leave a comment.</p>';
    }

  } catch {
    [
      "#view-count",
      "#like-count",
      "#comment-count"
    ].forEach(selector => {
      const element = document.querySelector(selector);
      if (element) element.textContent = "—";
    });

    const list = document.querySelector("#comments-list");

    if (list) {
      list.innerHTML =
        '<p class="muted">Engagement counters will activate after Cloudflare D1 is connected.</p>';
    }
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

const likeButton = document.querySelector("#like-button");

if (likeButton) {
  likeButton.addEventListener("click", async () => {
    likeButton.disabled = true;

    try {
      await api("like", {
        method: "POST",
        body: JSON.stringify({
          visitorId: visitorId()
        })
      });

      const note = document.querySelector("#like-note");
      if (note) note.textContent = "Thanks for supporting my work!";

      await refreshCommunity();

    } catch {
      const note = document.querySelector("#like-note");
      if (note) {
        note.textContent = "Likes will activate after the site database is connected.";
      }

    } finally {
      likeButton.disabled = false;
    }
  });
}

/* =========================================
   COMMENT FORM
========================================= */

const commentForm = document.querySelector("#comment-form");

if (commentForm) {
  commentForm.addEventListener("submit", async event => {
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

      if (message) {
        message.textContent =
          result.message ||
          "Thanks! Your comment was submitted for review.";
      }

      form.reset();

      await refreshCommunity();

    } catch {
      if (message) {
        message.textContent =
          "Comments will activate after Cloudflare D1 is connected.";
      }
    }
  });
}

/* =========================================
   INITIAL GALLERY
========================================= */

renderGallery("all");

/* =========================================
   PROFESSIONAL SCROLL REVEAL ANIMATIONS
========================================= */

(() => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion) return;

  const selectors = [
    ".hero-copy",
    ".hero-visual",
    ".hero-stats",
    ".section-heading",
    ".about-grid",
    ".journey-grid",
    ".resume-panel",
    ".community-grid",
    ".contact-section",
    "footer"
  ];

  const elements = document.querySelectorAll(selectors.join(", "));

  elements.forEach(element => {
    element.classList.add("scroll-reveal");

    if (element.matches(".hero-copy")) {
      element.classList.add("reveal-left");
    }

    if (element.matches(".hero-visual")) {
      element.classList.add("reveal-right");
    }
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    });

    elements.forEach(element => observer.observe(element));
  } else {
    elements.forEach(element => {
      element.classList.add("is-visible");
    });
  }

  function animateProjects() {
    if (!gallery) return;

    gallery.querySelectorAll(".project-card").forEach((card, index) => {
      card.style.setProperty(
        "--card-delay",
        `${Math.min(index, 8) * 65}ms`
      );

      card.classList.remove("project-enter");
      void card.offsetWidth;
      card.classList.add("project-enter");
    });
  }

  if ("MutationObserver" in window && gallery) {
    const galleryObserver = new MutationObserver(animateProjects);

    galleryObserver.observe(gallery, {
      childList: true
    });
  }

  animateProjects();

  const portrait = document.querySelector(".hero-portrait");
  const glow = document.querySelector(".portrait-glow");

  if (portrait) portrait.classList.add("portrait-float");
  if (glow) glow.classList.add("glow-pulse");
})();

/* =====================================
   INTERACTIVE 3D MOUSE PORTRAIT
===================================== */

(() => {
  const visual = document.querySelector(".hero-visual");
  const portrait = document.querySelector(".hero-portrait");

  if (!visual || !portrait) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  const finePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  );

  if (reduceMotion.matches || !finePointer.matches) return;

  let frame = null;
  let targetX = 0;
  let targetY = 0;

  function updateTilt(event) {
    const rect = visual.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    targetY = (x - 0.5) * 12;
    targetX = (0.5 - y) * 8;

    if (frame) return;

    frame = requestAnimationFrame(() => {
      portrait.style.setProperty("--tilt-x", `${targetX}deg`);
      portrait.style.setProperty("--tilt-y", `${targetY}deg`);

      portrait.style.setProperty(
        "--shadow-x",
        `${targetY * 1.5}px`
      );

      portrait.style.setProperty(
        "--shadow-y",
        `${15 - targetX}px`
      );

      frame = null;
    });
  }

  function resetTilt() {
    targetX = 0;
    targetY = 0;

    portrait.style.setProperty("--tilt-x", "0deg");
    portrait.style.setProperty("--tilt-y", "0deg");
    portrait.style.setProperty("--shadow-x", "0px");
    portrait.style.setProperty("--shadow-y", "15px");
  }

  visual.addEventListener("pointermove", event => {
    if (event.pointerType === "touch") return;
    updateTilt(event);
  });

  visual.addEventListener("pointerleave", resetTilt);
})();
