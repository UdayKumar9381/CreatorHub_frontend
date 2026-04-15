import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../GlassCard';

interface IdeaFormProps {
  show: boolean;
  onClose: () => void;
  onAdd: (title: string, description: string) => Promise<boolean>;
  initialTitle?: string;
  initialDescription?: string;
}

export const IdeaForm: React.FC<IdeaFormProps> = ({ 
  show, 
  onClose, 
  onAdd,
  initialTitle = '',
  initialDescription = ''
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialTitle) setTitle(initialTitle);
    if (initialDescription) setDescription(initialDescription);
  }, [initialTitle, initialDescription]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || submitting) return;

    setSubmitting(true);
    const success = await onAdd(title, description);
    setSubmitting(false);

    if (success) {
      setTitle('');
      setDescription('');
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
          <GlassCard className="border-sky-blue/30 !border-2 shadow-2xl shadow-sky-blue/10" hover={false}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                autoFocus 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="What's the breakthrough?" 
                className="w-full text-xl font-bold bg-transparent outline-none text-white placeholder:text-gray-700" 
              />
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Describe the concept..." 
                rows={3} 
                className="w-full bg-transparent outline-none text-gray-400 font-medium resize-none placeholder:text-gray-700" 
              />
              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={onClose} 
                  className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="px-8 py-2 bg-gradient-to-r from-sky-blue to-blue-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-sky-blue/20 hover:shadow-xl transition-all disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : 'Save Concept'}
                </button>
              </div>
            </form>
          </GlassCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
