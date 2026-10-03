import React, { createContext, useContext, useState, useEffect } from 'react';

const ModeContext = createContext();

export const MODES = {
  ME: 'me',     // Main Character Roasting Mode (the guy teasing her)
  HER: 'her'    // Sri Dhanya Edition (her real celebration)
};

export function ModeProvider({ children }) {
  const [mode, setModeState] = useState(() => {
    try {
      const saved = localStorage.getItem('wish_site_mode');
      return saved === MODES.HER ? MODES.HER : MODES.ME;
    } catch {
      return MODES.ME;
    }
  });

  const setMode = (newMode) => {
    setModeState(newMode);
    try {
      localStorage.setItem('wish_site_mode', newMode);
    } catch {
      // ignore
    }
  };

  const toggleMode = () => {
    setMode(mode === MODES.ME ? MODES.HER : MODES.ME);
  };

  const isHerMode = mode === MODES.HER;

  return (
    <ModeContext.Provider value={{ mode, setMode, toggleMode, isHerMode }}>
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
