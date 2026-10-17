import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Trophy, AlertTriangle, Play, Sparkles, ArrowRight, RotateCcw, Flag } from 'lucide-react';
import { useBrightness } from './BrightnessContext';
import { FlappyEngine, GameState } from '../game/flappyEngine';

const TAUNTS = [
  "You died! Your death score is now your permanent screen brightness.",
  "Crash detected! Hope you like reading in the dark.",
  "Gravitational failure! Your photons have been rationed to your final score.",
  "Zero spatial awareness. Your earned lux matches your meager score.",
  "Fable 5.5 requires elite reflexes. Enjoy squinting at the password directives.",
];

interface FlappyBrightnessModalProps {
  onProceedWithBrightness?: (earnedLux: number) => void;
  onAdmitDefeat?: () => void;
}

export const FlappyBrightnessModal: React.FC<FlappyBrightnessModalProps> = ({
  onProceedWithBrightness,
  onAdmitDefeat,
}) => {
  const { isGameOpen, closeGame, applyScoreAsBrightness, brightness, admitDefeat } = useBrightness();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<FlappyEngine | null>(null);

  const [gameState, setGameState] = useState<GameState>('idle');
  const [deathScore, setDeathScore] = useState<number | null>(null);
  const [activeTaunt, setActiveTaunt] = useState<string>('');

  useEffect(() => {
    if (!isGameOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = new FlappyEngine({
      canvas,
      onScore: () => {},
      onCrash: (finalScore) => {
        setDeathScore(finalScore);
        applyScoreAsBrightness(finalScore);
        const randomTaunt = TAUNTS[Math.floor(Math.random() * TAUNTS.length)];
        setActiveTaunt(randomTaunt);
      },
      onWin: () => {
        applyScoreAsBrightness(100);
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#FFFFFF', '#A0A0A0', '#555555'],
        });
      },
      onStateChange: (state) => {
        setGameState(state);
      },
    });

    engineRef.current = engine;
    engine.start();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ' || e.code === 'ArrowUp') {
        e.preventDefault();
        engine.flap();
      }
      if (e.code === 'Escape') {
        closeGame();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      engine.stop();
      engineRef.current = null;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isGameOpen, closeGame, applyScoreAsBrightness]);

  if (!isGameOpen) return null;

  const handleCanvasInteraction = () => {
    if (engineRef.current) {
      engineRef.current.flap();
    }
  };

  const handleProceed = () => {
    closeGame();
    if (onProceedWithBrightness && deathScore !== null) {
      onProceedWithBrightness(Math.max(10, deathScore));
    }
  };

  const handleDefeat = () => {
    admitDefeat();
    closeGame();
    if (onAdmitDefeat) {
      onAdmitDefeat();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 font-sans select-none">
      {/* Vercel-Style Clean Minimalist Game Modal */}
      <div className="relative w-full max-w-[440px] bg-[#0a0a0a] border border-neutral-800 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.08)] p-5 flex flex-col items-center">
        {/* Header Bar */}
        <div className="w-full flex items-center justify-between border-b border-neutral-800/80 pb-3 mb-3">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
              Hardware Luminance Trap
            </span>
            <h2 className="text-sm font-semibold text-white tracking-tight flex items-center gap-1.5">
              <span>Flappy Bird Lumens</span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono bg-neutral-900 border border-neutral-800 px-2 py-0.5 text-neutral-200 rounded-md">
              {deathScore !== null ? `${Math.max(10, deathScore)}% LUX` : `${brightness}% LUX`}
            </span>
            <button
              onClick={closeGame}
              className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              title="Close modal (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Arcade Frame Viewport */}
        <div 
          className="relative rounded-xl border border-neutral-800 bg-black overflow-hidden cursor-pointer shadow-inner" 
          onClick={handleCanvasInteraction}
        >
          <canvas
            ref={canvasRef}
            className="block"
            width={400}
            height={520}
          />

          {/* Overlay: Idle State */}
          {gameState === 'idle' && (
            <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center">
              <div className="w-12 h-12 rounded-xl border border-neutral-700 flex items-center justify-center mb-4 bg-neutral-900 shadow-lg">
                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
              </div>
              <h3 className="text-base font-semibold text-white tracking-tight mb-1.5">
                Earn Your Lumens
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-5 max-w-[260px]">
                Whatever score you die at becomes your screen brightness. Reach 100 for full daylight.
              </p>
              <div className="border border-neutral-800 bg-neutral-900/90 rounded-lg px-3 py-1.5 text-[11px] font-mono text-neutral-300">
                CLICK or PRESS <span className="text-white font-bold">SPACE</span> TO FLAP
              </div>
            </div>
          )}

          {/* Overlay: Game Over State */}
          {gameState === 'gameover' && (
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-150">
              <div className="w-10 h-10 rounded-xl border border-red-500/30 bg-red-950/20 flex items-center justify-center mb-2.5">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>

              <div className="bg-neutral-900 border border-neutral-800 text-white px-2.5 py-1 rounded-md text-[11px] font-mono font-medium tracking-wide uppercase mb-2">
                BRIGHTNESS SET: {Math.max(10, deathScore ?? 0)}%
              </div>

              <p className="text-xs text-neutral-300 italic max-w-[280px] mb-4">
                "{activeTaunt}"
              </p>

              <div className="flex items-center gap-4 border-y border-neutral-800/80 py-2.5 mb-4 w-full justify-center font-mono">
                <div className="text-center">
                  <div className="text-[10px] text-neutral-500">DEATH SCORE</div>
                  <div className="text-lg font-bold text-white">{deathScore ?? 0}</div>
                </div>
                <div className="w-px h-7 bg-neutral-800" />
                <div className="text-center">
                  <div className="text-[10px] text-neutral-500">NEW BRIGHTNESS</div>
                  <div className="text-lg font-bold text-amber-400">{Math.max(10, deathScore ?? 0)}%</div>
                </div>
              </div>

              <div className="w-full space-y-2">
                <button
                  onClick={handleProceed}
                  className="w-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs py-2.5 px-4 rounded-lg tracking-wide transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                >
                  <span>Continue to Password ({Math.max(10, deathScore ?? 0)}% Light)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCanvasInteraction();
                  }}
                  className="w-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-medium text-xs py-2 px-4 rounded-lg border border-neutral-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Try Again for More Lumens</span>
                </button>
              </div>
            </div>
          )}

          {/* Overlay: Victory State (Score >= 100) */}
          {gameState === 'won' && (
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-amber-400 text-black flex items-center justify-center mb-3 shadow-lg">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="bg-neutral-900 border border-neutral-800 text-white px-2.5 py-0.5 rounded text-[11px] font-mono tracking-wider uppercase mb-2">
                100% ILLUMINATION UNLOCKED
              </div>
              <p className="text-xs text-neutral-300 mb-4 max-w-[260px]">
                You endured 100 consecutive pipes! Full daylight is yours.
              </p>
              <button
                onClick={handleProceed}
                className="w-full bg-white text-black font-semibold text-xs py-2.5 rounded-lg hover:bg-neutral-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Enter Password with 100% Lux</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions & Admit Defeat Escape Hatch */}
        <div className="w-full flex items-center justify-between text-xs text-neutral-400 pt-3 mt-3 border-t border-neutral-800/80">
          <span className="font-mono text-[10px]">SPACE: FLAP</span>
          
          <button
            onClick={handleDefeat}
            className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white hover:underline transition-all cursor-pointer"
          >
            <Flag className="w-3 h-3 text-red-400" />
            <span>Admit Defeat (Set 100%)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
