import React, { useState, useRef, useEffect } from 'react';
import { CONFIG } from '../data/config';

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const synthTimerRef = useRef(null);
  const audioCtxRef = useRef(null);

  // Gentle music box synth notes (C, E, G, B, D in pentatonic / dreamy scale)
  const playChimeSequence = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        audioCtxRef.current = new AudioContext();
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Dreamy ethereal lullaby chord frequencies (Hz)
      const notes = [
        523.25, // C5
        659.25, // E5
        783.99, // G5
        987.77, // B5
        880.00, // A5
        783.99, // G5
        659.25, // E5
        587.33  // D5
      ];
      
      let noteIndex = 0;

      const scheduleNote = () => {
        if (!isPlaying && synthTimerRef.current) return;
        const freq = notes[noteIndex % notes.length];
        noteIndex++;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Soft bell attack & decay
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 2.3);

        synthTimerRef.current = setTimeout(scheduleNote, 1600);
      };

      scheduleNote();
    } catch {
      // AudioContext fallback ignored if blocked
    }
  };

  const stopChimeSequence = () => {
    if (synthTimerRef.current) {
      clearTimeout(synthTimerRef.current);
      synthTimerRef.current = null;
    }
  };

  const toggleMusic = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      // Try playing HTML5 audio first
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          // Playing mp3 file successfully
        }).catch(() => {
          // If mp3 is missing or blocked, start dreamy chime synthesizer!
          playChimeSequence();
        });
      } else {
        playChimeSequence();
      }
    } else {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopChimeSequence();
    }
  };

  useEffect(() => {
    return () => {
      stopChimeSequence();
    };
  }, []);

  return (
    <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 100 }}>
      <audio ref={audioRef} src={CONFIG.audioSrc} loop preload="none" />
      <button
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Mute background music' : 'Play background music'}
        title={isPlaying ? 'Mute music' : 'Play melody'}
        style={{
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: isPlaying ? 'rgba(212, 175, 55, 0.25)' : 'rgba(42, 23, 42, 0.55)',
          border: isPlaying ? '1px solid rgba(212, 175, 55, 0.6)' : '1px solid rgba(243, 198, 204, 0.2)',
          color: isPlaying ? 'var(--color-champagne)' : 'var(--color-blush)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          cursor: 'pointer',
          fontSize: '1.1rem',
          boxShadow: isPlaying ? '0 0 16px rgba(212, 175, 55, 0.35)' : '0 4px 12px rgba(0, 0, 0, 0.25)',
          transition: 'all 0.3s ease',
          outline: 'none'
        }}
      >
        {isPlaying ? '♫' : '🔇'}
      </button>
    </div>
  );
}
