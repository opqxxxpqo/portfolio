// 中英双语策略：
// 服务端同时把 zh / en 两份文本输出到 HTML，靠 <html lang> + CSS 控制显隐。
// 切换时只需要改 <html lang>，不刷新、不重新渲染。
// 实现细节：
//   - <html lang="zh-CN"> 或 <html lang="en">
//   - CSS（global.css）：html[lang^="zh"] .lang-en { display:none }
//                       html[lang^="en"] .lang-zh { display:none }
//   - 切换按钮：src/components/LangToggle.astro
//   - 初始化脚本：src/layouts/BaseLayout.astro 顶部 is:inline
//
// 模板里的双语写法：
//   <span class="lang-zh">中文</span>
//   <span class="lang-en">English</span>

export type Lang = 'zh' | 'en';
export const DEFAULT_LANG: Lang = 'zh';

export function normalize(input: string | null | undefined): Lang {
  if (!input) return DEFAULT_LANG;
  return input.toLowerCase().startsWith('en') ? 'en' : 'zh';
}
