import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────
// DESIGN TOKENS — Dark Premium Kitchen Theme
// ─────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  /* Core palette */
  --ink:       #0A1A10;
  --ink-2:     #0F2318;
  --ink-3:     #162E1C;
  --ink-4:     #1E3D27;
  --border:    rgba(255,255,255,0.07);
  --border-2:  rgba(255,255,255,0.12);

  /* Accent */
  --green:     #2ECC71;
  --green-dim: #1A8A4A;
  --green-glow:rgba(46,204,113,0.18);
  --amber:     #F39C12;
  --amber-dim: #C27D0E;
  --red:       #E74C3C;
  --red-dim:   rgba(231,76,60,0.15);

  /* Text */
  --text-1:  #F0F7F2;
  --text-2:  #A8C4B0;
  --text-3:  #5A8066;

  /* Shadows */
  --s1: 0 2px 8px rgba(0,0,0,0.4);
  --s2: 0 8px 24px rgba(0,0,0,0.5);
  --s3: 0 20px 60px rgba(0,0,0,0.6);

  /* Radius */
  --r1: 8px; --r2: 14px; --r3: 20px; --r4: 28px;

  --font: 'DM Sans', system-ui, sans-serif;
  --display: 'Playfair Display', Georgia, serif;
}

html, body { height: 100%; background: var(--ink); color: var(--text-1); font-family: var(--font); }
#root { height: 100%; }

/* ── SHELL ── */
.shell { display: flex; height: 100vh; overflow: hidden; }

/* ── SIDEBAR ── */
.sidebar {
  width: 220px; min-width: 220px;
  background: var(--ink-2);
  border-right: 1px solid var(--border);
  display: flex; flex-direction: column;
  padding-bottom: 20px;
}
.sidebar-brand {
  padding: 28px 20px 24px;
  border-bottom: 1px solid var(--border);
}
.brand-row { display: flex; align-items: center; gap: 11px; }
.brand-gem {
  width: 40px; height: 40px;
  background: linear-gradient(135deg, var(--green), var(--amber));
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 21px;
  box-shadow: 0 0 20px var(--green-glow);
}
.brand-name { font-family: var(--display); font-size: 15px; font-weight: 700; color: var(--text-1); line-height: 1.2; }
.brand-tag  { font-size: 10px; color: var(--text-3); letter-spacing: .5px; margin-top: 1px; }

.nav { padding: 16px 10px; flex: 1; }
.nav-item {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 12px; border-radius: var(--r1);
  font-size: 13.5px; font-weight: 500; color: var(--text-2);
  cursor: pointer; transition: all .15s;
  border: none; background: none; width: 100%; text-align: left;
  margin-bottom: 2px;
}
.nav-item:hover { background: var(--ink-3); color: var(--text-1); }
.nav-item.active {
  background: var(--green-glow);
  color: var(--green);
  font-weight: 600;
  border: 1px solid rgba(46,204,113,0.2);
}
.nav-icon { font-size: 16px; width: 20px; text-align: center; }

.sidebar-foot { padding: 0 10px; display: flex; flex-direction: column; gap: 6px; }
.user-chip {
  display: flex; align-items: center; gap: 8px;
  background: var(--ink-3); border-radius: var(--r1); padding: 8px 10px;
  border: 1px solid var(--border);
}
.user-avatar {
  width: 28px; height: 28px; border-radius: 50%;
  background: linear-gradient(135deg,var(--green-dim),var(--amber-dim));
  display: flex; align-items: center; justify-content: center; font-size: 13px; flex-shrink:0;
}
.user-email { font-size: 11px; color: var(--text-3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex:1; }
.pill-btn {
  padding: 7px 12px; border-radius: var(--r1);
  border: 1px solid var(--border); background: transparent;
  font-size: 11.5px; font-weight: 600; cursor: pointer; transition: all .15s;
  display: flex; align-items: center; gap: 5px; color: var(--text-2);
}
.pill-btn:hover { border-color: var(--border-2); color: var(--text-1); background: var(--ink-3); }
.pill-btn.danger:hover { border-color: var(--red); color: var(--red); }

/* ── MAIN ── */
.main { flex: 1; overflow-y: auto; background: var(--ink); }
.page { padding: 36px 40px; max-width: 1080px; }

.page-head { margin-bottom: 32px; }
.page-eyebrow { font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--green); margin-bottom: 8px; }
.page-title { font-family: var(--display); font-size: 30px; font-weight: 700; color: var(--text-1); line-height: 1.1; }
.page-sub { font-size: 14px; color: var(--text-3); margin-top: 6px; }

/* ── STAT CARDS ── */
.stat-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; margin-bottom: 32px; }
.stat-box {
  background: var(--ink-2); border: 1px solid var(--border);
  border-radius: var(--r2); padding: 20px;
  transition: border-color .2s;
}
.stat-box:hover { border-color: var(--border-2); }
.stat-icon { font-size: 22px; margin-bottom: 12px; }
.stat-lbl { font-size: 11px; font-weight: 600; letter-spacing: .8px; text-transform: uppercase; color: var(--text-3); }
.stat-num { font-size: 32px; font-weight: 700; color: var(--text-1); line-height: 1; margin: 6px 0 4px; }
.stat-tag { font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 20px; display: inline-block; }
.tag-red    { background: var(--red-dim); color: var(--red); }
.tag-green  { background: var(--green-glow); color: var(--green); }
.tag-amber  { background: rgba(243,156,18,.15); color: var(--amber); }

/* ── SECTION HEADER ── */
.sec-hd { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.sec-title { font-size: 16px; font-weight: 700; color: var(--text-1); }
.sec-link { font-size: 12.5px; color: var(--green); font-weight: 600; cursor: pointer; background: none; border: none; }
.sec-link:hover { text-decoration: underline; }

/* ── EXPIRY LIST ── */
.expiry-stack { display: flex; flex-direction: column; gap: 8px; }
.expiry-row {
  display: flex; align-items: center; gap: 14px;
  background: var(--ink-2); border: 1px solid var(--border);
  border-radius: var(--r2); padding: 14px 18px;
  transition: border-color .15s;
}
.expiry-row.urgent { border-left: 3px solid var(--red); }
.expiry-row.soon   { border-left: 3px solid var(--amber); }
.expiry-row:hover  { border-color: var(--border-2); }
.exp-ico { font-size: 26px; }
.exp-name { font-size: 14px; font-weight: 600; color: var(--text-1); }
.exp-days { font-size: 12px; margin-top: 3px; }
.exp-days.urgent { color: var(--red); font-weight: 600; }
.exp-days.soon   { color: var(--amber); font-weight: 600; }
.exp-cta {
  margin-left: auto; font-size: 12px; font-weight: 600;
  background: var(--green-glow); color: var(--green);
  border: 1px solid rgba(46,204,113,0.25); border-radius: 20px;
  padding: 5px 14px; cursor: pointer; white-space: nowrap; transition: all .15s;
}
.exp-cta:hover { background: var(--green); color: var(--ink); }

/* ── BUTTONS ── */
.btn {
  padding: 10px 18px; border-radius: var(--r1); border: none;
  font-size: 13.5px; font-weight: 600; cursor: pointer;
  transition: all .15s; font-family: var(--font);
  display: inline-flex; align-items: center; gap: 6px;
}
.btn-green  { background: var(--green); color: var(--ink); }
.btn-green:hover  { background: #27ae60; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(46,204,113,0.3); }
.btn-ghost  { background: var(--ink-3); color: var(--text-2); border: 1px solid var(--border); }
.btn-ghost:hover  { border-color: var(--border-2); color: var(--text-1); }
.btn-amber  { background: var(--amber); color: var(--ink); }
.btn-amber:hover  { background: var(--amber-dim); }
.btn-sm { padding: 6px 12px; font-size: 12px; }
.btn:disabled { opacity:.4; cursor:not-allowed; transform:none; }

/* ── SEARCH ── */
.search-bar {
  background: var(--ink-2); border: 1px solid var(--border);
  border-radius: var(--r1); padding: 10px 16px;
  font-size: 14px; font-family: var(--font); color: var(--text-1);
  outline: none; transition: border-color .15s; width: 100%;
}
.search-bar::placeholder { color: var(--text-3); }
.search-bar:focus { border-color: var(--green); box-shadow: 0 0 0 3px var(--green-glow); }

/* ── FILTER CHIPS ── */
.chips { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 20px; }
.chip {
  padding: 6px 14px; border-radius: 20px;
  font-size: 12.5px; font-weight: 600; cursor: pointer;
  border: 1px solid var(--border); color: var(--text-3);
  background: transparent; transition: all .15s;
}
.chip:hover { border-color: var(--border-2); color: var(--text-2); }
.chip.on { background: var(--green-glow); color: var(--green); border-color: rgba(46,204,113,0.3); }

/* ── PANTRY GRID ── */
.toolbar { display: flex; gap: 10px; margin-bottom: 18px; flex-wrap: wrap; align-items: center; }
.pantry-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(195px,1fr)); gap: 12px; }
.p-card {
  background: var(--ink-2); border: 1px solid var(--border);
  border-radius: var(--r2); padding: 16px; position: relative;
  transition: all .2s; cursor: default;
}
.p-card:hover { border-color: var(--border-2); transform: translateY(-2px); box-shadow: var(--s2); }
.p-card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
.p-ico {
  width: 46px; height: 46px; border-radius: 12px;
  background: var(--ink-3); display: flex; align-items: center;
  justify-content: center; font-size: 24px;
}
.d-badge { font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: 20px; }
.d-red    { background: var(--red-dim); color: var(--red); }
.d-amber  { background: rgba(243,156,18,.15); color: var(--amber); }
.d-green  { background: var(--green-glow); color: var(--green); }
.p-name { font-size: 14px; font-weight: 700; color: var(--text-1); }
.p-meta { font-size: 12px; color: var(--text-3); margin-top: 6px; display: flex; gap: 10px; flex-wrap: wrap; }
.p-meta span { color: var(--text-2); font-weight: 500; }
.del-x {
  position: absolute; top: 10px; right: 10px;
  background: none; border: none; font-size: 14px; cursor: pointer;
  color: var(--text-3); opacity: 0; transition: opacity .15s;
}
.p-card:hover .del-x { opacity: 1; }
.del-x:hover { color: var(--red); }

/* ── RECIPE GRID ── */
.r-tabs { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
.r-tab {
  padding: 7px 16px; border-radius: 20px; font-size: 13px; font-weight: 600;
  cursor: pointer; border: 1px solid var(--border); color: var(--text-3);
  background: transparent; transition: all .15s;
  display: flex; align-items: center; gap: 6px;
}
.r-tab:hover { border-color: var(--border-2); color: var(--text-2); }
.r-tab.on { background: var(--green-glow); color: var(--green); border-color: rgba(46,204,113,.3); }
.r-cnt { font-size: 11px; background: var(--ink-3); border-radius: 10px; padding: 1px 6px; color: var(--text-3); }
.r-tab.on .r-cnt { background: rgba(46,204,113,.2); color: var(--green); }

.recipes-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(285px,1fr)); gap: 18px; }
.r-card {
  background: var(--ink-2); border: 1px solid var(--border);
  border-radius: var(--r3); overflow: hidden; cursor: pointer;
  transition: all .2s;
}
.r-card:hover { transform: translateY(-4px); box-shadow: var(--s3); border-color: var(--border-2); }

