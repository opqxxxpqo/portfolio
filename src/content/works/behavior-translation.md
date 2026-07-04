---
title: "Digital Conductor"
titleEn: "Digital Conductor"
category: ai-prototype
ai: true
chip: 生成式音乐
chipEn: Generative Music
date: 2026-05-18
cover: /works/behavior-translation/cover.jpg
summary: "把数字行为转译为交响乐的实验性交互系统。键盘、鼠标、停顿与操作密度被静默记录，实时映射为音乐结构、动态 orchestration 与可视化数据流。"
summaryEn: "An experimental interactive system that transcribes digital behavior into orchestral music. Keystrokes, mouse paths, pauses, and operational density are silently logged and mapped in real time into musical structure, dynamic orchestration, and a visual data stream."
role: "独立开发"
roleEn: "Solo dev"
tools:
  - Claude Code
  - Codex
  - Python
  - HTML / JavaScript
tags:
  - AI 编程
  - 生成式音乐
  - 行为可视化
  - 实验交互
links:
  - label: "在新窗口打开 Web Demo"
    labelEn: "Open Web Demo in a new tab"
    url: https://opqxxxpqo.github.io/behavior-translation-terminal/renderer.html
  - label: "GitHub 仓库"
    labelEn: "GitHub repo"
    url: https://github.com/opqxxxpqo/behavior-translation-terminal
  - label: "Windows 程序下载 (latest release)"
    labelEn: "Windows download (latest release)"
    url: https://github.com/opqxxxpqo/behavior-translation-terminal/releases/latest
embeds:
  - url: https://opqxxxpqo.github.io/behavior-translation-terminal/renderer.html
    height: 720
    title: "Web Demo · 回放可视化 · 电脑端体验更佳"
    titleEn: "Web Demo · playback visualization · best on desktop"
---

## 项目定位

一个默默记录你无意识电脑行为的系统——键盘输入、鼠标轨迹、停顿时间——并把它们实时谱成交响乐，让原本被忽视的数据变成一场潜意识的演奏。

## 关键决策

1. 把行为谱成「音乐」而不是数据仪表盘——日志和点击率只会把人压扁成数字，音乐能留住情绪。
2. 把操作密度映射成编曲层次，让强度变化听起来像情绪起伏，而不是数值高低。
3. 桌面级捕捉与浏览器 Demo 分成两条路——浏览器出于安全只能监听页面内部事件，桌面端才抓得到全局行为。

## 迭代过程

V1 浏览器键鼠模拟 → V2 桌面级全局行为捕捉 → V3 不同行为映射到不同乐器层。

## 使用工具

Claude Code、Codex、Python、HTML / JavaScript · 约 1–2 天
