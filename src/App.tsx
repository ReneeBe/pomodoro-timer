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

function DurationInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="text-xs font-medium text-gray-400">{label}</span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(Math.max(1, value - 1))}
          className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold transition-colors flex items-center justify-center text-sm"
        >
          −
        </button>
        <span className="w-10 text-center font-mono font-semibold text-gray-700 text-sm">
          {value}m
        </span>
        <button
          onClick={() => onChange(Math.min(120, value + 1))}
          className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold transition-colors flex items-center justify-center text-sm"
        >
          +
        </button>
      </div>
    </div>
  );
}

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
          {/* Duration controls — always visible */}
          <div className="flex gap-8 w-full justify-center pb-2 border-b border-gray-100">
            <DurationInput
              label="Focus"
              value={settings.focusMinutes}
              onChange={(v) => setSettings((s) => ({ ...s, focusMinutes: v }))}
            />
            <DurationInput
              label="Break"
              value={settings.breakMinutes}
              onChange={(v) => setSettings((s) => ({ ...s, breakMinutes: v }))}
            />
          </div>

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
