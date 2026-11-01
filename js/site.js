/* ------------------------------------------------------------------
   SETTINGS — the only two things you need to change.
   email:       where people can reach you directly (shown on the site,
                and used as the fallback when no form service is set).
   formspreeId: free form-to-email service for static sites. Create a
                form at https://formspree.io, then paste the ID from its
                endpoint (https://formspree.io/f/THIS_PART). Leave it ""
                and the form opens the visitor's email app instead.
------------------------------------------------------------------- */
const SETTINGS = {
  email: "hello@overheater.com",   // TODO: replace with a real inbox
  formspreeId: ""                  // TODO: e.g. "xyzabcd"
};

const ROOT = window.OH_ROOT || "";
const PRODUCTS = (window.PRODUCTS || []).filter(p => !p.hidden);
const PROJECTS = (window.PROJECTS || []).filter(p => !p.hidden);
const POSTS = (window.DEVLOG || []).filter(p => !p.hidden).sort((a, b) => b.date.localeCompare(a.date));
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const asset = p => /^(https?:|data:|\/)/.test(p) ? p : ROOT + p;
const productUrl = p => ROOT + "products/" + p.slug + ".html";
const contactUrl = topic => ROOT + "contact.html" + (topic ? "?topic=" + encodeURIComponent(topic) : "");
const listUrl = type => ROOT + (type === "tool" ? "tools.html" : "games.html");
const $ = sel => document.querySelector(sel);
const fmtDate = d => new Date(d + "T12:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
const NOUN = { game: "game", tool: "tool" };

/* ---------- Footer ---------- */
(function footer() {
  const el = document.getElementById("site-footer");
  if (!el) return;
  el.className = "footer";
  el.innerHTML = `
    <div class="footer-inner">
      <a class="footer-brand" href="${ROOT}index.html"><img src="${ROOT}img/overheater-logo-reverse.svg" alt="Overheater Studios" width="120" height="120"></a>
      <nav class="footer-cols" aria-label="Footer">
        <div>
          <h2>Play & use</h2>
          <ul><li><a href="${ROOT}games.html">Games</a></li><li><a href="${ROOT}tools.html">Tools</a></li><li><a href="${ROOT}devlog.html">Devlog</a></li></ul>
        </div>
        <div>
          <h2>Studio</h2>
          <ul><li><a href="${ROOT}about.html">About</a></li><li><a href="${ROOT}contact.html">Contact</a></li><li><a href="${contactUrl("press")}">Press</a></li></ul>
        </div>
        <div>
          <h2>Say hi</h2>
          <ul><li><a href="mailto:${esc(SETTINGS.email)}">${esc(SETTINGS.email)}</a></li></ul>
        </div>
      </nav>
    </div>
    <div class="footer-legal">
      <p>© ${new Date().getFullYear()} Overheater Studios LLC</p>
      <p class="footer-egg" aria-hidden="true">↑↑↓↓←→←→ B A</p>
    </div>`;
})();

/* ---------- Shelves of game / tool cards ---------- */
function card(p) {
  const cover = p.cover
    ? `<img src="${esc(asset(p.cover))}" alt="" loading="lazy">`
    : `<img class="cover-fallback" src="${ROOT}img/overheater-mark.svg" alt="">`;
  return `
    <a class="cart" href="${productUrl(p)}">
      <span class="cart-cover" style="background:${esc(p.coverBg || "var(--ink-2)")}">${cover}
        ${p.status ? `<span class="cart-status pixel">${esc(p.status)}</span>` : ""}</span>
      <span class="cart-body">
        <span class="cart-genre">${p.type === "tool" ? "Tool" : "Game"}${p.genre ? " / " + esc(p.genre) : ""}</span>
        <span class="cart-title">${esc(p.name)}</span>
        <span class="cart-tagline">${esc(p.tagline)}</span>
        <span class="cart-foot">
          ${p.platforms && p.platforms.length ? `<span class="chips">${p.platforms.map(x => `<span>${esc(x)}</span>`).join("")}</span>` : ""}
          ${p.price ? `<span class="cart-price">${esc(p.price)}</span>` : ""}
        </span>
      </span>
    </a>`;
}
function lockedSlot(type, wide) {
  const more = PRODUCTS.some(p => p.type === type);
  const title = type === "tool"
    ? (more ? "More tools are heating up." : "Tools are heating up.")
    : (more ? "Next game: in the forge." : "Our first game is in the forge.");
  const text = type === "tool"
    ? "We're building the tools we wish existed. Follow the devlog for progress."
    : "We're building it right now. Follow the devlog for progress.";
  return `
    <div class="locked${wide ? " locked-wide" : ""}">
      <div class="locked-art" aria-hidden="true"><span class="pixel">?</span></div>
      <div class="locked-body">
        <p class="pixel locked-label">Locked</p>
        <h3>${title}</h3>
        <p>${text}</p>
        <p class="soon pixel">Coming soon</p>
      </div>
    </div>`;
}
document.querySelectorAll("[data-shelf]").forEach(root => {
  const type = root.getAttribute("data-shelf");
  const limit = +root.getAttribute("data-limit") || 99;
  if (type === "all") {
    // Home page: games and tools on one shelf, plus a locked slot for what's next
    const list = PRODUCTS.slice(0, limit);
    const hasTools = PRODUCTS.some(p => p.type === "tool");
    root.innerHTML = `<div class="shelf">${list.map(card).join("")}${lockedSlot("game", false)}${hasTools ? "" : lockedSlot("tool", false)}</div>`;
    return;
  }
  const list = PRODUCTS.filter(p => p.type === type).slice(0, limit);
  root.innerHTML = list.length
    ? `<div class="shelf">${list.map(card).join("")}${lockedSlot(type, false)}</div>`
    : lockedSlot(type, true);
});

/* ---------- Game / tool page ---------- */
(function productPage() {
  const slug = document.body.getAttribute("data-product");
  if (!slug) return;
  const main = document.getElementById("main");
  const p = PRODUCTS.find(x => x.slug === slug);
  if (!p) {
    main.innerHTML = `<section class="page-hero"><div class="wrap"><h1>Nothing here (yet).</h1><p class="lede">This page isn't live. <a href="${ROOT}games.html">See our games</a> or <a href="${ROOT}tools.html">tools</a>.</p></div></section>`;
    return;
  }
  document.body.setAttribute("data-page", p.type === "tool" ? "tools" : "games");
  document.querySelectorAll("#site-nav a[aria-current]").forEach(a => a.removeAttribute("aria-current"));
  const nav = document.querySelector(`#site-nav a[href$="${p.type === "tool" ? "tools" : "games"}.html"]`);
  if (nav) nav.setAttribute("aria-current", "page");

  const links = (p.links || []).filter(l => l.url);
  const buttons = [
    ...links.map((l, i) => `<a class="btn ${i === 0 ? "btn-hot" : "btn-ghost"}" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`),
    p.checkout ? `<a class="btn ${links.length ? "btn-ghost" : "btn-hot"}" href="${esc(p.checkout)}">Buy${p.price ? " for " + esc(p.price) : ""}</a>` : "",
    !links.length && !p.checkout ? `<span class="soon soon-lg pixel">${esc(p.status || "Coming soon")}</span>` : ""
  ].join("");
  const shots = p.screenshots || [];

  main.innerHTML = `
    <section class="product-hero">
      <div class="wrap product-hero-grid">
        <div class="product-cover" style="background:${esc(p.coverBg || "var(--ink-2)")}">
          ${p.cover ? `<img src="${esc(asset(p.cover))}" alt="${esc(p.name)} cover art">` : `<img class="cover-fallback" src="${ROOT}img/overheater-mark.svg" alt="">`}
        </div>
        <div>
          <p class="crumbs"><a href="${listUrl(p.type)}">${p.type === "tool" ? "Tools" : "Games"}</a>${p.status && (links.length || p.checkout) ? ` <span class="tag-status pixel">${esc(p.status)}</span>` : ""}</p>
          <h1>${esc(p.name)}</h1>
          <p class="lede">${esc(p.tagline)}</p>
          ${p.summary ? `<p class="product-summary">${esc(p.summary)}</p>` : ""}
          <ul class="chips chips-on-ink">
            ${p.genre ? `<li>${esc(p.genre)}</li>` : ""}${(p.platforms || []).map(x => `<li>${esc(x)}</li>`).join("")}
          </ul>
          <div class="hero-actions">${buttons}</div>
        </div>
      </div>
    </section>

    ${p.trailer ? `
    <section class="section section-dark">
      <div class="wrap">
        <div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${esc(p.trailer)}" title="${esc(p.name)} trailer" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe></div>
      </div>
    </section>` : ""}

    ${p.highlights && p.highlights.length ? `
    <section class="section">
      <div class="wrap split">
        <div class="split-intro"><h2>${p.type === "tool" ? "What it does" : "What's inside"}</h2></div>
        <dl class="feature-list">${p.highlights.map(h => `<div><dt>${esc(h.title)}</dt><dd>${esc(h.text)}</dd></div>`).join("")}</dl>
      </div>
    </section>` : ""}

    ${shots.length ? `
    <section class="section section-tint">
      <div class="wrap">
        <h2>Screenshots</h2>
        <div class="shots">${shots.map(s => `<a href="${esc(asset(s))}" target="_blank" rel="noopener"><img src="${esc(asset(s))}" alt="${esc(p.name)} screenshot" loading="lazy"></a>`).join("")}</div>
      </div>
    </section>` : ""}

    ${p.specs && p.specs.length ? `
    <section class="section">
      <div class="wrap split">
        <div class="split-intro"><h2>${p.type === "tool" ? "Details" : "System requirements"}</h2></div>
        <dl class="spec-table">${p.specs.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
      </div>
    </section>` : ""}

    ${p.faq && p.faq.length ? `
    <section class="section section-tint">
      <div class="wrap split">
        <div class="split-intro"><h2>FAQ</h2><p>Something else? <a href="${contactUrl("support")}">Ask us</a>.</p></div>
        <div class="faq">${p.faq.map(f => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("")}</div>
      </div>
    </section>` : ""}

    <section class="cta-band">
      <div class="wrap">
        <h2>${links.length || p.checkout ? `Ready to ${p.type === "tool" ? "try" : "play"} ${esc(p.name)}?` : `${esc(p.name)} is coming soon.`}</h2>
        ${links.length || p.checkout ? "" : `<p class="cta-sub">Follow the devlog for progress as it heats up.</p>`}
        <div class="hero-actions">${links.length || p.checkout ? buttons : `<a class="btn btn-hot" href="${ROOT}devlog.html">Read the devlog</a>`}<a class="btn btn-ghost" href="${listUrl(p.type)}">More ${p.type === "tool" ? "tools" : "games"}</a></div>
      </div>
    </section>`;
})();

/* ---------- Devlog ---------- */
document.querySelectorAll("[data-devlog]").forEach(root => {
  const limit = +root.getAttribute("data-limit") || 999;
  const teaser = root.hasAttribute("data-teaser");
  const posts = POSTS.slice(0, limit);
  if (!posts.length) { root.innerHTML = `<p class="empty">No posts yet. Check back soon.</p>`; return; }
  const id = p => "post-" + p.date + "-" + p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  root.innerHTML = posts.map(p => `
    <article class="post" id="${id(p)}">
      <p class="post-meta"><time datetime="${esc(p.date)}">${esc(fmtDate(p.date))}</time>${p.tag ? ` <span class="post-tag pixel">${esc(p.tag)}</span>` : ""}</p>
      <h3>${teaser ? `<a href="${ROOT}devlog.html#${id(p)}">${esc(p.title)}</a>` : esc(p.title)}</h3>
      ${(teaser ? (p.body || []).slice(0, 1) : (p.body || [])).map(t => `<p>${esc(t)}</p>`).join("")}
      ${teaser ? `<a class="text-link" href="${ROOT}devlog.html#${id(p)}">Read the devlog</a>` : ""}
    </article>`).join("");
});

/* ---------- Previously shipped (About page) ---------- */
document.querySelectorAll("[data-project-list]").forEach(root => {
  root.innerHTML = PROJECTS.map(p => {
    const meta = [p.client && `<div><dt>Client</dt><dd>${esc(p.client)}</dd></div>`,
                  p.year && `<div><dt>Year</dt><dd>${esc(p.year)}</dd></div>`].filter(Boolean).join("");
    return `
    <article class="project">
      <div class="project-media" style="background:${esc(p.imageBg || "var(--ink)")}">${p.image ? `<img src="${esc(asset(p.image))}" alt="" loading="lazy">` : ""}</div>
      <div class="project-body">
        <p class="project-kind">${esc(p.kind)}${p.badge ? ` <span class="badge pixel">${esc(p.badge)}</span>` : ""}</p>
        <h3>${esc(p.title)}</h3>
        <p class="project-summary">${esc(p.summary)}</p>
        ${p.did && p.did.length ? `<ul class="dots">${p.did.map(d => `<li>${esc(d)}</li>`).join("")}</ul>` : ""}
        ${meta ? `<dl class="project-meta">${meta}</dl>` : ""}
        ${p.note ? `<p class="project-note">${esc(p.note)}</p>` : ""}
        ${p.url ? `<a class="text-link" href="${esc(p.url)}" target="_blank" rel="noopener">Visit ${esc(new URL(p.url).hostname.replace(/^www\./, ""))}</a>` : ""}
      </div>
    </article>`;
  }).join("");
});

/* ---------- Top bar on the home page: solid once you scroll past the hero ---------- */
(function topbar() {
  const bar = $(".topbar"), hero = $(".hero");
  if (!bar || !hero) return;
  new IntersectionObserver(([e]) => bar.classList.toggle("solid", !e.isIntersecting),
    { rootMargin: "-72px 0px 0px 0px" }).observe(hero);
})();

/* ---------- Contact form ---------- */
(function contactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const status = document.getElementById("form-status");
  const btn = form.querySelector("button[type=submit]");
  const topic = form.querySelector("[name=topic]");
  const direct = document.getElementById("contact-email-link");
  if (direct) { direct.href = "mailto:" + SETTINGS.email; direct.textContent = SETTINGS.email; }

  // Topic list: each game/tool, plus general options. ?topic=<value> preselects one.
  const games = PRODUCTS.filter(p => p.type === "game"), tools = PRODUCTS.filter(p => p.type === "tool");
  const group = (label, list) => list.length ? `<optgroup label="${label}">${list.map(p => `<option value="${esc(p.slug)}">${esc(p.name)}</option>`).join("")}</optgroup>` : "";
  topic.innerHTML =
    `<option value="general">General question</option>
     ${group("Games", games)}${group("Tools", tools)}
     <option value="support">Bug report or support</option>
     <option value="press">Press, creators & streamers</option>
     <option value="business">Business or partnership</option>
     <option value="other">Something else</option>`;
  const want = new URLSearchParams(location.search).get("topic");
  if (want && topic.querySelector(`option[value="${CSS.escape(want)}"]`)) topic.value = want;

  form.addEventListener("submit", async e => {
    e.preventDefault();
    status.className = "form-status";
    form.querySelectorAll("[aria-invalid]").forEach(f => f.removeAttribute("aria-invalid"));
    const missing = [...form.querySelectorAll("[required]")].filter(f => !f.value.trim() || !f.checkValidity());
    if (missing.length) {
      missing.forEach(f => f.setAttribute("aria-invalid", "true"));
      missing[0].focus();
      status.textContent = missing.some(f => f.type === "email" && f.value.trim())
        ? "Check the email address — it doesn't look complete."
        : "Fill in your name, email and a message so we can reply.";
      status.classList.add("is-error");
      return;
    }
    const data = new FormData(form);
    if (data.get("_gotcha")) return;
    const topicLabel = topic.options[topic.selectedIndex].text;
    data.set("topic", topicLabel);

    if (!SETTINGS.formspreeId) {
      const body = `${data.get("message")}\n\n— ${data.get("name")}\n${data.get("email")}`;
      window.location.href = `mailto:${SETTINGS.email}?subject=${encodeURIComponent(topicLabel + " — " + data.get("name"))}&body=${encodeURIComponent(body)}`;
      status.textContent = "Your email app should open with the message ready to send.";
      return;
    }
    btn.disabled = true; btn.textContent = "Sending…";
    try {
      const res = await fetch("https://formspree.io/f/" + SETTINGS.formspreeId, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(res.status);
      form.reset(); if (want) topic.value = want;
      status.textContent = "Message sent. We'll get back to you within two business days.";
      status.classList.add("is-ok");
    } catch {
      status.innerHTML = `The message didn't go through. Email us directly at <a href="mailto:${esc(SETTINGS.email)}">${esc(SETTINGS.email)}</a>.`;
      status.classList.add("is-error");
    } finally {
      btn.disabled = false; btn.textContent = "Send message";
    }
  });
})();

/* ---------- Easter egg: the Konami code ---------- */
(function konami() {
  const seq = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let i = 0;
  document.addEventListener("keydown", e => {
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    i = k === seq[i] ? i + 1 : (k === seq[0] ? 1 : 0);
    if (i < seq.length) return;
    i = 0;
    if (window.OH_BURST) window.OH_BURST();
    document.documentElement.classList.add("overheat");
    setTimeout(() => document.documentElement.classList.remove("overheat"), 1200);
    let t = $(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast pixel"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = "Cheat activated: +30 lives";
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2600);
  });
})();

/* ---------- Thermal hero (home page) ----------
   A low-resolution heat field glowing around the crisp logo. The logo's
   silhouette is a constant heat source, a few slow hot spots drift around,
   and the pointer adds heat. Heat diffuses and cools each frame and is
   coloured with a "hot metal" palette that runs through the logo reds. */
(function thermal() {
  const canvas = $(".thermal"), hero = $(".hero"), logo = $(".hero-logo");
  if (!canvas || !hero || !canvas.getContext) return;
  const ctx = canvas.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const stops = [
    [0.00, [16, 12, 13]],
    [0.26, [72, 10, 8]],
    [0.44, [145, 16, 6]],
    [0.58, [211, 25, 6]],
    [0.72, [249, 67, 40]],
    [0.86, [255, 160, 50]],
    [1.00, [255, 236, 190]]
  ];
  const lut = new Uint8ClampedArray(256 * 3);
  for (let i = 0; i < 256; i++) {
    const t = i / 255; let k = 0;
    while (k < stops.length - 2 && t > stops[k + 1][0]) k++;
    const [t0, c0] = stops[k], [t1, c1] = stops[k + 1];
    const f = Math.min(1, Math.max(0, (t - t0) / (t1 - t0)));
    for (let j = 0; j < 3; j++) lut[i * 3 + j] = c0[j] + (c1[j] - c0[j]) * f;
  }

  // Soft silhouette of the logo, used as the heat source (embedded so it works from disk too)
  const glow = new Image();
  glow.src = "data:image/png;base64,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";

  let W, H, heat, next, source, img, running = false, visible = true, box = null;
  const pointer = { x: -1, y: -1, px: -1, py: -1, active: false };
  const off = document.createElement("canvas");

  function layout() {
    const r = hero.getBoundingClientRect();
    const narrow = r.width < 900;
    const size = narrow ? Math.min(r.height * 0.34, r.width * 0.62) : Math.min(r.height * 0.62, r.width * 0.4);
    const cx = narrow ? r.width * 0.5 : r.width * 0.74;
    const cy = narrow ? r.height * 0.26 : r.height * 0.52;
    const w = size * (194 / 200);
    box = { x: cx - w / 2, y: cy - size / 2, w, h: size };
    if (logo) Object.assign(logo.style, { left: box.x + "px", top: box.y + "px", width: box.w + "px", height: box.h + "px" });
  }

  function size() {
    const r = hero.getBoundingClientRect();
    const cell = r.width < 700 ? 5 : 6;
    W = Math.max(40, Math.round(r.width / cell));
    H = Math.max(30, Math.round(r.height / cell));
    canvas.width = W; canvas.height = H;
    heat = new Float32Array(W * H); next = new Float32Array(W * H);
    img = ctx.createImageData(W, H);
    layout();
    buildSource(r);
  }

  function buildSource(r) {
    source = new Float32Array(W * H);
    if (!glow.complete || !glow.naturalWidth || !box) return;
    off.width = W; off.height = H;
    const o = off.getContext("2d", { willReadFrequently: true });
    o.clearRect(0, 0, W, H);
    const sx = W / r.width, sy = H / r.height, pad = 1.06;
    const bw = box.w * pad, bh = box.h * pad;
    o.drawImage(glow, (box.x - (bw - box.w) / 2) * sx, (box.y - (bh - box.h) / 2) * sy, bw * sx, bh * sy);
    const d = o.getImageData(0, 0, W, H).data;
    for (let i = 0; i < W * H; i++) source[i] = d[i * 4] / 255;
  }
  glow.onload = () => { if (W) { buildSource(hero.getBoundingClientRect()); warm(); } };

  function addHeat(x, y, radius, amount) {
    const r2 = radius * radius;
    const x0 = Math.max(1, Math.floor(x - radius)), x1 = Math.min(W - 2, Math.ceil(x + radius));
    const y0 = Math.max(1, Math.floor(y - radius)), y1 = Math.min(H - 2, Math.ceil(y + radius));
    for (let j = y0; j <= y1; j++) for (let i = x0; i <= x1; i++) {
      const dd = (i - x) ** 2 + (j - y) ** 2;
      if (dd < r2) heat[j * W + i] += amount * (1 - dd / r2);
    }
  }

  // Konami code: a burst of heat all over the hero
  window.OH_BURST = () => {
    if (!W) return;
    for (let k = 0; k < 40; k++) addHeat(Math.random() * W, Math.random() * H, Math.min(W, H) * (0.05 + Math.random() * 0.08), 0.9);
    if (reduce) { for (let k = 0; k < 30; k++) step(); paint(); }
    else start();
  };

  let t = 0;
  function step() {
    t += 1;
    const pulse = 0.82 + 0.1 * Math.sin(t * 0.03);
    for (let i = 0; i < W * H; i++) if (source[i] > 0) heat[i] = Math.max(heat[i], source[i] * pulse);
    const s = Math.min(W, H);
    addHeat(W * (0.55 + 0.3 * Math.sin(t * 0.0041)), H * (0.5 + 0.38 * Math.sin(t * 0.0067 + 1)), s * 0.09, 0.022);
    addHeat(W * (0.8 + 0.18 * Math.sin(t * 0.0053 + 2)), H * (0.5 + 0.4 * Math.cos(t * 0.0049)), s * 0.07, 0.018);
    if (pointer.active && pointer.px >= 0) {
      const steps = Math.ceil(Math.hypot(pointer.x - pointer.px, pointer.y - pointer.py)) + 1;
      for (let k = 0; k < steps; k++) {
        const f = k / steps;
        addHeat(pointer.px + (pointer.x - pointer.px) * f, pointer.py + (pointer.y - pointer.py) * f, s * 0.06, 0.16 / Math.sqrt(steps));
      }
    }
    pointer.px = pointer.x; pointer.py = pointer.y;
    for (let j = 1; j < H - 1; j++) for (let i = 1; i < W - 1; i++) {
      const k = j * W + i;
      const avg = (heat[k - 1] + heat[k + 1] + heat[k - W] + heat[k + W]) * 0.25;
      const v = (heat[k] * 0.6 + avg * 0.4) * 0.962 - 0.002;
      next[k] = v < 0 ? 0 : Math.min(1.2, v);
    }
    [heat, next] = [next, heat];
  }

  function paint() {
    const d = img.data;
    for (let i = 0; i < W * H; i++) {
      const v = Math.min(255, (Math.min(1, heat[i]) ** 0.85) * 255) | 0;
      d[i * 4] = lut[v * 3]; d[i * 4 + 1] = lut[v * 3 + 1]; d[i * 4 + 2] = lut[v * 3 + 2]; d[i * 4 + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
  }

  function loop() { if (!running) return; step(); paint(); requestAnimationFrame(loop); }
  function start() { if (!running && visible && !document.hidden && !reduce) { running = true; requestAnimationFrame(loop); } }
  function stop() { running = false; }

  function toGrid(e) {
    const r = canvas.getBoundingClientRect();
    pointer.x = (e.clientX - r.left) / r.width * W;
    pointer.y = (e.clientY - r.top) / r.height * H;
    if (!pointer.active) { pointer.px = pointer.x; pointer.py = pointer.y; }
    pointer.active = true;
  }
  hero.addEventListener("pointermove", toGrid);
  hero.addEventListener("pointerdown", toGrid);
  hero.addEventListener("pointerleave", () => { pointer.active = false; pointer.px = -1; });

  new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); }).observe(hero);
  document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
  let rt;
  window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { size(); warm(); }, 150); });

  function warm() { for (let i = 0; i < 160; i++) step(); paint(); }
  size(); warm(); start();
})();
