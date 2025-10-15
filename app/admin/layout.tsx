'use client';

import { AdminAuthProvider } from '@/contexts/admin-auth-context';
import { AdminLanguageProvider } from '@/contexts/admin-language-context';
import { ThemeProvider } from '@/components/theme-provider';
import { AdminLayout } from '@/components/admin/admin-layout';
import { useAdminAuth } from '@/contexts/admin-auth-context';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [isAuthenticated, pathname, router]);

  if (!isAuthenticated && pathname !== '/admin/login') {
    return null;
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return <AdminLayout>{children}</AdminLayout>;
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AdminAuthProvider>
        <AdminLanguageProvider>
          <AdminGuard>{children}</AdminGuard>
        </AdminLanguageProvider>
      </AdminAuthProvider>
    </ThemeProvider>
  );
}
