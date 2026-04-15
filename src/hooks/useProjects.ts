import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { projectService } from '../services/api';
import { Project } from '../types';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await projectService.getProjects();
      setProjects(res.data);
    } catch (err) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const addProject = async (data: Partial<Project>) => {
    try {
      const res = await projectService.createProject(data);
      setProjects(prev => [res.data, ...prev]);
      toast.success('Sprint launched! 🚀');
      return true;
    } catch (err) {
      toast.error('Launch failed');
      return false;
    }
  };

  const updateProject = async (id: number, data: Partial<Project>) => {
    const originalProjects = [...projects];
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
    
    try {
      await projectService.updateProject(id, data);
    } catch (err) {
      setProjects(originalProjects);
      toast.error('Update failed');
    }
  };

  const deleteProject = async (id: number) => {
    const originalProjects = [...projects];
    setProjects(prev => prev.filter(p => p.id !== id));
    
    try {
      await projectService.deleteProject(id);
      toast.success('Project removed');
    } catch (err) {
      setProjects(originalProjects);
      toast.error('Delete failed');
    }
  };

  return {
    projects,
    loading,
    isAdding,
    setIsAdding,
    addProject,
    updateProject,
    deleteProject,
    refresh: fetchProjects
  };
}
