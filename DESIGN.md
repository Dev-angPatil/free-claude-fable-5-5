# Design System: Strict Monochrome Electric Volt

Inspired by chef's `electric-volt` on designmd.ai, tuned for 100% strict black-and-white high-contrast minimalism without any color chromaticism.

## 1. Palette & Surface Tokens
- **Background (Primary Canvas)**: `#000000` (Pure OLED Black)
- **Surface Level 1 (Panels / Modals)**: `#111111` (Deep Charcoal Surface)
- **Surface Level 2 (Inputs / Cards)**: `#1A1A1A` (Elevated Panel)
- **Surface Level 3 (Popovers / Toasts)**: `#222222` (High-Elevation Surface)
- **Border Default**: `#2C2C2E` (Razor-thin 1px dark separator)
- **Border Active / Focus**: `#FFFFFF` (Stark White 1px line)
- **Border Muted**: `#1C1C1E` (Subtle boundary)
- **Text Primary**: `#FFFFFF` (100% High-Contrast White)
- **Text Secondary**: `#A0A0A0` (Neutral Spec Silver)
- **Text Muted**: `#5C5E62` (Subdued Low-Emphasis Steel)

## 2. Typography
- **Primary Typeface**: `Inter` (weights: 200 Thin, 300 Light, 400 Regular, 600 Semi-Bold, 700 Bold)
- **Monospace Typeface**: `JetBrains Mono` (weights: 400 Regular, 700 Bold) for security tokens, validation rules, code snippets, and entropy counters.
- **Tracking & Hierarchy**:
  - Hero Labels & Eyebrows: `tracking-[0.2em] uppercase text-xs font-semibold`
  - Headlines: `tracking-tight font-light`
  - Metric Values: `font-mono tracking-tight`
  - Buttons: `uppercase tracking-[0.1em] text-xs font-medium`

## 3. Elevation & Depth
- Pure dark surfaces do not rely on drop shadows.
- Depth is expressed solely through subtle surface contrast (`#000000` -> `#111111` -> `#1A1A1A`) and razor-thin `1px` borders in `#2C2C2E`.
- Active focus states use hard `1px solid #FFFFFF` or inverted fills.

## 4. Components & Interactive States
- **Buttons**:
  - Primary: Solid `#FFFFFF` fill with `#000000` text, 44px height, 0px or 4px radius, uppercase tracking. Inverts to `#000000` with white border on hover.
  - Secondary: `#111111` fill with 1px `#2C2C2E` border, `#FFFFFF` text.
- **Inputs**:
  - Monospace font, `#111111` background, 1px `#2C2C2E` border.
  - Focus: 1px `#FFFFFF` border, zero outer ring blur.
  - Shake animation when invalid input or paste attempted.
- **Rules Card**:
  - `#111111` card surface with 1px `#2C2C2E` border.
  - Pending/Failed: `#5C5E62` text with `[ ]` or `[×]` mono indicator.
  - Satisfied: `#FFFFFF` text with `[✓]` inverted badge.
