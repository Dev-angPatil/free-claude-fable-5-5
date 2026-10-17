import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Target, Clock, Zap, ShieldCheck } from 'lucide-react';

interface ClickBattleArenaProps {
  targetScore?: number;
  timeLimitSeconds?: number;
  onWin: () => void;
  onLose: (score: number, target: number, timeSpent: number) => void;
}

interface Dot {
  id: number;
  x: number; // percentage (10 to 90)
  y: number; // percentage (15 to 85)
  size: number; // in pixels (36 to 52)
}

interface ClickParticle {
  id: number;
  x: number;
  y: number;
}

export const ClickBattleArena: React.FC<ClickBattleArenaProps> = ({
  targetScore = 15,
  timeLimitSeconds = 8.0,
  onWin,
  onLose,
}) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimitSeconds);
  const [dots, setDots] = useState<Dot[]>([]);
  const [particles, setParticles] = useState<ClickParticle[]>([]);
  const [isVictory, setIsVictory] = useState(false);

  const dotIdCounter = useRef(0);
  const particleIdCounter = useRef(0);
  const startTimeRef = useRef(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasEndedRef = useRef(false);

  // Generate a random dot inside safe screen bounds
  const createDot = useCallback((): Dot => {
    dotIdCounter.current += 1;
    // Keep dots comfortably away from edges and top HUD
    const x = Math.floor(Math.random() * 76) + 12; // 12% to 88%
    const y = Math.floor(Math.random() * 68) + 18; // 18% to 86%
    const size = Math.floor(Math.random() * 16) + 38; // 38px to 54px
    return {
      id: dotIdCounter.current,
      x,
      y,
      size,
    };
  }, []);

  // Initialize dots on mount (4 active dots on screen)
  useEffect(() => {
    const initialDots = [createDot(), createDot(), createDot(), createDot()];
    setDots(initialDots);
  }, [createDot]);

  // Main countdown timer loop (100ms updates)
  useEffect(() => {
    if (isVictory) return;

    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const remaining = Math.max(0, timeLimitSeconds - elapsed);
      setTimeLeft(remaining);

      if (remaining <= 0 && !hasEndedRef.current) {
        hasEndedRef.current = true;
        if (timerRef.current) clearInterval(timerRef.current);

        setScore((finalScore) => {
          if (finalScore >= targetScore) {
            triggerWin();
          } else {
            onLose(finalScore, targetScore, timeLimitSeconds);
          }
          return finalScore;
        });
      }
    }, 50);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLimitSeconds, targetScore, onLose, isVictory]);

  const triggerWin = () => {
    setIsVictory(true);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeout(() => {
      onWin();
    }, 1200);
  };

  // Handle dot click
  const handleDotClick = (clickedId: number, x: number, y: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasEndedRef.current || isVictory) return;

    // Add pop visual particle
    particleIdCounter.current += 1;
    const newParticle = { id: particleIdCounter.current, x, y };
    setParticles((prev) => [...prev, newParticle]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 400);

    const nextScore = score + 1;
    setScore(nextScore);

    // Replace the clicked dot with a new random dot
    setDots((prev) => prev.map((d) => (d.id === clickedId ? createDot() : d)));

    // Check if target reached
    if (nextScore >= targetScore && !hasEndedRef.current) {
      hasEndedRef.current = true;
      triggerWin();
    }
  };

  const progressPercent = Math.min(100, (score / targetScore) * 100);
  const timePercent = Math.max(0, (timeLeft / timeLimitSeconds) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-white text-black font-mono select-none overflow-hidden flex flex-col justify-between cursor-crosshair">
      
      {/* Top High-Contrast Telemetry HUD */}
      <header className="p-4 sm:p-6 border-b-2 border-black flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/95 backdrop-blur z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-bold text-lg rounded-none">
            <Zap className="w-5 h-5 fill-white" />
          </div>
          <div>
            <div className="text-sm font-black tracking-wider uppercase">
              OVERSEER INTERCEPTION // CLICK BATTLE
            </div>
            <div className="text-xs text-neutral-600 font-sans">
              Click the black dots as fast as you can to defeat the overseer!
            </div>
          </div>
        </div>

        {/* Telemetry counters */}
        <div className="flex items-center gap-6">
          {/* Target count */}
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-black" />
            <span className="text-xs text-neutral-600 uppercase">Eliminated:</span>
            <span className="text-base font-black px-2 py-0.5 bg-black text-white">
              {score} / {targetScore}
            </span>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-2">
            <Clock className={`w-4 h-4 ${timeLeft <= 2.5 ? 'text-red-600 animate-pulse' : 'text-black'}`} />
            <span className="text-xs text-neutral-600 uppercase">Time Left:</span>
            <span className={`text-base font-black px-2 py-0.5 border-2 border-black ${
              timeLeft <= 2.5 ? 'bg-red-600 text-white animate-pulse' : 'bg-neutral-100 text-black'
            }`}>
              {timeLeft.toFixed(1)}s
            </span>
          </div>
        </div>
      </header>

      {/* Tension Progress Bars */}
      <div className="w-full bg-neutral-200 h-2 flex">
        <div
          className="bg-black h-full transition-all duration-75"
          style={{ width: `${progressPercent}%` }}
          title="Progress towards victory"
        />
      </div>

      {/* Center Blank White Arena */}
      <main className="relative flex-1 w-full h-full">
        {/* Subtle crosshair grid overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />

        {/* Floating instruction reminder */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none text-neutral-400 text-xs tracking-widest uppercase">
          CLICK {targetScore - score} MORE BLACK DOTS TO DEFEAT HIM
        </div>

        {/* Click Burst Particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full border-2 border-black pointer-events-none animate-ping"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: '48px',
              height: '48px',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}

        {/* The Black Dots */}
        {!isVictory &&
          dots.map((dot) => (
            <button
              key={dot.id}
              type="button"
              onMouseDown={(e) => handleDotClick(dot.id, dot.x, dot.y, e)}
              className="absolute bg-black hover:bg-neutral-800 active:scale-75 rounded-full transition-transform duration-75 cursor-pointer shadow-md focus:outline-none flex items-center justify-center group"
              style={{
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                width: `${dot.size}px`,
                height: `${dot.size}px`,
                transform: 'translate(-50%, -50%)',
              }}
              title="Click!"
            >
              <div className="w-2 h-2 bg-white rounded-full opacity-40 group-hover:opacity-80 transition-opacity" />
            </button>
          ))}

        {/* Victory Splash Overlay */}
        {isVictory && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur flex flex-col items-center justify-center z-30 animate-scaleUp">
            <div className="w-16 h-16 bg-black text-white flex items-center justify-center rounded-full mb-4">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black uppercase mb-2">
              OVERSEER BANISHED!
            </h1>
            <p className="text-neutral-700 text-sm font-sans mb-4">
              Your reflex speed overwhelmed the security guy. Resuming passphrase gate...
            </p>
            <div className="px-4 py-1.5 bg-black text-white text-xs font-bold font-mono">
              SCORE: {score} / {targetScore} IN {(timeLimitSeconds - timeLeft).toFixed(1)}s
            </div>
          </div>
        )}
      </main>

      {/* Bottom Status Ticker */}
      <footer className="p-3 border-t-2 border-black bg-neutral-100 flex items-center justify-between text-xs text-neutral-600 font-mono z-20">
        <div>REFLEX PROTOCOL // BLACK DOT ELIMINATION</div>
        <div className="text-black font-bold">
          TIME: {timePercent.toFixed(0)}% REMAINING
        </div>
      </footer>
    </div>
  );
};
