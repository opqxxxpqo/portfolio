---
title: "Human Token"
summary: 'A floating widget that quantifies keystrokes, clicks and mouse motion into a "human output token". This is a browser-simulated build; the desktop app captures OS-level global events.'
role: "Solo dev"
---

## Positioning

A floating desktop widget that turns keystrokes, clicks, and mouse travel into one steadily climbing number — making "human output" something you can actually watch.

## Key Decisions

1. Defined output with a single fixed formula instead of a "smarter" AI score — I wanted sessions to be directly comparable.
2. Captured OS-level global events with Rust + rdev, accepting that the browser build can only listen to in-page events.
3. Handed most of the low-level Rust to AI while keeping integration testing, interaction logic, and decay-tuning for myself.

## Iteration

V1 browser counter → V2 desktop floating widget → V3 local persistence and cross-session accumulation.

## Built with

Claude Code, Codex, Tauri, Rust, vanilla JS · ~half a day

---

> The embed above is the browser-simulated build: for security an iframe only hears events fired inside it, so **click into the frame before you start typing**. It has no 5-hour rolling window (just a 200k hard cap), and the collapse is only a CSS transition — not as smooth as the desktop app's native window.
