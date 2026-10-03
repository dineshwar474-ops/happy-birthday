import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Copy, Check, Send } from 'lucide-react';
import { gift, herGift } from '../data/gift';
import { useMode } from '../context/ModeContext';

export default function GoldenChance({ request, setRequest, onNext }) {
  const { isHerMode } = useMode();
  const activeGift = isHerMode ? herGift : gift;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!request.trim()) {
      setErrorMsg('Please write your wish first...');
      return;
    }

    // Playful check if she asks not to leave office or about WFH/leave
    const lowerReq = request.toLowerCase();
    if (
      lowerReq.includes('office') ||
      lowerReq.includes('poga') ||
      lowerReq.includes('leave') ||
      lowerReq.includes('resign') ||
      lowerReq.includes('wfh') ||
      lowerReq.includes('work from home') ||
      lowerReq.includes('varaikkum') ||
      lowerReq.includes('varaikum')
    ) {
      setErrorMsg("Naan dhaan munnadiyeh sonnen la! 'Office vitu pogakudathu' and 'WFH / leave podakudathu' are THAT'S NOT POSSIBLE! 😂 Vera edhaavathu real gift kelu!");
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

  const formattedWhatsAppMessage = isHerMode
    ? `Hey! For my birthday gift, my special wish is: "${request}" 🎁🌸✨`
    : `Hey! For my birthday gift, my one golden chance request is: "${request}" 🎁✨`;

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
            /* INPUT FORM */
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
                {isHerMode ? "✦ Mental's Privilege ✦" : "✦ A Rare Opportunity ✦"}
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
                {isHerMode ? "Your golden birthday wish." : "You have one golden chance."}
              </h2>

              <p
                className="font-serif"
                style={{
                  fontSize: 'clamp(1.2rem, 3.2vw, 1.55rem)',
                  fontStyle: 'italic',
                  color: 'var(--color-champagne)',
                  marginBottom: '24px'
                }}
              >
                {activeGift.promptText}
              </p>

              {/* Pre-emptive Notice for Sri Dhanya */}
              {isHerMode && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    padding: '18px 20px',
                    borderRadius: '16px',
                    background: 'rgba(216, 140, 154, 0.15)',
                    border: '1px dashed rgba(212, 175, 55, 0.7)',
                    marginBottom: '24px',
                    textAlign: 'center'
                  }}
                >
                  <span style={{ fontSize: '1.4rem', display: 'block', marginBottom: '4px' }}>
                    👀 ⚠️
                  </span>
                  <p
                    className="font-serif text-glow-gold"
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: 'var(--color-champagne)',
                      marginBottom: '8px'
                    }}
                  >
                    "Ne ena kepa nu enaku teryum..."
                  </p>
                  <p
                    className="font-serif"
                    style={{
                      fontSize: '1.14rem',
                      lineHeight: '1.6',
                      color: 'var(--color-cream)',
                      marginBottom: '6px'
                    }}
                  >
                    1. <em>"Office vitu ne pogakudathu na solra varikum"</em> nu soluva...
                  </p>
                  <p
                    className="font-serif"
                    style={{
                      fontSize: '1.14rem',
                      lineHeight: '1.6',
                      color: 'var(--color-cream)',
                      marginBottom: '10px'
                    }}
                  >
                    2. <em>"Naan sollumbodhu mattum dhaan nee work from home or leave podanum, illana poda koodathu"</em> nu soluva... 😂
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.95rem',
                      color: 'var(--color-rose)',
                      fontWeight: 700,
                      letterSpacing: '0.04em'
                    }}
                  >
                    That's NOT possible! Ask something else! 😂🎁
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <div style={{ position: 'relative', marginBottom: '18px' }}>
                  <textarea
                    rows={3}
                    value={request}
                    onChange={(e) => {
                      setRequest(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder={activeGift.placeholder}
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
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      marginBottom: '16px',
                      fontFamily: 'var(--font-sans)',
                      background: 'rgba(216, 140, 154, 0.15)',
                      padding: '10px 16px',
                      borderRadius: '10px',
                      border: '1px solid rgba(216, 140, 154, 0.3)'
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
                  {activeGift.reminderText}
                </p>

                <button
                  type="submit"
                  className="btn-primary btn-gold"
                  style={{ padding: '16px 42px', fontSize: '1.2rem' }}
                >
                  {isHerMode ? "Submit my wish 🌸" : "Make my request ✦"}
                </button>
              </form>
            </motion.div>
          ) : (
            /* REVEAL SCREEN */
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
                {isHerMode ? "A Royal Wish Made..." : "Well..."}
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
                {isHerMode ? "Your wish has been officially recorded." : "You used your one golden chance."}
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
                {isHerMode ? "Sri Dhanya asked for:" : "You asked for:"}
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
                {isHerMode ? "And the answer is a 100% YES! 💖" : "And I said I'd say yes. ✨"}
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
                  👀 ⚠️
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
                  {isHerMode ? "The Grand Finale 🌸" : "One last mystery... ✦"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.main>
  );
}
