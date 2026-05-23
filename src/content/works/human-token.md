---
title: "Human Token"
titleEn: "Human Token"
category: ai-prototype
date: 2026-05-15
cover: /works/human-token/cover.jpg
summary: '把键盘、鼠标、移动量化成"人类输出代币"的悬浮窗小工具。当前为浏览器仿真版，桌面 app 抓取的是 OS 级全局事件。'
summaryEn: 'A floating widget that quantifies keystrokes, clicks and mouse motion into a "human output token". This is a browser-simulated build; the desktop app captures OS-level global events.'
role: "独立开发"
roleEn: "Solo dev"
tools:
  - Claude Code
  - Codex
  - HTML / CSS / JS (vanilla)
  - rdev (Rust，桌面端)
tags:
  - AI 编程
  - 桌面工具
  - 行为可视化
featured: true
embeds:
  - url: /works/human-token/demo/index.html
    height: 640
    title: 浏览器仿真版 · 点进去开始打字
---

## 这是什么

把人类一段时间内的"输出量"（敲键 / 点击 / 移动鼠标）按一个固定公式量化成一个数字 token，
配一个可拖动、可折叠到屏幕边的悬浮窗实时显示。
桌面端用 Rust 的 rdev 抓 OS 级全局键鼠事件；本地 JSON 持久化。

## 浏览器仿真版的限制

- iframe 出于浏览器安全只能监听到 iframe 内部触发的事件 —— **必须先点进上方框里**
- 没有 5 小时滚动窗口，只有一个硬 cap（200k）
- 折叠用 CSS transition 模拟，没有桌面 app 的 OS 窗口操作丝滑

## AI 在哪一段

- 整体架构、token 公式、衰减机制 —— Claude / Codex 出方案，我选
- Rust 部分（rdev 接入、托盘、跨平台权限）几乎是 AI 写的，我做集成测试和调参
- 视觉风格、文案、交互细节 —— 我决定
