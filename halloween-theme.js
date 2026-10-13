/*
 * Halloween Theme for Lampa — Premium Edition
 * Version: 1.3.3 | 2026-10-14
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
  var SKELETON_ID = 'hpl-haunted-skeletons';
  var HEADER_FILL_ID = 'hpl-header-fill';
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
  // Premium nocturnal header instead of the old boxy castle and witch.
  // An airy moonlit forest silhouette, subtle starfield and bats.
  var castleSceneSvg = '' +
    '<svg class="hpl-haunted-header-svg" viewBox="0 0 570 120" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">' +
    '<defs><linearGradient id="hpl-forest-fill" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#49305d" stop-opacity=".52"/><stop offset="1" stop-color="#150d20" stop-opacity=".94"/></linearGradient><radialGradient id="hpl-forest-halo"><stop stop-color="#eec8ff" stop-opacity=".27"/><stop offset="1" stop-color="#b06eff" stop-opacity="0"/></radialGradient></defs>' +
    '<circle cx="285" cy="49" r="59" fill="url(#hpl-forest-halo)"/>' +
    '<g fill="none" stroke="#b783ed" stroke-width="1" opacity=".47"><path d="M63 78Q154 57 221 80M344 78Q420 59 508 76" stroke-dasharray="2 9"/></g>' +
    '<g fill="url(#hpl-forest-fill)" stroke="#ae72de" stroke-width="1.1" opacity=".74">' +
    '<path d="M0 114Q21 98 44 108L49 68L40 52L49 55L55 65L62 43L70 35L65 57L60 77L75 65L91 63L76 72L63 86L60 109Q91 95 117 111L139 109L145 75L131 65L146 68L155 43L150 68L169 57L184 58L166 64L159 82L162 109L199 115Z"/>' +
    '<path d="M570 114Q549 98 526 108L521 68L530 52L521 55L515 65L508 43L500 35L505 57L510 77L495 65L479 63L494 72L507 86L510 109Q479 95 453 111L431 109L425 75L439 65L424 68L415 43L420 68L401 57L386 58L404 64L411 82L408 109L371 115Z"/>' +
    '</g>' +
    '<g fill="#d9a9ff" opacity=".43"><circle cx="204" cy="31" r="1.5"/><circle cx="369" cy="18" r="1.7"/><circle cx="444" cy="40" r="1.2"/><circle cx="131" cy="23" r="1.1"/></g>' +
    '<g fill="none" stroke="#ac74e6" stroke-width="1" opacity=".4"><path d="M16 114Q285 86 554 114"/></g>' +
    '</svg>';

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

  // Mode changes are deliberately visible across the entire navigation system;
  // larger focus particles stay visible at TV viewing distance.
  css += [
    "html.hpl-premium-on[data-hpl-mode=\"mystic\"] .menu,html.hpl-premium-on[data-hpl-mode=\"mystic\"] .settings__content{background:linear-gradient(155deg,#35164b 0%,#21102f 54%,#110b1e 100%)!important}\n",
    "html.hpl-premium-on[data-hpl-mode=\"mystic\"] .head{background:linear-gradient(90deg,rgba(26,11,42,.91),rgba(47,18,67,.81),rgba(27,12,41,.91))!important}\n",
    "html.hpl-premium-on[data-hpl-mode=\"cozy\"]{--hpl-orange:#ffac4d;--hpl-purple:#ffb568;--hpl-glow:rgba(255,165,51,.32)}\n",
    "html.hpl-premium-on[data-hpl-mode=\"cozy\"] .menu,html.hpl-premium-on[data-hpl-mode=\"cozy\"] .settings__content{background:linear-gradient(155deg,#4a2618 0%,#2a1517 52%,#170e12 100%)!important;border-color:rgba(255,166,73,.33)!important}\n",
    "html.hpl-premium-on[data-hpl-mode=\"cozy\"] .head{background:linear-gradient(90deg,rgba(46,25,16,.94),rgba(72,37,20,.85),rgba(36,19,17,.92))!important}\n",
    "html.hpl-premium-on[data-hpl-mode=\"cozy\"] .settings__title,html.hpl-premium-on[data-hpl-mode=\"cozy\"] .settings-folder.focus .settings-folder__name{color:#ffcc85!important}\n",
    "html.hpl-premium-on[data-hpl-mode=\"cozy\"] #hpl-premium-header-scene .hpl-header-moon{filter:sepia(1) saturate(2) hue-rotate(-30deg) brightness(1.17)}\n",
    "html.hpl-premium-on[data-hpl-mode=\"cozy\"] #hpl-mystic-atmosphere .hpl-haze--floor{background:radial-gradient(ellipse at 32% 100%,rgba(255,151,42,.3),transparent 65%),radial-gradient(ellipse at 93% 90%,rgba(231,111,38,.2),transparent 55%)!important;opacity:.85!important}\n",
    "html.hpl-premium-on[data-hpl-mode=\"horror\"]{--hpl-orange:#ff4b55;--hpl-purple:#d76791;--hpl-glow:rgba(255,51,89,.36)}\n",
    "html.hpl-premium-on[data-hpl-mode=\"horror\"] .menu,html.hpl-premium-on[data-hpl-mode=\"horror\"] .settings__content{background:linear-gradient(155deg,#421221 0%,#260d1b 53%,#0c0810 100%)!important;border-color:rgba(255,65,92,.38)!important}\n",
    "html.hpl-premium-on[data-hpl-mode=\"horror\"] .head{background:linear-gradient(90deg,rgba(43,8,21,.95),rgba(73,11,29,.88),rgba(29,6,18,.95))!important}\n",
    "html.hpl-premium-on[data-hpl-mode=\"horror\"] .settings__title,html.hpl-premium-on[data-hpl-mode=\"horror\"] .settings-folder.focus .settings-folder__name{color:#ff9aaa!important}\n",
    "html.hpl-premium-on[data-hpl-mode=\"horror\"] #hpl-premium-header-scene .hpl-header-moon{filter:sepia(1) saturate(5) hue-rotate(300deg) brightness(1.14)}\n",
    "html.hpl-premium-on[data-hpl-mode=\"horror\"] #hpl-mystic-atmosphere .hpl-haze--floor{background:radial-gradient(ellipse at 26% 100%,rgba(207,32,56,.33),transparent 65%),radial-gradient(ellipse at 92% 92%,rgba(122,9,36,.27),transparent 65%)!important;opacity:.95!important}\n",
    "html.hpl-premium-on[data-hpl-mode=\"horror\"] .menu__item.focus,html.hpl-premium-on[data-hpl-mode=\"horror\"] .settings-folder.focus,html.hpl-premium-on[data-hpl-mode=\"horror\"] .settings-param.focus{box-shadow:inset .2em 0 #ff4b55!important}\n",
    "html.hpl-premium-on[data-hpl-mode=\"cozy\"] .menu__item.focus,html.hpl-premium-on[data-hpl-mode=\"cozy\"] .settings-folder.focus,html.hpl-premium-on[data-hpl-mode=\"cozy\"] .settings-param.focus{box-shadow:inset .2em 0 #ffb567!important}\n",
    "html.hpl-premium-on.hpl-header-enabled.hpl-castle-enabled #hpl-premium-header-scene .hpl-haunted-header-svg{opacity:1!important}\n",
    "html.hpl-premium-on #hpl-premium-header-scene .hpl-haunted-header-svg{overflow:visible}\n",
  ].join('');


  // Two crisp, noninteractive SVG skeletons stay near the screen edges.
  var skeletonSvg = '' +
    '<svg class="hpl-skeleton-svg" viewBox="0 0 150 270" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<defs><linearGradient id="hpl-bone-grad" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff0e1"/><stop offset=".49" stop-color="#d0b9d9"/><stop offset="1" stop-color="#755b87"/></linearGradient></defs>' +
    '<g stroke="#382244" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round">' +
    '<path d="M54 59Q32 49 33 29Q32 5 75 4Q118 5 118 29Q119 48 99 59L98 73Q90 82 75 81Q58 81 54 71Z" fill="url(#hpl-bone-grad)"/>' +
    '<path d="M40 32Q53 21 66 33L62 45Q50 49 44 43Z M84 33Q98 21 111 32L107 43Q96 49 90 45Z" fill="#1b0f27"/>' +
    '<path d="M74 44L66 59L82 59Z" fill="#291529"/>' +
    '<path d="M55 62L56 72Q74 85 95 72L97 62Z" fill="#d7b5d4"/>' +
    '<path d="M56 69L96 69M64 69V79M72 69V81M80 69V81M88 69V78" stroke="#26142d" fill="none" stroke-width="2.5"/>' +
    '<path d="M44 87Q75 78 106 87L114 105L99 114L93 144H57L51 114L36 106Z" fill="#30213a"/>' +
    '<path d="M75 84V164" stroke="url(#hpl-bone-grad)" stroke-width="8" fill="none"/>' +
    '<path d="M75 88Q54 79 36 90Q34 99 62 106M75 88Q96 79 114 90Q116 99 88 106" fill="none" stroke="url(#hpl-bone-grad)" stroke-width="7"/>' +
    '<path d="M75 105Q56 97 39 108Q36 117 63 125M75 105Q94 97 111 108Q114 117 87 125" fill="none" stroke="url(#hpl-bone-grad)" stroke-width="6.5"/>' +
    '<path d="M75 124Q56 116 47 128Q44 136 64 141M75 124Q94 116 103 128Q106 136 86 141" fill="none" stroke="url(#hpl-bone-grad)" stroke-width="5.5"/>' +
    '<path d="M41 91L27 116L18 144L24 154M109 91L123 116L132 144L126 154" stroke="url(#hpl-bone-grad)" stroke-width="9" fill="none"/>' +
    '<path d="M24 154L10 167M24 154L20 177M24 154L31 176M24 154L39 167M126 154L111 165M126 154L121 176M126 154L137 178M126 154L148 168" stroke="#e2cddb" stroke-width="3.2" fill="none"/>' +
    '<path d="M54 158Q75 149 96 158L91 174Q75 184 59 174Z" fill="url(#hpl-bone-grad)"/>' +
    '<path d="M62 176L53 210L42 247M88 176L97 210L108 247" stroke="url(#hpl-bone-grad)" stroke-width="11" fill="none"/>' +
    '<path d="M42 247L28 257L18 262M108 247L122 257L134 262" stroke="#d8bed7" stroke-width="6" fill="none"/>' +
    '</g><g fill="#ff9e34"><circle cx="53" cy="38" r="3.1"/><circle cx="98" cy="38" r="3.1"/></g>' +
    '<g fill="#fff0b1"><circle cx="53" cy="37" r="1.1"/><circle cx="98" cy="37" r="1.1"/></g>' +
    '</svg>';

  function injectSkeletons() {
    if (!document.body || document.getElementById(SKELETON_ID)) return;
    var holder = document.createElement('div');
    holder.id = SKELETON_ID;
    holder.setAttribute('aria-hidden', 'true');
    holder.innerHTML = '<div class="hpl-skeleton hpl-skeleton--left">' + skeletonSvg + '</div>' +
      '<div class="hpl-skeleton hpl-skeleton--right">' + skeletonSvg + '</div>';
    document.body.appendChild(holder);
  }

  // Final rounded violet focus + low-cost decorative SVG skeletons.
  css += [
    "html.hpl-premium-on .card.focus .card__view,html.hpl-premium-on .card.selector.focus .card__view,html.hpl-premium-on .card--focus .card__view{outline:0!important}\n",
    "html.hpl-premium-on.hpl-magic-enabled .card.focus .card__view,html.hpl-premium-on.hpl-magic-enabled .card.selector.focus .card__view,html.hpl-premium-on.hpl-magic-enabled .card--focus .card__view{border-radius:1em!important;overflow:visible!important;outline:0!important;box-shadow:0 0 .68em rgba(176,93,255,.44)!important}\n",
    "html.hpl-premium-on.hpl-magic-enabled .card.focus .card__view::after,html.hpl-premium-on.hpl-magic-enabled .card.selector.focus .card__view::after,html.hpl-premium-on.hpl-magic-enabled .card--focus .card__view::after{content:\"\"!important;display:block!important;position:absolute!important;top:-.35em!important;right:-.35em!important;bottom:-.35em!important;left:-.35em!important;border:.24em solid #b879f5!important;border-radius:1.4em!important;box-shadow:0 0 .75em rgba(174,91,247,.56)!important;z-index:3!important;pointer-events:none!important;outline:0!important}\n",
    "html.hpl-premium-on .card.focus .card__view::before,html.hpl-premium-on .card.selector.focus .card__view::before,html.hpl-premium-on .card--focus .card__view::before{content:none!important;display:none!important;background:none!important;animation:none!important}\n",
    "html #hpl-haunted-skeletons{display:none;position:fixed;top:0;right:0;bottom:0;left:0;pointer-events:none;z-index:7;overflow:hidden}\n",
    "html.hpl-premium-on.hpl-skeletons-enabled #hpl-haunted-skeletons{display:block}\n",
    "html #hpl-haunted-skeletons .hpl-skeleton{position:absolute;width:8.5em;height:15.5em;opacity:.66;pointer-events:none;transform-origin:50% 100%;filter:drop-shadow(0 0 .45em rgba(156,86,225,.31))}\n",
    "html #hpl-haunted-skeletons .hpl-skeleton-svg{width:100%;height:100%;display:block}\n",
    "html #hpl-haunted-skeletons .hpl-skeleton--left{left:-3.3em;bottom:8.5%;transform:rotate(13deg)}\n",
    "html #hpl-haunted-skeletons .hpl-skeleton--right{right:-3.4em;bottom:16%;transform:scaleX(-1) rotate(8deg);opacity:.76}\n",
    "html.hpl-premium-on.hpl-motion:not(.hpl-eco) #hpl-haunted-skeletons .hpl-skeleton--left{animation:hpl-bones-left 16s ease-in-out infinite}\n",
    "html.hpl-premium-on.hpl-motion:not(.hpl-eco) #hpl-haunted-skeletons .hpl-skeleton--right{animation:hpl-bones-right 18s ease-in-out infinite}\n",
    "@keyframes hpl-bones-left{0%,100%{transform:rotate(13deg)}50%{transform:rotate(8deg)}}\n",
    "@keyframes hpl-bones-right{0%,100%{transform:scaleX(-1) rotate(8deg)}50%{transform:scaleX(-1) rotate(3deg)}}\n",
    "html.hpl-premium-on body.settings--open #hpl-haunted-skeletons,html.hpl-premium-on body.selectbox--open #hpl-haunted-skeletons,html.hpl-premium-on body.modal--open #hpl-haunted-skeletons{display:none!important}\n",
    "html.hpl-premium-on.hpl-eco #hpl-haunted-skeletons .hpl-skeleton{animation:none!important}\n",
    "@media(max-width:950px){html #hpl-haunted-skeletons .hpl-skeleton{width:5.5em;height:10em;opacity:.48}}\n",
    "@media(prefers-reduced-motion:reduce){html #hpl-haunted-skeletons .hpl-skeleton{animation:none!important}}\n"
  ].join('');

  // Full-width Halloween candy garland for the previously empty strip below the header.
  // Kept as one inline SVG for fast Tizen rendering and no external assets.
  var headerFillSvg = [
    "<svg class=\"hpl-header-fill-svg\" viewBox=\"0 0 1600 140\" preserveAspectRatio=\"none\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\">",
    "<defs><linearGradient id=\"hpl-garland-wire\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"0\"><stop stop-color=\"#8b48e4\"/><stop offset=\".5\" stop-color=\"#e2a8ff\"/><stop offset=\"1\" stop-color=\"#a866f5\"/></linearGradient><radialGradient id=\"hpl-garland-orange\"><stop stop-color=\"#fff1b0\"/><stop offset=\".4\" stop-color=\"#ffa328\"/><stop offset=\"1\" stop-color=\"#e44911\"/></radialGradient><radialGradient id=\"hpl-garland-purple\"><stop stop-color=\"#ffe2ff\"/><stop offset=\".45\" stop-color=\"#cc70ff\"/><stop offset=\"1\" stop-color=\"#6323ab\"/></radialGradient><radialGradient id=\"hpl-garland-halo\"><stop stop-color=\"#ff942e\" stop-opacity=\".48\"/><stop offset=\"1\" stop-color=\"#ff942e\" stop-opacity=\"0\"/></radialGradient></defs>",
    "<g fill=\"none\" stroke=\"#bd84f8\" stroke-width=\"1.5\" opacity=\".63\">",
    "<path d=\"M0 0L193 0M0 0L175 45M0 0L140 93M0 0L83 125M0 0L0 135M1600 0L1407 0M1600 0L1425 45M1600 0L1460 93M1600 0L1517 125M1600 0V135\"/>",
    "<path d=\"M40 0Q55 26 83 31Q108 37 131 68M80 0Q88 19 108 24Q135 33 150 56M122 0Q131 15 147 19Q169 25 177 39M0 40Q25 45 38 72Q45 98 86 105M0 80Q18 85 22 104Q29 121 54 129\"/>",
    "<path d=\"M1560 0Q1545 26 1517 31Q1492 37 1469 68M1520 0Q1512 19 1492 24Q1465 33 1450 56M1478 0Q1469 15 1453 19Q1431 25 1423 39M1600 40Q1575 45 1562 72Q1555 98 1514 105M1600 80Q1582 85 1578 104Q1571 121 1546 129\"/>",
    "</g>",
    "<path d=\"M155 12Q250 72 355 28T565 24T795 28T1040 31T1280 25T1450 13\" stroke=\"#4d2c67\" stroke-width=\"5\" fill=\"none\" opacity=\".65\"/>",
    "<path d=\"M155 12Q250 72 355 28T565 24T795 28T1040 31T1280 25T1450 13\" stroke=\"url(#hpl-garland-wire)\" stroke-width=\"2.3\" fill=\"none\" opacity=\".87\"/>",
    "<g class=\"hpl-garland-lights\">",
    "<circle cx=\"214\" cy=\"42\" r=\"19\" fill=\"url(#hpl-garland-halo)\"/><circle cx=\"214\" cy=\"42\" r=\"5.2\" fill=\"url(#hpl-garland-orange)\"/>",
    "<circle cx=\"303\" cy=\"52\" r=\"16\" fill=\"url(#hpl-garland-halo)\"/><circle cx=\"303\" cy=\"52\" r=\"4.6\" fill=\"#ffbd4b\"/>",
    "<circle cx=\"416\" cy=\"20\" r=\"16\" fill=\"url(#hpl-garland-halo)\"/><circle cx=\"416\" cy=\"20\" r=\"4.7\" fill=\"url(#hpl-garland-orange)\"/>",
    "<circle cx=\"542\" cy=\"27\" r=\"17\" fill=\"url(#hpl-garland-halo)\"/><circle cx=\"542\" cy=\"27\" r=\"5.1\" fill=\"#ffab2a\"/>",
    "<circle cx=\"654\" cy=\"38\" r=\"19\" fill=\"url(#hpl-garland-halo)\"/><circle cx=\"654\" cy=\"38\" r=\"5.5\" fill=\"#ff8c23\"/>",
    "<circle cx=\"806\" cy=\"35\" r=\"15\" fill=\"url(#hpl-garland-halo)\"/><circle cx=\"806\" cy=\"35\" r=\"4.7\" fill=\"#ffbe5c\"/>",
    "<circle cx=\"944\" cy=\"27\" r=\"18\" fill=\"url(#hpl-garland-halo)\"/><circle cx=\"944\" cy=\"27\" r=\"5.3\" fill=\"#ff9831\"/>",
    "<circle cx=\"1060\" cy=\"36\" r=\"17\" fill=\"url(#hpl-garland-halo)\"/><circle cx=\"1060\" cy=\"36\" r=\"4.8\" fill=\"#ffb747\"/>",
    "<circle cx=\"1195\" cy=\"28\" r=\"18\" fill=\"url(#hpl-garland-halo)\"/><circle cx=\"1195\" cy=\"28\" r=\"5.5\" fill=\"#ff8b2d\"/>",
    "<circle cx=\"1348\" cy=\"32\" r=\"16\" fill=\"url(#hpl-garland-halo)\"/><circle cx=\"1348\" cy=\"32\" r=\"5\" fill=\"#ffc063\"/>",
    "</g>",
    "<g fill=\"none\" stroke=\"#b77aee\" stroke-width=\"1.4\" opacity=\".72\"><path d=\"M385 26V53M600 31V56M905 29V57M1140 32V55M1290 30V58\"/></g>",
    "<g transform=\"translate(382 71) rotate(-12)\"><path d=\"M-22 0L-45 -11L-43 12L-22 7M22 0L45 -11L43 12L22 7\" fill=\"#c26afb\" stroke=\"#f6dcff\" stroke-width=\"1.2\"/><ellipse rx=\"23\" ry=\"16\" fill=\"url(#hpl-garland-purple)\" stroke=\"#f6ceff\" stroke-width=\"1.7\"/><path d=\"M-10 -11L8 12M-7 12L10 -10\" stroke=\"#fcefff\" stroke-width=\"3.5\" opacity=\".7\"/></g>",
    "<g transform=\"translate(600 74) rotate(13)\"><path d=\"M-21 0L-42 -12L-41 12L-21 7M21 0L42 -12L41 12L21 7\" fill=\"#ff922c\" stroke=\"#ffe2ac\" stroke-width=\"1.2\"/><ellipse rx=\"22\" ry=\"15\" fill=\"url(#hpl-garland-orange)\" stroke=\"#ffd78b\" stroke-width=\"1.6\"/><path d=\"M-8 -12L9 12M-9 11L8 -11\" stroke=\"#ffebc4\" stroke-width=\"3\" opacity=\".76\"/></g>",
    "<g transform=\"translate(900 75)\"><circle r=\"18\" fill=\"#fff0b9\" stroke=\"#f3972f\" stroke-width=\"3\"/><path d=\"M-7 -11Q13 -11 6 0T-7 12Q-16 2 -7 -5T5 -1\" fill=\"none\" stroke=\"#ff8a24\" stroke-width=\"5\"/><path d=\"M0 18V42\" stroke=\"#f9dec9\" stroke-width=\"3.6\"/></g>",
    "<g transform=\"translate(1137 73) rotate(-9)\"><path d=\"M-21 0L-42 -10L-42 11L-20 6M21 0L42 -10L42 11L20 6\" fill=\"#b56af9\" stroke=\"#eec7ff\" stroke-width=\"1.3\"/><ellipse rx=\"21\" ry=\"15\" fill=\"url(#hpl-garland-purple)\" stroke=\"#edc6ff\" stroke-width=\"1.4\"/><path d=\"M-7 -13L8 13M-8 12L8 -12\" stroke=\"#fbebff\" stroke-width=\"3\" opacity=\".76\"/></g>",
    "<g transform=\"translate(1289 76)\"><path d=\"M0 -18L-16 2L16 2Z\" fill=\"#ffe0a3\"/><path d=\"M-16 2L16 2L10 20L-10 20Z\" fill=\"#ff9931\"/><path d=\"M-11 14L11 14L6 22L-6 22Z\" fill=\"#f8da83\"/></g>",
    "<g fill=\"#110b1f\" stroke=\"#bf7cec\" stroke-width=\"1.3\" opacity=\".9\">",
    "<path d=\"M510 67Q492 51 479 65Q470 60 454 65Q471 68 478 81Q486 74 495 77L510 68L525 77Q534 74 542 81Q549 68 566 65Q550 60 541 65Q528 51 510 67Z\"/>",
    "<path d=\"M1032 82Q1020 69 1012 80Q1004 76 992 80Q1005 84 1009 91Q1016 85 1023 88L1032 82L1041 88Q1048 85 1055 91Q1059 84 1073 80Q1060 76 1053 80Q1044 69 1032 82Z\"/>",
    "</g>",
    "<g fill=\"#271437\" stroke=\"#ffae3b\" stroke-width=\"1.7\" opacity=\".96\">",
    "<g transform=\"translate(735 64)\"><path d=\"M0 -21L5 -24L5 -16\" stroke=\"#518441\" stroke-width=\"4\" fill=\"none\"/><ellipse rx=\"21\" ry=\"20\" fill=\"url(#hpl-garland-orange)\"/><path d=\"M-12 -5L-3 -9L-6 0ZM12 -5L3 -9L6 0ZM-12 8L-4 5L0 9L4 5L12 8Q7 15 0 14Q-8 15 -12 8Z\" fill=\"#281129\" stroke=\"none\"/></g>",
    "<g transform=\"translate(1225 57) scale(.76)\"><path d=\"M0 -21L5 -25L5 -17\" stroke=\"#508042\" stroke-width=\"5\" fill=\"none\"/><ellipse rx=\"21\" ry=\"20\" fill=\"url(#hpl-garland-orange)\"/><path d=\"M-12 -5L-3 -9L-6 0ZM12 -5L3 -9L6 0ZM-12 8L-4 5L0 9L4 5L12 8Q7 15 0 14Q-8 15 -12 8Z\" fill=\"#281129\" stroke=\"none\"/></g>",
    "</g>",
    "</svg>"
  ].join('');

  function injectHeaderFill() {
    if (!document.body || document.getElementById(HEADER_FILL_ID)) return;
    var wrap = document.createElement('div');
    wrap.id = HEADER_FILL_ID;
    wrap.setAttribute('aria-hidden', 'true');
    wrap.innerHTML = headerFillSvg;
    document.body.appendChild(wrap);
  }

  // Garland covers the free strip below the navigation bar, not its interactive controls.
  css += [
    "html #hpl-header-fill{display:none;position:fixed;top:3.05em;left:0;right:0;width:100%;height:3.65em;pointer-events:none;overflow:hidden;z-index:14;opacity:.97}\n",
    "html.hpl-premium-on.hpl-header-fill-enabled #hpl-header-fill{display:block}\n",
    "html #hpl-header-fill .hpl-header-fill-svg{display:block;width:100%;height:100%;overflow:hidden}\n",
    "html.hpl-premium-on.hpl-header-fill-enabled #hpl-premium-header-scene{display:none!important}\n",
    "html.hpl-premium-on.hpl-header-fill-enabled body.settings--open #hpl-header-fill,html.hpl-premium-on.hpl-header-fill-enabled body.selectbox--open #hpl-header-fill,html.hpl-premium-on.hpl-header-fill-enabled body.modal--open #hpl-header-fill{display:none!important}\n",
    "html.hpl-premium-on .head__logo-icon{overflow:visible!important;margin-right:1.72em!important}\n",
    "html.hpl-premium-on .head__logo-icon .hpl-pumpkin-logo{transform:scale(1.43)!important;transform-origin:left center!important}\n",
    "html.hpl-premium-on .head__logo-icon .hpl-pumpkin-svg{filter:drop-shadow(0 0 .43em rgba(255,133,33,.57))!important}\n",
    "@media(max-width:1200px){html #hpl-header-fill{top:3.12em;height:3.2em}}\n",
    "@media(max-width:800px){html #hpl-header-fill{top:3.1em;height:2.6em;opacity:.82}html.hpl-premium-on .head__logo-icon .hpl-pumpkin-logo{transform:scale(1.2)!important}}\n",
    "@media(prefers-reduced-motion:reduce){html #hpl-header-fill .hpl-garland-lights{animation:none!important}}\n"
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
    root.classList.toggle('hpl-header-fill-enabled', on && enabled('header_fill', true));
    root.classList.toggle('hpl-castle-enabled', on && enabled('castle', true));
    root.classList.toggle('hpl-atmosphere-enabled', on && enabled('atmosphere', true));
    root.classList.toggle('hpl-ghost-enabled', on && enabled('apparitions', true));
    root.classList.toggle('hpl-skeletons-enabled', on && enabled('skeletons', true));
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
      injectSkeletons();
      injectHeaderFill();
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
        param: {name: PREFIX + 'header_fill', type: 'trigger', 'default': true},
        field: {name: 'Гирлянда, паутина и конфеты сверху', description: 'Украшения на всю ширину свободной верхней полосы Lampa.'},
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
        field: {name: 'Фиолетовый контур постера', description: 'Скруглённая фиолетовая рамка и мягкое свечение без искр.'},
        onChange: onChange
      });
      Lampa.SettingsApi.addParam({
        component: 'halloween_premium',
        param: {name: PREFIX + 'skeletons', type: 'trigger', 'default': true},
        field: {name: 'Два страшных скелета', description: 'Светящиеся глаза, скелеты по краям экрана. Можно выключить.'},
        onChange: onChange
      });
      Lampa.SettingsApi.addParam({
        component: 'halloween_premium',
        param: {name: PREFIX + 'castle', type: 'trigger', 'default': true},
        field: {name: 'Ночной лес в шапке', description: 'Стильные силуэты деревьев, свет луны и летучие мыши.'},
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
    if (window.console && console.log) console.log('[Halloween Premium] Theme 1.3.3 ready');
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
