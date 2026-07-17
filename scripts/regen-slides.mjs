// 从 Portfolio material 重新生成幻灯片小节配图。
//
// 为什么要裁：配图在幻灯片里是 contain（完整显示不裁切），配图区是横的、图是方的，
// 所以图按高度撑满 —— 图上下的空白直接吃掉可用高度，内容就显得小。
// 把空白裁掉（只裁纯画布色的部分，内容一个像素不动），内容就能占满高度。
// 封面（0.*）是 cover 满幅裁切，不受影响，不动。
//
// 不用 sharp 的 trim()：它在这些带 alpha 的 PNG 上会漏裁（b2 该裁成 2420×2420，
// 它只给到 2923×3135，纵向一点没裁），所以自己扫一遍算内容包围盒再 extract。
import sharp from 'sharp';
import path from 'node:path';

const JOBS = [
  { src: 'Portfolio material/2.0项目内容图/幽灵/b2.png', out: 'public/works/ghost-radar/slides/2.webp' },
  { src: 'Portfolio material/2.0项目内容图/幽灵/b3.png', out: 'public/works/ghost-radar/slides/3.webp' },
  { src: 'Portfolio material/2.0项目内容图/相机/a1.png', out: 'public/works/lofi-motion-cam/slides/1.webp' },
  { src: 'Portfolio material/2.0项目内容图/相机/a2.png', out: 'public/works/lofi-motion-cam/slides/2.webp' },
  { src: 'Portfolio material/2.0项目内容图/相机/a3.png', out: 'public/works/lofi-motion-cam/slides/3.webp' },
  { src: 'Portfolio material/2.0项目内容图/相机/a4.png', out: 'public/works/lofi-motion-cam/slides/4.webp' },
];

const THRESHOLD = 8;   // 和画布色差多少算「内容」
const PAD_RATIO = 0.03; // 裁完补回的留白，占内容长边

async function contentBox(file) {
  const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info;
  const bg = [data[0], data[1], data[2]];
  let x0 = W, y0 = H, x1 = -1, y1 = -1;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * C;
      const d = Math.max(Math.abs(data[i] - bg[0]), Math.abs(data[i + 1] - bg[1]), Math.abs(data[i + 2] - bg[2]));
      if (d > THRESHOLD) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
  }
  return { W, H, bg, x0, y0, x1, y1 };
}

for (const j of JOBS) {
  const { W, H, bg, x0, y0, x1, y1 } = await contentBox(j.src);
  if (x1 < 0) { console.log(path.basename(j.src), '整张都是纯色，跳过'); continue; }

  const cw = x1 - x0 + 1, ch = y1 - y0 + 1;
  const pad = Math.round(Math.max(cw, ch) * PAD_RATIO);
  // 内容 + 四周等量留白，超出原图的部分用画布色补上
  const cropped = await sharp(j.src)
    .extract({ left: x0, top: y0, width: cw, height: ch })
    .toBuffer();
  const padded = await sharp(cropped)
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: { r: bg[0], g: bg[1], b: bg[2], alpha: 1 } })
    .toBuffer();

  await sharp(padded).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 82 }).toFile(j.out);
  const fin = await sharp(j.out).metadata();

  // contain 时图按高度撑满，所以「内容显示大小」正比于 内容高/整图高
  const before = ch / H, after = ch / (ch + 2 * pad);
  console.log(
    (path.basename(j.src) + ' → ' + path.basename(j.out)).padEnd(20),
    `| 画布 ${W}×${H} 底色 rgb(${bg})`,
    `| 内容 ${cw}×${ch}`,
    `→ 成品 ${fin.width}×${fin.height}`,
    `| 内容占高 ${(before * 100).toFixed(0)}% → ${(after * 100).toFixed(0)}%`,
    `(显示放大 ${((after / before - 1) * 100).toFixed(0)}%)`
  );
}
