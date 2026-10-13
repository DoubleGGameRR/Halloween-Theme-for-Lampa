/* Node.js smoke test: no external dependencies, does not emulate actual Samsung TV. */
'use strict';
var fs = require('fs');
var vm = require('vm');
var assert = require('assert');
var path = require('path');
var src = fs.readFileSync(path.resolve(__dirname, '../halloween-theme.js'), 'utf8');

function element(tag) {
  var node = {tag: tag, id: '', className: '', children: [], attrs: {}, parentNode: null, textContent: '', innerHTML: ''};
  node.appendChild = function (child) { child.parentNode = node; node.children.push(child); return child; };
  node.setAttribute = function (name, val) {node.attrs[name] = val;};
  node.getAttribute = function (name) {return node.attrs[name] || null;};
  node.querySelector = function (selector) { if (selector.charAt(0) === '.') return node.children.filter(function (x) { return (' ' + x.className + ' ').indexOf(' ' + selector.substr(1) + ' ') >= 0; })[0] || null; return null; };
  return node;
}
var classes = {};
var root = element('html');
root.classList = { toggle: function (name, on) {classes[name] = !!on;}, contains: function (name) {return !!classes[name];} };
var head = element('head');
var body = element('body');
var logo = element('div');
logo.className = 'head__logo-icon';
var original = element('img');
logo.appendChild(original);
body.appendChild(logo);
var storage = {};
var settings = {components: [], params: [], addComponent: function (x) {settings.components.push(x);}, addParam: function (x) {settings.params.push(x);} };
var handlers = {};
var Lampa = {Storage: {get: function (k, fallback) {return Object.prototype.hasOwnProperty.call(storage, k) ? storage[k] : fallback;}}, SettingsApi: settings, Listener: {follow: function (name, fn) {(handlers[name] = handlers[name] || []).push(fn);}}};
var document = {documentElement: root, head: head, body: body, readyState: 'complete', createElement: element,
  getElementById: function (id) {return head.children.concat(body.children).filter(function (x) {return x.id === id;})[0] || null;},
  querySelector: function (selector) {return selector === '.head__logo-icon' ? logo : null;}};
var context = {window: {appready:true,Lampa:Lampa, console:console}, document:document, Lampa:Lampa, console:console, setTimeout: function (fn) {fn();}};
vm.runInNewContext(src, context);
assert.strictEqual(context.window.plugin_halloween_theme_premium_ready, true);
assert.strictEqual(settings.components.length, 1, 'Settings section created');
assert.strictEqual(settings.params.length, 15, '15 settings including the skeleton toggle');
assert.strictEqual(head.children.length, 1, 'CSS added');
assert.strictEqual(body.children.length, 5, 'Spider, moonlit header, background and skeletons added');
assert.strictEqual(body.children[2].id, 'hpl-premium-header-scene', 'Top-center header scene created');
assert.strictEqual(body.children[3].id, 'hpl-mystic-atmosphere', 'Mystic background created');
assert.strictEqual(body.children[4].id, 'hpl-haunted-skeletons', 'Skeleton container created');
assert.ok(body.children[4].innerHTML.indexOf('hpl-skeleton--left') >= 0 && body.children[4].innerHTML.indexOf('hpl-skeleton--right') >= 0, 'Two skeletons created');
assert.ok(body.children[4].innerHTML.indexOf('hpl-skeleton-svg') >= 0, 'Detailed skeleton SVG');
assert.ok(body.children[2].innerHTML.indexOf('hpl-haunted-header-svg') >= 0, 'Moonlit forest SVG appended');
assert.ok(body.children[2].innerHTML.indexOf('hpl-forest-fill') >= 0, 'Premium forest silhouette exists');
assert.strictEqual(body.children[2].innerHTML.indexOf('hpl-header-witch'), -1, 'Old witch graphic removed');
assert.ok(body.children[3].innerHTML.indexOf('hpl-mystic-ghost-svg') >= 0, 'Ghost SVG appended');
assert.ok(head.children[0].textContent.indexOf('hpl-magic-enabled .card.focus') >= 0, 'Magical card focus CSS');
assert.strictEqual(head.children[0].textContent.indexOf('hpl-visible-sparks'), -1, 'Spark animation removed');
assert.strictEqual(head.children[0].textContent.indexOf('hpl-card-spark'), -1, 'Earlier spark CSS removed');
assert.strictEqual(head.children[0].textContent.indexOf('outline:.18em solid #ff9b30'), -1, 'Orange square outline removed');
assert.ok(head.children[0].textContent.indexOf('border:.24em solid #b879f5') >= 0, 'Single rounded purple focus');
assert.ok(head.children[0].textContent.indexOf('border-radius:1.4em!important') >= 0, 'Focus matches rounded movie posters');
assert.ok(head.children[0].textContent.indexOf('hpl-skeletons-enabled #hpl-haunted-skeletons') >= 0, 'Skeleton visibility toggle CSS');
assert.ok(head.children[0].textContent.indexOf('[data-hpl-mode="cozy"] .menu') >= 0, 'Warm cozy navigation palette');
assert.ok(head.children[0].textContent.indexOf('[data-hpl-mode="horror"] .menu') >= 0, 'Blood-red horror navigation palette');
assert.ok(head.children[0].textContent.indexOf('[data-hpl-mode="mystic"] .menu') >= 0, 'Purple Mystic navigation palette');
assert.ok(head.children[0].textContent.indexOf('hpl-windows-enabled .selectbox__content') >= 0, 'Selectbox styling');
assert.ok(head.children[0].textContent.indexOf('hpl-windows-enabled .search__input') >= 0, 'Search styling');
assert.ok(head.children[0].textContent.indexOf('hpl-windows-enabled .full-start__title') >= 0, 'Full film card styling');
assert.ok(head.children[0].textContent.indexOf('hpl-windows-enabled .full-episode.focus') >= 0, 'Episode styling');
assert.ok(head.children[0].textContent.indexOf('hpl-ghostpeek 24s') >= 0, 'Occasional ghost animation');
assert.ok(head.children[0].textContent.indexOf('hpl-ghost-enabled #hpl-mystic-atmosphere{display:block}') >= 0, 'Ghost independent of fog');
assert.strictEqual(logo.children.length, 2, 'Pumpkin replaces logo visually, original markup preserved');
assert.strictEqual(logo.children[1].className, 'hpl-pumpkin-logo', 'Correct Lampa logo selector');
assert.ok(head.children[0].textContent.indexOf('.settings__content{background:linear-gradient(') >= 0, 'Settings right panel gradient present');
assert.ok(head.children[0].textContent.indexOf('.head__logo-icon > img{opacity:0!important}') >= 0, 'Original logo hidden by reversible style');
assert.strictEqual(classes['hpl-premium-on'], true);
assert.strictEqual(classes['hpl-decor-enabled'], true);
assert.strictEqual(classes['hpl-header-enabled'], true, 'Moon, bats and mist enabled by default');
assert.ok(head.children[0].textContent.indexOf('.menu{background:linear-gradient(155deg,#261437') >= 0, 'Left menu matches settings gradient');
assert.ok(head.children[0].textContent.indexOf('.menu__item.focus .menu__text') >= 0, 'Focused menu text stays readable');
assert.strictEqual(root.attrs['data-hpl-palette'], 'purple');
assert.strictEqual(root.attrs['data-hpl-mode'], 'mystic', 'Mystic default mood');
['hpl-atmosphere-enabled','hpl-ghost-enabled','hpl-magic-enabled','hpl-castle-enabled','hpl-windows-enabled','hpl-skeletons-enabled'].forEach(function (name) {assert.strictEqual(classes[name], true, 'Feature enabled by default: ' + name);});

