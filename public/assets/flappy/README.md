# Flappy Bird Custom Assets Guide

Place your custom sprite and sound files in this directory (`public/assets/flappy/`). The game engine is pre-configured to look for the following file names:

## Sprites / Images (PNG with transparent background recommended)
- `bird.png`: The player's bird sprite (Recommended size: ~34x24 px or square up to 64x64 px).
- `pipe-top.png`: The obstacle pipe extending downward from the top ceiling (Recommended width: 52px to 64px, height: 320px+).
- `pipe-bottom.png`: The obstacle pipe extending upward from the ground (Recommended width: 52px to 64px, height: 320px+).
- `background.png` *(optional)*: Background landscape or backdrop texture.

## Sound Effects (MP3, WAV, or OGG)
- `jump.mp3`: Sound triggered when flapping/jumping.
- `score.mp3`: Sound triggered when successfully passing through a pipe (+1 score / +1% brightness).
- `crash.mp3`: Sound triggered on collision with a pipe or ground.

> **Note**: If any file is missing, the engine automatically falls back to crisp procedural monochrome graphics and synthesized Web Audio sound effects so the game remains 100% playable at all times.
