import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 部署到 Netlify 前请把 site 改成你的正式域名（例如 https://yourname.netlify.app 或自定义域名）
// 这一项影响 sitemap.xml 和 og:url 的生成
export default defineConfig({
  site: 'https://qi-lu-portfolio.onrender.com',
  integrations: [sitemap()],
  image: {
    // 允许使用 public/ 下的图片，同时启用 Astro <Image> 处理 src/ 下的资源
    service: { entrypoint: 'astro/assets/services/sharp' }
  },
  build: {
    inlineStylesheets: 'auto'
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  vite: {
    server: { fs: { strict: false } }
  }
});
