import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ToastAlertProps {
  message: string | null;
  onClose: () => void;
}

export const ToastAlert: React.FC<ToastAlertProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <aside 
      aria-label="Security violation alert"
      className="fixed bottom-6 right-6 z-50 max-w-md w-[calc(100%-3rem)] animate-shake"
    >
      <div className="bg-[#121214] border border-red-500/30 rounded-xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex items-start gap-3 text-white font-sans text-xs">
        <div className="w-8 h-8 rounded-lg bg-red-950/40 border border-red-500/30 flex items-center justify-center shrink-0 mt-0.5">
          <AlertTriangle className="w-4 h-4 text-red-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-white tracking-wide uppercase font-mono text-[11px] mb-0.5">
            Security Violation
          </div>
          <p className="text-neutral-300 leading-relaxed font-sans text-xs">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-neutral-500 hover:text-white p-1 rounded transition-colors"
          title="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
