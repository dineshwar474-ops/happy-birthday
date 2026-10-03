import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Sparkles, Clock } from 'lucide-react';
import { CONFIG } from '../data/config.js';

export default function CountdownTimer({ timeRemaining, compact = false }) {
  const { hours, minutes, seconds, isUnlocked } = timeRemaining;
  const timeDisplay = CONFIG.editionUnlock?.timeDisplay || '1:17 PM';

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
          padding: compact ? '8px 12px' : '14px 18px',
          textAlign: 'center',
          boxShadow: '0 0 25px rgba(212, 175, 55, 0.25)',
          margin: compact ? '0' : '14px 0'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--color-gold)' }}>
          <Sparkles size={compact ? 16 : 18} />
          <span
            className="font-serif text-glow-gold"
            style={{
              fontSize: compact ? '0.92rem' : '1.08rem',
              letterSpacing: '0.04em',
              fontWeight: 600
            }}
          >
            {timeDisplay} Unlocked! Sri Dhanya Edition is Active ✦
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
          fontSize: '0.92rem',
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
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5), inset 0 0 16px rgba(212, 175, 55, 0.05)',
        borderRadius: '16px',
        padding: 'clamp(10px, 2.5vw, 14px) clamp(10px, 3vw, 16px)',
        margin: '14px 0',
        textAlign: 'center'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          marginBottom: '10px',
          color: 'var(--color-gold)',
          fontSize: 'clamp(0.72rem, 2.2vw, 0.8rem)',
          fontFamily: 'var(--font-sans)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase'
        }}
      >
        <Lock size={13} />
        <span>Sri Dhanya Edition Unlocks at {timeDisplay}</span>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(6px, 2vw, 12px)'
        }}
      >
        {units.map((unit, index) => (
          <React.Fragment key={unit.label}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: 'clamp(52px, 18vw, 68px)',
                flex: '1 1 0'
              }}
            >
              <div
                style={{
                  background: 'rgba(42, 23, 42, 0.85)',
                  border: '1px solid rgba(246, 231, 200, 0.28)',
                  borderRadius: '10px',
                  width: '100%',
                  padding: '6px 0',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Sheen reflection */}
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
                    fontSize: 'clamp(1.45rem, 5vw, 2.1rem)',
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
                  fontSize: 'clamp(0.6rem, 1.8vw, 0.68rem)',
                  letterSpacing: '0.14em',
                  color: 'var(--color-rose)',
                  marginTop: '5px',
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
                  fontSize: 'clamp(1.2rem, 3.5vw, 1.6rem)',
                  color: 'var(--color-gold)',
                  marginBottom: '16px',
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
          fontSize: 'clamp(0.78rem, 2.3vw, 0.85rem)',
          fontStyle: 'italic',
          color: 'var(--color-blush)',
          marginTop: '10px',
          opacity: 0.9,
          lineHeight: '1.3'
        }}
      >
        Make a Wish Hour • Cosmic Lock Active ⏳
      </p>
    </div>
  );
}
