import React, { useState, useEffect, useMemo } from 'react';
import { 
  Tab, FretboardMode, SequenceItem, ChordData, FretboardNote, RhythmPattern 
} from './types';
import { 
  getChordNotes, calculateVector, identifyChord, getNoteName, getNoteIndex 
} from './services/theoryService';
import { playNotes, midiToFreq, playSequence } from './services/audioService';
import { TUNING, CHORD_DEFINITIONS } from './constants';
import { Guitar, Activity, Settings, Music2 } from 'lucide-react';

// Components
import ChordControls from './components/ChordControls';
import Fretboard from './components/Fretboard';
import SequenceDisplay from './components/SequenceDisplay';
import VectorCircle from './components/VectorCircle';
import Charts from './components/Charts';
import AIPanel from './components/AIPanel';
import RhythmPanel from './components/RhythmPanel';
import { PeekingCat } from './components/CatDoodles';

const App: React.FC = () => {
  // --- Global State ---
  const [activeTab, setActiveTab] = useState<Tab>(Tab.CREATION);
  // 优先读取 DeepSeek Key，如果没有则读取 Gemini Key，最后才为空
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_DEEPSEEK_API_KEY || import.meta.env.VITE_GEMINI_API_KEY || '');
  // Chord Controls State
  const [root, setRoot] = useState('C');
  const [type, setType] = useState('maj');
  const [bass, setBass] = useState('none');
  
  // Fretboard State
  const [fbMode, setFbMode] = useState<FretboardMode>(FretboardMode.STANDARD);
  const [customNotes, setCustomNotes] = useState<FretboardNote[]>([]); 
  
  // Sequence State
  const [sequence, setSequence] = useState<SequenceItem[]>([]);
  const [keyRoot, setKeyRoot] = useState('C');
  const [keyScale, setKeyScale] = useState('major');

  // Rhythm State
  const [bpm, setBpm] = useState(100);
  const [rhythmPattern, setRhythmPattern] = useState<RhythmPattern>('strum');
  const [isPlayingSeq, setIsPlayingSeq] = useState(false);

  // --- Derived State ---
  
  const currentStandardChordNotes = useMemo(() => getChordNotes(root, type), [root, type]);
  
  const activeFretboardNotes = useMemo<FretboardNote[]>(() => {
    if (fbMode === FretboardMode.CUSTOM) {
      return customNotes;
    } else {
      const notes: FretboardNote[] = [];
      const targetNotes = currentStandardChordNotes;
      for (let s = 0; s < 6; s++) {
        for (let f = 0; f <= 13; f++) {
          const midi = TUNING[s] + f;
          const name = getNoteName(midi);
          if (targetNotes.includes(name)) {
            notes.push({
              string: s,
              fret: f,
              note: name,
              midi,
              isRoot: name === root,
              isBass: false 
            });
          }
        }
      }
      return notes;
    }
  }, [fbMode, customNotes, currentStandardChordNotes, root]);

  const currentVector = useMemo(() => {
    if (fbMode === FretboardMode.CUSTOM) {
      const noteNames = customNotes.map(n => n.note);
      return calculateVector(null, null, noteNames);
    } else {
      return calculateVector(root, type);
    }
  }, [fbMode, customNotes, root, type]);

  const currentDisplayName = useMemo(() => {
    if (fbMode === FretboardMode.CUSTOM) {
        return identifyChord(customNotes.map(n => n.note));
    } else {
        const chordDef = CHORD_DEFINITIONS[type];
        const bassPart = bass !== 'none' ? `/${bass}` : '';
        if (chordDef) {
            return `${root}${chordDef.shortName}${bassPart} (${chordDef.longName_zh})`;
        }
        return `${root}${type}${bassPart}`;
    }
}, [fbMode, customNotes, root, type, bass]);


  // --- Handlers ---

  const handleFretClick = (s: number, f: number) => {
    if (fbMode !== FretboardMode.CUSTOM) return;
    
    setCustomNotes(prev => {
      const exists = prev.find(n => n.string === s && n.fret === f);
      if (exists) {
        return prev.filter(n => n !== exists);
      }
      const filtered = prev.filter(n => n.string !== s);
      const midi = TUNING[s] + f;
      const note = getNoteName(midi);
      playNotes([midiToFreq(midi)], 'block', 120);
      return [...filtered, { string: s, fret: f, note, midi }];
    });
  };

  const playCurrent = () => {
    if (fbMode === FretboardMode.CUSTOM) {
      if (customNotes.length === 0) return;
      playNotes(customNotes.map(n => midiToFreq(n.midi)), rhythmPattern, bpm);
    } else {
      const vector = currentVector; 
      // Simple frequency mapping for preview
      const baseMidi = { 'C': 60, 'C#': 61, 'D': 62, 'D#': 63, 'E': 64, 'F': 65, 'F#': 66, 'G': 67, 'G#': 68, 'A': 69, 'A#': 70, 'B': 71 };
      const freqsToPlay = vector.notes.map(n => midiToFreq((baseMidi as any)[n]));
      playNotes(freqsToPlay, rhythmPattern, bpm);
    }
  };

  const handlePlaySequence = async () => {
    if (sequence.length === 0) return;
    setIsPlayingSeq(true);
    
    const seqFreqs = sequence.map(item => {
        const baseMidi = { 'C': 60, 'C#': 61, 'D': 62, 'D#': 63, 'E': 64, 'F': 65, 'F#': 66, 'G': 67, 'G#': 68, 'A': 69, 'A#': 70, 'B': 71 };
        return item.vector.notes.map(n => midiToFreq((baseMidi as any)[n]));
    });

    await playSequence(seqFreqs, rhythmPattern, bpm);
    setIsPlayingSeq(false);
  };

  const addToSequence = () => {
    const chordDef = CHORD_DEFINITIONS[type] || {};
    const newItem: SequenceItem = {
        id: Date.now().toString(),
        root: fbMode === 'CUSTOM' ? '?' : root,
        type: fbMode === 'CUSTOM' ? '?' : type,
        bass: bass,
        shortName: `${root}${chordDef.shortName || type}${bass !== 'none' ? '/' + bass : ''}`,
        longName: `${root} ${chordDef.longName || type}${bass !== 'none' ? '/' + bass : ''}`,
        longName_zh: `${root} ${chordDef.longName_zh || type}${bass !== 'none' ? '/' + bass : ''}`,
        name: currentDisplayName, // Keep the rich name for display
        vector: currentVector
    };
    setSequence(prev => [...prev, newItem]);
  };

  const applyAIRecommendation = (newRoot: string, newType: string) => {
    setRoot(newRoot);
    setType(newType);
    setFbMode(FretboardMode.STANDARD);
  };

  // 简单的插值推荐算法
  const handleInsertPassing = (index: number) => {
    const prev = sequence[index];
    const next = sequence[index + 1];
    if (!prev || !next) return;

    // Logic: Find V/Next (Secondary Dominant)
    const nextRootIdx = getNoteIndex(next.root);
    const passingRootIdx = (nextRootIdx + 7) % 12; // Perfect Fifth above target
    const passingRoot = getNoteName(passingRootIdx);
    
    // Create Passing Chord (Dom7)
    const passingType = '7';
    const vec = calculateVector(passingRoot, passingType);
    const chordDef = CHORD_DEFINITIONS[passingType];
    
    const newItem: SequenceItem = {
      id: Date.now().toString(),
      root: passingRoot,
      type: passingType,
      bass: 'none',
      shortName: `${passingRoot}${passingType}`,
      longName: `${passingRoot} ${chordDef.longName} (V/${next.root})`,
      longName_zh: `${passingRoot} ${chordDef.longName_zh} (V/${next.root})`,
      name: `${passingRoot}7 (V/${next.root})`,
      vector: vec
    };

    const newSeq = [...sequence];
    newSeq.splice(index + 1, 0, newItem);
    setSequence(newSeq);
  };

  return (
    <div className="flex flex-col h-screen bg-cat-base text-cat-text font-sans overflow-hidden">
      
      {/* Header / Nav */}
      <header className="flex-none bg-white shadow-sm z-50 relative">
        <PeekingCat className="absolute right-10 top-0 h-12 w-20 text-cat-primary translate-y-[-10px] z-0" />
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <div className="bg-cat-secondary p-2 rounded-2xl text-white shadow-md transform -rotate-6">
              <Guitar size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-cat-text">喵喵和声 <span className="text-cat-primary text-sm">Pro Max</span></h1>
              <div className="text-[10px] text-gray-400 font-bold -mt-1">智能吉他助手</div>
            </div>
          </div>
          
          <nav className="flex bg-cat-base p-1.5 rounded-2xl">
            <button 
              onClick={() => setActiveTab(Tab.CREATION)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === Tab.CREATION ? 'bg-white text-cat-primary shadow-sm scale-105' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Music2 size={16}/> 创作模式
            </button>
            <button 
              onClick={() => setActiveTab(Tab.ANALYSIS)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === Tab.ANALYSIS ? 'bg-white text-cat-primary shadow-sm scale-105' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Activity size={16}/> 深度分析
            </button>
          </nav>
        </div>
      </header>

      {/* Main Scrollable Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 scroll-smooth">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: Controls & Visualization */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Chord Selector Panel */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-cat-base relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cat-secondary to-cat-primary" />
               <div className="flex justify-between items-center mb-4">
                 <h2 className="text-lg font-bold text-cat-text flex items-center gap-2">
                    🎹 和弦选择
                 </h2>
                 <button 
                    onClick={() => setFbMode(prev => prev === FretboardMode.STANDARD ? FretboardMode.CUSTOM : FretboardMode.STANDARD)}
                    className="text-xs bg-cat-base text-cat-accent px-4 py-1.5 rounded-full font-bold hover:bg-cat-secondary hover:text-white transition-all active:scale-95"
                 >
                   {fbMode === FretboardMode.STANDARD ? '切换到指板点选' : '切换到列表选择'}
                 </button>
               </div>
               
               <ChordControls 
                  root={root} type={type} bass={bass}
                  onRootChange={setRoot} onTypeChange={setType} onBassChange={setBass}
                  onPlay={playCurrent} onAdd={addToSequence}
                  disabled={fbMode === FretboardMode.CUSTOM}
               />

               <div className="mt-6 flex justify-center items-center h-14 bg-cat-base rounded-2xl border-2 border-dashed border-cat-primary/20 group-hover:border-cat-primary/50 transition-colors">
                 <span className="text-3xl font-black text-cat-primary tracking-wider">{currentDisplayName}</span>
               </div>
            </div>

            {/* AI Panel */}
            <AIPanel 
              apiKey={apiKey} 
              onApiKeyChange={setApiKey}
              context={sequence.map(s => s.name)}
              currentChordName={currentDisplayName}
              onApplyRecommendation={applyAIRecommendation}
              mode={activeTab === Tab.CREATION ? 'creation' : 'analysis'}
            />

            {/* Analysis Tab Specifics: Vector Circle */}
            {activeTab === Tab.ANALYSIS && (
               <div className="bg-white rounded-3xl p-6 shadow-sm border border-cat-base">
                  <div className="flex justify-between mb-4">
                    <h2 className="text-lg font-bold text-cat-text">向量与色彩分析</h2>
                  </div>
                  <VectorCircle 
                    currentVector={currentVector} 
                    sequence={sequence} 
                  />
                  <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                    <div className="bg-cat-base p-3 rounded-2xl">
                      <div className="text-xs text-gray-400 font-bold mb-1">张力 (Tension)</div>
                      <div className="text-xl font-black text-cat-danger">{(10 - currentVector.r).toFixed(1)}</div>
                    </div>
                    <div className="bg-cat-base p-3 rounded-2xl">
                      <div className="text-xs text-gray-400 font-bold mb-1">色彩 (Angle)</div>
                      <div className="text-xl font-black text-cat-secondary">{(currentVector.theta * 180 / Math.PI).toFixed(0)}°</div>
                    </div>
                    <div className="bg-cat-base p-3 rounded-2xl">
                      <div className="text-xs text-gray-400 font-bold mb-1">音符数 (Notes)</div>
                      <div className="text-xl font-black text-cat-accent">{currentVector.notes.length}</div>
                    </div>
                  </div>
               </div>
            )}
          </div>

          {/* RIGHT COLUMN: Sequence & Stats */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Rhythm Control */}
            <RhythmPanel 
              bpm={bpm} 
              pattern={rhythmPattern} 
              isPlaying={isPlayingSeq}
              onBpmChange={setBpm}
              onPatternChange={setRhythmPattern}
              onPlaySequence={handlePlaySequence}
            />

            {/* Sequence List */}
            <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col min-h-[400px] border border-cat-base">
              <h2 className="text-lg font-bold text-cat-text mb-4">我的和弦序列</h2>
              <SequenceDisplay 
                sequence={sequence}
                keyRoot={keyRoot} keyScale={keyScale}
                onKeyRootChange={setKeyRoot} onKeyScaleChange={setKeyScale}
                onClear={() => setSequence([])}
                onInsertPassing={handleInsertPassing}
                onRemove={(i) => {
                    const newSeq = [...sequence];
                    newSeq.splice(i, 1);
                    setSequence(newSeq);
                }}
              />
            </div>

            {/* Charts (Analysis Mode Only) */}
            {activeTab === Tab.ANALYSIS && (
               <Charts sequence={sequence} />
            )}
          </div>

        </div>
      </main>

      {/* Footer Fretboard */}
      <footer className="flex-none bg-white z-40 relative shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <Fretboard 
          activeNotes={activeFretboardNotes} 
          mode={fbMode} 
          onFretClick={handleFretClick}
          rootNote={root}
        />
      </footer>

    </div>
  );
};

export default App;
