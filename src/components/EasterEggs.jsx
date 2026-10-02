import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Moon } from 'lucide-react';
import { CONFIG } from '../data/config';

export default function EasterEggs() {
  const [moonClicks, setMoonClicks] = useState(0);
  const [showMoonModal, setShowMoonModal] = useState(false);
  const [showFlowerModal, setShowFlowerModal] = useState(false);
  const [floatingWord, setFloatingWord] = useState(null);

  // Easter Egg 1: Moon 3-click trigger
  const handleMoonClick = () => {
    const nextCount = moonClicks + 1;
    setMoonClicks(nextCount);
    if (nextCount >= CONFIG.easterEggs.moonClicksRequired) {
      setShowMoonModal(true);
      setMoonClicks(0);
    }
  };

  // Easter Egg 4: Subtly drifting words appearing occasionally
  useEffect(() => {
    const words = CONFIG.easterEggs.floatingWords;
    const interval = setInterval(() => {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      const randomTop = Math.random() * 60 + 20; // 20% to 80%
      const randomLeft = Math.random() * 70 + 15; // 15% to 85%
      
      setFloatingWord({
        id: Date.now(),
        text: randomWord,
        top: `${randomTop}%`,
        left: `${randomLeft}%`
      });

      // Clear after 4 seconds
      setTimeout(() => {
        setFloatingWord(null);
      }, 4000);
    }, 14000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Easter Egg 1: Moon in the top-left sky */}
      <div 
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 90
        }}
      >
        <button
          onClick={handleMoonClick}
          aria-label="Crescent Moon"
          title=""
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px',
            color: 'var(--color-champagne)',
            opacity: 0.65,
            transition: 'all 0.4s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'scale(1.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.65';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <Moon size={22} strokeWidth={1.5} style={{ filter: 'drop-shadow(0 0 6px rgba(246, 231, 200, 0.4))' }} />
        </button>
      </div>

      {/* Easter Egg 3: Tiny subtle flower near bottom right */}
      <div 
        style={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
          zIndex: 80
        }}
      >
        <button
          onClick={() => setShowFlowerModal(true)}
          aria-label="A tiny blossom"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            opacity: 0.4,
            fontSize: '14px',
            transition: 'all 0.3s ease',
            padding: '4px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.9';
            e.currentTarget.style.transform = 'scale(1.2) rotate(15deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.4';
            e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
          }}
        >
          🌸
        </button>
      </div>

      {/* Easter Egg 4: Drifting whisper word */}
      <AnimatePresence>
        {floatingWord && (
          <motion.div
            key={floatingWord.id}
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 0.45, y: -25, scale: 1 }}
            exit={{ opacity: 0, y: -45, scale: 1.05 }}
            transition={{ duration: 4, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              top: floatingWord.top,
              left: floatingWord.left,
              pointerEvents: 'none',
              zIndex: 3,
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: '1.2rem',
              color: 'var(--color-blush)',
              letterSpacing: '0.15em',
              textShadow: '0 0 10px rgba(243, 198, 204, 0.4)'
            }}
          >
            ✦ {floatingWord.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Moon Easter Egg Modal */}
      <AnimatePresence>
        {showMoonModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(10, 5, 12, 0.75)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 200,
              padding: '20px'
            }}
            onClick={() => setShowMoonModal(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel"
              style={{
                maxWidth: '380px',
                width: '100%',
                padding: '36px 30px',
                textAlign: 'center',
                position: 'relative',
                border: '1px solid rgba(246, 231, 200, 0.3)'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '16px', color: 'var(--color-champagne)' }}>
                🌙
              </div>
              <p 
                className="font-serif" 
                style={{ 
                  fontSize: '1.35rem', 
                  lineHeight: '1.7', 
                  whiteSpace: 'pre-line',
                  color: 'var(--color-cream)',
                  marginBottom: '24px'
                }}
              >
                {CONFIG.easterEggs.moonMessage}
              </p>
              <button
                className="btn-primary"
                onClick={() => setShowMoonModal(false)}
                style={{ fontSize: '0.95rem', padding: '10px 24px' }}
              >
                Close ✦
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flower Easter Egg Modal */}
      <AnimatePresence>
        {showFlowerModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(10, 5, 12, 0.75)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 200,
              padding: '20px'
            }}
            onClick={() => setShowFlowerModal(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel"
              style={{
                maxWidth: '360px',
                width: '100%',
                padding: '32px 28px',
                textAlign: 'center',
                border: '1px solid rgba(216, 140, 154, 0.4)'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '14px' }}>
                🌸
              </div>
              <p 
                className="font-serif" 
                style={{ 
                  fontSize: '1.3rem', 
                  lineHeight: '1.6', 
                  color: 'var(--color-blush)',
                  marginBottom: '22px'
                }}
              >
                {CONFIG.easterEggs.flowerMessage}
              </p>
              <button
                className="btn-primary"
                onClick={() => setShowFlowerModal(false)}
                style={{ fontSize: '0.95rem', padding: '10px 24px' }}
              >
                Understood ✦
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
