---
title: "Visual Conductor"
summary: "A browser app that turns webcam-captured hand gestures into music. Three modes: conduct classical recordings, play a virtual guqin, or perform a theremin — no external hardware."
role: "Solo dev"
---

## Positioning

A webcam turns your hands into an instrument — conduct classical music, pluck a virtual guqin, or play a theremin, with nothing but the browser.

## Key Decisions

1. Built everything in vanilla JS on native Canvas with no build step, so it opens instantly like a lightweight web instrument.
2. Layered a custom One Euro filter on top of MediaPipe — raw hand tracking jitters too much to feel playable; filtering turns it into an instrument.
3. Synthesized the guqin procedurally instead of playing samples, so the tone responds continuously to how hard you move rather than firing a fixed clip.

## Iteration

V1 orchestral conducting → V2 guqin interaction → V3 theremin-style spatial pitch control.

The shared backbone across all three modes: MediaPipe Hands dual-hand 21-keypoint tracking, a custom One Euro filter for smoothing, Tone.js for synthesis, and CRT visuals with scan lines and noise.

## Built with

Claude Code, MediaPipe Hands, Tone.js, vanilla JS · ~1–2 days
