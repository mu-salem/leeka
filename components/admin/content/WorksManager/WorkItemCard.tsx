'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import type { WorkItem } from '../types';

interface WorkItemCardProps {
  work: WorkItem;
  index: number;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

export function WorkItemCard({ work, index, onEdit, onDelete }: WorkItemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="rounded-lg border bg-card p-4"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4 flex-1 min-w-0">
          {work.image && (
            <div className="w-20 h-20 rounded-lg overflow-hidden border shrink-0">
              <img 
                src={work.image} 
                alt={work.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold truncate">{work.title}</h4>
            <p className="text-sm text-muted-foreground line-clamp-2">{work.description}</p>
            {!work.image && (
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <ImageIcon className="h-3 w-3" />
                No image
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button
            size="icon"
            variant="outline"
            onClick={() => onEdit(index)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="icon"
                variant="outline"
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete "{work.title}" from your portfolio.
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(index)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </motion.div>
  );
}
