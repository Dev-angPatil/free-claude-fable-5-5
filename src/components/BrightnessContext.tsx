import { createContext, useContext, useState, useEffect } from 'react';

interface BrightnessContextType {
  brightness: number;
  isGameOpen: boolean;
  openGame: () => void;
  closeGame: () => void;
  setBrightness: (val: number | ((prev: number) => number)) => void;
  resetToBaseline: () => void;
}

const BrightnessContext = createContext<BrightnessContextType | undefined>(undefined);

export const BASELINE_BRIGHTNESS = 10; // 10% initial dimming

export const BrightnessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [brightness, setBrightness] = useState<number>(BASELINE_BRIGHTNESS);
  const [isGameOpen, setIsGameOpen] = useState<boolean>(false);

  const openGame = () => setIsGameOpen(true);
  const closeGame = () => setIsGameOpen(false);
  const resetToBaseline = () => setBrightness(BASELINE_BRIGHTNESS);

  useEffect(() => {
    const factor = Math.max(0.05, Math.min(1.0, brightness / 100));
    document.documentElement.style.setProperty('--app-brightness', `${factor}`);
  }, [brightness]);

  return (
    <BrightnessContext.Provider
      value={{
        brightness,
        isGameOpen,
        openGame,
        closeGame,
        setBrightness,
        resetToBaseline,
      }}
    >
      {children}
    </BrightnessContext.Provider>
  );
};

export const useBrightness = () => {
  const context = useContext(BrightnessContext);
  if (!context) {
    throw new Error('useBrightness must be used within a BrightnessProvider');
  }
  return context;
};
