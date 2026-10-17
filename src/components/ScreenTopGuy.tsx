import React, { useState, useEffect } from 'react';
import { Swords, AlertTriangle, ShieldAlert } from 'lucide-react';

interface ScreenTopGuyProps {
  onStartBattle: () => void;
  onDismiss?: () => void;
}

export const ScreenTopGuy: React.FC<ScreenTopGuyProps> = ({ onStartBattle }) => {
  const [countdown, setCountdown] = useState(5);
  const [speechIndex, setSpeechIndex] = useState(0);

  const speeches = [
    "HALT! You've solved Rule 9?! Impressive, but you won't pass ME!",
    "I am the Passphrase Overseer! Type if you dare, but battle is imminent!",
    "Reflex combat initiated! Click the black dots or PERISH!",
  ];

  useEffect(() => {
    // Cycle dialogue
    const speechTimer = setInterval(() => {
      setSpeechIndex((prev) => (prev + 1) % speeches.length);
    }, 1500);

    // Auto-countdown to battle (5s)
    const countTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countTimer);
          clearInterval(speechTimer);
          onStartBattle();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(speechTimer);
      clearInterval(countTimer);
    };
  }, [onStartBattle]);

  return (
    <div className="fixed inset-0 z-40 pointer-events-none flex flex-col items-center justify-between select-none overflow-hidden animate-slideDown">
      
      {/* Top Warning Rail */}
      <div className="w-full bg-[#0a0a0a]/90 border-b-2 border-amber-500/80 backdrop-blur-sm flex items-center justify-between px-4 py-1.5 font-mono text-[11px] text-amber-400 shadow-[0_4px_30px_rgba(0,0,0,0.8)] z-50">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
          <span className="font-bold tracking-wider uppercase">OVERSEER BREACH // FULL-SCREEN INVASION</span>
        </div>
        <div className="text-neutral-300 hidden sm:flex items-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-semibold text-white">TYPE YOUR PASSWORD FREELY — COMBAT STARTS IN {countdown}s</span>
        </div>
      </div>

      {/* GIGANTIC Full-Screen Towering Guy (Spans Entire Screen) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden">
        {/* Ambient Darkened Holographic Backing with Scanlines */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] pointer-events-none" />

        {/* Ambient Pulsing Aura */}
        <div className="absolute w-[80vw] h-[80vh] bg-amber-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />

        {/* Massive Screen-Covering Character Graphic */}
        <svg
          className="w-full h-full max-w-5xl max-h-[92vh] text-white opacity-85 pointer-events-none select-none drop-shadow-[0_20px_60px_rgba(0,0,0,0.95)]"
          viewBox="0 0 500 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Giant Fedora / Boss Hat covering top third */}
          <path d="M125 140 H375 L350 70 H150 L125 140 Z" fill="#0c0c0e" stroke="#ffffff" strokeWidth="4" />
          <rect x="90" y="140" width="320" height="18" rx="6" fill="#ffffff" />
          <line x1="100" y1="149" x2="400" y2="149" stroke="#f59e0b" strokeWidth="3" />

          {/* Giant Head */}
          <circle cx="250" cy="210" r="68" fill="#050505" stroke="#ffffff" strokeWidth="5" />

          {/* Glowing Amber Sunglasses */}
          <rect x="210" y="195" width="36" height="22" rx="4" fill="#f59e0b" className="animate-pulse" />
          <rect x="254" y="195" width="36" height="22" rx="4" fill="#f59e0b" className="animate-pulse" />
          <line x1="244" y1="205" x2="258" y2="205" stroke="#ffffff" strokeWidth="4" />
          {/* Eyewear Glint */}
          <line x1="216" y1="200" x2="228" y2="212" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="260" y1="200" x2="272" y2="212" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />

          {/* Smug Smirk */}
          <path d="M235 245 Q250 260 275 242" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />

          {/* Massive Trenchcoat covering the middle and bottom of the screen */}
          <path d="M165 275 L110 590 H390 L335 275 Z" fill="#0a0a0c" stroke="#ffffff" strokeWidth="5" />

          {/* Wide Coat Lapels & Red Tie */}
          <polygon points="250,280 230,340 250,370 270,340" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
          <line x1="250" y1="370" x2="250" y2="520" stroke="#ffffff" strokeWidth="4" strokeDasharray="8 8" />

          {/* Colossal Crossing Arms */}
          <path d="M150 310 L210 400 H290 L350 310" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" fill="none" />
          <path d="M150 310 L210 400 H290 L350 310" stroke="#0a0a0c" strokeWidth="6" strokeLinecap="round" fill="none" />

          {/* Giant Gloves / Hands gripping over the screen edges */}
          <circle cx="210" cy="400" r="16" fill="#18181b" stroke="#ffffff" strokeWidth="3" />
          <circle cx="290" cy="400" r="16" fill="#18181b" stroke="#ffffff" strokeWidth="3" />

          {/* Feet planted at screen floor */}
          <rect x="175" y="585" width="55" height="15" rx="5" fill="#ffffff" />
          <rect x="270" y="585" width="55" height="15" rx="5" fill="#ffffff" />
        </svg>
      </div>

      {/* Floating Interactive Combat Banner at Bottom */}
      <div className="relative mb-6 z-50 flex flex-col items-center pointer-events-auto">
        
        {/* Speech Balloon */}
        <div className="mb-3 px-5 py-2.5 bg-neutral-900/95 border-2 border-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.9)] text-white font-mono text-xs max-w-lg text-center backdrop-blur-md">
          <div className="flex items-center justify-center gap-1.5 text-amber-400 font-bold uppercase text-[11px] mb-1">
            <AlertTriangle className="w-4 h-4" />
            <span>OVERSEER SCREEN TAKEOVER</span>
          </div>
          <p className="text-neutral-200 text-xs sm:text-sm font-sans leading-snug">
            "{speeches[speechIndex]}"
          </p>
          <div className="mt-1 text-[10px] text-amber-300 font-mono">
            💡 You can still type your passphrase through him!
          </div>
        </div>

        {/* Immediate Fight Action Button */}
        <button
          type="button"
          onClick={onStartBattle}
          className="px-6 py-3 bg-white hover:bg-neutral-200 text-black font-mono font-black text-sm uppercase tracking-wider rounded-xl shadow-[0_0_35px_rgba(255,255,255,0.4)] flex items-center gap-2 transition-all active:scale-95 cursor-pointer ring-4 ring-amber-400 animate-pulse pointer-events-auto"
        >
          <Swords className="w-4 h-4 text-black" />
          <span>BATTLE OVERSEER NOW ({countdown}s)</span>
        </button>
      </div>

      {/* Bottom hazard edge */}
      <div className="w-full h-1.5 bg-gradient-to-r from-amber-500 via-red-500 to-amber-500 z-50" />
    </div>
  );
};
