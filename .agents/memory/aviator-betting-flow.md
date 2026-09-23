---
name: Aviator betting flow
description: User-facing bet, live cash-out, crash loss, and win notification behavior.
---

Each bet panel owns its bet lifecycle for the current round: green idle bet, active stake before flight, live payout during flight, one-time manual cash out, or loss if the plane crashes first. A bet submitted after flight starts is a red next-round prediction that promotes to an active stake when the next round begins. A cash-out result must freeze the multiplier and payout used by the win notification.

**Why:** The reference behavior treats each panel as an independent bet while the shared flight multiplier drives the live payout.

**How to apply:** Reset or promote panel state on round changes, allow stake edits only before flight, calculate payout as stake × current multiplier, and send the frozen result to the shared top notification. Keep idle/loading green, current-round cancel/waiting red, and active cash out orange.