import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, CheckSquare, AlertCircle } from 'lucide-react';
import { GlassCard } from '../GlassCard';

interface ChecklistStatsProps {
  stats: {
    progress: number;
    pending: number;
    completed: number;
    highPriority: number;
  };
}

export const ChecklistStats: React.FC<ChecklistStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
        <GlassCard hover={false} className="!p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sky-blue/10 rounded-xl">
              <TrendingUp className="w-5 h-5 text-sky-blue" />
            </div>
            <div>
              <p className="text-2xl font-black text-white">{stats.progress}%</p>
              <p className="text-xs text-gray-500 font-black uppercase tracking-widest">Progress</p>
            </div>
          </div>
          <div className="mt-3 w-full h-1.5 bg-gray-100/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-sky-blue to-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${stats.progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </GlassCard>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <GlassCard hover={false} className="!p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 rounded-xl">
              <Clock className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-black text-white">{stats.pending}</p>
              <p className="text-xs text-gray-500 font-black uppercase tracking-widest">Pending</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <GlassCard hover={false} className="!p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 rounded-xl">
              <CheckSquare className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-black text-white">{stats.completed}</p>
              <p className="text-xs text-gray-500 font-black uppercase tracking-widest">Done</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <GlassCard hover={false} className="!p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-500/10 rounded-xl">
              <AlertCircle className="w-5 h-5 text-rose-500" />
            </div>
            <div>
              <p className="text-2xl font-black text-white">{stats.highPriority}</p>
              <p className="text-xs text-gray-500 font-black uppercase tracking-widest">Urgent</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};
