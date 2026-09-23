# Graph Repeat / Animation Behavior

## What the supplied video actually contains

The supplied reference video shows **one continuous graph run**.

It does NOT contain repeated:
`1.70x → 2.00x → 1.70x → 2.00x`

cycles.

Instead, the observed run progresses continuously through values such as:
- ~1.26x
- ~1.43x
- ~1.62x
- ~1.69x
- **2.00x**
- ~2.10x
- ~3.09x
- **3.89x**
- then `FLEW AWAY!`

Therefore:

**Observed repeat count in the source video: 0 complete up/down repeats.**

There is one continuous upward graph traversal.

---

## Required behavior for the new animation

If the purpose is to reuse the measured 1.70x and 2.00x states as a repeating animation, implement the cycle as:

```text
START
  ↓
smooth curve toward 1.70x target
  ↓
TOUCH 1.70x target
  ↓
smooth transition toward 2.00x target
  ↓
TOUCH 2.00x target
  ↓
smooth transition back toward 1.70x target
  ↓
TOUCH 1.70x target
  ↓
repeat
```

Recommended repeat mode:

**INFINITE LOOP**

Do not add a fixed number of repetitions unless specifically required.

---

## Target states

### State A — 1.70x
Endpoint:
`(1074,110)`

Tangent:
`~39.5° upward`

### State B — 2.00x
Endpoint:
`(1222,184)`

Tangent:
`~31.3° upward`

---

## Important: do not move the entire graph box

The animation should NOT be implemented by translating the entire rectangular graph container up/down.

Instead, animate the **curve endpoint and curve geometry**.

At every frame:

1. Calculate the current curve endpoint.
2. Draw the red curve up to that endpoint.
3. Draw the red filled area underneath the same curve.
4. Position the airplane at the endpoint.
5. Update the multiplier from the same progress value.

All five elements must remain synchronized.

---

## Smoothness requirements

Use a smooth interpolation/easing function.

Avoid:
- teleporting,
- abrupt vertical movement,
- straight-line endpoint travel,
- visible kinks,
- separate unsynchronized airplane movement,
- fill lag,
- multiplier jumps.

The path should continuously resemble the original accelerating mathematical curve.

---

## Recommended cycle timing

The source video runs at 30 FPS.

For a visually smooth repeating animation, use approximately:

- 1.70x → 2.00x: **1.0–1.5 seconds**
- 2.00x → 1.70x: **1.0–1.5 seconds**
- optional brief hold at each target: **0.10–0.20 seconds**

These timings are implementation recommendations, not measurements from the source video.

---

## Final cycle

```text
             TARGET A
             1.70x
               ●
              /              /               /                /       START ●───/         \───● TARGET B
                       2.00x
                                                                              ↘
                         back to A

Repeat indefinitely.
```

The actual curve must remain smooth; the ASCII diagram is only a behavior description.
