import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// site = 线上正式域名（部署在 Vercel），影响 sitemap.xml 和 og:url 的生成。
// 有自定义域名后换成自定义域名即可。
export default defineConfig({
  site: 'https://portfolio-livid-beta-43.vercel.app',
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
