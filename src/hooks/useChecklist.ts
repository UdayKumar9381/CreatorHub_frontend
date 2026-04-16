import { useState, useEffect, useMemo, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { checklistService } from '../services/api';
import type { ChecklistItem } from '../types';

export function useChecklist() {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const fetchItems = useCallback(async () => {
    try {
      const res = await checklistService.getItems();
      setItems(res.data);
    } catch (err) {
      toast.error('Failed to load checklist');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const addItem = async (title: string, priority: 'low' | 'medium' | 'high', category: string, dueDate?: string) => {
    if (!title.trim()) return false;
    try {
      const payload: Partial<ChecklistItem> = { title, priority, category };
      if (dueDate) {
        try {
          payload.due_date = new Date(dueDate).toISOString();
        } catch (e) {
          console.error('Invalid date format:', dueDate);
        }
      }
      
      const res = await checklistService.createItem(payload);
      setItems(prev => [res.data, ...prev]);
      toast.success('Task added! ✅');
      return true;
    } catch (err) {
      toast.error('Failed to add task');
      return false;
    }
  };

  const toggleComplete = async (item: ChecklistItem) => {
    // Optimistic UI update
    const originalItems = [...items];
    setItems(prev => prev.map(i => i.id === item.id ? { ...i, is_completed: !i.is_completed } : i));
    
    try {
      await checklistService.updateItem(item.id, { is_completed: !item.is_completed });
    } catch (err) {
      setItems(originalItems); // Rollback on failure
      toast.error('Sync failed. Please try again.');
    }
  };

  const deleteItem = async (id: number) => {
    const originalItems = [...items];
    setItems(prev => prev.filter(i => i.id !== id));
    
    try {
      await checklistService.deleteItem(id);
      toast.success('Task removed');
    } catch (err) {
      setItems(originalItems); // Rollback
      toast.error('Delete failed');
    }
  };

  const stats = useMemo(() => {
    const total = items.length;
    const completed = items.filter(i => i.is_completed).length;
    const pending = total - completed;
    const highPriority = items.filter(i => i.priority === 'high' && !i.is_completed).length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
    const overdue = items.filter(i => {
      if (!i.due_date || i.is_completed) return false;
      return new Date(i.due_date) < new Date();
    }).length;
    return { total, completed, pending, highPriority, progress, overdue };
  }, [items]);

  return {
    items,
    loading,
    isAdding,
    setIsAdding,
    addItem,
    toggleComplete,
    deleteItem,
    stats,
    refresh: fetchItems
  };
}
