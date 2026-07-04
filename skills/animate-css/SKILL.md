---
name: animate-css
description: Reference for Animate.css v4.1.1 — the ready-to-use CSS animation library. Use when adding entrance/exit/attention animations to a web UI with plain CSS classes (no JS library), when the user mentions animate.css or `animate__` classes, or when picking a named CSS keyframe animation (fadeIn, bounce, zoomIn, slideInUp, flip, etc.). Covers install (CDN/npm/import), the full class API, timing/delay/repeat utilities, JS trigger patterns, scroll-triggered reveals, and reduced-motion accessibility. Not a spring/physics or timeline library — for that use Motion/GSAP.
license: MIT
---

# Animate.css (v4.1.1)

Animate.css is a library of **ready-made CSS keyframe animations**. You add two classes to an element and it plays. No JavaScript required to run an animation; JS is only needed to *trigger* one on an event.

Upstream: https://github.com/animate-css/animate.css · Docs: https://animate.style

## Critical: the `animate__` prefix (v4+)

Since v4, **every class is namespaced with `animate__`**. This is the #1 mistake — v3 tutorials omit it and the animation silently does nothing.

```html
<!-- ✅ v4 (correct) -->
<h1 class="animate__animated animate__bounce">Hi</h1>

<!-- ❌ v3 (won't work with a v4 stylesheet) -->
<h1 class="animated bounce">Hi</h1>
```

Base class `animate__animated` is **always required**; add one animation-name class (`animate__bounce`) and optionally utility classes.

## Install

**CDN (fastest, no build):**
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
```

**npm:**
```bash
npm install animate.css
```
```js
import 'animate.css';           // in a bundler entry (Vite/webpack/Next)
```

**Self-hosted:** copy `animate.min.css` into your project and `<link>` it.

## Class API

```
animate__animated  animate__<name>  [utilities…]
```

### Utilities (combine freely with the name class)

| Class | Effect |
| --- | --- |
| `animate__infinite` | Loop forever |
| `animate__repeat-1/2/3` | Repeat N× (× `--animate-repeat`) |
| `animate__delay-1s`…`delay-5s` | Start delay (× `--animate-delay`) |
| `animate__faster` | 0.5× duration (~500ms) |
| `animate__fast` | 0.8× duration (~800ms) |
| `animate__slow` | 2× duration (~2s) |
| `animate__slower` | 3× duration (~3s) |

```html
<div class="animate__animated animate__fadeInUp animate__delay-2s animate__slow">…</div>
```

### Global tuning via CSS variables

Override the knobs instead of fighting specificity:

```css
:root {
  --animate-duration: 1s;   /* base for all animations + fast/slow multipliers */
  --animate-delay: 1s;      /* base for delay-*s */
  --animate-repeat: 1;      /* base for repeat-* */
}
/* Per-element is fine too: */
.my-el { --animate-duration: 300ms; }
```

## All animations (75 names, by category)

**Attention seekers** (loop-friendly, no enter/exit): `bounce` `flash` `pulse` `rubberBand` `shakeX` `shakeY` `headShake` `swing` `tada` `wobble` `jello` `heartBeat`

**Back** — entrances: `backInDown` `backInLeft` `backInRight` `backInUp` · exits: `backOutDown` `backOutLeft` `backOutRight` `backOutUp`

**Bouncing** — entrances: `bounceIn` `bounceInDown` `bounceInLeft` `bounceInRight` `bounceInUp` · exits: `bounceOut` `bounceOutDown` `bounceOutLeft` `bounceOutRight` `bounceOutUp`

**Fading** — entrances: `fadeIn` `fadeInDown` `fadeInDownBig` `fadeInLeft` `fadeInLeftBig` `fadeInRight` `fadeInRightBig` `fadeInUp` `fadeInUpBig` `fadeInTopLeft` `fadeInTopRight` `fadeInBottomLeft` `fadeInBottomRight` · exits: `fadeOut` `fadeOutDown` `fadeOutDownBig` `fadeOutLeft` `fadeOutLeftBig` `fadeOutRight` `fadeOutRightBig` `fadeOutUp` `fadeOutUpBig` `fadeOutTopLeft` `fadeOutTopRight` `fadeOutBottomLeft` `fadeOutBottomRight`

**Flippers**: `flip` `flipInX` `flipInY` `flipOutX` `flipOutY`

**Light speed** — entrances: `lightSpeedInRight` `lightSpeedInLeft` · exits: `lightSpeedOutRight` `lightSpeedOutLeft`

**Rotating** — entrances: `rotateIn` `rotateInDownLeft` `rotateInDownRight` `rotateInUpLeft` `rotateInUpRight` · exits: `rotateOut` `rotateOutDownLeft` `rotateOutDownRight` `rotateOutUpLeft` `rotateOutUpRight`

**Sliding** — entrances: `slideInDown` `slideInLeft` `slideInRight` `slideInUp` · exits: `slideOutDown` `slideOutLeft` `slideOutRight` `slideOutUp`

**Zooming** — entrances: `zoomIn` `zoomInDown` `zoomInLeft` `zoomInRight` `zoomInUp` · exits: `zoomOut` `zoomOutDown` `zoomOutLeft` `zoomOutRight` `zoomOutUp`

**Specials**: `hinge` `jackInTheBox` `rollIn` `rollOut`

(All used prefixed: `animate__fadeInUp`, `animate__zoomIn`, …)

## Triggering with JavaScript

Animate.css runs on class add. To play on an event, add the classes then clean up on `animationend` so it can replay later. Official helper:

```js
const animateCSS = (element, animation, prefix = 'animate__') =>
  new Promise((resolve) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);
    node.classList.add(`${prefix}animated`, animationName);
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }
    node.addEventListener('animationend', handleAnimationEnd, { once: true });
  });

