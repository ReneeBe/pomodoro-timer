import type { Mode, Phase } from '../types';

interface Props {
  mode: Mode;
  phase: Phase;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
}

export function Controls({ mode, phase, onStart, onPause, onReset, onSkip }: Props) {
  const isFocus = mode === 'focus';
  const accent = isFocus ? 'bg-violet-600 hover:bg-violet-700' : 'bg-sky-500 hover:bg-sky-600';

  const primaryLabel = () => {
    if (phase === 'done') return isFocus ? 'Start Break →' : 'Start Focus →';
    if (phase === 'running') return 'Pause';
    return 'Start';
  };

  const primaryAction = phase === 'running' ? onPause : onStart;

  return (
    <div className="flex items-center gap-3">
      {/* Reset */}
      <button
        onClick={onReset}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
        aria-label="Reset"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 8a7 7 0 1 0 1.5-4.3" />
          <polyline points="1,2 1,6 5,6" />
        </svg>
      </button>

      {/* Primary */}
      <button
        onClick={primaryAction}
        className={`px-8 py-3 rounded-2xl text-white font-semibold text-sm transition-all active:scale-[0.98] ${accent}`}
      >
        {primaryLabel()}
      </button>

      {/* Skip */}
      <button
        onClick={onSkip}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
        aria-label="Skip to next"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="5,3 12,8 5,13" />
          <line x1="14" y1="3" x2="14" y2="13" />
        </svg>
      </button>
    </div>
  );
}
