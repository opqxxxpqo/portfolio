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
  label: string;
  description: string;
  linkTo?: string;   // 可选：覆盖默认的 /categories/<id>/ 链接，直跳到某个具体页
}[] = [
  {
    id: 'service-design',
    label: 'Service Design',
    description: '服务设计 · 系统性思考问题与解决方案'
  },
  {
    id: 'ux-ui',
    label: 'UX / UI',
    description: '产品体验与界面设计'
  },
  {
    id: 'ai-prototype',
    label: 'AI Prototype',
    description: '基于 AI 的原型 / 工具 / 应用'
  },
  {
    id: 'visual-design',
    label: 'Visual Design',
    description: '视觉设计 · 平面 / 海报 / 商业图像'
  },
  {
    id: 'visual-3d',
    label: '3D / Modeling',
    description: '建模 · 渲染 · 三维与影像',
    linkTo: '/works/modeling/'   // 直接进入建模合集页，不经过分类中间页
  },
  {
    id: 'research',
    label: 'Research',
    description: '研究生阶段的科研与学术项目'
  }
];

export const CATEGORY_MAP: Record<Category, { label: string; description: string }> =
  CATEGORIES.reduce(
    (acc, c) => {
      acc[c.id] = { label: c.label, description: c.description };
      return acc;
    },
    {} as Record<Category, { label: string; description: string }>
  );
