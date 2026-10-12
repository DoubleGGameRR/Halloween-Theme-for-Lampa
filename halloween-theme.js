/*
 * Halloween Theme for Lampa — Premium Edition
 * Version: 1.2.0 | 2026-10-12
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
      scene.innerHTML = headerSceneSvg;
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
    root.setAttribute('data-hpl-palette', palette);
    if (on) {
      injectStyle();
      injectDecor();
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
    if (window.console && console.log) console.log('[Halloween Premium] Theme 1.2.0 ready');
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
