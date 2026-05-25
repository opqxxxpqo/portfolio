---
title: "LoFi Motion Cam"
summary: "An app that turns the phone camera into a 2000s MiniDV / old action-cam recorder: fisheye, 480P low-res, VHS noise, motion trails, a burned-in HUD, all wrapped in matte-black neo-retro hardware UI."
role: "Solo dev"
---

## Positioning

An app that turns the phone camera into a 2000s MiniDV camcorder — 480P, fisheye, VHS noise, motion trails — for people who want footage that looks like a memory the moment it's shot.

## Key Decisions

1. Recorded the processed image, not the raw feed — what you shoot is exactly what you saw in the viewfinder.
2. Ran one shared Web Canvas pipeline instead of per-platform native filters, keeping the look consistent across devices on a single code path.
3. Split fisheye, trail, noise, and warmth into separate toggles rather than fixed presets — the retro feel needs tuning per scene.

## Iteration

V1 basic recording + VHS look → V2 bilingual UI, modular toggles, REC animation feedback → V3 a stronger sense of physical hardware.

The backbone: Expo + React Native, running a Web Canvas pipeline through `react-native-webview`, recording with `MediaRecorder`, saving via `expo-media-library`, and shipping an Android APK through EAS Build.

## Built with

Figma, Codex, React Native (Expo), Web Canvas, EAS Build · ~1–2 days

## If I rebuilt this

Move the rendering to native GPU shaders for a higher frame rate and lower battery draw.
