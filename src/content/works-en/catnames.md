---
title: "Catnames · Party Game"
summary: "A 2–8 player party game: give one-word clues to lead teammates to the target cat on the table. Three modes — cooperative, competitive, and a hidden-role variant."
role: "Solo dev"
---

## Positioning

A 2–8 player party game where one-word clues lead teammates to the right cat — built to see how far a tiny ruleset can stretch.

## Key Decisions

1. Packed co-op, competitive, and hidden-role play into one ruleset, so players learn the whole system once instead of three times.
2. Cut the more complex mechanics — a party game stops being fun the moment reading the rules takes longer than playing.
3. Used meme-style HTTP Cats images instead of abstract cards — easier to recognize, and quicker to turn into a shared joke.

## Iteration

V1 local single-device prototype, HTTP Cats in place of word cards → V2 LAN / same-device multiplayer, testing how the information holds up across group sizes → V3 Socket.IO remote "pseudo-online" rooms, pairing a voice call with synced web state for remote play → V4 retuned pacing, roles, and voting logic for different player counts.

## Built with

Claude Code, Codex, Socket.IO, Express · ~2–3 days
