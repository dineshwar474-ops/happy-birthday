import React, { useState, useRef, useEffect } from 'react';
import { CONFIG } from '../data/config';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Play audio safely handling browser autoplay restrictions
  const startAudio = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay was blocked by browser; will start on first user interaction
          setIsPlaying(false);
        });
    }
  };

  useEffect(() => {
    // Attempt autoplay immediately on website load
    startAudio();

    // Browser Autoplay Policy workaround:
    // If the browser blocked initial autoplay without gesture,
    // start playing on the very first user interaction (click or touch) anywhere
    const handleFirstInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            removeListeners();
          })
          .catch(() => {});
      } else {
        removeListeners();
      }
    };

    const removeListeners = () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction, { passive: true });
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true });
    window.addEventListener('pointerdown', handleFirstInteraction, { passive: true });
    window.addEventListener('keydown', handleFirstInteraction, { passive: true });

    return () => {
      removeListeners();
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Audio play error:', err);
        });
    }
  };

  return (
    <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 100 }}>
      {/* Audio element configured with loop and auto preload */}
      <audio
        ref={audioRef}
        src={CONFIG.audioSrc}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <button
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Mute background music' : 'Play background music'}
        title={isPlaying ? 'Mute music' : 'Play music'}
        style={{
          height: '42px',
          padding: '0 14px',
          borderRadius: '9999px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: isPlaying ? 'rgba(212, 175, 55, 0.28)' : 'rgba(42, 23, 42, 0.65)',
          border: isPlaying ? '1px solid rgba(212, 175, 55, 0.7)' : '1px solid rgba(243, 198, 204, 0.25)',
          color: isPlaying ? 'var(--color-champagne)' : 'var(--color-blush)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          cursor: 'pointer',
          fontSize: '0.9rem',
          fontFamily: 'var(--font-sans)',
          boxShadow: isPlaying ? '0 0 20px rgba(212, 175, 55, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease',
          outline: 'none'
        }}
      >
        {isPlaying ? (
          <>
            <span style={{ fontSize: '1rem', color: 'var(--color-gold)' }}>♫</span>
            <span style={{ fontSize: '0.8rem', letterSpacing: '0.05em', color: 'var(--color-champagne)' }}>
              Unwritten (Glass Tides)
            </span>
          </>
        ) : (
          <>
            <VolumeX size={16} />
            <span style={{ fontSize: '0.8rem', letterSpacing: '0.05em' }}>Muted</span>
          </>
        )}
      </button>
    </div>
  );
}
