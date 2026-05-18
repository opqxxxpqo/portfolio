// 分类元数据（顺序即首页 / 分类页 / 筛选器显示顺序）
export type Category =
  | 'service-design'
  | 'ux-ui'
  | 'ai-prototype'
  | 'visual-design'
  | 'visual-3d'
  | 'research';

export const CATEGORIES: {
  id: Category;
  label: string;      // 英文标签（用于分类页大标题）
  labelZh: string;    // 中文短标签（用于列表卡片右侧的小字分类标识）
  description: string;
  linkTo?: string;    // 可选：覆盖默认的 /categories/<id>/ 链接，直跳到某个具体页
}[] = [
  {
    id: 'service-design',
    label: 'Service Design',
    labelZh: '服务设计',
    description: '服务设计 · 系统性思考问题与解决方案'
  },
  {
    id: 'ux-ui',
    label: 'UX / UI',
    labelZh: 'UX / UI',
    description: '产品体验与界面设计'
  },
  {
    id: 'ai-prototype',
    label: 'AI Prototype',
    labelZh: 'AI 原型',
    description: '基于 AI 的原型 / 工具 / 应用'
  },
  {
    id: 'visual-design',
    label: 'Visual Design',
    labelZh: '视觉设计',
    description: '视觉设计 · 平面 / 海报 / 商业图像'
  },
  {
    id: 'visual-3d',
    label: '3D / Modeling',
    labelZh: '建模',
    description: '建模 · 渲染 · 三维与影像',
    linkTo: '/works/modeling/'   // 直接进入建模合集页，不经过分类中间页
  },
  {
    id: 'research',
    label: 'Research',
    labelZh: '科研',
    description: '研究生阶段的科研与学术项目'
  }
];

export const CATEGORY_MAP: Record<Category, { label: string; labelZh: string; description: string }> =
  CATEGORIES.reduce(
    (acc, c) => {
      acc[c.id] = { label: c.label, labelZh: c.labelZh, description: c.description };
      return acc;
    },
    {} as Record<Category, { label: string; labelZh: string; description: string }>
  );
