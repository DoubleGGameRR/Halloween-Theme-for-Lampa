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
assert.strictEqual(settings.params.length, 5, '5 settings created');
assert.strictEqual(head.children.length, 1, 'CSS added');
assert.strictEqual(body.children.length, 2, 'Only one decoration added');
assert.strictEqual(logo.children.length, 2, 'Pumpkin replaces logo visually, original markup preserved');
assert.strictEqual(logo.children[1].className, 'hpl-pumpkin-logo', 'Correct Lampa logo selector');
assert.ok(head.children[0].textContent.indexOf('.settings__content{background:linear-gradient(') >= 0, 'Settings right panel gradient present');
assert.ok(head.children[0].textContent.indexOf('.head__logo-icon > img{opacity:0!important}') >= 0, 'Original logo hidden by reversible style');
assert.strictEqual(classes['hpl-premium-on'], true);
assert.strictEqual(classes['hpl-decor-enabled'], true);
assert.strictEqual(root.attrs['data-hpl-palette'], 'purple');

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

handlers.activity[0]();
assert.strictEqual(logo.children.length, 2, 'Logo is idempotent');
vm.runInNewContext(src, context);
assert.strictEqual(settings.components.length, 1, 'Bootstrap is idempotent');
console.log('PASS: registration, style, decoration, logo, settings toggles, palettes and idempotency');
