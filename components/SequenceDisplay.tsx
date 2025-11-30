import React from 'react';
import { SequenceItem } from '../types';
import { getDegree } from '../services/theoryService';
import { Trash2, Music, PlusCircle } from 'lucide-react';
import { SleepingCat } from './CatDoodles';

interface SequenceDisplayProps {
  sequence: SequenceItem[];
  keyRoot: string;
  keyScale: string;
  onClear: () => void;
  onKeyRootChange: (val: string) => void;
  onKeyScaleChange: (val: string) => void;
  onInsertPassing: (index: number) => void;
  onRemove: (index: number) => void;
}

const SequenceDisplay: React.FC<SequenceDisplayProps> = ({ 
  sequence, keyRoot, keyScale, onClear, onKeyRootChange, onKeyScaleChange, onInsertPassing, onRemove
}) => {
  return (
    <div className="flex flex-col h-full relative">
      {/* Key Settings Toolbar */}
      <div className="flex flex-wrap items-center gap-2 mb-4 bg-cat-base p-2 rounded-xl border border-cat-secondary/20">
        <span className="text-xs font-bold text-cat-accent uppercase flex items-center gap-1">
          <Music size={12}/> 当前调式:
        </span>
        <select 
          value={keyRoot} 
          onChange={(e) => onKeyRootChange(e.target.value)}
          className="bg-white border border-gray-200 text-xs rounded-lg px-2 py-1 focus:outline-none cursor-pointer hover:border-cat-primary"
        >
          {['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <select 
          value={keyScale} 
          onChange={(e) => onKeyScaleChange(e.target.value)}
          className="bg-white border border-gray-200 text-xs rounded-lg px-2 py-1 focus:outline-none cursor-pointer hover:border-cat-primary"
        >
          <option value="major">大调 (Major)</option>
          <option value="minor">小调 (Minor)</option>
        </select>
        <div className="flex-1" />
        <button onClick={onClear} className="text-xs text-cat-danger hover:bg-red-50 px-2 py-1 rounded-lg transition-colors flex items-center gap-1">
          <Trash2 size={12} /> 清空全部
        </button>
      </div>

      {/* List */}
      <div className="flex flex-wrap gap-2 items-center content-start overflow-y-auto min-h-[160px] p-2">
        {sequence.length === 0 && (
          <div className="w-full flex flex-col items-center justify-center opacity-50 py-4">
            <SleepingCat className="w-32 h-20 text-cat-accent mb-2" />
            <div className="text-sm text-cat-accent italic">
              这里空空如也，猫猫睡着了... <br/>
              快添加一些和弦唤醒它！🐱
            </div>
          </div>
        )}
        
        {sequence.map((item, i) => (
          <React.Fragment key={item.id}>
            {/* The Chord Card */}
            <div className="group relative bg-white border-2 border-cat-base rounded-2xl p-3 min-w-[80px] flex flex-col items-center shadow-sm hover:shadow-md hover:border-cat-secondary transition-all hover:-translate-y-1">
              <button 
                onClick={() => onRemove(i)}
                className="absolute -top-2 -right-2 bg-white text-cat-danger rounded-full p-1 shadow border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
              >
                <Trash2 size={10} />
              </button>
              
              <span className="absolute top-1 left-2 text-[10px] text-gray-300 font-mono font-bold">{i + 1}</span>
              <span className="text-xl font-black text-cat-text mt-1">{item.name}</span>
              <span className="text-xs font-medium text-cat-primary bg-cat-base px-2 py-0.5 rounded-full mt-1">
                {getDegree(item.root, item.type, keyRoot, keyScale)}
              </span>
            </div>

            {/* Transition Button (Passing Chord) */}
            {i < sequence.length - 1 && (
               <button 
                 onClick={() => onInsertPassing(i)}
                 className="w-6 h-6 flex items-center justify-center rounded-full text-gray-300 hover:text-cat-secondary hover:bg-cat-base transition-all"
                 title="AI 推荐过渡和弦"
               >
                 <PlusCircle size={16} />
               </button>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SequenceDisplay;
