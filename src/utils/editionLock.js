import { CONFIG } from '../data/config.js';

/**
 * Calculates the target unlock Date object based on config.
 */
export function getUnlockTargetDate() {
  const config = CONFIG.editionUnlock || {};
  
  if (config.customDateOverride) {
    return new Date(config.customDateOverride);
  }

  const now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    config.targetHour ?? 23,
    config.targetMinute ?? 11,
    config.targetSecond ?? 0,
    0
  );
}

/**
 * Checks if Sri Dhanya Edition is unlocked right now.
 */
export function isEditionUnlocked() {
  // Allow bypassing via URL query parameter: ?unlock=true
  if (typeof window !== 'undefined') {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('unlock') === 'true' || params.get('unlock') === '1') {
        return true;
      }
    } catch {
      // ignore
    }
  }

  // Allow bypass via config setting
  if (CONFIG.editionUnlock?.bypassLock) {
    return true;
  }

  const target = getUnlockTargetDate();
  const targetTs = target.getTime();

  // If the target is in the future, it is locked
  if (Date.now() < targetTs) {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('wish_edition_unlocked');
      } catch {
        // ignore
      }
    }
    return false;
  }

  // Target has arrived or passed
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('wish_edition_unlocked', 'true');
    } catch {
      // ignore
    }
  }

  return true;
}

/**
 * Computes remaining time until 11:11 PM today.
 */
export function getTimeRemaining() {
  if (isEditionUnlocked()) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      isUnlocked: true
    };
  }

  const target = getUnlockTargetDate();
  const diffMs = target.getTime() - Date.now();
  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const unlocked = totalSeconds <= 0;
  if (unlocked && typeof window !== 'undefined') {
    try {
      localStorage.setItem('wish_edition_unlocked', 'true');
    } catch {
      // ignore
    }
  }

  return {
    hours,
    minutes,
    seconds,
    totalSeconds,
    isUnlocked: unlocked
  };
}
