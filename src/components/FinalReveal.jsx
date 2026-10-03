import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../data/config';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, Copy, Check, Send } from 'lucide-react';
import { useMode } from '../context/ModeContext';

export default function FinalReveal({ request, onRestart }) {
  const { isHerMode } = useMode();
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [copied, setCopied] = useState(false);

  const formattedWhatsAppMessage = request
    ? (isHerMode
        ? `Hey! For my birthday gift, my special wish is: "${request}" 🎁🌸✨`
        : `Hey! For my birthday gift, my one golden chance request from the main character is: "${request}" 🎁✨`)
    : (isHerMode
        ? `Hey! I went through the Sri Dhanya celebration website, it was breathtaking! 🎁🌸✨`
        : `Hey! I went through your website, Mental! 🎁✨`);

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(formattedWhatsAppMessage)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedWhatsAppMessage).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleConfirm = () => {
    setHasConfirmed(true);

    confetti({
      particleCount: 70,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#F6E7C8', '#D88C9A', '#9C82B8', '#FFF8F1', '#D4AF37'],
      scalar: 1.1
    });
  };

  return (
    <motion.main
      className="final-reveal-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(8px)' }}
      transition={{ duration: 1.1 }}
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div style={{ maxWidth: '620px', width: '100%', margin: '0 auto' }}>
        <AnimatePresence mode="wait">
          {!hasConfirmed ? (
            <motion.div
              key="question-box"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
              transition={{ duration: 0.8 }}
              className={isHerMode ? "glass-panel-gold" : "glass-panel"}
              style={{
                padding: 'clamp(40px, 8vw, 68px) clamp(24px, 6vw, 48px)',
                position: 'relative'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: isHerMode ? 'var(--color-gold)' : 'var(--color-rose)',
                  opacity: 0.9,
                  display: 'block',
                  marginBottom: '16px'
                }}
              >
                {isHerMode ? "✦ A Whisper to Carry Forever ✦" : "✦ The Final Verdict ✦"}
              </span>

              <h2
                className="font-serif text-glow"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: 300,
                  color: 'var(--color-cream)',
                  lineHeight: '1.35',
                  marginBottom: '16px'
                }}
              >
                {isHerMode ? "One last quiet truth, Sri Dhanya..." : "One last question..."}
              </h2>

              <p
                className="font-serif"
                style={{
                  fontSize: 'clamp(1.25rem, 3.5vw, 1.6rem)',
                  fontStyle: 'italic',
                  color: 'var(--color-champagne)',
                  marginBottom: '44px'
                }}
              >
                {isHerMode
                  ? "Do you realize the quiet, breathtaking magic you bring into this world simply by being yourself?"
                  : "Did you really have any doubt about who made this for you?"}
              </p>

              <div>
                <button
                  onClick={handleConfirm}
                  className="btn-primary btn-gold"
                  style={{ padding: '16px 42px', fontSize: '1.2rem' }}
                >
                  {isHerMode ? "Unfold My Celebration 🌸" : "Obviously it's you, Mental 👀"}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="answer-box"
              initial={{ opacity: 0, scale: 0.94, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel"
              style={{
                padding: 'clamp(36px, 6vw, 56px) clamp(20px, 5vw, 42px)',
                position: 'relative',
                background: 'linear-gradient(175deg, rgba(42, 23, 42, 0.88) 0%, rgba(23, 15, 28, 0.98) 100%)',
                border: '1px solid rgba(246, 231, 200, 0.3)'
              }}
            >
              <div style={{ color: 'var(--color-champagne)', fontSize: '1.4rem', marginBottom: '18px' }}>
                {isHerMode ? "🌸 ✦ 👑" : "✦"}
              </div>

              {isHerMode ? (
                /* HER MODE FINALE: Lingering, tender, soulful */
                <div
                  className="font-serif"
                  style={{
                    fontSize: 'clamp(1.3rem, 3.5vw, 1.6rem)',
                    lineHeight: '1.85',
                    color: 'var(--color-cream)',
                    fontStyle: 'italic',
                    marginBottom: '26px'
                  }}
                >
                  <p style={{ marginBottom: '14px', color: 'var(--color-champagne)', fontWeight: 600 }}>
                    To Sri Dhanya, Mental today and always... 🌸
                  </p>
                  <p style={{ marginBottom: '18px', color: 'var(--color-cream)' }}>
                    There is only one true star in this universe today, and that will always be you.
                    Never doubt your worth, your beauty, or the gentle light you bring into every life you touch.
                  </p>
                  <p style={{ color: 'var(--color-blush)' }}>
                    May your year be filled with victories on the court, endless laughter that leaves you breathless,
                    gentle peace in your heart, and every dream fulfilled.
                  </p>
                </div>
              ) : (
                /* MAIN CHARACTER FINALE */
                <div
                  className="font-serif"
                  style={{
                    fontSize: 'clamp(1.3rem, 3.5vw, 1.6rem)',
                    lineHeight: '1.8',
                    color: 'var(--color-cream)',
                    fontStyle: 'italic',
                    marginBottom: '26px'
                  }}
                >
                  <p style={{ marginBottom: '14px' }}>Of course it's me.</p>
                  <p style={{ marginBottom: '18px', color: 'var(--color-champagne)' }}>
                    Who else in this entire world has the elite talent, the god-tier patience,
                    and the good looks to build something this legendary for you?
                  </p>
                  <p style={{ color: 'var(--color-blush)' }}>
                    You are officially welcome for having the ultimate main character in your life.
                  </p>
                </div>
              )}

              <div
                style={{
                  height: '1px',
                  width: '60px',
                  background: 'linear-gradient(90deg, transparent, var(--color-champagne), transparent)',
                  margin: '20px auto'
                }}
              />

              <h3
                className="font-serif text-glow-rose"
                style={{
                  fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
                  color: 'var(--color-champagne)',
                  fontWeight: 500,
                  marginBottom: '10px'
                }}
              >
                Happy Birthday, {CONFIG.HER_NAME}. ♡
              </h3>

              <p
                className="font-serif"
                style={{
                  fontSize: '1.15rem',
                  fontStyle: 'italic',
                  color: 'var(--color-blush)',
                  marginBottom: '20px'
                }}
              >
                {isHerMode
                  ? "(Keep this smile tucked inside your heart today. You are so deeply cherished.)"
                  : "(Now go win those tournaments, eat some healthy food, and thank me for existing, Mental.)"}
              </p>

              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.05rem',
                  color: 'var(--color-champagne)',
                  opacity: 0.85,
                  fontStyle: 'italic',
                  marginBottom: '32px'
                }}
              >
                {isHerMode
                  ? "— built with pure admiration, gentle care, and heartfelt warmth for you"
                  : "— from the undisputed main character in your daily life"}
              </p>

              {/* Sarcastic Tamil Notice for Golden Request */}
              <div
                style={{
                  borderRadius: '16px',
                  padding: '20px 22px',
                  background: 'rgba(216, 140, 154, 0.12)',
                  border: '1px dashed rgba(212, 175, 55, 0.65)',
                  marginBottom: '32px',
                  textAlign: 'center'
                }}
              >
                <span style={{ fontSize: '1.6rem', display: 'block', marginBottom: '6px' }}>
                  👀 ⚠️
                </span>

                <h4
                  className="font-serif text-glow-gold"
                  style={{
                    fontSize: '1.35rem',
                    color: 'var(--color-champagne)',
                    marginBottom: '8px'
                  }}
                >
                  Crucial Notice for Mental!
                </h4>

                <p
                  className="font-serif"
                  style={{
                    fontSize: '1.3rem',
                    color: 'var(--color-rose)',
                    fontWeight: 700,
                    marginBottom: '10px'
                  }}
                >
                  "Time illatha kaaranathinaal idhu develop panavillai!" 😂
                </p>

                <p
                  className="font-serif"
                  style={{
                    fontSize: '1.12rem',
                    lineHeight: '1.6',
                    color: 'var(--color-cream)',
                    marginBottom: '16px'
                  }}
                >
                  If you typed your one golden request and clicked 'Make my request'...
                  did you seriously think I built an entire database server for this?
                  Inga backend ellam kedaiyathu! 
                  So un request-ah copy panni enakku WhatsApp-la send pannu,
                  illana un wish kanavula dhaan nadakkum! 😌
                </p>

                {request ? (
                  <div
                    style={{
                      background: 'rgba(23, 15, 28, 0.8)',
                      border: '1px solid rgba(212, 175, 55, 0.4)',
                      borderRadius: '12px',
                      padding: '12px 18px',
                      marginBottom: '16px'
                    }}
                  >
                    <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-champagne)', display: 'block', marginBottom: '4px' }}>
                      Your Birthday Request:
                    </span>
                    <p style={{ fontStyle: 'italic', color: 'var(--color-cream)', fontSize: '1.2rem' }}>
                      "{request}"
                    </p>
                  </div>
                ) : null}

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={handleCopy}
                    className="btn-secondary"
                    style={{
                      fontSize: '0.9rem',
                      padding: '10px 20px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copied to Clipboard! ✓' : 'Copy Request'}
                  </button>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary btn-gold"
                    style={{
                      fontSize: '0.9rem',
                      padding: '10px 22px',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Send size={15} /> Send to WhatsApp ✦
                  </a>
                </div>
              </div>

              <div>
                <button
                  onClick={onRestart}
                  className="btn-secondary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.95rem'
                  }}
                >
                  <RotateCcw size={15} /> Relive the surprise ✦
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.main>
  );
}
