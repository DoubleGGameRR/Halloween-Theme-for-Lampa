# 🎃 Halloween Theme for Lampa — Premium Edition

## Halloween Premium 1.3.3 — full-width candy garland and bigger pumpkin logo

A new **wide decoration band inside the Lampa interface**, directly below the TV navigation header:

- Purple cobweb fans on the left and right edges
- Curved strings of orange lantern lights, wrapped purple/orange sweets, candy corn and a spiral lollipop
- Tiny hanging jack-o'-lanterns and flying bats
- Decoration stretches across the whole header strip, rather than occupying only the center
- Internal top-left jack-o'-lantern logo increased to **143%** of the previous visual size without changing the Samsung home-screen app icon
- **Настройки → Halloween Premium → Гирлянда, паутина и конфеты сверху** toggles the new ornament independently

The older moon/castle header artwork is automatically hidden while the garland is enabled, so the two drawings don't pile on top of each other. All graphics are inline SVG, no external assets, and the strip has `pointer-events: none` so remote navigation remains unaffected.

**New TV installation URL:**

```text
https://cdn.jsdelivr.net/gh/DoubleGGameRR/Halloween-Theme-for-Lampa@main/halloween-premium-v1.3.3.js
```

Remove the old Halloween plugin URL first, add the new one and fully restart Lampa. Keep **only one** Halloween version installed.


## Halloween Premium 1.3.2 — Focus cleanup + scary skeletons

- **No sparkles**: removes both previous CSS sparkle implementations and animation keyframes.
- **No square orange outline**: Lampa's original rounded poster geometry is retained, highlighted with a single purple rounded border and a subtle violet glow.
- **Two skeletons**: slender bony skeletons with glowing orange eyes peek from the lower left and right screen edges, rendered as inline SVGs with no downloads or external dependencies.
- **Samsung-friendly**: rare, slow rotations; the performance Eco option or system reduced-motion settings stop their animations.
- **Individual toggle**: **Настройки → Halloween Premium → Два страшных скелета**, enabled by default. All existing atmosphere modes and pumpkin icons remain available.

**Install (remove the earlier Halloween plugin first):**

```text
https://cdn.jsdelivr.net/gh/DoubleGGameRR/Halloween-Theme-for-Lampa@main/halloween-premium-v1.3.3.js
```

The previous versioned scripts remain intact for rollback. Do not install several Halloween script URLs at the same time.


A lightweight, autumn/Halloween-inspired visual theme for **Lampa** on Smart TV (including Samsung Tizen) and browser versions.

## v1.3.1 fix for Samsung

Based on real TV feedback: the old atmospheric modes were barely distinguishable and card sparkles too small. **1.3.1** fixes these issues:

- **Mystic** = rich violet panels and moonlight, **Cozy** = amber/brown fall palette, **Horror** = crimson/dark red throughout both navigation panels and header. Switching modes immediately changes large UI surfaces.
- Film focus now gets a **strong double ring and six bright TV-sized sparkles** that extend past the poster. They pulse gently in the Samsung-balanced profile; Eco keeps them still.
- Removed the boxy castle and flying witch; replaced them with a subtle **moonlit bare-tree forest** with light tracery and bats.
- The former “Замок и ведьма в шапке” option is now named “Ночной лес в шапке” and keeps using the prior stored toggle value.
- No network assets, playback changes or dependencies.

**New installation URL (remove the older 1.3 URL first):**

```text
https://cdn.jsdelivr.net/gh/DoubleGGameRR/Halloween-Theme-for-Lampa@main/halloween-premium-v1.3.3.js
```

**Important:** only install *one* Halloween Theme JS file at a time. Keep the previous `halloween-premium-v1.3.js` if you wish to roll back.

## What's new in v1.3 — Mystic Halloween

**Mystic Halloween is enabled by default.** All decorations are bundled into one JavaScript file; there are no remote images, libraries, analytics or timers.

1. **Mystic ambient background** — violet haze, tiny orange light points and faint border glow, with the actual film posters kept readable.
2. **Occasional ghost** — a ghost peeks from the left edge once per animation cycle; existing spider remains, with a longer, subtler sway.
3. **Magical film-card focus** — double orange/purple ring and very small static sparks; extra sparkle movement is only enabled in Full effects mode.
4. **Haunted top header** — moon, bats, Gothic castle, flying witch and mist. The castle and witch have their own toggle.
5. **Unified Lampa windows** — search, selection boxes, movie details, episodes, settings and popup dialogs, using verified Lampa selectors.

**Performance:** the default *Сбалансировано (Samsung)* mode keeps only a few gentle transform/opacity animations. *Экономный* disables decoration motion; *Больше анимации* enables additional movement. CSS respects `prefers-reduced-motion` when available. No video/player functions are changed. Some third-party plugin dialogs may have different class names and keep their own appearance.

Settings → Halloween Premium contains the atmosphere mode (Mystic default, Cozy or Horror) and individual toggles for fog, ghost, card glow, castle, windows and performance, plus the original four pumpkin logo options.

