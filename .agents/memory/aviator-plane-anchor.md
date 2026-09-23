---
name: Aviator plane anchor
description: The plane and live graph endpoint must remain visually attached during flight updates.
---

The flight plane's lower/rear anchor is intentionally aligned to the live curve endpoint. Do not animate its `left` or `bottom` position with a CSS transition; the curve updates immediately and a position transition introduces visible vertical or horizontal drift.

**Why:** The reference keeps the red wave attached to the aircraft at every point. A short position transition makes the plane lag behind the curve while the endpoint moves.

**How to apply:** Keep the existing plane asset anchor transform and update the plane position directly from the same endpoint state that drives the curve and fill. Only the plane's frame artwork may animate.