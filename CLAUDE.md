# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Quarto extension (`liquid-glass-revealjs`) that applies an Apple-inspired frosted glass aesthetic to RevealJS presentations. It is a pure frontend extension: no build step, no package manager, no test suite.

## Developing and previewing

```bash
# Render and open the example presentation
quarto preview example.qmd
```

To test the extension end-to-end, render `example.qmd` using the local `_extensions/` directory. Changes to CSS, JS, or HTML files in `_extensions/liquid-glass/` take effect on the next render or hot-reload.

## Extension structure

The extension lives entirely in `_extensions/liquid-glass/`:

- `_extension.yml` -- declares the format (`liquid-glass-revealjs`), injects the CSS theme, JS file, and the two HTML fragments
- `liquid-glass-head.html` -- injected into `<head>`: sets the dark page background to prevent white flash before the image loads
- `liquid-glass-init.html` -- injected at end of `<body>`: loads `liquid-glass.js` and registers the RevealJS plugin
- `liquid-glass.js` -- the RevealJS plugin; runs at deck init to inject background layers (`.lg-bg`, `.lg-blurred-bg`), wrap slide content in `.glass-panel` divs, and toggle `.lg-blur-active` on slide change
- `liquid-glass.css` -- all visual styling; CSS custom properties beginning with `--lg-` are the public API

## Key design constraints

**CSS custom properties are the public API.** Users override `--lg-*` variables via `include-in-header` without touching extension files. Do not hard-code values that belong as variables.

**Layer z-index ordering (bottom to top):**
1. `.lg-blurred-bg` (z-index 0, inserted first)
2. `.lg-bg` (z-index 0, inserted second via `insertBefore`, sits above blurred layer)
3. `.reveal` (z-index 1, always above both background layers)
4. `.glass-panel::after` (z-index 0, tint/sheen)
5. `.glass-panel > *` (z-index 1, slide content)
6. `.glass-panel::before` (z-index 2, rim/border overlay)

**Firefox fallback:** `backdrop-filter` is disabled by default in Firefox. The `@supports not (backdrop-filter: brightness(1))` block in the CSS provides a semi-transparent dark background fallback so text stays readable.

**Image preloading:** `.lg-bg` starts at `opacity: 0` and transitions to `opacity: 1` only after the image `onload` fires (via the `lg-bg-loaded` class). This prevents the white flash on initial load.

**Title slide is special:** Identified by `id="title-slide"` or class `quarto-title-block`. It gets a `.glass-panel` wrapper but does NOT get `.lg-blur-active` on the viewport. The blurred background fades out when on the title slide.

## Publishing

The extension is distributed via `quarto add AJBogo9/liquid-glass-revealjs`. Version is set in `_extension.yml`. There is no npm publish or build step.
