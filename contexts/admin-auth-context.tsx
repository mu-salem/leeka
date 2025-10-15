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
    try {
      // Call backend login API
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success && data.token) {
        const userData = {
          email: data.admin.email,
          name: data.admin.name,
        };
        
        setIsAuthenticated(true);
        setUser(userData);
        localStorage.setItem('adminAuth', JSON.stringify({ user: userData }));
        localStorage.setItem('adminToken', data.token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem('adminToken');
      
      if (token) {
        // Call backend logout API
        await fetch('http://localhost:3000/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local state and storage regardless of API call result
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('adminAuth');
      localStorage.removeItem('adminToken');
      router.push('/admin/login');
    }
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
