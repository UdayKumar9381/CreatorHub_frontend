import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { Note } from '../../types';
import { GlassCard } from '../GlassCard';

interface NoteCardProps {
  note: Note;
  index: number;
  onClick: (note: Note) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, index, onClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
    >
      <GlassCard 
        onClick={() => onClick(note)}
        className="cursor-pointer group h-full hover:border-soft-pink/30 hover:shadow-2xl hover:shadow-soft-pink/5 transition-all"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 bg-soft-pink/10 rounded-xl group-hover:bg-soft-pink/20 transition-all group-hover:scale-110">
            <FileText className="text-soft-pink w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-white mb-1 truncate group-hover:text-soft-pink transition-colors uppercase tracking-tight italic">{note.title}</h4>
            <p className="text-sm text-gray-500 font-medium line-clamp-2 leading-relaxed">
              {note.content || 'Click to start writing your creative mission...'}
            </p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};
