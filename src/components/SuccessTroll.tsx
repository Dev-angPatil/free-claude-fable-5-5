import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Share2, Skull, CheckCircle2 } from 'lucide-react';

interface SuccessTrollProps {
  onRestart: () => void;
}

export const SuccessTroll: React.FC<SuccessTrollProps> = ({ onRestart }) => {
  const [stage, setStage] = useState<'celebrate' | 'fail'>('celebrate');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Monochrome confetti burst
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ffffff', '#aaaaaa', '#555555'],
    });

    // 2.8 seconds later, rugpull the user
    const timer = setTimeout(() => {
      setStage('fail');
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  const handleShare = () => {
    const text = "I just endured the 50-digit impossible security gauntlet to claim free Claude 5.5 Fable, only to get brutally trolled. Don't fall for this trap!";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center font-sans selection:bg-white selection:text-black">
      <div className="max-w-lg w-full bg-[#0a0a0a] border border-neutral-800 rounded-2xl p-8 relative shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.08)]">
        {stage === 'celebrate' ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto stroke-[2]" />
            <h2 className="text-xl font-bold tracking-tight text-white">
              AUTHENTICATION SUCCESS
            </h2>
            <p className="text-neutral-400 text-xs font-mono">
              Cryptographic entropy verified. Reserving 10,000,000 Fable 5.5 tokens...
            </p>
            <div className="w-48 h-1.5 bg-neutral-900 border border-neutral-800 rounded-full mx-auto overflow-hidden">
              <div className="w-full h-full bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        ) : (
          <div className="py-2 space-y-5 text-left">
            <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-red-950/30 border border-red-500/30 flex items-center justify-center shrink-0">
                <Skull className="w-5 h-5 text-red-400 stroke-[2]" />
              </div>
              <div>
                <h1 className="text-sm font-semibold tracking-tight text-white uppercase font-mono">
                  ALLOCATION FAILURE // HTTP 429-RAGE
                </h1>
                <p className="text-xs text-neutral-500 font-mono">
                  Time Delta: +0.038 seconds behind last available slot
                </p>
              </div>
            </div>

            <div className="bg-[#121212] border border-neutral-800 rounded-xl p-4 text-xs font-mono space-y-2.5">
              <p className="text-amber-300 font-semibold text-xs flex items-center gap-1.5">
                <span>⚠️ All 200 Claude Fable 5.5 slots were claimed while you were solving Rule 14.</span>
              </p>
              <p className="text-neutral-300 font-sans leading-relaxed text-xs">
                We applaud your staggering perseverance in fulfilling the 50-digit prime-summed, Roman-numeralized, alkali-metal-stabilized, anti-paste criteria. Truly an inspiration to human endurance.
              </p>
              <p className="text-neutral-400 font-sans leading-relaxed text-xs">
                Unfortunately, a high-frequency trading bot in Zurich submitted 0.04 seconds earlier.
              </p>
            </div>

            <div className="border border-neutral-800 rounded-xl p-3.5 bg-neutral-950 text-xs text-neutral-300">
              <div className="text-[11px] uppercase text-neutral-400 tracking-wider mb-1 font-mono font-semibold">
                CONSOLATION PRIZE:
              </div>
              <div className="font-sans text-xs leading-relaxed text-neutral-400">
                You have been enrolled in the priority waitlist for <strong className="text-white font-mono">Claude 6.0 Mythic</strong> (Requires a 100-character passphrase with hexadecimal palindrome balance).
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onRestart}
                className="flex-1 py-3 bg-white text-black hover:bg-neutral-200 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Session</span>
              </button>

              <button
                onClick={handleShare}
                className="flex-1 py-3 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white text-xs font-medium rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? "Copied to Clipboard!" : "Warn Other Devs"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
