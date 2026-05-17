# 加新作品指南

每加一个作品，需要做两件事：
1. 在 `public/works/<slug>/` 放素材
2. 在 `src/content/works/<slug>.md` 写 markdown

`<slug>` 就是作品的 URL 短名，例如 `multimodal-research`，最终对应 URL：`/works/multimodal-research`。

---

## 1. Frontmatter 字段完整说明

```yaml
---
# 必填字段
title: "多模态交互系统在城市公共空间中的可用性研究"
category: research            # 必须是 research / ai / portfolio / coursework 之一
date: 2026-03-10              # YYYY-MM-DD
cover: /works/<slug>/cover.jpg
summary: "一句话描述这个作品。会显示在卡片和列表里，控制在 50 字内。"

# 可选字段
role: "独立完成"               # 你的角色，如 "独立完成" / "团队负责 XX"
tools:                        # 用到的工具，AI 工具会被 HR 重点关注
  - Figma
  - Claude
  - ChatGPT
duration: "2025.09 — 2026.02"
tags:                         # 自由标签，目前只在详情页显示
  - HCI
  - 多模态交互
featured: true                # true 则首页该分类区块优先显示
longform: false               # true 切到长滚动叙事版式（详见下方）

# 多媒体字段（按需启用，可任意组合）
gallery:                      # 图片画廊
  - /works/<slug>/g1.jpg
  - /works/<slug>/g2.jpg

bilibili:                     # B 站视频 BV 号数组
  - BV1GJ411x7h7

pdfs:                         # PDF 文件
  - /works/<slug>/report.pdf

models:                       # .glb 3D 模型
  - /works/<slug>/model.glb

embeds:                       # 外部 iframe，比如 web demo / Observable
  - url: https://example.com/demo
    height: 520
    title: "在线 Demo"

links:                        # 外部链接
  - label: "GitHub 仓库"
    url: https://github.com/yourname/repo
  - label: "Hugging Face Space"
    url: https://huggingface.co/spaces/yourname/xxx
---

## 项目背景

这里开始写正文，自由 markdown。

## 我做了什么

建议四段式：项目背景 / 我做了什么 / 解决了什么问题 / AI 如何赋能。
也可以自由组织，不强制。
```

**字段校验**：所有 frontmatter 都经过 zod 严格校验。写错字段名、用了非法的 category、漏了必填字段，`npm run dev` 启动时就会报错指明具体问题。

---

## 2. 图片处理

### 推荐尺寸

| 用途 | 推荐尺寸 | 比例 |
| --- | --- | --- |
| `cover` 封面 | 1600 × 1000 | 16:10 |
| `gallery` 画廊 | 1200 × 900 或同尺寸组合 | 4:3 或自由 |
| 长 longform 中插入 | 宽度 ≥ 1600，高度自由 | 自由 |

### 压缩 / 优化

请上传前压缩，**单张 ≤ 300KB 为佳**：

