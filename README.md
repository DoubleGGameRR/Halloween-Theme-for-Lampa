# 🎃 Halloween Theme for Lampa — Premium Edition

A lightweight, autumn/Halloween-inspired visual theme for **Lampa** on Smart TV (including Samsung Tizen) and browser versions.

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

Version **1.2.0** uses the same right settings panel gradient on the left menu and includes four in-app pumpkin icons and atmospheric header artwork.

The plugin **does not change the Samsung home-screen/system app icon**. It does not patch media playback or request remote resources.

## Installation / Update from 1.1

1. Open Lampa → **Настройки** → **Плагины / Расширения**.
2. Remove the previous URL for `halloween-theme.js` or `halloween-premium-v1.1.js` if present. **Do not keep both**: they share the same plugin identifier and would conflict.
3. Use the new fixed URL below. Keeping the file name versioned also avoids stale jsDelivr caches:

```text
https://cdn.jsdelivr.net/gh/DoubleGGameRR/Halloween-Theme-for-Lampa@main/halloween-premium-v1.2.js
```

4. Confirm and fully restart Lampa.
5. Open **Settings → Halloween Premium** and choose **Вид тыквы** for one of four artworks, or toggle **Луна, летучие мыши и туман**.

The main development file `halloween-theme.js` is also maintained, but its stable URL can temporarily serve cached old versions. The versioned link above is recommended on TV.

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

- **1.2.0** — left menu matches right panel, accessible focus contrast, 4 selectable pumpkins, atmospheric moon/bats/mist with an independent toggle.
- **1.1.0** — replaces the actual header logo with a scary pumpkin; reworked right settings panel.
- **1.0.0** — first public release.

### Cache note

If you installed a prior pinned URL such as `halloween-premium-v1.1.js`, you **must** remove it and install the `halloween-premium-v1.2.js` URL instead. Fully exit Lampa after changing installed plugins.
