---
title: "Human Token"
summary: 'A floating widget that quantifies keystrokes, clicks and mouse motion into a "human output token". This is a browser-simulated build; the desktop app captures OS-level global events.'
role: "Solo dev"
---

## What it is

A widget that takes a time window of human "output" — keystrokes, clicks, mouse travel — and collapses it into a single number through a fixed formula. The companion HUD is a draggable, edge-collapsible overlay that updates in real time.
On desktop, Rust's `rdev` captures OS-level global keyboard and mouse events; state persists to local JSON.

## Limits of the browser-simulated build

- For security reasons an iframe can only listen to events fired inside it — **you have to click into the embed above first**
- No 5-hour rolling window here; just one hard cap (200k)
- The collapse animation is a CSS transition, nowhere near as smooth as the desktop app's native window behavior

## Where AI sits in the workflow

- Overall architecture, the token formula, and the decay mechanism — Claude / Codex proposed options, I chose
- The Rust side (rdev integration, tray, cross-platform permissions) is almost entirely AI-written; I handled integration testing and parameter tuning
- Visual style, copy, interaction details — my calls
