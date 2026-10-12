/*
 * Halloween Theme for Lampa — Premium Edition
 * Version: 1.3.0 | 2026-10-12
 * A lightweight, ES5-compatible visual theme for Lampa on TVs.
 * No external scripts, fonts, images, tracking or network requests.
 * License: MIT
 */
(function () {
  'use strict';

  var PREFIX = 'hpl_';
  var READY_FLAG = 'plugin_halloween_theme_premium_ready';
  var STYLE_ID = 'hpl-premium-styles';
  var DECOR_ID = 'hpl-premium-decor';
  var TOP_ID = 'hpl-premium-header-scene';
  var ATM_ID = 'hpl-mystic-atmosphere';
  var LOGO_CLASS = 'hpl-pumpkin-logo';
  var ROOT_CLASS = 'hpl-premium-on';
  var settingsRegistered = false;

  function get(name, fallback) {
    try {
      if (window.Lampa && Lampa.Storage && Lampa.Storage.get) {
        return Lampa.Storage.get(PREFIX + name, fallback);
      }
    } catch (ignore) {}
    return fallback;
  }

  function enabled(name, fallback) {
    var value = get(name, fallback);
    return value === true || value === 'true' || value === 1 || value === '1';
  }

  // Inline SVG: sharp on 4K TVs, zero external dependencies.
  // High-contrast jack-o-lantern with angry eyes and a jagged grin.
  // Kept inline so Samsung TVs need no image fetches or additional assets.
  var pumpkinSvg = '' +
    '<svg class="hpl-pumpkin-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" aria-hidden="true">' +
    '<defs>' +
    '<radialGradient id="hpl-jack-body" cx=".3" cy=".25" r=".88"><stop offset="0" stop-color="#ffbd4b"/><stop offset=".35" stop-color="#ff8b1e"/><stop offset=".74" stop-color="#ed570c"/><stop offset="1" stop-color="#82250e"/></radialGradient>' +
    '<linearGradient id="hpl-jack-fire" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff9bb"/><stop offset=".62" stop-color="#ffda48"/><stop offset="1" stop-color="#ff7000"/></linearGradient>' +
    '</defs>' +
    '<path d="M45 23Q43 12 53 6Q52 16 59 17Q56 24 51 26" fill="#4b8135" stroke="#2f4a25" stroke-width="2"/>' +
    '<path d="M48 25C27 11 11 23 9 47C7 72 24 88 48 86C72 88 89 72 87 47C85 22 68 11 48 25Z" fill="url(#hpl-jack-body)" stroke="#8b2b13" stroke-width="3"/>' +
    '<path d="M35 25C22 37 22 71 38 84M60 25C73 38 73 71 57 84" fill="none" stroke="#a7390f" stroke-width="2.6" opacity=".54"/>' +
    '<path d="M20 41L43 38L34 52L25 51Z M76 41L53 38L62 52L71 51Z" fill="#240e16" stroke="#ffaf3f" stroke-width="1.3"/>' +
    '<path d="M26 43L38 42L32 47ZM70 43L58 42L64 47Z" fill="url(#hpl-jack-fire)"/>' +
    '<path d="M48 48L42 59L54 59Z" fill="#2b1117"/>' +
    '<path d="M19 59L29 64L35 60L42 67L48 62L55 67L63 60L69 64L77 58Q75 74 57 78L52 70L47 78L41 70L36 78Q23 75 19 59Z" fill="#210b15" stroke="#9d421c" stroke-width="1.3"/>' +
    '<path d="M28 64L35 67L31 72Z M63 67L69 64L66 72Z M42 68L48 73L54 68L50 76L46 76Z" fill="url(#hpl-jack-fire)" opacity=".94"/>' +
    '<path d="M13 47Q12 31 25 26" fill="none" stroke="#ffcf78" stroke-width="2.3" opacity=".4" stroke-linecap="round"/>' +
    '</svg>';


  // Four fully self-contained pumpkin artworks. No emoji fonts or remote images.
  var pumpkinClassicSvg = '' +
    '<svg class="hpl-pumpkin-svg" viewBox="0 0 96 96" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">' +
    '<defs><radialGradient id="hpl-classic-body"><stop offset="0" stop-color="#ffc55d"/><stop offset=".58" stop-color="#fb7b16"/><stop offset="1" stop-color="#9e2e07"/></radialGradient></defs>' +
    '<path d="M44 24Q42 12 53 9L57 14Q50 16 51 24" fill="#477432"/>' +
    '<path d="M48 25Q25 11 13 31Q1 53 19 74Q31 89 48 84Q66 89 78 74Q96 52 83 31Q71 11 48 25Z" fill="url(#hpl-classic-body)" stroke="#a73b0c" stroke-width="2.5"/>' +
    '<path d="M34 23Q22 46 34 84M63 23Q75 46 61 84" fill="none" stroke="#b94310" stroke-width="3" opacity=".5"/>' +
    '<path d="M20 48L37 34L37 53Z M76 48L59 34L59 53Z M48 49L42 60L54 60Z" fill="#291018"/>' +
    '<path d="M24 65L32 61L38 68L48 61L58 68L64 61L73 65Q62 82 48 78Q34 82 24 65Z" fill="#271019"/>' +
    '<path d="M33 63L39 67L36 71ZM57 67L63 63L60 71Z" fill="#ffd15f"/>' +
    '</svg>';

  var pumpkinBurningSvg = '' +
    '<svg class="hpl-pumpkin-svg" viewBox="0 0 96 96" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">' +
    '<defs><linearGradient id="hpl-burn-body" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ffdf63"/><stop offset=".5" stop-color="#f46a0b"/><stop offset="1" stop-color="#802016"/></linearGradient><linearGradient id="hpl-burn-flame" x1="0" y1="1" x2="0" y2="0"><stop stop-color="#ff6b00"/><stop offset=".6" stop-color="#ffcd43"/><stop offset="1" stop-color="#fff8b2"/></linearGradient></defs>' +
    '<path d="M18 42Q8 28 24 9Q21 30 39 23Q42 13 51 4Q54 23 66 23Q68 12 76 9Q92 26 78 44" fill="url(#hpl-burn-flame)" stroke="#e66518" stroke-width="1.6"/>' +
    '<path d="M48 24C23 8 7 31 10 57Q15 84 47 85Q81 86 86 56C90 31 72 9 48 24Z" fill="url(#hpl-burn-body)" stroke="#8d2714" stroke-width="2.7"/>' +
    '<path d="M37 24Q28 49 36 81M61 24Q69 49 59 81" fill="none" stroke="#a53f10" stroke-width="2.7" opacity=".6"/>' +
    '<path d="M17 44L42 41L33 57L22 56Z M79 44L54 41L63 57L74 56Z M48 50L41 61H55Z" fill="#1a0a11"/>' +
    '<path d="M26 46L37 45L31 51Z M70 46L59 45L65 51Z" fill="#ffe56c"/>' +
    '<path d="M20 65L30 69L35 63L43 71L48 65L56 71L63 63L68 69L76 64Q70 82 57 81L52 74L48 82L44 74L39 81Q25 81 20 65Z" fill="#1d0b13"/>' +
    '<path d="M30 69L35 67L34 76Z M61 67L66 69L62 76Z" fill="#ffcf37"/>' +
    '</svg>';

  var pumpkinHauntedSvg = '' +
    '<svg class="hpl-pumpkin-svg" viewBox="0 0 96 96" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">' +
    '<defs><radialGradient id="hpl-haunt-body" cx=".4" cy=".3"><stop stop-color="#c269e3"/><stop offset=".5" stop-color="#783788"/><stop offset="1" stop-color="#270e35"/></radialGradient></defs>' +
    '<path d="M46 24Q42 11 52 7Q50 19 56 23" stroke="#315b31" stroke-width="6" stroke-linecap="round" fill="none"/>' +
    '<path d="M48 25Q24 13 13 32Q3 53 17 72Q29 87 48 84Q68 87 80 72Q92 51 81 32Q69 13 48 25Z" fill="url(#hpl-haunt-body)" stroke="#bc6aef" stroke-width="2"/>' +
    '<path d="M35 25Q24 48 36 83M61 25Q72 48 60 83" fill="none" stroke="#4b1859" stroke-width="3" opacity=".8"/>' +
    '<path d="M20 42L43 45L33 57L25 54Z M76 42L53 45L63 57L71 54Z M48 52L42 62L54 62Z" fill="#140a1f"/>' +
    '<path d="M26 46L37 47L31 52Z M70 46L59 47L65 52Z" fill="#ffac35"/>' +
    '<path d="M19 64L30 69L36 63L43 71L48 66L55 71L62 63L69 69L77 64Q69 84 55 79L49 74L43 80Q25 84 19 64Z" fill="#170a21" stroke="#ad69cb" stroke-width=".8"/>' +
    '<path d="M35 69L43 72L37 76Z M55 72L62 69L58 76Z" fill="#ffb647"/>' +
    '</svg>';

  function selectedPumpkin() {
    var variant = get('pumpkin_style', 'evil');
    if (variant === 'classic') return pumpkinClassicSvg;
    if (variant === 'burning') return pumpkinBurningSvg;
    if (variant === 'haunted') return pumpkinHauntedSvg;
    return pumpkinSvg; // Evil, the previous version's look, is the default.
  }

  // Top-center moon, bats and mist: static SVG with optional low-cost movement.
  var headerSceneSvg = '' +
    '<svg class="hpl-header-scene-svg" viewBox="0 0 570 120" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">' +
    '<defs><linearGradient id="hpl-night-mist" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#a45af6" stop-opacity="0"/><stop offset=".45" stop-color="#ab70e2" stop-opacity=".25"/><stop offset=".7" stop-color="#ff8f34" stop-opacity=".19"/><stop offset="1" stop-color="#ffa35c" stop-opacity="0"/></linearGradient></defs>' +
    '<g class="hpl-header-stars" fill="#ffd9a5" opacity=".85"><path d="M110 30v12m-6-6h12M424 18v9m-4.5-4.5h9M475 54v8m-4-4h8" stroke="#ffdba0" stroke-width="1.6"/><circle cx="167" cy="17" r="2"/><circle cx="392" cy="66" r="1.6"/></g>' +
    '<g class="hpl-header-moon"><circle cx="285" cy="37" r="30" fill="#be7ef8" opacity=".1"/><circle cx="285" cy="37" r="22" fill="#e5b4ff" opacity=".84"/><circle cx="296" cy="29" r="21" fill="#171022"/></g>' +
    '<g class="hpl-header-bats" fill="#141020" stroke="#9d5bd1" stroke-width=".8" opacity=".92">' +
    '<path d="M209 40Q193 25 183 40Q177 34 161 39Q177 41 183 52Q188 45 196 48L209 40L223 49Q230 45 236 52Q243 40 255 39Q240 34 232 40Q220 26 209 40Z"/>' +
    '<path d="M368 30Q355 20 348 34Q338 29 325 34Q341 36 347 45Q352 37 359 42L368 34L376 42Q383 37 390 45Q397 36 411 34Q400 29 390 34Q381 20 368 30Z"/>' +
    '<path d="M130 59Q117 53 111 63L96 61Q108 67 111 73L126 68L141 74Q146 66 157 61L140 63Q138 54 130 59Z"/>' +
    '</g>' +
    '<g class="hpl-header-mist" fill="none" stroke="url(#hpl-night-mist)" stroke-linecap="round"><path d="M48 90Q154 63 275 87T526 91" stroke-width="11"/><path d="M2 108Q143 86 266 105T564 100" stroke-width="15"/><path d="M115 116Q271 99 430 113" stroke-width="8"/></g>' +
    '</svg>';

  var spiderSvg = '' +
    '<svg class="hpl-spider-svg" viewBox="0 0 80 178" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M40 0V117" stroke="#d7b7ef" stroke-width="1.3" opacity=".58"/>' +
    '<g class="hpl-spider-creature" stroke="#211126" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">' +
    '<path d="M31 132L19 123 7 126M30 138L15 138 5 146M31 144L17 152 9 164M33 148L25 162 23 174" fill="none"/>' +
    '<path d="M49 132L61 123 73 126M50 138L65 138 75 146M49 144L63 152 71 164M47 148L55 162 57 174" fill="none"/>' +
    '<ellipse cx="40" cy="146" rx="16" ry="22" fill="#271435" stroke="#130a19" stroke-width="2"/>' +
    '<circle cx="40" cy="132" r="12.5" fill="#321541" stroke="#130a19" stroke-width="2"/>' +
    '<path d="M35 147q5-10 10 0M34 151h12" stroke="#b66df3" stroke-width="1.5" opacity=".67" fill="none"/>' +
    '<circle cx="35.5" cy="132" r="2.8" fill="#ffad4b" stroke="none"/>' +
    '<circle cx="44.5" cy="132" r="2.8" fill="#ffad4b" stroke="none"/>' +
    '<circle cx="36.2" cy="131.6" r=".9" fill="#fff7df" stroke="none"/>' +
    '<circle cx="45.2" cy="131.6" r=".9" fill="#fff7df" stroke="none"/>' +
    '</g></svg>';

  var webSvg = '' +
    '<svg class="hpl-corner-web" viewBox="0 0 270 270" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">' +
    '<g fill="none" stroke="#cf9cf5" stroke-width="1.3" opacity=".48">' +
    '<path d="M270 0H28M270 0L75 62M270 0L100 142M270 0L148 225M270 0V245"/>' +
    '<path d="M215 0Q219 17 228 14Q240 9 253 43M166 0Q169 36 196 51Q215 59 235 79M112 0Q116 49 164 83Q193 107 205 129M68 0Q79 70 127 124Q160 165 174 184"/>' +
    '</g></svg>';

  // Theme only targets Lampa UI, never player surfaces or embedded video.
  var css = '\n' +
    'html.hpl-premium-on{--hpl-bg:#0a0811;--hpl-surface:#1b1128;--hpl-surface2:#251632;--hpl-purple:#b66dff;--hpl-orange:#ff942e;--hpl-border:rgba(192,119,255,.35);--hpl-glow:rgba(173,88,255,.31)}\n' +
    'html.hpl-premium-on[data-hpl-palette="ember"]{--hpl-bg:#100a0e;--hpl-surface:#26131f;--hpl-surface2:#311a27;--hpl-purple:#9e6dff;--hpl-orange:#ffac43;--hpl-border:rgba(255,148,46,.35);--hpl-glow:rgba(255,139,41,.27)}\n' +
    'html.hpl-premium-on body{background-color:var(--hpl-bg)!important;background-image:radial-gradient(ellipse at 92% 8%,rgba(132,62,185,.17),transparent 39%),radial-gradient(ellipse at 3% 88%,rgba(255,126,27,.10),transparent 39%)!important;color:#f8f4fd}\n' +
    'html.hpl-premium-on .head{background-color:rgba(15,9,24,.62)!important;border-bottom:1px solid rgba(203,142,255,.12)}\n' +
    'html.hpl-premium-on .menu{background:linear-gradient(155deg,#261437 0%,#1c1229 52%,#120e1e 100%)!important;border-right:1px solid rgba(191,117,255,.27)!important;box-shadow:1.2em 0 2.4em rgba(7,4,15,.3)!important;color:#f6f0ff!important}\n' +

    'html.hpl-premium-on .menu__list{background:transparent!important}\n' +
    'html.hpl-premium-on .menu__item{color:#f7ecff!important}\n' +
    'html.hpl-premium-on .menu__item.focus,html.hpl-premium-on .menu__item.active,html.hpl-premium-on .menu__item.traverse{color:#fff9ed!important;background:linear-gradient(90deg,rgba(147,64,218,.46),rgba(210,77,176,.22),rgba(255,136,39,.19))!important;box-shadow:inset .2em 0 #ff9229,0 0 1em rgba(121,38,187,.13)!important}\n' +
    'html.hpl-premium-on .menu__item.focus .menu__text,html.hpl-premium-on .menu__item.active .menu__text,html.hpl-premium-on .menu__item.traverse .menu__text{color:#fff7ec!important}\n' +
    'html.hpl-premium-on .menu__item.focus .menu__ico img,html.hpl-premium-on .menu__item.active .menu__ico img,html.hpl-premium-on .menu__item.traverse .menu__ico img{filter:none!important}\n' +
    'html.hpl-premium-on .menu__item.focus .menu__ico [stroke],html.hpl-premium-on .menu__item.active .menu__ico [stroke],html.hpl-premium-on .menu__item.traverse .menu__ico [stroke]{stroke:#fff4ec!important}\n' +
    'html.hpl-premium-on .menu__item.focus .menu__ico path[fill],html.hpl-premium-on .menu__item.focus .menu__ico rect[fill],html.hpl-premium-on .menu__item.focus .menu__ico circle[fill],html.hpl-premium-on .menu__item.active .menu__ico path[fill],html.hpl-premium-on .menu__item.active .menu__ico rect[fill],html.hpl-premium-on .menu__item.active .menu__ico circle[fill],html.hpl-premium-on .menu__item.traverse .menu__ico path[fill]{fill:#fff4ec!important}\n' +
    'html.hpl-premium-on .settings__content{background:linear-gradient(155deg,#261437 0%,#1c1229 52%,#120e1e 100%)!important;border-left:1px solid rgba(191,117,255,.27)!important;box-shadow:-1.5em 0 3.5em rgba(7,4,15,.47)!important;color:#f6f0ff!important}\n' +
    'html.hpl-premium-on .settings__body,html.hpl-premium-on .settings__head,html.hpl-premium-on .settings__body .scroll,html.hpl-premium-on .settings__body .scroll__body{background:transparent!important;color:#f7f0ff!important}\n' +
    'html.hpl-premium-on .settings__title{color:#fff5ff!important;text-shadow:0 0 .75em rgba(204,122,255,.23);font-weight:500!important}\n' +
    'html.hpl-premium-on .settings-folder__name,html.hpl-premium-on .settings-param__name{color:#f4eaff!important}\n' +
    'html.hpl-premium-on .settings-param__value{color:#e9beff!important}\n' +
    'html.hpl-premium-on .settings-param__descr{color:#cdb9dd!important;opacity:.85!important}\n' +
    'html.hpl-premium-on .settings-folder.focus,html.hpl-premium-on .settings-param.focus{background:linear-gradient(90deg,rgba(147,64,218,.46),rgba(210,77,176,.22),rgba(255,136,39,.19))!important;box-shadow:inset .2em 0 #ff9229,0 0 1em rgba(121,38,187,.13)!important}\n' +
    'html.hpl-premium-on .settings-folder.focus .settings-folder__name,html.hpl-premium-on .settings-param.focus .settings-param__name{color:#ffc17d!important}\n' +
    'html.hpl-premium-on .modal__content,html.hpl-premium-on .modal__body{background-color:#1b1128!important}\n' +
    'html.hpl-premium-on .settings-folder,html.hpl-premium-on .settings-param{border-radius:.65em;border-color:rgba(190,121,255,.18)}\n' +
    'html.hpl-premium-on .card__view,html.hpl-premium-on .card__img,html.hpl-premium-on .card__image{border-radius:.65em!important}\n' +
    'html.hpl-premium-on .card__view{overflow:hidden;box-shadow:0 .45em 1.4em rgba(0,0,0,.33);transition:box-shadow .19s ease,transform .19s ease}\n' +
    'html.hpl-premium-on .card.focus .card__view,html.hpl-premium-on .card--focus .card__view,html.hpl-premium-on .card.selector.focus .card__view{box-shadow:0 0 0 .17em var(--hpl-orange),0 0 1.35em var(--hpl-glow),0 .6em 1.5em rgba(0,0,0,.42)!important;transform:translateY(-.14em)}\n' +
    'html.hpl-premium-on .card__title,html.hpl-premium-on .full-start__title{color:#f7f0ff;text-shadow:0 0 .65em rgba(160,85,214,.17)}\n' +
    'html.hpl-premium-on .menu__item.focus,html.hpl-premium-on .menu__item.active{background:linear-gradient(90deg,rgba(162,79,233,.23),rgba(255,132,27,.09))!important;box-shadow:inset .18em 0 var(--hpl-orange)}\n' +
    'html.hpl-premium-on .button.focus,html.hpl-premium-on .button.selector.focus,html.hpl-premium-on .simple-button.focus,html.hpl-premium-on .full-start__button.focus{border-color:var(--hpl-orange)!important;box-shadow:0 0 0 .13em var(--hpl-orange),0 0 1.1em var(--hpl-glow)!important}\n' +
    'html.hpl-premium-on .button,html.hpl-premium-on .simple-button{border-radius:.62em}\n' +
    'html.hpl-premium-on .full-start__rating,html.hpl-premium-on .card__vote,html.hpl-premium-on .card__quality{border-radius:.4em}\n' +
    'html.hpl-premium-on .card__vote,html.hpl-premium-on .full-start__rating{color:#ffd08d}\n' +
    'html.hpl-premium-on .menu__item.active .menu__text,html.hpl-premium-on .settings-folder.focus .settings-folder__name{color:var(--hpl-orange)!important}\n' +
    'html.hpl-premium-on.hpl-logo-enabled .head__logo-icon > img{opacity:0!important}\n' +
    'html.hpl-premium-on .head__logo-icon .hpl-pumpkin-logo{position:absolute;top:0;right:0;bottom:0;left:0;display:flex;align-items:center;justify-content:center;pointer-events:none}\n' +
    'html.hpl-premium-on .head__logo-icon .hpl-pumpkin-svg{display:block;width:100%;height:100%;filter:drop-shadow(0 0 .35em rgba(255,121,16,.48))}\n' +
    'html.hpl-premium-on #hpl-premium-decor{display:block;position:fixed;right:1.1vw;top:2.9em;width:17.5em;height:17.5em;pointer-events:none;z-index:9;opacity:.88}\n' +
    'html:not(.hpl-premium-on) #hpl-premium-decor{display:none}\n' +
    'html.hpl-premium-on #hpl-premium-decor .hpl-corner-web{position:absolute;right:0;top:0;width:100%;height:100%}\n' +
    'html.hpl-premium-on #hpl-premium-decor .hpl-spider-svg{position:absolute;right:28%;top:-2.9em;width:4.6em;height:10.3em;overflow:visible;filter:drop-shadow(0 0 .33em rgba(159,84,223,.34))}\n' +
    'html.hpl-premium-on.hpl-motion #hpl-premium-decor .hpl-spider-svg{transform-origin:50% 0;animation:hpl-sway 5.5s ease-in-out infinite}\n' +
    'html.hpl-premium-on:not(.hpl-decor-enabled) #hpl-premium-decor{display:none}\n' +
    'html.hpl-premium-on:not(.hpl-logo-enabled) .hpl-pumpkin-logo{display:none}\n' +
    'html.hpl-premium-on #hpl-premium-decor .hpl-spider-creature{stroke-linecap:round}\n' +
    '@keyframes hpl-sway{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}\n' +
    '@media(prefers-reduced-motion:reduce){html.hpl-premium-on #hpl-premium-decor .hpl-spider-svg{animation:none!important}html.hpl-premium-on .card__view{transition:none}}\n' +
    '@media(max-width:800px){html.hpl-premium-on #hpl-premium-decor{width:11em;height:11em;opacity:.63;top:3em}}\n' +

    'html #hpl-premium-header-scene{display:none;position:fixed;top:.05em;left:50%;width:29em;height:6em;transform:translateX(-50%);pointer-events:none;z-index:11;opacity:.83}\n' +
    'html.hpl-premium-on.hpl-header-enabled #hpl-premium-header-scene{display:block}\n' +
    'html #hpl-premium-header-scene .hpl-header-scene-svg{display:block;width:100%;height:100%;overflow:visible}\n' +
    'html.hpl-premium-on.hpl-motion #hpl-premium-header-scene .hpl-header-bats{transform-origin:50% 50%;animation:hpl-batfloat 7s ease-in-out infinite}\n' +
    'html.hpl-premium-on.hpl-motion #hpl-premium-header-scene .hpl-header-mist{animation:hpl-mistfloat 8s ease-in-out infinite}\n' +
    '@keyframes hpl-batfloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}\n' +
    '@keyframes hpl-mistfloat{0%,100%{opacity:.46}50%{opacity:.9}}\n' +
    '@media(max-width:1100px){html #hpl-premium-header-scene{width:18em;top:.35em;opacity:.63}}\n' +
    '@media(max-width:760px){html #hpl-premium-header-scene{display:none!important}}\n' +
    'html:not(.hpl-premium-on) .head__logo-icon .hpl-pumpkin-logo,html.hpl-premium-on:not(.hpl-logo-enabled) .head__logo-icon .hpl-pumpkin-logo{display:none!important}\n' +
    '@media(prefers-reduced-motion:reduce){html #hpl-premium-header-scene .hpl-header-bats,html #hpl-premium-header-scene .hpl-header-mist{animation:none!important}}\n' ;


  // Halloween 1.3: small decorative shapes only; no images, scripts or requests.
  var castleSceneSvg = '' +
    '<svg class="hpl-haunted-header-svg" viewBox="0 0 570 120" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">' +
    '<g fill="#171020" stroke="#9b5dd1" stroke-width="1.2" opacity=".78">' +
    '<path d="M259 111V92H268V73L274 66L280 73V85H288V57L298 43L308 57V86H318V71L324 63L330 71V92H340V111Z"/>' +
    '<path d="M264 85H335V112H264Z" stroke="none"/>' +
    '<path d="M290 110V96Q298 83 306 96V110Z" fill="#e6a34b" opacity=".58"/>' +
    '<path d="M275 78V83M325 78V83M298 65V70" stroke="#f6ac55" stroke-width="2.6"/>' +
    '<path d="M245 113Q276 104 299 110Q330 103 353 113" fill="none" stroke="#a75dbe" opacity=".5"/>' +
    '</g>' +
    '<g class="hpl-header-witch" fill="#171020" stroke="#b884ea" stroke-width=".65" opacity=".88">' +
    '<path d="M119 31L131 30L136 21L142 33L160 37L141 42L135 49L134 39L119 38Z"/>' +
    '<path d="M126 40Q138 38 146 46L151 50L145 53L137 46L127 48Z"/>' +
    '<path d="M107 54L161 45L165 47L108 57Z" fill="#cb86e9" stroke="none" opacity=".9"/>' +
    '</g></svg>';

  var ghostSvg = '' +
    '<svg class="hpl-mystic-ghost-svg" viewBox="0 0 140 156" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">' +
    '<defs><linearGradient id="hpl-ghost-skin" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e3d7ff" stop-opacity=".93"/><stop offset=".56" stop-color="#ba86e8" stop-opacity=".73"/><stop offset="1" stop-color="#7c4db0" stop-opacity=".22"/></linearGradient></defs>' +
    '<path d="M26 128V71C26 41 44 20 70 20C96 20 114 41 114 71V132L99 120L85 135L72 121L57 139L42 120L26 128Z" fill="url(#hpl-ghost-skin)" stroke="#d8b0ff" stroke-width="2.8"/>' +
    '<path d="M49 71Q54 60 60 71Q59 84 53 83Q48 80 49 71Z M81 71Q87 60 92 71Q92 84 86 83Q81 80 81 71Z" fill="#241038"/>' +
    '<ellipse cx="71" cy="99" rx="7" ry="10" fill="#2a103a"/>' +
    '<path d="M18 73Q13 51 31 35M112 37Q130 46 125 73" fill="none" stroke="#b886ec" stroke-width="2" opacity=".32" stroke-linecap="round"/>' +
    '</svg>';

  function injectMysticAtmosphere() {
    if (!document.body || document.getElementById(ATM_ID)) return;
    var atmosphere = document.createElement('div');
    atmosphere.id = ATM_ID;
    atmosphere.setAttribute('aria-hidden', 'true');
    atmosphere.innerHTML = '<div class="hpl-haze hpl-haze--top"></div>' +
      '<div class="hpl-haze hpl-haze--floor"></div>' +
      '<div class="hpl-embers"></div>' +
      '<div class="hpl-mystic-ghost">' + ghostSvg + '</div>';
    document.body.appendChild(atmosphere);
  }

  // 1.3 Mystic Halloween extras: CSS-only, pointer-events: none, scoped to themed UI.
  css += [
    "html.hpl-premium-on.hpl-atmosphere-enabled #hpl-mystic-atmosphere{display:block}\n",
    "html #hpl-mystic-atmosphere{display:none;position:fixed;top:0;right:0;bottom:0;left:0;pointer-events:none;z-index:3;overflow:hidden}\n",
    "html #hpl-mystic-atmosphere .hpl-haze{position:absolute;left:0;right:0;pointer-events:none}\n",
    "html #hpl-mystic-atmosphere .hpl-haze--top{top:0;height:26%;background:radial-gradient(ellipse at 8% 4%,rgba(143,66,205,.17),transparent 54%),radial-gradient(ellipse at 84% 0,rgba(255,110,29,.11),transparent 50%)}\n",
    "html #hpl-mystic-atmosphere .hpl-haze--floor{bottom:0;height:28%;background:radial-gradient(ellipse at 38% 100%,rgba(140,67,205,.14),transparent 65%),radial-gradient(ellipse at 90% 95%,rgba(248,108,22,.10),transparent 55%)}\n",
    "html #hpl-mystic-atmosphere .hpl-embers{position:absolute;inset:0;background:radial-gradient(circle at 5% 39%,rgba(255,157,61,.85) 0 1.2px,transparent 2.5px),radial-gradient(circle at 92% 32%,rgba(185,124,255,.8) 0 1.5px,transparent 3px),radial-gradient(circle at 12% 85%,rgba(255,163,71,.8) 0 1.1px,transparent 2.7px),radial-gradient(circle at 86% 76%,rgba(255,150,42,.72) 0 1.2px,transparent 2.9px);opacity:.5}\n",
    "html.hpl-premium-on.hpl-motion:not(.hpl-eco) #hpl-mystic-atmosphere .hpl-haze--floor{animation:hpl-fogbreath 18s ease-in-out infinite}\n",
    "@keyframes hpl-fogbreath{0%,100%{opacity:.45;transform:translate3d(-1%,0,0)}50%{opacity:.9;transform:translate3d(1%,0,0)}}\n",
    "html #hpl-mystic-atmosphere .hpl-mystic-ghost{display:none;position:absolute;left:0;bottom:1%;width:6em;height:7.2em;opacity:0;transform:translate3d(-120%,0,0)}\n",
    "html #hpl-mystic-atmosphere .hpl-mystic-ghost-svg{width:100%;height:100%;filter:drop-shadow(0 0 .5em rgba(177,110,241,.22))}\n",
    "html.hpl-premium-on.hpl-atmosphere-enabled.hpl-ghost-enabled #hpl-mystic-atmosphere .hpl-mystic-ghost{display:block}\n",
    "html.hpl-premium-on.hpl-atmosphere-enabled.hpl-ghost-enabled.hpl-motion:not(.hpl-eco) #hpl-mystic-atmosphere .hpl-mystic-ghost{animation:hpl-ghostpeek 24s ease-in-out infinite}\n",
    "@keyframes hpl-ghostpeek{0%,63%,100%{opacity:0;transform:translate3d(-120%,0,0)}68%{opacity:.6;transform:translate3d(-30%,0,0)}82%{opacity:.6;transform:translate3d(-30%,-.4em,0)}88%{opacity:0;transform:translate3d(-120%,0,0)}}\n",
    "html.hpl-premium-on.hpl-eco #hpl-mystic-atmosphere .hpl-mystic-ghost{opacity:.24;transform:translate3d(-65%,0,0);animation:none!important}\n",
    "html.hpl-premium-on[data-hpl-mode=\"cozy\"] #hpl-mystic-atmosphere .hpl-haze--top{opacity:.4}\n",
    "html.hpl-premium-on[data-hpl-mode=\"cozy\"] #hpl-mystic-atmosphere .hpl-mystic-ghost{display:none!important}\n",
    "html.hpl-premium-on[data-hpl-mode=\"horror\"] #hpl-mystic-atmosphere .hpl-haze--floor{opacity:.96}\n",
    "html.hpl-premium-on[data-hpl-mode=\"horror\"] #hpl-mystic-atmosphere .hpl-mystic-ghost-svg{filter:drop-shadow(0 0 .65em rgba(255,74,83,.22))}\n",
    "html #hpl-premium-header-scene .hpl-haunted-header-svg{display:none;position:absolute;inset:0;width:100%;height:100%;pointer-events:none}\n",
    "html.hpl-premium-on.hpl-header-enabled.hpl-castle-enabled #hpl-premium-header-scene .hpl-haunted-header-svg{display:block}\n",
    "html.hpl-premium-on.hpl-motion:not(.hpl-eco) #hpl-premium-header-scene .hpl-header-witch{animation:hpl-witchfly 19s ease-in-out infinite}\n",
    "@keyframes hpl-witchfly{0%,100%{transform:translate3d(-9px,3px,0);opacity:.55}50%{transform:translate3d(18px,-8px,0);opacity:.93}}\n",
    "html.hpl-premium-on.hpl-eco #hpl-premium-header-scene .hpl-header-bats,html.hpl-premium-on.hpl-eco #hpl-premium-header-scene .hpl-header-mist,html.hpl-premium-on.hpl-eco #hpl-premium-header-scene .hpl-header-witch,html.hpl-premium-on.hpl-eco #hpl-premium-decor .hpl-spider-svg{animation:none!important}\n",
    "html.hpl-premium-on.hpl-magic-enabled .card.focus .card__view,html.hpl-premium-on.hpl-magic-enabled .card--focus .card__view{box-shadow:0 0 0 .13em #ff982f,0 0 0 .29em rgba(158,72,219,.53),0 0 1.25em rgba(175,85,247,.4),0 0 2.2em rgba(255,116,34,.18)!important}\n",
    "html.hpl-premium-on.hpl-magic-enabled .card.focus .card__view:after,html.hpl-premium-on.hpl-magic-enabled .card--focus .card__view:after{border:.18em solid rgba(255,177,69,.9)!important;border-radius:.75em!important;box-shadow:0 0 .8em rgba(183,92,243,.34)!important;z-index:1!important;top:0!important;right:0!important;bottom:0!important;left:0!important}\n",
    "html.hpl-premium-on.hpl-magic-enabled .card.focus .card__view:before,html.hpl-premium-on.hpl-magic-enabled .card--focus .card__view:before{content:\"\";position:absolute;inset:0;z-index:2;pointer-events:none;background:radial-gradient(circle at 10% 10%,#ffe3a3 0 1px,transparent 3px),radial-gradient(circle at 90% 14%,#d5a2ff 0 1.4px,transparent 4px),radial-gradient(circle at 83% 88%,#ffd07d 0 1.2px,transparent 4px),radial-gradient(circle at 9% 83%,#dfadff 0 1px,transparent 3px);opacity:.88}\n",
    "html.hpl-premium-on.hpl-motion.hpl-magic-enabled.hpl-full-effects .card.focus .card__view:before{animation:hpl-card-spark 2.8s ease-in-out infinite}\n",
    "@keyframes hpl-card-spark{0%,100%{opacity:.65}50%{opacity:1}}\n",
    "html.hpl-premium-on.hpl-windows-enabled .selectbox__content,html.hpl-premium-on.hpl-windows-enabled .modal__content{background:linear-gradient(155deg,#261437 0%,#1c1229 52%,#120e1e 100%)!important;border:1px solid rgba(189,105,249,.28)!important;box-shadow:-1em 0 2em rgba(7,4,15,.36)!important;color:#f9efff}\n",
    "html.hpl-premium-on.hpl-windows-enabled .selectbox-item.focus,html.hpl-premium-on.hpl-windows-enabled .modal__button.focus{color:#fff8ef!important;background:linear-gradient(90deg,rgba(152,62,224,.48),rgba(255,131,27,.21))!important;box-shadow:inset .2em 0 #ff9229!important}\n",
    "html.hpl-premium-on.hpl-windows-enabled .selectbox__title,html.hpl-premium-on.hpl-windows-enabled .modal__title{color:#fff2ff!important;text-shadow:0 0 .5em rgba(184,111,247,.18)}\n",
    "html.hpl-premium-on.hpl-windows-enabled .search__input,html.hpl-premium-on.hpl-windows-enabled .search-box__keypad{background:rgba(44,22,60,.3)!important;border-radius:.8em}\n",
    "html.hpl-premium-on.hpl-windows-enabled .search-source.focus,html.hpl-premium-on.hpl-windows-enabled .search-history-key.focus{background:rgba(166,77,232,.32)!important;color:#ffe1a6!important;box-shadow:inset .13em 0 #ff9229}\n",
    "html.hpl-premium-on.hpl-windows-enabled .full-start__title,html.hpl-premium-on.hpl-windows-enabled .full-start-new__title{color:#fff6fb!important;text-shadow:0 0 .5em rgba(181,102,230,.23)}\n",
    "html.hpl-premium-on.hpl-windows-enabled .full-start__poster.focus img,html.hpl-premium-on.hpl-windows-enabled .full-start-new__poster.focus img{box-shadow:0 0 0 .24em #ff942e,0 0 1.1em rgba(168,72,223,.35)!important}\n",
    "html.hpl-premium-on.hpl-windows-enabled .full-descr__tag.focus,html.hpl-premium-on.hpl-windows-enabled .full-episode.focus,html.hpl-premium-on.hpl-windows-enabled .episode.focus{border-color:#ff942e!important;box-shadow:0 0 0 .13em #ff942e,0 0 .8em rgba(185,90,255,.26)!important;color:#fff3e2!important}\n",
    "html.hpl-premium-on.hpl-windows-enabled .full-episode.focus::after{border-color:#ff942e!important}\n",
    "html.hpl-premium-on.hpl-windows-enabled .season__title,html.hpl-premium-on.hpl-windows-enabled .full-descr__line-name{color:#f6d7ff}\n",
    "html.hpl-premium-on.hpl-windows-enabled .modal__button{background:rgba(151,76,216,.14)!important;border:1px solid rgba(206,135,255,.23)!important}\n",
    "html.hpl-premium-on.hpl-windows-enabled .settings-input__content{background-color:#20132d!important}\n",
    "html.hpl-premium-on.hpl-windows-enabled .selectbox-item__subtitle{color:#dcc3ea}\n",
    "html.hpl-premium-on.hpl-windows-enabled .modal__content:before{content:\"\";position:absolute;top:0;left:6%;right:6%;height:1px;background:linear-gradient(90deg,transparent,rgba(255,157,60,.42),rgba(187,108,248,.42),transparent);pointer-events:none}\n",
    "html.hpl-premium-on body.settings--open #hpl-mystic-atmosphere .hpl-mystic-ghost,html.hpl-premium-on body.selectbox--open #hpl-mystic-atmosphere .hpl-mystic-ghost{display:none!important}\n",
    "@media(max-width:800px){html #hpl-mystic-atmosphere .hpl-mystic-ghost{width:3.4em;height:4.5em}html #hpl-premium-header-scene .hpl-haunted-header-svg{opacity:.56}}\n",
    "@media(prefers-reduced-motion:reduce){html #hpl-mystic-atmosphere .hpl-mystic-ghost{display:none!important}html #hpl-mystic-atmosphere .hpl-haze,html #hpl-premium-header-scene .hpl-header-witch,html.hpl-premium-on .card__view:before{animation:none!important}}\n"
  ].join('');

  // Samsung-balanced profile: sparse, composited animations; independent ghost control.
  css += [
    "html.hpl-premium-on.hpl-ghost-enabled #hpl-mystic-atmosphere{display:block}\n",
    "html.hpl-premium-on:not(.hpl-atmosphere-enabled) #hpl-mystic-atmosphere .hpl-haze,html.hpl-premium-on:not(.hpl-atmosphere-enabled) #hpl-mystic-atmosphere .hpl-embers{display:none}\n",
    "html.hpl-premium-on.hpl-ghost-enabled #hpl-mystic-atmosphere .hpl-mystic-ghost{display:block}\n",
    "html.hpl-premium-on.hpl-ghost-enabled.hpl-motion:not(.hpl-eco) #hpl-mystic-atmosphere .hpl-mystic-ghost{animation:hpl-ghostpeek 24s ease-in-out infinite}\n",
    "html.hpl-premium-on.hpl-motion:not(.hpl-full-effects) #hpl-premium-header-scene .hpl-header-bats,html.hpl-premium-on.hpl-motion:not(.hpl-full-effects) #hpl-premium-header-scene .hpl-header-mist{animation:none!important}\n",
    "html.hpl-premium-on.hpl-motion:not(.hpl-eco):not(.hpl-full-effects) #hpl-premium-decor .hpl-spider-svg{animation:hpl-sway 11s ease-in-out infinite}\n",
    "html.hpl-premium-on.hpl-motion:not(.hpl-eco):not(.hpl-full-effects) #hpl-premium-header-scene .hpl-header-witch{animation:hpl-witchfly 26s ease-in-out infinite}\n",
    "html.hpl-premium-on.hpl-motion:not(.hpl-eco):not(.hpl-full-effects) #hpl-mystic-atmosphere .hpl-haze--floor{animation:hpl-fogbreath 25s ease-in-out infinite}\n",
    "html.hpl-premium-on body.settings--open #hpl-mystic-atmosphere .hpl-mystic-ghost,html.hpl-premium-on body.selectbox--open #hpl-mystic-atmosphere .hpl-mystic-ghost{animation:none!important;display:none!important}\n"
  ].join('');

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement('style');
    style.type = 'text/css';
    style.id = STYLE_ID;
    // textContent is supported by all modern Samsung Tizen WebViews.
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
  }

  function injectDecor() {
    if (!document.body) return;
    if (!document.getElementById(DECOR_ID)) {
      var deco = document.createElement('div');
      deco.id = DECOR_ID;
      deco.setAttribute('aria-hidden', 'true');
      deco.innerHTML = webSvg + spiderSvg;
      document.body.appendChild(deco);
    }
    if (!document.getElementById(TOP_ID)) {
      var scene = document.createElement('div');
      scene.id = TOP_ID;
      scene.setAttribute('aria-hidden', 'true');
      scene.innerHTML = headerSceneSvg + castleSceneSvg;
      document.body.appendChild(scene);
    }
  }

  function injectLogo() {
    // Original logo stays in the DOM for immediate restoration when disabled.
    if (!document.body || !enabled('logo', true)) return;
    var spot = document.querySelector('.head__logo-icon');
    if (!spot) return;
    var badge = spot.querySelector('.' + LOGO_CLASS);
    if (!badge) {
      badge = document.createElement('span');
      badge.className = LOGO_CLASS;
      badge.setAttribute('aria-hidden', 'true');
      spot.appendChild(badge);
    }
    var type = get('pumpkin_style', 'evil');
    if (type !== 'classic' && type !== 'burning' && type !== 'haunted') type = 'evil';
    if (badge.getAttribute('data-hpl-variant') !== type) {
      badge.innerHTML = selectedPumpkin();
      badge.setAttribute('data-hpl-variant', type);
    }
  }

  function apply() {
    var root = document.documentElement;
    var on = enabled('enabled', true);
    var palette = get('palette', 'purple') === 'ember' ? 'ember' : 'purple';
    root.classList.toggle(ROOT_CLASS, on);
    root.classList.toggle('hpl-decor-enabled', on && enabled('spider', true));
    root.classList.toggle('hpl-motion', on && enabled('motion', true));
    root.classList.toggle('hpl-logo-enabled', on && enabled('logo', true));
    root.classList.toggle('hpl-header-enabled', on && enabled('header_decor', true));
    root.classList.toggle('hpl-castle-enabled', on && enabled('castle', true));
    root.classList.toggle('hpl-atmosphere-enabled', on && enabled('atmosphere', true));
    root.classList.toggle('hpl-ghost-enabled', on && enabled('apparitions', true));
    root.classList.toggle('hpl-magic-enabled', on && enabled('magic', true));
    root.classList.toggle('hpl-windows-enabled', on && enabled('windows', true));
    var mood = get('mode', 'mystic');
    if (mood !== 'cozy' && mood !== 'horror') mood = 'mystic';
    root.setAttribute('data-hpl-mode', mood);
    var performance = get('performance', 'balanced');
    if (performance !== 'eco' && performance !== 'full') performance = 'balanced';
    root.classList.toggle('hpl-eco', performance === 'eco');
    root.classList.toggle('hpl-full-effects', performance === 'full');
    root.setAttribute('data-hpl-palette', palette);
    if (on) {
      injectStyle();
      injectDecor();
      injectMysticAtmosphere();
      injectLogo();
    }
  }

  function onChange() {
    // Lampa stores the new value during the settings change callback.
    setTimeout(apply, 0);
  }

  function registerSettings() {
    if (settingsRegistered || !Lampa.SettingsApi || !Lampa.SettingsApi.addComponent || !Lampa.SettingsApi.addParam) return;
    settingsRegistered = true;
    try {
      Lampa.SettingsApi.addComponent({
        component: 'halloween_premium',
        name: 'Halloween Premium',
        icon: pumpkinSvg
      });
      Lampa.SettingsApi.addParam({
        component: 'halloween_premium',
        param: {name: PREFIX + 'enabled', type: 'trigger', 'default': true},
        field: {name: 'Включить Halloween Premium', description: 'Полностью отключает оформление, не удаляя плагин.'},
        onChange: onChange
      });
      Lampa.SettingsApi.addParam({
        component: 'halloween_premium',
        param: {name: PREFIX + 'palette', type: 'select', values: {'purple':'Мистический фиолетовый', 'ember':'Тыквенное золото'}, 'default': 'purple'},
        field: {name: 'Цветовой вариант', description: 'Чёрный с фиолетовым и оранжевым свечением.'},
        onChange: onChange
      });
      Lampa.SettingsApi.addParam({
        component: 'halloween_premium',
        param: {name: PREFIX + 'spider', type: 'trigger', 'default': true},
        field: {name: 'Паучок и паутина', description: 'Небольшой декоративный паучок в верхнем углу.'},
        onChange: onChange
      });
      Lampa.SettingsApi.addParam({
        component: 'halloween_premium',
        param: {name: PREFIX + 'motion', type: 'trigger', 'default': true},
        field: {name: 'Плавное покачивание', description: 'Лёгкая анимация паучка. Можно отключить для экономии ресурсов.'},
        onChange: onChange
      });
      Lampa.SettingsApi.addParam({
        component: 'halloween_premium',
        param: {name: PREFIX + 'logo', type: 'trigger', 'default': true},
        field: {name: 'Тыква вместо логотипа', description: 'Заменяет значок Lampa в верхнем левом углу.'},
        onChange: onChange
      });
      Lampa.SettingsApi.addParam({
        component: 'halloween_premium',
        param: {name: PREFIX + 'pumpkin_style', type: 'select', values: {'evil':'Злая тыква', 'classic':'Классическая', 'burning':'Огненная', 'haunted':'Призрачная'}, 'default': 'evil'},
        field: {name: 'Вид тыквы', description: 'Четыре отдельных рисунка. Можно переключать без перезапуска.'},
        onChange: onChange
      });
      Lampa.SettingsApi.addParam({
        component: 'halloween_premium',
        param: {name: PREFIX + 'header_decor', type: 'trigger', 'default': true},
        field: {name: 'Луна, летучие мыши и туман', description: 'Лёгкий декор в центре верхней части экрана.'},
        onChange: onChange
      });
      Lampa.SettingsApi.addParam({
        component: 'halloween_premium',
        param: {name: PREFIX + 'mode', type: 'select',
          values: {'mystic':'Mystic Halloween', 'cozy':'Cozy Halloween', 'horror':'Horror Halloween'},
          'default': 'mystic'},
        field: {name: 'Атмосфера', description: 'Mystic: мистическая луна, туман, призрак и фиолетовые огни.'},
        onChange: onChange
      });
      Lampa.SettingsApi.addParam({
        component: 'halloween_premium',
        param: {name: PREFIX + 'atmosphere', type: 'trigger', 'default': true},
        field: {name: 'Живой мистический фон', description: 'Прозрачная дымка и мягкие огоньки по краям экрана.'},
        onChange: onChange
      });
      Lampa.SettingsApi.addParam({
        component: 'halloween_premium',
        param: {name: PREFIX + 'apparitions', type: 'trigger', 'default': true},
        field: {name: 'Призрак на экране', description: 'Редко выглядывает из-за края, не мешает управлению.'},
        onChange: onChange
      });
      Lampa.SettingsApi.addParam({
        component: 'halloween_premium',
        param: {name: PREFIX + 'magic', type: 'trigger', 'default': true},
        field: {name: 'Магические карточки', description: 'Двойной контур и искры вокруг выбранного постера.'},
        onChange: onChange
      });
      Lampa.SettingsApi.addParam({
        component: 'halloween_premium',
        param: {name: PREFIX + 'castle', type: 'trigger', 'default': true},
        field: {name: 'Замок и ведьма в шапке', description: 'Мистический замок и ведьма на метле рядом с луной.'},
        onChange: onChange
      });
      Lampa.SettingsApi.addParam({
        component: 'halloween_premium',
        param: {name: PREFIX + 'windows', type: 'trigger', 'default': true},
        field: {name: 'Тематические окна', description: 'Единый стиль поиска, фильма, сезонов и всплывающих окон.'},
        onChange: onChange
      });
      Lampa.SettingsApi.addParam({
        component: 'halloween_premium',
        param: {name: PREFIX + 'performance', type: 'select',
          values: {'balanced':'Сбалансировано (Samsung)', 'eco':'Экономный', 'full':'Больше анимации'},
          'default': 'balanced'},
        field: {name: 'Производительность', description: 'Экономный режим отключает движение декоративных объектов.'},
        onChange: onChange
      });
    } catch (err) {
      // The theme should still run if a fork of Lampa has an incompatible Settings API.
      if (window.console && console.warn) console.warn('[Halloween Premium] Settings API:', err);
    }
  }

  function start() {
    if (window[READY_FLAG] || !window.Lampa || !document.documentElement || !document.body) return;
    window[READY_FLAG] = true;
    injectStyle();
    registerSettings();
    apply();
    // The app may re-render the header on navigation; listen without DOM polling.
    try {
      if (Lampa.Listener && Lampa.Listener.follow) {
        Lampa.Listener.follow('activity', function () { setTimeout(injectLogo, 0); });
      }
    } catch (ignore) {}
    if (window.console && console.log) console.log('[Halloween Premium] Theme 1.3.0 ready');
  }

  function bootstrap() {
    if (window.appready && window.Lampa) {
      start();
    } else if (window.Lampa && Lampa.Listener && Lampa.Listener.follow) {
      Lampa.Listener.follow('app', function (event) {
        if (event && event.type === 'ready') start();
      });
    } else if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', start);
    } else {
      start();
    }
  }

  bootstrap();
})();
