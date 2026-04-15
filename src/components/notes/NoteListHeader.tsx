import React from 'react';
import { Plus } from 'lucide-react';

interface NoteListHeaderProps {
  onAdd: () => void;
}

export const NoteListHeader: React.FC<NoteListHeaderProps> = ({ onAdd }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h2 className="text-3xl font-black text-white tracking-tighter italic uppercase underline decoration-soft-pink decoration-4 underline-offset-8">Notion Workspace</h2>
        <p className="text-gray-400 font-medium tracking-tight">Your digital brain for long-form thoughts.</p>
      </div>
      <button 
        onClick={onAdd}
        className="flex items-center gap-2 px-8 py-3 bg-soft-pink text-white rounded-2xl font-bold shadow-2xl shadow-soft-pink/30 hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-widest"
      >
        <Plus className="w-5 h-5" />
        New Document
      </button>
    </div>
  );
};
