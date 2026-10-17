import { ArrowRight, Sparkles } from 'lucide-react';

interface NotificationToastProps {
  onClaim: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ onClaim }) => {
  return (
    <aside 
      aria-label="System notification"
      className="fixed bottom-6 right-6 z-50 animate-slideUpRight max-w-sm w-[calc(100%-3rem)] font-sans"
    >
      <div 
        onClick={onClaim}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClaim();
          }
        }}
        className="group relative cursor-pointer bg-white text-neutral-900 border border-neutral-200/90 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 transition-all duration-200"
      >
        <div className="flex items-start gap-3.5">
          {/* Notification Icon */}
          <div className="relative shrink-0 mt-0.5">
            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>

          {/* Notification Text */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[11px] font-mono font-semibold tracking-wider uppercase text-neutral-500">
                Anthropic Cloud Alert
              </span>
              <span className="text-[10px] font-mono text-neutral-400">now</span>
            </div>

            <h4 className="text-sm font-semibold text-neutral-900 tracking-tight leading-snug">
              Free Claude Tokens Granted
            </h4>

            <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
              Special developer research allocation: <strong>Claude 5.5 Fable</strong> tokens are ready to claim.
            </p>

            <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-black group-hover:text-indigo-600 transition-colors">
              <span>Claim allocation</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