// animateCSS('.my-element', 'bounce');
```

### Scroll-triggered reveal (IntersectionObserver)

The idiomatic modern pattern — animate elements as they enter the viewport, once:

```js
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add('animate__animated', 'animate__fadeInUp');
      io.unobserve(e.target);            // play once
    }
  }
}, { threshold: 0.2 });
document.querySelectorAll('[data-animate]').forEach(el => io.observe(el));
```
```html
<section data-animate class="animate__slow">…</section>
```

## Usage guidance (taste)

- **Entrances/exits are for state changes**, not decoration. Match direction to meaning: content coming from below → `fadeInUp`; a toast from the right → `slideInRight` / `slideOutRight` (same axis in and out).
- **Keep it fast.** Default 1s is slow for UI. Set `--animate-duration: 300–500ms` (or use `animate__faster`) for anything users see often. See [[emil-design-eng]] for the full duration/easing framework.
- **`animate__fill-mode: both` is built in** — the element holds its start state before and end state after, so no flash.
- **Attention seekers loop well** (`animate__infinite`) but use sparingly — constant motion near text is fatiguing and reads as spam.
- **Exit then remove.** For exits, listen for `animationend` before removing the node from the DOM, or it vanishes mid-animation.
- **Not a physics engine.** Animate.css is fixed keyframes — no spring, no interruption/retargeting, no gesture-driven values. For interruptible or spring motion use Motion (Framer Motion) or GSAP.

## Accessibility (built in)

The stylesheet already ships a reduced-motion guard — under `prefers-reduced-motion: reduce` (and when printing) durations collapse to ~1ms and loops stop, while `*Out` animations still end hidden. **Don't defeat it** with `!important` overrides. If you add your own motion around Animate.css, mirror the same media query.

```css
@media (prefers-reduced-motion: reduce) {
  /* your extra motion: none */
}
```

## Common pitfalls

| Symptom | Cause / fix |
| --- | --- |
| Nothing animates | Missing `animate__animated`, or dropped the `animate__` prefix (v3 syntax) |
| Can't replay on hover | Old animation classes still present — remove them on `animationend` first |
| Element flashes then jumps | You removed it from the DOM before the exit finished |
| Too slow / too fast | Set `--animate-duration`, or add `animate__faster` / `animate__slow` |
| Works once, never again | Same as replay — clean up the classes after each run |
