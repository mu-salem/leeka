'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAdminLanguage } from '@/contexts/admin-language-context';
import { Button } from '@/components/ui/button';

const menuItems = [
  { href: '/admin', icon: LayoutDashboard, labelKey: 'dashboard' },
  { href: '/admin/content', icon: FileText, labelKey: 'content' },
  { href: '/admin/users', icon: Users, labelKey: 'users' },
  { href: '/admin/settings', icon: Settings, labelKey: 'settings' },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { t } = useAdminLanguage();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isCollapsed ? -280 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          'fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card',
          'lg:translate-x-0 lg:static lg:z-0'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-center border-b px-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Lekka Admin
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsCollapsed(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                    'hover:bg-accent hover:text-accent-foreground',
                    isActive && 'bg-primary text-primary-foreground hover:bg-primary/90'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{t(item.labelKey)}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </motion.aside>

      {/* Mobile Overlay */}
      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsCollapsed(false)}
        />
      )}
    </>
  );
}
