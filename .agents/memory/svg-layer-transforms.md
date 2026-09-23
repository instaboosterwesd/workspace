---
name: SVG layer transforms
description: Alignment rule for separating the supplied Aviator plane SVGs into static body and animated fan layers.
---

When separating a full-plane SVG into a static body and an animated fan overlay, preserve the original transform on each extracted layer.

**Why:** The source SVG stores the plane body and fan paths in local coordinate systems. Dropping the body transform makes the plane shift or render in the wrong position even when the paths themselves are correct.

**How to apply:** Keep the original viewBox and layer transforms unchanged for all extracted body/fan assets, then stack them at identical dimensions with CSS.