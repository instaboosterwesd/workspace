---
name: Aviator reference motion
description: The supplied Aviator video defines how the graph and plane should move together.
---

The historical red path is one continuous rising trajectory. When the live endpoint advances, the earlier path must remain monotonic; it must not be rewritten into a down/up dip or a backward curve. The plane stays attached to the current endpoint, while the vertical guide and filled area terminate at that same endpoint.

**Why:** The reference frames around 1.62x–1.97x show the old graph continuing upward without an artificial oscillation. Adding a dip makes the motion visibly different from the supplied video.

**How to apply:** Preserve the existing rising path geometry when adjusting endpoint timing or fly-away behavior. Only change the live endpoint and viewport/reset behavior unless a new reference explicitly shows a different path.