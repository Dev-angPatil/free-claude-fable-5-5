# ⚡ FREE CLAUDE FABLE 5.5 UNLIMITED

> **"Congratulations! You have been selected for unlimited research access to Claude 5.5 Fable."**
> *(Terms and conditions apply. Security verification required.)*

An ultra-sleek, minimalist psychological rage bait web application built with **React 19**, **TypeScript**, and **Tailwind CSS**, designed in strict accordance with the **Electric Volt** monochrome design system.

---

## ⚡ System Overview & Psychological Architecture

A high-fidelity psychological friction study masquerading as an elite AI platform access gateway:
1. **The Deceptive Lure**: A stark, pure-white blank viewport with a deceptive system banner announcing granted research access to Claude 5.5 Fable tokens.
2. **The Rage Onboarding Portal**: A high-contrast, OLED-black terminal requiring a **50-digit/character master passphrase** governed by 14 cascading, progressive, and deliberately contradictory rules.
3. **Clipboard Sabotage Interceptor**: Hard-coded DOM event trapping on `paste`, `drop`, and keyboard paste shortcuts, triggering screen shakes and gaslighting security alerts.
4. **Hardware Luminance Trap (Flappy Brightness)**: Viewport initialized to an atmospheric 10% brightness (`filter: brightness(0.10)`). Modulating brightness upwards intercepts the interaction and launches an embedded 60 FPS Flappy Bird endurance engine where every pipe cleared grants $+1\%$ brightness, while any collision catastrophically drops the screen back into darkness ($10\%$).

---

## 🚀 Quickstart & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- `npm` or `pnpm`

### Installation
```bash
# Clone the repository
git clone https://github.com/Dev-angPatil/free-claude-fable-5-5.git
cd free-claude-fable-5-5

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🛠️ Tech Stack & Design Tokens
- **Framework**: React 19 + Vite + TypeScript (Strict Type Safety)
- **Styling**: Tailwind CSS (Monochrome tokens documented in `DESIGN.md`)
- **Typography**: Inter & JetBrains Mono (Variable weight optical sizing)
- **Graphics & Audio**: HTML5 Canvas 2D Context + Web Audio API Synthesizers
- **Icons**: Lucide React

---

## 📋 Prompt Engineering & LLM Orchestration Report

This project was conceived, architected, and synthesized using advanced **Prompt Engineering Methodologies** (Role-Task-Constraint framing, Socratic iterative alignment, formal state machine specification, and contract-driven decomposition). Below is the comprehensive prompt audit trail detailing each engineering phase, prompt formulation, and technical outcome:

| Phase | Methodology | Engineered Prompt Formulation | Technical Outcome & Deliverables |
| :--- | :--- | :--- | :--- |
| **01: Architectural Inception & Cognitive Friction Design** | **Role-Task-Constraint (RTC) Framing + Socratic Elicitation** | *"Act as a Principal Human-Computer Interaction (HCI) Architect and Security Systems Engineer. Architect a satirical, high-contrast psychological friction web application that deconstructs developer FOMO around next-gen AI model releases. Ground the UI in the Electric Volt monochrome design system (zero chroma, pure OLED black `#000000`, crisp borders `#2C2C2E`, sharp 0px/4px radii). Formulate a multi-stage onboarding sequence featuring an initial inverted white lure screen transitioning into an OLED-black credential portal. Enforce an adversarial password validator requiring a 50-digit/character passphrase with 14 cascading, dynamically revealed constraints (including non-monotonic rules such as forbidding digits immediately following letters, prime sum invariants, and temporal UTC synchronization). Intercept all clipboard paste events with haptic visual shakes. Initiate interactive alignment via `/grill-me` to resolve state transitions and behavioral invariants."* | • Initial project scaffolding (`Vite`, `React 19`, `TypeScript`).<br>• Core design tokens defined in `DESIGN.md`.<br>• Pure functional rule engine (`src/rules/passwordRules.ts`).<br>• Monolithic credential interface with clipboard trapping (`src/components/RageProfileModal.tsx`).<br>• Initial lure state machine (`src/components/InitialLure.tsx`). |
| **02: Hardware-Emulated Gamified Interception** | **Formal State Specification & Multi-Branch Decision Tree Decomposition** | *"Act as a Lead Creative Systems Architect. Engineer a secondary cognitive rage vector that subverts physical device controls: an intercepted display luminance subsystem. Architect a global display filter that clamps the initial viewport brightness to 10% (`brightness(0.10)`), generating ambient tension. Design a top-level quick-settings luminance controller whose positive delta interactions are intercepted by an embedded 60 FPS HTML5 Canvas arcade engine (Flappy Bird). Specify linear illumination coupling ($\Delta \text{Brightness} = +1\%$ per cleared pipe) and a catastrophic crash penalty that drops luminance back to baseline ($10\%$). Provide full physics specifications (gravity: $0.45\,\text{px/f}^2$, jump impulse: $-7.5\,\text{px/f}$, uniform pipe gaps: $130\,\text{px}$) and dual-mode rendering supporting both external binary assets and zero-dependency procedural fallbacks. Execute a structured Socratic design triage (`/grill-me`) to define error penalties and UI topology."* | • Comprehensive system architecture document (`ARCHITECTURE.md`).<br>• Vision roadmap and psychological success criteria (`VISION.md`).<br>• Formal implementation plan with state flow diagrams (`implementation_plan.md`).<br>• Global luminance state provider (`src/components/BrightnessContext.tsx`).<br>• 60 FPS Canvas Game Engine specification (`src/game/flappyEngine.ts`). |
| **03: Decoupled Asset Pipeline & Contract Scaffolding** | **Interface-First Contract Engineering & Graceful Degradation** | *"Act as a Systems Build Engineer. Scaffold an isolated, zero-dependency static asset pipeline under `public/assets/flappy/`. Formulate strict asset contracts defining required sprite identifiers (`bird.png`, `pipe-top.png`, `pipe-bottom.png`) and audio telemetry endpoints (`jump.mp3`, `score.mp3`, `crash.mp3`). Implement an asynchronous runtime loader pattern that dynamically probes for user-provided assets while guaranteeing 100% operational readiness via procedural canvas vector drawing and Web Audio API parametric sound synthesis if assets are unpopulated."* | • Dedicated asset boundary: `public/assets/flappy/`.<br>• Asset specification contract: `public/assets/flappy/README.md`.<br>• Hybrid runtime loading architecture enabling instant hot-swapping of custom audio/visual assets. |

---

## 🎮 Custom Game Assets Integration

Custom sprites and audio can be placed directly into [`public/assets/flappy/`](public/assets/flappy/):
- `bird.png` (34x24 px or square sprite)
- `pipe-top.png` & `pipe-bottom.png` (52–64 px width)
- `jump.mp3`, `score.mp3`, `crash.mp3`

*If no custom files are placed, the engine automatically uses procedural monochrome vector rendering and Web Audio API synthesized chimes.*

---

## 📄 License
MIT License. Built for psychological endurance and UX testing.
