---
title: "Rally Vocal Sampler"
summary: "Rally pacenotes broken into playable semantic pads — an MPC-style sampler you can trigger live, record as a timed sequence, and perform over with scratch and pitch. Playable on web and Android."
role: "Solo (product definition / interaction / UI / frontend / audio processing / Android packaging)"
---

## Situation & task

A conventional soundboard only does "tap to play." But a pacenote lasts a fraction of a second, and the user has to assemble a whole call — `100 → RIGHT → 4 → INTO → LEFT → 2 → DON'T CUT` — while working Scratch, Stutter and Brake at the same time. Reaching for an effect after the sample has already fired leaves no usable window; it feels like rushing between buttons instead of performing. The source material fought back too: some recordings are complete composite sentences when the interface needs one reusable word from inside them, and browsers, Android WebView and Expo each load audio differently. The goal was never a DAW — it was the smallest product that can genuinely be played, without losing the directness of an MPC.

## Design & build

I split the workflow into LIVE and SEQUENCE. Live fires instantly; record mode preserves the real interval between every hit rather than flattening the pauses, and a finished take can be replayed, looped or re-cut, with BPM and Quantize snapping hits to the grid. That single move shifted the centre of the interaction from "find the effect before the sample ends" to "record the phrase first, then perform it hands-free." Directions, severities and modifiers became reusable tokens — events stay separate underneath while the timeline groups `RIGHT + 4` into `R4` — and CTRL acts as a momentary modifier for left-hand corners, adding no extra layer to the screen. Every composite recording got exact in/out slices, so `Thirty three left thirty` is never mistaken for `three left`. The image stacks the first version above the current one: the first pass used big glossy pads and a lot of magenta, and fitted very little on screen; the current build drops the skeuomorphic sheen, prints key bindings and semantic labels straight onto the pads, and spends the reclaimed height on a status bar and a larger scratch surface.

## Results & delivery

The performance chain keeps Scratch, Stutter and Brake and adds Radio, Intercom, Pitch and Pitch Drop; a five-key pitch keyboard applies momentary transposition, with a default NATURAL mode using time-stretch plus formant correction to kill the chipmunk artefact, and a cheaper TAPE mode as a fallback. The layout was rebuilt for phone landscape — a 4×4 pad matrix, a central performance area and a right-hand effects rack — shrinking the pads to give Scratch more surface, reinforced by pressed states, haptics and keyboard shortcuts for a hardware feel. Seventeen core logic tests cover event grouping, quantisation, drag reordering, left/right switching and pitch behaviour. It ships as a browser-playable build and an Android 1.0.4 landscape APK, with audio, icons and processors bundled to run offline.

## Assets & disclaimer

The corner symbols, distance markers and modifier glyphs in this interface follow the co-driver icon system from the *DiRT Rally* games — including its two alternate palettes for red and blue colour blindness. Reusing that vocabulary rather than redrawing it was deliberate: rally players already read these glyphs fluently, and inventing a new set would only add learning cost.

This is a non-commercial prototype made for personal study and portfolio display; it has never been sold or commercially distributed. The game icons and voice samples shown here remain the property of their original developer and publisher, and this project claims no rights over them. If the rights holder considers the use inappropriate, please contact me and I will take the material and the demo down immediately.