/* Photo banner with real food images */
.r-photo {
  height: 160px; position: relative; overflow: hidden;
  display: flex; align-items: flex-end;
  background-size: cover; background-position: center;
}
.r-photo-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, rgba(10,26,16,0) 30%, rgba(10,26,16,0.9) 100%);
}
.r-photo-emoji {
  position: absolute; inset: 0; display: flex; align-items: center;
  justify-content: center; font-size: 58px;
  background: linear-gradient(135deg, var(--ink-3), var(--ink-4));
}
.r-match-pill {
  position: absolute; top: 12px; right: 12px; z-index: 2;
  font-size: 11px; font-weight: 800; padding: 4px 11px; border-radius: 20px;
  backdrop-filter: blur(8px);
}
.rm-100 { background: rgba(46,204,113,.9); color: #fff; }
.rm-95  { background: rgba(46,180,100,.85); color: #fff; }
.rm-85  { background: rgba(243,156,18,.9);  color: var(--ink); }
.rm-70  { background: rgba(255,255,255,.2);  color: #fff; border: 1px solid rgba(255,255,255,.3); }

.r-body { padding: 16px; }
.r-title { font-size: 15px; font-weight: 700; color: var(--text-1); line-height: 1.3; margin-bottom: 5px; }
.r-desc  { font-size: 12.5px; color: var(--text-3); line-height: 1.5; margin-bottom: 12px; }
.r-meta  { display: flex; gap: 12px; font-size: 12px; color: var(--text-3); margin-bottom: 12px; }
.r-missing {
  background: rgba(243,156,18,.1); border: 1px solid rgba(243,156,18,.2);
  border-radius: var(--r1); padding: 8px 12px; margin-bottom: 12px;
}
.r-miss-t { font-size: 11px; font-weight: 700; color: var(--amber); margin-bottom: 3px; }
.r-miss-i { font-size: 12px; color: rgba(243,156,18,.7); }
.r-acts { display: flex; gap: 8px; }

/* ── MODAL ── */
.overlay {
  position: fixed; inset: 0; z-index: 100;
  background: rgba(0,0,0,.7); backdrop-filter: blur(6px);
  display: flex; align-items: center; justify-content: center; padding: 20px;
}
.modal {
  background: var(--ink-2); border: 1px solid var(--border-2);
  border-radius: var(--r4); max-width: 580px; width: 100%;
  max-height: 88vh; overflow-y: auto;
  box-shadow: 0 40px 80px rgba(0,0,0,.7);
}
.modal::-webkit-scrollbar { width: 4px; }
.modal::-webkit-scrollbar-track { background: transparent; }
.modal::-webkit-scrollbar-thumb { background: var(--ink-4); border-radius: 4px; }
.m-banner { height: 180px; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; font-size: 64px; background: var(--ink-3); border-radius: var(--r4) var(--r4) 0 0; }
.m-head { padding: 22px 24px 16px; border-bottom: 1px solid var(--border); }
.m-title { font-family: var(--display); font-size: 22px; font-weight: 700; color: var(--text-1); }
.m-sub { font-size: 13px; color: var(--text-3); margin-top: 4px; }
.m-close { position: absolute; top: 16px; right: 16px; background: rgba(0,0,0,.4); border: none; color: var(--text-2); cursor: pointer; font-size: 18px; border-radius: 50%; width: 32px; height: 32px; display:flex;align-items:center;justify-content:center; }
.m-body { padding: 22px 24px; }
.m-sec { margin-bottom: 22px; }
.m-sec-t { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--text-3); margin-bottom: 12px; }
.steps { display: flex; flex-direction: column; gap: 12px; }
.step { display: flex; gap: 12px; }
.step-n { width: 28px; height: 28px; min-width:28px; background: var(--green); color: var(--ink); border-radius: 50%; display:flex;align-items:center;justify-content:center; font-size: 12px; font-weight: 700; }
.step-t { font-size: 14px; color: var(--text-2); padding-top: 4px; line-height: 1.6; }
.nutri { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; }
.n-box { background: var(--ink-3); border-radius: var(--r1); padding: 12px; text-align: center; }
.n-val { font-size: 20px; font-weight: 800; color: var(--text-1); }
.n-lbl { font-size: 11px; color: var(--text-3); margin-top: 3px; }
.vid-card {
  background: var(--ink-3); border: 1px solid var(--border); border-radius: var(--r2);
  padding: 14px; display: flex; gap: 14px; align-items: center; cursor: pointer; transition: all .15s;
}
.vid-card:hover { border-color: rgba(46,204,113,.3); background: var(--ink-4); }
.vid-thumb { width: 88px; height: 56px; background: var(--ink); border-radius: var(--r1); display:flex;align-items:center;justify-content:center; font-size: 22px; flex-shrink:0; }
.vid-t { font-size: 13px; font-weight: 600; color: var(--text-1); }
.vid-m { font-size: 12px; color: var(--text-3); margin-top: 4px; }
.m-foot { padding: 16px 24px; border-top: 1px solid var(--border); display: flex; gap: 10px; justify-content: flex-end; }

/* ── FORM ── */
.f-group { margin-bottom: 16px; }
.f-label { font-size: 13px; font-weight: 600; color: var(--text-2); margin-bottom: 7px; display: block; }
.f-input {
  width: 100%; background: var(--ink-3); border: 1px solid var(--border);
  border-radius: var(--r1); padding: 11px 14px; font-size: 14px;
  font-family: var(--font); color: var(--text-1); outline: none; transition: border-color .15s;
}
.f-input:focus { border-color: var(--green); box-shadow: 0 0 0 3px var(--green-glow); }
.f-input::placeholder { color: var(--text-3); }
.f-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.emoji-grid { display: flex; flex-wrap: wrap; gap: 6px; }
.e-btn {
  font-size: 22px; background: var(--ink-3); border: 2px solid transparent;
  border-radius: 8px; padding: 4px 8px; cursor: pointer; transition: all .15s;
}
.e-btn:hover { background: var(--ink-4); }
.e-btn.sel { border-color: var(--green); background: var(--green-glow); }

/* ── INGREDIENT PICKER ── */
.ing-picker { position: relative; }
.ing-dd {
  position: absolute; top: calc(100% + 4px); left: 0; right: 0; z-index: 40;
  background: var(--ink-3); border: 1px solid var(--border-2); border-radius: var(--r2);
  max-height: 220px; overflow-y: auto; box-shadow: var(--s2);
}
.ing-opt { display: flex; align-items: center; gap: 9px; padding: 9px 12px; font-size: 13px; color: var(--text-1); cursor: pointer; }
.ing-opt:hover { background: var(--ink-4); }
.ing-opt-e { font-size: 15px; }
.ing-empty { padding: 12px; font-size: 12.5px; color: var(--text-3); }
.ing-chip-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.ing-chip { display: inline-flex; align-items: center; gap: 7px; background: var(--green-glow); color: var(--green); border: 1px solid rgba(46,204,113,.25); padding: 9px 13px; border-radius: var(--r1); font-size: 13.5px; font-weight: 600; }
.ing-list { display: flex; flex-direction: column; gap: 6px; }
.ing-row { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--text-2); padding: 4px 0; }
.ing-row.miss { color: var(--amber); }

/* ── SHOPPING BUY BUTTONS ── */
.s-info { flex: 1; }
.s-buy { display: flex; gap: 6px; flex-wrap: wrap; margin-left: 8px; }
.buy-btn { font-size: 10.5px; font-weight: 700; padding: 6px 10px; border-radius: 20px; text-decoration: none; white-space: nowrap; transition: opacity .15s; }
.buy-btn:hover { opacity: .8; }
.buy-btn.amazon { background: rgba(255,153,0,.14); color: #FF9900; border: 1px solid rgba(255,153,0,.28); }
.buy-btn.ml { background: rgba(255,224,0,.12); color: #FFD400; border: 1px solid rgba(255,224,0,.25); }
.s-disclosure { margin-top: 14px; font-size: 11.5px; color: var(--text-3); display: flex; gap: 6px; align-items: flex-start; line-height: 1.5; }

/* ── SHOPPING ── */
.s-items { display: flex; flex-direction: column; gap: 8px; }
.s-row {
  display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
  background: var(--ink-2); border: 1px solid var(--border);
  border-radius: var(--r2); padding: 14px 16px; transition: all .15s;
}
.s-row:hover { border-color: var(--border-2); }
.s-row.done { opacity: .4; }
.chk {
  width: 20px; height: 20px; border-radius: 6px;
  border: 2px solid var(--text-3); cursor: pointer;
  display: flex; align-items: center; justify-content: center; flex-shrink:0;
  transition: all .15s;
}
.chk.on { background: var(--green); border-color: var(--green); }
.s-name { font-size: 14px; font-weight: 600; color: var(--text-1); }
.s-qty  { font-size: 12px; color: var(--text-3); margin-top: 2px; }
.s-cat  { margin-left: auto; font-size: 11px; color: var(--text-3); background: var(--ink-3); padding: 3px 8px; border-radius: 10px; }
.s-price { font-size: 14px; font-weight: 700; color: var(--green); margin-left: 10px; }
.s-total {
  margin-top: 20px; background: var(--green-glow); border: 1px solid rgba(46,204,113,.25);
  border-radius: var(--r2); padding: 16px 20px;
  display: flex; justify-content: space-between; align-items: center;
}
.s-total-l { font-size: 14px; font-weight: 600; color: var(--text-2); }
.s-total-v { font-size: 24px; font-weight: 800; color: var(--green); }

/* ── PLANNER ── */
.week-g { display: grid; grid-template-columns: repeat(7,1fr); gap: 8px; }
.day-col { display: flex; flex-direction: column; gap: 6px; }
.day-hd { font-size: 11px; font-weight: 700; color: var(--text-3); text-align: center; padding: 6px 0; text-transform: uppercase; letter-spacing: .5px; }
.day-hd.today { color: var(--green); }
.meal-t { font-size: 9px; font-weight: 700; color: var(--text-3); text-transform: uppercase; letter-spacing: .4px; margin-bottom: 3px; }
.meal-slot {
  background: var(--ink-2); border: 1px solid var(--border);
  border-radius: var(--r1); padding: 8px; min-height: 58px;
  font-size: 11px; color: var(--text-2); line-height: 1.4;
}
.meal-slot.empty {
  border-style: dashed; color: var(--text-3); display: flex;
  align-items: center; justify-content: center; cursor: pointer; font-size: 20px;
}
.meal-slot.empty:hover { border-color: var(--green); color: var(--green); background: var(--green-glow); }

/* ── WASTE SCORE ── */
.score-hero { text-align: center; padding: 36px 24px 24px; }
.ring-wrap { display: inline-block; position: relative; margin: 16px auto; }
.ring { transform: rotate(-90deg); }
.ring-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.ring-num { font-size: 46px; font-weight: 900; line-height: 1; }
.ring-den { font-size: 16px; color: var(--text-3); }
.score-msg { font-size: 15px; font-weight: 600; color: var(--green); margin-top: 10px; }
.impact-g { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; margin-top: 24px; }
.imp-card { background: var(--ink-2); border: 1px solid var(--border); border-radius: var(--r2); padding: 18px; }
.imp-ico { font-size: 26px; margin-bottom: 8px; }
.imp-val { font-size: 24px; font-weight: 800; color: var(--text-1); }
.imp-lbl { font-size: 12px; color: var(--text-3); margin-top: 3px; }
.bar-hist { background: var(--ink-2); border: 1px solid var(--border); border-radius: var(--r2); padding: 20px; margin-top: 20px; }
.bar-hist-t { font-size: 14px; font-weight: 700; color: var(--text-1); margin-bottom: 16px; }
.bar-row { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
.bar-lbl { width: 28px; font-size: 12px; color: var(--text-3); font-weight: 600; }
.bar-track { flex: 1; background: var(--ink-3); border-radius: 6px; height: 10px; overflow: hidden; }
.bar-fill { height: 100%; border-radius: 6px; transition: width 1.2s ease; }
.bar-val { width: 28px; font-size: 12px; font-weight: 700; color: var(--text-2); }

/* ── AI FAB ── */
.ai-fab {
  position: fixed; bottom: 28px; right: 28px; z-index: 50;
  width: 58px; height: 58px; border-radius: 50%;
  background: linear-gradient(135deg, var(--green), var(--amber));
  border: none; cursor: pointer; box-shadow: 0 8px 24px rgba(46,204,113,0.35);
  font-size: 26px; display: flex; align-items: center; justify-content: center;
  transition: transform .15s;
}
.ai-fab:hover { transform: scale(1.1); }
.ai-panel {
  position: fixed; bottom: 98px; right: 28px; z-index: 50;
  width: 360px; max-height: 480px; display: flex; flex-direction: column;
  background: var(--ink-2); border: 1px solid var(--border-2);
  border-radius: var(--r4); box-shadow: var(--s3); overflow: hidden;
}
.ai-ph {
  padding: 16px 18px;
  background: linear-gradient(135deg, var(--green-dim), var(--amber-dim));
  display: flex; align-items: center; justify-content: space-between;
}
.ai-ph-t { font-size: 14px; font-weight: 700; color: #fff; }
.ai-ph-x { background: none; border: none; color: rgba(255,255,255,.7); cursor: pointer; font-size: 18px; }
.ai-msgs { flex: 1; overflow-y: auto; padding: 14px; display: flex; flex-direction: column; gap: 10px; }
.ai-msgs::-webkit-scrollbar { width: 3px; }
.ai-msgs::-webkit-scrollbar-thumb { background: var(--ink-4); border-radius:3px; }
.ai-m { display: flex; gap: 8px; }
.ai-m.u { flex-direction: row-reverse; }
.ai-av { width: 30px; height: 30px; min-width:30px; border-radius: 50%; background: var(--ink-3); display:flex;align-items:center;justify-content:center; font-size: 14px; }
.ai-b { background: var(--ink-3); border-radius: 14px; border-top-left-radius: 4px; padding: 10px 14px; font-size: 13px; color: var(--text-2); max-width: 82%; line-height: 1.55; white-space: pre-wrap; }
.ai-m.u .ai-b { background: var(--green-dim); color: #fff; border-radius: 14px; border-top-right-radius: 4px; }
.ai-in-row { padding: 12px 14px; border-top: 1px solid var(--border); display: flex; gap: 8px; }
.ai-in { flex: 1; background: var(--ink-3); border: 1px solid var(--border); border-radius: var(--r1); padding: 9px 14px; font-size: 13px; font-family: var(--font); color: var(--text-1); outline: none; }
.ai-in:focus { border-color: var(--green); }
.ai-in::placeholder { color: var(--text-3); }
.ai-send { background: var(--green); color: var(--ink); border: none; border-radius: var(--r1); padding: 0 14px; cursor: pointer; font-size: 13px; font-weight: 700; }
.ai-send:hover { background: #27ae60; }

/* ── AUTH ── */
.auth-wrap { min-height: 100vh; background: var(--ink); display: flex; align-items: center; justify-content: center; padding: 20px; position: relative; overflow: hidden; }
.auth-bg {
  position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(ellipse at 20% 50%, rgba(46,204,113,0.08) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 20%, rgba(243,156,18,0.06) 0%, transparent 50%);
}
.auth-card { background: var(--ink-2); border: 1px solid var(--border); border-radius: var(--r4); padding: 40px; max-width: 420px; width: 100%; box-shadow: var(--s3); position: relative; z-index:1; }
.auth-logo { display: flex; align-items: center; gap: 12px; justify-content: center; margin-bottom: 28px; }
.auth-gem { width: 48px; height: 48px; background: linear-gradient(135deg,var(--green),var(--amber)); border-radius: 14px; display:flex;align-items:center;justify-content:center;font-size:26px; box-shadow: 0 0 30px var(--green-glow); }
.auth-brand { font-family: var(--display); font-size: 20px; font-weight: 700; color: var(--text-1); }
.auth-title { font-family: var(--display); font-size: 24px; font-weight: 700; color: var(--text-1); text-align: center; margin-bottom: 6px; }
.auth-sub { font-size: 14px; color: var(--text-3); text-align: center; margin-bottom: 28px; }
.auth-google { width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: var(--r2); background: var(--ink-3); cursor: pointer; font-size: 14px; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 10px; transition: all .15s; color: var(--text-1); }
.auth-google:hover { border-color: var(--green); background: var(--green-glow); }
.divider { display: flex; align-items: center; gap: 12px; margin: 20px 0; }
.div-line { flex: 1; height: 1px; background: var(--border); }
.div-txt { font-size: 12px; color: var(--text-3); }
.auth-err { background: var(--red-dim); color: var(--red); padding: 10px 14px; border-radius: var(--r1); font-size: 13px; margin-bottom: 16px; }
.auth-btn { width: 100%; padding: 13px; background: var(--green); color: var(--ink); border: none; border-radius: var(--r2); font-size: 15px; font-weight: 700; cursor: pointer; font-family: var(--font); transition: all .15s; }
.auth-btn:hover { background: #27ae60; box-shadow: 0 6px 24px rgba(46,204,113,.3); }
.auth-btn:disabled { opacity:.5; cursor:not-allowed; }
.auth-tog { text-align: center; margin-top: 20px; font-size: 13px; color: var(--text-3); }
.auth-tog button { color: var(--green); font-weight: 700; background: none; border: none; cursor: pointer; }

/* ── EMPTY STATE ── */
.empty-st { text-align: center; padding: 64px 24px; color: var(--text-3); }
.empty-ico { font-size: 52px; margin-bottom: 16px; opacity: .6; }
.empty-txt { font-size: 15px; }

/* ── TOAST ── */
.toast {
  position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%);
  background: var(--ink-2); border: 1px solid var(--border-2); color: var(--text-1);
  padding: 12px 20px; border-radius: var(--r2); font-size: 14px; font-weight: 500;
  box-shadow: var(--s3); z-index: 200; animation: fup .3s ease;
}
@keyframes fup { from{opacity:0;transform:translateX(-50%) translateY(10px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }

/* ── SPINNER ── */
.spin { width:18px;height:18px;border:2px solid rgba(10,26,16,.3);border-top-color:var(--ink);border-radius:50%;animation:sp .7s linear infinite;display:inline-block; }
@keyframes sp { to{transform:rotate(360deg)} }

/* ── LOADING SCREEN ── */
.loading-screen { min-height:100vh;background:var(--ink);display:flex;align-items:center;justify-content:center; }
.loading-inner { text-align:center; }
.loading-gem { width:64px;height:64px;background:linear-gradient(135deg,var(--green),var(--amber));border-radius:18px;display:flex;align-items:center;justify-content:center;font-size:34px;margin:0 auto 20px;box-shadow:0 0 40px var(--green-glow);animation:pulse 2s ease-in-out infinite; }
@keyframes pulse { 0%,100%{box-shadow:0 0 20px var(--green-glow)} 50%{box-shadow:0 0 50px rgba(46,204,113,.4)} }
.loading-txt { font-size:14px;color:var(--text-3); }

@media(max-width:900px) { .sidebar{display:none;} .page{padding:20px 16px;} .stat-row{grid-template-columns:repeat(2,1fr);} .week-g{grid-template-columns:repeat(4,1fr);} .ai-panel{width:calc(100vw - 32px);right:16px;} }
@media(max-width:600px) { .recipes-grid{grid-template-columns:1fr;} .pantry-grid{grid-template-columns:repeat(2,1fr);} .week-g{grid-template-columns:repeat(3,1fr);} .impact-g{grid-template-columns:1fr 1fr;} .stat-row{grid-template-columns:1fr 1fr;} }
`;

// ── STRINGS ──────────────────────────────────────────────────────────────────
const T = {
  pt: {
    nav: { dashboard:"Início", pantry:"Minha Despensa", recipes:"Receitas", shopping:"Compras", planner:"Cardápio", waste:"Impacto" },
    auth: { welcome:"Bem-vindo de volta", sub:"Entre para acessar sua despensa", email:"E-mail", password:"Senha", signin:"Entrar", signup:"Criar conta", tog_in:"Já tenho conta", tog_up:"Criar conta agora", or:"ou", google:"Continuar com Google", err:"Algo deu errado. Tente novamente." },
    dash: { hi:"Bom dia! 👋", sub:"Veja o que está acontecendo na sua cozinha.", exp:"Vencendo em breve", rdy:"Receitas prontas", items:"Itens na despensa", score:"Score de impacto", urgent:"Urgente", cook:"Cozinhe antes que vença", all:"Ver tudo", tmw:"Vence amanhã", in:"Vence em", days:"dias" },
    pantry: { title:"Minha Despensa", sub:"Tudo que você tem em casa", add:"Adicionar", search:"Buscar ingredientes…", cats:["Todos","Geladeira","Freezer","Despensa","Temperos"], qty:"Qtd", loc:"Local", modal_t:"Novo ingrediente", name:"Ingrediente", quantity:"Quantidade", unit:"Unidade", cat:"Categoria", exp:"Data de validade", save:"Salvar", cancel:"Cancelar", receipt:"📷 Escanear nota", voice:"🎙️ Voz", empty:"Sua despensa está vazia. Adicione o primeiro ingrediente!", pick_ph:"Digite para buscar… (ex: picanha)", pick_empty:"Nenhum ingrediente encontrado. Tente outro termo.", change:"Trocar" },
    recipes: { title:"Receitas para você", sub:"Com base no que você já tem", all:"Todas", cook_now:"Pode cozinhar", almost:"Quase pronto", need:"Precisa comprar", match:"compatível", missing:"Faltando", min:"min", serv:"porções", diff:["Fácil","Médio","Difícil"], cook:"Cozinhar agora", save:"Salvar", miss_lbl:"⚠️ Faltando", watch:"▶ Buscar vídeos no YouTube", nutr:"Nutrição", prep:"Modo de preparo", vid:"Vídeo da receita", close:"Fechar", add_shop:"🛒 Adicionar à lista" },
    shopping: { title:"Lista de compras", sub:"O que você precisa comprar", add:"Adicionar", clear:"Limpar marcados", total:"Total estimado", items:"itens", empty:"Sua lista está vazia.", add_ph:"Adicionar item…", affiliate_note:"Os botões de compra usam links de afiliado da Amazon e do Mercado Livre — ao comprar por eles você apoia o app, sem pagar nada a mais." },
    planner: { title:"Cardápio semanal", sub:"Planeje suas refeições com antecedência", days:["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"], meals:{breakfast:"☀️ Café",lunch:"🌤 Almoço",dinner:"🌙 Jantar",snack:"🍎 Lanche"} },
    waste: { title:"Score de impacto", sub:"Acompanhe seu impacto ambiental e financeiro", score_lbl:"Seu score", month:"Este mês", saved:"Economizado", rescued:"Itens resgatados", cooked:"Receitas feitas", reduced:"Desperdício evitado", great:"Excelente! Continue assim 🌱", good:"Bom trabalho! Melhorias à frente 👍", avg:"Dá para melhorar 💪", hist:"Histórico mensal" },
    ai: { title:"Chef IA", ph:"Me diga o que tem e sugiro receitas…", send:"Enviar", think:"Pensando…", hi:"Olá! Sou seu Chef IA. Me diga o que você tem em casa e vou sugerir as melhores receitas!" },
    out:"Sair", lang:"EN",
  },
  en: {
    nav: { dashboard:"Dashboard", pantry:"My Pantry", recipes:"Recipes", shopping:"Shopping", planner:"Meal Plan", waste:"Impact" },
    auth: { welcome:"Welcome back", sub:"Sign in to access your pantry", email:"Email", password:"Password", signin:"Sign In", signup:"Create Account", tog_in:"Already have an account", tog_up:"Create account now", or:"or", google:"Continue with Google", err:"Something went wrong. Try again." },
    dash: { hi:"Good morning! 👋", sub:"Here's what's happening in your kitchen.", exp:"Expiring soon", rdy:"Recipes ready", items:"Pantry items", score:"Waste score", urgent:"Urgent", cook:"Cook before they expire", all:"View all", tmw:"Expires tomorrow", in:"Expires in", days:"days" },
    pantry: { title:"My Pantry", sub:"Everything you have at home", add:"Add Item", search:"Search ingredients…", cats:["All","Fridge","Freezer","Pantry","Spices"], qty:"Qty", loc:"Location", modal_t:"New ingredient", name:"Ingredient", quantity:"Quantity", unit:"Unit", cat:"Category", exp:"Expiration date", save:"Save", cancel:"Cancel", receipt:"📷 Scan receipt", voice:"🎙️ Voice", empty:"Your pantry is empty. Add your first ingredient!", pick_ph:"Type to search… (e.g. chicken)", pick_empty:"No ingredient found. Try another term.", change:"Change" },
    recipes: { title:"Recipes for you", sub:"Based on what you already have", all:"All", cook_now:"Can cook", almost:"Almost ready", need:"Need shopping", match:"match", missing:"Missing", min:"min", serv:"servings", diff:["Easy","Medium","Hard"], cook:"Cook now", save:"Save", miss_lbl:"⚠️ Missing", watch:"▶ Search videos on YouTube", nutr:"Nutrition", prep:"Instructions", vid:"Recipe video", close:"Close", add_shop:"🛒 Add to list" },
    shopping: { title:"Shopping List", sub:"What you need to buy", add:"Add Item", clear:"Clear checked", total:"Estimated total", items:"items", empty:"Your list is empty.", add_ph:"Add item…", affiliate_note:"The buy buttons use Amazon and Mercado Livre affiliate links — buying through them supports the app at no extra cost to you." },
    planner: { title:"Meal Planner", sub:"Plan your meals ahead", days:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], meals:{breakfast:"☀️ Breakfast",lunch:"🌤 Lunch",dinner:"🌙 Dinner",snack:"🍎 Snack"} },
    waste: { title:"Impact Score", sub:"Track your environmental & financial impact", score_lbl:"Your score", month:"This month", saved:"Money saved", rescued:"Items rescued", cooked:"Recipes cooked", reduced:"Waste reduced", great:"Excellent! Keep it up 🌱", good:"Good job! Small wins ahead 👍", avg:"Room to improve 💪", hist:"Monthly history" },
    ai: { title:"AI Chef", ph:"Tell me what you have…", send:"Send", think:"Thinking…", hi:"Hi! I'm your AI Chef. Tell me what you have at home and I'll suggest the best recipes!" },
    out:"Sign Out", lang:"PT",
  }
};

// ── INGREDIENTS MASTER DATABASE ─────────────────────────────────────────────
// Lista curada de ingredientes. A Despensa e as Receitas usam SEMPRE este id,
// nunca texto livre — isso garante que "picanha" nunca vire "pcanha" e que
// receitas e despensa fiquem 100% compatíveis entre si.
const INGREDIENTS_DB = [
  // Geladeira (frescos)
  { id:"ovo", name:"Ovos / Eggs", emoji:"🥚", unit:"un", category:"Fridge" },
  { id:"leite", name:"Leite / Milk", emoji:"🥛", unit:"L", category:"Fridge" },
  { id:"manteiga", name:"Manteiga / Butter", emoji:"🧈", unit:"g", category:"Fridge" },
  { id:"margarina", name:"Margarina / Margarine", emoji:"🧈", unit:"g", category:"Fridge" },
  { id:"mussarela", name:"Mussarela / Mozzarella", emoji:"🧀", unit:"g", category:"Fridge" },
  { id:"queijo_parmesao", name:"Queijo Parmesão / Parmesan", emoji:"🧀", unit:"g", category:"Fridge" },
  { id:"queijo_minas", name:"Queijo Minas / Minas Cheese", emoji:"🧀", unit:"g", category:"Fridge" },
  { id:"requeijao", name:"Requeijão / Cream Cheese Spread", emoji:"🧀", unit:"g", category:"Fridge" },
  { id:"cream_cheese", name:"Cream Cheese", emoji:"🧀", unit:"g", category:"Fridge" },
  { id:"iogurte", name:"Iogurte Natural / Plain Yogurt", emoji:"🥛", unit:"un", category:"Fridge" },
  { id:"creme_de_leite", name:"Creme de Leite / Heavy Cream", emoji:"🥛", unit:"ml", category:"Fridge" },
  { id:"presunto", name:"Presunto / Ham", emoji:"🍖", unit:"g", category:"Fridge" },
  { id:"mortadela", name:"Mortadela / Bologna", emoji:"🍖", unit:"g", category:"Fridge" },
  { id:"tomate", name:"Tomate / Tomato", emoji:"🍅", unit:"un", category:"Fridge" },
  { id:"alface", name:"Alface / Lettuce", emoji:"🥬", unit:"un", category:"Fridge" },
  { id:"rucula", name:"Rúcula / Arugula", emoji:"🥬", unit:"maço", category:"Fridge" },
  { id:"espinafre", name:"Espinafre / Spinach", emoji:"🥬", unit:"g", category:"Fridge" },
  { id:"couve", name:"Couve / Collard Greens", emoji:"🥬", unit:"maço", category:"Fridge" },
  { id:"repolho", name:"Repolho / Cabbage", emoji:"🥬", unit:"un", category:"Fridge" },
  { id:"brocolis", name:"Brócolis / Broccoli", emoji:"🥦", unit:"un", category:"Fridge" },
  { id:"cenoura", name:"Cenoura / Carrot", emoji:"🥕", unit:"un", category:"Fridge" },
  { id:"pepino", name:"Pepino / Cucumber", emoji:"🥒", unit:"un", category:"Fridge" },
  { id:"abobrinha", name:"Abobrinha / Zucchini", emoji:"🥒", unit:"un", category:"Fridge" },
  { id:"berinjela", name:"Berinjela / Eggplant", emoji:"🍆", unit:"un", category:"Fridge" },
  { id:"pimentao_verde", name:"Pimentão Verde / Green Bell Pepper", emoji:"🫑", unit:"un", category:"Fridge" },
  { id:"pimentao_vermelho", name:"Pimentão Vermelho / Red Bell Pepper", emoji:"🫑", unit:"un", category:"Fridge" },
  { id:"beterraba", name:"Beterraba / Beet", emoji:"🟣", unit:"un", category:"Fridge" },
  { id:"limao", name:"Limão / Lime", emoji:"🍋", unit:"un", category:"Fridge" },
  { id:"laranja", name:"Laranja / Orange", emoji:"🍊", unit:"un", category:"Fridge" },
  { id:"morango", name:"Morango / Strawberry", emoji:"🍓", unit:"g", category:"Fridge" },
  { id:"uva", name:"Uva / Grapes", emoji:"🍇", unit:"g", category:"Fridge" },
  { id:"cogumelo", name:"Cogumelos / Mushrooms", emoji:"🍄", unit:"g", category:"Fridge" },
  { id:"carne_moida", name:"Carne Moída / Ground Beef", emoji:"🥩", unit:"g", category:"Fridge" },
  { id:"bacon", name:"Bacon", emoji:"🥓", unit:"g", category:"Fridge" },
  { id:"linguica", name:"Linguiça / Sausage", emoji:"🌭", unit:"g", category:"Fridge" },
  { id:"salsicha", name:"Salsicha / Hot Dog Sausage", emoji:"🌭", unit:"g", category:"Fridge" },
  { id:"azeitona", name:"Azeitona / Olives", emoji:"🫒", unit:"g", category:"Fridge" },
  { id:"manjericao", name:"Manjericão / Basil", emoji:"🌿", unit:"maço", category:"Fridge" },
  { id:"salsa", name:"Salsinha / Parsley", emoji:"🌿", unit:"maço", category:"Fridge" },
  { id:"cebolinha", name:"Cebolinha / Chives", emoji:"🌿", unit:"maço", category:"Fridge" },
  { id:"hortela", name:"Hortelã / Mint", emoji:"🌿", unit:"maço", category:"Fridge" },
  { id:"abacate", name:"Abacate / Avocado", emoji:"🥑", unit:"un", category:"Fridge" },

  // Freezer (congelados)
  { id:"frango_congelado", name:"Frango Congelado / Frozen Chicken", emoji:"🍗", unit:"g", category:"Freezer" },
  { id:"peito_de_frango", name:"Peito de Frango / Chicken Breast", emoji:"🍗", unit:"g", category:"Freezer" },
  { id:"coxa_de_frango", name:"Coxa de Frango / Chicken Thigh", emoji:"🍗", unit:"g", category:"Freezer" },
  { id:"carne_bovina", name:"Carne Bovina / Beef Cuts", emoji:"🥩", unit:"g", category:"Freezer" },
  { id:"picanha", name:"Picanha", emoji:"🥩", unit:"g", category:"Freezer" },
  { id:"alcatra", name:"Alcatra / Top Sirloin", emoji:"🥩", unit:"g", category:"Freezer" },
  { id:"costela", name:"Costela / Ribs", emoji:"🍖", unit:"g", category:"Freezer" },
  { id:"carne_de_porco", name:"Carne de Porco / Pork", emoji:"🥩", unit:"g", category:"Freezer" },
  { id:"camarao", name:"Camarão / Shrimp", emoji:"🍤", unit:"g", category:"Freezer" },
  { id:"tilapia", name:"Tilápia / Tilapia", emoji:"🐟", unit:"g", category:"Freezer" },
  { id:"salmao", name:"Salmão / Salmon", emoji:"🐟", unit:"g", category:"Freezer" },
  { id:"peixe_file", name:"Filé de Peixe / Fish Fillet", emoji:"🐟", unit:"g", category:"Freezer" },
  { id:"legumes_congelados", name:"Legumes Congelados / Frozen Vegetables", emoji:"🥦", unit:"g", category:"Freezer" },
  { id:"ervilha_congelada", name:"Ervilha Congelada / Frozen Peas", emoji:"🟢", unit:"g", category:"Freezer" },
  { id:"milho_congelado", name:"Milho Congelado / Frozen Corn", emoji:"🌽", unit:"g", category:"Freezer" },
  { id:"acai", name:"Açaí", emoji:"🟣", unit:"g", category:"Freezer" },
  { id:"sorvete", name:"Sorvete / Ice Cream", emoji:"🍦", unit:"L", category:"Freezer" },
  { id:"polpa_de_fruta", name:"Polpa de Fruta / Fruit Pulp", emoji:"🍓", unit:"g", category:"Freezer" },

  // Despensa (secos, grãos, enlatados, etc.)
  { id:"arroz", name:"Arroz / Rice", emoji:"🍚", unit:"kg", category:"Pantry" },
  { id:"arroz_arboreo", name:"Arroz Arbóreo / Arborio Rice", emoji:"🍚", unit:"g", category:"Pantry" },
  { id:"feijao", name:"Feijão / Beans", emoji:"🫘", unit:"kg", category:"Pantry" },
  { id:"feijao_preto", name:"Feijão Preto / Black Beans", emoji:"🫘", unit:"kg", category:"Pantry" },
  { id:"lentilha", name:"Lentilha / Lentils", emoji:"🫘", unit:"g", category:"Pantry" },
  { id:"grao_de_bico", name:"Grão-de-bico / Chickpeas", emoji:"🫘", unit:"g", category:"Pantry" },
  { id:"macarrao", name:"Macarrão / Pasta", emoji:"🍝", unit:"g", category:"Pantry" },
  { id:"macarrao_instantaneo", name:"Macarrão Instantâneo / Instant Noodles", emoji:"🍜", unit:"un", category:"Pantry" },
  { id:"farinha_de_trigo", name:"Farinha de Trigo / Wheat Flour", emoji:"🌾", unit:"kg", category:"Pantry" },
  { id:"farinha_de_mandioca", name:"Farinha de Mandioca / Cassava Flour", emoji:"🌾", unit:"kg", category:"Pantry" },
  { id:"fuba", name:"Fubá / Corn Flour", emoji:"🌾", unit:"kg", category:"Pantry" },
  { id:"polvilho", name:"Polvilho / Tapioca Starch", emoji:"🌾", unit:"kg", category:"Pantry" },
  { id:"amido_de_milho", name:"Amido de Milho / Cornstarch", emoji:"🌾", unit:"g", category:"Pantry" },
  { id:"acucar", name:"Açúcar / Sugar", emoji:"🍬", unit:"kg", category:"Pantry" },
  { id:"acucar_mascavo", name:"Açúcar Mascavo / Brown Sugar", emoji:"🍬", unit:"kg", category:"Pantry" },
  { id:"mel", name:"Mel / Honey", emoji:"🍯", unit:"g", category:"Pantry" },
  { id:"azeite", name:"Azeite / Olive Oil", emoji:"🫙", unit:"ml", category:"Pantry" },
  { id:"oleo_de_soja", name:"Óleo de Soja / Soybean Oil", emoji:"🫙", unit:"ml", category:"Pantry" },
  { id:"oleo_de_coco", name:"Óleo de Coco / Coconut Oil", emoji:"🥥", unit:"ml", category:"Pantry" },
  { id:"vinagre", name:"Vinagre / Vinegar", emoji:"🍶", unit:"ml", category:"Pantry" },
  { id:"molho_de_tomate", name:"Molho de Tomate / Tomato Sauce", emoji:"🍅", unit:"g", category:"Pantry" },
  { id:"extrato_de_tomate", name:"Extrato de Tomate / Tomato Paste", emoji:"🍅", unit:"g", category:"Pantry" },
  { id:"milho_em_lata", name:"Milho em Lata / Canned Corn", emoji:"🌽", unit:"g", category:"Pantry" },
  { id:"ervilha_em_lata", name:"Ervilha em Lata / Canned Peas", emoji:"🟢", unit:"g", category:"Pantry" },
  { id:"atum_em_lata", name:"Atum em Lata / Canned Tuna", emoji:"🐟", unit:"g", category:"Pantry" },
  { id:"sardinha_em_lata", name:"Sardinha em Lata / Canned Sardines", emoji:"🐟", unit:"g", category:"Pantry" },
  { id:"leite_condensado", name:"Leite Condensado / Condensed Milk", emoji:"🥫", unit:"g", category:"Pantry" },
  { id:"leite_de_coco", name:"Leite de Coco / Coconut Milk", emoji:"🥥", unit:"ml", category:"Pantry" },
  { id:"leite_em_po", name:"Leite em Pó / Powdered Milk", emoji:"🥛", unit:"g", category:"Pantry" },
  { id:"chocolate_em_po", name:"Chocolate em Pó / Cocoa Powder", emoji:"🍫", unit:"g", category:"Pantry" },
  { id:"chocolate_meio_amargo", name:"Chocolate Meio Amargo / Dark Chocolate", emoji:"🍫", unit:"g", category:"Pantry" },
  { id:"aveia", name:"Aveia em Flocos / Rolled Oats", emoji:"🌾", unit:"g", category:"Pantry" },
  { id:"granola", name:"Granola", emoji:"🥣", unit:"g", category:"Pantry" },
  { id:"castanha_do_para", name:"Castanha-do-Pará / Brazil Nuts", emoji:"🌰", unit:"g", category:"Pantry" },
  { id:"amendoim", name:"Amendoim / Peanuts", emoji:"🥜", unit:"g", category:"Pantry" },
  { id:"nozes", name:"Nozes / Walnuts", emoji:"🌰", unit:"g", category:"Pantry" },
  { id:"amendoas", name:"Amêndoas / Almonds", emoji:"🌰", unit:"g", category:"Pantry" },
  { id:"coco_ralado", name:"Coco Ralado / Shredded Coconut", emoji:"🥥", unit:"g", category:"Pantry" },
  { id:"uva_passa", name:"Uva Passa / Raisins", emoji:"🍇", unit:"g", category:"Pantry" },
  { id:"fermento_quimico", name:"Fermento em Pó / Baking Powder", emoji:"🧁", unit:"g", category:"Pantry" },
  { id:"fermento_biologico", name:"Fermento Biológico / Yeast", emoji:"🍞", unit:"g", category:"Pantry" },
  { id:"bicarbonato_de_sodio", name:"Bicarbonato de Sódio / Baking Soda", emoji:"🧪", unit:"g", category:"Pantry" },
  { id:"pao_frances", name:"Pão Francês / French Bread", emoji:"🥖", unit:"un", category:"Pantry" },
  { id:"pao_de_forma", name:"Pão de Forma / Sliced Bread", emoji:"🍞", unit:"un", category:"Pantry" },
  { id:"farinha_de_rosca", name:"Farinha de Rosca / Bread Crumbs", emoji:"🍞", unit:"g", category:"Pantry" },
  { id:"batata", name:"Batata / Potato", emoji:"🥔", unit:"kg", category:"Pantry" },
  { id:"batata_doce", name:"Batata Doce / Sweet Potato", emoji:"🍠", unit:"kg", category:"Pantry" },
  { id:"mandioca", name:"Mandioca / Cassava", emoji:"🥔", unit:"kg", category:"Pantry" },
  { id:"mandioquinha", name:"Mandioquinha / Peruvian Carrot", emoji:"🥔", unit:"kg", category:"Pantry" },
  { id:"cebola", name:"Cebola / Onion", emoji:"🧅", unit:"kg", category:"Pantry" },
  { id:"alho", name:"Alho / Garlic", emoji:"🧄", unit:"cabeça", category:"Pantry" },
  { id:"abobora", name:"Abóbora / Pumpkin", emoji:"🎃", unit:"kg", category:"Pantry" },
  { id:"inhame", name:"Inhame / Yam", emoji:"🥔", unit:"kg", category:"Pantry" },
  { id:"vinho_branco", name:"Vinho Branco / White Wine", emoji:"🍷", unit:"ml", category:"Pantry" },
  { id:"vinho_tinto", name:"Vinho Tinto / Red Wine", emoji:"🍷", unit:"ml", category:"Pantry" },
  { id:"maionese", name:"Maionese / Mayonnaise", emoji:"🥪", unit:"g", category:"Pantry" },
  { id:"mostarda", name:"Mostarda / Mustard", emoji:"🟡", unit:"g", category:"Pantry" },
  { id:"ketchup", name:"Ketchup", emoji:"🍅", unit:"g", category:"Pantry" },
  { id:"banana", name:"Banana", emoji:"🍌", unit:"un", category:"Pantry" },
  { id:"maca", name:"Maçã / Apple", emoji:"🍎", unit:"un", category:"Pantry" },
  { id:"abacaxi", name:"Abacaxi / Pineapple", emoji:"🍍", unit:"un", category:"Pantry" },
  { id:"mamao", name:"Mamão / Papaya", emoji:"🧡", unit:"un", category:"Pantry" },

  // Temperos e especiarias
  { id:"sal", name:"Sal / Salt", emoji:"🧂", unit:"g", category:"Spices" },
  { id:"pimenta_preta", name:"Pimenta-do-Reino / Black Pepper", emoji:"⚫", unit:"g", category:"Spices" },
  { id:"pimenta_vermelha", name:"Pimenta Vermelha / Chili Pepper", emoji:"🌶️", unit:"g", category:"Spices" },
  { id:"oregano", name:"Orégano / Oregano", emoji:"🌿", unit:"g", category:"Spices" },
  { id:"cominho", name:"Cominho / Cumin", emoji:"🌰", unit:"g", category:"Spices" },
  { id:"colorau", name:"Colorau / Annatto Powder", emoji:"🟠", unit:"g", category:"Spices" },
  { id:"paprica", name:"Páprica / Paprika", emoji:"🟠", unit:"g", category:"Spices" },
  { id:"louro", name:"Folha de Louro / Bay Leaf", emoji:"🍃", unit:"g", category:"Spices" },
  { id:"canela", name:"Canela / Cinnamon", emoji:"🟤", unit:"g", category:"Spices" },
  { id:"cravo", name:"Cravo / Clove", emoji:"🟤", unit:"g", category:"Spices" },
  { id:"gengibre", name:"Gengibre / Ginger", emoji:"🫚", unit:"g", category:"Spices" },
  { id:"curry", name:"Curry", emoji:"🟡", unit:"g", category:"Spices" },
  { id:"baunilha", name:"Essência de Baunilha / Vanilla Extract", emoji:"🍦", unit:"ml", category:"Spices" },
  { id:"noz_moscada", name:"Noz-Moscada / Nutmeg", emoji:"🌰", unit:"g", category:"Spices" },
];
const ING_BY_ID = Object.fromEntries(INGREDIENTS_DB.map(i => [i.id, i]));

// ── DATA ─────────────────────────────────────────────────────────────────────
// Cada receita referencia ingredientes pelo ID do INGREDIENTS_DB (campo "ing").
// O % de compatibilidade e a lista de "faltando" NÃO são mais fixos — são
// calculados em tempo real comparando com a despensa atual do usuário
// (veja a função recipeStats). Os textos/passos abaixo são originais,
// escritos para este app — não foram copiados de nenhum site de receitas.
const RECIPES_DATA = [
  { id:1, title:"Omelete de Queijo / Cheese Omelette", cuisine:"Brasileira", time:15, serv:2, diff:0, ing:[{id:"ovo",qty:3},{id:"mussarela",qty:60,unit:"g"},{id:"sal",qty:1},{id:"azeite",qty:10,unit:"ml"}], cal:320, prot:24, cat:"Café", emoji:"🍳", desc:"Omelete fofinha com mussarela derretida e ervas frescas.", steps:["Bata os ovos com uma pitada de sal.","Aqueça azeite em frigideira antiaderente.","Despeje os ovos e cozinhe até as bordas firmarem.","Adicione mussarela, dobre e sirva."], img:"https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80" },
  { id:2, title:"Risoto de Cogumelos / Mushroom Risotto", cuisine:"Italiana", time:35, serv:4, diff:1, ing:[{id:"arroz_arboreo",qty:300,unit:"g"},{id:"cogumelo",qty:250,unit:"g"},{id:"cebola",qty:1},{id:"alho",qty:1},{id:"vinho_branco",qty:100,unit:"ml"},{id:"queijo_parmesao",qty:50,unit:"g"},{id:"manteiga",qty:20,unit:"g"}], cal:480, prot:12, cat:"Jantar", emoji:"🍲", desc:"Risoto cremoso com cogumelos salteados e parmesão.", steps:["Refogue cebola e alho na manteiga.","Adicione os cogumelos e doure bem.","Adicione o arroz, o vinho e o caldo aos poucos, sem parar de mexer.","Finalize com manteiga e parmesão fora do fogo."], img:"https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80" },
  { id:3, title:"Frango ao Alho / Garlic Chicken", cuisine:"Brasileira", time:45, serv:4, diff:1, ing:[{id:"peito_de_frango",qty:600,unit:"g"},{id:"alho",qty:1},{id:"limao",qty:1},{id:"sal",qty:1},{id:"azeite",qty:15,unit:"ml"}], cal:520, prot:48, cat:"Jantar", emoji:"🍗", desc:"Frango suculento com crosta de alho dourado.", steps:["Tempere o frango com sal, pimenta e alho picado.","Marine por 30 minutos na geladeira.","Sele em azeite quente 4 min de cada lado.","Finalize no forno a 180°C por 15 min e regue com limão."], img:"https://images.unsplash.com/photo-1598103442097-8b74394b95c8?w=600&q=80" },
  { id:4, title:"Arroz com Feijão / Rice & Beans", cuisine:"Brasileira", time:40, serv:6, diff:0, ing:[{id:"arroz",qty:0.5,unit:"kg"},{id:"feijao",qty:0.5,unit:"kg"},{id:"alho",qty:1},{id:"cebola",qty:1},{id:"oleo_de_soja",qty:15,unit:"ml"}], cal:380, prot:14, cat:"Almoço", emoji:"🍚", desc:"O clássico brasileiro perfeitamente temperado.", steps:["Cozinhe o feijão na pressão por 20 min.","Refogue alho e cebola no óleo.","Adicione o feijão cozido e tempere a gosto.","Cozinhe o arroz separadamente e sirva junto."], img:"https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80" },
  { id:5, title:"Salada Caprese / Caprese Salad", cuisine:"Italiana", time:10, serv:2, diff:0, ing:[{id:"tomate",qty:3},{id:"mussarela",qty:150,unit:"g"},{id:"azeite",qty:10,unit:"ml"},{id:"manjericao",qty:1}], cal:220, prot:14, cat:"Almoço", emoji:"🥗", desc:"Tomate fresco e mussarela com fio de azeite.", steps:["Fatie tomates e mussarela uniformemente.","Disponha alternados em camadas no prato.","Regue com azeite extra-virgem.","Tempere com sal e folhas de manjericão fresco."], img:"https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80" },
  { id:6, title:"Macarrão ao Sugo / Tomato Pasta", cuisine:"Italiana", time:25, serv:4, diff:0, ing:[{id:"macarrao",qty:500,unit:"g"},{id:"tomate",qty:4},{id:"alho",qty:1},{id:"cebola",qty:1},{id:"manjericao",qty:1},{id:"azeite",qty:15,unit:"ml"}], cal:420, prot:16, cat:"Jantar", emoji:"🍝", desc:"Molho de tomate clássico com alho e ervas.", steps:["Cozinhe o macarrão em água com sal.","Refogue alho e cebola no azeite.","Adicione os tomates picados e cozinhe 15 min.","Misture o macarrão no molho e finalize com manjericão."], img:"https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80" },
  { id:7, title:"Pão de Queijo / Brazilian Cheese Bread", cuisine:"Brasileira", time:30, serv:6, diff:1, ing:[{id:"polvilho",qty:0.5,unit:"kg"},{id:"queijo_minas",qty:200,unit:"g"},{id:"ovo",qty:2},{id:"leite",qty:200,unit:"ml"},{id:"oleo_de_soja",qty:80,unit:"ml"}], cal:210, prot:6, cat:"Café", emoji:"🧀", desc:"Bolinhas crocantes por fora e elásticas por dentro.", steps:["Ferva o leite com o óleo e escalde o polvilho.","Deixe esfriar e adicione os ovos um a um.","Misture o queijo ralado até formar uma massa lisa.","Modele bolinhas e asse a 180°C por 25 min."] },
  { id:8, title:"Tapioca com Queijo / Cheese Tapioca", cuisine:"Brasileira", time:8, serv:1, diff:0, ing:[{id:"polvilho",qty:60,unit:"g"},{id:"queijo_minas",qty:40,unit:"g"}], cal:230, prot:8, cat:"Café", emoji:"🫓", desc:"Crepe nordestino feito na chapa em minutos.", steps:["Hidrate o polvilho passando-o por uma peneira fina.","Espalhe em frigideira quente formando um disco.","Quando firmar, vire e recheie com queijo.","Dobre ao meio e sirva quente."] },
  { id:9, title:"Vitamina de Banana / Banana Smoothie", cuisine:"Brasileira", time:5, serv:1, diff:0, ing:[{id:"banana",qty:1},{id:"leite",qty:250,unit:"ml"},{id:"aveia",qty:15,unit:"g"},{id:"mel",qty:10,unit:"g"}], cal:280, prot:9, cat:"Café", emoji:"🥤", desc:"Vitamina cremosa, rápida e nutritiva.", steps:["Coloque a banana, o leite e a aveia no liquidificador.","Bata por 1 minuto até ficar homogêneo.","Adoce com mel a gosto.","Sirva imediatamente bem gelado."] },
  { id:10, title:"Panqueca Americana / American Pancakes", cuisine:"Americana", time:20, serv:3, diff:0, ing:[{id:"farinha_de_trigo",qty:200,unit:"g"},{id:"ovo",qty:2},{id:"leite",qty:250,unit:"ml"},{id:"fermento_quimico",qty:8,unit:"g"},{id:"manteiga",qty:20,unit:"g"},{id:"mel",qty:20,unit:"g"}], cal:340, prot:10, cat:"Café", emoji:"🥞", desc:"Panquecas fofinhas para um café da manhã especial.", steps:["Misture os secos e os líquidos separadamente.","Combine tudo até obter uma massa lisa, sem bater demais.","Cozinhe porções em frigideira untada até dourar dos dois lados.","Sirva com manteiga e mel."] },
  { id:11, title:"Feijoada Simplificada / Easy Feijoada", cuisine:"Brasileira", time:90, serv:6, diff:2, ing:[{id:"feijao_preto",qty:0.5,unit:"kg"},{id:"bacon",qty:150,unit:"g"},{id:"linguica",qty:200,unit:"g"},{id:"carne_de_porco",qty:300,unit:"g"},{id:"cebola",qty:1},{id:"alho",qty:1},{id:"louro",qty:2}], cal:610, prot:38, cat:"Almoço", emoji:"🍛", desc:"Versão prática da feijoada completa de domingo.", steps:["Cozinhe o feijão preto na pressão com folhas de louro.","Doure bacon, linguiça e carne de porco em panela separada.","Junte as carnes ao feijão e cozinhe por 40 min.","Finalize com refogado de cebola e alho."] },
  { id:12, title:"Strogonoff de Frango / Chicken Stroganoff", cuisine:"Brasileira", time:30, serv:4, diff:1, ing:[{id:"peito_de_frango",qty:500,unit:"g"},{id:"creme_de_leite",qty:200,unit:"ml"},{id:"ketchup",qty:30,unit:"g"},{id:"mostarda",qty:10,unit:"g"},{id:"cebola",qty:1},{id:"cogumelo",qty:100,unit:"g"},{id:"arroz",qty:0.3,unit:"kg"}], cal:540, prot:34, cat:"Jantar", emoji:"🍛", desc:"Cremoso, rápido e clássico nos almoços de domingo.", steps:["Corte o frango em cubos e doure com a cebola.","Adicione os cogumelos e refogue.","Misture ketchup, mostarda e creme de leite.","Sirva sobre arroz branco."] },
  { id:13, title:"Picanha na Chapa / Grilled Picanha", cuisine:"Brasileira", time:25, serv:4, diff:1, ing:[{id:"picanha",qty:800,unit:"g"},{id:"sal",qty:10,unit:"g"},{id:"alho",qty:1}], cal:610, prot:52, cat:"Jantar", emoji:"🥩", desc:"O clássico churrasco brasileiro, na chapa ou grelha.", steps:["Tempere a picanha só com sal grosso pouco antes de assar.","Aqueça bem a chapa ou grelha.","Sele a peça de ambos os lados até o ponto desejado.","Deixe descansar 5 min antes de fatiar."] },
  { id:14, title:"Moqueca de Peixe / Brazilian Fish Stew", cuisine:"Brasileira", time:40, serv:4, diff:1, ing:[{id:"peixe_file",qty:600,unit:"g"},{id:"leite_de_coco",qty:200,unit:"ml"},{id:"pimentao_vermelho",qty:1},{id:"pimentao_verde",qty:1},{id:"tomate",qty:2},{id:"cebola",qty:1},{id:"colorau",qty:5,unit:"g"},{id:"limao",qty:1}], cal:390, prot:36, cat:"Jantar", emoji:"🍲", desc:"Ensopado leve e perfumado típico do litoral brasileiro.", steps:["Tempere o peixe com limão, sal e colorau.","Monte camadas de cebola, tomate e pimentões na panela.","Adicione o peixe e cubra com leite de coco.","Cozinhe em fogo médio por 20 min sem mexer muito."] },
  { id:15, title:"Baião de Dois / Rice & Beans Northeastern Style", cuisine:"Brasileira", time:45, serv:5, diff:1, ing:[{id:"feijao",qty:0.4,unit:"kg"},{id:"arroz",qty:0.4,unit:"kg"},{id:"queijo_minas",qty:100,unit:"g"},{id:"linguica",qty:150,unit:"g"},{id:"cebola",qty:1}], cal:480, prot:20, cat:"Almoço", emoji:"🍚", desc:"Prato nordestino que mistura arroz, feijão, queijo e linguiça.", steps:["Doure a linguiça e reserve a gordura.","Refogue a cebola na gordura da linguiça.","Misture o feijão e o arroz já cozidos e aqueça junto.","Finalize com queijo coalho ou minas em cubos."] },
  { id:16, title:"Escondidinho de Carne Moída / Beef Shepherd's Pie", cuisine:"Brasileira", time:50, serv:5, diff:1, ing:[{id:"carne_moida",qty:400,unit:"g"},{id:"batata_doce",qty:0.6,unit:"kg"},{id:"requeijao",qty:100,unit:"g"},{id:"cebola",qty:1},{id:"queijo_parmesao",qty:30,unit:"g"}], cal:460, prot:26, cat:"Jantar", emoji:"🥘", desc:"Camadas de purê e carne moída gratinadas no forno.", steps:["Cozinhe e amasse a batata doce com requeijão.","Refogue a carne moída com cebola e tempere.","Monte camadas: carne, purê e queijo por cima.","Gratine no forno até dourar."] },
  { id:17, title:"Salada de Grão-de-Bico / Chickpea Salad", cuisine:"Mediterrânea", time:15, serv:3, diff:0, ing:[{id:"grao_de_bico",qty:300,unit:"g"},{id:"tomate",qty:2},{id:"pepino",qty:1},{id:"cebola",qty:1},{id:"azeite",qty:15,unit:"ml"},{id:"limao",qty:1}], cal:260, prot:12, cat:"Almoço", emoji:"🥗", desc:"Salada leve, fresca e rica em fibras.", steps:["Misture o grão-de-bico cozido com os vegetais picados.","Tempere com azeite, limão e sal.","Deixe descansar 10 min na geladeira.","Sirva fresco como entrada ou prato único."] },
  { id:18, title:"Sopa de Legumes / Vegetable Soup", cuisine:"Brasileira", time:35, serv:4, diff:0, ing:[{id:"cenoura",qty:2},{id:"batata",qty:0.3,unit:"kg"},{id:"abobora",qty:0.3,unit:"kg"},{id:"cebola",qty:1},{id:"alho",qty:1},{id:"sal",qty:1}], cal:180, prot:5, cat:"Jantar", emoji:"🍜", desc:"Sopa reconfortante para dias frios.", steps:["Refogue cebola e alho.","Adicione os legumes picados e cubra com água.","Cozinhe até os legumes ficarem macios.","Amasse parcialmente para engrossar e tempere a gosto."] },
  { id:19, title:"Bolo de Chocolate / Chocolate Cake", cuisine:"Brasileira", time:50, serv:8, diff:1, ing:[{id:"farinha_de_trigo",qty:300,unit:"g"},{id:"chocolate_em_po",qty:80,unit:"g"},{id:"ovo",qty:3},{id:"acucar",qty:250,unit:"g"},{id:"oleo_de_soja",qty:150,unit:"ml"},{id:"fermento_quimico",qty:10,unit:"g"},{id:"leite",qty:200,unit:"ml"}], cal:320, prot:5, cat:"Sobremesa", emoji:"🍫", desc:"Bolo fofinho e intensamente chocolate.", steps:["Bata os ovos com açúcar e óleo.","Adicione o chocolate em pó e o leite, misturando bem.","Incorpore a farinha e o fermento delicadamente.","Asse a 180°C por 35 min."] },
  { id:20, title:"Brigadeiro / Brazilian Fudge Balls", cuisine:"Brasileira", time:20, serv:6, diff:0, ing:[{id:"leite_condensado",qty:395,unit:"g"},{id:"chocolate_em_po",qty:30,unit:"g"},{id:"manteiga",qty:15,unit:"g"}], cal:140, prot:2, cat:"Sobremesa", emoji:"🍬", desc:"O doce mais amado das festas brasileiras.", steps:["Misture leite condensado, chocolate e manteiga numa panela.","Cozinhe em fogo baixo mexendo sempre até soltar do fundo.","Deixe esfriar completamente.","Enrole bolinhas e passe em chocolate granulado."] },
  { id:21, title:"Pudim de Leite Condensado / Condensed Milk Pudding", cuisine:"Brasileira", time:60, serv:8, diff:1, ing:[{id:"leite_condensado",qty:395,unit:"g"},{id:"leite",qty:395,unit:"ml"},{id:"ovo",qty:3},{id:"acucar",qty:100,unit:"g"}], cal:260, prot:6, cat:"Sobremesa", emoji:"🍮", desc:"Clássico brasileiro cremoso com calda de caramelo.", steps:["Faça uma calda dourada com o açúcar e forre a forma.","Bata leite condensado, leite e ovos no liquidificador.","Despeje na forma caramelizada.","Asse em banho-maria a 180°C por 50 min e leve à geladeira."] },
  { id:22, title:"Camarão ao Alho e Óleo / Garlic Butter Shrimp", cuisine:"Brasileira", time:15, serv:3, diff:0, ing:[{id:"camarao",qty:500,unit:"g"},{id:"alho",qty:1},{id:"azeite",qty:30,unit:"ml"},{id:"salsa",qty:1},{id:"limao",qty:1}], cal:280, prot:32, cat:"Jantar", emoji:"🍤", desc:"Prato rápido, leve e cheio de sabor.", steps:["Tempere o camarão com sal e limão.","Doure o alho no azeite sem deixar queimar.","Adicione o camarão e salteie por 3-4 min.","Finalize com salsa picada e sirva imediatamente."] },
  { id:23, title:"Salpicão de Frango / Chicken Salpicão Salad", cuisine:"Brasileira", time:25, serv:5, diff:0, ing:[{id:"peito_de_frango",qty:400,unit:"g"},{id:"maionese",qty:120,unit:"g"},{id:"cenoura",qty:1},{id:"milho_em_lata",qty:100,unit:"g"},{id:"uva_passa",qty:30,unit:"g"}], cal:380, prot:24, cat:"Almoço", emoji:"🥗", desc:"Salada cremosa, ótima para festas e churrascos.", steps:["Cozinhe e desfie o peito de frango.","Misture com cenoura ralada, milho e uva passa.","Adicione maionese até ficar cremoso.","Leve à geladeira por 30 min antes de servir."] },
  { id:24, title:"Torta de Frango / Chicken Pot Pie", cuisine:"Brasileira", time:55, serv:6, diff:1, ing:[{id:"peito_de_frango",qty:400,unit:"g"},{id:"farinha_de_trigo",qty:200,unit:"g"},{id:"ovo",qty:2},{id:"requeijao",qty:100,unit:"g"},{id:"milho_em_lata",qty:100,unit:"g"}], cal:420, prot:22, cat:"Jantar", emoji:"🥧", desc:"Torta salgada cremosa, perfeita para o jantar em família.", steps:["Cozinhe e desfie o frango, misture com requeijão e milho.","Prepare a massa com farinha, ovos e um pouco de água.","Forre a forma, recheie e cubra com mais massa.","Asse a 200°C por 35 min até dourar."] },
];

// Pequena fábrica para deixar os mocks legíveis e sempre ligados ao INGREDIENTS_DB
function mockPantryItem(id, ingId, qty, unit, daysLeft, locationOverride) {
  const ref = ING_BY_ID[ingId];
  return { id, ingredientId: ingId, name: ref.name, emoji: ref.emoji, qty, unit, location: locationOverride || ref.category, category: locationOverride || ref.category, days_left: daysLeft };
}

const PANTRY_MOCK = [
  mockPantryItem("m1","ovo",12,"un",10),
  mockPantryItem("m2","leite",1,"L",2),
  mockPantryItem("m3","mussarela",500,"g",5),
  mockPantryItem("m4","tomate",3,"un",3),
  mockPantryItem("m5","cebola",2,"kg",21),
  mockPantryItem("m6","alho",1,"cabeça",30),
  mockPantryItem("m7","peito_de_frango",600,"g",60,"Freezer"),
  mockPantryItem("m8","arroz",2,"kg",180),
  mockPantryItem("m9","feijao",1,"kg",180),
  mockPantryItem("m10","espinafre",200,"g",1),
  mockPantryItem("m11","cogumelo",250,"g",2),
  mockPantryItem("m12","azeite",500,"ml",365),
  mockPantryItem("m13","sal",1,"kg",365,"Spices"),
  mockPantryItem("m14","oleo_de_soja",900,"ml",200),
];

function mockShopItem(id, ingId, qty, category, checked, price) {
  const ref = ING_BY_ID[ingId];
  return { id, ingredientId: ingId, name: ref.name, qty, category, checked, price };
}

const SHOP_MOCK = [
  mockShopItem("s1","arroz_arboreo","500g","Grãos",false,8.90),
  mockShopItem("s2","vinho_branco","1 garrafa","Bebidas",false,22.00),
  mockShopItem("s3","limao","3 un","Frutas",true,3.50),
  mockShopItem("s4","macarrao","500g","Grãos",false,5.90),
  mockShopItem("s5","manjericao","1 maço","Ervas",false,4.00),
];

// ── AFILIADOS (Amazon & Mercado Livre) ──────────────────────────────────────
// 1) Amazon: crie sua conta em associados.amazon.com.br e troque "amazonTag"
//    pela sua tag de afiliado (ex: "meusite0a-20"). O link de busca já
//    funciona sozinho a partir daí.
// 2) Mercado Livre: o ML NÃO permite gerar link de afiliado rastreado por
//    URL simples — cada link precisa ser criado manualmente (ou via API
//    aprovada) no Portal do Afiliado: mercadolivre.com.br/l/afiliados-home
//    → "Criar link" → cole a URL do produto → "Gerar link".
//    Cole aqui os links já gerados para os itens mais comuns da sua lista;
//    para os demais, o botão abre uma busca normal no Mercado Livre (sem
//    comissão) até você gerar o link oficial daquele produto.
const AFFILIATE_CONFIG = {
  amazonTag: "SEUTAG-20",
  mercadoLivreLinks: {
    // arroz: "https://mercadolivre.com/sec/SEU-LINK-GERADO-AQUI",
  },
};
function buildAmazonLink(name) {
  return `https://www.amazon.com.br/s?k=${encodeURIComponent(name)}&tag=${AFFILIATE_CONFIG.amazonTag}`;
}
function buildMercadoLivreLink(item) {
  const custom = item.ingredientId && AFFILIATE_CONFIG.mercadoLivreLinks[item.ingredientId];
  if (custom) return custom;
  return `https://lista.mercadolivre.com.br/${encodeURIComponent(item.name.split(" / ")[0])}`;
}

// Calcula compatibilidade de uma receita com a despensa REAL do usuário
function recipeStats(recipe, pantryIds) {
  const total = recipe.ing.length;
  if (total === 0) return { match: 100, missing: [] };
  const missing = recipe.ing.filter(x => !pantryIds.has(x.id));
  const match = Math.round(((total - missing.length) / total) * 100);
  return { match, missing: missing.map(x => ({ ...ING_BY_ID[x.id], qty: x.qty, unit: x.unit || ING_BY_ID[x.id].unit })) };
}

const MEAL_PLAN = {
  Mon:{ breakfast:"Omelete 🍳", lunch:"Arroz e Feijão 🍚", dinner:null, snack:null },
  Tue:{ breakfast:null, lunch:"Caprese 🥗", dinner:"Frango ao Alho 🍗", snack:null },
  Wed:{ breakfast:null, lunch:null, dinner:"Risoto 🍲", snack:null },
  Thu:{ breakfast:"Omelete 🍳", lunch:"Arroz e Feijão 🍚", dinner:null, snack:null },
  Fri:{ breakfast:null, lunch:null, dinner:"Macarrão 🍝", snack:null },
  Sat:{ breakfast:null, lunch:"Caprese 🥗", dinner:"Frango ao Alho 🍗", snack:null },
  Sun:{ breakfast:null, lunch:"Arroz e Feijão 🍚", dinner:null, snack:null },
};
const DAY_KEYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

// ── HELPERS ───────────────────────────────────────────────────────────────────
function useToast() {
  const [msg, setMsg] = useState(null);
  const show = m => { setMsg(m); setTimeout(() => setMsg(null), 2600); };
  return [msg, show];
}
function dbg(d) { return d <= 1 ? "d-red" : d <= 3 ? "d-amber" : "d-green"; }
function exc(d) { return d <= 1 ? "urgent" : "soon"; }
function matchPill(m) { return m === 100 ? "rm-100" : m >= 95 ? "rm-95" : m >= 85 ? "rm-85" : "rm-70"; }

// ── SCORE RING ────────────────────────────────────────────────────────────────
function Ring({ score }) {
  const r = 72, circ = 2 * Math.PI * r;
  const color = score >= 80 ? "#2ECC71" : score >= 60 ? "#F39C12" : "#E74C3C";
  return (
    <div className="ring-wrap">
      <svg width="168" height="168" className="ring">
        <circle cx="84" cy="84" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="14"/>
        <circle cx="84" cy="84" r={r} fill="none" stroke={color} strokeWidth="14"
          strokeDasharray={circ} strokeDashoffset={circ*(1-score/100)}
          strokeLinecap="round" style={{transition:"stroke-dashoffset 1.2s ease"}}/>
      </svg>
      <div className="ring-center">
        <div className="ring-num" style={{color}}>{score}</div>
        <div className="ring-den">/100</div>
      </div>
    </div>
  );
}

// ── AI CHAT ───────────────────────────────────────────────────────────────────
function AIChat({ lang, pantryItems }) {
  const t = T[lang].ai;
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ role:"assistant", text:t.hi }]);
  const [inp, setInp] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  useEffect(() => { ref.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs]);

  const ctx = pantryItems.length ? pantryItems.map(i => `${i.name} (${i.qty} ${i.unit})`).join(", ") : (lang === "pt" ? "despensa vazia" : "empty pantry");

  async function send() {
    const text = inp.trim(); if (!text || loading) return;
    const next = [...msgs, { role:"user", text }];
    setMsgs(next); setInp(""); setLoading(true);
    try {
      const sys = lang === "pt"
        ? `Você é Chef IA do Smart Pantry Chef. O usuário tem: ${ctx}. Sugira receitas práticas. Use emojis de comida. Máximo 3 receitas.`
        : `You are AI Chef. User has: ${ctx}. Suggest practical recipes. Use food emojis. Max 3 recipes.`;
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ model:"claude-sonnet-4-6", max_tokens:1000, system:sys, messages:next.map(m => ({ role:m.role, content:m.text })) })
      });
      const d = await res.json();
      const reply = d.content?.find(b => b.type==="text")?.text || "...";
      setMsgs(p => [...p, { role:"assistant", text:reply }]);
    } catch { setMsgs(p => [...p, { role:"assistant", text:lang==="pt"?"Erro de conexão.":"Connection error." }]); }
    setLoading(false);
  }

  return (
    <>
      <button className="ai-fab" onClick={() => setOpen(o => !o)}>👨‍🍳</button>
      {open && (
        <div className="ai-panel">
          <div className="ai-ph">
            <span className="ai-ph-t">👨‍🍳 {t.title}</span>
            <button className="ai-ph-x" onClick={() => setOpen(false)}>✕</button>
          </div>
          <div className="ai-msgs">
            {msgs.map((m,i) => (
              <div key={i} className={`ai-m ${m.role==="user"?"u":""}`}>
                {m.role==="assistant" && <div className="ai-av">👨‍🍳</div>}
                <div className="ai-b">{m.text}</div>
                {m.role==="user" && <div className="ai-av">🙋</div>}
              </div>
            ))}
            {loading && <div className="ai-m"><div className="ai-av">👨‍🍳</div><div className="ai-b" style={{color:"var(--text-3)"}}>{t.think}</div></div>}
            <div ref={ref}/>
          </div>
          <div className="ai-in-row">
            <input className="ai-in" value={inp} placeholder={t.ph} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}/>
            <button className="ai-send" onClick={send} disabled={loading}>{t.send}</button>
          </div>
        </div>
      )}
    </>
  );
}

