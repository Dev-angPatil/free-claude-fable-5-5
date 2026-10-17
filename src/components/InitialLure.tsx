import React from 'react';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface InitialLureProps {
  onClaim: () => void;
}

export const InitialLure: React.FC<InitialLureProps> = ({ onClaim }) => {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-between p-6 sm:p-12 font-sans selection:bg-black selection:text-white">
      {/* Top Header / Status bar */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-black/10 pb-6 gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-4 h-4 bg-black rounded-none"></div>
          <span className="font-mono text-xs uppercase tracking-[0.25em] font-bold">
            ANTHROPIC // LABS_EXPERIMENTAL
          </span>
        </div>
        <div className="flex items-center space-x-4 text-xs font-mono text-neutral-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            CLUSTER: US-EAST-FABLE
          </span>
          <span>LATENCY: 4ms</span>
        </div>
      </header>

      {/* Main Hook Card */}
      <main className="max-w-3xl mx-auto my-auto w-full py-16">
        {/* Subtle pill notification */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-black/15 text-xs font-mono tracking-widest uppercase mb-8 bg-neutral-50">
          <Zap className="w-3.5 h-3.5 text-black" />
          <span>Special Research Tier Allocation</span>
          <span className="bg-black text-white text-[10px] px-1.5 py-0.5 font-bold">FREE</span>
        </div>

        {/* Big stark headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extralight tracking-tight leading-[1.05] mb-6 text-black">
          Claude Fable 5.5 <br />
          <span className="font-semibold underline decoration-1 underline-offset-8">Unlimited Tokens</span>.
        </h1>

        <p className="text-neutral-600 text-lg sm:text-xl font-light leading-relaxed max-w-2xl mb-10">
          Direct, unthrottled inference access to the unreleased 5.5-million-parameter Fable architecture. Zero rate limits. Zero credit card required.
        </p>

        {/* Action button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <button
            onClick={onClaim}
            className="group relative inline-flex items-center justify-center gap-3 bg-black text-white hover:bg-neutral-800 px-8 py-5 text-sm font-mono tracking-widest uppercase font-semibold transition-all duration-150 active:scale-[0.98] border border-black shadow-lg shadow-black/5"
          >
            <span>Claim Free Fable API Key</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <span className="text-xs font-mono text-neutral-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-black" />
            Instant Quantum Onboarding
          </span>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-16 mt-16 border-t border-black/10 font-mono text-xs">
          <div>
            <div className="text-neutral-400 uppercase tracking-wider mb-1">Max Context</div>
            <div className="text-xl font-bold text-black tracking-tight">10,000,000</div>
          </div>
          <div>
            <div className="text-neutral-400 uppercase tracking-wider mb-1">Output Rate</div>
            <div className="text-xl font-bold text-black tracking-tight">450 tok/s</div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <div className="text-neutral-400 uppercase tracking-wider mb-1">Remaining Slots</div>
            <div className="text-xl font-bold text-black tracking-tight">14 / 200</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-black/10 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-neutral-400 gap-4">
        <div>AUTHORIZED ACCESS CREDENTIAL GATEWAY // RELEASE 2026.10</div>
        <div className="flex items-center gap-4">
          <span>PRIVACY</span>
          <span>ENTERPRISE SLA</span>
          <span>TERMS</span>
        </div>
      </footer>
    </div>
  );
};
