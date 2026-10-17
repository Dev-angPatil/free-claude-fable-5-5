import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ToastAlertProps {
  message: string | null;
  onClose: () => void;
}

export const ToastAlert: React.FC<ToastAlertProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-[calc(100%-3rem)] animate-bounce">
      <div className="bg-black border border-white p-4 shadow-2xl flex items-start gap-3 text-white font-mono text-xs">
        <AlertTriangle className="w-5 h-5 text-white shrink-0 mt-0.5" />
        <div className="flex-1">
          <div className="font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>[SECURITY VIOLATION]</span>
          </div>
          <p className="text-neutral-300 leading-relaxed font-sans">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-neutral-500 hover:text-white p-1 transition-colors"
          title="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
