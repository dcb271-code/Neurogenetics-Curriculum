// Generates the full app-icon asset set from one master SVG.
//
// Outputs:
//   app/icon.svg            — scalable favicon (rounded tile, sharp in browser tabs)
//   app/favicon.ico         — 16/32/48 multi-size .ico (rounded tile)
//   app/apple-icon.png      — 180x180 iOS home-screen icon (full-bleed; iOS masks)
//   public/icon-192.png     — Android / PWA (full-bleed, maskable-safe)
//   public/icon-512.png     — Android / PWA (full-bleed, maskable-safe)
//
// Reuses `sharp` (already a dependency) — no new packages. Run: node scripts/gen-app-icon.mjs

import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ── Brand ────────────────────────────────────────────────────────────────
// --primary: hsl(262 83% 58%) ≈ #7c3aed. Vertical gradient for a little depth.
const VIOLET_TOP = "#8b5cf6";
const VIOLET_BOT = "#6d28d9";
const STRAND = "#ffffff";

const N = 512; // master canvas

// ── Helix geometry ─────────────────────────────────────────────────────────
// Two sine strands a half-period (π) out of phase so they interlock, plus
// connecting rungs. Kept within the central ~70% so it survives maskable crop.
function strandPoints(phase0) {
  const cx = N / 2;
  const amp = 96;            // horizontal swing
  const yTop = 132;
  const yBot = N - 132;      // 132..380
  const turns = 2.0;         // whole turns → strands close symmetrically top & bottom
  const steps = 96;
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const y = yTop + (yBot - yTop) * t;
    const phase = phase0 + t * turns * 2 * Math.PI;
    const x = cx + amp * Math.sin(phase);
    pts.push([x, y]);
  }
  return pts;
}

function pathFrom(pts) {
  return pts
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ");
}

// Rungs connect the two strands where they are roughly parallel (not at the
// crossings), so the ladder reads clearly.
function rungs(a, b) {
  const lines = [];
  const n = a.length - 1;
  // place rungs at the widest points of each turn (where the strands are
  // farthest apart) so the ladder reads cleanly. With 2 turns those fall at
  // t = 0.125, 0.375, 0.625, 0.875.
  const fractions = [0.125, 0.375, 0.625, 0.875];
  for (const f of fractions) {
    const idx = Math.round(f * n);
    const [x1, y1] = a[idx];
    const [x2, y2] = b[idx];
    // skip rungs that are too short (near a crossing) — they look like noise
    if (Math.abs(x1 - x2) < 26) continue;
    lines.push(
      `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(
        1
      )}" y2="${y2.toFixed(1)}" />`
    );
  }
  return lines.join("\n      ");
}

function buildSvg({ rounded }) {
  const a = strandPoints(0);
  const b = strandPoints(Math.PI);
  const bg = rounded
    ? `<rect x="0" y="0" width="${N}" height="${N}" rx="112" ry="112" fill="url(#g)"/>`
    : `<rect x="0" y="0" width="${N}" height="${N}" fill="url(#g)"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${N}" height="${N}" viewBox="0 0 ${N} ${N}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${VIOLET_TOP}"/>
      <stop offset="1" stop-color="${VIOLET_BOT}"/>
    </linearGradient>
    <linearGradient id="sheen" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.16"/>
      <stop offset="0.5" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  ${bg}
  ${
    rounded
      ? `<rect x="0" y="0" width="${N}" height="${N}" rx="112" ry="112" fill="url(#sheen)"/>`
      : `<rect x="0" y="0" width="${N}" height="${N}" fill="url(#sheen)"/>`
  }
  <g fill="none" stroke="${STRAND}" stroke-width="26" stroke-linecap="round" stroke-linejoin="round">
    <g stroke-width="18" stroke-opacity="0.95">
      ${rungs(a, b)}
    </g>
    <path d="${pathFrom(a)}"/>
    <path d="${pathFrom(b)}"/>
  </g>
</svg>`;
}

// ── ICO packing ──────────────────────────────────────────────────────────
// Modern .ico can embed PNG-compressed entries. Pack 16/32/48 PNGs.
function buildIco(pngs) {
  // pngs: [{ size, buffer }]
  const count = pngs.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);

  const dir = Buffer.alloc(16 * count);
  let offset = 6 + 16 * count;
  const bodies = [];
  pngs.forEach((p, i) => {
    const b = i * 16;
    dir.writeUInt8(p.size >= 256 ? 0 : p.size, b + 0); // width
    dir.writeUInt8(p.size >= 256 ? 0 : p.size, b + 1); // height
    dir.writeUInt8(0, b + 2); // palette
    dir.writeUInt8(0, b + 3); // reserved
    dir.writeUInt16LE(1, b + 4); // planes
    dir.writeUInt16LE(32, b + 6); // bpp
    dir.writeUInt32LE(p.buffer.length, b + 8); // size in bytes
    dir.writeUInt32LE(offset, b + 12); // offset
    offset += p.buffer.length;
    bodies.push(p.buffer);
  });

  return Buffer.concat([header, dir, ...bodies]);
}

async function pngFromSvg(svg, size) {
  return sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();
}

async function main() {
  const roundedSvg = buildSvg({ rounded: true });
  const fullSvg = buildSvg({ rounded: false });

  // 1) scalable favicon
  await writeFile(join(ROOT, "app", "icon.svg"), roundedSvg, "utf8");

  // 2) favicon.ico (16/32/48, rounded)
  const icoSizes = [16, 32, 48];
  const icoPngs = await Promise.all(
    icoSizes.map(async (size) => ({ size, buffer: await pngFromSvg(roundedSvg, size) }))
  );
  await writeFile(join(ROOT, "app", "favicon.ico"), buildIco(icoPngs));

  // 3) apple-icon (180, full-bleed)
  await writeFile(
    join(ROOT, "app", "apple-icon.png"),
    await pngFromSvg(fullSvg, 180)
  );

  // 4) PWA / Android icons (full-bleed, maskable-safe)
  await writeFile(
    join(ROOT, "public", "icon-192.png"),
    await pngFromSvg(fullSvg, 192)
  );
  await writeFile(
    join(ROOT, "public", "icon-512.png"),
    await pngFromSvg(fullSvg, 512)
  );

  console.log("✓ app/icon.svg");
  console.log("✓ app/favicon.ico (16/32/48)");
  console.log("✓ app/apple-icon.png (180)");
  console.log("✓ public/icon-192.png");
  console.log("✓ public/icon-512.png");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
