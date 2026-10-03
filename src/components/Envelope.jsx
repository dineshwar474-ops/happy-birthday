import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Mail, Sparkles } from 'lucide-react';
import { useMode } from '../context/ModeContext';

export default function Envelope({ onOpen }) {
  const { isHerMode } = useMode();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenClick = () => {
    if (isOpen) return;
    setIsOpen(true);

    confetti({
      particleCount: 35,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F6E7C8', '#D4AF37', '#FFF8F1', '#D88C9A'],
      scalar: 0.9
    });

    // Allow envelope animation to play before transitioning to the full letter
    setTimeout(() => {
      onOpen();
    }, 1500);
  };

  return (
    <motion.main
      className="envelope-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)', transition: { duration: 0.9 } }}
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
      <div style={{ maxWidth: '560px', width: '100%', margin: '0 auto' }}>
        {/* Intro Text */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '32px' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: isHerMode ? 'var(--color-gold)' : 'var(--color-rose)',
              opacity: 0.85,
              display: 'block',
              marginBottom: '10px'
            }}
          >
            {isHerMode ? "✦ Sealed with Pure Love ✦" : "✦ A Secret Sealed ✦"}
          </span>
          <h2
            className={isHerMode ? "font-serif text-glow-gold" : "font-serif text-glow"}
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 400,
              color: 'var(--color-cream)',
              lineHeight: 1.3,
              marginBottom: '16px'
            }}
          >
            {isHerMode ? "A Letter for Mental." : "There is one last thing."}
          </h2>
          <p
            className="font-serif"
            style={{
              fontSize: 'clamp(1.15rem, 3vw, 1.4rem)',
              fontStyle: 'italic',
              color: 'var(--color-champagne)',
              lineHeight: '1.6',
              maxWidth: '440px',
              margin: '0 auto'
            }}
          >
            {isHerMode ? (
              <>
                Written with genuine admiration,<br />
                pride, and warmth...<br />
                <span style={{ fontSize: '1.05rem', color: 'var(--color-blush)', opacity: 0.95 }}>
                  Just for Sri Dhanya. ♡
                </span>
              </>
            ) : (
              <>
                I could have simply said<br />
                "Happy Birthday."<br />
                <span style={{ fontSize: '1.05rem', color: 'var(--color-blush)', opacity: 0.9 }}>
                  But where's the fun in that?
                </span>
              </>
            )}
          </p>
        </motion.div>

        {/* The Luxury Envelope Visual */}
        <div
          style={{
            position: 'relative',
            width: '280px',
            height: '190px',
            margin: '0 auto 36px',
            perspective: '1000px'
          }}
        >
          {/* Back Paper (Slides out when opened) */}
          <motion.div
            animate={
              isOpen
                ? {
                    y: -100,
                    scale: 1.05,
                    opacity: 1,
                    boxShadow: '0 0 30px rgba(246, 231, 200, 0.6)'
                  }
                : { y: 0, opacity: 0.6 }
            }
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              top: '10px',
              left: '20px',
              right: '20px',
              height: '160px',
              background: '#FFF8F1',
              borderRadius: '6px',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              zIndex: isOpen ? 12 : 1,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                width: '60%',
                height: '2px',
                background: 'rgba(216, 140, 154, 0.4)',
                marginBottom: '8px'
              }}
            />
            <div
              style={{
                width: '80%',
                height: '2px',
                background: 'rgba(216, 140, 154, 0.25)',
                marginBottom: '8px'
              }}
            />
            <div
              style={{
                width: '50%',
                height: '2px',
                background: 'rgba(216, 140, 154, 0.25)'
              }}
            />
          </motion.div>

          {/* Envelope Pocket */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '12px',
              background: 'linear-gradient(145deg, #2A172A 0%, #1A0D1C 100%)',
              border: '1px solid rgba(246, 231, 200, 0.3)',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(212, 175, 55, 0.1)',
              zIndex: 5,
              overflow: 'hidden'
            }}
          >
            {/* Pocket diagonal folds */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: 0,
                height: 0,
                borderStyle: 'solid',
                borderWidth: '95px 0 0 140px',
                borderColor: 'transparent transparent transparent rgba(243, 198, 204, 0.08)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 0,
                height: 0,
                borderStyle: 'solid',
                borderWidth: '0 0 95px 140px',
                borderColor: 'transparent transparent rgba(243, 198, 204, 0.08) transparent'
              }}
            />
          </div>

          {/* Envelope Top Flap (Triangular fold that flips open) */}
          <motion.div
            animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 6 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100px',
              transformOrigin: 'top center',
              zIndex: 6
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderStyle: 'solid',
                borderWidth: '95px 140px 0 140px',
                borderColor: 'rgba(42, 23, 42, 0.95) transparent transparent transparent',
                filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))'
              }}
            />
          </motion.div>

          {/* Golden Wax Seal on Flap */}
          <motion.div
            animate={
              isOpen
                ? { scale: 0, opacity: 0 }
                : { scale: 1, opacity: 1 }
            }
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute',
              top: '80px',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #F6E7C8 0%, #D4AF37 70%, #997819 100%)',
              boxShadow: '0 0 12px rgba(212, 175, 55, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#170F1C',
              fontSize: '1rem',
              zIndex: 10
            }}
          >
            ✦
          </motion.div>
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={handleOpenClick}
            disabled={isOpen}
            className="btn-primary btn-gold"
            style={{ padding: '16px 42px', fontSize: '1.2rem' }}
          >
            {isOpen 
              ? 'Unfolding... ✉' 
              : (isHerMode ? "Open Sri Dhanya's letter 💌" : 'Open the letter ✉')}
          </button>
        </div>
      </div>
    </motion.main>
  );
}
