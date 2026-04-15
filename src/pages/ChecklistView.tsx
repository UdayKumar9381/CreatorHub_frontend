import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckSquare } from 'lucide-react';
import { useChecklist } from '../hooks/useChecklist';
import Loader from '../components/Loader';
import { ChecklistHeader } from '../components/checklist/ChecklistHeader';
import { ChecklistStats } from '../components/checklist/ChecklistStats';
import { ChecklistFilters } from '../components/checklist/ChecklistFilters';
import { ChecklistForm } from '../components/checklist/ChecklistForm';
import { ChecklistItem } from '../components/checklist/ChecklistItem';

export default function ChecklistView() {
  const {
    items,
    loading,
    isAdding,
    setIsAdding,
    addItem,
    toggleComplete,
    deleteItem,
    stats
  } = useChecklist();

  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      if (filter === 'pending' && item.is_completed) return false;
      if (filter === 'completed' && !item.is_completed) return false;
      if (priorityFilter !== 'all' && item.priority !== priorityFilter) return false;
      return true;
    });
  }, [items, filter, priorityFilter]);

  if (loading) return <Loader />;

  return (
    <div className="pt-20 px-8 relative z-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <ChecklistHeader 
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          onAddTask={() => setIsAdding(true)}
        />

        <ChecklistStats stats={stats} />

        <ChecklistFilters 
          show={showFilters}
          filter={filter}
          setFilter={setFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
        />

        <ChecklistForm 
          show={isAdding}
          onClose={() => setIsAdding(false)}
          onAdd={addItem}
        />

        <div className="space-y-3">
          {filteredItems.length === 0 && !isAdding && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="inline-flex p-5 bg-white/5 rounded-3xl mb-4 text-gray-700">
                <CheckSquare className="w-10 h-10" />
              </div>
              <p className="text-gray-500 font-bold text-lg">No tasks yet</p>
              <p className="text-gray-600 text-sm mt-1">Click "New Task" to start tracking your work</p>
            </motion.div>
          )}

          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <ChecklistItem 
                key={item.id}
                item={item}
                index={index}
                onToggle={toggleComplete}
                onDelete={deleteItem}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

