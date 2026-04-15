import React from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Square, Trash2, Calendar } from 'lucide-react';
import type { ChecklistItem as ChecklistItemType } from '../../types';
import { GlassCard } from '../GlassCard';

interface ChecklistItemProps {
  item: ChecklistItemType;
  index: number;
  onToggle: (item: ChecklistItemType) => void;
  onDelete: (id: number) => void;
}

const PRIORITY_CONFIG = {
  high: { label: 'High', color: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/20', dot: 'bg-rose-50', ring: 'ring-rose-500/10' },
  medium: { label: 'Medium', color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20', dot: 'bg-amber-500', ring: 'ring-amber-500/10' },
  low: { label: 'Low', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-500', ring: 'ring-emerald-500/10' },
};

export const ChecklistItem: React.FC<ChecklistItemProps> = ({ item, index, onToggle, onDelete }) => {
  const pConfig = PRIORITY_CONFIG[item.priority];
  const isOverdue = item.due_date && new Date(item.due_date) < new Date() && !item.is_completed;

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (d.toDateString() === today.toDateString()) return 'Today';
    if (d.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10, scale: 0.95 }}
      transition={{ delay: index * 0.03 }}
    >
      <GlassCard className={`group flex items-center gap-4 !py-4 transition-all ${
        item.is_completed ? 'opacity-60' : ''
      } ${isOverdue ? '!border-rose-500/30 !bg-rose-500/5' : ''}`}>
        {/* Checkbox */}
        <button
          onClick={() => onToggle(item)}
          className="shrink-0 transition-transform hover:scale-110 active:scale-90"
        >
          {item.is_completed ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <CheckSquare className="w-6 h-6 text-sky-blue fill-sky-blue/10" />
            </motion.div>
          ) : (
            <Square className={`w-6 h-6 ${isOverdue ? 'text-rose-400' : 'text-gray-500'} hover:text-sky-blue transition-colors`} />
          )}
        </button>

        {/* Priority indicator */}
        <div className={`w-1 h-8 rounded-full ${pConfig.color.replace('text', 'bg')} shrink-0`} />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={`font-bold text-base transition-all ${
              item.is_completed ? 'line-through text-gray-500' : 'text-white'
            }`}>
              {item.title}
            </h3>
            <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider ${pConfig.bg} ${pConfig.color}`}>
              {item.priority}
            </span>
            {item.category !== 'general' && (
              <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-white/5 text-gray-400">
                {item.category}
              </span>
            )}
          </div>
          {item.due_date && (
            <div className={`flex items-center gap-1 mt-1 text-xs font-semibold ${
              isOverdue ? 'text-rose-500' : 'text-gray-400'
            }`}>
              <Calendar className="w-3 h-3" />
              <span>{isOverdue ? 'Overdue · ' : ''}{formatDate(item.due_date)}</span>
            </div>
          )}
        </div>

        {/* Delete */}
        <button
          onClick={() => onDelete(item.id)}
          className="opacity-0 group-hover:opacity-100 p-2 text-gray-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all shrink-0"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </GlassCard>
    </motion.div>
  );
};
