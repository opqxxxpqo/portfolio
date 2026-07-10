---
title: "LoFi Motion Cam · 厚重 CG 拟物相机"
titleEn: "LoFi Motion Cam"
category: ai-prototype
ai: true
chip: 拟物相机
chipEn: Skeuomorphic Cam
date: 2026-05-24
cover: /works/lofi-motion-cam/cover.jpg
poster: /works/lofi-motion-cam/poster.webp
frameSeq:
  base: /works/lofi-motion-cam/frames/
  count: 50
  ext: webp
summary: "把一个普通的复古滤镜相机，重做成「像真实机器一样」的厚重 CG 拟物产品，网页 / 安卓双端都能实时体验并录制。"
summaryEn: "Rebuilt an ordinary retro-filter camera into a heavyweight CG skeuomorphic product that feels like a real machine — live and recordable on both web and Android."
role: "独立开发（设计 / 3D 烘焙 / 交互 / 前端 / 工程，AI 结对）"
roleEn: "Solo (design / 3D baking / interaction / frontend / engineering, AI-paired)"
tools:
  - Blender
  - Claude Code
  - WebGL / GLSL
  - React Native + WebView
  - Expo / EAS Build
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

## 情境与任务

项目最初只是个普通复古滤镜相机（Expo 套 WebView，把摄像头实时过一层 LoFi 滤镜）：界面扁平、和商店里一堆滤镜相机撞脸，没有记忆点。任务是把它升级成有强烈质感的厚重 CG 拟物相机——像一台真实的复古 DV 机器；同时不牺牲实时相机性能，并真正打包成手机能装、能在线体验的产品，而不是停在设计稿。

## 核心做法

否定轻薄「系统拟物」，改做厚重 CG 重渲染，立下铁律：所有材质、光影、阴影全在 Blender 里烘进图，代码只负责「动」，绝不用 CSS 假造。会动的控件最难——滑块从相邻帧交叉淡化改成「位置连续 + 吸附最近烘焙帧」，保证任意位置的高光和阴影都是真烘的。把 CPU 逐像素的 JS 滤镜整体重写为 WebGL / GLSL 片元着色器 + 乒乓缓冲，让鱼眼、色散、VHS 磁带撕裂在手机 WebView 里跑得动。唯独滚轮烘不真，果断改用程序化 CSS——取舍标准始终是「更真、更可控」。

## 成果与上线

写抠图 + 打包脚本，把控件帧序列从 ~45MB 压到 44 张精灵（~6MB），内联成 8MB 自包含 HTML，用 Expo / EAS 打成 APK。真机实测定位并修掉 5 个问题（录制热区、系统蓝色高光、停录后内存泄漏闪退、翻转镜头键、拖动错位）。web 版上 GitHub Pages、APK 发 GitHub Release，点开即玩 / 扫码即装。最终从一个撞脸的滤镜相机，变成网页 + 安卓双端能实时体验、录制存相册的厚重拟物相机——一人（+ AI 结对）打通了设计 / 3D 烘焙 / 交互 / 前端 / 工程 / 发布全链路。
