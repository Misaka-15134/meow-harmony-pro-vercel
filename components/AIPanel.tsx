import React, { useState } from 'react';
import { AIRecommendation } from '../types';
import { llmServiceFactory } from '../services/llmService';
import { API_MODELS } from '../constants';
import { Sparkles, Loader2, Key } from 'lucide-react';
import { RockCat } from './CatDoodles';

interface AIPanelProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  context: string[];
  currentChordName: string;
  onApplyRecommendation: (note: string, type: string) => void;
  mode: 'creation' | 'analysis';
}

const AIPanel: React.FC<AIPanelProps> = ({ 
  apiKey, onApiKeyChange, context, currentChordName, onApplyRecommendation, mode 
}) => {
  const [loading, setLoading] = useState(false);
  const [goal, setGoal] = useState(mode === 'creation' ? 'Standard Pop Progression' : 'High Tension');
  const [customPrompt, setCustomPrompt] = useState('');
  const [result, setResult] = useState<{ reasoning: string, recommendations: AIRecommendation[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiProvider, setApiProvider] = useState('gemini');
  const [openRouterModel, setOpenRouterModel] = useState('openai/gpt-3.5-turbo');

  const handleGenerate = async () => {
    if (!apiKey) {
      setError("请先输入有效的 API Key。");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const service = llmServiceFactory(apiProvider);
      if (!service) {
        throw new Error(`Unsupported API provider: ${apiProvider}`);
      }
      const fullContext = [...context, currentChordName].filter(Boolean);
      const data = await service.fetchRecommendations(apiKey, fullContext, goal, customPrompt, openRouterModel);
      setResult(data);
    } catch (e) {
      setError(`生成失败，请检查 API Key、网络连接或所选模型。 Error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-cat-base relative overflow-hidden">
      <RockCat className="absolute -right-4 -bottom-4 w-32 h-32 text-cat-base opacity-50 pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between mb-4 relative z-10 gap-2">
        <h3 className="text-lg font-bold text-cat-text flex items-center gap-2">
          <div className="bg-cat-secondary p-1.5 rounded-lg text-white">
            <Sparkles size={18} /> 
          </div>
          {mode === 'creation' ? 'AI 灵感作曲猫' : '和声分析专家'}
        </h3>
        <div className="flex items-center gap-2 bg-cat-base px-2 py-1 rounded-lg">
          <Key size={14} className="text-cat-accent" />
          <input 
            type="password" 
            placeholder="在此输入 API Key"
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
            className="text-xs bg-transparent border-none w-28 focus:outline-none text-cat-text placeholder-cat-text/30"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 relative z-10">
        <div>
          <label className="text-xs font-bold text-gray-400 block mb-1 pl-1">AI 模型提供商</label>
          <select
            value={apiProvider}
            onChange={(e) => setApiProvider(e.target.value)}
            className="w-full bg-cat-base border-none rounded-xl text-sm p-3 font-medium text-cat-text focus:ring-2 focus:ring-cat-secondary appearance-none cursor-pointer"
          >
            {API_MODELS.map(model => (
              <option key={model.id} value={model.id}>{model.name}</option>
            ))}
          </select>
        </div>
        {apiProvider === 'openrouter' && (
          <div>
            <label className="text-xs font-bold text-gray-400 block mb-1 pl-1">OpenRouter Model</label>
            <input
              type="text"
              placeholder="e.g. openai/gpt-4o"
              value={openRouterModel}
              onChange={(e) => setOpenRouterModel(e.target.value)}
              className="w-full bg-cat-base border-none rounded-xl text-sm p-3 focus:ring-2 focus:ring-cat-secondary"
            />
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 relative z-10">
        <div>
          <label className="text-xs font-bold text-gray-400 block mb-1 pl-1">目标风格 / 氛围</label>
          <select 
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full bg-cat-base border-none rounded-xl text-sm p-3 font-medium text-cat-text focus:ring-2 focus:ring-cat-secondary appearance-none cursor-pointer"
          >
            <optgroup label="基础风格">
              <option value="Standard Pop Progression">标准流行 (Standard Pop)</option>
              <option value="Warm & Cozy (Major)">温暖治愈 (大调)</option>
              <option value="Sad & Melancholic (Minor)">忧郁伤感 (小调)</option>
            </optgroup>
            
            <optgroup label="摇滚风格 (Rock)">
              <option value="Classic Rock / Power Chords">经典摇滚 (Classic Rock)</option>
              <option value="Punk Rock (Fast & Simple)">朋克摇滚 (Punk Rock)</option>
              <option value="J-Rock / Anime Style">日系摇滚 / 动漫风 (J-Rock)</option>
              <option value="Math Rock (Complex Rhythm)">数学摇滚 (Math Rock)</option>
              <option value="Indie / Shoegaze">独立摇滚 / 自赏 (Indie)</option>
              <option value="Progressive Metal">前卫金属 (Prog Metal)</option>
            </optgroup>

            <optgroup label="高级/实验">
              <option value="Jazzy & Complex">爵士/复杂和声 (Jazz)</option>
              <option value="Neo-Soul">Neo-Soul / R&B</option>
              <option value="Unexpected Modulation">意外转调 (Modulation)</option>
            </optgroup>
          </select>
        </div>
        <div>
          <label className="text-xs font-bold text-gray-400 block mb-1 pl-1">给 AI 的悄悄话 (自定义)</label>
          <input 
            type="text" 
            placeholder="例如：我要那种“橘猫晒太阳”的感觉..."
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            className="w-full bg-cat-base border-none rounded-xl text-sm p-3 focus:ring-2 focus:ring-cat-secondary"
          />
        </div>
      </div>

      <button 
        onClick={handleGenerate}
        disabled={loading}
        className="relative z-10 w-full bg-cat-text text-white font-bold rounded-xl py-3 shadow-lg hover:shadow-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
      >
        {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={16} className="text-cat-highlight"/>}
        {loading ? '猫猫正在思考...' : '获取 AI 灵感'}
      </button>

      {error && <div className="mt-3 text-xs text-cat-danger text-center bg-red-50 p-2 rounded-lg">{error}</div>}

      {result && (
        <div className="mt-5 animate-in slide-in-from-bottom-2 fade-in relative z-10">
          <div className="bg-cat-base/80 backdrop-blur-sm p-4 rounded-2xl mb-3 border border-cat-primary/10">
            <span className="text-xs font-bold text-cat-accent block mb-1">😺 推荐理由:</span>
            <p className="text-sm text-gray-700 leading-relaxed">"{result.reasoning}"</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.recommendations.map((rec, idx) => (
              <button 
                key={idx}
                onClick={() => onApplyRecommendation(rec.note, rec.type)}
                className="group relative bg-white border-2 border-cat-base rounded-xl px-4 py-2 hover:border-cat-primary hover:bg-cat-primary hover:text-white transition-all text-left shadow-sm flex-1 min-w-[100px]"
              >
                <div className="font-black text-base">{rec.note}{rec.type}</div>
                <div className="text-[10px] text-gray-400 font-bold group-hover:text-white/90">{rec.label}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIPanel;