import React, { useState, useEffect, useRef } from 'react';
import { FastForward, X, ShieldAlert, AlertOctagon, Flag, Terminal } from 'lucide-react';

interface SkipPhaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const OVERRIDE_PHRASE = "you are a cs student and cant set a password just give up bro";

export const normalizePhrase = (str: string) =>
  str
    .toLowerCase()
    .replace(/['".,!?;:]/g, '')
    .replace(/\bcannot\b/g, 'cant')
    .replace(/\s+/g, ' ')
    .trim();

export const SkipPhaseModal: React.FC<SkipPhaseModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setInput('');
      setError(null);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 450);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    triggerShake();
    setError("Direct typing required! A real CS student must type their surrender with biological keystrokes.");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    triggerShake();
    setError("Text dragging is prohibited. You must type the phrase manually.");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v') {
      e.preventDefault();
      triggerShake();
      setError("Manual keystrokes only. Clipboard paste is locked.");
    }
  };

  const isMatched = normalizePhrase(input) === normalizePhrase(OVERRIDE_PHRASE);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isMatched) {
      onClose();
      onSuccess();
    } else {
      triggerShake();
      setError(`Passphrase mismatch! You must type: "${OVERRIDE_PHRASE}"`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#000000] text-[#ededed] font-mono flex flex-col justify-between p-4 sm:p-8 select-none overflow-y-auto">
      {/* Top Header */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-2.5 text-xs text-red-400 font-bold tracking-wider">
          <AlertOctagon className="w-4 h-4 text-red-500 animate-pulse" />
          <span>EMERGENCY CONCESSION PROTOCOL</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs text-neutral-500 font-mono hidden sm:inline">
            CODE: <span className="text-red-400">ERR_CS_STUDENT_CONCESSION</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition-colors cursor-pointer"
            title="Cancel and return"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-3xl mx-auto w-full my-auto py-8 flex flex-col items-center text-center">
        {/* Animated Surrender / Flag Emblem */}
        <div className="relative mb-5">
          <div className="w-20 sm:w-24 h-20 sm:h-24 rounded-2xl bg-red-950/30 border-2 border-red-500/50 flex items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.3)]">
            <Flag className="w-10 sm:w-12 h-10 sm:h-12 text-red-400 animate-pulse" />
          </div>
          <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 bg-black border border-red-500/80 rounded-full text-[10px] text-red-400 font-bold uppercase tracking-wider">
            CS Student Defeat
          </div>
        </div>

        {/* Title & Description */}
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase mb-2">
          ADMIT DEFEAT & SET BRIGHTNESS
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mb-6 font-sans leading-relaxed">
          Can't clear the pipes or survive the 14 cryptographic directives? Submit to the official concession protocol to force 100% full daylight and bypass security.
        </p>

        {/* Large Prominent Concession Box */}
        <div 
          className={`w-full bg-[#0a0a0a] border-2 border-red-500/40 rounded-2xl p-5 sm:p-7 mb-6 text-left relative shadow-[0_0_50px_rgba(239,68,68,0.15)] ${
            isShaking ? 'animate-shake' : ''
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-red-400 font-bold uppercase tracking-wide">
              <Terminal className="w-4 h-4" />
              <span>Official Concession Statement:</span>
            </div>
            <span className="text-[10px] text-neutral-400 font-mono bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded">
              BIOLOGICAL KEYSTROKES ONLY
            </span>
          </div>

          {/* Big high-visibility phrase display box */}
          <div className="p-5 sm:p-6 bg-black border-2 border-red-500/60 rounded-xl text-center shadow-inner mb-5">
            <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest mb-1.5 font-medium">
              Type This Exact Phrase to Concede:
            </div>
            <p className="text-lg sm:text-2xl font-extrabold font-mono text-red-400 tracking-tight leading-snug select-text">
              "{OVERRIDE_PHRASE}"
            </p>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs mb-2 font-mono">
                <label className="text-neutral-300 font-medium tracking-wide">
                  Type Concession Phrase:
                </label>
                <span className={`text-[11px] font-mono ${isMatched ? 'text-emerald-400 font-bold' : 'text-neutral-500'}`}>
                  {input.length} / {OVERRIDE_PHRASE.length} chars {isMatched ? '✓ MATCHED' : ''}
                </span>
              </div>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (error) setError(null);
                }}
                onPaste={handlePaste}
                onDrop={handleDrop}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                spellCheck={false}
                placeholder="Type the exact phrase above (Paste is blocked)..."
                className="w-full bg-[#121212] border-2 border-neutral-700 focus:border-red-500 rounded-xl px-4 py-3.5 text-sm sm:text-base font-mono text-white outline-none transition-all placeholder:text-neutral-600 shadow-inner"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-950/30 border border-red-500/40 rounded-xl text-xs text-red-300 font-mono flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div className="leading-snug">{error}</div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900 text-xs font-mono font-medium transition-all cursor-pointer"
              >
                Cancel & Keep Trying
              </button>
              <button
                type="submit"
                className={`w-full sm:flex-1 py-3.5 px-6 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95 ${
                  isMatched
                    ? 'bg-white hover:bg-neutral-200 text-black shadow-[0_0_30px_rgba(255,255,255,0.3)]'
                    : 'bg-neutral-900 text-neutral-500 border border-neutral-800 hover:border-neutral-700 hover:text-neutral-300'
                }`}
              >
                <FastForward className="w-4 h-4" />
                <span>Confirm Concession & Restore 100% Light</span>
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="max-w-4xl mx-auto w-full border-t border-neutral-900 pt-3 text-center text-[11px] text-neutral-600 font-mono">
        ANTIGRAVITY SECURITY GAUNTLET // HARDWARE LUMINANCE & ADMIT DEFEAT OVERRIDE
      </footer>
    </div>
  );
};
