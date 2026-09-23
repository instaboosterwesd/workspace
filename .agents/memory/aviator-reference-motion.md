---
name: Aviator reference motion
description: The supplied Aviator video defines how the graph and plane should move together.
---

The base graph is one continuous smooth accelerating trajectory, while its live endpoint slowly cycles between an upper target and a lower target. When the live endpoint advances, the earlier path must not be rewritten into a jagged down/up dip or a backward curve. The plane stays attached to the current endpoint, while the vertical guide and filled area terminate at that same endpoint.

**Why:** The B-folder reference frames show a smooth graph system, and the supplied specification requires a slow upper-touch/lower-touch repeat. Fast oscillations or a sine-like historical path make the motion visibly different from the reference.

**How to apply:** Preserve the rising curve geometry when adjusting endpoint timing or fly-away behavior. Change only the live endpoint target and use slow easing between targets; do not add sharp corners, fast oscillations, or a separate lower curve.