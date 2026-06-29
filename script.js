/* ============================================================
   EB Dance Academy — interactivity
   ------------------------------------------------------------
   NOTE FOR THE STUDIO: each dance style has a `videoId` field
   pointing at a YouTube "basics" intro video. Swap these for
   your own teaching videos by replacing the 11-character
   YouTube ID (the part after `watch?v=`). Set videoId to ""
   to show "video coming soon" instead.
   ============================================================ */

const DANCE_STYLES = [
  {
    name: "Ballet",
    emoji: "🩰",
    age: "Ages 5–18",
    c1: "#ff9ec0", c2: "#ff5d8f",
    desc: "The foundation of all dance. Grace, posture, strength and discipline through classical technique and barre work.",
    videoId: "6Fz27G6WwWw", // Ballet for Kids | Episode 1 | CJ and Friends
  },
  {
    name: "Hip-Hop",
    emoji: "🧢",
    age: "Ages 7–18",
    c1: "#7ad3ff", c2: "#2f7bff",
    desc: "High-energy street style with grooves, isolations and freestyle. Builds rhythm, coordination and serious confidence.",
    videoId: "6Zpcp53exdo", // How To Hip-Hop Dance For Kids | CBC Kids
  },
  {
    name: "Jazz",
    emoji: "✨",
    age: "Ages 6–18",
    c1: "#ffd76a", c2: "#ff9d2f",
    desc: "Bold, expressive and fun — leaps, turns and sharp choreography set to upbeat music. A stage favourite.",
    videoId: "_AGe4JoN0W4", // 6 Basic Jazz Steps for Beginners
  },
  {
    name: "Contemporary",
    emoji: "🌊",
    age: "Ages 8–18",
    c1: "#b79bff", c2: "#7b5cff",
    desc: "Emotional, fluid movement that blends ballet and modern. Great for storytelling and creative expression.",
    videoId: "jww3e1HTXT4", // Contemporary Dance Basic Steps
  },
  {
    name: "Tap",
    emoji: "👞",
    age: "Ages 6–18",
    c1: "#8fe3c6", c2: "#1fb398",
    desc: "Make music with your feet! Rhythm, timing and a whole lot of joyful noise through classic tap steps.",
    videoId: "vDxmy_U0Njk", // Tap Steps for Kids & Beginners | New Victory Arts Break
  },
  {
    name: "Ballroom & Latin",
    emoji: "💃",
    age: "Ages 9–18",
    c1: "#ff9aa2", c2: "#e2497a",
    desc: "Partner dancing with elegance and flair — waltz, cha-cha, salsa and more. Builds poise and teamwork.",
    videoId: "mpO8dUXZdu4", // Basic Latin Ballroom Steps with Partnering | MihranTV
  },
  {
    name: "Breakdance",
    emoji: "🤸",
    age: "Ages 8–18",
    c1: "#ffc46b", c2: "#ff6a3d",
    desc: "Power moves, footwork and freezes. Athletic, creative and endlessly cool — the heartbeat of street dance.",
    videoId: "EIZwPMrBBcU", // How To Breakdance For Beginners
  },
];

/* ---------- Build style cards ---------- */
const grid = document.getElementById("styles-grid");
if (grid) {
  DANCE_STYLES.forEach((s) => {
    const card = document.createElement("article");
    card.className = "style-card reveal";

    const hasVideo = Boolean(s.videoId);
    const playMarkup = hasVideo
      ? `<button class="play-btn" aria-label="Play ${s.name} basics video"></button>
         <span class="video-tag">▶ Basics video</span>`
      : `<span class="video-tag">Video coming soon</span>`;

    card.innerHTML = `
      <div class="style-thumb" style="--c1:${s.c1};--c2:${s.c2}" ${hasVideo ? 'data-video="' + s.videoId + '" data-title="' + s.name + ' — the basics"' : ""}>
        <span class="style-emoji">${s.emoji}</span>
        ${playMarkup}
      </div>
      <div class="style-body">
        <h3>${s.name}</h3>
        <span class="style-age">${s.age}</span>
        <p>${s.desc}</p>
        ${hasVideo
          ? `<button class="style-watch" data-video="${s.videoId}" data-title="${s.name} — the basics">▶ Watch the basics</button>`
          : `<span class="style-watch" style="color:var(--ink-soft);cursor:default">Intro video coming soon</span>`}
      </div>
    `;
    grid.appendChild(card);
  });
}

/* ---------- Video modal ---------- */
const modal = document.getElementById("video-modal");
const modalVideo = document.getElementById("modal-video");
const modalCaption = document.getElementById("modal-caption");

function openVideo(id, title) {
  if (!id) return;
  modalVideo.innerHTML =
    `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" ` +
    `title="${title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ` +
    `allowfullscreen></iframe>`;
  modalCaption.innerHTML =
    `${title} &nbsp;·&nbsp; ` +
    `<a href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">Open on YouTube ↗</a>`;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeVideo() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  modalVideo.innerHTML = ""; // stops playback
  modalCaption.textContent = "";
  document.body.style.overflow = "";
}

document.addEventListener("click", (e) => {
  const trigger = e.target.closest("[data-video]");
  if (trigger) {
    openVideo(trigger.getAttribute("data-video"), trigger.getAttribute("data-title"));
    return;
  }
  if (e.target.closest("[data-close]")) closeVideo();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeVideo();
});

/* ---------- Mobile nav ---------- */
const toggle = document.querySelector(".nav-toggle");
const menu = document.getElementById("nav-menu");
if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  menu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

/* ---------- Contact form ---------- */
const form = document.getElementById("signup-form");
const note = document.getElementById("form-note");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const required = ["parent", "email", "age", "format"];
    const missing = required.filter((k) => !String(data.get(k) || "").trim());
    const email = String(data.get("email") || "");
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (missing.length || !emailOk) {
      note.textContent = !emailOk && !missing.includes("email")
        ? "Please enter a valid email address."
        : "Please fill in the required fields.";
      note.className = "form-note err";
      return;
    }

    // No backend in this static demo — hand off to the studio inbox.
    note.textContent = `Thanks, ${data.get("parent")}! 🎉 We've noted your interest and will reply within one business day.`;
    note.className = "form-note ok";
    form.reset();
  });
}

/* ---------- Reveal on scroll ---------- */
const revealEls = () => document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  // observe after cards are built
  requestAnimationFrame(() => revealEls().forEach((el) => io.observe(el)));
} else {
  revealEls().forEach((el) => el.classList.add("in"));
}

/* Mark static sections for reveal */
document.querySelectorAll(".feature, .story, .learn-card, .section-head").forEach((el) =>
  el.classList.add("reveal")
);

/* ---------- Footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
