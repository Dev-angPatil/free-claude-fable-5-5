# ARCHITECTURE.md: FREE CLAUDE FABLE 5.5 UNLIMITED

## 1. System Architecture Overview
The application is structured as a reactive Single Page Application (SPA) utilizing React 19, TypeScript, and Tailwind CSS. The design embraces a core-first minimalist architecture with modular separation between validation engines, game mechanics, and UI presentation components.

```mermaid
graph TD
    subgraph Luminance Subsystem
        A[Global BrightnessContext] -->|filter: brightness| B[Root Viewport Container]
        C[QuickSettingsBar] -->|Intercept Positive Delta| D[FlappyBrightnessModal]
        D --> E[HTML5 Canvas Game Engine 60fps]
        E -->|Pipe Cleared| F[Score +1 => Brightness +1%]
        F --> A
        E -->|Collision Detected| G[Crash Penalty => Brightness = 10%]
        G --> A
    end

    subgraph Core Onboarding Flow
        H[InitialLure View (Pure White)] -->|Click 'Claim Token'| I[Terminal Transition Handshake]
        I --> J[RageProfileModal (OLED Black)]
        J --> K[Clipboard Interceptor]
        J --> L[Reactive Password Rules Engine]
        J --> M[Entropy & Gaslighting Feedback Engine]
        L -->|Rules Satisfied Cascade| N[Rule Progress Cards]
        J -->|Submit Passphrase| O[Verification Spinner Troll]
        O --> P[SuccessTroll Modal]
    end
```

## 2. Directory Structure
```
free-claude-fable-5-5/
├── index.html                  # Root HTML with Google Fonts preloads
├── package.json                # Project dependencies
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript compiler config
├── tailwind.config.js          # Electric Volt monochrome token extension
├── DESIGN.md                   # Strict Black & White design tokens
├── VISION.md                   # Product vision and rage loop specs
├── ARCHITECTURE.md             # This document
├── README.md                   # Setup, prompt report, and usage guide
├── public/
│   └── assets/
│       └── flappy/             # Custom sprite & sound assets + README contract
└── src/
    ├── main.tsx                # Entry point
    ├── index.css               # Base Tailwind layers and utility animations
    ├── App.tsx                 # Root application controller & view switcher
    ├── game/
    │   └── flappyEngine.ts     # 60 FPS HTML5 Canvas arcade engine + Web Audio synthesis
    ├── rules/
    │   └── passwordRules.ts    # Functional validator engine & rules definition
    └── components/
        ├── BrightnessContext.tsx   # Global brightness state & CSS filter provider
        ├── QuickSettingsBar.tsx    # Intercepted luminance slider & quick controls
        ├── FlappyBrightnessModal.tsx # Neo-brutalist arcade cabinet modal
        ├── InitialLure.tsx     # Blank white deceptively simple teaser screen
        ├── RageProfileModal.tsx# The main rage bait onboarding terminal
        ├── ToastAlert.tsx      # Terminal-style anti-paste/error alert toasts
        └── SuccessTroll.tsx    # Final troll conclusion screen
```

## 3. Core Engine Mechanics

### A. Hardware Luminance Trap (`BrightnessContext`, `flappyEngine.ts`)
- Clamps the initial viewport brightness to `10%` via `filter: brightness(0.10)`.
- Intercepts positive delta slider events in `QuickSettingsBar` to launch `FlappyBrightnessModal`.
- Canvas arcade engine runs at 60 FPS with responsive AABB collision geometry:
  - Jump impulse: `-7.4 px/frame`
  - Gravity: `0.44 px/frame²`
  - Uniform gap: `136 px`
  - Pipe speed: `2.4 px/frame`
- Dual-mode asset pipeline: Automatically loads custom sprites (`bird.png`, `pipe-top.png`, `pipe-bottom.png`) and sounds (`jump.mp3`, `score.mp3`, `crash.mp3`) from `/assets/flappy/` if present; otherwise seamlessly executes high-contrast procedural vector graphics and parametric Web Audio API oscillators.

### B. Clipboard Interceptor (`onPaste`, `onDrop`)
Intercepts any clipboard injection attempt. Triggers:
1. `e.preventDefault()`
2. State trigger for `isShaking` CSS animation on the input.
3. System alert toast displaying randomized condescending reprimands.

### C. Progressive Rule Cascade Engine
Rules are modeled as an ordered list of criteria:
```typescript
interface Rule {
  id: number;
  label: string;
  description: string;
  validator: (password: string) => boolean;
  hint?: string;
  revealed: boolean;
}
```
Validation runs synchronously on every `onChange` keystroke. A rule is marked `passed` if its validator returns true. A rule becomes `revealed` once all prior rules evaluate to `passed`.

## 4. Design System Compliance
The entire feature is built to the strict high-contrast neo-brutalist standards defined in `DESIGN.md`:
- `rounded-none` (0px border-radius across all buttons, inputs, and modals).
- 2px–4px solid high-contrast borders (`#FFFFFF` on `#000000`).
- Monospace telemetry typography (`Space Mono`).
