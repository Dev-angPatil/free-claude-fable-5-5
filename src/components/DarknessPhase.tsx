import React, { useState } from 'react';
import { Lightbulb, Sun, Gamepad2, Flag } from 'lucide-react';
import { useBrightness } from './BrightnessContext';
import { FlappyBrightnessModal } from './FlappyBrightnessModal';
import { SkipPhaseModal } from './SkipPhaseModal';

interface DarknessPhaseProps {
  onProceedToPassword: () => void;
}

export const DarknessPhase: React.FC<DarknessPhaseProps> = ({ onProceedToPassword }) => {
  const { brightness, openGame, admitDefeat } = useBrightness();
  const [isAdmitModalOpen, setIsAdmitModalOpen] = useState(false);

  const handleEarnedBrightness = () => {
    onProceedToPassword();
  };

  const handleAdmitDefeatConfirmed = () => {
    admitDefeat();
    setIsAdmitModalOpen(false);
    onProceedToPassword();
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white flex flex-col justify-between p-6 sm:p-8 select-none overflow-hidden font-sans">
      {/* Top Right: "Admit Defeat & Set Brightness" Button */}
      <div className="w-full flex justify-end items-center z-40">
        <button
          onClick={() => setIsAdmitModalOpen(true)}
          className="group inline-flex items-center gap-2 bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/80 hover:border-red-500/50 text-neutral-300 hover:text-white px-4 py-2.5 rounded-xl text-xs font-mono font-medium transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <Flag className="w-3.5 h-3.5 text-red-400 group-hover:rotate-12 transition-transform" />
          <span>Admit Defeat & Set Brightness</span>
        </button>
      </div>

      {/* Middle: Prominent "Play Flappy Bird to get light" Button */}
      <main className="my-auto mx-auto text-center px-4 z-40 flex flex-col items-center">
        <div className="mb-6">
          <div className="w-16 h-16 rounded-2xl bg-neutral-900/80 border border-neutral-800 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
            <Lightbulb className="w-8 h-8 fill-amber-400/20 stroke-[1.75]" />
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
          The Room is Pitch Dark
        </h2>

        <p className="text-xs text-neutral-400 font-mono max-w-sm mb-8 leading-relaxed">
          The bulb shut off. Your login directives are hidden in darkness. Earn lumens by clearing pipes.
        </p>

        {/* Central Glowing Action Button */}
        <button
          onClick={openGame}
          className="group relative inline-flex items-center gap-3 bg-white text-black hover:bg-neutral-100 px-7 py-4 rounded-2xl font-semibold text-sm tracking-wide transition-all duration-300 shadow-[0_0_35px_rgba(255,255,255,0.7),0_0_70px_rgba(255,255,255,0.3)] animate-pulseGlow active:scale-98 cursor-pointer"
        >
          <Gamepad2 className="w-5 h-5 text-neutral-900" />
          <span>Play Flappy Bird to get light</span>
        </button>

        {/* Status indicator if user already has some brightness */}
        {brightness > 10 && (
          <button
            onClick={onProceedToPassword}
            className="mt-6 text-xs font-mono text-neutral-500 hover:text-neutral-300 transition-colors underline underline-offset-4"
          >
            Continue with current {brightness}% lux →
          </button>
        )}
      </main>

      {/* Subtle Bottom Empty Spacer to keep Middle centered */}
      <div className="h-6"></div>

      {/* Flappy Bird Arcade Modal */}
      <FlappyBrightnessModal
        onProceedWithBrightness={handleEarnedBrightness}
        onAdmitDefeat={handleAdmitDefeatConfirmed}
      />

      {/* Admit Defeat / Skip Modal */}
      <SkipPhaseModal
        isOpen={isAdmitModalOpen}
        onClose={() => setIsAdmitModalOpen(false)}
        onSuccess={handleAdmitDefeatConfirmed}
      />
    </div>
  );
};
