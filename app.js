// Seelengarten – Logik

const STORAGE_KEY = "seelengarten.v1";
const LANG_KEY = "seelengarten.lang";
const THEME_KEY = "seelengarten.theme";

const DEFAULT_STATE = {
  points: 0,
  rankIndex: 0,
  discovered: {},       // giftId -> true
  applied: {},          // giftId -> true
  completedLandscapes: {}, // landscapeId -> true
  daily: {
    lastDate: null,     // "YYYY-MM-DD"
    streak: 0,
    lastIndex: -1
  }
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE, discovered: {}, applied: {}, completedLandscapes: {}, daily: { ...DEFAULT_STATE.daily } };
    const s = JSON.parse(raw);
    return {
      ...DEFAULT_STATE,
      ...s,
      discovered: s.discovered || {},
      applied: s.applied || {},
      completedLandscapes: s.completedLandscapes || {},
      daily: { ...DEFAULT_STATE.daily, ...(s.daily || {}) }
    };
  } catch (e) {
    return { ...DEFAULT_STATE, discovered: {}, applied: {}, completedLandscapes: {}, daily: { ...DEFAULT_STATE.daily } };
  }
}

function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
}

let state = loadState();
let lang = localStorage.getItem(LANG_KEY) || (navigator.language && navigator.language.startsWith("de") ? "de" : "en");
let theme = localStorage.getItem(THEME_KEY) || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
let currentTab = "landscapes";
let currentLandscapeId = null;

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function t(key) { return DATA.ui[lang][key] || key; }

function rankFor(points) {
  let r = 0;
  for (let i = 0; i < DATA.ranks.length; i++) {
    if (points >= DATA.ranks[i].threshold) r = i;
  }
  return r;
}

function nextRankThreshold() {
  const idx = rankFor(state.points);
  if (idx + 1 < DATA.ranks.length) return DATA.ranks[idx + 1].threshold;
  return null;
}

function addPoints(n) {
  const prevRank = rankFor(state.points);
  state.points += n;
  const newRank = rankFor(state.points);
  state.rankIndex = newRank;
  saveState();
  if (newRank > prevRank) {
    celebrate(DATA.ranks[newRank][lang]);
  }
}

function allGiftsInLandscape(lid) {
  const ls = DATA.landscapes.find(l => l.id === lid);
  return ls ? ls.gifts : [];
}

function isLandscapeComplete(lid) {
  return allGiftsInLandscape(lid).every(g => state.discovered[g.id]);
}

function discover(gift, landscape) {
  if (state.discovered[gift.id]) return;
  state.discovered[gift.id] = true;
  addPoints(DATA.rarityPoints[gift.rarity]);
  // Landscape complete?
  if (isLandscapeComplete(landscape.id) && !state.completedLandscapes[landscape.id]) {
    state.completedLandscapes[landscape.id] = true;
    addPoints(DATA.bonus.landscapeComplete);
  }
  saveState();
}

function applyGift(gift) {
  if (state.applied[gift.id]) return;
  state.applied[gift.id] = true;
  addPoints(DATA.bonus.applyGift);
  saveState();
}

// ----- Rendering -----

function render() {
  document.body.dataset.theme = theme;
  document.documentElement.lang = lang;
  renderHeader();
  renderTabs();
  if (currentTab === "landscapes") renderLandscapes();
  else if (currentTab === "book") renderBook();
  else if (currentTab === "wind") renderWind();
}

function renderHeader() {
  const idx = rankFor(state.points);
  const rank = DATA.ranks[idx];
  const next = nextRankThreshold();
  const pct = next ? Math.min(100, (state.points / next) * 100) : 100;
  $("#app-title").textContent = t("appTitle");
  $("#rank-name").textContent = rank[lang];
  $("#points-label").innerHTML = `<span class="points-num">${state.points}</span> ${t("pts")}${next ? ` · → ${next}` : ""}`;
  $("#rank-bar-inner").style.width = pct + "%";
  $("#lang-toggle").textContent = lang === "de" ? "EN" : "DE";
  $("#theme-toggle").textContent = theme === "dark" ? "☀" : "☾";
}

function renderTabs() {
  $$(".tabs button").forEach(b => b.classList.toggle("active", b.dataset.tab === currentTab));
  $("#tab-landscapes-label").textContent = t("tabLandscapes");
  $("#tab-book-label").textContent = t("tabBook");
  $("#tab-wind-label").textContent = t("tabWind");
}

