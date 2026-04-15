import React from 'react';
import { Sparkles } from 'lucide-react';

interface IdeaHeaderProps {
  onGenerate: () => void;
  onAdd: () => void;
  isGenerating: boolean;
}

export const IdeaHeader: React.FC<IdeaHeaderProps> = ({ onGenerate, onAdd, isGenerating }) => {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="space-y-1">
        <h2 className="text-4xl font-black text-white tracking-tighter italic uppercase">Idea Flow</h2>
        <p className="text-gray-400 font-medium tracking-tight">Capture breakthroughs as they happen.</p>
      </div>
      <div className="flex gap-4">
        <button 
          onClick={onGenerate}
          disabled={isGenerating}
          className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all font-bold text-sm shadow-2xl shadow-black/50 text-white"
        >
          {isGenerating ? (
            <div className="w-4 h-4 border-2 border-sky-blue border-t-transparent animate-spin rounded-full" />
          ) : (
            <Sparkles className="w-4 h-4 text-sky-blue" />
          )}
          Generate Concept
        </button>
        <button 
          onClick={onAdd}
          className="px-8 py-3 bg-gradient-to-r from-sky-blue to-blue-500 text-white rounded-2xl font-bold shadow-2xl shadow-sky-blue/30 hover:scale-105 active:scale-95 transition-all text-sm"
        >
          Quick Capture
        </button>
      </div>
    </header>
  );
};
