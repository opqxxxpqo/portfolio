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

## 情境

项目最初只是一个简单的复古相机 App：Expo 套一个 WebView，把手机摄像头实时过一层 LoFi 滤镜。功能能跑，但界面是很普通的扁平 UI——和应用商店里一堆滤镜相机撞脸，没有记忆点、留不住人。

## 任务

把它从「一个能用的 demo」升级成有强烈质感和记忆点的作品：UI 重做成厚重 CG 拟物，像一台真实存在的复古 DV 机器；同时不牺牲实时相机性能，并真正打包成能装进手机、能在线体验的产品，而不是停在设计稿。

## 定方向 · 厚重 CG 重渲染

否定轻薄的「系统拟物」（Nothing-OS 那种），改做厚重 CG 重渲染，并给自己立了条铁律：所有材质、光影、阴影全部在 Blender 里烘进图，代码只负责「动」，绝不用 CSS 假造光影——这是质感不塑料的根本。

## 光影只烘不造

会动的控件最难。滑块拖动最初用相邻帧交叉淡化，停下时两帧阴影叠成「重影」。我改成位置连续 + 吸附最近的烘焙帧：宁可 8 帧离散，也保证任意位置的高光和接触阴影都是真烘的。

## 实时性能与务实取舍

把原来 CPU 逐像素的 JS 滤镜整体重写为 WebGL / GLSL 片元着色器，用乒乓缓冲做拖影，实现鱼眼、色散、暖调、VHS 磁带撕裂、扫描线等实时叠加，在手机 WebView 里跑得动。滚轮烘焙怎么都假，则果断改用程序化 CSS（圆柱渐变 + 滚花纹 + 灰尘噪声）——取舍标准是「更真更可控」，而不是死守纯烘焙。

## 工程化打包

写抠图脚本，把 4 组控件的全画幅帧序列（~45MB）压成 44 张紧致精灵（~6MB）+ 定位 manifest；再写打包脚本，把素材、着色器、逻辑内联成单个自包含 HTML，用 Expo / EAS 打成 APK。

## 真机测试驱动修复

装到手机实测，定位并修掉 5 个问题：录制热区只覆盖开关上半段、点击出现系统蓝色高光、停止录制后随机闪退（录制数据未释放导致的内存泄漏）、翻转镜头键漏放、拖动空白区整个界面错位——逐个查根因修复（释放采集流 + 置空录制器、锁定 touch-action 等）。

## 成果与上线

从一个撞脸的普通滤镜相机，变成有强烈记忆点的厚重 CG 拟物相机，网页 + 安卓双端都能真实体验、录制并存进相册。实时摄像头 + 多重 LoFi/VHS 滤镜在手机 WebView 流畅运行（从 JS 逐像素到 GPU 着色器）。控件素材从 ~45MB 压到 ~6MB，整包 8MB 自包含、离线可跑。沉淀出一条可复用的「出图 → 抠图 → 打包 → 上架」流水线（sprites → bundle → EAS），改一次素材几条命令即可重出新版。web 版部署到 GitHub Pages、APK 发成 GitHub Release，点开即玩 / 扫码即装。一个人（+ AI 结对）打通了设计 / 3D 烘焙 / 交互 / 前端 / 工程 / 发布全链路。
