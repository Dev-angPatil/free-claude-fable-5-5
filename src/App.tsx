import { useState } from 'react';
import { BrightnessProvider, useBrightness } from './components/BrightnessContext';
import { BlankVoid } from './components/BlankVoid';
import { ProfileApplicationPage } from './components/ProfileApplicationPage';
import { BulbSpotlightLogin } from './components/BulbSpotlightLogin';
import { DarknessPhase } from './components/DarknessPhase';
import { RageProfileModal } from './components/RageProfileModal';
import { SuccessTroll } from './components/SuccessTroll';

export type AppPhase =
  | 'void'       // Phase 1 & 2: Blank white page -> Bottom right notification toast
  | 'profile'    // Phase 3: Apply for Fable 5.5 tokens profile page
  | 'bulb'       // Phase 4: Login page with hanging bulb spotlight -> switches off
  | 'darkness'   // Phase 5: Dark room, top-right lit button -> Flappy Bird (score = lux) / Admit defeat
  | 'password'   // Phase 6: Login page password setting at earned brightness level
  | 'success';   // Success celebration -> HTTP 429 rugpull

function AppContent() {
  const [phase, setPhase] = useState<AppPhase>('void');
  const [developerHandle, setDeveloperHandle] = useState('dev_patil_99');
  const [organization, setOrganization] = useState('Antigravity Deep Research');
  const { brightness } = useBrightness();

  return (
    <div className="min-h-screen bg-black">
      {/* Phase 1 & 2: Blank white page with bottom-right notification toast */}
      {phase === 'void' && (
        <BlankVoid onClaim={() => setPhase('profile')} />
      )}

      {/* Phase 3: Profile application page (Apply for Fable 5.5 tokens) */}
      {phase === 'profile' && (
        <ProfileApplicationPage
          onProceedToLogin={(h, o) => {
            setDeveloperHandle(h);
            setOrganization(o);
            setPhase('bulb');
          }}
        />
      )}

      {/* Phase 4: Login page with hanging bulb and conical spotlight, then switches off */}
      {phase === 'bulb' && (
        <BulbSpotlightLogin
          handle={developerHandle}
          organization={organization}
          onDarknessReached={() => setPhase('darkness')}
        />
      )}

      {/* Phase 5: Darkness with the top-right lit button (opens Flappy Bird, score = brightness) */}
      {phase === 'darkness' && (
        <DarknessPhase
          onProceedToPassword={() => setPhase('password')}
        />
      )}

      {/* Phase 6: Login page password setting (at the user's earned brightness!) */}
      {phase === 'password' && (
        <div
          id="app-brightness-wrapper"
          style={{
            filter: `brightness(${Math.max(0.10, Math.min(1.0, brightness / 100))})`,
            transition: 'filter 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <RageProfileModal
            initialHandle={developerHandle}
            initialOrg={organization}
            onSuccess={() => setPhase('success')}
          />
        </div>
      )}

      {/* Success celebration -> 429 Troll */}
      {phase === 'success' && (
        <SuccessTroll onRestart={() => setPhase('void')} />
      )}
    </div>
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
