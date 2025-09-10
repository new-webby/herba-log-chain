import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, AuthState, LoginCredentials } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction = 
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_ERROR' }
  | { type: 'LOGOUT' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true };
    case 'LOGIN_SUCCESS':
      return { user: action.payload, isAuthenticated: true, loading: false };
    case 'LOGIN_ERROR':
      return { user: null, isAuthenticated: false, loading: false };
    case 'LOGOUT':
      return { user: null, isAuthenticated: false, loading: false };
    default:
      return state;
  }
};

// Mock users for demo
const mockUsers: Record<string, User> = {
  'farmer@example.com': {
    id: 'farmer-001',
    name: 'Ravi Kumar',
    email: 'farmer@example.com',
    role: 'farmer',
    organization: 'Telangana Medicinal Plants Cooperative',
    certifications: ['Certified Organic Collector'],
    location: 'Medak District, Telangana'
  },
  'processor@example.com': {
    id: 'processor-001',
    name: 'Dr. Priya Sharma',
    email: 'processor@example.com',
    role: 'processor',
    organization: 'AyurTech Processing Pvt Ltd',
    certifications: ['AYUSH-MFG-2023-001', 'GMP Certified'],
    location: 'Bangalore, Karnataka'
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    loading: false
  });

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_START' });
    
    // Mock authentication
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers[credentials.email];
    if (user && user.role === credentials.role) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } else {
      dispatch({ type: 'LOGIN_ERROR' });
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};