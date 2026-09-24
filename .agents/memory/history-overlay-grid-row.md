---
name: History overlay grid row
description: CSS grid behavior required when the first game-shell child becomes an absolute overlay.
---

When the first child of a CSS grid becomes `position: absolute`, it leaves normal grid flow and later children can occupy the first explicit row. Keep the underlying flight stage assigned to its intended row explicitly.

**Why:** Without an explicit row assignment, the flight stage collapsed into the history header row when the overlay opened, making the plane and game surface appear to disappear.

**How to apply:** For an overlay that replaces a grid child, keep the container's row sizing stable and assign the underlying stage/content `grid-row` explicitly in the responsive overlay breakpoint.