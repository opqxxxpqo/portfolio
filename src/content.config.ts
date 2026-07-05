import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 作品分类（固定枚举，新增请同步 src/lib/categories.ts）
const CATEGORIES = [
  'service-design',
  'ux-ui',
  'ai-prototype',
  'visual-design',
  'visual-3d',
  'research'
] as const;

const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: z.object({
    title: z.string(),
    titleEn: z.string().optional(),
    category: z.enum(CATEGORIES),
    date: z.coerce.date(),
    cover: z.string(), // public/ 下的相对路径，例 /works/research-sample/cover.svg
    // poster: 首页调频器舞台用的宽幅海报图（重设计新增），没有时回落到 cover
    poster: z.string().optional(),
    // frameSeq: 首页海报做成滚动擦洗的帧序列（滚动正放 / 上滚倒带）。
    // 帧文件命名 01.ext…{count}.ext，两位补零。没设则用静态 poster/cover。
    frameSeq: z
      .object({
        base: z.string(),           // 例 /works/modeling/frames/
        count: z.number().int().positive(),
        ext: z.string().optional().default('jpg')
      })
      .optional(),
    summary: z.string(),
    summaryEn: z.string().optional(),

    role: z.string().optional(),
    roleEn: z.string().optional(),
    tools: z.array(z.string()).optional(),
    duration: z.string().optional(),
    durationEn: z.string().optional(),
    tags: z.array(z.string()).optional(),
    // ai: 这个作品是否「AI 辅助完成」。用于首页「只看 AI 辅助作品」筛选。
    // 与 category 解耦：river-lea 是 visual-design 但也用了 Claude Code，照样算 AI 辅助。
    ai: z.boolean().optional().default(false),
    // chip / chipEn: 首页 list/grid 右侧显示的小标签。设了就用它覆盖默认分类标签。
    // 给 ai-prototype 作品用——"AI 原型"区分度太低，换成更具体的（如"派对游戏"）。
    chip: z.string().optional(),
    chipEn: z.string().optional(),
    featured: z.boolean().optional().default(false),
    longform: z.boolean().optional().default(false),
    // hidden: 不在首页 list 和分类页 list 出现；仍然有自己的详情页 URL
    // 适合作为"合集索引"的子项，比如 modeling 里的 F1 / 流浪地球
    hidden: z.boolean().optional().default(false),
    // hideListCover: 在首页 list 展开时不展示封面图，只显示描述 + 查看作品链接
    // 适合本身就是"目录/入口"型的页面（cover 没有信息量）
    hideListCover: z.boolean().optional().default(false),

    // itemsLayout: items 网格的布局
    //   'grid' (默认) = 3 列 4:3 卡片，cover 裁剪填充
    //   'portrait' = 自适应多列窄卡片，按图片原比例显示，适合手机截图
    itemsLayout: z.enum(['grid', 'portrait']).optional(),

    // coverFit: 首页 list 里 cover 的显示方式
    //   'cover' (默认) = 裁剪填充 16:10 框
    //   'contain' = 按图片原比例完整显示（适合竖比例的封面）
    coverFit: z.enum(['cover', 'contain']).optional(),

    // 多媒体字段，按需启用
    gallery: z.array(z.string()).optional(),
    bilibili: z.array(z.string()).optional(),     // BV 号数组
    // 自托管 mp4：字符串 = 默认播放器（带控件、点击播放）
    // 对象形式可加 loop: true = GIF 式自动循环播放（静音、无控件），适合动态演示素材
    videos: z
      .array(
        z.union([
          z.string(),
          z.object({
            src: z.string(),
            loop: z.boolean().optional().default(false),
            poster: z.string().optional()
          })
        ])
      )
      .optional(),
    pdfs: z.array(z.string()).optional(),
    models: z.array(z.string()).optional(),       // .glb 路径
    embeds: z
      .array(
        z.object({
          // 允许全 URL（http://...）或站内绝对路径（/works/xxx/...）
          url: z.string().refine(s => /^(https?:\/\/|\/)/.test(s), 'url 必须是 http(s) 或以 / 开头的站内路径'),
          height: z.number().positive(),
          title: z.string(),
          titleEn: z.string().optional()
        })
      )
      .optional(),
    links: z
      .array(
        z.object({
          label: z.string(),
          labelEn: z.string().optional(),
          url: z.string().url()
        })
      )
      .optional(),

    // 混排字段：把不同类型的媒体按顺序排成一条 feed（rauno.me/craft 风格）
    // 一个作品页里既要 B 站 + 自托管视频 + 3D 模型 + 单图 按指定顺序展示时用这个
    // 用了 items 之后，下面那几个分组字段 (bilibili/videos/models/gallery) 不再需要
    items: z
      .array(
        z.discriminatedUnion('type', [
          z.object({ type: z.literal('bilibili'), src: z.string(), title: z.string(), titleEn: z.string().optional(), poster: z.string().optional(), note: z.string().optional(), noteEn: z.string().optional() }),
          z.object({ type: z.literal('video'),    src: z.string(), title: z.string(), titleEn: z.string().optional(), poster: z.string().optional(), note: z.string().optional(), noteEn: z.string().optional() }),
          z.object({ type: z.literal('model'),    src: z.string(), title: z.string(), titleEn: z.string().optional(), poster: z.string().optional(), note: z.string().optional(), noteEn: z.string().optional() }),
          z.object({ type: z.literal('image'),    src: z.string(), title: z.string(), titleEn: z.string().optional(), poster: z.string().optional(), note: z.string().optional(), noteEn: z.string().optional(), alt: z.string().optional() }),
          // link 类型：点击直接跳转到另一个 URL（不弹模态）。src 可以是站内 /works/xxx 或外部 https://
          z.object({ type: z.literal('link'),     src: z.string(), title: z.string(), titleEn: z.string().optional(), poster: z.string().optional(), note: z.string().optional(), noteEn: z.string().optional(), external: z.boolean().optional() })
        ])
      )
      .optional()
  })
});

// 英文版作品正文：在 src/content/works-en/ 里按 xxx.en.md 命名。
// 与主 works 集合分目录，避免 glob 双重匹配的问题。
// id 是 "xxx.en"，在 [slug].astro 里通过 strip 后缀和主作品匹配。
const worksEn = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/works-en' }),
  schema: z
    .object({
      title: z.string().optional(),
      summary: z.string().optional(),
      role: z.string().optional(),
      duration: z.string().optional()
    })
    .partial()
});

export const collections = { works, worksEn };
