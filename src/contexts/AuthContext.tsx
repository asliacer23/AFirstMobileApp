import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, User } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  register: (email: string, password: string, name: string) => Promise<{ error: string | null }>;
  logout: () => void;
  googleSignIn: () => Promise<{ error: string | null }>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const { user: loggedInUser, error } = await authService.login(email, password);
    if (loggedInUser) {
      setUser(loggedInUser);
    }
    return { error };
  };

  const register = async (email: string, password: string, name: string) => {
    const { user: newUser, error } = await authService.register(email, password, name);
    if (newUser) {
      setUser(newUser);
    }
    return { error };
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const googleSignIn = async () => {
    const { user: googleUser, error } = await authService.googleSignIn();
    if (googleUser) {
      setUser(googleUser);
    }
    return { error };
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, googleSignIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
