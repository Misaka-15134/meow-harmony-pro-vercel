import React from 'react';
import { FretboardNote, FretboardMode } from '../types';
import { TUNING } from '../constants';
import { getNoteName } from '../services/theoryService';

interface FretboardProps {
  activeNotes: FretboardNote[];
  mode: FretboardMode;
  onFretClick: (stringIdx: number, fret: number) => void;
  rootNote: string;
}

const Fretboard: React.FC<FretboardProps> = ({ activeNotes, mode, onFretClick, rootNote }) => {
  const strings = [0, 1, 2, 3, 4, 5]; // High E to Low E in display logic (reversed usually)
  const frets = Array.from({ length: 14 }, (_, i) => i);

  return (
    <div className="bg-cat-surface border-t-4 border-cat-primary shadow-[0_-5px_15px_rgba(0,0,0,0.05)] p-4 select-none">
      <div className="flex justify-between items-center mb-2 px-4 max-w-7xl mx-auto">
        <div className="text-sm font-bold text-cat-text flex items-center gap-2">
          <span className="text-xl">🎸</span>
          <span>吉他指板演示</span>
          <span className={`text-xs px-2 py-0.5 rounded-full transition-colors ${mode === FretboardMode.CUSTOM ? 'bg-cat-secondary text-white' : 'bg-gray-100 text-gray-500'}`}>
            {mode === FretboardMode.CUSTOM ? '交互编辑模式' : '和弦展示模式'}
          </span>
        </div>
        <div className="text-xs text-cat-accent italic hidden sm:block">
          {mode === FretboardMode.CUSTOM ? '点击指板上的品格来自由添加/移除音符' : '正在显示上方选择和弦的指法位置'}
        </div>
      </div>

      <div className="overflow-x-auto pb-4 text-center">
        <div className="inline-block min-w-[800px] bg-[#2a2a2a] p-1 rounded-xl border-4 border-cat-accent relative shadow-inner">
           {/* Render strings from High E (5) to Low E (0) */}
           {[5, 4, 3, 2, 1, 0].map((s) => (
             <div key={s} className="flex relative h-8 items-center">
               {/* String Line */}
               <div 
                  className="absolute left-0 right-0 top-1/2 bg-[#8d8d8d] z-0 shadow-sm"
                  style={{ height: `${1 + (5 - s) * 0.5}px` }} // Thicker for low strings
               />
               
               {frets.map(f => {
                 const midi = TUNING[s] + f;
                 const noteName = getNoteName(midi);
                 const isActive = activeNotes.some(n => n.string === s && n.fret === f);
                 const isRoot = isActive && noteName === rootNote;
                 
                 return (
                   <div 
                    key={f} 
                    className={`
                      relative z-10 w-[60px] h-full border-r border-[#444] flex items-center justify-center
                      ${f === 0 ? 'bg-[#222] border-r-4 border-[#666]' : ''} 
                      ${mode === FretboardMode.CUSTOM ? 'cursor-pointer hover:bg-white/10' : ''}
                    `}
                    onClick={() => onFretClick(s, f)}
                   >
                     {isActive && (
                       <div className={`
                          w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shadow-lg transform transition-transform duration-200 animate-in fade-in zoom-in
                          ${isRoot ? 'bg-cat-danger text-white ring-2 ring-white' : 'bg-cat-note text-white'}
                          ${mode === FretboardMode.CUSTOM && !isRoot ? 'bg-cat-secondary ring-1 ring-white' : ''}
                       `}>
                         {noteName}
                       </div>
                     )}
                     
                     {/* Fret marker dots */}
                     {(s === 2 || s === 3) && [3, 5, 7, 9].includes(f) && !isActive && (
                        <div className="w-2 h-2 rounded-full bg-[#444] absolute pointer-events-none" />
                     )}
                     {(s === 1 || s === 4) && f === 12 && !isActive && (
                        <div className="w-2 h-2 rounded-full bg-[#444] absolute pointer-events-none" />
                     )}
                   </div>
                 );
               })}
             </div>
           ))}
           
           {/* Fret Numbers */}
           <div className="flex h-6 bg-[#222] rounded-b-lg mt-1">
             {frets.map(f => (
               <div key={f} className="w-[60px] flex items-center justify-center text-[10px] text-gray-500 font-mono">
                 {f}
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Fretboard;
