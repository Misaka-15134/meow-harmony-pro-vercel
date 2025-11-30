import React from 'react';
import { NOTES, CHORD_DEFINITIONS } from '../constants';
import { Play, Plus } from 'lucide-react';

interface ChordControlsProps {
  root: string;
  type: string;
  bass: string;
  onRootChange: (val: string) => void;
  onTypeChange: (val: string) => void;
  onBassChange: (val: string) => void;
  onPlay: () => void;
  onAdd: () => void;
  disabled?: boolean;
}

const ChordControls: React.FC<ChordControlsProps> = ({
  root, type, bass, onRootChange, onTypeChange, onBassChange, onPlay, onAdd, disabled
}) => {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 items-end ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-gray-400 pl-1">根音 (Root)</label>
        <select 
          value={root} 
          onChange={e => onRootChange(e.target.value)}
          className="bg-cat-base border border-cat-secondary rounded-xl p-2 text-sm font-bold text-cat-text focus:outline-none focus:ring-2 focus:ring-cat-primary appearance-none cursor-pointer text-center"
        >
          {NOTES.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-gray-400 pl-1">类型 (Type)</label>
        <select 
          value={type} 
          onChange={e => onTypeChange(e.target.value)}
          className="bg-cat-base border border-cat-secondary rounded-xl p-2 text-sm font-bold text-cat-text focus:outline-none focus:ring-2 focus:ring-cat-primary appearance-none cursor-pointer text-center"
        >
          {Object.keys(CHORD_DEFINITIONS).map(k => (
            <option key={k} value={k}>
              {`${CHORD_DEFINITIONS[k].longName} (${CHORD_DEFINITIONS[k].longName_zh})`}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-gray-400 pl-1">低音 (Bass)</label>
        <select 
          value={bass} 
          onChange={e => onBassChange(e.target.value)}
          className="bg-cat-base border border-cat-secondary rounded-xl p-2 text-sm font-bold text-cat-text focus:outline-none focus:ring-2 focus:ring-cat-primary appearance-none cursor-pointer text-center"
        >
          <option value="none">无</option>
          {NOTES.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={onPlay}
          className="flex-1 bg-white border-2 border-cat-secondary text-cat-secondary hover:bg-cat-secondary hover:text-white rounded-xl p-2 flex items-center justify-center transition-all shadow-sm active:scale-95"
          title="试听和弦"
        >
          <Play size={20} fill="currentColor" />
        </button>
        <button 
          onClick={onAdd}
          className="flex-1 bg-cat-primary hover:bg-cat-accent text-white rounded-xl p-2 flex items-center justify-center transition-all shadow-md active:scale-95 active:shadow-sm"
          title="添加到序列"
        >
          <Plus size={24} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

export default ChordControls;
