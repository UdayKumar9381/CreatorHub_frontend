import axios, { AxiosInstance } from 'axios';
import { 
  AuthResponse, 
  Idea, 
  Note, 
  Project, 
  ChecklistItem, 
  AIResponse 
} from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'https://ideaflow-backend-xerc.onrender.com';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Instead of hard reload, we could trigger a custom event or a context update
      // For now, redirecting to login is expected but using router is better
      // Since we can't easily use hooks here, we'll keep the redirect but make it safer
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: (data: any) => api.post<AuthResponse>('/auth/login', data),
  signup: (data: any) => api.post<any>('/auth/signup', data),
};

export const ideaService = {
  getIdeas: () => api.get<Idea[]>('/ideas/'),
  createIdea: (data: Partial<Idea>) => api.post<Idea>('/ideas/', data),
  updateIdea: (id: number, data: Partial<Idea>) => api.put<Idea>(`/ideas/${id}`, data),
  deleteIdea: (id: number) => api.delete(`/ideas/${id}`),
};

export const noteService = {
  getNotes: () => api.get<Note[]>('/notes/'),
  getNote: (id: number) => api.get<Note>(`/notes/${id}`),
  createNote: (data: Partial<Note>) => api.post<Note>('/notes/', data),
  updateNote: (id: number, data: Partial<Note>) => api.put<Note>(`/notes/${id}`, data),
  deleteNote: (id: number) => api.delete(`/notes/${id}`),
};

export const projectService = {
  getProjects: () => api.get<Project[]>('/projects/'),
  createProject: (data: Partial<Project>) => api.post<Project>('/projects/', data),
  updateProject: (id: number, data: Partial<Project>) => api.put<Project>(`/projects/${id}`, data),
  deleteProject: (id: number) => api.delete(`/projects/${id}`),
};

export const aiService = {
  generateIdea: () => api.get<AIResponse>('/ai/generate'),
  chat: (message: string) => api.post<{ response: string }>('/ai/chat', { message }),
};

export const checklistService = {
  getItems: () => api.get<ChecklistItem[]>('/checklist/'),
  createItem: (data: Partial<ChecklistItem>) => api.post<ChecklistItem>('/checklist/', data),
  updateItem: (id: number, data: Partial<ChecklistItem>) => api.put<ChecklistItem>(`/checklist/${id}`, data),
  deleteItem: (id: number) => api.delete(`/checklist/${id}`),
};

export default api;

