import React from 'react';
import { Play, Square } from 'lucide-react';
import { RhythmPattern } from '../types';
import { PawPrint } from './CatDoodles';

interface RhythmPanelProps {
  bpm: number;
  pattern: RhythmPattern;
  isPlaying: boolean;
  onBpmChange: (bpm: number) => void;
  onPatternChange: (p: RhythmPattern) => void;
  onPlaySequence: () => void;
}

const RhythmPanel: React.FC<RhythmPanelProps> = ({
  bpm, pattern, isPlaying, onBpmChange, onPatternChange, onPlaySequence
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-cat-base flex flex-col gap-3">
      <div className="flex items-center gap-2 mb-1">
        <PawPrint className="w-5 h-5 text-cat-primary" />
        <h3 className="text-sm font-bold text-cat-text">喵喵节奏机 (Rhythm)</h3>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Play Button */}
        <button
          onClick={onPlaySequence}
          disabled={isPlaying}
          className={`
            w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all
            ${isPlaying ? 'bg-gray-200 cursor-not-allowed' : 'bg-cat-primary text-white hover:scale-110 active:scale-95'}
          `}
        >
          {isPlaying ? <Square size={16} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1"/>}
        </button>

        <div className="flex-1 flex flex-col gap-2">
           {/* Pattern Select */}
           <div className="flex gap-2 text-xs overflow-x-auto pb-1">
             {[
               {id: 'strum', label: '民谣扫弦'},
               {id: 'arpeggio', label: '分解和弦'},
               {id: 'block', label: '柱式和弦'},
               {id: 'rock', label: '摇滚切音'}
             ].map(p => (
               <button
                 key={p.id}
                 onClick={() => onPatternChange(p.id as RhythmPattern)}
                 className={`px-3 py-1.5 rounded-full border transition-all whitespace-nowrap ${
                   pattern === p.id 
                   ? 'bg-cat-secondary text-white border-cat-secondary font-bold' 
                   : 'bg-white text-gray-500 border-gray-200 hover:border-cat-secondary'
                 }`}
               >
                 {p.label}
               </button>
             ))}
           </div>

           {/* BPM Slider */}
           <div className="flex items-center gap-2">
             <span className="text-xs font-bold text-gray-400 w-8">BPM</span>
             <input 
               type="range" 
               min="60" max="180" step="1"
               value={bpm}
               onChange={(e) => onBpmChange(parseInt(e.target.value))}
               className="flex-1 accent-cat-primary h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer"
             />
             <span className="text-xs font-mono text-cat-accent w-8 text-right">{bpm}</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default RhythmPanel;
