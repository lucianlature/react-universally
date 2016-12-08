# [![Styletron logo](https://cdn.rawgit.com/rtsao/styletron/logo/logo.svg "Styletron")](https://github.com/rtsao/styletron)

# About

This is the `incubator/stylesheets/styletron` branch of the `react-universally` starter kit.

It provides you with the build tooling and configuration you need to kick off your next universal react project with full support for Styletron.

## What is Styletron?

[Styletron](http://styletron.js.org/) is a universal CSS-in-JS engine built from the ground up for high-performance. Features include:

#### Advanced critical rendering path optimization of server-rendered pages
- Dynamic generation of inlineable critical stylesheets with minimum possible size and parse times
  - Automatic generation of maximally compressed "atomic" critical CSS via declaration-level deduplication
  - Automatic declaration-level dead CSS elimination - only *actually used* declarations get included in output
- Native media query and pseudo selector support for full critical CSS without JavaScript

#### Efficient dynamic client-side styles
- Hyper-granular memoization to avoid making unnecessary modifications to stylesheet
- Fast cache hydration of server-rendered styles to prevent re-rendering of server-rendered styles
- Use of `CSSStyleSheet` rule injection ensuring *only* new styles get parsed
