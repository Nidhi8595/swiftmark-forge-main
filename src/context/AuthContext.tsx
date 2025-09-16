import React, { createContext, useContext, useState, useEffect } from 'react';
import { userAPI, authAPI } from '../lib/api';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await userAPI.getMe();
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem('access_token');
      console.error('Failed to fetch user:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authAPI.signin({ email, password });
      const { access_token } = response.data;
      
      localStorage.setItem('access_token', access_token);
      await fetchUser();
      
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      toast({
        title: "Login failed",
        description: message,
        variant: "destructive",
      });
      return false;
    }
  };

  const signup = async (email: string, password: string): Promise<boolean> => {
    try {
      await authAPI.signup({ email, password });
      
      toast({
        title: "Account created!",
        description: "Please log in with your new account.",
      });
      
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Signup failed';
      toast({
        title: "Signup failed",
        description: message,
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      const response = await userAPI.updateProfile(userData);
      setUser(response.data);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error: any) {
      const message = error.response?.data?.message || 'Update failed';
      toast({
        title: "Update failed",
        description: message,
        variant: "destructive",
      });
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};