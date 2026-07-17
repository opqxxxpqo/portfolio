---
title: "GhostRun"
summary: "An Android running app that visualises you-vs-your-ghost as a live radar — taken solo from concept to an installable APK."
role: "Product / interaction / visual / frontend (solo, AI-assisted)"
duration: "~3 weeks"
---

## Situation & task

Most running apps (Keep, Strava) pile pace, heart rate, and distance into a dashboard — missing an immediate, emotional sense of competition. I wanted to test whether making "racing your own personal best" a chase visual, like a radar or car-HUD — you're the dot at the centre, your best a closing ghost ring, the gap scaling live — could turn re-running the same route into a game. Solo across product, interaction, and engineering, aiming to ship a real installable APK that closes the full "record → ghost comparison → save → replay" loop.

## The chase radar · core visual model

From a car-HUD-style HTML concept animation, I distilled a minimal radar: centre dot = you, green dashed ring = the ghost, the gap between them = a live gap scale. Sketch-driven and aligned against the build over three correction rounds (lap speed, eccentric vs concentric, inverted overtake semantics), it converged on a reusable "chase model" geometry. On a first run with no history, a fixed 6:00/km virtual pacer keeps a target in sight.

## Design & engineering

Three redesign rounds settled a coherent language — the Khand condensed typeface plus a fluorescent yellow-green #DCDD41 — with memorable interactions: a radial pause menu, a yearly activity heatmap, inertial radar sway. On the engineering side I led a Skia → react-native-svg migration for "change one line, see it instantly," and dropped token-gated Mapbox for self-assembled CARTO free tiles + an SVG route overlay. The core is a custom Strava-style segment detector — turf projection corridors + curve-matcher shape similarity, validated with unit tests on synthetic + noisy tracks, plus background location and screen-off vibration alerts.

## Results

From concept to a real installable Android APK, closing the record-to-replay loop. It left a parametric "chase radar" visualisation asset, reused across the app, replay animation, and promo posters. Verifiable algorithm quality: precise segment extraction on clean and noisy tracks alike, zero false positives, background screen-off detection. A coherent design system (Khand + dark/light themes, 20+ consistent screens). Stack: Expo (RN) SDK 54 · TypeScript · react-native-svg · expo-location · @turf/* + curve-matcher · EAS Build. With Expo Go + EAS + AI assistance, one person delivered in three weeks what usually takes a small team.
