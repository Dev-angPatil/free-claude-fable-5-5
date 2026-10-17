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
  Loader2,
  Lock,
  Sparkles
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
  const rulesContainerRef = useRef<HTMLDivElement>(null);

  // Keep UTC minute and context updated every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setRuleContext(getRuleContext());
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Evaluate all rules
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
        nextCount = Math.max(nextCount, i + 1);
        break;
      }
    }
    const finalCount = Math.min(nextCount, RULES.length);
    if (finalCount > unlockedCount) {
      setTimeout(() => {
        if (rulesContainerRef.current) {
          rulesContainerRef.current.scrollTop = rulesContainerRef.current.scrollHeight;
        }
      }, 100);
    }
    setUnlockedCount(finalCount);
  }, [password, ruleContext, unlockedCount]);

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

  // Submit flow
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allPassed) {
      triggerRageShake();
      setToastMessage("Cannot provision key. Security credentials failed one or more directives.");
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
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8 flex flex-col justify-between font-sans selection:bg-white selection:text-black">
      <ToastAlert message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Top Header */}
      <header className="max-w-7xl mx-auto w-full flex items-center justify-between border-b-[3px] border-white pb-4 mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3]" />
          <span className="font-bold">ABORT SESSION</span>
        </button>

        <div className="flex items-center gap-4 font-mono text-xs text-neutral-300">
          <span className="flex items-center gap-2 bg-black px-3 py-1 border-[2px] border-white font-bold text-white">
            <span className="w-2 h-2 bg-white animate-pulse"></span>
            ACTIVE SESSION
          </span>
          <span className="flex items-center gap-1.5 bg-[#181818] px-3 py-1 border-[2px] border-white font-bold text-white">
            <Clock className="w-4 h-4 text-white stroke-[2.5]" />
            UTC MINUTE: <strong className="text-white underline decoration-2">{ruleContext.currentUtcMinute}</strong>
          </span>
        </div>
      </header>

      {/* Main 2-Column Responsive Layout */}
      <main className="max-w-7xl mx-auto w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Middle Column: Registration Profile & Password (7 Cols on desktop) */}
          <div className="lg:col-span-7 bg-[#111111] border-[4px] border-white p-6 sm:p-8">
            {/* Header info */}
            <div className="flex items-center justify-between border-b-[3px] border-white pb-5 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white text-black">
                  <Terminal className="w-6 h-6 stroke-[3]" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-headline uppercase tracking-wider text-white">
                    Fable 5.5 Onboarding Vault
                  </h1>
                  <p className="text-xs text-neutral-300 font-mono mt-0.5">
                    Register developer credentials & cryptographic passphrase.
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-block text-xs font-headline tracking-widest uppercase px-3 py-1 bg-white text-black">
                ROOT TIER
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Identity Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-neutral-200 mb-2 font-bold">
                    Developer Handle
                  </label>
                  <input
                    type="text"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    className="w-full bg-[#181818] border-[3px] border-neutral-700 focus:border-white px-4 py-3 text-sm font-mono text-white outline-none transition-colors rounded-none"
                    placeholder="e.g. quantum_engineer"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-neutral-200 mb-2 font-bold">
                    Research Organization
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full bg-[#181818] border-[3px] border-neutral-700 focus:border-white px-4 py-3 text-sm font-mono text-white outline-none transition-colors rounded-none"
                    placeholder="e.g. Autonomous AI Labs"
                    required
                  />
                </div>
              </div>

              {/* Password Registration Area */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-mono uppercase tracking-widest text-white font-bold flex items-center gap-2">
                    <span>Master Security Passphrase</span>
                    <span className="text-[11px] text-neutral-400 font-normal">
                      (50+ Chars Required)
                    </span>
                  </label>
                  
                  <div className="flex items-center gap-4 font-mono text-xs">
                    <span className={`px-2.5 py-1 border-[2px] font-bold ${
                      password.length >= 50 
                        ? 'border-white bg-white text-black' 
                        : 'border-neutral-600 text-neutral-200 bg-[#181818]'
                    }`}>
                      CHARS: <strong>{password.length}</strong> / 50
                    </span>

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-neutral-300 hover:text-white transition-colors flex items-center gap-1 font-bold"
                      title={showPassword ? "Hide" : "Show"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4 stroke-[2.5]" /> : <Eye className="w-4 h-4 stroke-[2.5]" />}
                      <span className="text-[11px] uppercase font-mono">{showPassword ? "Hide" : "Show"}</span>
                    </button>
                  </div>
                </div>

                {/* Password Input Box */}
                <div className={`relative ${isShaking ? 'animate-shake' : ''}`}>
                  <input
                    ref={inputRef}
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onPaste={handlePaste}
                    onDrop={handleDrop}
                    placeholder="Type password manually (Paste disabled by security)..."
                    className={`w-full bg-[#181818] border-[3px] ${
                      isShaking ? 'border-white bg-[#282828]' : 'border-neutral-500'
                    } focus:border-white px-4 py-4 text-base font-mono text-white outline-none transition-all placeholder:text-neutral-600 rounded-none`}
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <span className="text-[11px] font-mono uppercase bg-white text-black px-2 py-0.5 font-bold">
                      NO PASTE
                    </span>
                  </div>
                </div>

                {/* Live Entropy Bar & Gaslighting Feedback */}
                <div className="mt-5 p-4 bg-[#181818] border-[3px] border-neutral-700">
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-neutral-200 uppercase tracking-widest font-bold">
                      Passphrase Cryptographic Entropy
                    </span>
                    <span className="text-white font-bold text-sm bg-black px-2 py-0.5 border border-white">
                      {entropyPercentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-black border-[2px] border-white overflow-hidden">
                    <div
                      className="h-full bg-white transition-all duration-300 ease-out"
                      style={{ width: `${entropyPercentage}%` }}
                    ></div>
                  </div>
                  <div className="mt-3 text-xs font-mono text-neutral-100 bg-black p-3 border-[2px] border-white/50">
                    &gt; <strong className="text-white">{gaslightFeedback}</strong>
                  </div>
                </div>
              </div>

              {/* Submit CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isVerifying}
                  className={`w-full py-5 text-xs font-headline uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 border-[3px] rounded-none ${
                    allPassed
                      ? 'bg-white text-black border-white hover:bg-black hover:text-white hover:border-[4px] cursor-pointer'
                      : 'bg-[#181818] text-neutral-500 border-neutral-700 cursor-not-allowed hover:border-neutral-500'
                  }`}
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-white" />
                      <span>Verifying Cryptographic Handshake...</span>
                    </>
                  ) : allPassed ? (
                    <>
                      <ShieldAlert className="w-5 h-5 text-black stroke-[3]" />
                      <span>Commit Profile & Generate Claude Fable 5.5 Key</span>
                    </>
                  ) : (
                    <span>
                      Fulfill All {RULES.length} Directives to Commit ({passedCount}/{RULES.length} Ready)
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Progressive Rules Panel (5 Cols on desktop) */}
          <div className="lg:col-span-5 bg-[#111111] border-[4px] border-white p-5 sm:p-6 flex flex-col h-full lg:sticky lg:top-8">
            {/* Header */}
            <div className="flex items-center justify-between border-b-[3px] border-white pb-4 mb-4">
              <div>
                <h2 className="text-sm font-headline uppercase tracking-wider text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-white stroke-[2.5]" />
                  <span>Security Directives</span>
                </h2>
                <p className="text-xs text-neutral-300 font-mono mt-0.5">
                  Directives unlock sequentially as preceding rules pass.
                </p>
              </div>

              <div className="text-right">
                <div className="text-xs font-mono font-bold text-black px-2.5 py-1 bg-white border-[2px] border-white">
                  {passedCount} / {RULES.length}
                </div>
              </div>
            </div>

            {/* Rules List Container with custom scroll */}
            <div
              ref={rulesContainerRef}
              className="space-y-3.5 max-h-[580px] overflow-y-auto pr-1"
            >
              {visibleRules.map((rule, idx) => {
                const isCurrentActive = idx === unlockedCount - 1 && !rule.passed;

                return (
                  <div
                    key={rule.id}
                    className={`p-4 border-[3px] transition-all font-mono text-xs ${
                      rule.passed
                        ? 'bg-[#141414] border-neutral-700 text-neutral-400'
                        : isCurrentActive
                        ? 'bg-black border-white text-white ring-2 ring-white/50'
                        : 'bg-[#181818] border-neutral-600 text-neutral-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase ${
                            rule.passed
                              ? 'bg-[#222222] text-neutral-400'
                              : isCurrentActive
                              ? 'bg-white text-black'
                              : 'bg-neutral-800 text-white'
                          }`}>
                            RULE {rule.id}
                          </span>

                          {isCurrentActive && (
                            <span className="text-[10px] tracking-wider text-white font-bold bg-neutral-900 border border-white px-1.5 py-0.5 animate-pulse">
                              [CURRENT OBJECTIVE]
                            </span>
                          )}
                        </div>

                        <div className="font-bold text-sm text-white leading-snug">
                          {rule.label}
                        </div>

                        <p className={`mt-2 leading-relaxed font-sans text-xs ${
                          rule.passed ? 'text-neutral-400' : 'text-neutral-200'
                        }`}>
                          {rule.description}
                        </p>

                        {rule.hint && (
                          <div className={`mt-2.5 p-2.5 border-[2px] font-mono text-[11px] ${
                            isCurrentActive 
                              ? 'bg-[#181818] border-white text-neutral-100' 
                              : 'bg-black border-neutral-700 text-neutral-400'
                          }`}>
                            ↳ {rule.hint(password, ruleContext)}
                          </div>
                        )}
                      </div>

                      {/* Status Icon */}
                      <div className="shrink-0 mt-0.5">
                        {rule.passed ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 bg-white text-black font-bold">
                            <Check className="w-5 h-5 stroke-[3.5]" />
                          </span>
                        ) : (
                          <span className={`inline-flex items-center justify-center w-7 h-7 border-[2px] ${
                            isCurrentActive 
                              ? 'border-white text-white' 
                              : 'border-neutral-600 text-neutral-600'
                          }`}>
                            <X className="w-5 h-5 stroke-[3]" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Teaser for remaining locked rules */}
              {unlockedCount < RULES.length && (
                <div className="p-4 border-[2px] border-dashed border-neutral-700 bg-black/60 text-neutral-400 font-mono text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-neutral-500 stroke-[2.5]" />
                    <span>
                      Directive {unlockedCount + 1} locked pending Rule {unlockedCount}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold">
                    +{RULES.length - unlockedCount} more
                  </span>
                </div>
              )}
            </div>

            {/* Directive Footer Summary */}
            <div className="mt-4 pt-3 border-t-[2px] border-white flex items-center justify-between text-xs font-mono text-neutral-300">
              <span>ACTIVE DIRECTIVES: <strong>{unlockedCount} / {RULES.length}</strong></span>
              <span>COMPLIANCE: <strong>{Math.round((passedCount / RULES.length) * 100)}%</strong></span>
            </div>
          </div>

        </div>

        {/* Verification Modal / Overlay during submit */}
        {isVerifying && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#111111] border-[4px] border-white max-w-md w-full p-8 font-mono text-xs text-white text-center">
              <div className="w-12 h-12 border-[3px] border-white border-t-transparent animate-spin mx-auto mb-6"></div>
              <div className="uppercase tracking-[0.2em] font-headline text-base mb-2">
                QUANTUM DERIVATION IN PROGRESS
              </div>
              <p className="text-neutral-300 mb-6 font-sans">
                Please do not disconnect. Transmitting cryptographic handshake to Anthropic clusters...
              </p>
              <div className="p-3 bg-black border-[2px] border-white text-left text-neutral-200">
                &gt; {["Calculating RSA salt...", "Negotiating TLS handshake...", "Allocating KV-cache...", "Syncing UTC minutes..."][verifyStep]}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto w-full border-t-[3px] border-white pt-4 mt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-300 gap-2">
        <div className="font-bold">SECURITY ENFORCEMENT ENGINE // RAWBLOCK NEO-BRUTALIST</div>
        <div className="bg-white text-black px-2 py-0.5 font-bold">CLIPBOARD INJECTION PROHIBITED</div>
      </footer>
    </div>
  );
};