// ── AUTH ──────────────────────────────────────────────────────────────────────
function Auth({ lang, setLang, onLogin }) {
  const t = T[lang].auth;
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!email||!pw) return;
    setLoading(true); setErr(null);
    // Demo login — replace with real Supabase auth
    setTimeout(() => { onLogin({ email, id:"demo-user" }); setLoading(false); }, 900);
  }

  return (
    <div className="auth-wrap">
      <div className="auth-bg"/>
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-gem">🥗</div>
          <div className="auth-brand">Smart Pantry Chef</div>
        </div>
        <div className="auth-title">{t.welcome}</div>
        <div className="auth-sub">{t.sub}</div>
        {err && <div className="auth-err">⚠️ {err}</div>}
        <button className="auth-google" onClick={() => onLogin({ email:"google@user.com", id:"google-user" })}>
          <span style={{fontSize:18}}>🇬</span> {t.google}
        </button>
        <div className="divider"><div className="div-line"/><span className="div-txt">{t.or}</span><div className="div-line"/></div>
        <div className="f-group"><label className="f-label">{t.email}</label><input className="f-input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="seu@email.com"/></div>
        <div className="f-group"><label className="f-label">{t.password}</label><input className="f-input" type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&submit()}/></div>
        <button className="auth-btn" onClick={submit} disabled={loading}>{loading ? <span className="spin"/> : (mode==="signin"?t.signin:t.signup)}</button>
        <div className="auth-tog"><button onClick={()=>setMode(m=>m==="signin"?"signup":"signin")}>{mode==="signin"?t.tog_up:t.tog_in}</button></div>
        <div style={{textAlign:"center",marginTop:16}}>
          <button className="pill-btn" style={{display:"inline-flex",margin:"0 auto"}} onClick={()=>setLang(l=>l==="pt"?"en":"pt")}>🌐 {T[lang].lang}</button>
        </div>
      </div>
    </div>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function Dashboard({ lang, pantry, onNav }) {
  const t = T[lang].dash;
  const expiring = pantry.filter(i => i.days_left <= 3).sort((a,b) => a.days_left - b.days_left);
  const pantryIds = new Set(pantry.map(p => p.ingredientId).filter(Boolean));
  const readyRecipes = RECIPES_DATA.filter(r => recipeStats(r, pantryIds).match === 100).length;
  return (
    <div className="page">
      <div className="page-head">
        <div className="page-eyebrow">Smart Pantry Chef</div>
        <div className="page-title">{t.hi}</div>
        <div className="page-sub">{t.sub}</div>
      </div>
      <div className="stat-row">
        <div className="stat-box"><div className="stat-icon">⚠️</div><div className="stat-lbl">{t.exp}</div><div className="stat-num">{expiring.length}</div><span className="stat-tag tag-red">{t.urgent}</span></div>
        <div className="stat-box"><div className="stat-icon">🍳</div><div className="stat-lbl">{t.rdy}</div><div className="stat-num">{readyRecipes}</div><span className="stat-tag tag-green">100% match</span></div>
        <div className="stat-box"><div className="stat-icon">🗄️</div><div className="stat-lbl">{t.items}</div><div className="stat-num">{pantry.length}</div><span className="stat-tag tag-amber">{lang==="pt"?"itens":"items"}</span></div>
        <div className="stat-box"><div className="stat-icon">🌱</div><div className="stat-lbl">{t.score}</div><div className="stat-num">87</div><span className="stat-tag tag-green">/100</span></div>
      </div>
      {expiring.length > 0 && <>
        <div className="sec-hd"><div className="sec-title">🔥 {t.cook}</div><button className="sec-link" onClick={()=>onNav("pantry")}>{t.all} →</button></div>
        <div className="expiry-stack">
          {expiring.map(item => (
            <div key={item.id} className={`expiry-row ${exc(item.days_left)}`}>
              <div className="exp-ico">{item.emoji}</div>
              <div><div className="exp-name">{item.name}</div><div className={`exp-days ${exc(item.days_left)}`}>{item.days_left<=1?t.tmw:`${t.in} ${item.days_left} ${t.days}`}</div></div>
              <button className="exp-cta" onClick={()=>onNav("recipes")}>{lang==="pt"?"Ver receitas":"Find recipes"} →</button>
            </div>
          ))}
        </div>
      </>}
    </div>
  );
}