- 在线工具：[Squoosh](https://squoosh.app)（推荐，本地处理不上传），[TinyPNG](https://tinypng.com)
- macOS 命令行：`brew install jpegoptim pngquant`，然后
  ```bash
  jpegoptim --max=85 *.jpg
  pngquant --quality=70-90 *.png
  ```
- Windows：推荐用 [ImageOptim Online](https://imageoptim.com) 或直接 Squoosh

### 格式选择

- 照片类 → `.jpg`（85% 质量足够）
- 截图、含文字、矢量风格 → `.png` 或 `.webp`
- 不要传 `.heic`（iOS 默认格式，浏览器兼容性差）

### 为什么不用 Astro 的 `<Image>` 自动优化

`<Image>` 只能处理 `src/` 里的资源，但作品素材按惯例放在 `public/` 下方便管理。
**取舍**：手动压缩一次比每次构建都跑 sharp 更省时间和 CI 算力。

---

## 3. 嵌入 B 站视频

### 怎么找 BV 号

打开视频页，URL 类似：

```
https://www.bilibili.com/video/BV1GJ411x7h7?from=search
```

取中间的 `BV1GJ411x7h7` 即可，**不要带 `?` 后面的参数**。

```yaml
bilibili:
  - BV1GJ411x7h7
  - BV1xx411c7mD
```

### 注意事项

- 多 P 视频会默认播放第一 P，目前不支持指定分 P（如有需要可改 `src/components/Bilibili.astro` 加 `page` 参数）
- 已加 `referrerpolicy="no-referrer"`，避免某些时段的防盗链触发
- 视频本身存在 B 站，**你的网站不消耗任何流量**
- 不能用 YouTube：本站默认面向国内访问

---

## 4. 嵌入 PDF

### 推荐做法

1. PDF 文件放到 `public/works/<slug>/xxx.pdf`
2. 在 frontmatter 写：
   ```yaml
   pdfs:
     - /works/<slug>/xxx.pdf
   ```

效果：页面上会出现一个嵌入预览框 + 顶部下载按钮。

### 单文件大小建议

- 简历、论文摘要：≤ 5MB
- 完整作品集 PDF：≤ 20MB，再大用 [Smallpdf](https://smallpdf.com) 或 [iLovePDF](https://www.ilovepdf.com) 压缩
- 超过 20MB 强烈建议改用 [Cloudflare R2](https://developers.cloudflare.com/r2/) 或自己的 OSS，链接放到 `links` 字段

### 压缩 PDF

- macOS Preview → 导出 → Quartz Filter → Reduce File Size
- 在线：[Smallpdf compress](https://smallpdf.com/compress-pdf)
- 命令行：`gs -sDEVICE=pdfwrite -dPDFSETTINGS=/ebook -o out.pdf in.pdf`（ghostscript）

---

## 5. 嵌入 3D 模型 (.glb)

### 导出 .glb

| 软件 | 导出方式 |
| --- | --- |
| Blender | File → Export → glTF 2.0 (.glb)，选 "Format: Binary" |
| Rhino | Rhino 7+ 可装 [glTF-Binary Exporter](https://www.food4rhino.com/) 插件 |
| SketchUp | 装 [Khronos glTF Extension](https://extensions.sketchup.com/) |
| C4D / Maya | 内置 glTF 2.0 导出，注意勾选 Binary |

### 压缩 .glb（**必做**）

原始 .glb 通常几十 MB，必须压缩到 **≤ 5MB**，否则移动端体验崩盘。

**推荐工具**：[gltf-transform](https://gltf-transform.donmccurdy.com)

```bash
npm install -g @gltf-transform/cli

# 1. Draco 几何压缩（最常用，压缩率高）
gltf-transform draco input.glb output.glb

# 2. 纹理压缩（额外再小一半）
gltf-transform webp output.glb final.glb --quality 80

# 3. 优化（清理无用顶点）
gltf-transform optimize final.glb final.glb
```

或者在线工具：[gltf.report](https://gltf.report/) — 直接拖入，自动给压缩建议。

### 使用

```yaml
models:
  - /works/<slug>/sculpture.glb
```

效果：

- 自动旋转（首次进入 2 秒后开始）
- 支持鼠标拖动 / 滚轮缩放 / 双指手势（移动端）
- 右下角按钮可手动开关自动旋转
- 用 `environment-image="neutral"` 中性环境光，颜色不会偏

### 给 3D 模型加海报图（可选）

模型加载时需要时间，可以提前放一张静态图：

```yaml
models:
  - /works/<slug>/sculpture.glb
```

如果想自定义海报，需要小改 `src/components/ModelViewer.astro` 来接 `poster` 参数。

---

## 6. 外部 iframe 嵌入

适合用于：

- Observable notebook
- Hugging Face Space
- 自己部署的 web demo
- CodeSandbox / StackBlitz

```yaml
embeds:
  - url: https://huggingface.co/spaces/yourname/xxx
    height: 600
    title: "Hugging Face Space"
```

**注意**：

- 部分网站设了 `X-Frame-Options: DENY`，无法被 iframe，会显示空白。这种情况只能放 `links`。
- `height` 单位是 px

---

## 7. longform 长滚动模式

适合：
- 留学申请作品集
- 深度叙事项目
- 包含大量大图的项目

打开方式：

```yaml
longform: true
```

效果：

- 切到窄容器（760px 宽），更接近 Medium 阅读体验
- 字号变大、行距变松
- 标题留白更多

不开 longform 时，页面用 1200px 宽容器，更适合横向对比、图文并茂的项目。

---

## 8. 完整示例 / 模板

下面四个文件就是完整示例，照着改最快：

- [`src/content/works/research-sample.md`](./src/content/works/research-sample.md) — 含画廊 + 视频 + PDF
- [`src/content/works/ai-sample.md`](./src/content/works/ai-sample.md) — 含画廊 + embeds + links
- [`src/content/works/portfolio-sample.md`](./src/content/works/portfolio-sample.md) — longform 多图叙事
- [`src/content/works/coursework-sample.md`](./src/content/works/coursework-sample.md) — 最简形态

---

## 9. 常见问题排查

### 启动 / 构建报错

| 错误 | 原因 | 解决 |
| --- | --- | --- |
| `Invalid enum value. Expected 'research' \| 'ai' \| ...` | category 写错 | 用四个固定值之一 |
| `Expected date, received string` | 日期格式错 | 用 `YYYY-MM-DD`，不要写 `2026/3/10` |
| `Invalid url` | links/embeds 的 url 不带 `https://` | 加上协议 |
| 找不到封面图 404 | cover 路径写错 | 路径要 `/` 开头，对应 `public/` 下真实文件 |

### 页面显示问题

- **画廊图片错位**：检查图片宽高比是否一致，建议都用 4:3 或 16:10
- **PDF 在 Safari 显示空白**：iOS Safari 不支持内嵌 PDF，用户会看到下载按钮，这是预期行为
- **B 站视频加载慢**：B 站 iframe 在国内偶尔抽风，刷新即可。如长期失败检查 BV 号
- **3D 模型黑屏**：检查 .glb 是否完整，用 [gltf.report](https://gltf.report) 验证

### 修改后没生效

- Astro Content Collections 需要重启 dev server 才能识别新文件 → `Ctrl+C` 重起 `npm run dev`
- frontmatter 改了字段类型后也要重启
- 强制刷新浏览器：`Ctrl+Shift+R` (Windows) / `Cmd+Shift+R` (Mac)

### 想批量加多个作品

1. 先把所有 markdown 文件写完
2. 所有素材按 `public/works/<slug>/` 放好
3. 一次性 `npm run dev`，看到全部出现就 push

---

## 速查：最小可用作品模板

复制粘贴改一下就能跑：

```yaml
---
title: "你的作品名"
category: research
date: 2026-05-16
cover: /works/your-slug/cover.jpg
summary: "一句话简介。"
---

## 项目背景

...

## 我做了什么

...
```
