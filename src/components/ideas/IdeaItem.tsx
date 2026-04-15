import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Trash2 } from 'lucide-react';
import type { Idea } from '../../types';
import { GlassCard } from '../GlassCard';

interface IdeaItemProps {
  idea: Idea;
  onToggle: (idea: Idea) => void;
  onDelete: (id: number) => void;
}

export const IdeaItem: React.FC<IdeaItemProps> = ({ idea, onToggle, onDelete }) => {
  return (
    <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <GlassCard className="group flex items-start gap-4 hover:border-white/20 transition-all cursor-default">
        <button 
          onClick={() => onToggle(idea)} 
          className={`mt-1 transition-all active:scale-90 ${idea.status === 'done' ? 'text-sky-blue' : 'text-gray-500 hover:text-sky-blue'}`}
        >
          {idea.status === 'done' ? (
            <CheckCircle className="w-6 h-6 fill-sky-blue/10" />
          ) : (
            <Circle className="w-6 h-6" />
          )}
        </button>
        <div className="flex-1 min-w-0">
          <h3 className={`text-lg font-bold transition-all ${
            idea.status === 'done' ? 'line-through text-gray-600' : 'text-white'
          }`}>
            {idea.title}
          </h3>
          <p className="text-sm text-gray-400 font-medium leading-relaxed">
            {idea.description}
          </p>
        </div>
        <button 
          onClick={() => onDelete(idea.id)} 
          className="opacity-0 group-hover:opacity-100 p-2 text-gray-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all shrink-0"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </GlassCard>
    </motion.div>
  );
};
