// 详情页浮空幻灯片的内容。
// 大多数项目结构一致（## 项目定位 / 关键决策 / 迭代过程 / 使用工具 + links），
// 用通用构建器从 markdown 正文自动解析 ZH（work.body）+ EN（works-en 的 body）成幻灯片。
// 特例：盲盒（图片驱动）；跳过：合集 / PDF / 待补项目（回落 /works/<slug> 独立页）。

import fs from 'node:fs';
import sharp from 'sharp';

export type SlideImg =
  | { src: string; bg?: string }
  | { video: string }
  | { html: string }
  | { ph: string };

// 配图在幻灯片里是 contain（完整显示不裁切），图的比例和配图区对不上时四周会露出衬底。
// 写死一个衬底色不行：幽灵的图是浅灰画布、相机的是深灰，同一个色总有一边露出黑边。
// 所以取图自己四角的颜色当衬底 —— 露出来的部分和图的画布融成一块，看不出边。
// 四角颜色不一致（内容顶到边，比如满幅照片）就别猜，回落深色。
const FALLBACK_BG = '#0c0c0b';

async function canvasColor(file: string): Promise<string | undefined> {
  try {
    const { width, height } = await sharp(file).metadata();
    if (!width || !height) return undefined;
    const N = 4;
    const spots = [
      { left: 0, top: 0 },
      { left: width - N, top: 0 },
      { left: 0, top: height - N },
      { left: width - N, top: height - N },
    ];
    const corners: number[][] = [];
    for (const s of spots) {
      // 注意：stats() 是读原图的、会绕过 extract()，取局部得走 raw()
      const { data, info } = await sharp(file)
        .extract({ ...s, width: N, height: N })
        .raw()
        .toBuffer({ resolveWithObject: true });
      const c = [0, 1, 2].map(k => {
        let sum = 0;
        for (let i = 0; i < data.length; i += info.channels) sum += data[i + k];
        return Math.round(sum / (data.length / info.channels));
      });
      corners.push(c);
    }
    const avg = [0, 1, 2].map(k => Math.round(corners.reduce((s, c) => s + c[k], 0) / corners.length));
    const spread = Math.max(...corners.flatMap(c => c.map((v, k) => Math.abs(v - avg[k]))));
    if (spread > 12) return undefined;
    return '#' + avg.map(v => v.toString(16).padStart(2, '0')).join('');
  } catch {
    return undefined;
  }
}

// 读 public/works/<slug>/slides/ 下按序号命名的配图/视频/HTML：N.ext → 第 N 张幻灯片
// （0 = 封面，1 = 第一个小节，依次）。图 = jpg/png/webp，视频 = mp4/webm（静音循环），
// html = 可交互嵌入（iframe，比如 canvas 动画 demo）。
async function slideMedia(slug: string): Promise<Map<number, SlideImg>> {
  const map = new Map<number, SlideImg>();
  try {
    const dir = `public/works/${slug}/slides`;
    for (const f of fs.readdirSync(dir)) {
      const m = f.match(/^(\d+)\.(webp|jpg|jpeg|png|mp4|webm|html)$/i);
      if (!m) continue;
      const src = `/works/${slug}/slides/${f}`;
      const ext = m[2].toLowerCase();
      map.set(
        Number(m[1]),
        ext === 'html'
          ? { html: src }
          : /mp4|webm/.test(ext)
            ? { video: src }
            : { src, bg: await canvasColor(`${dir}/${f}`) }
      );
    }
  } catch {}
  return map;
}

export type Slide =
  | {
      layout: 'cover';
      title: string; titleEn: string;
      tagline: string; taglineEn: string;
      meta: { label: string; labelEn: string; value: string; valueEn: string }[];
      img: SlideImg;
      links?: { label: string; labelEn: string; url: string }[]; // 链接并进封面，省掉单独一页
    }
  | {
      layout: 'text';
      heading: string; headingEn: string;
      body: string[]; bodyEn: string[];
      img: SlideImg;
      side?: 'left' | 'right';
    }
  | { layout: 'image'; img: { src: string; bg?: string } | { video: string } | { html: string }; caption?: string; captionEn?: string; fill?: boolean }
  | { layout: 'gallery'; imgs: { src: string }[] }
  | {
      layout: 'links';
      heading: string; headingEn: string;
      body?: string[]; bodyEn?: string[];
      links: { label: string; labelEn: string; url: string }[];
    };

const yr = (d: Date) => d.getFullYear().toString();

function coverMeta(data: any) {
  const m: { label: string; labelEn: string; value: string; valueEn: string }[] = [];
  m.push({ label: '分类', labelEn: 'Category', value: data.chip || data.category, valueEn: data.chipEn || data.chip || data.category });
  m.push({ label: '年份', labelEn: 'Year', value: yr(data.date), valueEn: yr(data.date) });
  if (data.role) m.push({ label: '角色', labelEn: 'Role', value: data.role, valueEn: data.roleEn || data.role });
  if (data.tools?.length) m.push({ label: '工具', labelEn: 'Tools', value: data.tools.join(' · '), valueEn: data.tools.join(' · ') });
  return m;
}

