// ============================================================
// fx.ts — 全站动效库（redesign v2）
// 1. 乱码翻牌 (text scramble)：locomotive.ca 式字符打乱落定
//    - [data-scramble]        进入视口时播一次；中英切换时重播
//    - [data-scramble-hover]  鼠标进入时播（绑在链接/按钮容器上）
// 2. 像素分辨率揭示 (pixel reveal)：图片从大像素块分档变清晰
//    - <img data-pixelate>    进入视口时播一次；宿主需 .px-host
// 兼容 ClientRouter：astro:page-load 时重新扫描；元素用 dataset 防重复绑定。
// prefers-reduced-motion 时全部跳过。
// ============================================================

const CHARSET = '!<>-_\\/[]{}—=+*#01?';

const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- 乱码翻牌 ----------

/** 对单个元素做 scramble。元素内只应有纯文本（不嵌套标签）。 */
function scramble(el: HTMLElement, opts: { stagger?: number; jitter?: number } = {}) {
  if (reducedMotion()) return;
  const { stagger = 26, jitter = 140 } = opts;

  // 原文缓存到 dataset，重复播放时以它为准
  const original = el.dataset.fxText ?? el.textContent ?? '';
  el.dataset.fxText = original;
  if (!original.trim()) return;

  // 若上一轮还在播，取消它
  const prevRaf = Number(el.dataset.fxRaf || 0);
  if (prevRaf) cancelAnimationFrame(prevRaf);

  const chars = Array.from(original); // 按码点切，兼容中文
  // 每个字符的落定时刻（ms）
  const resolveAt = chars.map((c, i) =>
    c === ' ' ? 0 : i * stagger + Math.random() * jitter
  );
  const total = Math.max(...resolveAt) + 60;
  const start = performance.now();

  const tick = (now: number) => {
    const t = now - start;
    let out = '';
    let done = true;
    for (let i = 0; i < chars.length; i++) {
      if (t >= resolveAt[i]) {
        out += chars[i];
      } else {
        done = false;
        out += CHARSET[(Math.random() * CHARSET.length) | 0];
      }
    }
    el.textContent = out;
    if (!done && t < total) {
      el.dataset.fxRaf = String(requestAnimationFrame(tick));
    } else {
      el.textContent = original;
      el.dataset.fxRaf = '';
    }
  };
  el.dataset.fxRaf = String(requestAnimationFrame(tick));
}

/** 元素当前是否可见（避开被语言切换 display:none 掉的一份） */
function isVisible(el: HTMLElement) {
  return el.offsetParent !== null || getComputedStyle(el).position === 'fixed';
}

function setupScramble() {
  // 进入视口播一次
  const io = new IntersectionObserver(
    entries => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        io.unobserve(el);
        if (isVisible(el)) scramble(el);
      }
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll<HTMLElement>('[data-scramble]').forEach(el => {
    if (el.dataset.fxBound) return;
    el.dataset.fxBound = '1';
    io.observe(el);
  });

  // hover 触发：容器进入时 scramble 其内部（或自身）的文本
  document.querySelectorAll<HTMLElement>('[data-scramble-hover]').forEach(host => {
    if (host.dataset.fxHoverBound) return;
    host.dataset.fxHoverBound = '1';
    host.addEventListener('mouseenter', () => {
      const targets = host.matches('[data-scramble]')
        ? [host]
        : Array.from(host.querySelectorAll<HTMLElement>('[data-scramble]'));
      targets.filter(isVisible).forEach(t => scramble(t, { stagger: 18, jitter: 90 }));
    });
  });
}

// 中英切换：新语言那份文字乱码翻出来
document.addEventListener('langchange', () => {
  document.querySelectorAll<HTMLElement>('[data-scramble]').forEach(el => {
    if (isVisible(el)) scramble(el);
  });
});

// ---------- 像素分辨率揭示 ----------

/** 分档降采样绘制：极糊 → 糊 → 半清 → 移除 canvas 露出原图 */
function pixelReveal(img: HTMLImageElement, stepMs = 120) {
  if (reducedMotion()) return;
  const host = img.closest('.px-host') as HTMLElement | null;
  if (!host) return;

  const run = () => {
    const w = img.clientWidth;
    const h = img.clientHeight;
    if (!w || !h) return;

    // 已有 canvas 先清掉（hover 重播场景）
    host.querySelectorAll('canvas.px-canvas').forEach(c => c.remove());

    const canvas = document.createElement('canvas');
    canvas.className = 'px-canvas';
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const tiny = document.createElement('canvas');
    const tctx = tiny.getContext('2d');
    if (!tctx) return;

    const steps = [0.02, 0.05, 0.12, 0.3]; // 档位：原尺寸的比例
    let idx = 0;

    const draw = () => {
      if (idx >= steps.length) {
        canvas.remove();
        return;
      }
      const f = steps[idx++];
      const tw = Math.max(2, Math.round(w * f));
      const th = Math.max(2, Math.round(h * f));
      tiny.width = tw;
      tiny.height = th;
      // object-fit: cover 的近似：按短边铺满
      const scale = Math.max(tw / img.naturalWidth, th / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      tctx.imageSmoothingEnabled = true;
      tctx.drawImage(img, (tw - dw) / 2, (th - dh) / 2, dw, dh);
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(tiny, 0, 0, tw, th, 0, 0, w, h);
      setTimeout(draw, stepMs);
    };

    host.appendChild(canvas);
    draw();
  };

  if (img.complete && img.naturalWidth) run();
  else img.addEventListener('load', run, { once: true });
}

function setupPixelate() {
  const io = new IntersectionObserver(
    entries => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        io.unobserve(e.target);
        pixelReveal(e.target as HTMLImageElement);
      }
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll<HTMLImageElement>('img[data-pixelate]').forEach(img => {
    if (img.dataset.fxPxBound) return;
    img.dataset.fxPxBound = '1';
    io.observe(img);
  });
}

// ---------- 对外接口（首页浮动预览等场景手动触发） ----------
declare global {
  interface Window {
    __fx: { scramble: typeof scramble; pixelReveal: typeof pixelReveal };
  }
}
window.__fx = { scramble, pixelReveal };

// ---------- 初始化 ----------
function initFx() {
  setupScramble();
  setupPixelate();
}
// astro:page-load 首次进入和每次 ClientRouter 换页后都会触发
document.addEventListener('astro:page-load', initFx);
