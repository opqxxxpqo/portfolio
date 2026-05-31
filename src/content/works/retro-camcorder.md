---
title: "LoFi Motion Cam · 复古摄像机"
titleEn: "LoFi Motion Cam"
category: ai-prototype
ai: true
chip: 移动端 App
chipEn: Mobile App
date: 2026-05-19
cover: /works/retro-camcorder/cover.jpg
summary: "把手机摄像头变成 2000 年代 MiniDV / 老式运动相机的 App。鱼眼、480P 低清、VHS 噪点、运动拖影、烧录式 HUD，整机是哑光黑新复古硬件 UI。"
summaryEn: "An app that turns the phone camera into a 2000s MiniDV / old action-cam recorder: fisheye, 480P low-res, VHS noise, motion trails, a burned-in HUD, all wrapped in matte-black neo-retro hardware UI."
role: "独立开发"
roleEn: "Solo dev"
tools:
  - Figma
  - Codex
  - React Native (Expo)
  - Web Canvas
tags:
  - AI 编程
  - 移动端 App
  - 复古影像
  - 硬件感 UI
coverFit: contain
itemsLayout: portrait
items:
  - type: image
    src: /works/retro-camcorder/cover.jpg
    title: "硬件感取景器 UI"
    titleEn: "Hardware-style viewfinder UI"
---

## 项目定位

一个把手机摄像头变成 2000 年代 MiniDV 摄像机的 App：480P、鱼眼、VHS 噪点、拖影——给那些想让视频「从拍下那一刻起就像回忆」的人。

## 关键决策

1. 录的是处理后的画面而不是原始流——所见即所得，成片和取景器里看到的完全一致。
2. 用统一的 Web Canvas 渲染管线而不是各端原生滤镜——只维护一条处理路径，保证不同设备上效果一致。
3. 把鱼眼、拖影、噪点、色温拆成独立开关而不是固定预设——「记忆感」需要按场景微调。

## 迭代过程

V1 基础录制 + VHS 风格 → V2 中英双语 UI、模块化开关、REC 动画反馈 → V3 进一步强化实体设备质感。

技术骨架：Expo + React Native，用 `react-native-webview` 跑 Web Canvas 处理管线，`MediaRecorder` 录制，`expo-media-library` 存盘，EAS Build 出 Android APK。

## 使用工具

Figma、Codex、React Native (Expo)、Web Canvas、EAS Build · 约 1–2 天

## 如果重做一次

把渲染迁到原生 GPU shader，提高帧率、降低耗电。
