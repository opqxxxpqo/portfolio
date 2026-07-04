---
title: "Texas Hold'em · 肉鸽变体"
titleEn: "Texas Hold'em · Roguelike Variant"
category: ai-prototype
ai: true
chip: 游戏原型
chipEn: Game
date: 2026-05-01
cover: /works/texas-holdem/cover.jpg
summary: "把德州扑克和 UNO 抽卡机制糅在一起的肉鸽小游戏 —— 每轮抽卡组手牌，再上桌跟 AI 玩 no-limit Texas Hold'em。"
summaryEn: "A roguelike that crosses Texas Hold'em with UNO-style draft: build your hand from cards drawn each round, then sit down for no-limit Texas Hold'em against the AI."
role: "独立开发"
roleEn: "Solo dev"
tools:
  - Claude Code
  - ChatGPT
  - Figma
tags:
  - AI 编程
  - 游戏 Prototype
  - 桌游变体
links:
  - label: "在新窗口打开完整体验"
    labelEn: "Open the full experience in a new tab"
    url: https://texas-holdem-cw4a.onrender.com/
embeds:
  - url: https://texas-holdem-cw4a.onrender.com/
    height: 720
    title: "在线试玩 · 电脑端体验更佳"
    titleEn: "Play online · best on desktop"
---

## 项目定位

一个把德州扑克和 Draft 构筑揉在一起的肉鸽：每轮先抽牌组手牌，再上桌跟 AI 打无限注德扑。

## 关键决策

1. 把 Draft 接进扑克，让概率操控从下注之前就开始——你坐下之前，牌局已经变了。
2. 砍掉过于混乱的道具卡系统——它削弱了扑克最核心的心理博弈。

## 迭代过程

V1 Draft + Poker 基础循环 → V2 AI 行为调校 → V3 UI 可读性与节奏优化。

## 使用工具

Claude Code、ChatGPT、Figma · 约 1–2 天
