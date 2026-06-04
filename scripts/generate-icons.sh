#!/bin/bash
# Generate app icons from SVG using ImageMagick or Python
# Requires: ImageMagick (`magick`) or Python with Pillow

SIZES=(72 96 128 144 152 192 384 512)
ICONS_DIR="public/icons"

echo "🎨 Generating NebulaFit app icons..."

# Create a simple gradient icon using ImageMagick
for size in "${SIZES[@]}"; do
  magick -size ${size}x${size} \
    -define gradient:direction=diagonal \
    gradient:'#0a0a1a'-'#1a1a3e' \
    -fill '#6c5ce7' -draw "circle $((size/2-30)),$((size/2-30)) $((size/2)),$((size/4))" \
    -fill '#00f0ff' -draw "circle $((size/2+30)),$((size/2+20)) $((size/2+10)),$((size/2))" \
    -fill white -font Arial-Bold -pointsize $((size/2)) \
    -gravity center -annotate 0 "N" \
    -fill '#00f0ff' -draw "roundrectangle $((size/6)),$((size*3/4)) $((size*5/6)),$((size*3/4+6)) 3,3" \
    "$ICONS_DIR/icon-${size}.png" 2>/dev/null
done

echo "✅ Icons generated in $ICONS_DIR/"
