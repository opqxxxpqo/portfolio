---
title: "LoFi Motion Cam · 厚重 CG 拟物相机"
titleEn: "LoFi Motion Cam"
category: ai-prototype
ai: true
chip: 拟物相机
chipEn: Skeuomorphic Cam
date: 2026-05-24
cover: /works/lofi-motion-cam/cover.jpg
summary: "拟物磁带相机 App，把摄像头实时处理成 LoFi/VHS 质感并录制；质感全由 Blender 烘焙，代码只做动效与实时滤镜。"
summaryEn: "A skeuomorphic tape-camcorder that runs your camera through real-time LoFi/VHS filters and records the result — every surface baked in Blender, code only drives motion and the live shader."
role: "独立开发（AI 结对）"
roleEn: "Solo dev (AI-paired)"
tools:
  - Claude Code
  - Blender
  - Expo (EAS Build)
  - React Native + WebView
  - WebGL / GLSL
tags:
  - 拟物设计
  - 实时滤镜
  - WebGL
  - 帧序列动画
  - AI 结对开发
links:
  - label: "在新标签打开网页版"
    labelEn: "Open the web version in a new tab"
    url: https://opqxxxpqo.github.io/lofi-motion-cam/
  - label: "下载安卓版 APK"
    labelEn: "Download the Android APK"
    url: https://github.com/opqxxxpqo/lofi-motion-cam/releases/download/v2.0.2/LoFiMotionCam-2.0.2.apk
  - label: "GitHub 仓库"
    labelEn: "GitHub repo"
    url: https://github.com/opqxxxpqo/lofi-motion-cam
embeds:
  - url: https://opqxxxpqo.github.io/lofi-motion-cam/
    height: 780
    title: "在线试玩 · 电脑端 Chrome 最佳 · 点画面授权摄像头（处理都在本地，不上传）"
    titleEn: "Play online · best on desktop Chrome · tap to grant the camera (all processing is local, nothing uploaded)"
videos:
  - src: /works/lofi-motion-cam/demo.mp4
    loop: true
gallery:
  - /works/lofi-motion-cam/g1.jpg
  - /works/lofi-motion-cam/g2.jpg
  - /works/lofi-motion-cam/g3.jpg
---

## 项目定位

一台拟物磁带相机——把手机或浏览器的摄像头，实时处理成 Mini-DV/VHS 那种 LoFi 质感，还能录下来存进相册。我想验证一件事：一个设计师带着 AI 结对，能不能把「渲染级的厚重质感」一路做成真能装进手机的产品，而不是停在一张好看的 mockup。

## 关键决策

1. **不做轻薄系统拟物，改做厚重 CG 重渲染。** Nothing-OS 那种拟物已经够多了，我想赌「渲染质感」本身能不能撑起一个产品。代价是给自己立了条铁律：所有材质、光影、阴影必须在 Blender 里烘进图，代码一律不许用 CSS 假造。
2. **光影只烘不造，滑块砍掉了交叉淡化。** 为了让滑块拖动时光影连续，最初用相邻两帧交叉淡化，结果停下时两帧阴影叠在一起，露出「重影」。于是改成「位置连续 + 吸附最近那一帧烘焙图」——宁可 8 帧离散，也要任意位置的阴影都是真的。
3. **实时滤镜用 WebGL shader 重写，砍掉 CPU 逐像素。** 要在手机上同时跑实时相机和鱼眼/色散/VHS 磁带撕裂，JS 每帧逐像素直接卡死；换成 GLSL 片元着色器 + 乒乓缓冲做拖影，才跑得动。
4. **只在一个地方「程序化造」——滚轮。** 烘出来的滚轮纹条怎么都假，最后用 CSS 圆柱渐变 + 滚花 + 一层灰尘噪声搭出来。这说明「纯粹烘焙」不是目的：哪种方式更真、更可控，就用哪种。

## 迭代过程

V1（轻薄拟物沙盒：manifest 驱动、多层视差、控件精灵）→ 验证了能拼装，但太薄、控件老对不齐轨道。
V2（厚重 CG：一张烘焙整图当背景，会动的控件叠帧序列在上面）→ 质感立住了，而且同场景同相机出图，控件天然对齐。
V3（真机产品化：紧致精灵 → 自包含 bundle → Expo 打成 APK，配 WebGL 实时滤镜 + 录制存相册，网页/安卓双端）→ 变成能装、能用、能分享的东西。

## 使用工具

Claude Code（全程结对写代码与打包）、Blender（所有材质与光影烘焙）、Expo + EAS Build（打 APK）、React Native + WebView（装壳）、WebGL / GLSL（实时滤镜引擎）。
