import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function IntroScreen({ onNext }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.35,
        delayChildren: 0.3
      }
    },
    exit: {
      opacity: 0,
      scale: 1.08,
      filter: 'blur(12px)',
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.main
      className="intro-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
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
      <div style={{ maxWidth: '580px', width: '100%', margin: '0 auto' }}>
        {/* Mysterious Top Star Symbol */}
        <motion.div variants={itemVariants} style={{ marginBottom: '24px' }}>
          <motion.div
            animate={{
              rotate: [0, 90, 180, 270, 360],
              scale: [1, 1.15, 1]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{ display: 'inline-block', color: 'var(--color-champagne)', fontSize: '1.4rem' }}
          >
            ✦
          </motion.div>
        </motion.div>

        {/* Mysterious Heading */}
        <motion.div variants={itemVariants}>
          <h1
            className="font-serif text-glow"
            style={{
              fontSize: 'clamp(2.4rem, 6.5vw, 4.2rem)',
              fontWeight: 300,
              lineHeight: 1.35,
              letterSpacing: '0.04em',
              color: 'var(--color-cream)',
              marginBottom: '28px'
            }}
          >
            Something<br />
            was left here<br />
            for you.
          </h1>
        </motion.div>

        {/* Lower Star Symbol */}
        <motion.div variants={itemVariants} style={{ marginBottom: '32px' }}>
          <span style={{ color: 'var(--color-rose)', fontSize: '1.2rem', opacity: 0.8 }}>
            ✦
          </span>
        </motion.div>

        {/* Question Subtext */}
        <motion.p
          variants={itemVariants}
          className="font-serif"
          style={{
            fontSize: 'clamp(1.15rem, 2.8vw, 1.45rem)',
            fontStyle: 'italic',
            color: 'var(--color-blush)',
            letterSpacing: '0.06em',
            marginBottom: '42px',
            opacity: 0.9
          }}
        >
          Are you curious?
        </motion.p>

        {/* Enter Button */}
        <motion.div variants={itemVariants}>
          <button
            onClick={onNext}
            className="btn-primary"
            style={{
              padding: '16px 44px',
              fontSize: '1.2rem'
            }}
          >
            Enter ✦
          </button>
        </motion.div>
      </div>
    </motion.main>
  );
}
