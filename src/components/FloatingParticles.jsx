import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function FloatingParticles() {
  // Create randomized sparkling dust & stars
  const particles = useMemo(() => {
    return Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.6 + 0.2,
      color: i % 3 === 0 ? '#F6E7C8' : i % 3 === 1 ? '#D88C9A' : '#9C82B8'
    }));
  }, []);

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
        overflow: 'hidden'
      }}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`
          }}
          animate={{
            y: ['0%', '-30%', '10%', '0%'],
            x: ['0%', '15%', '-15%', '0%'],
            opacity: [p.opacity, p.opacity * 0.3, p.opacity * 1.2, p.opacity],
            scale: [1, 1.3, 0.8, 1]
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
}
