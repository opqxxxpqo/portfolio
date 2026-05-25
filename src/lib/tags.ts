// 作品标签的中英对照。
// 作品 frontmatter 里的 tags 只写中文（或本身就是英文/专有名词），
// 渲染英文版时查这张表；查不到就原样返回（适用于 Blender / F1 / UX 这类专有名词）。
const TAG_EN: Record<string, string> = {
  '3D 建模': '3D Modeling',
  '3D 短片': '3D Short Film',
  'AI 编程': 'AI Coding',
  'UI 原型': 'UI Prototype',
  '交互演示': 'Interactive Demo',
  '健身': 'Fitness',
  '品牌形象': 'Brand Identity',
  '复古影像': 'Retro Footage',
  '多人合作': 'Multiplayer Co-op',
  '太空电梯': 'Space Elevator',
  '实验交互': 'Experimental Interaction',
  '手势交互': 'Gesture Interaction',
  '桌游变体': 'Tabletop Variant',
  '桌面工具': 'Desktop Tool',
  '汽车': 'Car',
  '派对游戏': 'Party Game',
  '流浪地球': 'The Wandering Earth',
  '渲染': 'Rendering',
  '渲染大赛': 'Rendering Competition',
  '游戏 Prototype': 'Game Prototype',
  '环境设计': 'Environmental Design',
  '生成式音乐': 'Generative Music',
  '留学作品集': 'Application Portfolio',
  '盲盒': 'Blind Box',
  '硬件感 UI': 'Hardware-style UI',
  '科幻': 'Sci-Fi',
  '移动端': 'Mobile',
  '移动端 App': 'Mobile App',
  '行为可视化': 'Behavior Visualization',
  '视觉叙事': 'Visual Storytelling',
  '角色设计': 'Character Design',
  '赛车': 'Racing',
};

export function tagEn(tag: string): string {
  return TAG_EN[tag] ?? tag;
}
