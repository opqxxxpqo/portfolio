---
title: "Rally Vocal Sampler · 拉力语音打击垫"
titleEn: "Rally Vocal Sampler"
category: ux-ui
ai: true
chip: 语音打击垫
chipEn: Vocal Sampler
date: 2026-08-13
cover: /works/rally-mpc/cover.jpg
poster: /works/rally-mpc/poster.webp
frameSeq:
  base: /works/rally-mpc/frames/
  count: 60
  ext: webp
summary: "把拉力领航员的报点语音拆成可演奏的语义 Pad —— 能实时打、能连间隔录成序列、能在回放上加 Scratch 与变调的 MPC 式采样器，网页与安卓双端可玩。"
summaryEn: "Rally pacenotes broken into playable semantic pads — an MPC-style sampler you can trigger live, record as a timed sequence, and perform over with scratch and pitch. Playable on web and Android."
role: "独立开发（产品定义 / 交互 / 界面 / 前端 / 音频处理 / 安卓打包）"
roleEn: "Solo (product definition / interaction / UI / frontend / audio processing / Android packaging)"
tools:
  - React
  - Vite
  - Web Audio API
  - Expo
  - React Native WebView
  - SoundTouch
tags:
  - 交互设计
  - Web Audio
  - 音序器
  - MPC 界面
  - 移动端横屏
links:
  - label: "在新标签打开网页试玩版"
    labelEn: "Open the web build in a new tab"
    url: https://portfolio-livid-beta-43.vercel.app/works/rally-mpc/demo/index.html
  - label: "下载安卓版 APK"
    labelEn: "Download the Android APK"
    url: https://github.com/opqxxxpqo/rally-vocal-sampler/releases/download/v1.0.4/Rally-MPC-Android-v1.0.4.apk
embeds:
  - url: /works/rally-mpc/demo/index.html
    height: 720
    title: "在线试玩 · 建议横屏 · 首次点 Pad 解锁浏览器音频"
    titleEn: "Play online · landscape recommended · tap a pad once to unlock browser audio"
videos:
  - src: /works/rally-mpc/slides/4.sound.mp4
---

## 情境与任务

传统 Soundboard 只做「点击即播放」。但领航语音短到零点几秒，用户既要把 `100 → RIGHT → 4 → INTO → LEFT → 2 → DON'T CUT` 组合成一句完整报点，又要同时操控 Scratch、Stutter、Brake —— 等声音响完再去找效果器，操作窗口根本来不及，结果像在赶着按按钮，而不是在表演。素材本身也有坑：部分录音是整句复合语音，界面要的却是其中一个可复用词段；浏览器、Android WebView 和 Expo 三端加载音频的方式还各不相同。目标不是做一套 DAW，而是在保住 MPC 那种直接操作感的前提下，做出一个真能演奏的最小产品。

## 设计与实现

把工作流拆成 LIVE 与 SEQUENCE 两段：实时模式立即触发；录制模式保留每次按键的真实间隔，不抹掉停顿，录完可回放、循环、重录，并用 BPM 与 Quantize 做节拍吸附。这一步把交互重心从「赶在音频结束前找效果器」搬到了「先把整句录下来，再腾出双手专心表演」。方向、弯级、提示词做成可复用 Token，底层仍是独立事件，时间轴上把 `RIGHT + 4` 合并显示成 `R4`；CTRL 作瞬时修饰键切换左右弯，不额外增加页面层级。复合录音逐条建立精确起止切片，避免把 `Thirty three left thirty` 整段误当成 `three left`。配图上下是第一版与现版本的对照：第一版 Pad 大、光泽重、洋红面积大，一屏放不下多少信息；现版本压掉拟物光泽，把键位和语义标签直接印进 Pad，省出来的高度给了状态栏和更大的 Scratch 操控面。

## 成果与交付

效果链保留 Scratch、Stutter、Brake，加上 Radio、Intercom、Pitch 和 Pitch Drop；五键 Pitch Keyboard 用瞬时升调，默认 NATURAL 模式靠时间伸缩加共振峰修正压掉「松鼠音」，另给 TAPE 模式作低开销备选。界面按手机横屏重排成 4×4 Pad Matrix、中央表演区和右侧效果区，Pad 缩小给 Scratch 让出操控面积，配合按压态、震动反馈与键盘快捷键强化硬件手感。17 项核心逻辑测试覆盖事件组合、量化、拖动重排、左右切换与 Pitch 行为。最终交付浏览器试玩版与 Android 1.0.4 横屏安装包，音频、图标和音频处理器全部随包离线可用。

## 素材与声明

界面里的弯道符号、距离与提示标记，沿用《DiRT Rally（尘埃拉力）》系列游戏内的领航图标体系——包括它为红色盲、蓝色盲准备的两套替代配色。沿用而不是重画，是因为这套符号在拉力玩家里已经形成阅读习惯，另造一套只会平白增加学习成本。

本项目是个人学习与作品集展示用途的非商业原型，未做任何商业发行或售卖；文中出现的游戏图标与语音素材，版权均归原开发商 / 发行商所有，本项目不主张任何权利。如权利方认为使用不当，请联系我，我会立即撤下相关素材与演示。
