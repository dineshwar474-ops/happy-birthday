import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Copy, Check, Send } from 'lucide-react';
import { gift } from '../data/gift';

export default function GoldenChance({ request, setRequest, onNext }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!request.trim()) {
      setErrorMsg('Please write your one wish first...');
      return;
    }

    setIsSubmitted(true);

    confetti({
      particleCount: 65,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#D4AF37', '#F6E7C8', '#FFF8F1', '#D88C9A'],
      scalar: 1.1
    });
  };

  const formattedWhatsAppMessage = `Hey! For my birthday gift, my one golden chance request is: "${request}" 🎁✨`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(formattedWhatsAppMessage)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedWhatsAppMessage).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <motion.main
      className="golden-chance-screen"
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
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            /* SCREEN 9: THE GOLDEN CHANCE INPUT */
            <motion.div
              key="input-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
              transition={{ duration: 0.7 }}
              className="glass-panel-gold"
              style={{
                padding: 'clamp(36px, 6vw, 56px) clamp(24px, 5vw, 44px)',
                position: 'relative'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-champagne)',
                  opacity: 0.9,
                  display: 'block',
                  marginBottom: '12px'
                }}
              >
                ✦ A Rare Opportunity ✦
              </span>

              <h2
                className="font-serif text-glow-gold"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 2.9rem)',
                  fontWeight: 400,
                  color: 'var(--color-cream)',
                  lineHeight: '1.3',
                  marginBottom: '10px'
                }}
              >
                You have one golden chance.
              </h2>

              <p
                className="font-serif"
                style={{
                  fontSize: 'clamp(1.2rem, 3.2vw, 1.55rem)',
                  fontStyle: 'italic',
                  color: 'var(--color-champagne)',
                  marginBottom: '32px'
                }}
              >
                {gift.promptText}
              </p>

              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <div style={{ position: 'relative', marginBottom: '18px' }}>
                  <textarea
                    rows={3}
                    value={request}
                    onChange={(e) => {
                      setRequest(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder={gift.placeholder}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      borderRadius: '16px',
                      background: 'rgba(23, 15, 28, 0.65)',
                      border: '1px solid rgba(212, 175, 55, 0.4)',
                      color: 'var(--color-cream)',
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.3rem',
                      lineHeight: '1.5',
                      outline: 'none',
                      resize: 'none',
                      boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.4)',
                      transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(212, 175, 55, 0.85)';
                      e.target.style.boxShadow = '0 0 15px rgba(212, 175, 55, 0.25), inset 0 2px 10px rgba(0, 0, 0, 0.4)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(212, 175, 55, 0.4)';
                      e.target.style.boxShadow = 'inset 0 2px 10px rgba(0, 0, 0, 0.4)';
                    }}
                  />
                </div>

                {errorMsg && (
                  <p
                    style={{
                      color: 'var(--color-rose)',
                      fontSize: '0.9rem',
                      marginBottom: '16px',
                      fontFamily: 'var(--font-sans)'
                    }}
                  >
                    {errorMsg}
                  </p>
                )}

                <p
                  className="font-serif"
                  style={{
                    fontSize: '1.1rem',
                    fontStyle: 'italic',
                    color: 'var(--color-blush)',
                    marginBottom: '28px',
                    opacity: 0.9
                  }}
                >
                  Remember... only one gift. 👀
                </p>

                <button
                  type="submit"
                  className="btn-primary btn-gold"
                  style={{ padding: '16px 42px', fontSize: '1.2rem' }}
                >
                  Make my request ✦
                </button>
              </form>
            </motion.div>
          ) : (
            /* SCREEN 10: THE GOLDEN PROMISE & TAMIL DISCLOSURE */
            <motion.div
              key="promise-reveal"
              initial={{ opacity: 0, scale: 0.92, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel-gold"
              style={{
                padding: 'clamp(36px, 6vw, 56px) clamp(24px, 5vw, 44px)',
                position: 'relative'
              }}
            >
              <span
                className="font-serif"
                style={{
                  fontSize: '1.3rem',
                  fontStyle: 'italic',
                  color: 'var(--color-blush)',
                  display: 'block',
                  marginBottom: '8px'
                }}
              >
                Well...
              </span>

              <h2
                className="font-serif text-glow-gold"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 2.7rem)',
                  color: 'var(--color-champagne)',
                  fontWeight: 400,
                  marginBottom: '20px'
                }}
              >
                You used your one golden chance.
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--color-rose)',
                  marginBottom: '12px'
                }}
              >
                You asked for:
              </p>

              {/* The Request Highlight Card */}
              <div
                style={{
                  background: 'rgba(23, 15, 28, 0.85)',
                  border: '1px solid rgba(212, 175, 55, 0.6)',
                  borderRadius: '16px',
                  padding: '20px 24px',
                  margin: '0 auto 24px',
                  boxShadow: '0 8px 30px rgba(212, 175, 55, 0.2), inset 0 0 20px rgba(212, 175, 55, 0.05)'
                }}
              >
                <p
                  className="font-serif text-glow"
                  style={{
                    fontSize: 'clamp(1.35rem, 3.5vw, 1.85rem)',
                    color: 'var(--color-cream)',
                    fontStyle: 'italic',
                    lineHeight: '1.5'
                  }}
                >
                  "{request}"
                </p>
              </div>

              <p
                className="font-serif text-glow-gold"
                style={{
                  fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                  color: 'var(--color-cream)',
                  marginBottom: '24px'
                }}
              >
                And I said I'd say yes. ✨
              </p>

              {/* Sarcastic Tamil Notice Box */}
              <div
                style={{
                  padding: '20px 22px',
                  borderRadius: '16px',
                  background: 'rgba(216, 140, 154, 0.12)',
                  border: '1px dashed rgba(212, 175, 55, 0.6)',
                  marginBottom: '28px',
                  textAlign: 'center'
                }}
              >
                <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '6px' }}>
                  👀
                </span>
                <p
                  className="font-serif"
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: 'var(--color-rose)',
                    marginBottom: '8px'
                  }}
                >
                  "Time illatha kaaranathinaal idhu develop panavillai!" 😂
                </p>
                <p
                  className="font-serif"
                  style={{
                    fontSize: '1.12rem',
                    color: 'var(--color-cream)',
                    lineHeight: '1.6',
                    marginBottom: '16px'
                  }}
                >
                  Wait, database-ku request send aayiruchu nu ninaichiya? Inga backend server ellam kedaiyathu Mental!
                  Idha copy panni enakku WhatsApp-la send pannu, appo dhaan un gift confirm aagum! 😌
                </p>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="btn-secondary"
                    style={{ fontSize: '0.9rem', padding: '10px 20px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copied to Clipboard! ✓' : 'Copy Request'}
                  </button>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary btn-gold"
                    style={{ fontSize: '0.9rem', padding: '10px 20px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Send size={15} /> Send to WhatsApp ✦
                  </a>
                </div>
              </div>

              <div>
                <button onClick={onNext} className="btn-primary btn-gold" style={{ padding: '15px 40px' }}>
                  One last mystery... ✦
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.main>
  );
}
