export type Mode = 'focus' | 'break';
export type Phase = 'idle' | 'running' | 'paused' | 'done';

export type SoundId = 'none' | 'chime' | 'bell' | 'beep' | 'buzzer' | 'digital';

export interface SoundOption {
  id: SoundId;
  label: string;
}

export interface Settings {
  focusMinutes: number;
  breakMinutes: number;
  focusSound: SoundId;
  breakSound: SoundId;
}
