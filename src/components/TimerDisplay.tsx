import type { Mode, Phase } from '../types';

interface Props {
  mode: Mode;
  phase: Phase;
  timeLeft: number;
  totalSeconds: number;
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export function TimerDisplay({ mode, phase, timeLeft, totalSeconds }: Props) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = totalSeconds > 0 ? (totalSeconds - timeLeft) / totalSeconds : 0;

  const isFocus = mode === 'focus';
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  const ringColor = isFocus ? '#7c3aed' : '#0ea5e9';
  const bgColor = isFocus ? '#ede9fe' : '#e0f2fe';
  const modeLabel = isFocus ? 'Focus' : 'Break';

  const isDone = phase === 'done';

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Mode pill */}
      <span
        className="px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
        style={{ background: bgColor, color: ringColor }}
      >
        {isDone ? `${modeLabel} complete!` : modeLabel}
      </span>

      {/* Ring + time */}
      <div className="relative flex items-center justify-center">
        <svg width="280" height="280" className="-rotate-90">
          {/* Track */}
          <circle
            cx="140" cy="140" r={radius}
            fill="none"
            stroke={bgColor}
            strokeWidth="10"
          />
          {/* Progress */}
          <circle
            cx="140" cy="140" r={radius}
            fill="none"
            stroke={ringColor}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>

        <div className="absolute flex flex-col items-center">
          <span
            className="font-mono font-bold tabular-nums"
            style={{ fontSize: '4rem', lineHeight: 1, color: isDone ? ringColor : '#1a1625' }}
          >
            {pad(minutes)}:{pad(seconds)}
          </span>
          {phase === 'paused' && (
            <span className="text-xs text-gray-400 mt-1">paused</span>
          )}
        </div>
      </div>
    </div>
  );
}
