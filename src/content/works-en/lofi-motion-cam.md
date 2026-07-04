---
title: "LoFi Motion Cam"
summary: "A skeuomorphic tape-camcorder that runs your camera through real-time LoFi/VHS filters and records the result — every surface baked in Blender, code only drives motion and the live shader."
role: "Solo dev (AI-paired)"
---

## Positioning

A skeuomorphic tape camcorder — it takes your phone or browser camera, processes it live into that Mini-DV/VHS LoFi look, and records straight to the gallery. It was built to test one thing: can a designer, pairing with AI, take "render-grade heavyweight texture" all the way to a product that actually installs on a phone, instead of stopping at a pretty mockup?

## Key Decisions

1. **Skipped thin system-style skeuomorphism for heavyweight CG rendering.** Nothing-OS-style skeuomorphism is everywhere already; the bet was whether rendered texture alone could carry a product. The price was a hard rule: every material, light, and shadow had to be baked into images in Blender — no faking anything with CSS.
2. **Bake lighting, never fabricate it — the slider lost its cross-fade.** To keep shadows continuous while dragging, the first version cross-faded adjacent frames; at rest the two shadows stacked into a visible "ghost". The fix: continuous position, but snap to the nearest baked frame — better 8 discrete frames than a single fake shadow at any position.
3. **Rewrote the live filters as WebGL shaders, killing per-pixel CPU work.** Running a live camera plus fisheye, chromatic aberration, and VHS tape-tearing at once choked JavaScript per-pixel loops on mobile; a GLSL fragment shader with ping-pong buffers for motion trails made it run.
4. **Procedurally built exactly one thing — the jog wheel.** The baked wheel knurling never looked right, so it's a CSS cylindrical gradient plus knurl lines and a dust-noise layer. Which is the point: "pure baking" was never the goal — whichever technique looks more real and stays more controllable wins.

## Iteration

V1 (thin skeuomorphic sandbox: manifest-driven, parallax layers, control sprites) → proved the assembly worked, but felt flat and controls kept drifting off their tracks.
V2 (heavyweight CG: one baked full-scene image as the background, animated controls layered on top as frame sequences) → the texture finally held, and rendering controls from the same scene and camera made them align by construction.
V3 (productisation: tight sprites → self-contained bundle → Expo-built APK, with WebGL live filters plus record-to-gallery, shipping on web and Android) → something you can install, use, and share.

## Built with

Claude Code (paired on all code and packaging), Blender (every material and light bake), Expo + EAS Build (APK), React Native + WebView (the shell), WebGL / GLSL (the live filter engine).
