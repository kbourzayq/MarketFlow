import { PHASES as PH } from './data.js';

// ─────────────────────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────────────────────
let CUR = null; // phase index or null (intro)
let SEC = 0;    // section tab index

// ─────────────────────────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────────────────────────
function buildSidebar() {
  const body = document.getElementById('sb-body');
  body.innerHTML = PH.map((p, i) => `
    <div class="sb-phase" style="--phase-c:${p.color}" id="sbp-${i}" onclick="goPhase(${i},0)">
      <div class="sb-dot"></div>
      <div class="sb-ph-info">
        <div style="display:flex;align-items:center;gap:7px">
          <span class="sb-code">${p.code}</span>
          <span class="sb-name">${p.name}</span>
        </div>
      </div>
    </div>
    <div id="sbst-${i}" style="display:none" class="sb-subtabs">
      ${p.tabs.map((t,j)=>`
        <div class="sb-subtab" style="--phase-c:${p.color}" id="sbt-${i}-${j}" onclick="goPhase(${i},${j})">${t}</div>
      `).join('')}
    </div>
  `).join('');
}

function syncSidebar() {
  PH.forEach((p,i) => {
    const ph = document.getElementById('sbp-'+i);
    const st = document.getElementById('sbst-'+i);
    const isActive = i === CUR;
    if (ph) ph.classList.toggle('active', isActive);
    if (st) st.style.display = isActive ? 'flex' : 'none';
    p.tabs.forEach((_,j) => {
      const t = document.getElementById(`sbt-${i}-${j}`);
      if (t) t.classList.toggle('active', isActive && j === SEC);
    });
  });
  const filled = CUR !== null ? CUR + 1 : 0;
  const pct = Math.round(filled / PH.length * 100);
  const pf = document.getElementById('sb-pf');
  pf.style.width = pct + '%';
  pf.style.background = CUR !== null ? PH[CUR].color : '#6b82a8';
  document.getElementById('sb-count').textContent = filled + ' / ' + PH.length;
}

// ─────────────────────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────────────────────
function showIntro() {
  CUR = null; SEC = 0;
  document.getElementById('intro-page').style.display = 'block';
  document.getElementById('phase-page').style.display = 'none';
  renderIntro();
  syncSidebar();
  document.getElementById('content').scrollTop = 0;
}

function goPhase(i, j) {
  CUR = i; SEC = j;
  document.getElementById('intro-page').style.display = 'none';
  document.getElementById('phase-page').style.display = 'block';
  renderPhase();
  syncSidebar();
  document.getElementById('content').scrollTop = 0;
}

function navPrev() {
  if (SEC > 0) goPhase(CUR, SEC-1);
  else if (CUR > 0) goPhase(CUR-1, PH[CUR-1].tabs.length-1);
}
function navNext() {
  if (SEC < PH[CUR].tabs.length-1) goPhase(CUR, SEC+1);
  else if (CUR < PH.length-1) goPhase(CUR+1, 0);
}

document.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (e.key === 'ArrowRight' && CUR !== null) navNext();
  if (e.key === 'ArrowLeft'  && CUR !== null) navPrev();
});

// ─────────────────────────────────────────────────────────────
// RENDER INTRO
// ─────────────────────────────────────────────────────────────
function renderIntro() {
  document.getElementById('intro-page').innerHTML = `
    <div class="fadein">
      <div class="intro-hero">
        <div class="intro-kicker">Projet unique · Formation complète</div>
        <div class="intro-title">Market<span>Flow</span></div>
        <p class="intro-tagline">
          Un seul projet, construit de zéro à production en 6 phases progressives.
          Conventional Commits → Clean Architecture → Aspire → TDD → Auth Google → Vertical Slice.
        </p>
      </div>
      <div class="intro-pills">
        ${['ASP.NET Core 10','EF Core 10','.NET Aspire','xUnit','NSubstitute','FluentValidation','MediatR','JWT Bearer','Google OAuth2','PBAC','Vertical Slice','Clean Architecture','Conventional Commits'].map(t=>`<span class="intro-pill">${t}</span>`).join('')}
      </div>
      <div class="phase-list">
        ${PH.map((p,i) => `
          <div class="pi-row" onclick="goPhase(${i},0)">
            <span class="pi-code">${p.code}</span>
            <div class="pi-dot" style="background:${p.color};--pi-c:${p.color}"></div>
            <div style="flex:1">
              <div class="pi-name" style="color:${p.color}">${p.name}</div>
              <div class="pi-desc">${p.desc}</div>
            </div>
            <div class="pi-arr">›</div>
          </div>
        `).join('')}
      </div>
    </div>`;
}

