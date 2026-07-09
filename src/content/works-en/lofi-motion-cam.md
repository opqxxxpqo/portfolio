---
title: "LoFi Motion Cam"
summary: "Rebuilt an ordinary retro-filter camera into a heavyweight CG skeuomorphic product that feels like a real machine — live and recordable on both web and Android."
role: "Solo (design / 3D baking / interaction / frontend / engineering, AI-paired)"
---

## Situation

The project started as a simple retro camera app: Expo wrapping a WebView, running the phone camera through a live LoFi filter. It worked, but the UI was a plain flat interface — indistinguishable from the dozens of filter cameras in the app store, with nothing memorable to hold people.

## Task

Take it from "a working demo" to a piece with strong texture and a memory hook: rebuild the UI as heavyweight CG skeuomorphism, like a retro DV machine that actually exists — without sacrificing real-time camera performance, and genuinely packaged into a product you can install on a phone and try online, not just a design mockup.

## Direction · heavyweight CG rendering

I rejected thin "system skeuomorphism" (the Nothing-OS kind) for heavyweight CG re-rendering, and set myself a hard rule: every material, light, and shadow gets baked into images in Blender, code only drives motion, never faking light with CSS — that's what keeps the texture from feeling plastic.

## Bake the light, never fake it

The moving controls were hardest. Dragging the slider first used cross-fading between adjacent frames, which stacked two shadows into a visible "ghost" at rest. I switched to continuous position + snap to the nearest baked frame: better 8 discrete frames than a fake highlight, so the specular and contact shadow are real at any position.

## Real-time performance and pragmatic tradeoffs

I rewrote the CPU per-pixel JS filters wholesale as WebGL / GLSL fragment shaders, with ping-pong buffers for trails — layering fisheye, chromatic aberration, warm tone, VHS tape-tear, and scanlines in real time, fast enough inside a phone WebView. The jog wheel never looked right baked, so I went procedural with CSS (cylinder gradient + knurl + dust noise). The criterion was "more real and more controllable," not dogmatic pure-baking.

## Engineering and packaging

I wrote a cut-out script to compress four groups of full-frame control sequences (~45MB) into 44 tight sprites (~6MB) + a positioning manifest, then a packaging script that inlines assets, shaders, and logic into a single self-contained HTML, built into an APK with Expo / EAS.

## Device-test-driven fixes

Installed on a real phone, I found and fixed five issues: the record hit-area only covered the top half of the switch, a system blue highlight on tap, random crashes after stopping a recording (a memory leak from unreleased capture data), a missing flip-camera key, and the whole UI shifting when dragging empty space — each traced to root cause (release the capture stream + null the recorder, lock touch-action, etc.).

## Results and launch

From a look-alike filter camera to a heavyweight CG skeuomorphic camera with a strong memory hook — real, recordable, and saved to the gallery on both web and Android. Live camera plus multiple LoFi/VHS filters run smoothly in a phone WebView (from JS per-pixel to GPU shaders). Control assets shrank from ~45MB to ~6MB; the whole bundle is 8MB, self-contained and offline-capable. It left behind a reusable "render → cut out → package → publish" pipeline (sprites → bundle → EAS) — a few commands re-ship a new build after an asset change. The web build is on GitHub Pages, the APK a GitHub Release — open to play, scan to install. One person (+ AI pairing) covered the whole chain: design / 3D baking / interaction / frontend / engineering / release.
