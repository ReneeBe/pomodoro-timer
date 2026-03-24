import { useCallback, useEffect, useRef, useState } from 'react';
import type { Mode, Phase, Settings } from '../types';
import { playSound } from '../lib/sounds';

interface TimerState {
  mode: Mode;
  phase: Phase;
  timeLeft: number; // seconds
}

interface UseTimer {
  mode: Mode;
  phase: Phase;
  timeLeft: number;
  start: () => void;
  pause: () => void;
  reset: () => void;
  skip: () => void;
}

export function useTimer(settings: Settings): UseTimer {
  const [state, setState] = useState<TimerState>({
    mode: 'focus',
    phase: 'idle',
    timeLeft: settings.focusMinutes * 60,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  const clearTick = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const tick = useCallback(() => {
    setState((prev) => {
      if (prev.phase !== 'running') return prev;
      if (prev.timeLeft > 1) {
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      }
      // Timer hit zero
      const sound = prev.mode === 'focus'
        ? settingsRef.current.focusSound
        : settingsRef.current.breakSound;
      playSound(sound);
      return { ...prev, timeLeft: 0, phase: 'done' };
    });
  }, []);

  // Start/stop interval based on phase
  useEffect(() => {
    if (state.phase === 'running') {
      clearTick();
      intervalRef.current = setInterval(tick, 1000);
    } else {
      clearTick();
    }
    return clearTick;
  }, [state.phase, tick]);

  // When settings change and timer is idle/done, sync duration
  useEffect(() => {
    setState((prev) => {
      if (prev.phase === 'idle') {
        return {
          ...prev,
          timeLeft: (prev.mode === 'focus' ? settings.focusMinutes : settings.breakMinutes) * 60,
        };
      }
      return prev;
    });
  }, [settings.focusMinutes, settings.breakMinutes]);

  const start = useCallback(() => {
    setState((prev) => {
      if (prev.phase === 'done') {
        // Advance to next mode
        const nextMode: Mode = prev.mode === 'focus' ? 'break' : 'focus';
        const nextTime = (nextMode === 'focus'
          ? settingsRef.current.focusMinutes
          : settingsRef.current.breakMinutes) * 60;
        return { mode: nextMode, phase: 'running', timeLeft: nextTime };
      }
      return { ...prev, phase: 'running' };
    });
  }, []);

  const pause = useCallback(() => {
    setState((prev) =>
      prev.phase === 'running' ? { ...prev, phase: 'paused' } : prev
    );
  }, []);

  const reset = useCallback(() => {
    clearTick();
    setState({
      mode: 'focus',
      phase: 'idle',
      timeLeft: settingsRef.current.focusMinutes * 60,
    });
  }, []);

  const skip = useCallback(() => {
    clearTick();
    setState((prev) => {
      const nextMode: Mode = prev.mode === 'focus' ? 'break' : 'focus';
      const nextTime = (nextMode === 'focus'
        ? settingsRef.current.focusMinutes
        : settingsRef.current.breakMinutes) * 60;
      return { mode: nextMode, phase: 'idle', timeLeft: nextTime };
    });
  }, []);

  return { ...state, start, pause, reset, skip };
}
