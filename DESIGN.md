# Design System: Vercel Minimalist (Shadow-as-Border & Precision Dark)

Adopted from `Akagi201/longcipher-design` on [designmd.ai](https://designmd.ai/Akagi201/longcipher-design).

## 1. Visual Theme & Philosophy: Infrastructure Made Invisible
The interface follows a philosophy of restrained engineering minimalism. Rather than aggressive, harsh borders or overbearing decoration, every element earns its pixel through micro-contrast softness, gallery-like emptiness, and precision alignment.

### Key Principles:
- **Shadow-as-Border Technique**: Instead of harsh solid 3px-5px borders, subtle 1px semi-transparent shadow rings (`box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08)`) and fine `border-neutral-800` define boundaries with crisp elegance.
- **Micro-Contrast Surface Layering**:
  - Deep Canvas: `#000000`
  - Base Surface (Subtle Dark): `#0a0a0a`
  - Elevated Card: `#121212`
  - Interactive Hover / Focus: `#1a1a1a`
- **Concentric Rounded Corners**:
  - `6px` (`rounded-md`): Buttons, inputs, chips, badges
  - `8px` (`rounded-lg`): Inner cards, dialog rows
  - `12px` (`rounded-xl`): Outer modals, master containers
- **Typography**:
  - `Inter` / `Geist Sans` for clean, high-density UI text with tight letter-spacing (`tracking-tight`).
  - `JetBrains Mono` / `Geist Mono` for cryptographic salts, telemetry, and numerical statistics (`tabular-nums`).

## 2. Color Tokens
- **Canvas / Background**: `#000000` (OLED Dark Canvas)
- **Canvas Light**: `#ffffff` (Pure White for Initial Void & Notification)
- **Surface Base**: `#0a0a0a`
- **Surface Elevated**: `#121212`
- **Surface Highlight**: `#181818`
- **Surface Interactive**: `#222222`
- **Borders & Rings**:
  - `border-subtle`: `rgba(255, 255, 255, 0.08)` (1px ring)
  - `border-default`: `rgba(255, 255, 255, 0.14)`
  - `border-active`: `rgba(255, 255, 255, 0.35)`
- **Text Tokens**:
  - Primary: `#ededed` (Soft White)
  - Secondary: `#a1a1aa` (Zinc-400)
  - Muted: `#71717a` (Zinc-500)
- **Accents**:
  - Primary / Interactive CTA: `#ffffff`
  - Telemetry Violet / Accent: `#6366f1`
  - Signal Amber / Warning: `#f59e0b`
  - Signal Emerald / Pass: `#10b981`
  - Signal Crimson / Error: `#ef4444`

## 3. Component Conventions
- **Buttons**:
  - Primary: Solid `#ffffff` with `#000000` text, 6px radius, hover opacity 90%, active scale 98%.
  - Secondary: `#121212` background, 1px subtle border, `#ededed` text, hover `#1a1a1a`.
- **Inputs**:
  - `#0a0a0a` background, 1px `border-neutral-800`, 6px radius, focus ring `ring-1 ring-white/40`.
- **Modals & Cards**:
  - 12px radius, `#0a0a0a` body with layered `#121212` children, 1px subtle border ring, smooth backdrops.
