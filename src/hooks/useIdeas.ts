import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { ideaService, aiService } from '../services/api';
import type { Idea } from '../types';

export function useIdeas() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const fetchIdeas = useCallback(async () => {
    try {
      const res = await ideaService.getIdeas();
      setIdeas(res.data);
    } catch (err) {
      toast.error('Failed to load ideas');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIdeas();
  }, [fetchIdeas]);

  const addIdea = async (title: string, description: string) => {
    if (!title) return false;
    try {
      const res = await ideaService.createIdea({ title, description, status: 'todo' });
      setIdeas(prev => [res.data, ...prev]);
      toast.success('Idea captured!');
      return true;
    } catch (err) {
      toast.error('Failed to save idea');
      return false;
    }
  };

  const deleteIdea = async (id: number) => {
    const originalIdeas = [...ideas];
    setIdeas(prev => prev.filter(i => i.id !== id));
    
    try {
      await ideaService.deleteIdea(id);
      toast.success('Idea removed');
    } catch (err) {
      setIdeas(originalIdeas);
      toast.error('Delete failed');
    }
  };

  const toggleStatus = async (idea: Idea) => {
    const nextStatus = idea.status === 'done' ? 'todo' : 'done';
    const originalIdeas = [...ideas];
    setIdeas(prev => prev.map(i => i.id === idea.id ? { ...i, status: nextStatus } : i));
    
    try {
      await ideaService.updateIdea(idea.id, { status: nextStatus });
    } catch (err) {
      setIdeas(originalIdeas);
      toast.error('Status update failed');
    }
  };

  const generateConcept = async () => {
    setIsGenerating(true);
    try {
      const res = await aiService.generateIdea();
      toast.success('AI breakthrough!', { icon: '✨' });
      return res.data;
    } catch (err) {
      toast.error('AI is resting');
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    ideas,
    loading,
    isAdding,
    setIsAdding,
    isGenerating,
    addIdea,
    deleteIdea,
    toggleStatus,
    generateConcept,
    refresh: fetchIdeas
  };
}
