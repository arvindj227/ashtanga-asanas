import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const studyDir = path.dirname(fileURLToPath(import.meta.url));
const posesDir = path.join(studyDir, '..', 'images', 'poses');
const outFile = path.join(studyDir, 'pose-image-bg.js');

const py = `
import json, statistics, sys
from pathlib import Path
from PIL import Image

root = Path(sys.argv[1])
out = {}
for p in sorted(root.glob('*.png')):
    im = Image.open(p).convert('RGB')
    w, h = im.size
    pts = []
    margin = min(14, w // 8, h // 8)
    for x in range(margin):
        for y in range(margin):
            pts.append(im.getpixel((x, y)))
    for x in range(w - margin, w):
        for y in range(margin):
            pts.append(im.getpixel((x, y)))
    for x in range(margin):
        for y in range(h - margin, h):
            pts.append(im.getpixel((x, y)))
    for x in range(w - margin, w):
        for y in range(h - margin, h):
            pts.append(im.getpixel((x, y)))
    rs = [c[0] for c in pts]
    gs = [c[1] for c in pts]
    bs = [c[2] for c in pts]
    r, g, b = int(statistics.median(rs)), int(statistics.median(gs)), int(statistics.median(bs))
    key = 'images/poses/' + p.name
    out[key] = '#%02x%02x%02x' % (r, g, b)
print(json.dumps(out))
`;

const result = spawnSync('python3', ['-c', py, posesDir], { encoding: 'utf8' });
if (result.status !== 0) {
  console.error(result.stderr || result.stdout);
  process.exit(result.status || 1);
}

const map = JSON.parse(result.stdout.trim());
const out = `/* Auto-generated from images/poses. Rebuild: node study/sync-pose-image-bg.mjs */\nwindow.POSE_IMAGE_BG = ${JSON.stringify(map)};\n`;
fs.writeFileSync(outFile, out);
console.log(`Wrote ${outFile} (${Object.keys(map).length} images)`);
