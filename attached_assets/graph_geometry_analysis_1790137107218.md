# Graph Geometry Analysis — Reference Video

## Source
- Video: `Screen Recording 2026-09-23 071154.mp4`
- Video resolution: **1394 × 644 px**
- Frame rate: **30 FPS**
- Total frames: **744**
- Duration: **24.8 s**

## Coordinate system
All coordinates below use the original video frame:
- `(0,0)` = top-left corner.
- `X` increases to the right.
- `Y` increases downward.

## Main graph box / plotting region

The visible red graph starts approximately at:
- Start/baseline: **X ≈ 42, Y ≈ 574**
- Baseline runs horizontally from approximately **X = 42** toward the right.
- The graph's active right edge is the vertical red fill boundary.

At the 2.00x reference state:
- Right boundary: **X ≈ 1222**
- Baseline: **Y ≈ 574**
- Effective graph width: **1222 − 42 = 1180 px**
- Effective filled-area height at the endpoint: **574 − 184 ≈ 390 px**

So the active graph region at 2.00x is approximately:
**1180 × 390 px**

This is not a geometric square; it is a rectangular plotting region inside the larger 1394×644 video frame.

## 1.70x target

Reference frame is approximately frame **320–321**.

Observed target:
- Multiplier: approximately **1.69–1.70x**
- Graph endpoint X: **≈ 1074 px**
- Graph endpoint Y: **≈ 109–115 px**
- Baseline Y: **≈ 574 px**

Relative to graph start `(42,574)`:
- ΔX ≈ **1032 px**
- ΔY ≈ **−459 to −465 px**

Approximate endpoint position:
**(1074, 110)**

Approximate active graph rectangle at this point:
- Width ≈ **1032 px**
- Height ≈ **464 px**

## 2.00x target

Reference frame is approximately frame **398–400**.

Observed target:
- Multiplier: **2.00x**
- Graph endpoint X: **≈ 1222 px**
- Graph endpoint Y: **≈ 184 px**

Relative to graph start `(42,574)`:
- ΔX ≈ **1180 px**
- ΔY ≈ **−390 px**

Approximate endpoint position:
**(1222,184)**

## Important implementation interpretation

The endpoint is the point where these three things meet:
1. The visible red curve.
2. The top of the vertical red fill boundary.
3. The airplane's tracking position.

The airplane itself extends beyond the mathematical endpoint, so its visual bounding-box edge should NOT be treated as the graph coordinate.

Use the curve/fill intersection as the authoritative `(X,Y)` endpoint.

## Curve tangent angle

The angle is measured from the positive X-axis, with the screen Y-axis inverted.

Approximate local tangent near the endpoint:
- At **1.70x:** about **39.5° upward**
- At **2.00x:** about **31.3° upward**

Equivalent screen-space slopes:
- 1.70x: `dy/dx ≈ -0.82`
- 2.00x: `dy/dx ≈ -0.61`

The curve therefore becomes visually less steep near the 2.00x endpoint than it is near the 1.70x endpoint.

## Normalized coordinates

Using the full 1394×644 frame:

### 1.70x
- X: `1074 / 1394 ≈ 77.0%`
- Y: `110 / 644 ≈ 17.1%`

### 2.00x
- X: `1222 / 1394 ≈ 87.7%`
- Y: `184 / 644 ≈ 28.6%`

## Key rule

Do not hard-code the airplane position independently from the graph.

The graph endpoint should be the source of truth, and:
- airplane position,
- red fill boundary,
- multiplier progression

must all derive from the same animation progress.
