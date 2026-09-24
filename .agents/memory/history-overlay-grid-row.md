---
name: History overlay grid row
description: CSS grid behavior required when the first game-shell child becomes an absolute overlay.
---

When the first child of a CSS grid becomes `position: absolute`, it leaves normal grid flow and later children can occupy the first explicit row. Keep the underlying flight stage assigned to its intended row explicitly.

**Why:** Without an explicit row assignment, the flight stage collapsed into the history header row when the overlay opened, making the plane and game surface appear to disappear.

**How to apply:** For an overlay that replaces a grid child, keep the container's row sizing stable and assign the underlying stage/content `grid-row` explicitly in the responsive overlay breakpoint.

The overlay also must not be trapped inside an isolated parent stacking context when it needs to paint over a sticky header; remove that responsive isolation or give the parent an intentional stacking level.

**Why:** A high child z-index cannot escape an ancestor stacking context, so the sticky topbar could still paint above the history panel during page scroll.

**How to apply:** Keep the flight stage's own isolation for its internal artwork, but let the history overlay participate in the page-level stacking order with a higher z-index than the sticky header.