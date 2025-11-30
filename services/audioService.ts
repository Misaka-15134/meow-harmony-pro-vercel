export const midiToFreq = (midi: number) => {
  return 440 * Math.pow(2, (midi - 69) / 12);
};

// 节奏模式定义
export type RhythmPattern = 'strum' | 'arpeggio' | 'block' | 'rock';

const PATTERNS: Record<RhythmPattern, number[]> = {
  block: [0], // 同时响
  strum: [0, 0.05, 0.1, 0.15, 0.2, 0.25], // 快速扫弦
  arpeggio: [0, 0.25, 0.5, 0.75, 1.0, 1.25], // 分解和弦
  rock: [0, 0.1, 0.2, 0, 0.1, 0.2] // 强力和弦重复
};

let audioCtx: AudioContext | null = null;

const getCtx = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
};

export const playNotes = (frequencies: number[], pattern: RhythmPattern = 'strum', bpm: number = 100, startTime: number = 0) => {
  const ctx = getCtx();
  const now = startTime || ctx.currentTime;
  const beatDuration = 60 / bpm; // 单拍时长

  // 根据 BPM 调整 pattern 的相对时间
  const timingOffsets = PATTERNS[pattern].map(t => t * (120 / bpm)); 

  frequencies.forEach((freq, i) => {
    // 简单的映射逻辑：如果音符比 pattern 长，循环 pattern；如果短，截断
    const offset = timingOffsets[i % timingOffsets.length];
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle'; 
    osc.frequency.value = freq;

    // ADSR Envelope
    const start = now + offset;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.2, start + 0.05); // Attack
    gain.gain.exponentialRampToValueAtTime(0.001, start + (beatDuration * 2)); // Decay

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(start);
    osc.stop(start + (beatDuration * 2.5));
  });
  
  return beatDuration * 4; // 返回大概的小节时长
};

export const playSequence = async (
  sequenceCoords: number[][], // Array of arrays of freqs
  pattern: RhythmPattern,
  bpm: number
) => {
  const ctx = getCtx();
  let nextStartTime = ctx.currentTime;
  const beatDuration = 60 / bpm;
  const barDuration = beatDuration * 4; // 假设 4/4 拍

  sequenceCoords.forEach(chordFreqs => {
    playNotes(chordFreqs, pattern, bpm, nextStartTime);
    nextStartTime += barDuration;
  });
};
