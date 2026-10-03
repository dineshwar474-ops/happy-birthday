import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Gift } from 'lucide-react';
import { useMode } from '../context/ModeContext';

export default function GiftReveal({ onNext }) {
  const { isHerMode } = useMode();
  const [stage, setStage] = useState(0);

  // Timed dramatic progression
  useEffect(() => {
    // Stage 0: "My gift for you is..."
    const t1 = setTimeout(() => setStage(1), 2200); // Stage 1: "...my answer will be YES."
    const t2 = setTimeout(() => setStage(2), 4800); // Stage 2: "Today, you have a golden chance."
    const t3 = setTimeout(() => setStage(3), 7400); // Stage 3: The Rule & The Glowing Golden Box

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleOpenChance = () => {
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#F6E7C8', '#FFF8F1', '#D88C9A'],
      scalar: 1
    });
    onNext();
  };

  return (
    <motion.main
      className="gift-reveal-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)', transition: { duration: 0.8 } }}
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px 24px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div style={{ maxWidth: '600px', width: '100%', margin: '0 auto' }}>
        {/* Stage 0 & 1: Dramatic opening lines */}
        <div style={{ minHeight: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif"
            style={{
              fontSize: 'clamp(1.5rem, 3.8vw, 2.1rem)',
              color: 'var(--color-blush)',
              fontStyle: 'italic',
              marginBottom: '14px'
            }}
          >
            {isHerMode ? "Because today belongs entirely to you..." : "My gift for you is..."}
          </motion.p>

          <AnimatePresence>
            {stage >= 1 && (
              <motion.h2
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-glow-gold"
                style={{
                  fontSize: 'clamp(2.3rem, 6vw, 3.6rem)',
                  fontWeight: 600,
                  color: 'var(--color-champagne)',
                  letterSpacing: '0.03em'
                }}
              >
                {isHerMode ? "my answer will always be YES." : "my answer will be YES."}
              </motion.h2>
            )}
          </AnimatePresence>
        </div>

        {/* Stage 2: Golden chance announcement */}
        <AnimatePresence>
          {stage >= 2 && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif"
              style={{
                fontSize: 'clamp(1.2rem, 3.2vw, 1.55rem)',
                fontStyle: 'italic',
                color: 'var(--color-cream)',
                margin: '20px 0 28px'
              }}
            >
              {isHerMode ? "Today, you have one golden birthday wish." : "Today, you have a golden chance."}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Stage 3: The Golden Gift Box & Rules */}
        <AnimatePresence>
          {stage >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: isHerMode ? 'var(--color-gold)' : 'var(--color-rose)',
                  marginBottom: '12px'
                }}
              >
                {isHerMode ? "A Privilege for Mental..." : "There's only one rule..."}
              </p>

              <h3
                className="font-serif text-glow"
                style={{
                  fontSize: 'clamp(1.8rem, 4.5vw, 2.5rem)',
                  fontWeight: 500,
                  color: 'var(--color-champagne)',
                  lineHeight: '1.3',
                  marginBottom: '8px'
                }}
              >
                {isHerMode ? "You get to ask for ONE special gift." : "You get to ask me for ONE gift."}
              </h3>

              <p
                className="font-serif"
                style={{
                  fontSize: '1.25rem',
                  fontStyle: 'italic',
                  color: 'var(--color-blush)',
                  marginBottom: '32px'
                }}
              >
                {isHerMode ? "Whatever your heart desires! ✨" : "Only one. ✨"}
              </p>

              {/* Glowing Golden Gift Box */}
              <motion.div
                whileHover={{ scale: 1.06, rotate: 1 }}
                style={{
                  position: 'relative',
                  width: '180px',
                  height: '180px',
                  margin: '0 auto 36px',
                  cursor: 'pointer'
                }}
                onClick={handleOpenChance}
              >
                {/* Glow ring */}
                <motion.div
                  animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.35, 0.7, 0.35]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    inset: -15,
                    borderRadius: '28px',
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.45) 0%, transparent 70%)',
                    filter: 'blur(10px)',
                    zIndex: 0
                  }}
                />

                {/* Box container */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '24px',
                    background: 'linear-gradient(135deg, #F6E7C8 0%, #D4AF37 50%, #947116 100%)',
                    border: '1px solid rgba(255, 248, 241, 0.5)',
                    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.5), inset 0 0 25px rgba(255, 255, 255, 0.3)',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}
                >
                  {/* Vertical Ribbon */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      width: '32px',
                      background: 'linear-gradient(90deg, #D88C9A 0%, #F3C6CC 50%, #D88C9A 100%)',
                      boxShadow: '0 0 10px rgba(216, 140, 154, 0.5)',
                      zIndex: 3
                    }}
                  />
                  {/* Horizontal Ribbon */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      height: '32px',
                      background: 'linear-gradient(180deg, #D88C9A 0%, #F3C6CC 50%, #D88C9A 100%)',
                      boxShadow: '0 0 10px rgba(216, 140, 154, 0.5)',
                      zIndex: 3
                    }}
                  />

                  {/* Ribbon Bow Center */}
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 4,
                      width: '54px',
                      height: '54px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, #FFF8F1 0%, #F3C6CC 50%, #D88C9A 100%)',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3), 0 0 12px rgba(246, 231, 200, 0.8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#170F1C',
                      fontSize: '1.3rem'
                    }}
                  >
                    ✦
                  </div>
                </div>
              </motion.div>

              <button
                onClick={handleOpenChance}
                className="btn-primary btn-gold"
                style={{ padding: '16px 44px', fontSize: '1.2rem' }}
              >
                {isHerMode ? "Make your birthday wish 🌸" : "Open your chance ✦"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.main>
  );
}
