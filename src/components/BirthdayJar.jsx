import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wishes, herWishes } from '../data/wishes';
import confetti from 'canvas-confetti';
import { Sparkles, X, ChevronRight } from 'lucide-react';
import { useMode } from '../context/ModeContext';

export default function BirthdayJar({ onNext }) {
  const { isHerMode } = useMode();
  const activeWishes = isHerMode ? herWishes : wishes;

  const [openedNotes, setOpenedNotes] = useState(new Set());
  const [activeWish, setActiveWish] = useState(null);

  const handleNoteClick = (wish) => {
    setOpenedNotes((prev) => new Set([...prev, wish.id]));
    setActiveWish(wish);

    confetti({
      particleCount: 22,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#F3C6CC', '#D88C9A', '#F6E7C8', '#D4AF37'],
      scalar: 0.8
    });
  };

  const handleModalContinue = () => {
    setActiveWish(null);
    onNext();
  };

  // Fixed visual offsets for the notes resting inside the jar
  const notePlacements = [
    { rotate: -14, x: -35, y: -20, width: 62 },
    { rotate: 18, x: 30, y: -15, width: 58 },
    { rotate: -6, x: 2, y: 15, width: 64 },
    { rotate: 25, x: -28, y: 45, width: 60 },
    { rotate: -20, x: 28, y: 50, width: 66 },
    { rotate: 8, x: -5, y: 75, width: 62 }
  ];

  return (
    <motion.main
      className="jar-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(8px)', transition: { duration: 0.7 } }}
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px 20px',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div style={{ maxWidth: '580px', width: '100%', margin: '0 auto', textAlign: 'center' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '20px' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: isHerMode ? 'var(--color-gold)' : 'var(--color-rose)',
              opacity: 0.85
            }}
          >
            {isHerMode ? "✦ Vessel of Blessings ✦" : "✦ Keepsake Vessel ✦"}
          </span>
          <h2
            className={isHerMode ? "font-serif text-glow-gold" : "font-serif text-glow"}
            style={{
              fontSize: 'clamp(2rem, 5vw, 2.8rem)',
              fontWeight: 400,
              color: 'var(--color-cream)',
              marginTop: '6px'
            }}
          >
            {isHerMode ? "Heartfelt wishes for Mental..." : "A few thoughts for you..."}
          </h2>
          <p
            className="font-serif"
            style={{
              fontSize: '1.2rem',
              fontStyle: 'italic',
              color: 'var(--color-champagne)',
              marginTop: '4px'
            }}
          >
            {isHerMode ? "Pick any folded blessing inside." : "Pick one."}
          </p>
        </motion.div>

        {/* The Glass Jar Vessel */}
        <div
          style={{
            position: 'relative',
            width: '240px',
            height: '290px',
            margin: '0 auto 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Jar Lid */}
          <div
            style={{
              position: 'absolute',
              top: '4px',
              width: '120px',
              height: '22px',
              borderRadius: '8px 8px 3px 3px',
              background: 'linear-gradient(180deg, #F6E7C8 0%, #D4AF37 100%)',
              boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)',
              zIndex: 5
            }}
          />
          {/* Jar Neck Rim */}
          <div
            style={{
              position: 'absolute',
              top: '22px',
              width: '140px',
              height: '14px',
              borderRadius: '4px',
              background: 'rgba(255, 248, 241, 0.25)',
              border: '1px solid rgba(243, 198, 204, 0.3)',
              backdropFilter: 'blur(8px)',
              zIndex: 4
            }}
          />

          {/* Glass Jar Body */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '210px',
              height: '260px',
              borderRadius: '35px 35px 50px 50px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(42, 23, 42, 0.4) 50%, rgba(216, 140, 154, 0.1) 100%)',
              border: '2px solid rgba(243, 198, 204, 0.35)',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.45), inset 0 0 25px rgba(246, 231, 200, 0.15)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Glass reflection highlight */}
            <div
              style={{
                position: 'absolute',
                top: '15px',
                left: '14px',
                width: '16px',
                height: '200px',
                borderRadius: '8px',
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.02) 100%)',
                pointerEvents: 'none',
                zIndex: 6
              }}
            />

            {/* Glowing Notes Inside Jar */}
            {activeWishes.map((wish, index) => {
              const layout = notePlacements[index] || { rotate: 0, x: 0, y: 0, width: 60 };
              const isOpened = openedNotes.has(wish.id);

              return (
                <motion.button
                  key={wish.id + (isHerMode ? '-her' : '-me')}
                  onClick={() => handleNoteClick(wish)}
                  whileHover={{ scale: 1.15, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Open note: ${wish.tag}`}
                  style={{
                    position: 'absolute',
                    transform: `translate(${layout.x}px, ${layout.y}px) rotate(${layout.rotate}deg)`,
                    width: `${layout.width}px`,
                    height: '32px',
                    borderRadius: '8px',
                    background: isOpened
                      ? 'rgba(216, 140, 154, 0.35)'
                      : `linear-gradient(135deg, ${wish.color} 0%, #D88C9A 100%)`,
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    boxShadow: isOpened
                      ? '0 0 8px rgba(216, 140, 154, 0.3)'
                      : '0 4px 14px rgba(212, 175, 55, 0.5)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isOpened ? 'rgba(255, 255, 255, 0.7)' : '#170F1C',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    outline: 'none',
                    zIndex: 10,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span>{isOpened ? '✦' : '✉'}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Progress & Always-Accessible Continue Area */}
        <div style={{ marginTop: '10px' }}>
          {openedNotes.size >= 3 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel"
              style={{
                padding: '18px 24px',
                border: '1px solid rgba(246, 231, 200, 0.35)',
                maxWidth: '420px',
                margin: '0 auto'
              }}
            >
              <p
                className="font-serif"
                style={{
                  fontSize: '1.25rem',
                  fontStyle: 'italic',
                  color: 'var(--color-cream)',
                  marginBottom: '12px'
                }}
              >
                {isHerMode 
                  ? "So much warmth and blessings in one jar. ✨" 
                  : "Okay... that's enough happiness for one jar. ✨"}
              </p>
              <button onClick={onNext} className="btn-primary btn-gold" style={{ width: '100%' }}>
                {isHerMode ? "Continue to the Letter 🌸" : "Continue to the Secret ✦"}
              </button>
            </motion.div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.88rem',
                  color: 'var(--color-blush)',
                  opacity: 0.8
                }}
              >
                {openedNotes.size === 0
                  ? 'Tap any folded note inside the jar'
                  : `${openedNotes.size} note${openedNotes.size > 1 ? 's' : ''} opened so far...`}
              </p>

              {/* Instant Continue Button so user NEVER gets stuck */}
              <button
                onClick={onNext}
                className="btn-primary"
                style={{
                  padding: '12px 30px',
                  fontSize: '1.05rem',
                  background: openedNotes.size > 0 ? 'rgba(246, 231, 200, 0.15)' : 'rgba(246, 231, 200, 0.08)',
                  borderColor: openedNotes.size > 0 ? 'rgba(246, 231, 200, 0.5)' : 'rgba(246, 231, 200, 0.25)'
                }}
              >
                {openedNotes.size > 0 ? 'Continue ✦' : 'Continue anyway ✦'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Note Unfold Modal */}
      <AnimatePresence>
        {activeWish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(12, 6, 15, 0.82)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100,
              padding: '20px'
            }}
            onClick={() => setActiveWish(null)}
          >
            <motion.div
              initial={{ scale: 0.75, rotate: -4, opacity: 0, y: 30 }}
              animate={{ scale: 1, rotate: 0, opacity: 1, y: 0 }}
              exit={{ scale: 0.75, opacity: 0, y: 20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className={isHerMode ? "glass-panel-gold" : "glass-panel"}
              style={{
                maxWidth: '440px',
                width: '100%',
                padding: '38px 28px',
                textAlign: 'center',
                position: 'relative',
                background: 'linear-gradient(145deg, rgba(42, 23, 42, 0.92), rgba(23, 15, 28, 0.98))',
                border: '1px solid rgba(246, 231, 200, 0.4)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(216, 140, 154, 0.25)'
              }}
            >
              <button
                onClick={() => setActiveWish(null)}
                aria-label="Close note"
                style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-blush)',
                  cursor: 'pointer',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={20} />
              </button>

              <span
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--color-champagne)',
                  marginBottom: '16px'
                }}
              >
                {isHerMode ? "✦ A Birthday Wish for Sri Dhanya ✦" : "✦ A Thought from the Jar ✦"}
              </span>

              <p
                className="font-serif text-glow"
                style={{
                  fontSize: '1.45rem',
                  lineHeight: '1.6',
                  color: 'var(--color-cream)',
                  fontStyle: 'italic',
                  marginBottom: '28px'
                }}
              >
                "{activeWish.message}"
              </p>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setActiveWish(null)}
                  className="btn-secondary"
                  style={{ fontSize: '0.92rem', padding: '10px 20px' }}
                >
                  Pick another note ✦
                </button>
                <button
                  onClick={handleModalContinue}
                  className="btn-primary btn-gold"
                  style={{ fontSize: '0.92rem', padding: '10px 22px' }}
                >
                  Next surprise ✦
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