// ── PANTRY ─────────────────────────────────────────────────────────────────────
// ── INGREDIENT PICKER ─────────────────────────────────────────────────────────
// Combobox de busca: o usuário digita, vê sugestões do INGREDIENTS_DB e
// CLICA para escolher. Não é possível salvar um nome digitado livremente —
// isso elimina erros de digitação ("pcanha") e garante que toda receita
// que usa o mesmo ingrediente reconheça o item da despensa.
function norm(s) { return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,""); }

function IngredientPicker({ lang, value, onSelect }) {
  const t = T[lang].pantry;
  const [q, setQ] = useState("");
  const results = q.trim().length === 0 ? [] : INGREDIENTS_DB.filter(i => norm(i.name).includes(norm(q))).slice(0, 8);

  if (value) {
    return (
      <div className="ing-chip-row">
        <span className="ing-chip"><span>{value.emoji}</span>{value.name}</span>
        <button type="button" className="pill-btn" onClick={() => onSelect(null)}>{t.change}</button>
      </div>
    );
  }
  return (
    <div className="ing-picker">
      <input className="f-input" value={q} onChange={e => setQ(e.target.value)} placeholder={t.pick_ph} autoFocus/>
      {q.trim().length > 0 && (
        <div className="ing-dd">
          {results.length > 0
            ? results.map(r => (
                <div key={r.id} className="ing-opt" onClick={() => { onSelect(r); setQ(""); }}>
                  <span className="ing-opt-e">{r.emoji}</span><span>{r.name}</span>
                </div>
              ))
            : <div className="ing-empty">{t.pick_empty}</div>
          }
        </div>
      )}
    </div>
  );
}

