export interface Step {
  id: number;
  active: boolean;
}

export type ChannelKey = 'A' | 'S' | 'D' | 'F' | 'H' | 'J' | 'K' | 'L';

export interface CardConfig {
  id: number;
  key: ChannelKey;
  title: string;
  color: string; // Tailwind class like "green", "orange", "blue", "red", "gray"
  type: 'dots' | 'radar' | 'key' | 'disabled';
  steps: boolean[]; // For 8/16 step sequencers
  radarPoints?: { x: number; y: number; id: number; intensity: number }[];
  sliderVal?: number;
  unlocked: boolean;
  frequencyHz?: number;
}

export interface SequencerState {
  isPlaying: boolean;
  bpm: number;
  division: '1/4' | '1/8' | '1/16';
  currentStep: number;
  cards: Record<ChannelKey, CardConfig>;
}

export interface SupportMessage {
  name: string;
  email: string;
  message: string;
}
