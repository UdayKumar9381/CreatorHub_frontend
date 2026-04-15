import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, X, Flag, ChevronDown, Calendar } from 'lucide-react';
import { GlassCard } from '../GlassCard';

interface ChecklistFormProps {
  show: boolean;
  onClose: () => void;
  onAdd: (title: string, priority: 'low' | 'medium' | 'high', category: string, dueDate: string) => Promise<boolean>;
}

const CATEGORIES = ['general', 'work', 'personal', 'urgent', 'meetings', 'follow-up'];

export const ChecklistForm: React.FC<ChecklistFormProps> = ({ show, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [category, setCategory] = useState('general');
  const [dueDate, setDueDate] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || submitting) return;
    
    setSubmitting(true);
    const success = await onAdd(title, priority, category, dueDate);
    setSubmitting(false);
    
    if (success) {
      setTitle('');
      setPriority('medium');
      setCategory('general');
      setDueDate('');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
        >
          <GlassCard className="border-sky-blue/30 !border-2" hover={false}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-sky-blue/10 rounded-xl">
                  <Zap className="w-5 h-5 text-sky-blue" />
                </div>
                <input
                  autoFocus
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What needs to be done?"
                  className="flex-1 text-lg font-bold bg-transparent outline-none text-white placeholder-gray-700"
                />
                <button type="button" onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              <div className="flex flex-wrap gap-4 items-end">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Priority</label>
                  <div className="flex gap-1.5">
                    {(['low', 'medium', 'high'] as const).map(p => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPriority(p)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                          priority === p
                            ? 'bg-sky-blue/20 text-sky-blue border border-sky-blue/50 ring-2 ring-sky-blue/20'
                            : 'bg-white/5 text-gray-500 border border-transparent hover:bg-white/10'
                        }`}
                      >
                        <Flag className="w-3 h-3" />
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Category</label>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="appearance-none px-4 py-1.5 pr-8 bg-white/5 rounded-lg text-xs font-bold text-gray-400 outline-none cursor-pointer hover:bg-white/10 transition-colors border border-white/5 focus:border-sky-blue/30"
                    >
                      {CATEGORIES.map(c => (
                        <option key={c} value={c} className="bg-slate-900">{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-3 h-3 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Due Date</label>
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="pl-8 pr-3 py-1.5 bg-white/5 rounded-lg text-xs font-bold text-gray-400 outline-none hover:bg-white/10 transition-colors border border-white/5 focus:border-sky-blue/30 [color-scheme:dark]"
                    />
                  </div>
                </div>

                <div className="flex-1" />

                <div className="flex gap-3">
                  <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-white transition-colors">
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="px-6 py-2 bg-gradient-to-r from-sky-blue to-blue-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-sky-blue/20 hover:shadow-xl hover:shadow-sky-blue/30 transition-all disabled:opacity-50"
                  >
                    {submitting ? 'Adding...' : 'Add Task'}
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
