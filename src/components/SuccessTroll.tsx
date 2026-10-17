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
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffffff', '#aaaaaa', '#333333'],
    });

    // 2.5 seconds later, rugpull the user
    const timer = setTimeout(() => {
      setStage('fail');
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  const handleShare = () => {
    const text = "I just solved the 50-digit impossible security gauntlet to get free Claude 5.5 Fable, only to get brutally trolled. Don't fall for this trap!";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center font-mono selection:bg-white selection:text-black">
      <div className="max-w-xl w-full bg-[#111111] border border-white p-8 relative">
        {stage === 'celebrate' ? (
          <div className="text-center py-8 space-y-4 animate-fade-in">
            <CheckCircle2 className="w-16 h-16 text-white mx-auto animate-pulse" />
            <h2 className="text-xl uppercase tracking-[0.2em] font-bold">
              AUTHENTICATION SUCCESS
            </h2>
            <p className="text-neutral-300 text-xs font-sans">
              Cryptographic entropy verified. Reserving 10,000,000 Fable 5.5 tokens...
            </p>
            <div className="w-48 h-1 bg-white/20 mx-auto overflow-hidden">
              <div className="w-full h-full bg-white animate-pulse"></div>
            </div>
          </div>
        ) : (
          <div className="py-4 space-y-6 text-left">
            <div className="flex items-center gap-3 border-b border-[#2C2C2E] pb-4">
              <Skull className="w-8 h-8 text-white shrink-0" />
              <div>
                <h1 className="text-sm uppercase tracking-[0.2em] font-bold text-white">
                  ALLOCATION FAILURE // HTTP 429-RAGE
                </h1>
                <p className="text-[11px] text-[#A0A0A0]">
                  Time Delta: +0.038 seconds behind last available slot
                </p>
              </div>
            </div>

            <div className="bg-[#1A1A1A] border border-[#2C2C2E] p-4 text-xs font-mono space-y-3">
              <p className="text-white font-bold">
                ⚠️ All 200 Claude Fable 5.5 tokens were allocated while you were typing Rule 14.
              </p>
              <p className="text-neutral-400 font-sans leading-relaxed">
                We applaud your staggering perseverance in fulfilling the 50-digit prime-summed, Roman-numeralized, alkali-metal-stabilized, anti-paste criteria. Truly an inspiration to human endurance.
              </p>
              <p className="text-neutral-400 font-sans leading-relaxed">
                However, a trading bot in Zurich submitted 0.04 seconds earlier.
              </p>
            </div>

            <div className="border border-white/20 p-3 bg-black text-xs text-neutral-300">
              <div className="text-[10px] uppercase text-[#A0A0A0] tracking-wider mb-1 font-bold">
                CONSOLATION PRIZE:
              </div>
              <div>
                You have been promoted to the priority waitlist for <strong className="text-white">Claude 6.0 Mythic</strong> (Requires a 100-character passphrase with hexadecimal palindrome balance).
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={onRestart}
                className="flex-1 py-3.5 bg-white text-black hover:bg-neutral-200 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry (Try Beat The Bots)</span>
              </button>

              <button
                onClick={handleShare}
                className="flex-1 py-3.5 bg-[#1A1A1A] border border-[#2C2C2E] hover:border-white text-white text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? "Copied to Clipboard!" : "Warn Other Developers"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
