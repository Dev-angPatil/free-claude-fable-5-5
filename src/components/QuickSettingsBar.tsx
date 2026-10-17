import React, { useState } from 'react';
import { SunDim, SunMedium, Sun, Plus, Minus, Gamepad2 } from 'lucide-react';
import { useBrightness, BASELINE_BRIGHTNESS } from './BrightnessContext';

export const QuickSettingsBar: React.FC = () => {
  const { brightness, openGame, setBrightness } = useBrightness();
  const [showTooltip, setShowTooltip] = useState(false);

  // Trigger modal when trying to increase brightness
  const handleIncreaseAttempt = () => {
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2800);
    openGame();
  };

  // Decreasing is allowed down to BASELINE_BRIGHTNESS (10%)
  const handleDecrease = () => {
    setBrightness((prev) => Math.max(BASELINE_BRIGHTNESS, prev - 5));
  };

  // Slider change interceptor
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val > brightness) {
      handleIncreaseAttempt();
    } else {
      setBrightness(Math.max(BASELINE_BRIGHTNESS, val));
    }
  };

  // Dynamic Sun Icon
  const getSunIcon = () => {
    if (brightness < 35) return <SunDim className="w-4 h-4 text-white" />;
    if (brightness < 75) return <SunMedium className="w-4 h-4 text-white" />;
    return <Sun className="w-4 h-4 text-white" />;
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-1.5 font-mono select-none">
      {/* Quick Settings Pill */}
      <div className="flex items-center gap-3 bg-black border-2 border-white px-3 py-1.5 text-xs text-white shadow-[4px_4px_0px_0px_#FFFFFF]">
        <div className="flex items-center gap-1.5 border-r border-[#3A3A3C] pr-2.5">
          {getSunIcon()}
          <span className="font-bold tracking-wider">{brightness}%</span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrease}
            disabled={brightness <= BASELINE_BRIGHTNESS}
            className="p-1 hover:bg-white hover:text-black transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white"
            title="Decrease luminance"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          {/* Slider */}
          <input
            type="range"
            min={BASELINE_BRIGHTNESS}
            max="100"
            value={brightness}
            onChange={handleSliderChange}
            className="w-20 sm:w-28 h-1.5 bg-[#222222] accent-white cursor-pointer rounded-none appearance-none"
            title="Drag up to increase brightness"
          />

          <button
            onClick={handleIncreaseAttempt}
            className="p-1 hover:bg-white hover:text-black transition-colors"
            title="Increase luminance (requires arcade clearance)"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Arcade Launch Shortcut Button */}
        <button
          onClick={openGame}
          className="ml-1 flex items-center gap-1 bg-white text-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider hover:bg-[#D1D5DB] transition-colors"
          title="Launch Flappy Brightness challenge"
        >
          <Gamepad2 className="w-3 h-3" />
          <span>Boost</span>
        </button>
      </div>

      {/* Tooltip Notification on Intercept */}
      {showTooltip && (
        <div className="bg-[#111111] border border-white text-white text-[11px] px-3 py-1.5 tracking-tight shadow-[3px_3px_0px_0px_#FFFFFF] animate-pulse">
          ⚡ <span className="font-bold text-white">HARDWARE INTERCEPT:</span> Brightness locked. Clear pipes to earn lumens.
        </div>
      )}
    </div>
  );
};