function renderLandscapes() {
  const root = $("#view");
  if (currentLandscapeId) {
    renderLandscapeDetail(currentLandscapeId);
    return;
  }
  root.innerHTML = "";
  DATA.landscapes.forEach(ls => {
    const unlocked = state.points >= ls.unlock;
    const grad = theme === "dark" ? ls.darkGradient : ls.gradient;
    const card = document.createElement("div");
    card.className = "card landscape-card" + (unlocked ? "" : " locked");
    card.style.background = grad;
    const giftsTotal = ls.gifts.length;
    const giftsFound = ls.gifts.filter(g => state.discovered[g.id]).length;
    card.innerHTML = `
      <div class="card-inner">
        <h2 class="landscape-name">${ls[lang].name}</h2>
        <p class="landscape-intro">${unlocked ? ls[lang].intro : ""}</p>
        <div class="landscape-meta">
          ${unlocked
            ? `<span>${giftsFound} / ${giftsTotal} · ${t("discovered")}</span>${state.completedLandscapes[ls.id] ? `<span class="badge">✓ ${t("complete")}</span>` : ""}`
            : `<span class="lock">🔒 ${t("locked")} ${ls.unlock} ${t("pts")}</span>`}
        </div>
      </div>`;
    if (unlocked) {
      card.addEventListener("click", () => {
        currentLandscapeId = ls.id;
        render();
      });
    }
    root.appendChild(card);
  });
}

function renderLandscapeDetail(lid) {
  const ls = DATA.landscapes.find(l => l.id === lid);
  const root = $("#view");
  const grad = theme === "dark" ? ls.darkGradient : ls.gradient;
  root.innerHTML = `
    <button class="back-btn" id="back-btn">← ${t("back")}</button>
    <div class="scene" id="scene" style="background:${grad}">
      <h2 class="scene-name">${ls[lang].name}</h2>
      <p class="scene-intro">${ls[lang].intro}</p>
      <div class="gifts-layer" id="gifts-layer"></div>
    </div>
    <div class="landscape-collection" id="landscape-collection"></div>
  `;
  $("#back-btn").addEventListener("click", () => { currentLandscapeId = null; render(); });

  const layer = $("#gifts-layer");
  // Position pulsing lights pseudo-randomly but deterministically per gift id
  ls.gifts.forEach((g, i) => {
    const { x, y } = positionFor(g.id, i);
    const found = !!state.discovered[g.id];
    const dot = document.createElement("button");
    dot.className = "gift-dot" + (found ? " found" : "") + " rarity-" + g.rarity;
    dot.style.left = x + "%";
    dot.style.top = y + "%";
    dot.setAttribute("aria-label", found ? g[lang].title : "?");
    dot.innerHTML = `<span class="dot-core"></span><span class="dot-icon">${found ? g.icon : ""}</span>`;
    dot.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!state.discovered[g.id]) discover(g, ls);
      openGiftModal(g);
    });
    layer.appendChild(dot);
  });

  // Collection strip below
  const col = $("#landscape-collection");
  ls.gifts.forEach(g => {
    const found = !!state.discovered[g.id];
    const chip = document.createElement("div");
    chip.className = "chip" + (found ? "" : " shadow");
    chip.innerHTML = `<span class="chip-icon">${found ? g.icon : "·"}</span><span>${found ? g[lang].title : t("shadow")}</span>`;
    if (found) chip.addEventListener("click", () => openGiftModal(g));
    col.appendChild(chip);
  });
}

function positionFor(id, i) {
  // Stable pseudo-random from id
  let h = 0;
  for (let c = 0; c < id.length; c++) h = (h * 31 + id.charCodeAt(c)) | 0;
  const x = 12 + (Math.abs(h) % 76);
  const y = 28 + (Math.abs(h >> 7) % 55);
  return { x, y };
}

function openGiftModal(g) {
  const modal = $("#modal");
  const body = $("#modal-body");
  modal.classList.add("open");
  const applied = !!state.applied[g.id];
  let html = `<div class="gift-title"><span class="gift-icon-big">${g.icon}</span><h3>${g[lang].title}</h3></div>`;
  html += `<div class="rarity-tag rarity-${g.rarity}">${t("rarity" + capitalize(g.rarity))} · +${DATA.rarityPoints[g.rarity]} ${t("pts")}</div>`;

  if (g.type === "stone") {
    html += `<p class="label">${t("scentLabel")}</p><p class="flow">${g[lang].scent}</p>`;
    html += `<p class="label">${t("wisdomLabel")}</p><p class="flow">${g[lang].wisdom}</p>`;
  } else if (g.type === "feather") {
    html += `<p class="label">${t("ritualLabel")}</p><p class="flow">${g[lang].ritual}</p>`;
  } else if (g.type === "book") {
    html += `<p class="label">${t("storyLabel")}</p><p class="flow story">${g[lang].story}</p>`;
  } else if (g.type === "candle") {
    html += `<p class="label">${t("glowLabel")}</p><p class="flow">${g[lang].glow}</p>`;
  } else if (g.type === "shell") {
    html += `<p class="label">${t("whisperLabel")}</p><p class="flow">${g[lang].whisper}</p>`;
  } else if (g.type === "bloom") {
    html += `<p class="label">${t("petalLabel")}</p><p class="flow">${g[lang].petal}</p>`;
  } else if (g.type === "audio") {
    html += `<p class="flow">${g[lang].note}</p>`;
    html += `<audio id="gift-audio" controls preload="none" src="${g.audio}"></audio>`;
    html += `<p class="audio-hint" id="audio-hint" hidden></p>`;
  }

  html += `<div class="modal-actions">`;
  if (applied) {
    html += `<button class="btn-ghost" disabled>✓ ${t("applied")}</button>`;
  } else {
    html += `<button class="btn-primary" id="apply-btn">${t("apply")}</button>`;
  }
  html += `<button class="btn-ghost" id="close-btn">${t("close")}</button>`;
  html += `</div>`;

  body.innerHTML = html;

  if (g.type === "audio") {
    const audio = $("#gift-audio");
    const hint = $("#audio-hint");
    audio.addEventListener("error", () => {
      audio.hidden = true;
      hint.hidden = false;
      hint.textContent = t("audioMissing");
    });
  }

  const applyBtn = $("#apply-btn");
  if (applyBtn) applyBtn.addEventListener("click", () => { applyGift(g); closeModal(); render(); });
  $("#close-btn").addEventListener("click", closeModal);
}

