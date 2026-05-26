import React, { useState } from 'react';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import SequencerDeck from './components/SequencerDeck';
import LearnSection from './components/LearnSection';
import StorySection from './components/StorySection';
import OpenSourceSection from './components/OpenSourceSection';
import Footer from './components/Footer';
import SupportDialog from './components/SupportDialog';

export default function App() {
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [lastPressedKey, setLastPressedKey] = useState<string | null>(null);

  const handleKeyPressAction = (key: string) => {
    setLastPressedKey(key);
    // Auto reset signature so repeat keydown is caught
    setTimeout(() => {
      setLastPressedKey(null);
    }, 120);
  };

  return (
    <div className="min-h-screen bg-neutral-200 text-neutral-900 selection:bg-neutral-950 selection:text-white font-sans overflow-x-hidden antialiased">
      
      {/* 1. Header Navigation Bar */}
      <NavBar onSupportClick={() => setIsSupportOpen(true)} />

      {/* 2. Hero Header Background Spot */}
      <HeroSection />

      {/* 3. Float Overlapping Sequencer Control Panel */}
      <div className="relative -mt-36 md:-mt-52 mb-10 pb-6">
        <SequencerDeck onKeyPressAction={handleKeyPressAction} />
      </div>

      {/* 4. Interactive Keyboard & How it works section */}
      <LearnSection
        onVirtualKeyPress={handleKeyPressAction}
        lastPressedKey={lastPressedKey}
      />

      {/* 5. Blue Bento Box Maker Chronicles */}
      <StorySection />

      {/* 6. Checkerboard Open Source Banner */}
      <OpenSourceSection />

      {/* 7. Footer details */}
      <Footer />

      {/* Interactive Support dialogue module */}
      <SupportDialog isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
    </div>
  );
}
