---
title: "Digital Conductor"
summary: "An experimental interactive system that transcribes digital behavior into orchestral music. Keystrokes, mouse paths, pauses, and operational density are silently logged and mapped in real time into musical structure, dynamic orchestration, and a visual data stream."
role: "Solo dev"
---

## Positioning

A system that quietly logs your unconscious behavior at the computer — keystrokes, mouse paths, pauses — and scores it into a live symphony, turning overlooked data into a subconscious performance.

## Key Decisions

1. Scored behavior as *music* rather than a dashboard — logs and click-rates flatten the person out; music keeps the emotion in.
2. Mapped operational density onto orchestration depth, so intensity reads as feeling rather than a number.
3. Split desktop capture from the browser demo — the browser can only hear in-page events for security reasons, so global behavior needs the desktop path.

## Iteration

V1 in-browser keyboard/mouse simulation → V2 OS-level global capture → V3 different behaviors mapped to different instrument layers.

## Built with

Claude Code, Codex, Python, HTML / JavaScript · ~1–2 days

## If I rebuilt this

Add long-term behavioral memory so the music keeps evolving across days instead of resetting each session, and make timbre richer by reading emotion from behavior density. Or fold it straight into Human Token.
