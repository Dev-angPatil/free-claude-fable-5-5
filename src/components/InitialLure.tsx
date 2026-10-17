import React from 'react';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface InitialLureProps {
  onClaim: () => void;
}

export const InitialLure: React.FC<InitialLureProps> = ({ onClaim }) => {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-between p-6 sm:p-12 font-sans selection:bg-black selection:text-white">
      {/* Top Header / Status bar */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between border-b-[3px] border-black pb-6 gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 bg-black"></div>
          <span className="font-mono text-xs uppercase tracking-[0.25em] font-bold">
            ANTHROPIC // LABS_EXPERIMENTAL
          </span>
        </div>
        <div className="flex items-center space-x-4 text-xs font-mono font-bold text-neutral-800">
          <span className="flex items-center gap-2 bg-neutral-100 border border-black px-2 py-1">
            <span className="w-2 h-2 bg-black animate-pulse"></span>
            CLUSTER: US-EAST-FABLE
          </span>
          <span>LATENCY: 4ms</span>
        </div>
      </header>

      {/* Main Hook Card */}
      <main className="max-w-4xl mx-auto my-auto w-full py-16">
        {/* Subtle pill notification */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border-[3px] border-black text-xs font-mono tracking-widest uppercase mb-8 bg-neutral-100 font-bold">
          <Zap className="w-4 h-4 text-black stroke-[3]" />
          <span>Special Research Tier Allocation</span>
          <span className="bg-black text-white text-[11px] px-2 py-0.5 font-bold">FREE</span>
        </div>

        {/* Big stark headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-headline tracking-tight leading-[1.0] mb-6 text-black uppercase">
          Claude Fable 5.5 <br />
          <span className="bg-black text-white px-2 py-1 inline-block mt-2">Unlimited Tokens</span>.
        </h1>

        <p className="text-neutral-800 text-lg sm:text-xl font-body leading-relaxed max-w-2xl mb-10 font-normal">
          Direct, unthrottled inference access to the unreleased 5.5-million-parameter Fable architecture. Zero rate limits. Zero credit card required.
        </p>

        {/* Action button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <button
            onClick={onClaim}
            className="group relative inline-flex items-center justify-center gap-3 bg-black text-white hover:bg-white hover:text-black hover:border-[4px] px-8 py-5 text-sm font-headline tracking-widest uppercase transition-all duration-150 active:scale-[0.98] border-[3px] border-black rounded-none shadow-none"
          >
            <span>Claim Free Fable API Key</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 stroke-[3]" />
          </button>

          <span className="text-xs font-mono text-neutral-700 flex items-center gap-1.5 font-bold">
            <ShieldCheck className="w-4 h-4 text-black stroke-[2.5]" />
            Instant Quantum Onboarding
          </span>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-16 mt-16 border-t-[3px] border-black font-mono text-xs">
          <div className="p-4 border-[2px] border-black bg-neutral-50">
            <div className="text-neutral-600 uppercase tracking-wider mb-1 font-bold">Max Context</div>
            <div className="text-2xl font-bold text-black tracking-tight font-headline">10,000,000</div>
          </div>
          <div className="p-4 border-[2px] border-black bg-neutral-50">
            <div className="text-neutral-600 uppercase tracking-wider mb-1 font-bold">Output Rate</div>
            <div className="text-2xl font-bold text-black tracking-tight font-headline">450 tok/s</div>
          </div>
          <div className="col-span-2 sm:col-span-1 p-4 border-[2px] border-black bg-neutral-50">
            <div className="text-neutral-600 uppercase tracking-wider mb-1 font-bold">Remaining Slots</div>
            <div className="text-2xl font-bold text-black tracking-tight font-headline">14 / 200</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-[3px] border-black pt-6 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-neutral-600 font-bold gap-4">
        <div>AUTHORIZED ACCESS CREDENTIAL GATEWAY // RELEASE 2026.10</div>
        <div className="flex items-center gap-6">
          <span>PRIVACY</span>
          <span>ENTERPRISE SLA</span>
          <span>TERMS</span>
        </div>
      </footer>
    </div>
  );
};
