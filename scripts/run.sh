#!/usr/bin/env bash
set -euo pipefail

IN="videos/${VIDEO}"
FRAMES="${FRAMES:-5}"
MODEL="${MODEL:-RealESRGAN_x4plus}"
mkdir -p work/in work/out out

echo "== CPU info =="; nproc; lscpu | grep "Model name" || true

echo "== Install (CPU torch + Real-ESRGAN) =="
pip install -q "numpy<2" torch torchvision --index-url https://download.pytorch.org/whl/cpu
pip install -q basicsr realesrgan opencv-python-headless facexlib gfpgan
# basicsr fix for newer torchvision (patch the file WITHOUT importing basicsr)
SP=$(python -c "import site;print(site.getsitepackages()[0])")
sed -i 's/torchvision.transforms.functional_tensor/torchvision.transforms.functional/' "$SP/basicsr/data/degradations.py"

git clone -q --depth 1 https://github.com/xinntao/Real-ESRGAN.git work/repo

echo "== Video info =="
ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate,nb_frames -of default=nw=1 "$IN"
FPS=$(ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate -of csv=p=0 "$IN")

echo "== Extract frames =="
if [ "$FRAMES" -gt 0 ]; then LIM="-frames:v $FRAMES"; else LIM=""; fi
ffmpeg -loglevel error -i "$IN" $LIM work/in/f_%05d.png
N=$(ls work/in | wc -l)
echo "Frames to upscale: $N"

echo "== Upscale to 3840x2160 (720p x3) =="
START=$(date +%s)
python work/repo/inference_realesrgan.py \
  -n "$MODEL" -i work/in -o work/out \
  --outscale 3 --fp32 --tile 400 --suffix up
END=$(date +%s)
SECS=$((END-START))
PER=$(python -c "print(round($SECS/$N,2))")

echo "== Stitch video =="
ffmpeg -loglevel error -y -framerate "$FPS" -i work/out/f_%05d_up.png \
  -c:v libx264 -crf 16 -preset medium -pix_fmt yuv420p out/upscaled_4k.mp4

TOTAL=$(ffprobe -v error -select_streams v:0 -show_entries stream=nb_frames -of csv=p=0 "$IN" || echo 0)
{
  echo "## Upscale benchmark"
  echo "- Model: $MODEL"
  echo "- Frames processed: $N in ${SECS}s"
  echo "- **Seconds per frame: $PER**"
  if [ "$TOTAL" != "0" ] && [ "$TOTAL" != "N/A" ]; then
    echo "- Estimated full clip ($TOTAL frames): **$(python -c "print(round($PER*$TOTAL/60,1))") minutes**"
  fi
} | tee -a "${GITHUB_STEP_SUMMARY:-/dev/null}"
