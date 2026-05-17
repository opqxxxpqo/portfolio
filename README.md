# 个人作品集 · Astro 5

一个面向国内求职 HR 的研究生作品集站点。技术栈：Astro 5 + Content Collections + 原生 CSS。

- 默认深色模式（可切换）
- View Transitions（页间无刷新过渡）
- 严格 zod schema 校验作品 frontmatter
- 内置画廊 / B 站视频 / PDF / 3D 模型 / 外部 iframe / 链接 六种内容块
- 支持普通版式和 longform 长滚动叙事版式
- 静态部署，国内访问优先：Netlify + GitHub Actions 双通道

---

## 本地运行

```bash
# 装依赖
npm install

# 起本地服务（默认 http://localhost:4321）
npm run dev

# 类型检查
npm run check

# 生产构建
npm run build

# 预览 build 结果
npm run preview
```

> Node 版本要求 ≥ 20。

---

## 加新作品

详见 [`ADDING_WORKS.md`](./ADDING_WORKS.md)。简版流程：

1. 在 `public/works/<slug>/` 放图片
2. 在 `src/content/works/<slug>.md` 写 markdown
3. `npm run dev` 看效果，没问题就 push

---

## 推到 GitHub

```bash
git init
git add .
git commit -m "init portfolio"
git branch -M main
git remote add origin git@github.com:<你的用户名>/<仓库名>.git
git push -u origin main
```

---

## 部署到 Netlify

提供两条路径，**选一条即可**。

### 路径 A：Netlify 直接连 Git（推荐，最省事）

1. 注册 [netlify.com](https://www.netlify.com)
2. 进入控制台 → **Add new site** → **Import an existing project**
3. 选 GitHub，授权后选你的仓库
4. Netlify 会自动识别根目录的 `netlify.toml`，无需手动填 build 命令
5. 点 **Deploy**，等 1—2 分钟即可拿到 `xxx.netlify.app` 域名

**改自定义域名**：站点 Settings → Domain management → Add custom domain。Netlify 自动签 HTTPS 证书。

### 路径 B：GitHub Actions 推送部署

适合需要在 CI 里做额外校验（如 lint、test）的场景。

1. 在 Netlify 控制台 → 新建一个空站点（Sites → Add new site → Deploy manually，先随便拖个空文件夹）
2. 进站点 Settings → General → **Site ID**，复制
3. 个人头像 → User settings → Applications → **Personal access tokens** → 新建一个 token，复制
4. 在 GitHub 仓库 Settings → Secrets and variables → Actions → New repository secret，添加两个：
   - `NETLIFY_SITE_ID`：第 2 步的 ID
   - `NETLIFY_AUTH_TOKEN`：第 3 步的 token
5. 推到 `main` 分支即自动触发 [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml)

---

## 上线前必做的替换

以下文件/字段都是占位，**真上线前请逐项替换**：

| 文件/位置 | 替换内容 |
| --- | --- |
| `astro.config.mjs` `site` 字段 | 你的正式域名（影响 sitemap 和 og:url） |
| `public/robots.txt` | 域名同步替换 |
| `public/favicon.svg` | 你自己的 favicon |
| `public/og-image.svg` | 社交分享缩略图（1200×630，建议 PNG） |
| `public/resume.pdf` | 真实简历 PDF |
| `public/wechat-qr.svg` | 你的微信二维码图片 |
| `public/process/screenshot-*.svg` | 和 Claude Code 协作的真实截图（PNG，宽 ≥ 1600px） |
| `src/components/Header.astro` 中的 `YourName` | 改成你的名字 |
| `src/components/Footer.astro` 中的 `you@example.com` / GitHub | 改成你的联系方式 |
| `src/pages/about.astro` | 整页内容（教育背景、技能等） |
| `src/pages/index.astro` 中的 hero 文案 | 改成你的姓名和一句话定位 |
| `src/content/works/*.md` | 四个示例作品，全部替换/删除 |
| `public/works/*` | 对应素材目录 |

---

## 性能与国内访问优化（已默认开启）

- 字体走 `cdn.jsdelivr.net`（国内可用），中文用系统字体回退避免 FOIT
- 静态资源在 `netlify.toml` 中配了 immutable 缓存
- 图片全部 `loading="lazy"`、`decoding="async"`
- B 站 iframe 加了 `referrerpolicy="no-referrer"`，规避防盗链
- `<ClientRouter />` 启用 view transitions，配合 `prefetch` 预取下一页
- 无重型 JS 框架（无 React/Vue），运行时几乎只有主题切换脚本

---

## 目录结构

```
.
├── public/                   # 静态资源（图片、PDF、字体）
│   ├── works/<slug>/         # 每个作品的素材目录
│   ├── favicon.svg
│   ├── og-image.svg
│   ├── robots.txt
│   └── resume.pdf
├── src/
│   ├── components/           # 可复用组件（Header、Gallery、Bilibili…）
│   ├── content/works/        # 作品 markdown，每个一个 .md
│   ├── content.config.ts     # zod schema 校验
│   ├── layouts/              # BaseLayout + WorkLayout
│   ├── lib/categories.ts     # 分类元数据
│   ├── pages/                # 文件路由
│   │   ├── index.astro       # 首页
│   │   ├── about.astro
│   │   ├── process.astro
│   │   ├── 404.astro
│   │   └── works/
│   │       ├── index.astro   # 全部作品
│   │       └── [slug].astro  # 作品详情动态路由
│   └── styles/global.css
├── .github/workflows/deploy.yml   # GitHub Actions
├── astro.config.mjs
├── netlify.toml
├── package.json
└── tsconfig.json
```

---

## 常见问题

**Q: 构建报 schema 错误？**
A: 看终端报错指明的字段名，对照 [`ADDING_WORKS.md`](./ADDING_WORKS.md) 检查 frontmatter。日期建议用 `YYYY-MM-DD`。

**Q: B 站视频不显示？**
A: 复制视频页 URL 里 `/video/BVxxxxxx` 这段的 BV 号，不要带 `?` 后面的参数。

**Q: 想换强调色？**
A: 改 `src/styles/global.css` 中 `--accent` 和 `--accent-strong`。

**Q: 想加新分类？**
A: 改 `src/content.config.ts` 中的 `CATEGORIES` 数组和 `src/lib/categories.ts`，两处必须同步。

---

Built with Astro 5 · Claude Code · 2026
