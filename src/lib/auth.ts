// Mock authentication system using localStorage
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export const authService = {
  register: async (email: string, password: string, name: string): Promise<{ user: User | null; error: string | null }> => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find((u: User & { password: string }) => u.email === email)) {
      return { user: null, error: 'User already exists' };
    }

    const user: User = {
      id: crypto.randomUUID(),
      email,
      name,
    };

    users.push({ ...user, password });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    return { user, error: null };
  },

  login: async (email: string, password: string): Promise<{ user: User | null; error: string | null }> => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: User & { password: string }) => u.email === email && u.password === password);
    
    if (!foundUser) {
      return { user: null, error: 'Invalid credentials' };
    }

    const user: User = {
      id: foundUser.id,
      email: foundUser.email,
      name: foundUser.name,
      avatar: foundUser.avatar,
    };

    localStorage.setItem('currentUser', JSON.stringify(user));
    return { user, error: null };
  },

  logout: () => {
    localStorage.removeItem('currentUser');
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  },

  googleSignIn: async (): Promise<{ user: User | null; error: string | null }> => {
    // Mock Google sign-in
    const user: User = {
      id: crypto.randomUUID(),
      email: 'demo@google.com',
      name: 'Google User',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=google',
    };
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    return { user, error: null };
  }
};
