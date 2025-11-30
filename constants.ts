import { ChordVector } from "./types";

export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const TUNING = [40, 45, 50, 55, 59, 64]; // E2, A2, D3, G3, B3, E4

export const CIRCLE_ANGLES: Record<string, number> = {
  'C': 90, 'G': 60, 'D': 30, 'A': 0, 'E': 330, 'B': 300, 
  'F#': 270, 'Gb': 270, 'C#': 240, 'Db': 240, 'G#': 210, 'Ab': 210, 
  'D#': 180, 'Eb': 180, 'A#': 150, 'Bb': 150, 'F': 120
};

export const CHORD_DEFINITIONS: Record<string, { intervals: number[], r: number, shortName: string, longName: string, longName_zh: string }> = {
  'maj': { intervals: [0, 4, 7], r: 10, shortName: 'maj', longName: 'Major', longName_zh: '大三和弦' },
  'min': { intervals: [0, 3, 7], r: 9, shortName: 'min', longName: 'Minor', longName_zh: '小三和弦' },
  '5': { intervals: [0, 7], r: 10, shortName: '5', longName: 'Power Chord', longName_zh: '强力和弦' },
  '7': { intervals: [0, 4, 7, 10], r: 6, shortName: '7', longName: 'Dominant 7th', longName_zh: '属七和弦' },
  'maj7': { intervals: [0, 4, 7, 11], r: 7, shortName: 'maj7', longName: 'Major 7th', longName_zh: '大七和弦' },
  'min7': { intervals: [0, 3, 7, 10], r: 6, shortName: 'min7', longName: 'Minor 7th', longName_zh: '小七和弦' },
  'minMaj7': { intervals: [0, 3, 7, 11], r: 5, shortName: 'min/maj7', longName: 'Minor/Major 7th', longName_zh: '小大七和弦' },
  'sus4': { intervals: [0, 5, 7], r: 8, shortName: 'sus4', longName: 'Sustained 4th', longName_zh: '挂四和弦' },
  'sus2': { intervals: [0, 2, 7], r: 8, shortName: 'sus2', longName: 'Sustained 2nd', longName_zh: '挂二和弦' },
  '6': { intervals: [0, 4, 7, 9], r: 7, shortName: '6', longName: 'Major 6th', longName_zh: '大六和弦' },
  'min6': { intervals: [0, 3, 7, 9], r: 6, shortName: 'min6', longName: 'Minor 6th', longName_zh: '小六和弦' },
  '9': { intervals: [0, 4, 7, 10, 14], r: 5, shortName: '9', longName: 'Dominant 9th', longName_zh: '属九和弦' },
  'min9': { intervals: [0, 3, 7, 10, 14], r: 4, shortName: 'min9', longName: 'Minor 9th', longName_zh: '小九和弦' },
  'maj9': { intervals: [0, 4, 7, 11, 14], r: 5, shortName: 'maj9', longName: 'Major 9th', longName_zh: '大九和弦' },
  'add9': { intervals: [0, 4, 7, 14], r: 6, shortName: 'add9', longName: 'Add 9', longName_zh: '加九和弦' },
  '7sus4': { intervals: [0, 5, 7, 10], r: 5, shortName: '7sus4', longName: '7th Sustained 4th', longName_zh: '挂四七和弦' },
  'dim': { intervals: [0, 3, 6], r: 3, shortName: 'dim', longName: 'Diminished', longName_zh: '减三和弦' },
  'dim7': { intervals: [0, 3, 6, 9], r: 2, shortName: 'dim7', longName: 'Diminished 7th', longName_zh: '减七和弦' },
  'aug': { intervals: [0, 4, 8], r: 5, shortName: 'aug', longName: 'Augmented', longName_zh: '增三和弦' }
};

export const SCALES: Record<string, number[]> = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10]
};

export const API_MODELS = [
  { id: 'gemini', name: 'Google Gemini' },
  { id: 'claude', name: 'Anthropic Claude' },
  { id: 'deepseek', name: 'DeepSeek' },
  { id: 'kimi', name: 'Kimi (Moonshot AI)' },
  { id: 'openrouter', name: 'OpenRouter' },
  { id: 'gpt', name: 'OpenAI GPT' }
];