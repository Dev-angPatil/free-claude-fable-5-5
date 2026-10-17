import { useState } from 'react';
import { BrightnessProvider, useBrightness } from './components/BrightnessContext';
import { QuickSettingsBar } from './components/QuickSettingsBar';
import { FlappyBrightnessModal } from './components/FlappyBrightnessModal';
import { InitialLure } from './components/InitialLure';
import { RageProfileModal } from './components/RageProfileModal';
import { SuccessTroll } from './components/SuccessTroll';

function AppContent() {
  const [view, setView] = useState<'lure' | 'profile' | 'success'>('lure');
  const { brightness } = useBrightness();

  return (
    <>
      {/* Dimmed Website Viewport Container */}
      <div
        id="app-brightness-wrapper"
        style={{
          filter: `brightness(${Math.max(0.05, Math.min(1.0, brightness / 100))})`,
          transition: 'filter 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="min-h-screen bg-black text-white selection:bg-white selection:text-black relative"
      >
        {/* Persistent Quick Settings Bar */}
        <QuickSettingsBar />

        {/* Primary Page Views */}
        {view === 'lure' && (
          <InitialLure onClaim={() => setView('profile')} />
        )}

        {view === 'profile' && (
          <RageProfileModal
            onBack={() => setView('lure')}
            onSuccess={() => setView('success')}
          />
        )}

        {view === 'success' && (
          <SuccessTroll onRestart={() => setView('profile')} />
        )}
      </div>

      {/* Flappy Bird Arcade Hardware Modal (outside brightness filter so game cabinet remains legible) */}
      <FlappyBrightnessModal />
    </>
  );
}

export function App() {
  return (
    <BrightnessProvider>
      <AppContent />
    </BrightnessProvider>
  );
}

export default App;
