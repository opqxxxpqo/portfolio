---
title: "Catnames · 猫猫派对"
titleEn: "Catnames · Party Game"
category: ai-prototype
ai: true
chip: 派对游戏
chipEn: Party Game
date: 2026-05-15
cover: /works/catnames/cover.jpg
summary: "2—8 人的派对小游戏：用单词线索引导队友在猫卡上找到目标猫。三种模式，合作 / 竞争 / 角色隐身玩法切换。"
summaryEn: "A 2–8 player party game: give one-word clues to lead teammates to the target cat on the table. Three modes — cooperative, competitive, and a hidden-role variant."
role: "独立开发"
roleEn: "Solo dev"
tools:
  - Claude Code
  - Codex
  - Socket.IO
  - Express
tags:
  - AI 编程
  - 派对游戏
  - 多人合作
links:
  - label: "在新窗口打开完整体验"
    labelEn: "Open the full experience in a new tab"
    url: https://catnames-party-game-x3qi.onrender.com/
embeds:
  - url: https://catnames-party-game-x3qi.onrender.com/
    height: 720
    title: "在线试玩 · 电脑端体验更佳"
    titleEn: "Play online · best on desktop"
---

## 项目定位

一个 2–8 人的派对游戏：用一个词的线索引导队友找到正确的猫咪卡——用来试一套极小的规则能被撑到多远。

## 关键决策

1. 把合作、对抗、隐藏身份三种玩法塞进同一套规则，玩家一次上手就能理解整个系统，而不是学三遍。
2. 砍掉过于复杂的机制——派对游戏一旦读规则的时间超过互动的时间，就不好玩了。
3. 用 meme 风的 HTTP Cats 图而不是抽象卡牌——识别更直观，也更容易变成社交笑点。

## 迭代过程

V1 本地单机原型，用 HTTP Cats 替代传统词卡 → V2 局域网 / 同设备多人测试，验证不同人数下的信息结构 → V3 基于 Socket.IO 的远程「伪联机」房间，靠语音通话 + 网页同步完成异地社交 → V4 针对不同人数重调节奏、身份机制与投票逻辑。

## 使用工具

Claude Code、Codex、Socket.IO、Express · 约 2–3 天

## 如果重做一次

加移动端非对称玩法，让不同玩家拿到不同类型的信息。
