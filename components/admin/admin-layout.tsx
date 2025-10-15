'use client';

import React from 'react';
import { AdminSidebar } from './admin-sidebar';
import { AdminNavbar } from './admin-navbar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AdminSidebar />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminNavbar />
        
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
