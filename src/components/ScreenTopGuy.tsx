import React, { useState, useEffect } from 'react';
import { Swords, AlertTriangle, ShieldAlert } from 'lucide-react';

interface ScreenTopGuyProps {
  onStartBattle: () => void;
  onDismiss?: () => void;
}

export const ScreenTopGuy: React.FC<ScreenTopGuyProps> = ({ onStartBattle }) => {
  const [countdown, setCountdown] = useState(3);
  const [speechIndex, setSpeechIndex] = useState(0);

  const speeches = [
    "HALT! You've passed 6 directives?! Impressive, but you won't pass ME!",
    "I am the Passphrase Overseer! Battle me for Claude 5.5 access!",
    "Reflex combat initiated! Click the black dots fast or PERISH!",
  ];

  useEffect(() => {
    // Cycle dialogue
    const speechTimer = setInterval(() => {
      setSpeechIndex((prev) => (prev + 1) % speeches.length);
    }, 1200);

    // Auto-countdown to battle
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
    <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none flex flex-col items-center animate-slideDown">
      
      {/* Top Edge Viewport Ledge / Hazard Railing */}
      <div className="w-full bg-[#0a0a0a]/95 border-b-2 border-amber-500/80 backdrop-blur-md flex items-center justify-between px-4 py-1 font-mono text-[10px] text-amber-400 select-none shadow-[0_6px_25px_rgba(0,0,0,0.8)] pointer-events-auto">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
          <span className="font-bold tracking-wider uppercase">ANTHROPIC OVERSEER BREACH // TOP OF SCREEN</span>
        </div>
        <div className="text-neutral-400 hidden sm:flex items-center gap-1.5">
          <ShieldAlert className="w-3 h-3 text-amber-400" />
          <span>DIRECTIVE GUARDIAN ENGAGED (6+ RULES DETECTED)</span>
        </div>
      </div>

      {/* The Guy perched on top of the viewport border */}
      <div className="relative pointer-events-auto flex flex-col items-center select-none pt-2">
        
        {/* Character Illustration (Standing Boss at top of screen) */}
        <div className="relative flex flex-col items-center group cursor-pointer" onClick={onStartBattle}>
          {/* Glowing Aura */}
          <div className="absolute -inset-3 bg-amber-500/25 rounded-full blur-md animate-pulse"></div>

          {/* SVG Character Avatar: Standing Boss */}
          <svg
            className="w-20 h-24 sm:w-24 sm:h-28 text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.95)] transition-transform duration-200 group-hover:scale-105"
            viewBox="0 0 100 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Fedora / Boss Hat */}
            <path d="M25 32H75L70 20H30L25 32Z" fill="#121212" stroke="#ffffff" strokeWidth="2.5" />
            <rect x="20" y="32" width="60" height="5" rx="2" fill="#ffffff" />

            {/* Head */}
            <circle cx="50" cy="46" r="14" fill="#000000" stroke="#ffffff" strokeWidth="2.5" />

            {/* Cool Sunglasses */}
            <rect x="42" y="42" width="8" height="5" rx="1" fill="#f59e0b" />
            <rect x="52" y="42" width="8" height="5" rx="1" fill="#f59e0b" />
            <line x1="49" y1="44" x2="53" y2="44" stroke="#ffffff" strokeWidth="1.5" />

            {/* Smug Smirk */}
            <path d="M47 53 Q50 56 55 52" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

            {/* Trench Coat Body */}
            <path d="M36 60 L30 105 L70 105 L64 60 Z" fill="#0f0f11" stroke="#ffffff" strokeWidth="2.5" />

            {/* Coat Lapels & Tie */}
            <line x1="50" y1="60" x2="50" y2="92" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 3" />
            <polygon points="50,62 46,72 50,78 54,72" fill="#ef4444" />

            {/* Arms - Crossing Arms / Boss Stance */}
            <path d="M33 65 L44 80 L56 80 L67 65" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" />

            {/* Feet / Boots perched on top bar */}
            <rect x="34" y="105" width="12" height="7" rx="2" fill="#ffffff" />
            <rect x="54" y="105" width="12" height="7" rx="2" fill="#ffffff" />
          </svg>

          {/* Action Callout Button */}
          <button
            type="button"
            onClick={onStartBattle}
            className="mt-1 px-4 py-1.5 bg-white hover:bg-neutral-200 text-black font-mono font-bold text-xs rounded-md shadow-2xl flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer ring-2 ring-amber-400"
          >
            <Swords className="w-3.5 h-3.5" />
            <span>FIGHT NOW ({countdown}s)</span>
          </button>
        </div>

        {/* Speech Balloon below the Guy */}
        <div className="relative mt-2 px-4 py-2.5 bg-neutral-900 border-2 border-white rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.9)] text-white font-mono text-xs max-w-sm sm:max-w-md text-center animate-pulse">
          {/* Speech bubble arrow pointing up to character */}
          <div className="absolute left-1/2 -top-2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-white"></div>

          <div className="flex items-center justify-center gap-1.5 text-amber-400 font-bold uppercase text-[11px] mb-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>OVERSEER CHALLENGE</span>
          </div>
          <p className="text-neutral-200 text-xs font-sans leading-snug">
            "{speeches[speechIndex]}"
          </p>
        </div>

      </div>
    </div>
  );
};
