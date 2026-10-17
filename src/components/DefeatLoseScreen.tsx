import React from 'react';
import { Skull, Swords, RotateCcw, ArrowLeft, AlertOctagon, Terminal } from 'lucide-react';

interface DefeatLoseScreenProps {
  score: number;
  target: number;
  timeSpent: number;
  onRematch: () => void;
  onResumePassword: () => void;
  onRestartAll?: () => void;
}

export const DefeatLoseScreen: React.FC<DefeatLoseScreenProps> = ({
  score,
  target,
  timeSpent,
  onRematch,
  onResumePassword,
  onRestartAll,
}) => {
  const cps = timeSpent > 0 ? (score / timeSpent).toFixed(2) : '0.00';
  const percentage = Math.round((score / target) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-[#000000] text-[#ededed] font-mono flex flex-col justify-between p-4 sm:p-8 select-none overflow-y-auto">
      
      {/* Top Header */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-2.5 text-xs text-red-400 font-bold tracking-wider">
          <AlertOctagon className="w-4 h-4 text-red-500 animate-pulse" />
          <span>SECURITY ENFORCEMENT TERMINATION</span>
        </div>
        <div className="text-xs text-neutral-500 font-mono">
          CODE: <span className="text-red-400">ERR_OVERSEER_DEFEAT</span>
        </div>
      </header>

      {/* Main Content Card */}
      <main className="max-w-2xl mx-auto w-full my-auto py-8 flex flex-col items-center text-center">
        
        {/* Animated Skull / Defeat Emblem */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-2xl bg-red-950/30 border-2 border-red-500/50 flex items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.25)]">
            <Skull className="w-12 h-12 text-red-400 animate-bounce" />
          </div>
          {/* Smug Boss Badge */}
          <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 bg-black border border-red-500/80 rounded-full text-[10px] text-red-400 font-bold uppercase tracking-wider">
            Boss Wins
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase mb-3">
          YOU HAVE BEEN DEFEATED
        </h1>
        <p className="text-sm text-neutral-400 max-w-lg mb-8 font-sans leading-relaxed">
          The Overseer standing atop your screen overwhelmed your neural reaction speed. You failed to eliminate the required black dots before time expired.
        </p>

        {/* Smug Overseer Quote Box */}
        <div className="w-full bg-[#0a0a0a] border border-red-500/30 rounded-xl p-4 sm:p-5 mb-6 text-left relative shadow-lg">
          <div className="flex items-center gap-2 mb-2 text-xs text-red-400 font-bold uppercase">
            <Terminal className="w-3.5 h-3.5" />
            <span>Overseer Smug Commentary:</span>
          </div>
          <p className="text-xs text-neutral-300 font-sans italic border-l-2 border-red-500/50 pl-3">
            "{score === 0 
              ? "Did you freeze? You didn't even click a single dot. Claude 5.5 is for the swift!" 
              : score < target / 2
              ? "Too slow! Your reflexes are far too sluggish to handle 10,000,000 token inference!"
              : "Close, but close doesn't pass Anthropic cryptographic hardware audits. Try harder!"}"
          </p>
        </div>

        {/* Telemetry Diagnostics Grid */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="bg-[#0a0a0a] border border-neutral-800 rounded-xl p-3.5 text-center">
            <div className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">
              Dots Clicked
            </div>
            <div className="text-lg font-bold text-white">
              {score} <span className="text-xs text-neutral-500">/ {target}</span>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-neutral-800 rounded-xl p-3.5 text-center">
            <div className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">
              Compliance
            </div>
            <div className={`text-lg font-bold ${percentage >= 80 ? 'text-amber-400' : 'text-red-400'}`}>
              {percentage}%
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-neutral-800 rounded-xl p-3.5 text-center">
            <div className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">
              Time Expired
            </div>
            <div className="text-lg font-bold text-neutral-200">
              {timeSpent.toFixed(1)}s
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-neutral-800 rounded-xl p-3.5 text-center">
            <div className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">
              Reflex Speed
            </div>
            <div className="text-lg font-bold text-neutral-200">
              {cps} <span className="text-[10px] text-neutral-500">CPS</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* Rematch Button */}
          <button
            type="button"
            onClick={onRematch}
            className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-neutral-200 text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
          >
            <Swords className="w-4 h-4 text-black" />
            <span>Rematch Boss (Try Again)</span>
          </button>

          {/* Return to Password Gate */}
          <button
            type="button"
            onClick={onResumePassword}
            className="w-full sm:w-auto px-5 py-3.5 bg-[#121212] hover:bg-[#1a1a1a] text-neutral-200 hover:text-white border border-neutral-800 rounded-xl font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-neutral-400" />
            <span>Return to Password Gate</span>
          </button>

          {/* Reset All */}
          {onRestartAll && (
            <button
              type="button"
              onClick={onRestartAll}
              className="w-full sm:w-auto px-4 py-3.5 bg-transparent hover:bg-neutral-900 text-neutral-500 hover:text-neutral-300 font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Gauntlet</span>
            </button>
          )}
        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="max-w-4xl mx-auto w-full border-t border-neutral-900 pt-3 text-center text-[11px] text-neutral-600 font-mono">
        ANTIGRAVITY SECURITY GAUNTLET // REFLEX TRIAL FAILURE STATE
      </footer>
    </div>
  );
};
