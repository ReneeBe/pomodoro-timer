import { useState } from 'react';
import type { Settings, SoundId } from '../types';
import { SOUND_OPTIONS, playSound } from '../lib/sounds';

interface Props {
  settings: Settings;
  onChange: (s: Settings) => void;
}

function SoundSelect({ label, value, onChange }: { label: string; value: SoundId; onChange: (v: SoundId) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-gray-500">{label}</label>
      <div className="flex flex-wrap gap-1.5">
        {SOUND_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            onClick={() => { onChange(opt.id); playSound(opt.id); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              value === opt.id
                ? 'bg-violet-100 text-violet-700 ring-1 ring-violet-300'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Settings({ settings, onChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 mx-auto text-sm text-gray-400 hover:text-gray-600 transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="8" r="3" />
          <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" />
        </svg>
        {open ? 'Hide sounds' : 'Sounds'}
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
        >
          <polyline points="2,4 6,8 10,4" />
        </svg>
      </button>

      {open && (
        <div className="mt-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col gap-5">
          <SoundSelect
            label="Focus alarm"
            value={settings.focusSound}
            onChange={(v) => onChange({ ...settings, focusSound: v })}
          />
          <SoundSelect
            label="Break alarm"
            value={settings.breakSound}
            onChange={(v) => onChange({ ...settings, breakSound: v })}
          />
        </div>
      )}
    </div>
  );
}
