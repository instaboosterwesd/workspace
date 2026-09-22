# Fan animation and private GitHub sync

## Changes
- Confirm which uploaded SVG is the small, medium, and large fan frame.
- Run the frames continuously in exact small → medium → large order at a clearly visible animation speed.
- Verify all three frames repeat in the live game without visual errors.
- Keep the GitHub repository private and use the project name **Game Dev**; confirm the existing sync status and explain any account-side action still required.

## Technical details
- Use a dedicated frame counter instead of tying the fan to the flight movement timer, so every frame appears evenly and repeatedly.
- Preserve all other game timing and visuals.