function closeModal() {
  const modal = $("#modal");
  modal.classList.remove("open");
  const audio = $("#gift-audio");
  if (audio) { try { audio.pause(); } catch(e) {} }
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

function renderBook() {
  const root = $("#view");
  root.innerHTML = "";
  const wrap = document.createElement("div");
  wrap.className = "book";
  DATA.landscapes.forEach(ls => {
    const section = document.createElement("section");
    section.className = "book-section";
    section.innerHTML = `<h3>${ls[lang].name}</h3>`;
    const grid = document.createElement("div");
    grid.className = "book-grid";
    ls.gifts.forEach(g => {
      const found = !!state.discovered[g.id];
      const card = document.createElement("div");
      card.className = "gift-card" + (found ? "" : " shadow");
      card.innerHTML = `
        <div class="gift-card-icon">${found ? g.icon : "·"}</div>
        <div class="gift-card-title">${found ? g[lang].title : t("shadow")}</div>
        <div class="gift-card-rarity rarity-${g.rarity}">${t("rarity" + capitalize(g.rarity))}${state.applied[g.id] ? " · ✓" : ""}</div>
      `;
      if (found) card.addEventListener("click", () => openGiftModal(g));
      grid.appendChild(card);
    });
    section.appendChild(grid);
    wrap.appendChild(section);
  });
  root.appendChild(wrap);
}

function todayStr() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

function yesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

function renderWind() {
  const root = $("#view");
  const today = todayStr();
  const claimed = state.daily.lastDate === today;
  const gifts = DATA.windGifts[lang];
  // Deterministic gift for today so it's consistent until claimed
  const hash = Array.from(today).reduce((a, c) => (a * 31 + c.charCodeAt(0)) | 0, 0);
  const idx = Math.abs(hash) % gifts.length;
  const text = gifts[idx];

  root.innerHTML = `
    <div class="wind-card">
      <h2>${t("dailyTitle")}</h2>
      <p class="wind-hint">${t("dailyHint")}</p>
      <blockquote class="wind-text">${text}</blockquote>
      <div class="wind-actions">
        ${claimed
          ? `<button class="btn-ghost" disabled>✓ ${t("dailyDone")}</button>`
          : `<button class="btn-primary" id="claim-btn">${t("dailyClaim")} (+${DATA.bonus.dailyWind})</button>`}
      </div>
      <p class="streak">☉ ${state.daily.streak} ${t("dailyStreak")}</p>
    </div>
  `;

  const btn = $("#claim-btn");
  if (btn) {
    btn.addEventListener("click", () => {
      const today = todayStr();
      if (state.daily.lastDate === today) return;
      if (state.daily.lastDate === yesterdayStr()) state.daily.streak += 1;
      else state.daily.streak = 1;
      state.daily.lastDate = today;
      state.daily.lastIndex = idx;
      addPoints(DATA.bonus.dailyWind);
      saveState();
      render();
    });
  }
}

// ----- Celebration -----
function celebrate(rankLabel) {
  const overlay = document.createElement("div");
  overlay.className = "celebration";
  overlay.innerHTML = `
    <div class="celebration-inner">
      <div class="celebration-bloom">✦</div>
      <p class="celebration-hint">${t("newRank")}</p>
      <h2 class="celebration-rank">${rankLabel}</h2>
    </div>
  `;
  document.body.appendChild(overlay);
  setTimeout(() => overlay.classList.add("visible"), 20);
  setTimeout(() => {
    overlay.classList.remove("visible");
    setTimeout(() => overlay.remove(), 700);
  }, 3200);
}

// ----- Events -----
function bind() {
  $$(".tabs button").forEach(btn => {
    btn.addEventListener("click", () => {
      currentTab = btn.dataset.tab;
      currentLandscapeId = null;
      render();
    });
  });
  $("#lang-toggle").addEventListener("click", () => {
    lang = lang === "de" ? "en" : "de";
    localStorage.setItem(LANG_KEY, lang);
    render();
  });
  $("#theme-toggle").addEventListener("click", () => {
    theme = theme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, theme);
    render();
  });
  $("#modal-backdrop").addEventListener("click", closeModal);
}

// ----- SW registration -----
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

document.addEventListener("DOMContentLoaded", () => {
  bind();
  render();
});
