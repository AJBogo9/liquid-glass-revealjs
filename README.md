# Liquid Glass — RevealJS Theme for Quarto

A Quarto extension that brings Apple's [Liquid Glass](https://developer.apple.com/design/) aesthetic to RevealJS presentations.

Each content slide's text floats in a frosted glass panel over a full-bleed background image. A blurred background layer fades in on content slides and out on the title slide, giving the presentation a sense of depth and materiality.

## Install

```bash
quarto add AJBogo9/liquid-glass-revealjs
```

## Usage

```yaml
---
title: "My Presentation"
format:
  liquid-glass-revealjs:
    slide-number: true
    include-in-header:
      text: |
        <style>
          :root {
            --lg-bg-image: url('your-image.jpg');
          }
        </style>
---
```

## Customisation

All design values are CSS custom properties. Override any of them via `include-in-header` without touching the extension files.

| Variable | Default | Description |
|---|---|---|
| `--lg-bg-image` | sample Unsplash photo | Background image URL |
| `--lg-panel-width` | `72%` | Width of the glass panel |
| `--lg-panel-padding` | `1.8em 2.4em` | Padding inside the panel |
| `--lg-radius` | `24px` | Corner radius (Apple-style) |
| `--lg-bg-blur` | `52px` | Blur amount on the background layer |
| `--lg-bg-brightness` | `0.88` | Brightness of the blurred background layer |
| `--lg-panel-brightness` | `0.62` | Additional brightness darkening applied by the glass panel |
| `--lg-tint` | `rgba(255,255,255,0.11)` | Tint overlay colour on the panel |
| `--lg-border` | `rgba(255,255,255,0.40)` | Glass rim colour |
| `--lg-highlight` | `rgba(255,255,255,0.85)` | Specular highlight at top of panel |
| `--lg-shadow` | deep drop shadow | Box shadow |
| `--lg-heading-color` | light blue-white | Slide heading colour |
| `--lg-text-color` | soft blue-white | Body text colour |
| `--lg-strong-color` | bright blue | `**bold**` text colour |
| `--lg-accent-color` | blue | Bullet accent colour on list items |

Full list in [`_extensions/liquid-glass/liquid-glass.css`](_extensions/liquid-glass/liquid-glass.css).

## How it works

1. The JS plugin injects a `.lg-bg` div into the viewport. It preloads the image from `--lg-bg-image` and fades the div in once loaded, eliminating any flash on page load.
2. The JS plugin also injects a `.lg-blurred-bg` div carrying its own copy of the image with `filter: blur() brightness()` applied.
3. On content slides, `.lg-blur-active` is toggled on the viewport, fading the blurred layer in with a CSS transition. It fades back out on the title slide.
4. The JS plugin wraps each content slide's children in a `.glass-panel` div.
5. `.glass-panel` applies `backdrop-filter: brightness()` to darken the blurred image behind it, ensuring text contrast.
6. A `::before` pseudo-element adds the glass rim (border + specular highlight at the top edge); a `::after` adds the tint colour and sheen gradient.

## Requirements

- Quarto >= 1.3.0
- A Chromium-based browser for `backdrop-filter` support (Firefox requires `layout.css.backdrop-filter.enabled`)

## License

MIT — see [LICENSE](LICENSE).