// ─────────────────────────────────────────────────────────────
// RENDER PHASE
// ─────────────────────────────────────────────────────────────
function renderPhase() {
  const p = PH[CUR];
  const tabName = p.tabs[SEC];
  let inner = `<div class="page fadein" style="--phase-c:${p.color}">`;

  // Header
  inner += `
    <div class="ph-eyebrow" style="color:${p.color}">${p.code} — ${p.name}</div>
    <div class="ph-title">${p.name}</div>
    <div class="ph-badges">
      ${p.badges.map(b=>`<span class="ph-badge" style="background:${p.color}18;color:${p.color};border:1px solid ${p.color}35">${b}</span>`).join('')}
    </div>
    <div class="sec-tabs" style="--phase-c:${p.color}">
      ${p.tabs.map((t,j)=>`<button class="stab${j===SEC?' active':''}" onclick="goPhase(${CUR},${j})">${t}</button>`).join('')}
    </div>`;

  const s = p.sections;
  if (tabName === 'Cours')        inner += renderCours(s.cours, p.color);
  if (tabName === 'Architecture') inner += renderCours(s.architecture, p.color);
  if (tabName === 'OOP & DI')     inner += renderCours(s.oopdi, p.color);
  if (tabName === 'Guide Husky')    inner += renderGuide(s.guide, p.color);
  if (tabName === 'Guide Aspire')   inner += renderGuide(s.guide, p.color);
  if (tabName === 'Guide Solution') inner += renderGuide(s.guide, p.color);
  if (tabName === 'Liens utiles')   inner += renderLiens(s.liens, p.color);
  if (tabName === 'Exercices')      inner += renderExercices(s.exercices, p.color);
  if (tabName === 'Projet')         inner += renderProjet(s.proj, p.color);

  // Nav
  const hasPrev = SEC > 0 || CUR > 0;
  const hasNext = SEC < p.tabs.length-1 || CUR < PH.length-1;
  const prevLabel = SEC > 0 ? p.tabs[SEC-1] : CUR > 0 ? PH[CUR-1].name : '';
  const nextLabel = SEC < p.tabs.length-1 ? p.tabs[SEC+1] : CUR < PH.length-1 ? PH[CUR+1].name : '';
  inner += `
    <div class="ph-nav">
      <button class="nav-btn" onclick="navPrev()" ${!hasPrev?'disabled':''}>← ${prevLabel}</button>
      <div class="nav-mid">Phase ${CUR+1}/${PH.length} · ${p.tabs[SEC]}</div>
      <button class="nav-btn" onclick="navNext()" ${!hasNext?'disabled':''}>${nextLabel} →</button>
    </div>
  </div>`;

  document.getElementById('phase-page').innerHTML = inner;
}

// ─────────────────────────────────────────────────────────────
// SECTION RENDERERS
// ─────────────────────────────────────────────────────────────
function renderCours(cours, color) {
  return `<div class="section">
    <div class="section-heading">${cours.title}</div>
    ${cours.blocks.map((b,i) => {
      if (b.type === 'alert') return `
        <div class="alert">
          <div class="alert-icon">ℹ</div>
          <div class="alert-body">${b.text}</div>
        </div>`;
      return `
        <div class="course-card">
          <div class="course-card-header" style="border-left:3px solid ${color}">
            <span class="course-num" style="color:${color}">${String(i+1).padStart(2,'0')}</span>
            <span class="course-title">${b.title}</span>
          </div>
          <div class="course-body">
            <div class="course-text">${b.text}</div>
            ${b.code ? `<pre>${b.code}</pre>` : ''}
          </div>
        </div>`;
    }).join('')}
  </div>`;
}

