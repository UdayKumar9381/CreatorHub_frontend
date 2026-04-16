import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { 
  AuthResponse, 
  Idea, 
  Note, 
  Project, 
  ChecklistItem, 
  AIResponse 
} from '../types';

// Use process.env.NEXT_PUBLIC_API_URL per user requirements
// We ensure no trailing slash here
const getBaseUrl = () => {
    const envUrl = process.env.NEXT_PUBLIC_API_URL;
    const fallback = 'https://ideaflow-backend-xerc.onrender.com';
    const url = envUrl || fallback;
    return url.endsWith('/') ? url.slice(0, -1) : url;
};

const API_URL = getBaseUrl();

// Log baseURL once for debugging
console.log('🚀 IDEAFlow API Base URL:', API_URL);

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Debug log for outgoing requests in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, config.data);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    // Debug log for responses in development
    if (process.env.NODE_ENV === 'development') {
        console.log(`[API Response] ${response.status} ${response.config.url}`, response.data);
    }
    return response;
  },
  (error) => {
    // Global Error Handling
    if (error.response) {
      if (error.response.status === 401) {
        // Clear auth data and only redirect if not already on the login page
        if (!window.location.pathname.includes('/login')) {
          localStorage.removeItem('token');
          window.location.href = '/login?session=expired';
        }
      }
      console.error(`[API Error Response] ${error.response.status}:`, error.response.data);
    } else if (error.request) {
      console.error('[API Network Error]: No response received from server.');
    } else {
      console.error('[API Configuration Error]:', error.message);
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: (data: any) => api.post<AuthResponse>('/auth/login', data),
  signup: (data: any) => api.post<any>('/auth/signup', data),
  forgotPassword: (email: string) => api.post('/auth/forgot-password', { email }),
  resetPassword: (data: any) => api.post('/auth/reset-password', data),
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
