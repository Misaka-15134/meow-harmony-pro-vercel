export interface Note {
  name: string;
  midi: number;
}

export interface FretboardNote {
  string: number; // 0-5 (low E to high E)
  fret: number;
  note: string;
  midi: number;
  isRoot?: boolean;
  isBass?: boolean;
}

export interface ChordVector {
  r: number; // Consonance 0-10
  theta: number; // Angle in radians
  x: number;
  y: number;
  notes: string[];
}

export interface ChordData {
  root: string;
  type: string;
  bass: string;
  shortName: string;
  longName?: string;
  longName_zh?: string;
  vector: ChordVector;
}

export interface SequenceItem extends ChordData {
  id: string;
}

export enum Tab {
  CREATION = 'CREATION',
  ANALYSIS = 'ANALYSIS'
}

export enum FretboardMode {
  STANDARD = 'STANDARD',
  CUSTOM = 'CUSTOM'
}

export interface AIRecommendation {
  note: string;
  type: string;
  label: string;
}

export type RhythmPattern = 'strum' | 'arpeggio' | 'block' | 'rock';
