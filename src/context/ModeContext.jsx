import React, { createContext, useContext, useState, useEffect } from 'react';
import { isEditionUnlocked, getUnlockTargetDate } from '../utils/editionLock';
import { CONFIG } from '../data/config.js';

const ModeContext = createContext();

export const MODES = {
  ME: 'me',     // Main Character Roasting Mode (the guy teasing her)
  HER: 'her'    // Sri Dhanya Edition (her real celebration)
};

export function ModeProvider({ children }) {
  const [isUnlocked, setIsUnlocked] = useState(() => isEditionUnlocked());

  const [mode, setModeState] = useState(() => {
    // If not yet unlocked, force ME mode
    if (!isEditionUnlocked()) {
      return MODES.ME;
    }
    try {
      const saved = localStorage.getItem('wish_site_mode');
      return saved === MODES.HER ? MODES.HER : MODES.ME;
    } catch {
      return MODES.ME;
    }
  });

  const unlockEdition = () => {
    setIsUnlocked(true);
    try {
      localStorage.setItem('wish_edition_unlocked', 'true');
    } catch {
      // ignore
    }
  };

  const setMode = (newMode) => {
    if (newMode === MODES.HER && !isUnlocked && !isEditionUnlocked()) {
      console.warn(`Sri Dhanya Edition is locked until ${CONFIG.editionUnlock?.timeDisplay || '7:30 PM'}!`);
      return false;
    }
    setModeState(newMode);
    try {
      localStorage.setItem('wish_site_mode', newMode);
    } catch {
      // ignore
    }
    return true;
  };

  const toggleMode = () => {
    if (mode === MODES.ME) {
      if (!isUnlocked && !isEditionUnlocked()) {
        return false;
      }
      setMode(MODES.HER);
    } else {
      setMode(MODES.ME);
    }
    return true;
  };

  const isHerMode = mode === MODES.HER;

  return (
    <ModeContext.Provider value={{ mode, setMode, toggleMode, isHerMode, isUnlocked, unlockEdition, targetDate: getUnlockTargetDate() }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
}
