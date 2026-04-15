import React from 'react';
import { Plus, Filter } from 'lucide-react';

interface ChecklistHeaderProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  onAddTask: () => void;
}

export const ChecklistHeader: React.FC<ChecklistHeaderProps> = ({ 
  showFilters, 
  setShowFilters, 
  onAddTask 
}) => {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="space-y-1">
        <h2 className="text-4xl font-black text-white tracking-tighter italic uppercase">Checklist</h2>
        <p className="text-gray-400 font-medium tracking-tight">Track daily work updates & pending tasks.</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl transition-all font-bold text-sm border ${
            showFilters
              ? 'bg-sky-blue/10 border-sky-blue/30 text-sky-blue'
              : 'bg-white/5 hover:bg-white/10 border-white/10 shadow-2xl shadow-black/50 text-white'
          }`}
        >
          <Filter className="w-4 h-4" />
          Filters
        </button>
        <button
          onClick={onAddTask}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-sky-blue to-blue-500 text-white rounded-2xl font-bold shadow-2xl shadow-sky-blue/30 hover:scale-105 active:scale-95 transition-all text-sm"
        >
          <Plus className="w-4 h-4" />
          New Task
        </button>
      </div>
    </header>
  );
};
