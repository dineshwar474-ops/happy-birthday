import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import IntroScreen from './components/IntroScreen';
import MysteryQuestion from './components/MysteryQuestion';
import ClueCard from './components/ClueCard';
import Constellation from './components/Constellation';
import BirthdayJar from './components/BirthdayJar';
import Envelope from './components/Envelope';
import BirthdayLetter from './components/BirthdayLetter';
import GiftReveal from './components/GiftReveal';
import GoldenChance from './components/GoldenChance';
import FinalReveal from './components/FinalReveal';
import MusicToggle from './components/MusicToggle';
import FloatingParticles from './components/FloatingParticles';
import EasterEggs from './components/EasterEggs';

const STAGES = [
  'intro',
  'question',
  'clues',
  'constellation',
  'jar',
  'envelope',
  'letter',
  'gift',
  'goldenChance',
  'finale'
];

export default function App() {
  const [currentStage, setCurrentStage] = useState('intro');
  const [goldenRequest, setGoldenRequest] = useState('');

  // Scroll to top smoothly when stage changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStage]);

  const currentIndex = STAGES.indexOf(currentStage);

  const goToNext = () => {
    const nextIdx = currentIndex + 1;
    if (nextIdx < STAGES.length) {
      setCurrentStage(STAGES[nextIdx]);
    }
  };

  const handleRestart = () => {
    setCurrentStage('intro');
  };

  return (
    <div className="app-container" style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
      {/* Background Ambience Layers */}
      <div className="ambient-blobs" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="blob blob-gold" />
      </div>
      <div className="grain-overlay" aria-hidden="true" />
      <FloatingParticles />

      {/* Global Interactive Elements: Music & Easter Eggs */}
      <MusicToggle />
      <EasterEggs />

      {/* Subtle Progress Indicator */}
      <div className="journey-progress" aria-hidden="true">
        {STAGES.map((s, idx) => (
          <span
            key={s}
            className={`progress-dot ${idx === currentIndex ? 'active' : ''} ${
              idx < currentIndex ? 'completed' : ''
            }`}
          />
        ))}
      </div>

      {/* Cinematic Screen Flow with AnimatePresence */}
      <AnimatePresence mode="wait">
        {currentStage === 'intro' && (
          <IntroScreen key="intro" onNext={goToNext} />
        )}

        {currentStage === 'question' && (
          <MysteryQuestion key="question" onNext={goToNext} />
        )}

        {currentStage === 'clues' && (
          <ClueCard key="clues" onComplete={goToNext} />
        )}

        {currentStage === 'constellation' && (
          <Constellation key="constellation" onNext={goToNext} />
        )}

        {currentStage === 'jar' && (
          <BirthdayJar key="jar" onNext={goToNext} />
        )}

        {currentStage === 'envelope' && (
          <Envelope key="envelope" onOpen={goToNext} />
        )}

        {currentStage === 'letter' && (
          <BirthdayLetter key="letter" onNext={goToNext} />
        )}

        {currentStage === 'gift' && (
          <GiftReveal key="gift" onNext={goToNext} />
        )}

        {currentStage === 'goldenChance' && (
          <GoldenChance
            key="goldenChance"
            request={goldenRequest}
            setRequest={setGoldenRequest}
            onNext={goToNext}
          />
        )}

        {currentStage === 'finale' && (
          <FinalReveal
            key="finale"
            request={goldenRequest}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