## What it changes

- **v1.2:** matching purple gradients across both navigation panels; high-contrast focus text and icons
- **v1.2:** four selectable header pumpkins (Evil, Classic, Burning, Haunted) in Settings → Halloween Premium → Вид тыквы
- **v1.2:** optional moon, bats and drifting mist at the center of the top edge
- Premium near-black, purple and pumpkin-orange palette
- Focus glow on selected movie cards and buttons
- Consistent deep-purple **right settings panel** and refined menus and labels
- Decorative hanging spider with spiderweb (inline SVG)
- A scary orange jack-o-lantern that **replaces the Lampa icon in the app header** (not the Samsung system app icon)
- A dedicated **Halloween Premium** settings section: main switch, color palette, spider/web, animation and internal logo emblem

Version **1.3.0** adds Mystic fog, ghost, Gothic castle/witch, premium card focus and theming across Lampa windows while keeping all v1.2 controls.

The plugin **does not change the Samsung home-screen/system app icon**. It does not patch media playback or request remote resources.

## Install / update to v1.3 (Samsung / Tizen)

1. In Lampa open **Настройки → Плагины**, remove the **older Halloween URL** (`halloween-theme.js`, `halloween-premium-v1.1.js`, `halloween-premium-v1.2.js`, `halloween-premium-v1.3.js` or `halloween-premium-v1.3.1.js` or `halloween-premium-v1.3.2.js`). Keeping multiple versions is unsupported: all of them use the same plugin ID.
2. Add this single HTTPS URL:

```text
https://cdn.jsdelivr.net/gh/DoubleGGameRR/Halloween-Theme-for-Lampa@main/halloween-premium-v1.3.3.js
```

3. Fully close and reopen Lampa.
4. Go to **Настройки → Halloween Premium** and select **Mystic Halloween** (the default). Adjust individual effects if needed.

The versioned filename prevents collisions with cached copies of v1.3. CDN propagation may still take a little time. If the theme feels slow, set **Производительность → Экономный**.

**Rollback:** remove the v1.3 plugin URL and install the previous [v1.2 file](https://cdn.jsdelivr.net/gh/DoubleGGameRR/Halloween-Theme-for-Lampa@main/halloween-premium-v1.2.js).

### Why not use GitHub Raw directly on TV?

GitHub Raw sends the file with the plain-text MIME type. Some Tizen/Chromium-based TV apps block it when loaded as a `<script>`. jsDelivr serves the same public GitHub file with the correct JavaScript Content-Type. The repository remains the single source of truth.

Alternative CDN endpoint if jsDelivr is temporarily unavailable:

```text
https://raw.githack.com/DoubleGGameRR/Halloween-Theme-for-Lampa/main/halloween-theme.js
```

Both CDN URLs reference the public repository. CDN caches can delay plugin updates.

## TV compatibility

- Written in ES5-compatible JavaScript, without modules or third-party libraries.
- Visuals use inline SVG and small CSS animations; no asset downloads.
- A light animation can be disabled on lower-powered TVs.
- Tries to avoid styling embedded players; CSS targets Lampa UI elements.
- Tested statically with Node.js and a mocked Lampa environment. **Real hardware testing on Lampa 3.3.5 / Samsung Tizen remains necessary** because custom forks can use different CSS selectors.

## Removing/reverting

Toggle **Halloween Premium → Включить Halloween Premium** off, or remove its URL from installed Lampa plugins. The original styles and header artwork are preserved.

If your Lampa version does not expose SettingsApi, the main theme still initializes but the settings pane may be unavailable. In that case remove the plugin using Lampa's plugins menu.

## Privacy and safety

No analytics, ads, trackers, fetch calls, cookies, credentials, network requests or external URLs are used at runtime.

## Tests

Run `node tests/smoke.js` to verify settings, focus effects, logo initialization, toggles and repeated initialization in a mocked DOM. This does not replace testing on a real TV.

## License

MIT — see [LICENSE](LICENSE).

### Changelog

- **1.3.3** — full-width Halloween candy web garland beneath the navigation header, 43% larger pumpkin logo and a separate toggle.
- **1.3.2** — removes sparks/orange square outline, retains rounded violet poster focus, adds two scary skeletons and a visibility toggle.
- **1.3.1** — visible atmosphere mode palettes, stronger card sparkles, moonlit forest instead of ugly castle/witch.
- **1.3.0** — Mystic animated background, occasional ghost, enhanced card focus, castle/witch in header and unified search/full/season/dialog styling.
- **1.2.0** — left menu matches right panel, accessible focus contrast, 4 selectable pumpkins, atmospheric moon/bats/mist with an independent toggle.
- **1.1.0** — replaces the actual header logo with a scary pumpkin; reworked right settings panel.
- **1.0.0** — first public release.

### Cache note

If you installed a prior pinned URL such as `halloween-premium-v1.3.js`, remove it and install `halloween-premium-v1.3.1.js` instead. Fully exit Lampa after changing installed plugins.
