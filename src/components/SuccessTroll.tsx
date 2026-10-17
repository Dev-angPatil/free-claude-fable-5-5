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
      colors: ['#ffffff', '#aaaaaa', '#333333'],
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
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center font-mono selection:bg-white selection:text-black">
      <div className="max-w-xl w-full bg-[#111111] border-[4px] border-white p-8 relative">
        {stage === 'celebrate' ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-white mx-auto stroke-[2.5]" />
            <h2 className="text-xl uppercase tracking-widest font-headline">
              AUTHENTICATION SUCCESS
            </h2>
            <p className="text-neutral-300 text-xs font-mono">
              Cryptographic entropy verified. Reserving 10,000,000 Fable 5.5 tokens...
            </p>
            <div className="w-48 h-2 bg-black border-[2px] border-white mx-auto overflow-hidden">
              <div className="w-full h-full bg-white animate-pulse"></div>
            </div>
          </div>
        ) : (
          <div className="py-4 space-y-6 text-left">
            <div className="flex items-center gap-3 border-b-[3px] border-white pb-4">
              <Skull className="w-10 h-10 text-white shrink-0 stroke-[2.5]" />
              <div>
                <h1 className="text-base uppercase tracking-wider font-headline text-white">
                  ALLOCATION FAILURE // HTTP 429-RAGE
                </h1>
                <p className="text-xs text-neutral-400 font-mono">
                  Time Delta: +0.038 seconds behind last available slot
                </p>
              </div>
            </div>

            <div className="bg-[#181818] border-[3px] border-neutral-700 p-5 text-xs font-mono space-y-3">
              <p className="text-white font-bold text-sm">
                ⚠️ All 200 Claude Fable 5.5 slots were claimed while you were solving Rule 14.
              </p>
              <p className="text-neutral-300 font-sans leading-relaxed text-sm">
                We applaud your staggering perseverance in fulfilling the 50-digit prime-summed, Roman-numeralized, alkali-metal-stabilized, anti-paste criteria. Truly an inspiration to human endurance.
              </p>
              <p className="text-neutral-300 font-sans leading-relaxed text-sm">
                Unfortunately, a high-frequency trading bot in Zurich submitted 0.04 seconds earlier.
              </p>
            </div>

            <div className="border-[2px] border-white p-4 bg-black text-xs text-neutral-200">
              <div className="text-[11px] uppercase text-white tracking-widest mb-1.5 font-headline">
                CONSOLATION PRIZE:
              </div>
              <div className="font-sans leading-relaxed">
                You have been enrolled in the priority waitlist for <strong className="text-white font-mono">Claude 6.0 Mythic</strong> (Requires a 100-character passphrase with hexadecimal palindrome balance).
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={onRestart}
                className="flex-1 py-4 bg-white text-black hover:bg-black hover:text-white hover:border-[3px] hover:border-white font-headline text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all border-[3px] border-white"
              >
                <RotateCcw className="w-4 h-4 stroke-[3]" />
                <span>Retry Session</span>
              </button>

              <button
                onClick={handleShare}
                className="flex-1 py-4 bg-[#181818] border-[3px] border-neutral-600 hover:border-white text-white text-xs font-headline uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
              >
                <Share2 className="w-4 h-4 stroke-[3]" />
                <span>{copied ? "Copied to Clipboard!" : "Warn Other Devs"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
