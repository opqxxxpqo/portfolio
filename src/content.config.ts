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
    category: z.enum(CATEGORIES),
    date: z.coerce.date(),
    cover: z.string(), // public/ 下的相对路径，例 /works/research-sample/cover.svg
    summary: z.string(),

    role: z.string().optional(),
    tools: z.array(z.string()).optional(),
    duration: z.string().optional(),
    tags: z.array(z.string()).optional(),
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
    videos: z.array(z.string()).optional(),       // 自托管 mp4 路径
    pdfs: z.array(z.string()).optional(),
    models: z.array(z.string()).optional(),       // .glb 路径
    embeds: z
      .array(
        z.object({
          // 允许全 URL（http://...）或站内绝对路径（/works/xxx/...）
          url: z.string().refine(s => /^(https?:\/\/|\/)/.test(s), 'url 必须是 http(s) 或以 / 开头的站内路径'),
          height: z.number().positive(),
          title: z.string()
        })
      )
      .optional(),
    links: z
      .array(
        z.object({
          label: z.string(),
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
          z.object({ type: z.literal('bilibili'), src: z.string(), title: z.string(), poster: z.string().optional(), note: z.string().optional() }),
          z.object({ type: z.literal('video'),    src: z.string(), title: z.string(), poster: z.string().optional(), note: z.string().optional() }),
          z.object({ type: z.literal('model'),    src: z.string(), title: z.string(), poster: z.string().optional(), note: z.string().optional() }),
          z.object({ type: z.literal('image'),    src: z.string(), title: z.string(), poster: z.string().optional(), note: z.string().optional(), alt: z.string().optional() }),
          // link 类型：点击直接跳转到另一个 URL（不弹模态）。src 可以是站内 /works/xxx 或外部 https://
          z.object({ type: z.literal('link'),     src: z.string(), title: z.string(), poster: z.string().optional(), note: z.string().optional(), external: z.boolean().optional() })
        ])
      )
      .optional()
  })
});

export const collections = { works };
