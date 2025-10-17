'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActionBarProps {
  hasChanges: boolean;
  onSave: () => void;
  onCancel: () => void;
  t: (key: string) => string;
}

export function ActionBar({ hasChanges, onSave, onCancel, t }: ActionBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky bottom-6 flex justify-end gap-4 rounded-lg border bg-card p-4 shadow-lg"
    >
      <Button
        variant="outline"
        onClick={onCancel}
        disabled={!hasChanges}
      >
        <X className="mr-2 h-4 w-4" />
        {t('cancel')}
      </Button>
      <Button
        onClick={onSave}
        disabled={!hasChanges}
        className="gap-2"
      >
        <Save className="h-4 w-4" />
        {t('save')} Changes
      </Button>
    </motion.div>
  );
}
