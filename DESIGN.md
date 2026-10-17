# Design System: RawBlock Neo-Brutalist (Strict High-Contrast)

Adopted from `chef/rawblock` on [designmd.ai](https://designmd.ai/chef/rawblock).

## 1. Design Philosophy: Structural Anti-Design & Extreme Friction
RawBlock strips interfaces down to their structural bones. There are no rounded corners (0px border-radius everywhere), no drop-shadows, and no decorative mid-tones. Visual hierarchy is achieved exclusively through **border weight (3px to 5px)**, **scale contrast**, and **high-impact typography**.

This raw, brutalist architectural aesthetic perfectly complements the uncompromising, hard psychological rage-bait nature of the Claude Fable 5.5 onboarding gauntlet.

## 2. Color Tokens
- **Canvas / Background**: `#000000` (Pure Black)
- **Inverted Canvas / Foreground**: `#FFFFFF` (Pure High-Contrast White)
- **Surface Level 1**: `#111111` (Structural Block Fill)
- **Surface Sunken**: `#181818` (Input Wells)
- **Surface Elevated**: `#1E1E1E` (Active Directive Card)
- **Borders**:
  - `border-thin`: `1px solid #3A3A3C`
  - `border-thick`: `3px solid #FFFFFF` (Standard element boundary)
  - `border-heavy`: `5px solid #FFFFFF` (Active target focus & CTA)
- **Text Primary**: `#FFFFFF`
- **Text Secondary**: `#D1D5DB`
- **Text Muted**: `#9CA3AF`

## 3. Typography Scale & Fonts
- **Headline Font**: `Archivo Black` (uppercase, ultra-bold, high authority)
- **Mono Font**: `Space Mono` (15px, mechanical, cryptographic telemetry)
- **Body Font**: `Work Sans` (14-16px, high-legibility clean grotesque)

## 4. Component Rules
- **Border Radius**: `0px` (`rounded-none`) across all cards, buttons, inputs, tags, and progress bars. Absolutely zero rounding.
- **Buttons**:
  - Primary: `#FFFFFF` fill with `#000000` text, `3px solid #FFFFFF` border, uppercase tracking. Inverts on hover to black fill with 5px white border.
  - Secondary: `#181818` fill with `3px solid #3A3A3C` border, `#FFFFFF` text.
- **Inputs**:
  - `Space Mono` 16px font, `#181818` background, `3px solid #FFFFFF` focus border, 0px radius.
- **Directives Panel**:
  - High-visibility cards with 3px thick borders.
  - Active Directive: `3px solid #FFFFFF` with inverted `[CURRENT OBJECTIVE]` badge and highlighted monospace hints.
