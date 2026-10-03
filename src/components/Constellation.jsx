import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { memories, herMemories } from '../data/memories';
import MemoryStar from './MemoryStar';
import confetti from 'canvas-confetti';
import { Sparkles, X } from 'lucide-react';
import { useMode } from '../context/ModeContext';

export default function Constellation({ onNext }) {
  const { isHerMode } = useMode();
  const activeMemories = isHerMode ? herMemories : memories;

  const [openedStars, setOpenedStars] = useState(new Set());
  const [activeMemory, setActiveMemory] = useState(null);

  const allOpened = openedStars.size === activeMemories.length;

  const handleStarClick = (memory) => {
    setOpenedStars((prev) => new Set([...prev, memory.id]));
    setActiveMemory(memory);

    // Mini starburst particles at diamond location
    confetti({
      particleCount: 16,
      spread: 65,
      origin: { x: memory.x / 100, y: memory.y / 100 },
      colors: ['#F6E7C8', '#D88C9A', '#D4AF37', '#FFF8F1'],
      disableForReducedMotion: true,
      scalar: 0.75
    });
  };

  // Lines to draw between adjacent diamonds as they get opened
  const pairs = activeMemories.map((m, idx) => [
    m.id,
    activeMemories[(idx + 1) % activeMemories.length].id
  ]);

  return (
    <motion.main
      className="constellation-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', transition: { duration: 0.8 } }}
      style={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '30px 20px',
        overflow: 'hidden',
        zIndex: 10
      }}
    >
      {/* Top Header */}
      <div style={{ textAlign: 'center', zIndex: 20, marginTop: '20px' }}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.85rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: isHerMode ? 'var(--color-gold)' : 'var(--color-rose)'
          }}
        >
          {isHerMode ? "✦ The Constellation of Sri Dhanya ✦" : "✦ Celestial Diamonds ✦"}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={isHerMode ? "font-serif text-glow-gold" : "font-serif text-glow"}
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 2.8rem)',
            fontWeight: 400,
            color: 'var(--color-cream)',
            marginTop: '8px'
          }}
        >
          {isHerMode ? "4 quiet truths noticed about you." : "A few things quietly noticed about you."}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.15rem',
            fontStyle: 'italic',
            color: 'var(--color-champagne)',
            marginTop: '6px'
          }}
        >
          {isHerMode 
            ? `Hidden diamonds in the night sky. (${openedStars.size}/${activeMemories.length} revealed)`
            : `Unspoken observations hidden across the night sky. (${openedStars.size}/${activeMemories.length} revealed)`}
        </motion.p>
      </div>

      {/* Interactive Constellation Sky Area with Diamond Nodes */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '750px',
          height: '420px',
          margin: '10px auto'
        }}
      >
        {/* SVG Starlight Constellation Lines */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 10
          }}
        >
          {pairs.map(([fromId, toId], idx) => {
            const starA = activeMemories.find((m) => m.id === fromId);
            const starB = activeMemories.find((m) => m.id === toId);
            if (!starA || !starB) return null;
            const isLineActive = openedStars.has(fromId) && openedStars.has(toId);

            return (
              <line
                key={`line-${idx}`}
                x1={`${starA.x}%`}
                y1={`${starA.y}%`}
                x2={`${starB.x}%`}
                y2={`${starB.y}%`}
                stroke={
                  allOpened
                    ? 'rgba(212, 175, 55, 0.75)'
                    : isLineActive
                    ? 'rgba(246, 231, 200, 0.45)'
                    : 'rgba(243, 198, 204, 0.08)'
                }
                strokeWidth={allOpened ? 2 : isLineActive ? 1.5 : 1}
                strokeDasharray={allOpened ? 'none' : '4 4'}
                style={{
                  transition: 'all 0.8s ease',
                  filter: allOpened ? 'drop-shadow(0 0 6px rgba(212, 175, 55, 0.8))' : 'none'
                }}
              />
            );
          })}
        </svg>

        {/* The Diamond Nodes */}
        {activeMemories.map((memory) => (
          <MemoryStar
            key={memory.id + (isHerMode ? '-her' : '-me')}
            memory={memory}
            isOpened={openedStars.has(memory.id)}
            onClick={() => handleStarClick(memory)}
          />
        ))}
      </div>

      {/* Bottom Completion Card or Guidance */}
      <div style={{ zIndex: 20, marginBottom: '24px', textAlign: 'center', minHeight: '100px' }}>
        <AnimatePresence>
          {allOpened ? (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className="glass-panel-gold"
              style={{
                padding: '22px 32px',
                maxWidth: '520px',
                margin: '0 auto'
              }}
            >
              <h3
                className="font-serif text-glow-gold"
                style={{ fontSize: '1.5rem', color: 'var(--color-champagne)', marginBottom: '6px' }}
              >
                {isHerMode ? "You unlocked all 4 diamonds. ✦" : "You unlocked every diamond."}
              </h3>
              <p
                className="font-serif"
                style={{
                  fontSize: '1.15rem',
                  fontStyle: 'italic',
                  color: 'var(--color-cream)',
                  marginBottom: '16px'
                }}
              >
                {isHerMode 
                  ? "Some truths don't need to be loud to stay in the mind. ✦" 
                  : "Maybe some truths are better left unspoken... but never unnoticed. ✦"}
              </p>
              <button onClick={onNext} className="btn-primary btn-gold">
                Continue to the Jar ✦
              </button>
            </motion.div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  color: 'var(--color-blush)',
                  letterSpacing: '0.05em'
                }}
              >
                ✦ Tap each glowing diamond in the night sky ✦
              </p>
              {openedStars.size > 0 && (
                <button
                  onClick={onNext}
                  className="btn-secondary"
                  style={{ fontSize: '0.9rem', padding: '8px 22px' }}
                >
                  Continue to the Jar ({openedStars.size}/{activeMemories.length}) ✦
                </button>
              )}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Diamond Modal */}
      <AnimatePresence>
        {activeMemory && (
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
            onClick={() => setActiveMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={activeMemory.isEasterEgg ? 'glass-panel-gold' : 'glass-panel'}
              style={{
                maxWidth: '520px',
                maxHeight: '88vh',
                overflowY: 'auto',
                width: '100%',
                padding: 'clamp(30px, 5vw, 42px) clamp(22px, 5vw, 36px)',
                textAlign: 'center',
                position: 'relative'
              }}
            >
              <button
                onClick={() => setActiveMemory(null)}
                aria-label="Close diamond modal"
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-blush)',
                  cursor: 'pointer',
                  padding: '6px'
                }}
              >
                <X size={18} />
              </button>

              <div style={{ color: 'var(--color-gold)', marginBottom: '14px', fontSize: '1.2rem' }}>
                ◇
              </div>

              <h4
                className="font-serif"
                style={{
                  fontSize: '1.25rem',
                  color: 'var(--color-champagne)',
                  letterSpacing: '0.05em',
                  marginBottom: '16px'
                }}
              >
                {activeMemory.title}
              </h4>

              <p
                className="font-serif text-glow"
                style={{
                  fontSize: '1.45rem',
                  lineHeight: '1.6',
                  color: 'var(--color-cream)',
                  whiteSpace: 'pre-line',
                  fontStyle: 'italic',
                  marginBottom: '18px'
                }}
              >
                "{activeMemory.text}"
              </p>

              {activeMemory.isEasterEgg && activeMemory.secretNote && (
                <div
                  style={{
                    margin: '18px 0',
                    padding: '14px',
                    borderRadius: '12px',
                    background: 'rgba(212, 175, 55, 0.12)',
                    border: '1px solid rgba(212, 175, 55, 0.35)',
                    color: 'var(--color-champagne)',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.1rem',
                    fontStyle: 'italic'
                  }}
                >
                  {activeMemory.secretNote}
                </div>
              )}

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.82rem',
                  color: 'rgba(243, 198, 204, 0.65)',
                  letterSpacing: '0.04em',
                  marginBottom: '20px'
                }}
              >
                {activeMemory.subtext}
              </p>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button
                  onClick={() => setActiveMemory(null)}
                  className="btn-secondary"
                  style={{ fontSize: '0.9rem', padding: '8px 18px' }}
                >
                  Keep stargazing ✦
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
