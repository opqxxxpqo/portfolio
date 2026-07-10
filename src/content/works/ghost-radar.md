---
title: "GhostRun · 幽灵雷达"
titleEn: "GhostRun"
category: ux-ui
ai: true
chip: 跑步 App
chipEn: Running App
date: 2026-07-01
cover: /works/ghost-radar/poster.jpg
poster: /works/ghost-radar/poster.jpg
frameSeq:
  base: /works/ghost-radar/frames/
  count: 34
  ext: jpg
summary: "把「你 vs 历史最佳幽灵」实时可视化成雷达的 Android 跑步 App —— 从 0 到真机可装 APK 一人完成。"
summaryEn: "An Android running app that visualises you-vs-your-ghost as a live radar — taken solo from concept to an installable APK."
role: "产品 / 交互 / 视觉 / 前端（独立开发，AI 辅助编码）"
roleEn: "Product / interaction / visual / frontend (solo, AI-assisted)"
duration: "约 3 周"
durationEn: "~3 weeks"
tools:
  - Expo (React Native)
  - TypeScript
  - react-native-svg
  - expo-location
  - turf / curve-matcher
  - EAS Build
tags:
  - 跑步 App
  - 交互设计
  - 数据可视化
  - 算法
  - 独立开发
---

## 情境与任务

市面跑步 App（Keep、Strava）大多把配速、心率、里程堆成仪表盘，缺一种即时的、情绪化的对抗感。我想验证：把「和过去最好的自己赛跑」做成一块像雷达 / 车机 HUD 的追逐视觉——你是中心的点，历史最佳是逼近的幽灵圈，差距像比例尺实时缩放——能不能让「重复跑同一条路」变得有游戏性。一人负责产品、交互到工程，目标是导出真机可装的 APK 并跑通「录制 → 幽灵对比 → 保存 → 回放」完整闭环。

## 追逐雷达 · 核心视觉模型

从一个车机风格 HTML 概念动画出发，提纯出「中心句号 = 你 / 绿色虚线圈 = 幽灵 / 两圈间距 = 差距比例尺」的极简雷达。用手绘草图驱动、与实现反复对齐，三轮纠正几何模型（套圈速度、偏心 / 同心、超越语义），收敛为可复用的「追逐模型」数学几何。首跑无历史时给一个固定 6:00/km 的虚拟陪跑幽灵，保证永远有目标可追。

## 设计与工程

三轮改版确立 Khand 压缩字体 + 荧光黄绿 #DCDD41 的统一设计语言，设计径向暂停菜单、年度活跃度热力图、雷达惯性晃动等有记忆点的交互。工程上主导 Skia → react-native-svg 迁移，换来「改一行、真机秒看」；放弃需 token 的 Mapbox，自拼 CARTO 免费瓦片 + SVG 叠路线。核心是自研 Strava 式路段自动识别——turf 投影走廊 + curve-matcher 形状相似度做撮合引擎，用合成轨迹 + GPS 噪声写单测，并落地后台定位 + 熄屏震动提醒。

## 成果

从产品概念到真机可安装的 Android APK，完整跑通录制到回放闭环。沉淀出一套参数化「追逐雷达」可视化资产，复用于 App、回放动画、宣发海报三处。算法质量可验证：路段撮合对干净 / 带噪轨迹均精确抽段、无关轨迹零误报，支持后台熄屏识别。设计系统统一（Khand + 深 / 浅双主题，20+ 页面一致）。技术栈 Expo (RN) SDK 54 · TypeScript · react-native-svg · expo-location · @turf/* + curve-matcher · EAS Build。以 Expo Go + EAS + AI 辅助，3 周一人完成通常需小团队的量。
