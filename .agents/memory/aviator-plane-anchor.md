---
name: Aviator plane anchor
description: The plane and live graph endpoint must remain visually attached during flight updates.
---

The flight plane's lower/rear anchor is intentionally aligned to the live curve endpoint. Do not animate its `left` or `bottom` position with a CSS transition; the curve updates immediately and a position transition introduces visible vertical or horizontal drift.

**Why:** The reference keeps the red wave attached to the aircraft at every point. A short position transition makes the plane lag behind the curve while the endpoint moves.

**How to apply:** Keep the existing plane asset anchor transform and update the plane position directly from the same endpoint state that drives the curve and fill. Only the plane's frame artwork may animate.

When the red line needs a visual correction into the aircraft, keep the original cubic curve ending at the live endpoint and append a short straight SVG line segment to the corrected underside point. In the supplied rear-plane frame, that connector turns slightly up-right into the rear hook, not down-right below the aircraft. Do not replace the cubic endpoint alone, because that leaves the old control point behind and creates a visible kink.

**Why:** The reference connection is a direct straight attachment from the lower-left track into the plane's rear underside hook; a downward connector reads as detached below the aircraft.

**How to apply:** Use the live curve endpoint for the cubic path, then add the independent line endpoint with `L` for both the stroked path and the filled area.