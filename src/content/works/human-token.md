---
title: "Human Token"
titleEn: "Human Token"
category: ai-prototype
ai: true
chip: 桌面工具
chipEn: Desktop Tool
date: 2026-05-15
cover: /works/human-token/cover.jpg
summary: '把键盘、鼠标、移动量化成"人类输出代币"的悬浮窗小工具。当前为浏览器仿真版，桌面 app 抓取的是 OS 级全局事件。'
summaryEn: 'A floating widget that quantifies keystrokes, clicks and mouse motion into a "human output token". This is a browser-simulated build; the desktop app captures OS-level global events.'
role: "独立开发"
roleEn: "Solo dev"
tools:
  - Claude Code
  - Codex
  - Tauri
  - Rust
  - vanilla JS
tags:
  - AI 编程
  - 桌面工具
  - 行为可视化
featured: true
embeds:
  - url: /works/human-token/demo/index.html
    height: 640
    title: 浏览器仿真版 · 点进去开始打字
    titleEn: Browser simulation · click in and start typing
---

## 项目定位

一个悬浮桌面组件，把键盘输入、点击和鼠标移动距离换算成一个不断增长的数字，让「人的输出」第一次变得能被看见。

## 关键决策

1. 用一个固定公式定义输出，而不是追求「更聪明」的 AI 评分——我要的是不同 session 之间能直接比较。
2. 用 Rust + rdev 抓系统级全局事件，同时接受浏览器版本只能监听页面内事件的限制。
3. 把大量 Rust 底层交给 AI 生成，我自己守住整合测试、交互逻辑和衰减参数调校。

## 迭代过程

V1 浏览器计数器 → V2 桌面悬浮组件 → V3 本地持久化与跨 session 累积。

## 使用工具

Claude Code、Codex、Tauri、Rust、vanilla JS · 约 0.5 天

---

> 上方内嵌的是浏览器仿真版：iframe 出于安全只能监听框内事件，**先点进框里再开始打字**；它没有 5 小时滚动窗口、只有一个硬 cap（200k），折叠也只是 CSS 过渡，不如桌面 app 的 OS 窗口丝滑。