function Pantry({ lang, items, setItems, user }) {
  const t = T[lang].pantry;
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState(0);
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, showToast] = useToast();
  const [form, setForm] = useState({ ing:null, qty:"1", unit:"un", category:"Fridge", exp:"" });
  const catMap = { 1:"Fridge", 2:"Freezer", 3:"Pantry", 4:"Spices" };

  const filtered = items.filter(i => {
    const ms = i.name.toLowerCase().includes(search.toLowerCase());
    const mc = cat===0 || i.location===catMap[cat];
    return ms && mc;
  });

  function selectIngredient(ing) {
    if (!ing) { setForm(f => ({ ...f, ing:null })); return; }
    setForm(f => ({ ...f, ing, unit: ing.unit, category: ing.category }));
  }

  function addItem() {
    if (!form.ing) return;
    setSaving(true);
    const ni = { id:`local-${Date.now()}`, user_id:user?.id, ingredientId:form.ing.id, name:form.ing.name, emoji:form.ing.emoji, qty:Number(form.qty)||1, unit:form.unit, location:form.category, category:form.category, days_left:form.exp?Math.max(0,Math.ceil((new Date(form.exp)-new Date())/86400000)):14 };
    setItems(p => [ni,...p]);
    showToast(`✅ ${form.ing.name} ${lang==="pt"?"adicionado!":"added!"}`);
    setShowAdd(false); setSaving(false);
    setForm({ ing:null, qty:"1", unit:"un", category:"Fridge", exp:"" });
  }

  function del(id) {
    setItems(p=>p.filter(i=>i.id!==id));
    showToast(lang==="pt"?"🗑️ Removido":"🗑️ Removed");
  }

  return (
    <div className="page">
      <div className="page-head"><div className="page-eyebrow">{lang==="pt"?"Inventário":"Inventory"}</div><div className="page-title">{t.title}</div><div className="page-sub">{t.sub}</div></div>
      <div className="toolbar">
        <input className="search-bar" style={{flex:1,minWidth:180}} placeholder={t.search} value={search} onChange={e=>setSearch(e.target.value)}/>
        <button className="btn btn-ghost btn-sm" onClick={()=>showToast(lang==="pt"?"📷 Em breve!":"📷 Coming soon!")}>{t.receipt}</button>
        <button className="btn btn-ghost btn-sm" onClick={()=>showToast(lang==="pt"?"🎙️ Em breve!":"🎙️ Coming soon!")}>{t.voice}</button>
        <button className="btn btn-green" onClick={()=>{setForm({ ing:null, qty:"1", unit:"un", category:"Fridge", exp:"" });setShowAdd(true);}}>+ {t.add}</button>
      </div>
      <div className="chips">{t.cats.map((c,i)=><button key={i} className={`chip ${cat===i?"on":""}`} onClick={()=>setCat(i)}>{c}</button>)}</div>
      {filtered.length===0
        ? <div className="empty-st"><div className="empty-ico">🗄️</div><div className="empty-txt">{t.empty}</div></div>
        : <div className="pantry-grid">{filtered.map(item=>(
            <div key={item.id} className="p-card">
              <button className="del-x" onClick={()=>del(item.id)}>✕</button>
              <div className="p-card-top">
                <div className="p-ico">{item.emoji}</div>
                <span className={`d-badge ${dbg(item.days_left)}`}>{item.days_left<=1?(lang==="pt"?"Amanhã!":"Tomorrow!"):`${item.days_left}d`}</span>
              </div>
              <div className="p-name">{item.name}</div>
              <div className="p-meta">{t.qty}: <span>{item.qty} {item.unit}</span>&nbsp;&nbsp;{t.loc}: <span>{item.location}</span></div>
            </div>
          ))}</div>
      }

      {showAdd && (
        <div className="overlay" onClick={e=>e.target===e.currentTarget&&setShowAdd(false)}>
          <div className="modal">
            <div className="m-head" style={{position:"relative"}}>
              <div className="m-title">{t.modal_t}</div>
              <button className="m-close" onClick={()=>setShowAdd(false)}>✕</button>
            </div>
            <div className="m-body">
              <div className="f-group"><label className="f-label">{t.name}</label><IngredientPicker lang={lang} value={form.ing} onSelect={selectIngredient}/></div>
              <div className="f-row">
                <div className="f-group"><label className="f-label">{t.quantity}</label><input className="f-input" type="number" value={form.qty} onChange={e=>setForm(f=>({...f,qty:e.target.value}))}/></div>
                <div className="f-group"><label className="f-label">{t.unit}</label><select className="f-input" value={form.unit} onChange={e=>setForm(f=>({...f,unit:e.target.value}))}><option>un</option><option>g</option><option>kg</option><option>ml</option><option>L</option><option>maço</option><option>cabeça</option></select></div>
              </div>
              <div className="f-group"><label className="f-label">{t.cat}</label><select className="f-input" value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}><option>Fridge</option><option>Freezer</option><option>Pantry</option><option>Spices</option></select></div>
              <div className="f-group"><label className="f-label">{t.exp}</label><input className="f-input" type="date" value={form.exp} onChange={e=>setForm(f=>({...f,exp:e.target.value}))}/></div>
            </div>
            <div className="m-foot">
              <button className="btn btn-ghost" onClick={()=>setShowAdd(false)}>{t.cancel}</button>
              <button className="btn btn-green" onClick={addItem} disabled={saving || !form.ing}>{saving?<span className="spin"/>:t.save}</button>
            </div>
          </div>
        </div>
      )}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

