---
title: "Visual Conductor"
titleEn: "Visual Conductor"
category: ai-prototype
ai: true
date: 2026-05-20
cover: /works/visual-conductor/cover.svg
summary: "用摄像头捕捉手势、把手部动作转译成音乐的浏览器交互。三种模式：指挥古典乐、弹虚拟古琴、演奏特雷门琴。无需任何外接硬件。"
summaryEn: "A browser app that turns webcam-captured hand gestures into music. Three modes: conduct classical recordings, play a virtual guqin, or perform a theremin — no external hardware."
role: "独立开发"
roleEn: "Solo dev"
tools:
  - Claude Code
  - MediaPipe Hands
  - Tone.js
  - HTML / JavaScript
tags:
  - AI 编程
  - 手势交互
  - 生成式音乐
  - Web Audio
links:
  - label: "在新窗口打开完整体验"
    url: https://visual-conductor.onrender.com/
  - label: "GitHub 仓库"
    url: https://github.com/opqxxxpqo/visual-conductor
embeds:
  - url: https://visual-conductor.onrender.com/
    height: 720
    title: "在线试玩 · 需摄像头权限 · 电脑端体验更佳"
---

## 项目定位

用摄像头把你的手变成乐器：指挥古典乐、拨虚拟古琴、或演奏特雷门琴，全程不靠任何外接硬件，只要一个浏览器。

## 关键决策

1. 全部用原生 JS + Canvas，不上构建工具——这样它能像一个轻量网页乐器一样，打开即用。
2. 在 MediaPipe 之上加自定义 One Euro Filter——原始手势追踪太抖，过滤后才像真正能演奏的乐器。
3. 古琴用程序化声音合成而不是预录采样——音色能连续响应手势力度，而不是一段固定音频。

## 迭代过程

V1 交响乐指挥 → V2 古琴交互 → V3 特雷门琴式空间音高控制。

三种模式的技术骨架：MediaPipe Hands 双手 21 关键点追踪，自定义 One Euro 滤波做平滑，Tone.js 做音频合成，CRT 美学带扫描线和噪点。

## 使用工具

Claude Code、MediaPipe Hands、Tone.js、vanilla JS · 约 1–2 天
