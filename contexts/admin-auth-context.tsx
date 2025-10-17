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
    // Mock login - replace with real API call when backend is ready
    if (email && password) {
      const userData = {
        email: email,
        name: 'Admin User',
      };
      
      setIsAuthenticated(true);
      setUser(userData);
      localStorage.setItem('adminAuth', JSON.stringify({ user: userData }));
      localStorage.setItem('adminToken', 'mock-token');
      return true;
    }
    return false;
  };

  const logout = () => {
    // Clear local state and storage
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminToken');
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
