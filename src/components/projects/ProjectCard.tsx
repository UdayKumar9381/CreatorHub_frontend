import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Trash2 } from 'lucide-react';
import type { Project } from '../../types';
import { GlassCard } from '../GlassCard';

interface ProjectCardProps {
  project: Project;
  onDelete: (id: number) => void;
  statusColors: Record<string, string>;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onDelete, statusColors }) => {
  const calculateDaysLeft = (deadline: string | null) => {
    if (!deadline) return null;
    const diff = new Date(deadline).getTime() - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const daysLeft = calculateDaysLeft(project.deadline);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <GlassCard className="h-full flex flex-col p-6 border-white/5 bg-white/5 group overflow-hidden hover:border-white/10 transition-all">
        <div className="flex items-center justify-between mb-6">
          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${statusColors[project.status]}`}>
            {project.status}
          </span>
          <div className="flex items-center gap-3">
            {daysLeft !== null && (
              <div className={`flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-wider ${daysLeft <= 2 ? 'text-rose-500' : 'text-gray-500'}`}>
                <Calendar className="w-3 h-3" />
                {daysLeft === 0 ? 'Due Today' : `${daysLeft}d left`}
              </div>
            )}
            <button 
              onClick={() => onDelete(project.id)}
              className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-600 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        
        <h3 className="text-xl font-black text-white mb-2 truncate group-hover:text-apple-green transition-colors uppercase tracking-tight italic">
          {project.name}
        </h3>
        <p className="text-sm text-gray-500 font-medium line-clamp-2 mb-6 flex-1 leading-relaxed">
          {project.description}
        </p>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.tech_stack?.split(',').map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-white/5 rounded-md text-[9px] font-black text-gray-500 border border-white/5 tracking-wider uppercase">
                {tag.trim()}
              </span>
            ))}
          </div>
          
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ 
                width: project.status === 'completed' ? '100%' : 
                       project.status === 'judging' ? '90%' : 
                       project.status === 'building' ? '60%' : '20%' 
              }}
              className={`h-full transition-all duration-1000 ${
                project.status === 'completed' ? 'bg-apple-green' : 
                project.status === 'judging' ? 'bg-purple-500' :
                'bg-sky-blue'
              }`}
            />
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};
