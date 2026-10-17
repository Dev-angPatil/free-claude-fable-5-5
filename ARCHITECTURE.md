# ARCHITECTURE.md: FREE CLAUDE FABLE 5.5 UNLIMITED

## 1. System Architecture Overview
The application is structured as a reactive Single Page Application (SPA) utilizing React 19, TypeScript, and Tailwind CSS. The design embraces a core-first minimalist architecture with modular separation between the validation logic engine and UI presentation components.

```mermaid
graph TD
    A[InitialLure View (Pure White)] -->|Click 'Claim Token'| B[Terminal Transition Handshake]
    B --> C[RageProfileModal (OLED Black)]
    C --> D[Clipboard Interceptor]
    C --> E[Reactive Password Rules Engine]
    C --> F[Entropy & Gaslighting Feedback Engine]
    E -->|Rules Satisfied Cascade| G[Rule Progress & Cascade Cards]
    C -->|Submit Passphrase| H[Verification Spinner Troll]
    H --> I[SuccessTroll Modal]
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
├── README.md                   # Setup and usage guide
├── public/                     # Static assets
└── src/
    ├── main.tsx                # Entry point
    ├── index.css               # Base Tailwind layers and utility animations
    ├── App.tsx                 # Root application controller & view switcher
    ├── rules/
    │   └── passwordRules.ts    # Functional validator engine & rules definition
    └── components/
        ├── InitialLure.tsx     # Blank white deceptively simple teaser screen
        ├── RageProfileModal.tsx# The main rage bait onboarding terminal
        ├── ToastAlert.tsx      # Terminal-style anti-paste/error alert toasts
        └── SuccessTroll.tsx    # Final troll conclusion screen
```

## 3. Core Engine Mechanics

### A. Clipboard Interceptor (`onPaste`, `onDrop`)
Intercepts any clipboard injection attempt. Triggers:
1. `e.preventDefault()`
2. State trigger for `isShaking` CSS animation on the input.
3. System alert toast displaying randomized condescending reprimands.

### B. Progressive Rule Cascade Engine
Rules are modeled as an ordered list of criteria:
```typescript
interface Rule {
  id: number;
  label: string;
  description: string;
  validator: (password: string) => boolean;
  hint?: string;
}
```
At any given moment, the user sees all previously satisfied rules plus the *first* unsatisfied rule (or a max revealed index). Satisfying rule $k$ reveals rule $k+1$. If an edit to satisfy $k+1$ breaks rule $j < k+1$, rule $j$ marks itself as failed, blocking submission and requiring retroactive correction.

### C. Live Gaslighting Feedback
Calculates dynamic pseudo-entropy based on character types, length, and rule satisfaction, accompanied by deadpan insults updated in real-time.
