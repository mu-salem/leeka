'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Users,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  Clock,
  TrendingUp,
  Share2,
  Search,
  MousePointerClick
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminLanguage } from '@/contexts/admin-language-context';
import { PageTransition } from '@/components/admin/page-transition';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts';

// Mock data generator functions
const generateVisitorCount = () => Math.floor(Math.random() * 5000) + 15000;
const generateSessionDuration = () => {
  const minutes = Math.floor(Math.random() * 3) + 2;
  const seconds = Math.floor(Math.random() * 60);
  return `${minutes}m ${seconds}s`;
};

// Mock data
const mockCountriesData = [
  { country: 'United States', visitors: 4521, code: 'US' },
  { country: 'United Kingdom', visitors: 3245, code: 'GB' },
  { country: 'Germany', visitors: 2876, code: 'DE' },
  { country: 'France', visitors: 2453, code: 'FR' },
  { country: 'Canada', visitors: 1987, code: 'CA' },
  { country: 'Australia', visitors: 1654, code: 'AU' },
  { country: 'Spain', visitors: 1432, code: 'ES' },
  { country: 'Italy', visitors: 1209, code: 'IT' },
];

const mockDeviceData = [
  { name: 'Desktop', value: 58, color: '#3b82f6' }, // Blue
  { name: 'Mobile', value: 35, color: '#10b981' }, // Green
  { name: 'Tablet', value: 7, color: '#f59e0b' }, // Orange
];

const mockTrafficSources = [
  { source: 'Direct', visitors: 6543, percentage: 35 },
  { source: 'Search Engine', visitors: 5234, percentage: 28 },
  { source: 'Social Media', visitors: 4321, percentage: 23 },
  { source: 'Referral', visitors: 1876, percentage: 10 },
  { source: 'Ads', visitors: 743, percentage: 4 },
];

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  delay?: number;
  subtitle?: string;
}

function StatCard({ title, value, icon, trend, delay = 0, subtitle }: StatCardProps) {
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
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">
              {subtitle}
            </p>
          )}
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

  // Generate dynamic visitor count
  const totalVisitors = useMemo(() => generateVisitorCount(), []);
  const sessionDuration = useMemo(() => generateSessionDuration(), []);

  const stats = [
    {
      title: 'Total Visitors',
      value: totalVisitors.toLocaleString(),
      icon: <Users className="h-5 w-5 text-primary" />,
      trend: '+18% from last week',
      subtitle: 'Unique visitors',
    },
    {
      title: 'Avg. Session Duration',
      value: sessionDuration,
      icon: <Clock className="h-5 w-5 text-primary" />,
      subtitle: 'Time on site',
      trend: '+24% from last week',
    },
    {
      title: 'Device Types',
      value: '3',
      icon: <Monitor className="h-5 w-5 text-primary" />,
      subtitle: 'Desktop, Mobile, Tablet',
    },
    {
      title: 'Traffic Sources',
      value: '5',
      icon: <Share2 className="h-5 w-5 text-primary" />,
      subtitle: 'Multiple channels',
    },
  ];

  const chartConfig = {
    visitors: {
      label: 'Visitors',
      color: 'hsl(var(--chart-1))',
    },
  };

  const deviceChartConfig = {
    desktop: {
      label: 'Desktop',
      color: 'hsl(var(--chart-1))',
    },
    mobile: {
      label: 'Mobile',
      color: 'hsl(var(--chart-2))',
    },
    tablet: {
      label: 'Tablet',
      color: 'hsl(var(--chart-3))',
    },
  };

  return (
    <PageTransition>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Real-time visitor analytics and insights
          </p>
        </motion.div>

        {/* Stats Grid - 2x2 Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.title}
              {...stat}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Main Analytics Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Visitor Distribution by Country - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Top Countries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[350px] w-full">
                  <BarChart data={mockCountriesData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="code" 
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                    />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      cursor={{ fill: 'hsl(var(--muted))' }}
                    />
                    <Bar 
                      dataKey="visitors" 
                      fill="#8b5cf6"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {mockCountriesData.slice(0, 4).map((country, index) => (
                    <motion.div
                      key={country.code}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.05 }}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-muted-foreground">{country.country}</span>
                      <span className="font-semibold">{country.visitors.toLocaleString()}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Device Type Breakdown - Takes 1 column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Device Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={deviceChartConfig} className="h-[250px] w-full">
                  <PieChart>
                    <Pie
                      data={mockDeviceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {mockDeviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
                <div className="mt-6 space-y-3">
                  {mockDeviceData.map((device, index) => (
                    <motion.div
                      key={device.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        {device.name === 'Desktop' && <Monitor className="h-4 w-4 text-muted-foreground" />}
                        {device.name === 'Mobile' && <Smartphone className="h-4 w-4 text-muted-foreground" />}
                        {device.name === 'Tablet' && <Tablet className="h-4 w-4 text-muted-foreground" />}
                        <span className="text-sm text-muted-foreground">{device.name}</span>
                      </div>
                      <span className="font-semibold">{device.value}%</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Traffic Sources - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MousePointerClick className="h-5 w-5" />
                Traffic Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTrafficSources.map((source, index) => (
                  <motion.div
                    key={source.source}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {source.source === 'Direct' && <MousePointerClick className="h-4 w-4 text-muted-foreground" />}
                        {source.source === 'Search Engine' && <Search className="h-4 w-4 text-muted-foreground" />}
                        {source.source === 'Social Media' && <Share2 className="h-4 w-4 text-muted-foreground" />}
                        {source.source === 'Referral' && <Globe className="h-4 w-4 text-muted-foreground" />}
                        {source.source === 'Ads' && <TrendingUp className="h-4 w-4 text-muted-foreground" />}
                        <span className="text-sm font-medium">{source.source}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                          {source.visitors.toLocaleString()} visitors
                        </span>
                        <span className="text-sm font-semibold min-w-[3rem] text-right">
                          {source.percentage}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${source.percentage}%` }}
                        transition={{ delay: 0.9 + index * 0.1, duration: 0.6, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{
                          backgroundColor: 
                            source.source === 'Direct' ? '#06b6d4' : // Cyan
                            source.source === 'Search Engine' ? '#8b5cf6' : // Purple
                            source.source === 'Social Media' ? '#ec4899' : // Pink
                            source.source === 'Referral' ? '#10b981' : // Green
                            '#f59e0b' // Orange for Ads
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  );
}
