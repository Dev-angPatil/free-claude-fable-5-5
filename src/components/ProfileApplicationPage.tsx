import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface ProfileApplicationPageProps {
  onProceedToLogin: (handle: string, org: string) => void;
}

export const ProfileApplicationPage: React.FC<ProfileApplicationPageProps> = ({ onProceedToLogin }) => {
  const [handle, setHandle] = useState('dev_patil_99');
  const [organization, setOrganization] = useState('Antigravity Deep Research');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onProceedToLogin(handle, organization);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col justify-between p-6 sm:p-12 font-sans selection:bg-neutral-900 selection:text-white">
      {/* Top Header */}
      <header className="max-w-5xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 pb-5 gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-4 h-4 bg-neutral-900 rounded-sm"></div>
          <span className="font-mono text-xs uppercase tracking-widest font-semibold text-neutral-900">
            Anthropic // Labs Experimental
          </span>
        </div>
        <div className="flex items-center space-x-4 text-xs font-mono text-neutral-600">
          <span className="flex items-center gap-2 bg-neutral-100 border border-neutral-200 px-2.5 py-1 rounded-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            CLUSTER: US-EAST-FABLE
          </span>
          <span>LATENCY: 4ms</span>
        </div>
      </header>

      {/* Main Content Box */}
      <main className="max-w-2xl mx-auto my-auto w-full py-12">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 text-xs font-medium text-neutral-700 mb-6 bg-neutral-50 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Special Research Tier Allocation</span>
          <span className="bg-neutral-900 text-white text-[10px] px-1.5 py-0.2 rounded font-mono font-semibold">
            FREE
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 mb-4 leading-tight">
          Apply for Claude 5.5 Fable Tokens
        </h1>

        <p className="text-neutral-600 text-base sm:text-lg leading-relaxed mb-8 font-normal">
          Direct, unthrottled inference access to the unreleased 5.5-million-parameter Fable architecture. Zero rate limits. Zero credit card required.
        </p>

        {/* Profile Details Form */}
        <form onSubmit={handleSubmit} className="space-y-5 bg-neutral-50/70 border border-neutral-200/90 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5 font-semibold">
                Developer Handle
              </label>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className="w-full bg-white border border-neutral-300 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 px-3.5 py-2.5 text-sm font-mono text-neutral-900 rounded-lg outline-none transition-all shadow-sm"
                placeholder="e.g. quantum_engineer"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5 font-semibold">
                Research Organization
              </label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full bg-white border border-neutral-300 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 px-3.5 py-2.5 text-sm font-mono text-neutral-900 rounded-lg outline-none transition-all shadow-sm"
                placeholder="e.g. Autonomous Labs"
                required
              />
            </div>
          </div>

          {/* Allocation Stats */}
          <div className="grid grid-cols-3 gap-3 pt-2 text-xs font-mono">
            <div className="p-3 bg-white border border-neutral-200 rounded-lg">
              <div className="text-neutral-500 text-[10px] uppercase font-semibold">Max Context</div>
              <div className="text-base font-bold text-neutral-900 mt-0.5">10,000,000</div>
            </div>
            <div className="p-3 bg-white border border-neutral-200 rounded-lg">
              <div className="text-neutral-500 text-[10px] uppercase font-semibold">Output Speed</div>
              <div className="text-base font-bold text-neutral-900 mt-0.5">450 tok/s</div>
            </div>
            <div className="p-3 bg-white border border-neutral-200 rounded-lg">
              <div className="text-neutral-500 text-[10px] uppercase font-semibold">Remaining Slots</div>
              <div className="text-base font-bold text-neutral-900 mt-0.5 text-emerald-600">14 / 200</div>
            </div>
          </div>

          {/* CTA Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full group inline-flex items-center justify-center gap-2.5 bg-neutral-900 hover:bg-neutral-800 text-white py-3.5 px-6 rounded-xl text-sm font-semibold tracking-wide transition-all shadow-md active:scale-[0.99] cursor-pointer"
            >
              <span>Get Unlimited Access</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="text-center text-xs text-neutral-500 flex items-center justify-center gap-1.5 font-medium pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Instant Provisioning • Zero Waitlist</span>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto w-full border-t border-neutral-200 pt-5 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-neutral-500 gap-2">
        <div>AUTHORIZED CREDENTIAL ALLOCATION GATEWAY // 2026.10</div>
        <div className="flex items-center gap-4">
          <span>PRIVACY</span>
          <span>RESEARCH SLA</span>
          <span>TERMS</span>
        </div>
      </footer>
    </div>
  );
};