// ── RECIPES ───────────────────────────────────────────────────────────────────
function Recipes({ lang, pantry, onAddMissing }) {
  const t = T[lang].recipes;
  const [tab, setTab] = useState("all");
  const [sel, setSel] = useState(null);
  const [toast, showToast] = useToast();

  const pantryIds = new Set(pantry.map(p => p.ingredientId).filter(Boolean));
  const withStats = RECIPES_DATA.map(r => ({ ...r, ...recipeStats(r, pantryIds) }));

  const tabs = [
    {key:"all", label:t.all, n:withStats.length},
    {key:"100", label:t.cook_now, n:withStats.filter(r=>r.match===100).length},
    {key:"95",  label:t.almost,   n:withStats.filter(r=>r.match>=85&&r.match<100).length},
    {key:"70",  label:t.need,     n:withStats.filter(r=>r.match<85).length},
  ];
  const list = withStats.filter(r=>tab==="all"?true:tab==="100"?r.match===100:tab==="95"?r.match>=85&&r.match<100:r.match<85);

  function addMissing(recipe) {
    if (recipe.missing.length === 0) return;
    onAddMissing(recipe.missing);
    showToast(lang==="pt" ? `🛒 ${recipe.missing.length} item(ns) adicionados à lista!` : `🛒 ${recipe.missing.length} item(s) added to your list!`);
  }

  return (
    <div className="page">
      <div className="page-head"><div className="page-eyebrow">{lang==="pt"?"Com base na sua despensa":"Based on your pantry"}</div><div className="page-title">{t.title}</div><div className="page-sub">{t.sub} · {RECIPES_DATA.length} {lang==="pt"?"receitas":"recipes"}</div></div>
      <div className="r-tabs">{tabs.map(tb=><button key={tb.key} className={`r-tab ${tab===tb.key?"on":""}`} onClick={()=>setTab(tb.key)}>{tb.label}<span className="r-cnt">{tb.n}</span></button>)}</div>
      <div className="recipes-grid">
        {list.map(r=>(
          <div key={r.id} className="r-card" onClick={()=>setSel(r)}>
            <div className="r-photo" style={r.img?{backgroundImage:`url(${r.img})`}:undefined}>
              {!r.img && <div className="r-photo-emoji">{r.emoji}</div>}
              <div className="r-photo-overlay"/>
              <span className={`r-match-pill ${matchPill(r.match)}`} style={{position:"absolute",top:12,right:12}}>{r.match}% {t.match}</span>
            </div>
            <div className="r-body">
              <div className="r-title">{r.title}</div>
              <div className="r-desc">{r.desc}</div>
              <div className="r-meta"><span>⏱ {r.time} {t.min}</span><span>👤 {r.serv} {t.serv}</span><span>⭐ {t.diff[r.diff]}</span></div>
              {r.missing.length>0 && <div className="r-missing"><div className="r-miss-t">{t.miss_lbl} {r.missing.length}:</div><div className="r-miss-i">{r.missing.map(m=>m.name.split(" / ")[0]).join(", ")}</div></div>}
              <div className="r-acts">
                <button className="btn btn-green btn-sm" onClick={e=>{e.stopPropagation();setSel(r);}}>{t.cook}</button>
                <button className="btn btn-ghost btn-sm" onClick={e=>{e.stopPropagation();showToast(`❤️ ${r.title} ${lang==="pt"?"salva!":"saved!"}`);}}>{t.save}</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sel && (
        <div className="overlay" onClick={e=>e.target===e.currentTarget&&setSel(null)}>
          <div className="modal">
            <div className="m-banner" style={sel.img?{backgroundImage:`url(${sel.img})`,backgroundSize:"cover",backgroundPosition:"center"}:undefined}>
              {!sel.img && sel.emoji}
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(10,26,16,0) 40%,rgba(15,35,24,0.95))",borderRadius:"28px 28px 0 0"}}/>
              <button className="m-close" onClick={()=>setSel(null)}>✕</button>
            </div>
            <div className="m-head">
              <div className="m-title">{sel.title}</div>
              <div className="m-sub">{sel.cuisine} · {sel.time} {t.min} · {t.diff[sel.diff]}</div>
            </div>
            <div className="m-body">
              <div className="m-sec"><div className="m-sec-t">{t.nutr}</div><div className="nutri"><div className="n-box"><div className="n-val">{sel.cal}</div><div className="n-lbl">kcal</div></div><div className="n-box"><div className="n-val">{sel.prot}g</div><div className="n-lbl">{lang==="pt"?"Proteína":"Protein"}</div></div><div className="n-box"><div className="n-val">{sel.serv}</div><div className="n-lbl">{t.serv}</div></div></div></div>
              <div className="m-sec"><div className="m-sec-t">{lang==="pt"?"Ingredientes":"Ingredients"}</div><div className="ing-list">{sel.ing.map(x=>{
                const ref = ING_BY_ID[x.id]; const has = pantryIds.has(x.id);
                return <div key={x.id} className={`ing-row ${has?"have":"miss"}`}><span>{has?"✅":"⬜"}</span><span>{ref.emoji} {ref.name.split(" / ")[0]}</span></div>;
              })}</div></div>
              <div className="m-sec"><div className="m-sec-t">{t.prep}</div><div className="steps">{sel.steps.map((s,i)=><div key={i} className="step"><div className="step-n">{i+1}</div><div className="step-t">{s}</div></div>)}</div></div>
              <div className="m-sec"><div className="m-sec-t">{t.vid}</div><a className="vid-card" href={`https://www.youtube.com/results?search_query=${encodeURIComponent(sel.title.split(" / ")[0]+" receita")}`} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}><div className="vid-thumb">▶️</div><div><div className="vid-t">{sel.title}</div><div style={{marginTop:5,fontSize:12,color:"var(--green)",fontWeight:700}}>{t.watch}</div></div></a></div>
            </div>
            <div className="m-foot">
              <button className="btn btn-ghost" onClick={()=>setSel(null)}>{t.close}</button>
              <button className="btn btn-amber" onClick={()=>{addMissing(sel);setSel(null);}} disabled={sel.missing.length===0}>{t.add_shop}{sel.missing.length>0?` (${sel.missing.length})`:""}</button>
              <button className="btn btn-green">{t.cook} 👨‍🍳</button>
            </div>
          </div>
        </div>
      )}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

// ── SHOPPING ──────────────────────────────────────────────────────────────────
function Shopping({ lang, items, setItems }) {
  const t = T[lang].shopping;
  const [newItem, setNewItem] = useState("");
  const [toast, showToast] = useToast();

  function toggle(id) { setItems(p=>p.map(i=>i.id===id?{...i,checked:!i.checked}:i)); }
  function clearChecked() { setItems(p=>p.filter(i=>!i.checked)); showToast(lang==="pt"?"✅ Removidos!":"✅ Removed!"); }
  function add() {
    if (!newItem.trim()) return;
    setItems(p=>[{ id:`s${Date.now()}`, name:newItem, qty:"1 un", category:lang==="pt"?"Geral":"General", checked:false, price:0 },...p]);
    setNewItem("");
  }

  const total = items.filter(i=>!i.checked).reduce((s,i)=>s+(i.price||0),0).toFixed(2);

  return (
    <div className="page">
      <div className="page-head"><div className="page-eyebrow">{lang==="pt"?"Lista":"List"}</div><div className="page-title">{t.title}</div><div className="page-sub">{t.sub} — {items.filter(i=>!i.checked).length} {t.items}</div></div>
      <div className="toolbar">
        <input className="search-bar" style={{flex:1}} placeholder={t.add_ph} value={newItem} onChange={e=>setNewItem(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()}/>
        <button className="btn btn-green" onClick={add}>+ {t.add}</button>
        <button className="btn btn-ghost" onClick={clearChecked}>🗑 {t.clear}</button>
      </div>
      {items.length===0
        ? <div className="empty-st"><div className="empty-ico">🛒</div><div className="empty-txt">{t.empty}</div></div>
        : <div className="s-items">{items.map(item=>(
            <div key={item.id} className={`s-row ${item.checked?"done":""}`}>
              <div className={`chk ${item.checked?"on":""}`} onClick={()=>toggle(item.id)}>{item.checked&&<span style={{color:"var(--ink)",fontSize:12}}>✓</span>}</div>
              <div className="s-info"><div className="s-name" style={{textDecoration:item.checked?"line-through":"none"}}>{item.name}</div><div className="s-qty">{item.qty}</div></div>
              <div className="s-cat">{item.category}</div>
              {item.price>0 && <div className="s-price">R$ {item.price.toFixed(2)}</div>}
              {!item.checked && <div className="s-buy">
                <a className="buy-btn amazon" href={buildAmazonLink(item.name)} target="_blank" rel="noopener noreferrer sponsored" onClick={e=>e.stopPropagation()}>🛒 Amazon</a>
                <a className="buy-btn ml" href={buildMercadoLivreLink(item)} target="_blank" rel="noopener noreferrer sponsored" onClick={e=>e.stopPropagation()}>🛒 Mercado Livre</a>
              </div>}
            </div>
          ))}</div>
      }
      {items.length>0 && <div className="s-total"><div className="s-total-l">💰 {t.total}</div><div className="s-total-v">R$ {total}</div></div>}
      {items.length>0 && <div className="s-disclosure">ℹ️ {t.affiliate_note}</div>}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

// ── MEAL PLANNER ──────────────────────────────────────────────────────────────
function Planner({ lang }) {
  const t = T[lang].planner;
  const [toast, showToast] = useToast();
  const meals = Object.entries(t.meals);
  return (
    <div className="page">
      <div className="page-head"><div className="page-eyebrow">{lang==="pt"?"Planejamento":"Planning"}</div><div className="page-title">{t.title}</div><div className="page-sub">{t.sub}</div></div>
      <div className="week-g">
        {DAY_KEYS.map((dk,di)=>(
          <div key={dk} className="day-col">
            <div className={`day-hd ${di===0?"today":""}`}>{t.days[di]}</div>
            {meals.map(([mk,ml])=>{
              const planned = MEAL_PLAN[dk]?.[mk];
              return (
                <div key={mk}>
                  <div className="meal-t">{ml}</div>
                  {planned
                    ? <div className="meal-slot">{planned}</div>
                    : <div className="meal-slot empty" onClick={()=>showToast(`➕ ${ml}`)}>+</div>
                  }
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

// ── WASTE ─────────────────────────────────────────────────────────────────────
function Waste({ lang }) {
  const t = T[lang].waste;
  const score = 87;
  return (
    <div className="page">
      <div className="page-head"><div className="page-eyebrow">{lang==="pt"?"Sustentabilidade":"Sustainability"}</div><div className="page-title">{t.title}</div><div className="page-sub">{t.sub}</div></div>
      <div style={{background:"var(--ink-2)",border:"1px solid var(--border)",borderRadius:"var(--r3)",marginBottom:20}}>
        <div className="score-hero"><Ring score={score}/><div style={{fontSize:14,color:"var(--text-3)",marginTop:4}}>{t.score_lbl}</div><div className="score-msg">{t.great}</div></div>
      </div>
      <div className="sec-hd" style={{marginBottom:12}}><div className="sec-title">📊 {t.month}</div></div>
      <div className="impact-g">
        {[{e:"💰",v:"R$ 87,50",l:t.saved},{e:"🦸",v:"14",l:t.rescued},{e:"👨‍🍳",v:"23",l:t.cooked},{e:"🌱",v:"2.3 kg",l:t.reduced}].map((item,i)=>(
          <div key={i} className="imp-card"><div className="imp-ico">{item.e}</div><div className="imp-val">{item.v}</div><div className="imp-lbl">{item.l}</div></div>
        ))}
      </div>
      <div className="bar-hist">
        <div className="bar-hist-t">📈 {t.hist}</div>
        {["Jan","Fev","Mar","Abr","Mai","Jun"].map((m,i)=>{
          const v=[62,68,74,79,83,87][i];
          return (
            <div key={m} className="bar-row">
              <div className="bar-lbl">{m}</div>
              <div className="bar-track"><div className="bar-fill" style={{width:`${v}%`,background:`hsl(${90+v},65%,45%)`}}/></div>
              <div className="bar-val">{v}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── APP SHELL ─────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("pt");
  const [page, setPage] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [pantry, setPantry] = useState(PANTRY_MOCK);
  const [shopping, setShopping] = useState(SHOP_MOCK);

  function addMissingToShopping(missingIngredients) {
    setShopping(prev => {
      const existingIds = new Set(prev.map(i => i.ingredientId).filter(Boolean));
      const additions = missingIngredients
        .filter(m => !existingIds.has(m.id))
        .map(m => ({ id:`s-${m.id}-${Date.now()}`, ingredientId:m.id, name:m.name, qty:`${m.qty||1} ${m.unit||""}`.trim(), category: lang==="pt"?"Receita":"Recipe", checked:false, price:0 }));
      return [...additions, ...prev];
    });
  }

  const t = T[lang];
  const nav = [
    {key:"dashboard", icon:"🏠", label:t.nav.dashboard},
    {key:"pantry",    icon:"🗄️", label:t.nav.pantry},
    {key:"recipes",   icon:"🍳", label:t.nav.recipes},
    {key:"shopping",  icon:"🛒", label:t.nav.shopping},
    {key:"planner",   icon:"📅", label:t.nav.planner},
    {key:"waste",     icon:"🌱", label:t.nav.waste},
  ];

  if (!user) return <Auth lang={lang} setLang={setLang} onLogin={setUser}/>;

  const pages = {
    dashboard: <Dashboard lang={lang} pantry={pantry} onNav={setPage}/>,
    pantry:    <Pantry    lang={lang} items={pantry} setItems={setPantry} user={user}/>,
    recipes:   <Recipes   lang={lang} pantry={pantry} onAddMissing={addMissingToShopping}/>,
    shopping:  <Shopping  lang={lang} items={shopping} setItems={setShopping}/>,
    planner:   <Planner   lang={lang}/>,
    waste:     <Waste     lang={lang}/>,
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="shell">
        <aside className="sidebar">
          <div className="sidebar-brand">
            <div className="brand-row">
              <div className="brand-gem">🥗</div>
              <div><div className="brand-name">Smart Pantry</div><div className="brand-tag">Chef · Premium</div></div>
            </div>
          </div>
          <nav className="nav">
            {nav.map(item=>(
              <button key={item.key} className={`nav-item ${page===item.key?"active":""}`} onClick={()=>setPage(item.key)}>
                <span className="nav-icon">{item.icon}</span>{item.label}
              </button>
            ))}
          </nav>
          <div className="sidebar-foot">
            <div className="user-chip">
              <div className="user-avatar">👤</div>
              <div className="user-email">{user.email}</div>
            </div>
            <button className="pill-btn" onClick={()=>setLang(l=>l==="pt"?"en":"pt")}>🌐 {t.lang}</button>
            <button className="pill-btn danger" onClick={()=>setUser(null)}>🚪 {t.out}</button>
          </div>
        </aside>
        <main className="main">{pages[page]}</main>
      </div>
      <AIChat lang={lang} pantryItems={pantry}/>
    </>
  );
}
