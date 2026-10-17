import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Trophy, AlertTriangle, Play, Sparkles } from 'lucide-react';
import { useBrightness } from './BrightnessContext';
import { FlappyEngine, GameState } from '../game/flappyEngine';

const TAUNTS = [
  "Back to 10% darkness. Reflex telemetry: substandard.",
  "Crash detected. Your photons have been confiscated.",
  "Gravitational failure. The dark mode claims another victim.",
  "Did you really think 100% illumination would be easy?",
  "Zero spatial awareness. Resetting luminance to 10%.",
  "Fable 5.5 requires elite reflexes. Try again.",
];

export const FlappyBrightnessModal: React.FC = () => {
  const { isGameOpen, closeGame, setBrightness, resetToBaseline, brightness } = useBrightness();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<FlappyEngine | null>(null);

  const [gameState, setGameState] = useState<GameState>('idle');
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [activeTaunt, setActiveTaunt] = useState<string>('');

  // Initialize and manage the engine lifecycle
  useEffect(() => {
    if (!isGameOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = new FlappyEngine({
      canvas,
      onScore: (score, newBrightness) => {
        setCurrentScore(score);
        setBrightness(newBrightness);
      },
      onCrash: () => {
        resetToBaseline();
        const randomTaunt = TAUNTS[Math.floor(Math.random() * TAUNTS.length)];
        setActiveTaunt(randomTaunt);
      },
      onWin: () => {
        setBrightness(100);
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

    // Keydown handlers
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
  }, [isGameOpen, closeGame, setBrightness, resetToBaseline]);

  if (!isGameOpen) return null;

  const handleCanvasInteraction = () => {
    if (engineRef.current) {
      engineRef.current.flap();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 font-mono select-none">
      {/* Neo-brutalist Arcade Cabinet Container */}
      <div className="relative w-full max-w-[440px] bg-black border-4 border-white shadow-[8px_8px_0px_0px_#FFFFFF] p-4 flex flex-col items-center">
        {/* Header Bar */}
        <div className="w-full flex items-center justify-between border-b-2 border-white pb-3 mb-3">
          <div className="flex flex-col">
            <span className="text-[10px] tracking-widest text-[#9CA3AF] uppercase">Hardware Intercept</span>
            <h2 className="text-sm font-black text-white tracking-wider flex items-center gap-1.5">
              <span>LUMINANCE GAUNTLET</span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-[#181818] border border-[#3A3A3C] px-2 py-0.5 text-white font-bold">
              {brightness}% LUX
            </span>
            <button
              onClick={closeGame}
              className="p-1 border border-white text-white hover:bg-white hover:text-black transition-colors"
              title="Close modal (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Arcade Frame Viewport */}
        <div className="relative border-2 border-white bg-black overflow-hidden cursor-pointer" onClick={handleCanvasInteraction}>
          <canvas
            ref={canvasRef}
            className="block"
            width={400}
            height={560}
          />

          {/* Overlay: Idle State */}
          {gameState === 'idle' && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-12 h-12 border-2 border-white flex items-center justify-center mb-4 bg-[#111111] animate-bounce">
                <Play className="w-6 h-6 text-white fill-white ml-0.5" />
              </div>
              <h3 className="text-lg font-black text-white tracking-wider mb-2">
                EARN YOUR LUMENS
              </h3>
              <p className="text-xs text-[#D1D5DB] leading-relaxed mb-4 max-w-[260px]">
                Each cleared pipe grants <span className="text-white font-bold">+1% Brightness</span>.
                Reaching 100% requires 100 consecutive clearances.
              </p>
              <div className="border border-white/40 bg-[#181818] px-3 py-1.5 text-[11px] text-[#9CA3AF]">
                CLICK or PRESS <span className="text-white font-bold">SPACE</span> TO FLAP
              </div>
            </div>
          )}

          {/* Overlay: Game Over State */}
          {gameState === 'gameover' && (
            <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-150">
              <div className="w-10 h-10 border-2 border-white bg-[#111111] flex items-center justify-center mb-3">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>

              <div className="bg-white text-black px-2 py-0.5 text-[11px] font-black tracking-widest uppercase mb-2">
                CRASH DETECTED // 10% RESTORED
              </div>

              <p className="text-xs text-[#D1D5DB] italic max-w-[280px] mb-4">
                "{activeTaunt}"
              </p>

              <div className="flex items-center gap-4 border-y border-[#3A3A3C] py-2 mb-5 w-full justify-center">
                <div className="text-center">
                  <div className="text-[10px] text-[#9CA3AF]">PIPES CLEARED</div>
                  <div className="text-xl font-black text-white">{currentScore}</div>
                </div>
                <div className="w-px h-8 bg-[#3A3A3C]" />
                <div className="text-center">
                  <div className="text-[10px] text-[#9CA3AF]">CURRENT LUX</div>
                  <div className="text-xl font-black text-white">10%</div>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCanvasInteraction();
                }}
                className="w-full bg-white text-black font-black text-xs py-2.5 uppercase tracking-wider border-2 border-white hover:bg-black hover:text-white transition-colors"
              >
                TRY AGAIN (SPACE)
              </button>
            </div>
          )}

          {/* Overlay: Victory State (Score >= 100) */}
          {gameState === 'won' && (
            <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-12 h-12 border-2 border-white bg-white text-black flex items-center justify-center mb-3">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="bg-white text-black px-2 py-0.5 text-[11px] font-black tracking-widest uppercase mb-2">
                100% ILLUMINATION UNLOCKED
              </div>
              <p className="text-xs text-[#D1D5DB] mb-4 max-w-[260px]">
                You endured 100 consecutive pipes. Full clarity has been achieved.
              </p>
              <button
                onClick={closeGame}
                className="w-full bg-white text-black font-black text-xs py-2.5 uppercase tracking-wider border-2 border-white hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>RETURN IN GLORY</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer Telemetry */}
        <div className="w-full flex items-center justify-between text-[10px] text-[#9CA3AF] pt-3 mt-3 border-t border-[#3A3A3C]">
          <span>CONTROLS: SPACE / CLICK</span>
          <span>TARGET: 100 PIPES</span>
        </div>
      </div>
    </div>
  );
};
