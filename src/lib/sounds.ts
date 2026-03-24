import type { SoundId, SoundOption } from '../types';

export const SOUND_OPTIONS: SoundOption[] = [
  { id: 'none',    label: 'None' },
  { id: 'chime',   label: 'Soft Chime' },
  { id: 'bell',    label: 'Bell' },
  { id: 'beep',    label: 'Beep' },
  { id: 'buzzer',  label: 'Buzzer' },
  { id: 'digital', label: 'Digital' },
];

let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

function ramp(gain: GainNode, ac: AudioContext, peak: number, attack: number, decay: number) {
  const now = ac.currentTime;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(peak, now + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + attack + decay);
}

function tone(
  ac: AudioContext,
  freq: number,
  type: OscillatorType,
  peak: number,
  attack: number,
  decay: number,
  start: number
) {
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  osc.connect(gain);
  gain.connect(ac.destination);
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(peak, start + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + attack + decay);
  osc.start(start);
  osc.stop(start + attack + decay + 0.05);
}

function playChime(ac: AudioContext) {
  // Soft major chord: root + third + fifth
  [[523.25, 0], [659.25, 0.05], [783.99, 0.1]].forEach(([freq, delay]) => {
    tone(ac, freq, 'sine', 0.3, 0.01, 1.2, ac.currentTime + delay);
  });
}

function playBell(ac: AudioContext) {
  // Bell-like: fundamental + inharmonic partials
  const now = ac.currentTime;
  [[440, 1], [880, 0.5], [1320, 0.25], [1760, 0.15]].forEach(([freq, vol]) => {
    tone(ac, freq, 'sine', vol * 0.4, 0.005, 2.0, now);
  });
}

function playBeep(ac: AudioContext) {
  tone(ac, 880, 'sine', 0.4, 0.005, 0.2, ac.currentTime);
  tone(ac, 880, 'sine', 0.4, 0.005, 0.2, ac.currentTime + 0.35);
  tone(ac, 880, 'sine', 0.4, 0.005, 0.2, ac.currentTime + 0.7);
}

function playBuzzer(ac: AudioContext) {
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = 'square';
  osc.frequency.value = 220;
  osc.connect(gain);
  gain.connect(ac.destination);
  ramp(gain, ac, 0.25, 0.01, 0.6);
  osc.start(ac.currentTime);
  osc.stop(ac.currentTime + 0.7);
}

function playDigital(ac: AudioContext) {
  for (let i = 0; i < 6; i++) {
    tone(ac, 1200, 'square', 0.2, 0.005, 0.08, ac.currentTime + i * 0.12);
  }
}

export async function playSound(id: SoundId): Promise<void> {
  if (id === 'none') return;
  const ac = getCtx();
  if (ac.state === 'suspended') await ac.resume();
  switch (id) {
    case 'chime':   playChime(ac);   break;
    case 'bell':    playBell(ac);    break;
    case 'beep':    playBeep(ac);    break;
    case 'buzzer':  playBuzzer(ac);  break;
    case 'digital': playDigital(ac); break;
  }
}
