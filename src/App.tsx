import { useState } from 'react';
import { InitialLure } from './components/InitialLure';
import { RageProfileModal } from './components/RageProfileModal';
import { SuccessTroll } from './components/SuccessTroll';

export function App() {
  const [view, setView] = useState<'lure' | 'profile' | 'success'>('lure');

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
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
  );
}

export default App;
