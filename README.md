# Stock clip renderer (15 s clips, GSAP engine)

20 unique concepts, each 15.000 s at 30 fps (450 frames), 1080p or 4K, rendered from a deterministic canvas timeline.

## Render on GitHub (no install)
1. Create a new repository and push these files to it (keep the hidden .github folder).
2. Open the Actions tab, pick "Render stock clips", click Run workflow, choose 1080 or 2160.
3. Download the artifact named stock-pack: every MP4, a JPG thumbnail per clip (taken at 7 s), adobe_stock.csv and metadata_full.csv.

Eight parallel jobs split the clips. Change the shard list in .github/workflows/render.yml and the --shards number together to use more or fewer.

## Render on your own computer
pip install playwright && playwright install chromium   (ffmpeg must be on PATH)
python batch.py --workers 4        then        python adobe_csv.py output
Single clips: python batch.py --ids 4,9

## Concepts
1 Loading bar HUD | 2 Hot pink wavy lines (loop) | 3 Dark glitch static (loop) | 4 Red handwritten Mother's Day
5 Neon trail circle (loop) | 6 Red plasma ring (loop) | 7 Critical error window | 8 Software alert rubber stamp
9 Purple glass cubes (loop) | 10 Glass refraction circle (loop) | 11 Breaking news | 12 Caution tape (loop)
13 Thank you in 9 languages | 14 Payment success check | 15 Terminal code typing | 16 Cinematic trailer title
17 Mega sale 50% badge | 18 Liquid metaballs (loop) | 19 Hyperspace starfield (loop) | 20 1,000,000 followers odometer
"Loop" clips are mathematically periodic over 15 s, so the last frame flows into the first.

## Add concepts
Write C[n]=()=>{...} in a c*.js file using newTL(), A(obj,from,to,atSec,durSec,ease) (GSAP) and draw=()=>{...}.
Then add a row in concepts.py and a title and category in adobe_meta.py. Helpers in lib.js: noise(), lnoise() (loop-safe), LOOP(ms), txt(), glow sprites.

## Licenses
Fonts are SIL OFL via Fontsource. GSAP (gsap.min.js, CustomEase, EasePack) is used under GreenSock's standard license, see https://gsap.com/standard-license - check it covers your use before selling output.
