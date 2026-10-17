import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  Check, 
  X, 
  ShieldAlert, 
  Eye, 
  EyeOff, 
  Clock, 
  Loader2,
  Lock,
  Sun,
  Swords,
  Flag
} from 'lucide-react';
import { 
  RULES, 
  getRuleContext, 
  RuleContext, 
  PASTE_INSULTS, 
  GASLIGHT_MESSAGES 
} from '../rules/passwordRules';
import { ToastAlert } from './ToastAlert';
import { SkipPhaseModal, OVERRIDE_PHRASE, normalizePhrase } from './SkipPhaseModal';
import { useBrightness } from './BrightnessContext';
import { ScreenTopGuy } from './ScreenTopGuy';
import { ClickBattleArena } from './ClickBattleArena';
import { DefeatLoseScreen } from './DefeatLoseScreen';

interface RageProfileModalProps {
  initialHandle?: string;
  initialOrg?: string;
  onSuccess: () => void;
}

export type BossStage = 'idle' | 'guy_standing' | 'battle' | 'defeated' | 'lost';

export const RageProfileModal: React.FC<RageProfileModalProps> = ({ 
  initialHandle = 'dev_patil_99',
  onSuccess 
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  
  // Anti-paste & state management
  const [isShaking, setIsShaking] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyStep, setVerifyStep] = useState(0);
  const [isSkipModalOpen, setIsSkipModalOpen] = useState(false);

  // Top-of-screen Boss Interruption states
  const [bossStage, setBossStage] = useState<BossStage>('idle');
  const [bossStats, setBossStats] = useState({ score: 0, target: 15, timeSpent: 8.0 });
  const hasTriggeredBossRef = useRef(false);

  // Progressive rule tracking
  const [unlockedCount, setUnlockedCount] = useState(1);
  const [ruleContext, setRuleContext] = useState<RuleContext>(getRuleContext());

  const inputRef = useRef<HTMLInputElement>(null);
  const rulesContainerRef = useRef<HTMLDivElement>(null);
  const { brightness, admitDefeat } = useBrightness();

  // Keep UTC minute and context updated every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setRuleContext(getRuleContext());
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Evaluate all rules
  const ruleStatuses = RULES.map((rule) => {
    try {
      const passed = rule.validator(password, ruleContext);
      return { ...rule, passed };
    } catch {
      return { ...rule, passed: false };
    }
  });

  // Progressive unlock cascade
  useEffect(() => {
    let nextUnlocked = 1;
    for (let i = 0; i < ruleStatuses.length; i++) {
      if (ruleStatuses[i].passed) {
        nextUnlocked = Math.min(RULES.length, i + 2);
      } else {
        break;
      }
    }
    setUnlockedCount((prev) => Math.max(prev, nextUnlocked));
  }, [password, ruleContext]);

  // Count passed rules
  const passedRulesCount = ruleStatuses.filter((r) => r.passed).length;

  // Top-of-screen Boss Interruption Auto-Trigger
  // Fires when user has satisfied 6 or 7 rules (passedRulesCount >= 6) while boss is idle
  useEffect(() => {
    if (passedRulesCount >= 6 && !hasTriggeredBossRef.current && bossStage === 'idle') {
      hasTriggeredBossRef.current = true;
      const timeout = setTimeout(() => {
        setBossStage('guy_standing');
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [passedRulesCount, bossStage]);

  // Anti-paste blocker
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    triggerRageShake();
    const insult = PASTE_INSULTS[Math.floor(Math.random() * PASTE_INSULTS.length)];
    setToastMessage(insult);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    triggerRageShake();
    setToastMessage("Text dragging is blocked. Please type manually.");
  };

  const triggerRageShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 450);
  };

  // Direct override check
  const isOverridePassword =
    normalizePhrase(password) === normalizePhrase(OVERRIDE_PHRASE);

  const visibleRules = ruleStatuses.slice(0, unlockedCount);
  const passedCount = visibleRules.filter((r) => r.passed).length;
  const allPassed = (passedCount === RULES.length) || isOverridePassword;

  const entropyPercentage = isOverridePassword
    ? 100
    : Math.round(
        (passedCount / RULES.length) * 80 + Math.min(password.length / 50, 1) * 20
      );

  const gaslightFeedback = isOverridePassword
    ? "EMERGENCY OVERRIDE VERIFIED: All directives bypassed."
    : GASLIGHT_MESSAGES.find(
        (m) => entropyPercentage >= m.min && entropyPercentage <= m.max
      )?.text || "Evaluating credentials...";

  // Submit flow
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allPassed) {
      triggerRageShake();
      setToastMessage("Cannot provision key. Please fulfill all security directives.");
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

  const handleAdmitDefeatConfirmed = () => {
    admitDefeat();
    setPassword(OVERRIDE_PHRASE);
    setIsSkipModalOpen(false);
    setToastMessage("Concession accepted. Brightness restored to 100% & directives overridden.");
  };

  return (
    <div className="min-h-screen bg-black text-[#ededed] p-4 sm:p-8 flex flex-col justify-between font-sans selection:bg-white selection:text-black">
      <ToastAlert message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Sleek Minimalist Navigation Bar */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between pb-6 border-b border-neutral-900">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
          <span className="text-xs font-mono tracking-wider uppercase text-neutral-300 font-semibold">
            Claude 5.5 Fable
          </span>
          <span className="text-xs text-neutral-500 font-mono hidden sm:inline">
            @{initialHandle}
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="flex items-center gap-1.5 text-neutral-400 bg-neutral-900/60 px-2.5 py-1 rounded-md border border-neutral-800">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span>{brightness}% Lux</span>
          </span>

          <span className="hidden sm:flex items-center gap-1.5 text-neutral-400 bg-neutral-900/60 px-2.5 py-1 rounded-md border border-neutral-800">
            <Clock className="w-3.5 h-3.5 text-neutral-500" />
            <span>UTC Min: <strong className="text-neutral-200">{ruleContext.currentUtcMinute}</strong></span>
          </span>

          {/* Top-Right Admit Defeat / Set Brightness Escape */}
          <button
            type="button"
            onClick={() => setIsSkipModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-[11px] text-neutral-300 hover:text-red-400 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-red-500/40 px-2.5 py-1 rounded-md transition-colors cursor-pointer font-mono"
            title="Admit Defeat & Set Brightness"
          >
            <Flag className="w-3.5 h-3.5 text-red-400" />
            <span>{brightness < 100 ? "Admit Defeat (100% Light)" : "Admit Defeat"}</span>
          </button>

          {/* Boss Encounter test trigger / status badge */}
          {bossStage === 'defeated' ? (
            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 rounded-md text-[11px] font-mono">
              <Check className="w-3.5 h-3.5" />
              <span>Boss Banished</span>
            </span>
          ) : (
            <button
              type="button"
              onClick={() => {
                hasTriggeredBossRef.current = true;
                setBossStage('guy_standing');
              }}
              className="inline-flex items-center gap-1 text-[11px] text-amber-300 hover:text-amber-200 bg-neutral-900 hover:bg-neutral-800 border border-amber-500/30 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
              title="Summon Top-of-Screen Boss Interruption"
            >
              <Swords className="w-3.5 h-3.5 text-amber-400" />
              <span>Boss Encounter</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Decluttered 2-Column Work Area */}
      <main className="max-w-6xl mx-auto w-full my-auto py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Password Input & Entropy (7 Cols) */}
          <div className="lg:col-span-7 bg-[#0a0a0a] border border-neutral-800/80 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="mb-6">
              <h1 className="text-xl font-bold tracking-tight text-white">
                Enter Master Passphrase
              </h1>
              <p className="text-xs text-neutral-400 font-mono mt-1">
                Fulfill the live cryptographic directives on the right to claim access.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Password Input Area */}
              <div>
                <div className="flex items-center justify-between mb-2 text-xs font-mono">
                  <span className="text-neutral-400 font-medium">Passphrase</span>
                  
                  <div className="flex items-center gap-3">
                    <span className={`text-[11px] px-2 py-0.5 rounded border ${
                      password.length >= 50 
                        ? 'border-emerald-500/40 text-emerald-400 bg-emerald-950/20' 
                        : 'border-neutral-800 text-neutral-400 bg-neutral-900'
                    }`}>
                      {password.length} / 50 chars
                    </span>

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span className="text-[11px]">{showPassword ? "Hide" : "Show"}</span>
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
                    placeholder="Type password manually (Paste disabled)..."
                    className={`w-full bg-[#121212] border ${
                      isShaking ? 'border-red-500 bg-red-950/10' : 'border-neutral-800 focus:border-neutral-600'
                    } rounded-xl px-4 py-3.5 text-sm font-mono text-white outline-none transition-all placeholder:text-neutral-600 shadow-inner`}
                    autoComplete="off"
                    spellCheck={false}
                    autoFocus
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-neutral-500 uppercase bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-800">
                    No Paste
                  </span>
                </div>
              </div>

              {/* Minimalist Entropy Bar */}
              <div className="p-3.5 bg-[#121212] border border-neutral-800/80 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-400">Entropy Confidence</span>
                  <span className="text-xs font-bold text-neutral-200">{entropyPercentage}%</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ease-out rounded-full ${
                      entropyPercentage >= 100 ? 'bg-emerald-400' : 'bg-neutral-200'
                    }`}
                    style={{ width: `${entropyPercentage}%` }}
                  />
                </div>
                <div className="text-[11px] font-mono text-neutral-400 pt-0.5">
                  &gt; <span className="text-neutral-300">{gaslightFeedback}</span>
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                type="submit"
                disabled={isVerifying}
                className={`w-full py-3.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-sm ${
                  allPassed
                    ? 'bg-white text-black hover:bg-neutral-200 cursor-pointer active:scale-[0.99]'
                    : 'bg-neutral-900 text-neutral-500 border border-neutral-800 cursor-not-allowed'
                }`}
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-neutral-400" />
                    <span>Verifying Handshake...</span>
                  </>
                ) : allPassed ? (
                  <>
                    <ShieldAlert className="w-4 h-4 text-black" />
                    <span>Provision Claude 5.5 Key</span>
                  </>
                ) : (
                  <span>
                    Fulfill {RULES.length} Directives to Commit ({passedCount}/{RULES.length} Ready)
                  </span>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Progressive Directives Checklist (5 Cols) */}
          <div className="lg:col-span-5 bg-[#0a0a0a] border border-neutral-800/80 rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-900">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                Directives ({passedCount}/{RULES.length})
              </span>
              <span className="text-xs font-mono text-neutral-500">
                {Math.round((passedCount / RULES.length) * 100)}%
              </span>
            </div>

            <div
              ref={rulesContainerRef}
              className="space-y-2 max-h-[500px] overflow-y-auto pr-1"
            >
              {visibleRules.map((rule, idx) => {
                const isCurrentActive = idx === unlockedCount - 1 && !rule.passed;

                return (
                  <div
                    key={rule.id}
                    className={`p-3 rounded-xl border transition-all text-xs ${
                      rule.passed
                        ? 'bg-[#0e0e10] border-neutral-900 text-neutral-500'
                        : isCurrentActive
                        ? 'bg-[#141416] border-neutral-700 text-white shadow-sm ring-1 ring-white/10'
                        : 'bg-[#101012] border-neutral-900 text-neutral-400'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2.5">
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-xs leading-snug">
                          {rule.label}
                        </div>
                        <p className={`mt-1 font-sans text-xs leading-relaxed ${
                          rule.passed ? 'text-neutral-500' : 'text-neutral-300'
                        }`}>
                          {rule.description}
                        </p>
                        {rule.hint && isCurrentActive && (
                          <div className="mt-1.5 p-1.5 rounded bg-black/60 border border-neutral-800 font-mono text-[10px] text-neutral-300">
                            ↳ {rule.hint(password, ruleContext)}
                          </div>
                        )}
                      </div>

                      {/* Icon */}
                      <div className="shrink-0 mt-0.5">
                        {rule.passed ? (
                          <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                        ) : (
                          <X className={`w-4 h-4 ${isCurrentActive ? 'text-neutral-400' : 'text-neutral-700'}`} />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {unlockedCount < RULES.length && (
                <div className="p-2.5 rounded-lg border border-dashed border-neutral-900 text-neutral-600 font-mono text-[11px] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-3 h-3 text-neutral-700" />
                    <span>Rule {unlockedCount + 1} locked</span>
                  </div>
                  <span>+{RULES.length - unlockedCount} more</span>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Verification Loader Overlay */}
        {isVerifying && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-[#0a0a0a] border border-neutral-800 rounded-2xl max-w-sm w-full p-6 font-mono text-xs text-white text-center shadow-2xl space-y-4">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
              <div className="font-semibold text-sm text-white">
                DERIVING QUANTUM SALT
              </div>
              <p className="text-neutral-400 text-xs font-sans">
                Transmitting handshake to Anthropic Fable cluster...
              </p>
              <div className="p-2.5 bg-neutral-950 border border-neutral-900 rounded-lg text-left text-neutral-400 text-[11px]">
                &gt; {["Calculating RSA salt...", "Negotiating TLS handshake...", "Allocating KV-cache...", "Syncing UTC minutes..."][verifyStep]}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Subtle Bottom Empty Spacer to keep layout balanced */}
      <div className="h-2"></div>

      {/* Emergency Skip / Defeat Modal */}
      <SkipPhaseModal
        isOpen={isSkipModalOpen}
        onClose={() => setIsSkipModalOpen(false)}
        onSuccess={handleAdmitDefeatConfirmed}
      />

      {/* Top-of-Screen Interrupter Guy Portal */}
      {bossStage === 'guy_standing' && typeof document !== 'undefined' && createPortal(
        <ScreenTopGuy
          onStartBattle={() => setBossStage('battle')}
        />,
        document.body
      )}

      {/* Blank White Screen Click Battle Arena Portal */}
      {bossStage === 'battle' && typeof document !== 'undefined' && createPortal(
        <ClickBattleArena
          targetScore={15}
          timeLimitSeconds={8.0}
          onWin={() => {
            setBossStage('defeated');
            setToastMessage("VICTORY! The Overseer was knocked off screen and banished.");
          }}
          onLose={(score, target, timeSpent) => {
            setBossStats({ score, target, timeSpent });
            setBossStage('lost');
          }}
        />,
        document.body
      )}

      {/* Proper Defeat Lose Screen Portal */}
      {bossStage === 'lost' && typeof document !== 'undefined' && createPortal(
        <DefeatLoseScreen
          score={bossStats.score}
          target={bossStats.target}
          timeSpent={bossStats.timeSpent}
          onRematch={() => setBossStage('battle')}
          onResumePassword={() => setBossStage('idle')}
        />,
        document.body
      )}
    </div>
  );
};
