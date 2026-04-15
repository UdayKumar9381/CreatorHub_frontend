import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../GlassCard';
import { Project } from '../../types';

interface ProjectFormProps {
  show: boolean;
  onClose: () => void;
  onAdd: (data: Partial<Project>) => Promise<boolean>;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ show, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [techStack, setTechStack] = useState('');
  const [deadline, setDeadline] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || submitting) return;

    setSubmitting(true);
    const success = await onAdd({
      name,
      description,
      tech_stack: techStack,
      deadline: deadline ? new Date(deadline).toISOString() : null,
      status: 'planning'
    });
    setSubmitting(false);

    if (success) {
      setName('');
      setDescription('');
      setTechStack('');
      setDeadline('');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          <GlassCard className="bg-black/60 p-8 border-apple-green/30 !border-2 shadow-2xl shadow-apple-green/5" hover={false}>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Project Name</label>
                  <input 
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g. NEURAL SYNESTHESIA" 
                    className="w-full text-2xl font-black bg-transparent outline-none text-white placeholder:text-gray-800 italic uppercase tracking-tighter border-b border-white/5 focus:border-apple-green/30 transition-colors pb-2"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Concept</label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What are we building?"
                    rows={4}
                    className="w-full bg-white/5 p-4 rounded-2xl outline-none text-gray-400 font-medium resize-none border border-transparent focus:border-white/10 transition-colors"
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Tech Stack</label>
                  <input 
                    value={techStack}
                    onChange={(e) => setTechStack(e.target.value)}
                    placeholder="NEXTJS, FASTAPI, DALL-E"
                    className="w-full p-4 bg-white/5 rounded-2xl border border-transparent focus:border-white/10 outline-none text-sm font-bold text-white placeholder:text-gray-700 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Deadline</label>
                  <input 
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full p-4 bg-white/5 rounded-2xl border border-transparent focus:border-white/10 outline-none text-sm font-bold text-white [color-scheme:dark] transition-colors"
                  />
                </div>
                
                <div className="flex justify-end gap-4 pt-4">
                  <button 
                    type="button" 
                    onClick={onClose} 
                    className="px-6 py-2 font-bold text-gray-500 hover:text-white transition-colors"
                  >
                    ABORT
                  </button>
                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="px-8 py-3 bg-apple-green text-white rounded-xl font-bold shadow-2xl shadow-apple-green/30 text-xs uppercase tracking-widest hover:scale-105 transition-all disabled:opacity-50"
                  >
                    {submitting ? 'LAUNCHING...' : 'LAUNCH SPRINT'}
                  </button>
                </div>
              </div>
            </form>
          </GlassCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
