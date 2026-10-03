import { useState, useEffect, useRef } from 'react';
import { getTimeRemaining, isEditionUnlocked } from '../utils/editionLock';

/**
 * Custom hook to run a real-time countdown timer until today 11:11 PM.
 */
export function useEditionCountdown(onUnlock) {
  const [timeRemaining, setTimeRemaining] = useState(() => getTimeRemaining());
  const onUnlockRef = useRef(onUnlock);

  useEffect(() => {
    onUnlockRef.current = onUnlock;
  }, [onUnlock]);

  useEffect(() => {
    // If already unlocked, no need for ticking interval
    if (isEditionUnlocked()) {
      setTimeRemaining({
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalSeconds: 0,
        isUnlocked: true
      });
      return;
    }

    const tick = () => {
      const remaining = getTimeRemaining();
      setTimeRemaining(remaining);

      if (remaining.isUnlocked) {
        if (onUnlockRef.current) {
          onUnlockRef.current();
        }
      }
    };

    // Run immediately once
    tick();

    const intervalId = setInterval(tick, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return timeRemaining;
}
