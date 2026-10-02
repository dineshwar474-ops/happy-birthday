import React from 'react';
import { motion } from 'framer-motion';

export default function MemoryStar({ memory, isOpened, onClick }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${memory.x}%`,
        top: `${memory.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: 15
      }}
    >
      <button
        onClick={onClick}
        aria-label={`Open diamond: ${memory.title}`}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          outline: 'none',
          position: 'relative'
        }}
      >
        {/* Glowing Diamond Silhouette */}
        <motion.div
          animate={{
            scale: isOpened ? [1.25, 1.45, 1.25] : [1, 1.2, 1],
            boxShadow: isOpened
              ? [
                  '0 0 16px rgba(246, 231, 200, 0.95), 0 0 35px rgba(212, 175, 55, 0.7)',
                  '0 0 28px rgba(246, 231, 200, 1), 0 0 50px rgba(212, 175, 55, 0.9)',
                  '0 0 16px rgba(246, 231, 200, 0.95), 0 0 35px rgba(212, 175, 55, 0.7)'
                ]
              : [
                  '0 0 10px rgba(243, 198, 204, 0.6)',
                  '0 0 20px rgba(246, 231, 200, 0.85)',
                  '0 0 10px rgba(243, 198, 204, 0.6)'
                ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: (memory.id * 0.35) % 2
          }}
          whileHover={{ scale: 1.6, rotate: 50 }}
          style={{
            width: isOpened ? '18px' : '14px',
            height: isOpened ? '18px' : '14px',
            transform: 'rotate(45deg)',
            borderRadius: '2px',
            background: isOpened
              ? 'linear-gradient(135deg, #FFF8F1 0%, #F6E7C8 40%, #D4AF37 100%)'
              : 'linear-gradient(135deg, #FFF8F1 0%, #F3C6CC 50%, #D88C9A 100%)',
            border: isOpened
              ? '1px solid rgba(255, 255, 255, 0.9)'
              : '1px solid rgba(246, 231, 200, 0.6)',
            transition: 'width 0.4s ease, height 0.4s ease, border 0.4s ease'
          }}
        />

        {/* Shimmering Center Light */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: '#FFF8F1',
            pointerEvents: 'none'
          }}
        />

        {/* Subtle Diamond Indicator */}
        <span
          className="font-serif"
          style={{
            marginTop: '8px',
            fontSize: '0.8rem',
            color: isOpened ? 'var(--color-champagne)' : 'rgba(243, 198, 204, 0.75)',
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
            textShadow: '0 0 6px rgba(0,0,0,0.85)'
          }}
        >
          {isOpened ? '✦' : '◇'}
        </span>
      </button>
    </div>
  );
}
