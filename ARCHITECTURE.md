# ARCHITECTURE.md: FREE CLAUDE FABLE 5.5 UNLIMITED

## 1. System Architecture Overview

*FREE CLAUDE FABLE 5.5 UNLIMITED* is structured around a linear, unidirectional state machine governing a 6-phase experiential journey. It combines React 19, TypeScript, Tailwind CSS, HTML5 Canvas 2D, and Web Audio API synthesis.

```
                              [ User Starts ]
                                     │
                                     ▼
                      Phase 1 & 2: BlankVoid.tsx
                    (Pure White Canvas + Timer)
                                     │
                     (~2.4s Toast Slide-Up: Bottom Right)
                                     ▼
                         NotificationToast.tsx
                                     │
                             (User clicks toast)
                                     ▼
                   Phase 3: ProfileApplicationPage.tsx
                    (Vercel Minimalist Profile Form)
                                     │
                       (User clicks "Get Unlimited Access")
                                     ▼
                    Phase 4: BulbSpotlightLogin.tsx
                   (Pixel Bulb + Conical CSS Spotlight)
                                     │
                      (Bulb switches OFF after ~3.4s)
                                     ▼
                      Phase 5: DarknessPhase.tsx
                 (Dark Canvas + Glowing Top-Right Button)
                         │                      │
       (Click Top-Right Lit Button)       (Click "Admit Defeat")
                         ▼                      ▼
             FlappyBrightnessModal.tsx   SkipPhaseModal.tsx
           (FlappyEngine Canvas Loop)   (Humiliation Override)
                         │                      │
            (Score = Brightness %)       (Set 100% Lux)
                         └──────────┬───────────┘
                                    │
                                    ▼
                      Phase 6: RageProfileModal.tsx
                 (14-Directive Security Password Engine)
                  (Viewport Filter = brightness(Score%))
                                    │
               (Password >= 8 chars / Manual Encounter)
                                    ▼
                           ScreenTopGuy.tsx
                    (Top-of-Screen Boss Interruption)
                                    │
                        (3s Countdown or "FIGHT!")
                                    ▼
                         ClickBattleArena.tsx
                  (Blank White Screen Reflex Battle)
                         │                      │
             (15 Dots in < 8s)            (Time Runs Out)
                         ▼                      ▼
                 Overseer Banished      DefeatLoseScreen.tsx
               (Resume Passphrase)      (Diagnostics, Rematch)
                         │
               (All Directives Passed)
                         ▼
              SuccessTroll.tsx (HTTP 429)
```

## 2. Component Hierarchy & Responsibilities

| Component | Responsibility | Design Token Alignment |
| :--- | :--- | :--- |
| `App.tsx` | Master phase controller (`void` → `profile` → `bulb` → `darkness` → `password` → `success`). Manages developer state. | LongCipher Minimalist |
| `BrightnessContext.tsx` | Global luminance state ratchet. Controls CSS variable `--app-brightness` and provides `applyScoreAsBrightness` and `admitDefeat`. | Pure State Provider |
| `BlankVoid.tsx` | Phase 1: Pure white void. Runs 2.4s timer to reveal the notification toast. | Canvas Light (`#ffffff`) |
| `NotificationToast.tsx` | Phase 2: Bottom-right sliding notification toast offering free Claude tokens. | Elevated White Card, 16px radius, soft drop-shadow |
| `ProfileApplicationPage.tsx` | Phase 3: High-density Vercel-style application form capturing handle and org before granting compute. | Vercel Light Minimalist, 12px radius, subtle borders |
| `BulbSpotlightLogin.tsx` | Phase 4: Top-hung pixel bulb (`bulb-on.png`) casting conical spotlight (`clip-path: polygon`). Swaps to `bulb-off.png` on switch-off. | Conical mask overlay, smooth 700ms darkness fade |
| `DarknessPhase.tsx` | Phase 5: Pitch-black room with glowing top-right lit button (`animate-pulseGlow`) and subtle Admit Defeat link. | OLED Black (`#000000`), pulsing halo |
| `FlappyBrightnessModal.tsx` | In-modal arcade container hosting `flappyEngine.ts`. Converts death score into permanent viewport brightness. | Vercel Dark Card (`#0a0a0a`), 16px radius |
| `flappyEngine.ts` | 60 FPS HTML5 Canvas engine with dual-circle collision detection and Web Audio API synthesis. | Responsive 400x520 viewport |
| `RageProfileModal.tsx` | Phase 6: Core rage loop. 14 progressive cryptographic rules, real-time UTC minute tracking, and boss interruption coordinator. | Vercel Dark Minimalist (`#0a0a0a`, `#121212`, 1px borders) |
| `ScreenTopGuy.tsx` | Animated vector boss perched on the top screen border, interrogating user with dynamic speech bubbles and battle countdown. | Animated vector avatar, glowing aura |
| `ClickBattleArena.tsx` | Full-screen pure white canvas with randomly popping black dots, click bursts, real-time telemetry HUD, and 8s countdown timer. | Pure White Canvas (`#ffffff`), Stark Black Dots |
| `DefeatLoseScreen.tsx` | High-impact game over screen with diagnostic breakdown (dots neutralized, CPS, compliance), smug commentary, and rematch buttons. | OLED Dark (`#000000`), Crimson accents |
| `SkipPhaseModal.tsx` | Humiliation concession modal requiring biological typing of the override passphrase. | Vercel Dark Minimalist, 16px radius |
| `SuccessTroll.tsx` | Two-stage victory celebration followed by the 0.038-second latency HTTP 429 rugpull. | Vercel Dark Minimalist |

## 3. Design System (`Akagi201/longcipher-design`) Integration
- **Shadow-as-Border**: Replaced bulky 3-5px solid borders with refined `1px` translucent edge rings (`rgba(255, 255, 255, 0.08)` / `border-neutral-800`).
- **Surface Elevation**: Tiered dark surfaces (`#000000` canvas → `#0a0a0a` card → `#121212` wells → `#181818` interactive).
- **Typography**: `Inter` for clean humanist body text with tight tracking; `JetBrains Mono` for rules, telemetry, and cryptographic counters.
- **Concentric Radii**: 6px for buttons/inputs, 8px for cards/rows, 12-16px for modals.
