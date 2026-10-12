# 🎃 Halloween Theme for Lampa — Premium Edition

A lightweight, autumn/Halloween-inspired visual theme for **Lampa** on Smart TV (including Samsung Tizen) and browser versions.

## What it changes

- Premium near-black, purple and pumpkin-orange palette
- Focus glow on selected movie cards and buttons
- Refined menus, settings screens and labels
- Decorative hanging spider with spiderweb (inline SVG)
- Halloween pumpkin emblem next to Lampa's **internal header logo**, when supported by the current Lampa layout
- A dedicated **Halloween Premium** settings section: main switch, color palette, spider/web, animation and internal logo emblem

The plugin **does not change the Samsung home-screen/system app icon**. It does not patch media playback or request remote resources.

## Installation

1. Open Lampa → **Настройки** → **Плагины / Расширения** → **Добавить плагин**.
2. Paste the **direct HTTPS URL to the `.js` file**, not the GitHub repository page:

```text
https://raw.githubusercontent.com/DoubleGGameRR/Halloween-Theme-for-Lampa/main/halloween-theme.js
```

3. Confirm and restart Lampa if asked.
4. Open Settings → **Halloween Premium** to adjust the theme.

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
