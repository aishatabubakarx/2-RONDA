# Stock clip renderer - 20 animated overlays/backgrounds, 15 seconds each

Every clip is 15 s, 30 fps (450 frames), 1080p or 4K, black background, **seamless loop** (the last frame flows into the first), no baked text.

| # | Clip | # | Clip |
|---|------|---|------|
| 1 | Gold confetti fall | 11 | Golden bokeh lights |
| 2 | Autumn maple leaves | 12 | Mystic smoke / fog |
| 3 | Realistic snowfall | 13 | Sky lanterns at night |
| 4 | Night sky blue stars glitter | 14 | Hyperspace star warp |
| 5 | Valentine heart frame, gold stars + glitter light trail | 15 | Aurora borealis |
| 6 | Fireflies | 16 | Cinematic lens flare + light leaks |
| 7 | Heavy rain | 17 | Dust motes in a light beam |
| 8 | Fire embers rising | 18 | Spiral galaxy |
| 9 | Iridescent soap bubbles | 19 | Neon wave ribbons |
| 10 | Lightning storm | 20 | Dandelion seeds |

## How it works
GSAP (gsap.min.js + MotionPathPlugin) is the animation engine: each concept builds one paused GSAP timeline
(wind gusts, heartbeat, lightning flashes, camera/tilt moves, light-source sweep) and the renderer seeks it frame by frame.
Particles are canvas-drawn functions of the timeline clock, using whole-number cycles per 15 s so everything loops.
The heart frame uses MotionPathPlugin to turn an SVG heart path into evenly spaced points for the light trails.

## Render on GitHub (no install)
1. Push these files to a new repository (keep the hidden .github folder).
2. Actions tab -> "Render stock clips" -> Run workflow, choose 1080 or 2160.
3. Download the artifact `stock-pack`: all MP4s, JPG thumbnails, adobe_stock.csv and metadata_full.csv.
Eight parallel jobs split the clips; change the shard list in render.yml and `--shards` together to use more or fewer.

## Render on your own computer
pip install playwright && playwright install chromium   (ffmpeg must be on PATH)
python batch.py --workers 4        then        python adobe_csv.py output

## Add a concept
Write `C[n]=()=>{newTL(); ... draw=()=>{...}}` in a c*.js file (use `PH()` = 0..1 clip phase, integer cycles for loops),
then add a row in concepts.py and a title/category in adobe_meta.py.

## Licences
GSAP is free under the GreenSock Standard License (https://gsap.com/standard-license). All art is generated in code.
