---
name: Aviator betting flow
description: User-facing bet, live cash-out, crash loss, and win notification behavior.
---

Each bet panel owns its bet lifecycle for the current round: stake before flight, live payout during flight, one-time manual cash out, or loss if the plane crashes first. A cash-out result must freeze the multiplier and payout used by the win notification.

**Why:** The reference behavior treats each panel as an independent bet while the shared flight multiplier drives the live payout.

**How to apply:** Reset panel bet state on round changes, allow stake edits only before flight, calculate payout as stake × current multiplier, and send the frozen result to the shared top notification.