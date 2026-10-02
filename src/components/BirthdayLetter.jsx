import React from 'react';
import { motion } from 'framer-motion';
import { CONFIG } from '../data/config';
import { Sparkles } from 'lucide-react';

export default function BirthdayLetter({ onNext }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      filter: 'blur(8px)',
      transition: { duration: 0.8 }
    }
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.main
      className="letter-screen"
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
        padding: '40px 20px',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div
        className="glass-panel"
        style={{
          maxWidth: '680px',
          width: '100%',
          padding: 'clamp(36px, 6vw, 64px) clamp(24px, 5vw, 52px)',
          margin: '0 auto',
          position: 'relative',
          background: 'linear-gradient(175deg, rgba(42, 23, 42, 0.88) 0%, rgba(23, 15, 28, 0.98) 100%)',
          border: '1px solid rgba(246, 231, 200, 0.35)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.55), inset 0 0 40px rgba(212, 175, 55, 0.05)'
        }}
      >
        {/* Subtle Decorative Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <span style={{ color: 'var(--color-champagne)', fontSize: '1.2rem' }}>✦</span>
        </div>

        {/* Heading */}
        <motion.div variants={paragraphVariants} style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2
            className="font-serif text-glow"
            style={{
              fontSize: 'clamp(1.9rem, 4.5vw, 2.7rem)',
              fontWeight: 400,
              lineHeight: 1.35,
              color: 'var(--color-cream)',
              fontStyle: 'italic'
            }}
          >
            A Royal Birthday Proclamation...<br />
            (From The Main Character In Your Life)
          </h2>
          <div
            style={{
              height: '1px',
              width: '80px',
              background: 'linear-gradient(90deg, transparent, var(--color-champagne), transparent)',
              margin: '18px auto 0'
            }}
          />
        </motion.div>

        {/* Sarcastic, confident, main-character letter */}
        <div
          className="font-serif"
          style={{
            fontSize: 'clamp(1.15rem, 3vw, 1.38rem)',
            lineHeight: '1.8',
            color: 'var(--color-cream)',
            textAlign: 'left'
          }}
        >
          <motion.p variants={paragraphVariants} style={{ marginBottom: '22px' }}>
            Well, well. Look who survived another entire year without getting arrested
            for unprovoked physical violence against my handsome face.
          </motion.p>

          <motion.p variants={paragraphVariants} style={{ marginBottom: '22px' }}>
            Today is technically supposed to be about celebrating you... but let’s be completely
            honest for five seconds: you should really be throwing a party to celebrate having
            <strong> ME </strong> in your life.
          </motion.p>

          <motion.p variants={paragraphVariants} style={{ marginBottom: '22px' }}>
            Think about it: Who else would tolerate your dramatic mood swings, pretend to lose lucky points
            to you at table tennis, listen to your daily chaos, absorb your face-slaps with zero complaints,
            and <em>still</em> code a whole custom website for you? Nobody. I am practically performing divine charity work here.
            You're having a happy year? Obviously—you spend 20+ days a month blessed with my company.
          </motion.p>

          <motion.div
            variants={paragraphVariants}
            style={{
              margin: '28px 0',
              padding: '20px 24px',
              borderRadius: '16px',
              background: 'rgba(216, 140, 154, 0.1)',
              borderLeft: '3px solid var(--color-gold)'
            }}
          >
            <p style={{ fontStyle: 'italic', color: 'var(--color-champagne)', marginBottom: '14px', fontWeight: 600 }}>
              Here is my non-negotiable birthday mandate for you, Mental:
            </p>

            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                color: 'var(--color-cream)'
              }}
            >
              <li>
                <span style={{ color: 'var(--color-gold)' }}>1. Back to the Arenas: </span>
                Stop slacking and get back to playing badminton and cricket in tournaments like you used to.
                You actually have legitimate talent there (unlike in table tennis where you depend entirely on my mercy).
                Go win every trophy you want—and make sure to dedicate at least 80% of the credit to me in your victory speech.
              </li>
              <li>
                <span style={{ color: 'var(--color-rose)' }}>2. The Food Addiction: </span>
                I know your eternal love affair with food. I respect the dedication.
                But please, eat some actual healthy food once in a while. You need the nutrition to keep up with my energy,
                and living purely on snacks, stubbornness, and drama is not an approved diet plan.
              </li>
              <li>
                <span style={{ color: 'var(--color-champagne)' }}>3. Drop the Iron Mask: </span>
                Stop with the Oscar-nominated performance pretending you’re an emotionless, indestructible rock.
                Be truly strong, stay happy always, and remember: you don’t have to carry everything alone when you have the main character right by your side.
              </li>
              <li>
                <span style={{ color: 'var(--color-blush)' }}>4. The Rage Policy: </span>
                Whenever life annoys you, or you’re angry, stressed, or having a rough day—do NOT bottle it up.
                Bring all that fury straight to me. Yell at me, complain for two solid hours, or smack my face like you usually do.
                I can handle it like the legend I am. Just never sit in silence alone.
              </li>
            </ul>
          </motion.div>

          <motion.p variants={paragraphVariants} style={{ marginBottom: '24px' }}>
            At the end of the day, you make life a whole lot louder, considerably more chaotic,
            and infinitely more fun. Just never forget who keeps your life entertaining.
          </motion.p>

          {/* Sarcastic & Sweet Closing */}
          <motion.div
            variants={paragraphVariants}
            className="text-glow"
            style={{
              marginTop: '34px',
              textAlign: 'center'
            }}
          >
            <p
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.1rem)',
                color: 'var(--color-champagne)',
                fontWeight: 600,
                marginBottom: '6px'
              }}
            >
              Happy Birthday, Sri Dhanya. ♡
            </p>
            <p
              style={{
                fontSize: '1.1rem',
                fontStyle: 'italic',
                color: 'var(--color-blush)',
                opacity: 0.95
              }}
            >
              (Yes, I remembered your real name, Mental... and yes, you're welcome for being the highlight of your life.)
            </p>
          </motion.div>
        </div>

        {/* Continue to Gift Button */}
        <motion.div variants={paragraphVariants} style={{ textAlign: 'center', marginTop: '42px' }}>
          <button onClick={onNext} className="btn-primary btn-gold" style={{ padding: '15px 40px' }}>
            Claim your gift from the Main Character ✦
          </button>
        </motion.div>
      </div>
    </motion.main>
  );
}
