---
name: Aviator reference motion
description: The supplied Aviator video defines how the graph and plane should move together.
---

The base graph is one continuous smooth accelerating trajectory, while its live endpoint slowly cycles between an upper target and a lower target. When the live endpoint advances, the earlier path must not be rewritten into a jagged down/up dip or a backward curve. The plane stays attached to the current endpoint, while the vertical guide and filled area terminate at that same endpoint.

**Why:** The B-folder reference frames show a smooth graph system, and the supplied specification requires a slow upper-touch/lower-touch repeat. Fast oscillations or a sine-like historical path make the motion visibly different from the reference.

**How to apply:** Preserve the rising curve geometry when adjusting endpoint timing or fly-away behavior. Use the annotated yellow-dot path as the visual anchor: the initial rise should reach the upper touch at about 1.70x. Change only the live endpoint target and use slow easing between targets; do not add sharp corners, fast oscillations, or a separate lower curve.

The measured repeat states are upper 1.70x at normalized `(x=0.770, y=0.171)` with screen slope about `-0.82`, and lower 2.00x at `(x=0.877, y=0.286)` with screen slope about `-0.61`. Both X and Y must animate between them.

**Why:** The geometry notes identify the curve/fill intersection as the authoritative endpoint; the airplane must derive from that point rather than using an independent position.

**How to apply:** Keep these target coordinates and endpoint slopes as the responsive reference anchors. Use one continuous curve geometry for each current endpoint, and derive the red fill edge, airplane, and multiplier from the same state.