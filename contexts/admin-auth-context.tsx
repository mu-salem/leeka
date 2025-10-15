'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  user: { email: string; name: string } | null;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const storedAuth = localStorage.getItem('adminAuth');
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      setIsAuthenticated(true);
      setUser(authData.user);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Frontend only - simulated login
    // In production, this would call your API
    if (email && password) {
      const userData = {
        email,
        name: email.split('@')[0],
      };
      
      setIsAuthenticated(true);
      setUser(userData);
      localStorage.setItem('adminAuth', JSON.stringify({ user: userData }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
