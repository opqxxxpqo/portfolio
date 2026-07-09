---
title: "GhostRun"
summary: "An Android running app that visualises you-vs-your-ghost as a live radar — taken solo from concept to an installable APK."
role: "Product / interaction / visual / frontend (solo, AI-assisted)"
duration: "~3 weeks"
---

## Situation

Most running apps (Keep, Strava) pile pace, heart rate, and distance into a dashboard — missing an immediate, emotional sense of competition. I wanted to test a hunch: if "racing your own personal best" became a chase visual, like a radar or car-HUD — you're the dot at the centre, your best is a closing ghost ring, the gap scaling in real time like a ruler — could it make re-running the same route feel like a game? I owned the whole thing solo, from product concept and interaction design to engineering, aiming to ship a real installable APK that closes the full loop.

## Task

Shape a chase radar that expresses ahead / behind in real time; complete the M1 loop (GPS record → ghost comparison → save result → history replay); keep validating on-device fast with Expo Go and ship an APK via EAS cloud build; and reach portfolio-grade visual polish with one coherent design language.

## The chase radar · core visual model

Starting from a car-HUD-style HTML concept animation, I distilled a minimal radar: a full stop at the centre = you, a green dashed ring = the ghost, the gap between them = a live gap scale. Sketch-driven design, aligned against the build over three correction rounds (lap speed, eccentric vs concentric, inverted overtake semantics), converged on a reusable "chase model" geometry: every ring converges on a top-right anchor, the ghost square sliding along the diagonal with distance. On a first run with no history, a fixed 6:00/km virtual pacer ghost keeps a target always in sight.

## Interaction and visual design

I led three redesign rounds — frosted-glass cards → flat high-contrast → gradient dark run screen + light home — settling on a coherent language of the Khand condensed typeface plus a fluorescent yellow-green #DCDD41 accent. I designed memorable interactions: a Pinterest-style radial pause menu (ripple + ▶ / ✕), a GitHub-style yearly activity heatmap, and the radar's inertial sway with a "ghost dashes into a spin on overtake" effect.

## Engineering and a custom algorithm

After finding the Skia renderer wouldn't run in Expo Go, I led a migration to react-native-svg and dropped the project from SDK 56 to 54 — buying "change one line, see it on device instantly." I ditched token-gated Mapbox for self-assembled CARTO free tiles + an SVG route overlay, zero signup. The core algorithm is Strava-style automatic segment detection — "just go for a run, and it auto-recognises stored segments you pass and times them separately": a matching engine built on turf projection corridors + curve-matcher shape similarity, validated with unit tests on synthetic tracks plus GPS noise. I then shipped background location + screen-off vibration alerts, and deliberately merged the two technical modes (foreground / background) into a single "Start run," so implementation boundaries never leak into the product concept.

## Delivery and spin-offs

EAS cloud build produced a signed APK, verified end-to-end on device; I designed and replaced the adaptive app icon. A spin-off dynamic-poster tool reuses the app's radar geometry and palette, rendering frame-by-frame on Canvas to export a 34-frame transparent PNG sequence — the very dynamic cover on this site was generated with it.

## Results

End-to-end delivery: from product concept to a real installable Android APK, closing the full "record → ghost comparison → save → replay" loop. A reusable visualisation asset: a parametric "chase radar" geometry model + components, reused across the app, replay animation, and promo posters. Verifiable algorithm quality: the segment-matching engine extracts segments precisely on clean and noisy tracks alike, with zero false positives on unrelated tracks, and supports background screen-off detection. A complete, coherent design system: Khand + accent + dark/light themes + glass/flat materials, consistent across 20+ screens and components. Working with Expo Go validation + EAS cloud build + AI-assisted coding, one person delivered in three weeks what usually takes a small team.

## Tech stack

Expo (React Native) SDK 54 · TypeScript strict · expo-router · react-native-svg (hand-drawn radar) · expo-location + task-manager (fore/background) · @turf/* + curve-matcher (Fréchet shape matching) · simplify-js · self-assembled CARTO free tiles + SVG overlay (token-free) · AsyncStorage · EAS Build (APK).
