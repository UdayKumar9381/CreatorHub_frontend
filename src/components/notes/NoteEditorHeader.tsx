import React from 'react';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';

interface NoteEditorHeaderProps {
  onBack: () => void;
  onSave: () => void;
  onDelete: () => void;
  saving: boolean;
}

export const NoteEditorHeader: React.FC<NoteEditorHeaderProps> = ({ 
  onBack, 
  onSave, 
  onDelete,
  saving 
}) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex gap-3">
        <button 
          onClick={onBack}
          className="p-3 bg-white/5 text-gray-400 rounded-2xl hover:bg-white/10 hover:text-white transition-all shadow-xl shadow-black/20"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={onDelete}
          className="p-3 bg-white/5 text-gray-500 rounded-2xl hover:bg-rose-500/10 hover:text-rose-500 transition-all shadow-xl shadow-black/20"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
      
      <button 
        onClick={onSave}
        disabled={saving}
        className="flex items-center gap-2 px-8 py-3 bg-soft-pink text-white rounded-2xl font-bold shadow-xl shadow-soft-pink/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 uppercase text-xs tracking-widest"
      >
        {saving ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full" />
        ) : (
          <Save className="w-4 h-4" />
        )}
        {saving ? 'Saving...' : 'Save Draft'}
      </button>
    </div>
  );
};
