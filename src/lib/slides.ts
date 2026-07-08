// 详情页浮空幻灯片的内容。
// 大多数项目结构一致（## 项目定位 / 关键决策 / 迭代过程 / 使用工具 + links），
// 用通用构建器从 markdown 正文自动解析 ZH（work.body）+ EN（works-en 的 body）成幻灯片。
// 特例：盲盒（图片驱动）；跳过：合集 / PDF / 待补项目（回落 /works/<slug> 独立页）。

export type SlideImg = { src: string } | { ph: string };

export type Slide =
  | {
      layout: 'cover';
      title: string; titleEn: string;
      tagline: string; taglineEn: string;
      meta: { label: string; labelEn: string; value: string; valueEn: string }[];
      img: SlideImg;
    }
  | {
      layout: 'text';
      heading: string; headingEn: string;
      body: string[]; bodyEn: string[];
      img: SlideImg;
      side?: 'left' | 'right';
    }
  | { layout: 'image'; img: { src: string }; caption?: string; captionEn?: string }
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
function genericSlides(work: any, enBody?: string): Slide[] {
  const d = work.data;
  const zh = parseSections(work.body || '');
  const en = enBody ? parseSections(enBody) : [];
  const slides: Slide[] = [];

  slides.push({
    layout: 'cover',
    title: d.title, titleEn: d.titleEn || d.title,
    tagline: d.summary, taglineEn: d.summaryEn || d.summary,
    meta: coverMeta(d),
    img: { src: d.poster || d.cover }
  });

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
      img: { ph: '配图 · ' + s.heading },
      side: textIdx++ % 2 === 0 ? 'right' : 'left'
    });
  });

  const tIdx = zh.findIndex(s => isTools(s.heading));
  const toolZh = tIdx >= 0 ? sectionBody(zh[tIdx].lines).slice(0, 1) : [];
  const toolEn = tIdx >= 0 && en[tIdx] ? sectionBody(en[tIdx].lines).slice(0, 1) : toolZh;
  const links = (d.links || []).map((l: any) => ({ label: l.label, labelEn: l.labelEn || l.label, url: l.url }));
  if (links.length || toolZh.length) {
    slides.push({ layout: 'links', heading: '工具与链接', headingEn: 'Tools & links', body: toolZh, bodyEn: toolEn, links });
  }
  return slides;
}

// ---------- 盲盒：图片驱动（真实素材当配图）----------
function blindBoxSlides(work: any): Slide[] {
  const d = work.data;
  const B = '/works/blind-box/';
  return [
    {
      layout: 'cover',
      title: d.title, titleEn: d.titleEn || d.title,
      tagline: d.summary, taglineEn: d.summaryEn || d.summary,
      meta: coverMeta(d),
      img: { src: B + 'cover.jpg' }
    },
    { layout: 'image', img: { src: B + 'layout-1.jpg' } },
    { layout: 'image', img: { src: B + 'layout-3.jpg' } },
    {
      layout: 'gallery',
      imgs: [
        { src: B + 'banana.jpg' }, { src: B + 'box.jpg' }, { src: B + 'cart.jpg' },
        { src: B + 'cone.jpg' }, { src: B + 'bag.jpg' }, { src: B + 'untitled-2.jpg' },
        { src: B + 'untitled-8.jpg' }, { src: B + 'layout-5.jpg' }
      ]
    },
    { layout: 'image', img: { src: B + 'total-3.jpg' } }
  ];
}

// 走独立页兜底（合集 / PDF / 待补）
const SKIP = new Set(['ghost-radar', 'modeling', 'ux-study-portfolio']);

export function buildSlides(work: any, enBody?: string): Slide[] | null {
  if (work.id === 'blind-box') return blindBoxSlides(work);
  if (SKIP.has(work.id)) return null;
  if (work.body && /^##\s/m.test(work.body)) return genericSlides(work, enBody);
  return null;
}
