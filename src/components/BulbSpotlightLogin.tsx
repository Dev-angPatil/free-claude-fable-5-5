import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';

interface BulbSpotlightLoginProps {
  handle: string;
  organization: string;
  onDarknessReached: () => void;
}

export const BulbSpotlightLogin: React.FC<BulbSpotlightLoginProps> = ({
  handle,
  organization,
  onDarknessReached,
}) => {
  const [isBulbOn, setIsBulbOn] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Keep bulb on for 3.2 seconds so user sees the conical light spotlighting the login text,
    // then switch the bulb off, plunging the screen into total darkness.
    const switchTimer = setTimeout(() => {
      setIsBulbOn(false);
      setIsFadingOut(true);
      
      // Allow 700ms for darkness fade before advancing to Darkness Phase
      const darkTimer = setTimeout(() => {
        onDarknessReached();
      }, 750);

      return () => clearTimeout(darkTimer);
    }, 3400);

    return () => clearTimeout(switchTimer);
  }, [onDarknessReached]);

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden select-none flex flex-col items-center justify-between font-sans">
      {/* Bulb Hanging from Top */}
      <div className="relative z-30 flex flex-col items-center pointer-events-none">
        <div className="relative">
          <img
            src={isBulbOn ? '/assets/bulb-on.png' : '/assets/bulb-off.png'}
            alt="Ceiling Bulb"
            className="w-20 sm:w-24 h-auto object-contain transition-all duration-300 drop-shadow-[0_15px_30px_rgba(255,230,100,0.4)]"
          />
          {/* Bulb Glow Halo when ON */}
          {isBulbOn && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-32 bg-amber-200/40 rounded-full blur-2xl animate-pulse pointer-events-none" />
          )}
        </div>
      </div>

      {/* Conical Light Beam Effect */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ease-out z-10 ${
          isBulbOn && !isFadingOut ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(ellipse at 50% 130px, rgba(255, 245, 170, 0.45) 0%, rgba(255, 235, 140, 0.18) 45%, rgba(0, 0, 0, 0.95) 85%)',
          clipPath: 'polygon(50% 120px, 0% 100%, 100% 100%)',
        }}
      />

      {/* Login Page Content Illuminated inside the Conical Light */}
      <main
        className={`relative z-20 my-auto max-w-lg w-full px-6 transition-all duration-700 ${
          isBulbOn && !isFadingOut ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{
          // Only the content within the conical beam path is visible
          clipPath: 'polygon(50% -80px, -20% 100%, 120% 100%)',
        }}
      >
        <div className="bg-[#0e0e11]/90 backdrop-blur-md border border-amber-300/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(255,225,120,0.15)] text-center">
          {/* Status Indicator */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-mono font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span>SPOTLIGHT AUTHENTICATION</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Fable 5.5 Developer Gateway
          </h2>
          <p className="text-xs text-neutral-400 font-mono mt-1 mb-6">
            Identity: <span className="text-neutral-200">{handle}</span> ({organization})
          </p>

          {/* Dummy illuminated login form fields */}
          <div className="space-y-3.5 text-left font-mono text-xs">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                Passphrase Authorization
              </label>
              <div className="relative">
                <input
                  type="password"
                  disabled
                  value="••••••••••••••••••••••••"
                  className="w-full bg-[#18181b] border border-neutral-700/80 rounded-lg px-3.5 py-2.5 text-white outline-none cursor-default"
                />
                <Lock className="w-4 h-4 text-amber-400/80 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/20 text-amber-200/90 text-[11px] leading-relaxed">
              💡 <strong>System Lighting Active:</strong> Directives are stabilizing. Preparing hardware cryptographic handshake...
            </div>
          </div>
        </div>
      </main>

      {/* Footer hint */}
      <footer className={`z-20 text-xs font-mono text-neutral-500 pb-6 transition-opacity duration-500 ${
        isBulbOn && !isFadingOut ? 'opacity-80' : 'opacity-0'
      }`}>
        <span>CONICAL LUX ILLUMINATION: 100%</span>
      </footer>
    </div>
  );
};
