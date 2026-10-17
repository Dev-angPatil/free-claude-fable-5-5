import React, { createContext, useContext, useState, useEffect } from 'react';

interface BrightnessContextType {
  brightness: number;
  isGameOpen: boolean;
  earnedScore: number;
  openGame: () => void;
  closeGame: () => void;
  setBrightness: (val: number | ((prev: number) => number)) => void;
  applyScoreAsBrightness: (score: number) => void;
  admitDefeat: () => void;
}

const BrightnessContext = createContext<BrightnessContextType | undefined>(undefined);

export const BrightnessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [brightness, setBrightness] = useState<number>(100);
  const [earnedScore, setEarnedScore] = useState<number>(0);
  const [isGameOpen, setIsGameOpen] = useState<boolean>(false);

  const openGame = () => setIsGameOpen(true);
  const closeGame = () => setIsGameOpen(false);

  // Set brightness to the score achieved upon death (e.g., score 38 -> 38% brightness, min 10%)
  const applyScoreAsBrightness = (score: number) => {
    setEarnedScore(score);
    const newBright = Math.min(100, Math.max(10, score));
    setBrightness(newBright);
  };

  // Admit Defeat sets brightness to 100%
  const admitDefeat = () => {
    setBrightness(100);
    setEarnedScore(100);
  };

  useEffect(() => {
    const factor = Math.max(0.05, Math.min(1.0, brightness / 100));
    document.documentElement.style.setProperty('--app-brightness', `${factor}`);
  }, [brightness]);

  return (
    <BrightnessContext.Provider
      value={{
        brightness,
        isGameOpen,
        earnedScore,
        openGame,
        closeGame,
        setBrightness,
        applyScoreAsBrightness,
        admitDefeat,
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
