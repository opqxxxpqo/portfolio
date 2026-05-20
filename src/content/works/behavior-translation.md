---
title: "乐团指挥 · Behavior Translation Terminal"
category: ai-prototype
date: 2026-05-18
cover: /works/behavior-translation/cover.svg
summary: "把全局键鼠操作翻译成音乐和 ASCII / CRT 终端可视化。桌面录制 + 网页回放双模式，全程不记录字符内容。"
role: "独立开发"
tools:
  - Claude Code
  - Codex
  - Python
  - HTML / JavaScript
tags:
  - AI 编程
  - 行为可视化
  - CRT 美学
  - 桌面工具
links:
  - label: "在新窗口打开 Web Demo"
    url: https://opqxxxpqo.github.io/behavior-translation-terminal/renderer.html
  - label: "GitHub 仓库"
    url: https://github.com/opqxxxpqo/behavior-translation-terminal
  - label: "Windows 程序下载 (latest release)"
    url: https://github.com/opqxxxpqo/behavior-translation-terminal/releases/latest
embeds:
  - url: https://opqxxxpqo.github.io/behavior-translation-terminal/renderer.html
    height: 720
    title: "Web Demo · 回放可视化 · 电脑端体验更佳"
---

## 是什么

桌面端实时记录键鼠事件（按键类别 / 鼠标坐标 / 滚轮 / 点击），把行为流"翻译"成两种东西：

- **音乐**：不同事件类别映射成乐器与音高
- **CRT 终端可视化**：模拟老式 CRT / ASCII 显示器的回放界面

## 隐私

不记录任何**字符内容**，只记录"事件类别"。不抓剪贴板，不录屏。本地 `.jsonl` 存储。

## 两种用法

- **桌面 app**（Windows）：后台运行，托盘控制；录制行为后即时生成音乐 + 回放
- **网页 Demo**：上传已经录好的 `.jsonl` 文件，或者用模拟数据直接看 CRT 可视化效果

## AI 在哪一段

- Python 桌面端 / 全局事件钩子 / 数据格式 —— Claude Code 给方案我选
- CRT 渲染器（HTML / JS / 字符画）—— Codex 写大块，我做交互调整
- 音乐映射规则、UI 文案、CRT 风格 —— 我决定
