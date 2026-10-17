import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Check, 
  X, 
  ShieldAlert, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  Clock, 
  Loader2
} from 'lucide-react';
import { 
  RULES, 
  getRuleContext, 
  RuleContext, 
  PASTE_INSULTS, 
  GASLIGHT_MESSAGES 
} from '../rules/passwordRules';
import { ToastAlert } from './ToastAlert';

interface RageProfileModalProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const RageProfileModal: React.FC<RageProfileModalProps> = ({ onBack, onSuccess }) => {
  const [handle, setHandle] = useState('dev_patil_99');
  const [organization, setOrganization] = useState('Antigravity Deep Research');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  
  // Anti-paste & rage states
  const [isShaking, setIsShaking] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyStep, setVerifyStep] = useState(0);

  // Progressive rule tracking
  const [unlockedCount, setUnlockedCount] = useState(1);
  const [ruleContext, setRuleContext] = useState<RuleContext>(getRuleContext());

  const inputRef = useRef<HTMLInputElement>(null);

  // Keep UTC minute and context updated every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setRuleContext(getRuleContext());
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Evaluate all rules up to unlockedCount
  const ruleStatuses = RULES.map((rule) => {
    const passed = rule.validator(password, ruleContext);
    return { ...rule, passed };
  });

  // Calculate highest unlocked rule
  useEffect(() => {
    let nextCount = 1;
    for (let i = 0; i < RULES.length; i++) {
      if (RULES[i].validator(password, ruleContext)) {
        nextCount = Math.max(nextCount, i + 2);
      } else {
        // Can't unlock beyond the first failed rule + 1
        nextCount = Math.max(nextCount, i + 1);
        break;
      }
    }
    setUnlockedCount(Math.min(nextCount, RULES.length));
  }, [password, ruleContext]);

  // Handle paste interception
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    triggerRageShake();
    const randomInsult = PASTE_INSULTS[Math.floor(Math.random() * PASTE_INSULTS.length)];
    setToastMessage(randomInsult);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    triggerRageShake();
    setToastMessage("Text dragging is classified as illegal injection. Aborted.");
  };

  const triggerRageShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 450);
  };

  // Gaslight Entropy & Progress Calculations
  const visibleRules = ruleStatuses.slice(0, unlockedCount);
  const passedCount = visibleRules.filter((r) => r.passed).length;
  const allPassed = passedCount === RULES.length;

  const entropyPercentage = Math.round(
    (passedCount / RULES.length) * 80 + Math.min(password.length / 50, 1) * 20
  );

  const gaslightFeedback =
    GASLIGHT_MESSAGES.find(
      (m) => entropyPercentage >= m.min && entropyPercentage <= m.max
    )?.text || "Evaluating credentials...";

  // Submit flow with pseudo quantum verification steps
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allPassed) {
      triggerRageShake();
      setToastMessage("Cannot provision key. Security credentials failed one or more rules.");
      return;
    }

    setIsVerifying(true);
    const steps = [
      "Calculating RSA-8192 salt from passphrase entropy...",
      "Negotiating TLS 1.4 handshake with Anthropic Fable cluster...",
      "Synthesizing 10,000,000 token dedicated KV-cache...",
      "Validating temporal UTC minute sync...",
    ];

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < steps.length) {
        setVerifyStep(current);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsVerifying(false);
          onSuccess();
        }, 1000);
      }
    }, 900);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8 flex flex-col justify-between font-sans selection:bg-white selection:text-black">
      <ToastAlert message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Top Header */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between border-b border-[#2C2C2E] pb-4 mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A0A0A0] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Abort Session</span>
        </button>

        <div className="flex items-center gap-3 font-mono text-xs text-[#A0A0A0]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            ACTIVE SESSION
          </span>
          <span className="text-[#5C5E62]">|</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            UTC {ruleContext.currentUtcMinute}m
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto w-full my-auto">
        {/* Terminal Title Card */}
        <div className="bg-[#111111] border border-[#2C2C2E] p-6 sm:p-8 mb-8">
          <div className="flex items-center justify-between border-b border-[#2C2C2E] pb-4 mb-6">
            <div className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-white" />
              <div>
                <h1 className="text-sm font-mono uppercase tracking-[0.2em] font-bold text-white">
                  Profile Setup // Fable 5.5 Credential Vault
                </h1>
                <p className="text-xs text-[#A0A0A0] font-mono mt-0.5">
                  Quantum key derivation requires uncompromising passphrase entropy.
                </p>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-1 bg-white text-black font-bold">
                TIER 0 - ROOT
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Developer Handle & Org */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-[#A0A0A0] mb-2">
                  Developer Identity
                </label>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#2C2C2E] focus:border-white px-4 py-3 text-sm font-mono text-white outline-none transition-colors"
                  placeholder="e.g. quantum_engineer"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-[#A0A0A0] mb-2">
                  Affiliated Organization
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#2C2C2E] focus:border-white px-4 py-3 text-sm font-mono text-white outline-none transition-colors"
                  placeholder="e.g. Autonomous AI Labs"
                  required
                />
              </div>
            </div>

            {/* Passphrase Input Area */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-mono uppercase tracking-widest text-[#FFFFFF] font-bold">
                  Master Security Passphrase (50+ Chars Required)
                </label>
                <div className="flex items-center gap-3 font-mono text-xs">
                  <span className={`${password.length >= 50 ? 'text-white' : 'text-[#A0A0A0]'}`}>
                    CHARS: <strong className="text-white">{password.length}</strong> / 50
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[#A0A0A0] hover:text-white transition-colors"
                    title={showPassword ? "Hide" : "Show"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className={`relative ${isShaking ? 'animate-shake' : ''}`}>
                <input
                  ref={inputRef}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onPaste={handlePaste}
                  onDrop={handleDrop}
                  placeholder="Type passphrase manually (Paste is disabled by security protocol)..."
                  className={`w-full bg-[#1A1A1A] border ${
                    isShaking ? 'border-white bg-[#222222]' : 'border-[#2C2C2E]'
                  } focus:border-white px-4 py-4 text-sm font-mono text-white outline-none transition-all placeholder:text-[#5C5E62]`}
                  autoComplete="off"
                  spellCheck={false}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase bg-[#2C2C2E] text-[#A0A0A0] px-2 py-1">
                    NO PASTE
                  </span>
                </div>
              </div>

              {/* Entropy Bar & Gaslighting Text */}
              <div className="mt-4 pt-4 border-t border-[#2C2C2E]">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-[#A0A0A0] uppercase tracking-wider">Passphrase Entropy</span>
                  <span className="text-white font-bold">{entropyPercentage}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#1A1A1A] border border-[#2C2C2E] overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-300 ease-out"
                    style={{ width: `${entropyPercentage}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-xs font-mono text-[#A0A0A0] italic">
                  &gt; {gaslightFeedback}
                </div>
              </div>
            </div>

            {/* Cascading Rules Display */}
            <div className="space-y-3 pt-4 border-t border-[#2C2C2E]">
              <div className="flex items-center justify-between text-xs font-mono text-[#A0A0A0] uppercase tracking-wider">
                <span>Verification Directives</span>
                <span>
                  Passed: {passedCount} / {RULES.length}
                </span>
              </div>

              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {visibleRules.map((rule, idx) => {
                  const isCurrent = idx === unlockedCount - 1 && !rule.passed;
                  return (
                    <div
                      key={rule.id}
                      className={`p-3.5 border transition-all text-xs font-mono ${
                        rule.passed
                          ? 'bg-[#111111] border-white/20 text-[#A0A0A0]'
                          : isCurrent
                          ? 'bg-[#1A1A1A] border-white text-white shadow-sm'
                          : 'bg-[#111111] border-[#2C2C2E] text-[#5C5E62]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2.5">
                          <span className="font-bold text-white shrink-0">
                            RULE {rule.id}:
                          </span>
                          <div>
                            <div className="font-semibold text-white">{rule.label}</div>
                            <p className="mt-0.5 leading-relaxed text-neutral-400">
                              {rule.description}
                            </p>
                            {rule.hint && (
                              <p className="mt-1 text-[11px] text-[#A0A0A0] font-sans">
                                ↳ {rule.hint(password, ruleContext)}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="shrink-0 mt-0.5">
                          {rule.passed ? (
                            <span className="inline-flex items-center justify-center w-5 h-5 bg-white text-black font-bold">
                              <Check className="w-3.5 h-3.5" />
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-5 h-5 border border-[#5C5E62] text-[#5C5E62]">
                              <X className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Submission Action */}
            <div className="pt-4 border-t border-[#2C2C2E]">
              <button
                type="submit"
                disabled={isVerifying}
                className={`w-full py-4 text-xs font-mono uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-3 border ${
                  allPassed
                    ? 'bg-white text-black border-white hover:bg-neutral-200 cursor-pointer shadow-lg'
                    : 'bg-[#1A1A1A] text-[#5C5E62] border-[#2C2C2E] cursor-not-allowed hover:border-white/30'
                }`}
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : allPassed ? (
                  <>
                    <ShieldAlert className="w-4 h-4 text-black" />
                    <span>Commit Profile & Generate Claude Fable 5.5 Key</span>
                  </>
                ) : (
                  <span>
                    Fulfill All 14 Quantum Directives to Commit ({passedCount}/{RULES.length})
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Verification Modal / Overlay during submit */}
        {isVerifying && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#111111] border border-white max-w-md w-full p-8 font-mono text-xs text-white text-center">
              <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <div className="uppercase tracking-[0.2em] font-bold text-sm mb-2">
                QUANTUM DERIVATION IN PROGRESS
              </div>
              <p className="text-neutral-400 mb-6">
                Please do not disconnect. Transmitting cryptographic handshake to Anthropic clusters...
              </p>
              <div className="p-3 bg-[#1A1A1A] border border-[#2C2C2E] text-left text-neutral-300">
                &gt; {["Calculating RSA salt...", "Negotiating TLS handshake...", "Allocating KV-cache...", "Syncing UTC minutes..."][verifyStep]}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto w-full border-t border-[#2C2C2E] pt-4 mt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#5C5E62] gap-2">
        <div>SECURITY ENFORCEMENT ENGINE // ELECTRIC VOLT MONOCHROME</div>
        <div>NO CLIPBOARD INJECTION ALLOWED</div>
      </footer>
    </div>
  );
};