storage.hpl_enabled = false;
settings.params[0].onChange();
assert.strictEqual(classes['hpl-premium-on'], false, 'Theme disabled');
storage.hpl_enabled = true;
storage.hpl_palette = 'ember';
storage.hpl_spider = false;
settings.params[1].onChange();
assert.strictEqual(classes['hpl-premium-on'], true, 'Theme reenabled');
assert.strictEqual(root.attrs['data-hpl-palette'], 'ember', 'Palette change applied');
assert.strictEqual(classes['hpl-decor-enabled'], false, 'Spider toggle applied');

// Switching four hand-drawn pumpkins updates the badge without creating duplicates.
var logoBadge = logo.children[1];
var pumpkinParam = settings.params.filter(function (param) {return param.param.name === 'hpl_pumpkin_style';})[0];
var variants = {};
['evil', 'classic', 'burning', 'haunted'].forEach(function (type) {
  storage.hpl_pumpkin_style = type;
  pumpkinParam.onChange();
  assert.strictEqual(logoBadge.getAttribute('data-hpl-variant'), type, 'Icon switching: ' + type);
  assert.ok(logoBadge.innerHTML.length > 500, 'Nonempty SVG for ' + type);
  variants[type] = logoBadge.innerHTML;
});
assert.strictEqual(new Set(Object.keys(variants).map(function (type) {return variants[type];})).size, 4, '4 different SVG artworks');
var topParam = settings.params.filter(function (param) {return param.param.name === 'hpl_header_decor';})[0];
storage.hpl_header_decor = false;
topParam.onChange();
assert.strictEqual(classes['hpl-header-enabled'], false, 'Header decor toggles off');
storage.hpl_header_decor = true;
topParam.onChange();
assert.strictEqual(classes['hpl-header-enabled'], true, 'Header decor toggles on');
handlers.activity[0]();
assert.strictEqual(logo.children.length, 2, 'Logo is idempotent');
var paramByName = function (id) {return settings.params.filter(function (x) {return x.param.name === 'hpl_' + id;})[0];};
[['atmosphere','hpl-atmosphere-enabled'], ['apparitions','hpl-ghost-enabled'], ['magic','hpl-magic-enabled'], ['castle','hpl-castle-enabled'], ['windows','hpl-windows-enabled'], ['skeletons','hpl-skeletons-enabled']].forEach(function (pair) {
  storage['hpl_' + pair[0]] = false;
  paramByName(pair[0]).onChange();
  assert.strictEqual(classes[pair[1]], false, 'Toggle disabled: ' + pair[0]);
  storage['hpl_' + pair[0]] = true;
  paramByName(pair[0]).onChange();
  assert.strictEqual(classes[pair[1]], true, 'Toggle enabled: ' + pair[0]);
});
['cozy','horror','mystic'].forEach(function (mode) {
  storage.hpl_mode = mode;
  paramByName('mode').onChange();
  assert.strictEqual(root.attrs['data-hpl-mode'], mode, 'Mood: ' + mode);
});
['eco','full','balanced'].forEach(function (mode) {
  storage.hpl_performance = mode;
  paramByName('performance').onChange();
  assert.strictEqual(classes['hpl-eco'], mode === 'eco', 'Eco: ' + mode);
  assert.strictEqual(classes['hpl-full-effects'], mode === 'full', 'Full animation: ' + mode);
});
vm.runInNewContext(src, context);
assert.strictEqual(settings.components.length, 1, 'Bootstrap is idempotent');
assert.strictEqual(body.children.length, 5, 'No duplicate atmosphere or skeleton layers');
console.log('PASS: v1.3.2 violet rounded focus without sparks, two skeletons, palettes, toggles and idempotency');
