import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../data/config';
import { useMode } from '../context/ModeContext';

export default function MysteryQuestion({ onNext }) {
  const { isHerMode } = useMode();
  const [playfulMessage, setPlayfulMessage] = useState(null);

  const handleObviously = () => {
    if (isHerMode) {
      setPlayfulMessage("Keep that sweet smile on your lips, Sri Dhanya... the celebration is only just beginning. 🌸✨");
    } else {
      setPlayfulMessage("I knew you couldn't wait to see what the main character made for you. 👀");
    }
    setTimeout(() => {
      onNext();
    }, 2200);
  };

  const handleYes = () => {
    onNext();
  };

  return (
    <motion.main
      className="mystery-question-screen"
      initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -25, filter: 'blur(10px)', transition: { duration: 0.8 } }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
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
      <div 
        className={isHerMode ? "glass-panel-gold" : "glass-panel"} 
        style={{ 
          maxWidth: '580px', 
          width: '100%', 
          padding: 'clamp(36px, 7vw, 64px) clamp(24px, 5vw, 48px)',
          margin: '0 auto',
          position: 'relative'
        }}
      >
        <span 
          style={{ 
            display: 'block', 
            fontFamily: 'var(--font-serif)', 
            fontSize: '1.25rem', 
            color: 'var(--color-blush)', 
            fontStyle: 'italic',
            letterSpacing: '0.08em',
            marginBottom: '12px' 
          }}
        >
          {isHerMode ? "A Moment Just for You... 🌸" : "Hold on a second..."}
        </span>

        <p 
          style={{ 
            fontFamily: 'var(--font-sans)', 
            fontSize: '0.88rem', 
            color: 'rgba(255, 248, 241, 0.65)', 
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '26px' 
          }}
        >
          {isHerMode ? "Royal Sanctuary Entry" : "Security Clearance Required"}
        </p>

        <h2 
          className={isHerMode ? "font-serif text-glow-gold" : "font-serif text-glow"}
          style={{
            fontSize: 'clamp(1.9rem, 4.8vw, 2.9rem)',
            fontWeight: 300,
            lineHeight: 1.35,
            color: 'var(--color-cream)',
            marginBottom: '40px'
          }}
        >
          {isHerMode ? (
            <>
              Are you ready to step into a universe<br />
              crafted just to make you smile, {CONFIG.HER_NAME}?
            </>
          ) : (
            <>
              Are you the {CONFIG.HER_NAME} who is having a birthday today...<br />
              or did I accidentally send this VIP link to the wrong person?
            </>
          )}
        </h2>

        <AnimatePresence mode="wait">
          {playfulMessage ? (
            <motion.div
              key="tease"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              style={{
                padding: '18px 24px',
                borderRadius: '16px',
                background: 'rgba(216, 140, 154, 0.15)',
                border: '1px solid rgba(216, 140, 154, 0.45)',
                color: 'var(--color-champagne)',
                fontFamily: 'var(--font-serif)',
                fontSize: '1.35rem',
                fontStyle: 'italic'
              }}
            >
              {playfulMessage}
            </motion.div>
          ) : (
            <motion.div
              key="buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                display: 'flex',
                gap: '18px',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}
            >
              <button
                onClick={handleYes}
                className="btn-primary"
                style={{ minWidth: '160px' }}
              >
                {isHerMode ? "Yes, I'm ready 🌸" : "It's me, Mental ✦"}
              </button>

              <button
                onClick={handleObviously}
                className="btn-secondary"
                style={{
                  minWidth: '160px',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.15rem'
                }}
              >
                {isHerMode ? "Make me smile ✨" : "Obviously."}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.main>
  );
}
