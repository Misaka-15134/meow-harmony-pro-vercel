import { NOTES, CHORD_DEFINITIONS, CIRCLE_ANGLES, SCALES } from '../constants';
import { ChordVector } from '../types';

export const getNoteIndex = (n: string) => NOTES.indexOf(n);
export const getNoteName = (i: number) => NOTES[(i % 12 + 12) % 12];

export const getChordNotes = (root: string, type: string): string[] => {
  const rootIdx = getNoteIndex(root);
  if (rootIdx === -1 || !CHORD_DEFINITIONS[type]) return [];
  return CHORD_DEFINITIONS[type].intervals.map(i => getNoteName(rootIdx + i));
};

export const calculateVector = (root: string | null, type: string | null, customNotes: string[] | null = null): ChordVector => {
  let notes: string[] = [];
  let r = 5;

  if (customNotes) {
    notes = customNotes;
    // Heuristic: more notes usually means more complexity/tension unless it's a perfect stack
    // Simple custom formula to approximate the reference logic:
    // r starts at 10, decreases by distance from 3-note triad
    r = Math.max(2, 10 - Math.abs(notes.length - 3));
  } else if (root && type && CHORD_DEFINITIONS[type]) {
    notes = getChordNotes(root, type);
    r = CHORD_DEFINITIONS[type].r;
  }

  if (notes.length === 0) {
    return { r: 0, theta: 0, x: 0, y: 0, notes: [] };
  }

  let sumX = 0;
  let sumY = 0;
  
  notes.forEach(n => {
    // Clean flat/sharp for lookup
    let lookup = n;
    // Simple normalization if needed, though CIRCLE_ANGLES handles most
    const deg = CIRCLE_ANGLES[lookup] || 0;
    const rad = deg * Math.PI / 180;
    sumX += Math.cos(rad);
    sumY += Math.sin(rad);
  });

  const count = notes.length || 1;
  const avgX = sumX / count;
  const avgY = sumY / count;
  const theta = Math.atan2(avgY, avgX);
  
  // Normalized vector coordinates for visualization (scaled by r)
  return {
    r,
    theta,
    x: r * Math.cos(theta),
    y: r * Math.sin(theta),
    notes
  };
};

export const getDegree = (chordRoot: string, chordType: string, keyRoot: string, scaleType: string) => {
  if (!chordRoot || !keyRoot) return "?";
  const keyIdx = getNoteIndex(keyRoot);
  const chordIdx = getNoteIndex(chordRoot);
  const semitoneDist = (chordIdx - keyIdx + 12) % 12;

  const genericMap = ["I", "bII", "II", "bIII", "III", "IV", "bV", "V", "bVI", "VI", "bVII", "VII"];
  let baseRoman = genericMap[semitoneDist];

  if (chordType.includes('min') || chordType === 'dim' || chordType === 'dim7') {
    baseRoman = baseRoman.toLowerCase();
  }

  let suffix = "";
  if (chordType === 'dim') suffix = "°";
  else if (chordType === 'dim7') suffix = "°7";
  else if (chordType === 'min7b5') suffix = "ø";
  else if (chordType === 'aug') suffix = "+";
  else if (chordType === 'maj7') suffix = "M7";
  else if (chordType === '7') suffix = "7";
  else if (chordType === 'min7') suffix = "7";
  else if (chordType === 'sus4') suffix = "sus";

  return baseRoman + suffix;
};

export const identifyChord = (noteNames: string[]): string => {
    if (noteNames.length < 2) return "Unknown";
    const uniqueIndices = [...new Set(noteNames.map(n => getNoteIndex(n)))].sort((a,b) => a-b);
    
    // Brute force check against known shapes
    for (let r = 0; r < 12; r++) {
        for (let type in CHORD_DEFINITIONS) {
            const def = CHORD_DEFINITIONS[type];
            const targetIndices = def.intervals.map(i => (r + i) % 12).sort((a,b) => a-b);
            
            if (uniqueIndices.length === targetIndices.length && 
                uniqueIndices.every((val, idx) => val === targetIndices[idx])) {
                return getNoteName(r) + type;
            }
        }
    }
    return "Custom";
};