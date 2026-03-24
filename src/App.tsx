import { useState } from 'react';
import type { Settings } from './types';
import { useTimer } from './hooks/useTimer';
import { TimerDisplay } from './components/TimerDisplay';
import { Controls } from './components/Controls';
import { Settings as SettingsPanel } from './components/Settings';

const DEFAULT_SETTINGS: Settings = {
  focusMinutes: 25,
  breakMinutes: 5,
  focusSound: 'chime',
  breakSound: 'beep',
};

export default function App() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const { mode, phase, timeLeft, start, pause, reset, skip } = useTimer(settings);

  const totalSeconds =
    (mode === 'focus' ? settings.focusMinutes : settings.breakMinutes) * 60;

  const isFocus = mode === 'focus';
  const bg = isFocus
    ? 'from-violet-50 via-white to-purple-50'
    : 'from-sky-50 via-white to-cyan-50';

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bg} transition-colors duration-700`}>
      <div className="max-w-sm mx-auto px-4 py-12 flex flex-col items-center gap-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Pomodoro Timer</h1>
          <p className="text-sm text-gray-400 mt-1">Stay focused. Rest well.</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-sm p-8 w-full flex flex-col items-center gap-6">
          <TimerDisplay
            mode={mode}
            phase={phase}
            timeLeft={timeLeft}
            totalSeconds={totalSeconds}
          />
          <Controls
            mode={mode}
            phase={phase}
            onStart={start}
            onPause={pause}
            onReset={reset}
            onSkip={skip}
          />
        </div>

        <SettingsPanel settings={settings} onChange={setSettings} />
      </div>
    </div>
  );
}
