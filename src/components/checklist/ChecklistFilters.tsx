import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../GlassCard';

interface ChecklistFiltersProps {
  show: boolean;
  filter: 'all' | 'pending' | 'completed';
  setFilter: (f: 'all' | 'pending' | 'completed') => void;
  priorityFilter: 'all' | 'high' | 'medium' | 'low';
  setPriorityFilter: (p: 'all' | 'high' | 'medium' | 'low') => void;
}

export const ChecklistFilters: React.FC<ChecklistFiltersProps> = ({
  show,
  filter,
  setFilter,
  priorityFilter,
  setPriorityFilter
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden"
        >
          <GlassCard hover={false} className="!p-5">
            <div className="flex flex-wrap gap-4 items-center">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Status</span>
              <div className="flex gap-2">
                {(['all', 'pending', 'completed'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      filter === f
                        ? 'bg-sky-blue text-white shadow-lg shadow-sky-blue/20'
                        : 'bg-white/5 text-gray-500 hover:bg-white/10'
                    }`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>

              <div className="w-px h-6 bg-white/10 mx-2 hidden md:block" />

              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Priority</span>
              <div className="flex gap-2">
                {(['all', 'high', 'medium', 'low'] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => setPriorityFilter(p)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      priorityFilter === p
                        ? 'bg-sky-blue text-white shadow-lg shadow-sky-blue/20'
                        : 'bg-white/5 text-gray-500 hover:bg-white/10'
                    }`}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
