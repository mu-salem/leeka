'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileEdit, 
  Clock, 
  Users as UsersIcon, 
  ClipboardCheck,
  TrendingUp,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminLanguage } from '@/contexts/admin-language-context';
import { PageTransition } from '@/components/admin/page-transition';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  delay?: number;
}

function StatCard({ title, value, icon, trend, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
    >
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className="rounded-full bg-primary/10 p-2">
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{value}</div>
          {trend && (
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              {trend}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function AdminDashboardPage() {
  const { t } = useAdminLanguage();

  const stats = [
    {
      title: t('totalEdits'),
      value: 247,
      icon: <FileEdit className="h-5 w-5 text-primary" />,
      trend: '+12% from last month',
    },
    {
      title: t('lastUpdated'),
      value: '2 hours ago',
      icon: <Clock className="h-5 w-5 text-primary" />,
    },
    {
      title: t('activeUsers'),
      value: 8,
      icon: <UsersIcon className="h-5 w-5 text-primary" />,
      trend: '+3 this week',
    },
    {
      title: t('pendingReviews'),
      value: 12,
      icon: <ClipboardCheck className="h-5 w-5 text-primary" />,
    },
  ];

  return (
    <PageTransition>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight">{t('dashboard')}</h1>
          <p className="text-muted-foreground mt-2">
            {t('welcome')} to your admin dashboard
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.title}
              {...stat}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'Updated Hero Section', time: '2 hours ago', user: 'Admin' },
                  { action: 'Modified About Section', time: '5 hours ago', user: 'Editor' },
                  { action: 'Added new service', time: '1 day ago', user: 'Admin' },
                  { action: 'Updated contact info', time: '2 days ago', user: 'Editor' },
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center justify-between border-b pb-3 last:border-0"
                  >
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">by {activity.user}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{activity.time}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Content Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Hero Sections</span>
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">About Sections</span>
                    <span className="font-semibold">2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Services</span>
                    <span className="font-semibold">6</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Projects</span>
                    <span className="font-semibold">12</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Database</span>
                    <span className="text-green-500 font-semibold">Healthy</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">API Status</span>
                    <span className="text-green-500 font-semibold">Online</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Storage</span>
                    <span className="font-semibold">45% Used</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Cache</span>
                    <span className="text-green-500 font-semibold">Optimized</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
