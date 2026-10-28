# Stock clip renderer (GSAP edition)

20 text-free, seamless-loop 15 s background concepts (1920x1080, 30 fps = 450 frames). The timeline engine is GSAP 3.15
(`gsap.min.js`); every clip is a paused GSAP timeline that the renderer seeks frame by frame.

| # | Concept | # | Concept |
|---|---------|---|---------|
| 1 | Golden stars + glitter pattern | 11 | Hexagon grid energy ripples |
| 2 | Sun flare, golden dust, lens flare | 12 | Neon kaleidoscope mandala |
| 3 | Red Christmas bokeh + gold glitter | 13 | Spiral galaxy star dust |
| 4 | New Year confetti + champagne sparkle | 14 | Neon equalizer beat visualizer |
| 5 | Light-trail border frame (stars, bokeh) | 15 | Stage spotlight beams + haze |
| 6 | Blue/pink wave grid + light flare | 16 | Underwater caustics + bubbles |
| 7 | Futuristic AI technology globe | 17 | Falling snow winter night |
| 8 | Hyperspace warp speed tunnel | 18 | Romantic hearts + pink bokeh |
| 9 | Aurora borealis night sky | 19 | Rising fire embers |
| 10 | Liquid gradient color blobs | 20 | Colorful Memphis geometric shapes |

## Render on GitHub (no install)
1. Push these files to a new repository (keep the hidden .github folder).
2. Actions tab > "Render stock clips" > Run workflow, choose 1080 or 2160.
3. Download the artifact `stock-pack`: every MP4, a JPG thumbnail per clip, `adobe_stock.csv` (upload-ready) and `metadata_full.csv`.

## Render on your own computer
    pip install playwright && playwright install chromium     (ffmpeg must be on PATH)
    python batch.py --workers 4        then        python adobe_csv.py output
Quick test of one concept: `python batch.py --ids 8 --seconds 2`

## How the loops work
Motion is driven by `U()` (0..1 over 15 s) with integer cycle counts, and by GSAP yoyo tweens whose period divides 15 s
(`osc`, `twinkle`, `pulseEach` in lib.js). Frame 0 therefore equals the frame after the last one: no jump when the clip repeats.

## Add concepts
Write `C[n]=()=>{ newTL(); ...GSAP tweens...; draw=()=>{...} }` in a c*.js file, then add a row in concepts.py and a title/category in adobe_meta.py.

GSAP is (c) GreenSock, used under the GSAP standard license (gsap.com/standard-license).
