import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clues } from '../data/clues';
import { Sparkles, Eye } from 'lucide-react';

export default function ClueCard({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  const currentClue = clues[currentIndex];
  const isLastClue = currentIndex === clues.length - 1;

  const handleReveal = () => {
    setIsRevealed(true);
  };

  const handleContinue = () => {
    if (isLastClue) {
      onComplete();
    } else {
      setIsRevealed(false);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <motion.main
      className="clues-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.96, filter: 'blur(8px)', transition: { duration: 0.7 } }}
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px 24px',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div style={{ maxWidth: '600px', width: '100%', margin: '0 auto', textAlign: 'center' }}>
        {/* Subtle Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '32px' }}
        >
          <span 
            style={{ 
              fontFamily: 'var(--font-sans)', 
              fontSize: '0.85rem', 
              letterSpacing: '0.2em', 
              textTransform: 'uppercase', 
              color: 'var(--color-rose)',
              opacity: 0.9 
            }}
          >
            ✦ The Official Reality Checks ✦
          </span>
          <h2
            className="font-serif text-glow"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 2.8rem)',
              fontWeight: 400,
              color: 'var(--color-cream)',
              marginTop: '8px'
            }}
          >
            A few undeniable facts about us.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.88rem',
              color: 'var(--color-blush)',
              opacity: 0.8,
              marginTop: '6px'
            }}
          >
            Fact {currentIndex + 1} of {clues.length} (Just in case you forgot who the main character is)
          </p>
        </motion.div>

        {/* The Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentClue.id}
            initial={{ opacity: 0, scale: 0.92, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -25 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel"
            style={{
              padding: 'clamp(36px, 6vw, 54px) clamp(24px, 5vw, 44px)',
              position: 'relative',
              overflow: 'hidden',
              border: isRevealed ? '1px solid rgba(246, 231, 200, 0.45)' : '1px solid var(--glass-border)',
              boxShadow: isRevealed ? '0 12px 40px rgba(212, 175, 55, 0.15)' : 'var(--glass-glow)',
              transition: 'border 0.5s ease, box-shadow 0.5s ease'
            }}
          >
            {/* Clue Number Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: 'rgba(216, 140, 154, 0.15)',
                border: '1px solid rgba(216, 140, 154, 0.35)',
                color: 'var(--color-champagne)',
                fontFamily: 'var(--font-serif)',
                fontSize: '1.2rem',
                fontWeight: 600,
                marginBottom: '26px'
              }}
            >
              {currentClue.number}
            </div>

            {/* Hidden vs Revealed State */}
            <div style={{ minHeight: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AnimatePresence mode="wait">
                {!isRevealed ? (
                  <motion.div
                    key="hidden-hint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, filter: 'blur(8px)' }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '14px'
                    }}
                  >
                    <div style={{ color: 'var(--color-blush)', opacity: 0.75, letterSpacing: '0.08em', fontSize: '1.05rem', fontStyle: 'italic' }}>
                      {currentClue.hint}
                    </div>
                    <div 
                      style={{ 
                        height: '2px', 
                        width: '40px', 
                        background: 'linear-gradient(90deg, transparent, var(--color-rose), transparent)',
                        margin: '4px 0' 
                      }} 
                    />
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255, 248, 241, 0.6)' }}>
                      Tap reveal to accept this fact
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="revealed-text"
                    initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p
                      className="font-serif text-glow"
                      style={{
                        fontSize: 'clamp(1.35rem, 3.6vw, 1.85rem)',
                        fontWeight: 400,
                        lineHeight: 1.55,
                        color: 'var(--color-cream)',
                        whiteSpace: 'pre-line',
                        fontStyle: 'italic'
                      }}
                    >
                      "{currentClue.text}"
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Buttons */}
            <div style={{ marginTop: '36px' }}>
              {!isRevealed ? (
                <button onClick={handleReveal} className="btn-primary">
                  Reveal Truth ✦
                </button>
              ) : (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleContinue}
                  className="btn-primary btn-gold"
                >
                  {isLastClue ? 'Enter the Sky 🌙' : 'Accept & Continue ✦'}
                </motion.button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.main>
  );
}
