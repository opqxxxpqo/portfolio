// 详情页浮空幻灯片的内容数据。
// v1 手写每个项目的 slides（图文配对可控）；没有 slides 的项目点击时回落到 /works/<slug> 独立页。
// 文字先用现有内容占位，用户之后自行修改。

export type SlideImg = { src: string } | { ph: string }; // 真图 或 图位占位（ph = 占位文案）

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
      side?: 'left' | 'right'; // 图在哪侧，默认 right
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

function coverMeta(data: any): { label: string; labelEn: string; value: string; valueEn: string }[] {
  const m: { label: string; labelEn: string; value: string; valueEn: string }[] = [];
  const cat = data.chip || data.category;
  const catEn = data.chipEn || data.chip || data.category;
  m.push({ label: '分类', labelEn: 'Category', value: cat, valueEn: catEn });
  m.push({ label: '年份', labelEn: 'Year', value: yr(data.date), valueEn: yr(data.date) });
  if (data.role) m.push({ label: '角色', labelEn: 'Role', value: data.role, valueEn: data.roleEn || data.role });
  if (data.tools?.length) m.push({ label: '工具', labelEn: 'Tools', value: data.tools.join(' · '), valueEn: data.tools.join(' · ') });
  return m;
}

// ---------- 拟物相机（纯文字留图位）----------
function lofiSlides(work: any): Slide[] {
  const d = work.data;
  return [
    {
      layout: 'cover',
      title: d.title, titleEn: d.titleEn || d.title,
      tagline: d.summary, taglineEn: d.summaryEn || d.summary,
      meta: coverMeta(d),
      img: { ph: '主视觉 · 相机全貌 / 录制中画面' }
    },
    {
      layout: 'text',
      heading: '项目定位', headingEn: 'Positioning',
      body: ['一台拟物磁带相机——把手机或浏览器的摄像头，实时处理成 Mini-DV/VHS 那种 LoFi 质感，还能录下来存进相册。想验证：一个设计师带着 AI 结对，能不能把「渲染级的厚重质感」一路做成真能装进手机的产品，而不是停在一张好看的 mockup。'],
      bodyEn: ['A skeuomorphic tape camcorder — it runs your phone or browser camera live into that Mini-DV/VHS LoFi look, and records straight to the gallery. Built to test one thing: can a designer, paired with AI, take render-grade heavyweight texture all the way to a real installable product, not just a pretty mockup?'],
      img: { ph: '定位配图 · 成片 vs 传统 mockup 对比' }
    },
    {
      layout: 'text',
      heading: '关键决策', headingEn: 'Key decisions',
      body: [
        '不做轻薄系统拟物，改做厚重 CG 重渲染——所有材质、光影、阴影必须在 Blender 里烘进图，代码不许用 CSS 假造。',
        '光影只烘不造：滑块砍掉交叉淡化，改「位置连续 + 吸附最近那一帧烘焙图」，宁可离散也要阴影是真的。',
        '实时滤镜用 WebGL shader 重写：GLSL 片元着色器 + 乒乓缓冲做拖影，才能在手机上同时跑相机和鱼眼/色散/VHS 撕裂。',
        '只在滚轮一处「程序化造」：CSS 圆柱渐变 + 滚花 + 灰尘噪声——哪种方式更真更可控就用哪种，纯烘焙不是目的。'
      ],
      bodyEn: [
        'Chose heavyweight CG rendering over thin system-skeuomorphism — every material, light and shadow baked into images in Blender, nothing faked with CSS.',
        'Bake lighting, never fabricate it: the slider dropped cross-fading for continuous position + snap to the nearest baked frame — discrete but real shadows.',
        'Rewrote the live filters as WebGL shaders: a GLSL fragment shader with ping-pong buffers for trails, to run the camera plus fisheye/aberration/VHS-tear on mobile.',
        'Went procedural in exactly one place — the jog wheel: CSS cylinder gradient + knurl + dust noise. Whatever looks more real and stays controllable wins.'
      ],
      img: { ph: '决策配图 · Blender 烘焙流程 / 滑块 8 帧' },
      side: 'left'
    },
    {
      layout: 'text',
      heading: '迭代过程', headingEn: 'Iteration',
      body: [
        'V1 轻薄拟物沙盒（manifest 驱动、多层视差、控件精灵）→ 能拼装，但太薄、控件对不齐轨道。',
        'V2 厚重 CG（一张烘焙整图当背景，会动的控件叠帧序列）→ 质感立住，同场景同相机出图，控件天然对齐。',
        'V3 真机产品化（自包含 bundle → Expo 打 APK，配 WebGL 实时滤镜 + 录制存相册，网页/安卓双端）→ 能装、能用、能分享。'
      ],
      bodyEn: [
        'V1 thin skeuomorphic sandbox (manifest-driven, parallax, control sprites) → assembled, but flat and controls drifted off track.',
        'V2 heavyweight CG (one baked scene as background, animated controls as frame sequences) → texture held, and same-scene rendering aligned controls by construction.',
        'V3 productisation (self-contained bundle → Expo APK, WebGL live filters + record-to-gallery, web + Android) → installable, usable, shareable.'
      ],
      img: { ph: '迭代配图 · V1 → V2 → V3 三版对比' }
    },
    {
      layout: 'links',
      heading: '工具与链接', headingEn: 'Tools & links',
      body: ['Claude Code（全程结对）、Blender（材质光影烘焙）、Expo + EAS Build、React Native + WebView、WebGL / GLSL。'],
      bodyEn: ['Claude Code (paired throughout), Blender (all material + light baking), Expo + EAS Build, React Native + WebView, WebGL / GLSL.'],
      links: (d.links || []).map((l: any) => ({ label: l.label, labelEn: l.labelEn || l.label, url: l.url }))
    }
  ];
}

// ---------- 盲盒（加图，真实素材当配图）----------
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

export function buildSlides(work: any): Slide[] | null {
  switch (work.id) {
    case 'lofi-motion-cam':
      return lofiSlides(work);
    case 'blind-box':
      return blindBoxSlides(work);
    default:
      return null;
  }
}
