export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface Idea {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  created_at: string;
}

export interface ChecklistItem {
  id: number;
  title: string;
  is_completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  status: 'planning' | 'building' | 'judging' | 'completed';
  deadline: string | null;
  tech_stack: string | null;
  created_at: string;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface AIResponse {
  title: string;
  description: string;
}