function renderGuide(guide, color) {
  return `<div class="section">
    <div class="section-heading">${guide.title}</div>
    <div class="guide-steps">
      ${guide.steps.map(s => `
        <div class="guide-step">
          <div class="guide-step-left">
            <div class="guide-step-num" style="background:${color}">${s.num}</div>
            <div class="guide-step-line"></div>
          </div>
          <div class="guide-step-right">
            <div class="guide-step-title">${s.title}</div>
            <div class="guide-step-desc">${s.desc}</div>
            ${s.code ? `<pre>${s.code}</pre>` : ''}
          </div>
        </div>
      `).join('')}
    </div>
  </div>`;
}

function renderExercices(exercices, color) {
  return `<div class="section">
    <div class="section-heading">Exercices</div>
    ${exercices.map(e => `
      <div class="exercise">
        <div class="ex-num" style="background:${color}">${e.n}</div>
        <div class="ex-body">
          <div class="ex-title">${e.title}</div>
          <div class="ex-desc">${e.desc}</div>
          ${e.hint ? `<div class="ex-hint">${e.hint}</div>` : ''}
          ${e.commit ? `<div class="ex-commit">${e.commit}</div>` : ''}
        </div>
      </div>
    `).join('')}
  </div>`;
}

function renderProjet(proj, color) {
  const icons = {done:'✓',active:'◐',todo:'○'};
  const cls   = {done:'uc-done',active:'uc-prog',todo:'uc-todo'};
  const kpiColors = ['#5ba8ff','#2dd4a0','#fbbf24','#f472a8'];
  return `<div class="section">
    <div class="section-heading">État de MarketFlow — fin de phase</div>
    <div class="kpi-grid">
      ${Object.entries(proj.kpis).map(([k,v],i) => `
        <div class="kpi" style="--kpi-c:${kpiColors[i]}">
          <div class="kpi-val" style="color:${v==='✓'?'#2dd4a0':v==='✗'?'#4a6080':kpiColors[i]}">${v}</div>
          <div class="kpi-lbl">${k}</div>
        </div>
      `).join('')}
    </div>
    <div class="section-heading">Use cases — progression</div>
    <div class="uc-grid" style="margin-bottom:24px">
      ${proj.uc.map(f => `
        <div class="uc-feat" style="border-top-color:${f.color}">
          <div class="uc-feat-head" style="color:${f.color}">${f.f}</div>
          ${f.items.map(u => `
            <div class="uc-item ${cls[u.s]}">
              <span style="width:16px;text-align:center">${icons[u.s]}</span>
              <span>${u.l}</span>
            </div>
          `).join('')}
        </div>
      `).join('')}
    </div>
    <div class="section-heading">Fichiers — cette phase</div>
    <div class="ftree">${proj.files}</div>
    <div class="milestone" style="border-left-color:${color};border-color:${color}20">
      <div class="ms-lbl" style="color:${color}">Milestone</div>
      <div class="ms-txt">${proj.milestone}</div>
    </div>
  </div>`;
}

function renderLiens(liens, color) {
  return `<div class="section">
    <div class="section-heading">aspire.dev — Liens utiles</div>
    <div class="liens-grid">
      ${liens.categories.map(cat => `
        <div class="liens-cat">
          <div class="liens-cat-title" style="color:${cat.color}">${cat.title}</div>
          ${cat.items.map(item => `
            <a href="${item.url}" target="_blank" rel="noopener" class="liens-item" style="--lc:${cat.color}">
              <div class="liens-label">${item.label}</div>
              <div class="liens-url">${item.url.replace('https://','')}</div>
              <div class="liens-desc">${item.desc}</div>
            </a>
          `).join('')}
        </div>
      `).join('')}
    </div>
  </div>`;
}

// ─────────────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────────────
buildSidebar();
showIntro();
// Expose navigation functions to inline HTML event handlers (required for ES modules)
window.showIntro = showIntro;
window.goPhase   = goPhase;
window.navPrev   = navPrev;
window.navNext   = navNext;
