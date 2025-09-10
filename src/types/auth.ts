export interface User {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'processor' | 'lab' | 'manufacturer' | 'consumer';
  organization: string;
  certifications: string[];
  location: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: User['role'];
}