'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PageHeaderProps {
  t: (key: string) => string;
  hasChanges: boolean;
}

export function PageHeader({ t, hasChanges }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">{t('content')}</h1>
        <p className="text-muted-foreground mt-2">
          Manage your website content across multiple languages
        </p>
      </div>
      
      {hasChanges && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Badge variant="destructive" className="gap-1">
            <Calendar className="h-3 w-3" />
            Unsaved changes
          </Badge>
        </motion.div>
      )}
    </div>
  );
}
