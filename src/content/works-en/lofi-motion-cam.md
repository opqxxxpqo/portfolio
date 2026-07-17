---
title: "LoFi Motion Cam"
summary: "Rebuilt an ordinary retro-filter camera into a heavyweight CG skeuomorphic product that feels like a real machine — live and recordable on both web and Android."
role: "Solo (design / 3D baking / interaction / frontend / engineering, AI-paired)"
---

## Situation & task

It started as a plain retro filter camera (Expo wrapping a WebView, running the camera through a live LoFi filter): a flat UI, indistinguishable from the dozens of filter cameras in the store, with nothing memorable. The task was to turn it into a heavyweight CG skeuomorphic camera with real texture — like a retro DV machine that actually exists — without sacrificing real-time camera performance, and genuinely packaged into a product you can install and try online, not just a mockup.

## How I built it

I rejected thin "system skeuomorphism" for heavyweight CG rendering, with a hard rule: every material, light, and shadow baked into images in Blender, code only drives motion, never faking light with CSS. The moving controls were hardest — the slider went from cross-fading adjacent frames to continuous position + snap to the nearest baked frame, so highlights and shadows are real at any position. I rewrote the CPU per-pixel JS filters wholesale as WebGL / GLSL fragment shaders with ping-pong buffers, so fisheye, aberration, and VHS tape-tear run inside a phone WebView. Only the jog wheel wouldn't bake convincingly, so I went procedural with CSS — the criterion was always "more real, more controllable."

## Results & launch

A cut-out + packaging script compressed the control frame sequences from ~45MB into 44 sprites (~6MB), inlined into a self-contained 8MB HTML, built into an APK via Expo / EAS. On-device testing found and fixed five issues (record hit-area, system blue highlight, a memory-leak crash after stopping a recording, the flip-camera key, drag misalignment). The web build ships on GitHub Pages, the APK as a GitHub Release — open to play, scan to install. It went from a look-alike filter camera to a heavyweight skeuomorphic one, live and recordable on both web and Android — one person (+ AI pairing) covering design / 3D baking / interaction / frontend / engineering / release end to end.
