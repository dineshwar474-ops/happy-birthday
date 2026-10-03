import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Moon, X, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CONFIG } from '../data/config';
import { useMode, MODES } from '../context/ModeContext';

export default function EasterEggs() {
  const { mode, setMode, isHerMode } = useMode();
  const [moonClicks, setMoonClicks] = useState(0);
  const [showMoonModal, setShowMoonModal] = useState(false);
  const [showFlowerModal, setShowFlowerModal] = useState(false);
  const [floatingWord, setFloatingWord] = useState(null);
  const [switchToast, setSwitchToast] = useState(null);

  const flowerDialog = CONFIG.easterEggs.flowerDialog;

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

  const handleSwitchToHer = () => {
    setMode(MODES.HER);
    setShowFlowerModal(false);

    confetti({
      particleCount: 75,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#F3C6CC', '#D88C9A', '#F6E7C8', '#D4AF37', '#FFF8F1'],
      scalar: 1.1
    });

    setSwitchToast("🌸 Switched to Sri Dhanya Edition! The universe now celebrates YOU 👑");
    setTimeout(() => setSwitchToast(null), 4000);
  };

  const handleSwitchToMe = () => {
    setMode(MODES.ME);
    setShowFlowerModal(false);

    setSwitchToast("👑 Switched back to Main Character Roast Mode! 😂");
    setTimeout(() => setSwitchToast(null), 4000);
  };

  return (
    <>
      {/* Toast Notification when mode switches */}
      <AnimatePresence>
        {switchToast && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            style={{
              position: 'fixed',
              top: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 300,
              background: 'linear-gradient(135deg, rgba(42, 23, 42, 0.95), rgba(23, 15, 28, 0.98))',
              border: '1px solid rgba(246, 231, 200, 0.5)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(216, 140, 154, 0.4)',
              borderRadius: '24px',
              padding: '12px 24px',
              color: 'var(--color-champagne)',
              fontFamily: 'var(--font-serif)',
              fontSize: '1.05rem',
              fontStyle: 'italic',
              textAlign: 'center',
              pointerEvents: 'none'
            }}
          >
            {switchToast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Active Mode Indicator Pill at Top Center */}
      {isHerMode && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'fixed',
            top: '16px',
            right: '20px',
            zIndex: 85,
            background: 'rgba(216, 140, 154, 0.2)',
            border: '1px solid rgba(246, 231, 200, 0.4)',
            backdropFilter: 'blur(8px)',
            borderRadius: '20px',
            padding: '6px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            color: 'var(--color-champagne)',
            fontFamily: 'var(--font-serif)'
          }}
          onClick={() => setShowFlowerModal(true)}
          title="Click to manage mode"
        >
          <span>🌸</span>
          <span style={{ fontStyle: 'italic' }}>Sri Dhanya Edition</span>
          <span>✦</span>
        </motion.div>
      )}

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

      {/* Easter Egg 3: Secret Flower near bottom right */}
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
          aria-label="A tiny secret flower"
          title="A secret blossom..."
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            opacity: isHerMode ? 0.9 : 0.45,
            fontSize: isHerMode ? '18px' : '15px',
            transition: 'all 0.3s ease',
            padding: '6px',
            filter: isHerMode ? 'drop-shadow(0 0 8px rgba(216, 140, 154, 0.8))' : 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'scale(1.3) rotate(15deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = isHerMode ? '0.9' : '0.45';
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

      {/* Secret Flower Modal: The Secret Reveal & Mode Switcher */}
      <AnimatePresence>
        {showFlowerModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(10, 5, 12, 0.85)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 250,
              padding: '20px'
            }}
            onClick={() => setShowFlowerModal(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel"
              style={{
                maxWidth: '480px',
                width: '100%',
                padding: 'clamp(28px, 5vw, 40px) clamp(20px, 4vw, 32px)',
                textAlign: 'center',
                position: 'relative',
                background: 'linear-gradient(175deg, rgba(42, 23, 42, 0.95) 0%, rgba(23, 15, 28, 0.98) 100%)',
                border: '1px solid rgba(216, 140, 154, 0.5)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(216, 140, 154, 0.25)'
              }}
            >
              {/* Close icon */}
              <button
                onClick={() => setShowFlowerModal(false)}
                aria-label="Close"
                style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-blush)',
                  cursor: 'pointer',
                  padding: '6px'
                }}
              >
                <X size={18} />
              </button>

              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
                🌸
              </div>

              {!isHerMode ? (
                /* MAIN CHARACTER MODE: Show humorous Tamil teasing & option to switch to Her */
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--color-rose)',
                      display: 'block',
                      marginBottom: '8px'
                    }}
                  >
                    ✦ Secret Flower Unlocked ✦
                  </span>

                  <h3
                    className="font-serif text-glow-rose"
                    style={{
                      fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                      color: 'var(--color-champagne)',
                      marginBottom: '16px'
                    }}
                  >
                    {flowerDialog.title}
                  </h3>

                  <div
                    className="font-serif"
                    style={{
                      fontSize: 'clamp(1.05rem, 2.8vw, 1.22rem)',
                      lineHeight: '1.7',
                      color: 'var(--color-cream)',
                      textAlign: 'left',
                      marginBottom: '20px',
                      background: 'rgba(23, 15, 28, 0.6)',
                      borderRadius: '16px',
                      padding: '18px 20px',
                      border: '1px solid rgba(216, 140, 154, 0.25)'
                    }}
                  >
                    <p style={{ marginBottom: '12px', color: 'var(--color-champagne)' }}>
                      "Epudii Tension aaniya... <em>'Enoda birthday ku una pathiyeh potu vechurke'</em> nu tension aaniya? 😂"
                    </p>
                    <p style={{ marginBottom: '12px' }}>
                      "Adhu epudi una tension panama takkunu soliduvana! 😜"
                    </p>
                    <p style={{ marginBottom: '12px', color: 'var(--color-blush)' }}>
                      "Enaku theriyum... <em>'Ne la veladradu oru TT, adhu pathi peethitu iruka'</em> nu nenachrupa... <em>'Ena da mental mari una pathiye peethirka'</em> nu nenachrupa thaane? 🏓😆"
                    </p>
                    <p style={{ fontStyle: 'italic', color: 'var(--color-gold)', margin: 0 }}>
                      "Seri edho un birthday nra naala happy ah irukatum nu vidra pathuko! 🎂✨"
                    </p>
                  </div>

                  <p
                    className="font-serif"
                    style={{
                      fontSize: '1.05rem',
                      color: 'var(--color-champagne)',
                      fontStyle: 'italic',
                      marginBottom: '20px'
                    }}
                  >
                    Ippo sollu... Unmaiyana birthday celebration-ku maathava?
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <button
                      onClick={handleSwitchToHer}
                      className="btn-primary btn-gold"
                      style={{
                        padding: '14px 20px',
                        fontSize: '1.05rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}
                    >
                      <span>🌸 Switch to Sri Dhanya Edition ✨</span>
                    </button>

                    <button
                      onClick={() => setShowFlowerModal(false)}
                      className="btn-secondary"
                      style={{
                        padding: '11px 18px',
                        fontSize: '0.92rem'
                      }}
                    >
                      😈 Irukkattum, let me roast you first! (Keep Current Mode)
                    </button>
                  </div>
                </div>
              ) : (
                /* HER MODE ACTIVE: Show that she is celebrated, with option to switch back if wanted */
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--color-gold)',
                      display: 'block',
                      marginBottom: '8px'
                    }}
                  >
                    ✦ Mental Edition Active ✦
                  </span>

                  <h3
                    className="font-serif text-glow-gold"
                    style={{
                      fontSize: 'clamp(1.5rem, 4vw, 1.95rem)',
                      color: 'var(--color-champagne)',
                      marginBottom: '14px'
                    }}
                  >
                    {flowerDialog.activeHerTitle}
                  </h3>

                  <p
                    className="font-serif"
                    style={{
                      fontSize: '1.18rem',
                      lineHeight: '1.6',
                      color: 'var(--color-cream)',
                      whiteSpace: 'pre-line',
                      marginBottom: '24px'
                    }}
                  >
                    {flowerDialog.activeHerMessage}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <button
                      onClick={() => setShowFlowerModal(false)}
                      className="btn-primary btn-gold"
                      style={{
                        padding: '12px 20px',
                        fontSize: '1rem'
                      }}
                    >
                      {flowerDialog.stayHerText}
                    </button>

                    <button
                      onClick={handleSwitchToMe}
                      className="btn-secondary"
                      style={{
                        padding: '10px 18px',
                        fontSize: '0.88rem'
                      }}
                    >
                      {flowerDialog.switchToMeText}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
