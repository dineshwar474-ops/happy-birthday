import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Sparkles, Clock } from 'lucide-react';

export default function CountdownTimer({ timeRemaining, compact = false }) {
  const { hours, minutes, seconds, isUnlocked } = timeRemaining;

  const pad = (n) => String(Math.max(0, n)).padStart(2, '0');

  if (isUnlocked) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(246, 231, 200, 0.08))',
          border: '1px solid rgba(212, 175, 55, 0.6)',
          borderRadius: '16px',
          padding: compact ? '10px 14px' : '16px 20px',
          textAlign: 'center',
          boxShadow: '0 0 25px rgba(212, 175, 55, 0.25)',
          margin: compact ? '0' : '16px 0'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--color-gold)' }}>
          <Sparkles size={compact ? 16 : 20} />
          <span
            className="font-serif text-glow-gold"
            style={{
              fontSize: compact ? '0.95rem' : '1.15rem',
              letterSpacing: '0.04em',
              fontWeight: 600
            }}
          >
            11:11 Cosmic Wish Hour Arrived! ✦
          </span>
        </div>
      </motion.div>
    );
  }

  const units = [
    { label: 'HOURS', value: pad(hours) },
    { label: 'MINUTES', value: pad(minutes) },
    { label: 'SECONDS', value: pad(seconds) }
  ];

  if (compact) {
    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: 'var(--font-serif)',
          fontSize: '0.95rem',
          color: 'var(--color-champagne)'
        }}
      >
        <Clock size={13} style={{ color: 'var(--color-gold)' }} />
        <span style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: '0.08em' }}>
          {pad(hours)}:{pad(minutes)}:{pad(seconds)}
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        background: 'rgba(23, 15, 28, 0.75)',
        border: '1px solid rgba(212, 175, 55, 0.35)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(212, 175, 55, 0.05)',
        borderRadius: '18px',
        padding: '16px 18px',
        margin: '18px 0',
        textAlign: 'center'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '7px',
          marginBottom: '12px',
          color: 'var(--color-gold)',
          fontSize: '0.8rem',
          fontFamily: 'var(--font-sans)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase'
        }}
      >
        <Lock size={14} />
        <span>Sri Dhanya Edition Unlocks at 11:11 PM</span>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(8px, 2.5vw, 14px)'
        }}
      >
        {units.map((unit, index) => (
          <React.Fragment key={unit.label}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: 'clamp(58px, 15vw, 76px)'
              }}
            >
              <div
                style={{
                  background: 'rgba(42, 23, 42, 0.85)',
                  border: '1px solid rgba(246, 231, 200, 0.28)',
                  borderRadius: '12px',
                  width: '100%',
                  padding: '8px 0',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Subtle sheen highlight */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '50%',
                    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.06), transparent)',
                    pointerEvents: 'none'
                  }}
                />
                <span
                  className="font-serif text-glow-gold"
                  style={{
                    fontSize: 'clamp(1.6rem, 5vw, 2.3rem)',
                    fontWeight: 600,
                    color: 'var(--color-champagne)',
                    lineHeight: 1,
                    display: 'block',
                    fontVariantNumeric: 'tabular-nums'
                  }}
                >
                  {unit.value}
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.16em',
                  color: 'var(--color-rose)',
                  marginTop: '6px',
                  fontWeight: 500
                }}
              >
                {unit.label}
              </span>
            </div>

            {index < units.length - 1 && (
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                  color: 'var(--color-gold)',
                  marginBottom: '20px',
                  opacity: 0.75,
                  animation: 'pulse 1.5s ease-in-out infinite'
                }}
              >
                :
              </span>
            )}
          </React.Fragment>
        ))}
      </div>

      <p
        className="font-serif"
        style={{
          fontSize: '0.88rem',
          fontStyle: 'italic',
          color: 'var(--color-blush)',
          marginTop: '12px',
          opacity: 0.9,
          lineHeight: '1.4'
        }}
      >
        Make a Wish Hour • Strict Cosmic Protocol Active ⏳
      </p>
    </div>
  );
}
