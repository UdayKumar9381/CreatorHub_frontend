import React from 'react';
import { Plus } from 'lucide-react';

interface ProjectHeaderProps {
  onAdd: () => void;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({ onAdd }) => {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="space-y-2">
        <h2 className="text-4xl font-black text-white tracking-tighter italic uppercase underline decoration-apple-green decoration-4 underline-offset-8">Hackathon Tracker</h2>
        <p className="text-gray-400 font-medium tracking-tight">Keep your engineering velocity high.</p>
      </div>
      <button 
        onClick={onAdd}
        className="flex items-center justify-center gap-2 px-10 py-4 bg-apple-green text-white rounded-[2rem] font-bold shadow-2xl shadow-apple-green/20 hover:scale-105 active:scale-95 transition-all text-lg"
      >
        <Plus className="w-6 h-6" />
        New Sprint
      </button>
    </header>
  );
};