// ---------- markdown 正文解析 ----------
function parseSections(md: string): { heading: string; lines: string[] }[] {
  const out: { heading: string; lines: string[] }[] = [];
  let cur: { heading: string; lines: string[] } | null = null;
  for (const raw of (md || '').split(/\r?\n/)) {
    const h = raw.match(/^##\s+(.+?)\s*$/);
    if (h) { cur = { heading: h[1], lines: [] }; out.push(cur); }
    else if (cur) cur.lines.push(raw);
  }
  return out;
}

// 一个小节的正文 → 段落/列表项数组（去掉 **、引用 >、分隔线 ---）
function sectionBody(lines: string[]): string[] {
  const text = (lines || []).join('\n').trim();
  if (!text) return [];
  const isList = /^\d+\.\s/m.test(text);
  const parts = isList ? text.split(/\n(?=\d+\.\s)/) : text.split(/\n\s*\n/);
  return parts
    .map(p => p.replace(/\*\*/g, '').replace(/^>\s?/gm, '').replace(/\s*\n\s*/g, ' ').trim())
    .filter(p => p && !/^-{3,}$/.test(p));
}

const isTools = (h: string) => /使用工具|built with|tools/i.test(h);

// ---------- 通用：从正文自动拆幻灯片 ----------
async function genericSlides(work: any, enBody?: string): Promise<Slide[]> {
  const d = work.data;
  const zh = parseSections(work.body || '');
  const en = enBody ? parseSections(enBody) : [];
  const media = await slideMedia(work.id); // 序号 → 配图/视频，按 slides/ 目录
  const slides: Slide[] = [];
  const links = (d.links || []).map((l: any) => ({ label: l.label, labelEn: l.labelEn || l.label, url: l.url }));

  // 封面（幻灯片 0）：有 slides/0.* 就用它（图或视频），否则用海报；链接并进封面
  slides.push({
    layout: 'cover',
    title: d.title, titleEn: d.titleEn || d.title,
    tagline: d.summary, taglineEn: d.summaryEn || d.summary,
    meta: coverMeta(d),
    img: media.get(0) ?? { src: d.poster || d.cover },
    links: links.length ? links : undefined
  });

  let si = 1; // 幻灯片序号：小节从 1 起（0 是封面）
  let textIdx = 0;
  zh.forEach((s, i) => {
    if (isTools(s.heading)) return;
    const e = en[i];
    slides.push({
      layout: 'text',
      heading: s.heading,
      headingEn: e?.heading || s.heading,
      body: sectionBody(s.lines),
      bodyEn: e ? sectionBody(e.lines) : sectionBody(s.lines),
      img: media.get(si) ?? { ph: '配图 · ' + s.heading },
      side: textIdx++ % 2 === 0 ? 'right' : 'left'
    });
    si++;
  });

  // 超出小节数的媒体（序号 ≥ si）→ 追加为纯媒体页（无文字），按序号排，视频通常放最后
  [...media.keys()]
    .filter(k => k >= si)
    .sort((a, b) => a - b)
    .forEach(k => {
      const m = media.get(k)!;
      if ('ph' in m) return;
      slides.push({ layout: 'image', img: m });
    });

  return slides;
}

// ---------- 盲盒：图片驱动（真实素材当配图）----------
async function blindBoxSlides(work: any): Promise<Slide[]> {
  const d = work.data;
  const B = '/works/blind-box/';
  // 图页两侧露出的衬底取图自己四角的画布色（这几张是 #1d1d1d，比默认 #0c0c0b 亮），
  // 否则图边缘那圈灰会跟深色页底之间出现一道跳边
  const img = async (file: string) => ({ src: B + file, bg: await canvasColor(`public/works/blind-box/${file}`) });
  return [
    // 封面沿用原来的（cover.jpg + 标题/信息栏）
    {
      layout: 'cover',
      title: d.title, titleEn: d.titleEn || d.title,
      tagline: d.summary, taglineEn: d.summaryEn || d.summary,
      meta: coverMeta(d),
      img: { src: B + 'cover.jpg' }
    },
    // 四张新内容图（1.84:1，正好铺满全尺寸图页）
    { layout: 'image', img: await img('c1.webp') },
    { layout: 'image', img: await img('c2.webp') },
    { layout: 'image', img: await img('c3.webp') },
    { layout: 'image', img: await img('c4.webp') },
    // 收尾群像沿用原图，但铺满放大、不留黑边（fill = cover 裁切）
    { layout: 'image', img: { src: B + 'total-3.jpg' }, fill: true }
  ];
}

// 走独立页兜底（合集 / PDF）
const SKIP = new Set(['modeling', 'ux-study-portfolio']);

export async function buildSlides(work: any, enBody?: string): Promise<Slide[] | null> {
  if (work.id === 'blind-box') return await blindBoxSlides(work);
  if (SKIP.has(work.id)) return null;
  if (work.body && /^##\s/m.test(work.body)) return await genericSlides(work, enBody);
  return null;
}
