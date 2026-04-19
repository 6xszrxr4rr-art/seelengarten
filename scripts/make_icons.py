#!/usr/bin/env python3
"""Erzeugt grün-pastellige Platzhalter-Icons für die PWA.

Verwendung:
    python3 scripts/make_icons.py

Schreibt:
    icons/icon-192.png
    icons/icon-512.png

Maskable-kompatibel: Motiv liegt innerhalb der inneren 80%-Safe-Area.
"""
from PIL import Image, ImageDraw, ImageFilter
from pathlib import Path


def radial_gradient(size, inner, outer):
    img = Image.new("RGB", (size, size), outer)
    px = img.load()
    cx = cy = size / 2
    max_r = (2 ** 0.5) * size / 2
    for y in range(size):
        for x in range(size):
            dx, dy = x - cx, y - cy
            r = (dx * dx + dy * dy) ** 0.5
            t = min(1.0, r / max_r)
            px[x, y] = (
                int(inner[0] * (1 - t) + outer[0] * t),
                int(inner[1] * (1 - t) + outer[1] * t),
                int(inner[2] * (1 - t) + outer[2] * t),
            )
    return img


def make_icon(size, out_path):
    # Pastell-Grün-Gradient als Hintergrund
    bg_inner = (232, 242, 217)  # sehr hell
    bg_outer = (139, 170, 131)  # sanftes Salbeigrün
    img = radial_gradient(size, bg_inner, bg_outer).convert("RGBA")

    overlay = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    cx = cy = size / 2
    # Safe area 80% für maskable
    safe = size * 0.8

    # Stilisierte Blüte aus weichen Kreisen
    petal_color = (255, 253, 240, 235)
    stem_color = (113, 148, 108, 220)
    core_color = (244, 226, 180, 255)

    # Stengel
    stem_w = size * 0.035
    stem_top = cy + size * 0.02
    stem_bot = cy + safe * 0.45
    draw.rounded_rectangle(
        [cx - stem_w / 2, stem_top, cx + stem_w / 2, stem_bot],
        radius=stem_w,
        fill=stem_color,
    )

    # 5 Blütenblätter
    import math
    petal_r = size * 0.16
    dist = size * 0.15
    for i in range(5):
        a = -math.pi / 2 + i * (2 * math.pi / 5)
        px = cx + math.cos(a) * dist
        py = cy - size * 0.08 + math.sin(a) * dist
        draw.ellipse(
            [px - petal_r, py - petal_r, px + petal_r, py + petal_r],
            fill=petal_color,
        )

    # Blütenmitte
    core_r = size * 0.08
    draw.ellipse(
        [cx - core_r, cy - size * 0.08 - core_r, cx + core_r, cy - size * 0.08 + core_r],
        fill=core_color,
    )

    # Zwei kleine Blätter am Stengel
    leaf_color = (156, 186, 140, 220)
    lw = size * 0.11
    lh = size * 0.06
    ly = cy + size * 0.18
    draw.ellipse([cx - lw - size * 0.005, ly - lh / 2, cx - size * 0.005, ly + lh / 2], fill=leaf_color)
    draw.ellipse([cx + size * 0.005, ly + size * 0.03 - lh / 2, cx + lw + size * 0.005, ly + size * 0.03 + lh / 2], fill=leaf_color)

    # Weicher Schein — leichter Blur
    overlay = overlay.filter(ImageFilter.GaussianBlur(radius=max(1, size / 256)))

    img = Image.alpha_composite(img, overlay)
    img.convert("RGB").save(out_path, format="PNG", optimize=True)
    print(f"wrote {out_path}")


if __name__ == "__main__":
    root = Path(__file__).resolve().parent.parent
    icons = root / "icons"
    icons.mkdir(exist_ok=True)
    make_icon(192, icons / "icon-192.png")
    make_icon(512, icons / "icon-512.png")
