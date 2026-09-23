---
name: Aviator stage colors
description: The supplied reference frames define exact multiplier-based flight glow colors.
---

Use three fixed visual bands for the live flight stage: blue for 1.00x–1.99x, purple for 2.00x–9.99x, and pink for 10.00x and above. The glow should be bright enough to show the colored light in the radial background, not just change the multiplier text.

**Why:** The reference frames switch from blue to purple at 2.00x and from purple to pink at 10.00x; a continuous hue rotation tied to elapsed flight progress produces the wrong color at those thresholds.

**How to apply:** Derive the stage tone from the same multiplier threshold function used by history and bet labels, and style both the stage glow and its diagonal/radial light from that tone.