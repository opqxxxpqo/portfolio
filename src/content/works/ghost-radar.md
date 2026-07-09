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

## 情境

市面跑步 App（Keep、Strava）大多把配速、心率、里程堆成仪表盘，缺一种即时的、情绪化的对抗感。我想验证一个假设：把「和过去最好的自己赛跑」做成一块像雷达 / 车机 HUD 的追逐视觉——你是中心的点，历史最佳是逼近的幽灵圈，差距像比例尺一样实时缩放——能不能让「重复跑同一条路」变得有游戏性。全程一人负责产品概念、交互设计到工程落地，目标是导出真机可装的 APK 并跑通完整闭环。

## 任务

打磨一套能实时表达「领先 / 落后」的追逐雷达；完成 M1 闭环（GPS 录制 → 幽灵对比 → 结果保存 → 历史回看）；坚持用 Expo Go 真机快速验证、最后用 EAS 云构建出 APK；视觉达到「可放进作品集」的完成度并形成统一设计语言。

## 追逐雷达 · 核心视觉模型

从一个车机风格 HTML 概念动画出发，提纯出「中心句号 = 你 / 绿色虚线圈 = 幽灵 / 两圈间距 = 差距比例尺」的极简雷达。用手绘草图驱动设计、与实现反复对齐，三轮纠正几何模型（套圈速度、偏心 / 同心、超越语义做反），最终收敛为可复用的「追逐模型」数学几何：所有圆环汇聚于右上锚点、幽灵方块沿对角线随距离滑动。首跑无历史时给一个固定 6:00/km 的虚拟陪跑幽灵，保证永远有目标可追。

## 交互与视觉设计

主导「毛玻璃卡片 → 扁平高对比 → 渐变深色跑步页 + 浅色主页」三轮改版，确立 Khand 压缩字体 + 荧光黄绿 #DCDD41 主题色的统一语言。设计多个有记忆点的交互：模仿 Pinterest 长按收藏的径向暂停菜单（涟漪 + ▶ / ✕）、GitHub 式年度活跃度热力图、追逐雷达的惯性晃动与「超越时幽灵虚线转圈」特效。

## 技术攻坚与自研算法

发现渲染库 Skia 无法在 Expo Go 运行后，主导迁移到 react-native-svg 并把项目从 SDK 56 降到 54，换来「改一行、真机秒看」的迭代效率；放弃需要 token 的 Mapbox，改用自拼 CARTO 免费瓦片 + SVG 叠路线，零注册即用。核心算法是 Strava 式路段自动识别——「出门随便跑，自动认出途中经过的已存路段并单独计时」：用 turf 投影走廊 + curve-matcher 形状相似度做撮合引擎，合成轨迹 + GPS 噪声写单元测试验证；进一步落地后台定位 + 熄屏震动提醒，并果断把「前台 / 后台」两个技术模式合并成一个「开始跑」，不把实现边界暴露成产品概念。

## 交付与衍生

用 EAS 云构建输出签名 APK，真机安装验证端到端闭环；设计并替换了自适应 App 图标。额外产出一个动态海报工具：复用 App 的雷达几何与配色，用 Canvas 逐帧渲染，一键导出 34 帧透明 PNG 序列——本站这张动态封面就是用它生成的。

## 成果

端到端交付：从产品概念到真机可安装的 Android APK，完整跑通「录制 → 幽灵对比 → 保存 → 回放」闭环。沉淀出一套自研可视化资产：参数化的「追逐雷达」几何模型 + 组件，可复用于 App、回放动画、宣发海报三处。算法质量可验证：路段撮合引擎对干净 / 带噪轨迹均精确抽段、无关轨迹零误报，并支持后台熄屏自动识别。设计系统完整统一：Khand + 主题色 + 深 / 浅双主题 + 玻璃 / 扁平材质，20+ 页面组件视觉一致。以 Expo Go 快速验证 + EAS 云构建 + AI 辅助编码，3 周内一人完成通常需要小团队的产品设计与实现量。

## 技术栈

Expo (React Native) SDK 54 · TypeScript strict · expo-router · react-native-svg（自绘雷达）· expo-location + task-manager（前后台定位）· @turf/* + curve-matcher（Fréchet 形状匹配）· simplify-js · CARTO 免费瓦片自拼 + SVG 叠加（免 token）· AsyncStorage · EAS Build（APK）。
