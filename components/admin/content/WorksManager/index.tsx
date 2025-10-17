'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileImage } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { WorkItemCard } from './WorkItemCard';
import { WorkEditorInline } from './WorkEditorInline';
import { NewWorkForm } from './NewWorkForm';
import type { WorkItem, WorksSection } from '../types';

interface WorksManagerProps {
  data: WorksSection;
  onChange: (field: string, value: any) => void;
}

export function WorksManager({ data, onChange }: WorksManagerProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newWork, setNewWork] = useState<WorkItem>({ title: '', description: '', image: '' });
  const [editingWork, setEditingWork] = useState<WorkItem | null>(null);

  const handleAddWork = () => {
    if (newWork.title && newWork.description) {
      const updatedItems = [...(data.items || []), newWork];
      onChange('items', updatedItems);
      setNewWork({ title: '', description: '', image: '' });
    }
  };

  const handleStartEdit = (index: number) => {
    setEditingIndex(index);
    setEditingWork({ ...data.items[index] });
  };

  const handleSaveEdit = (index: number) => {
    if (editingWork) {
      const updatedItems = [...data.items];
      updatedItems[index] = editingWork;
      onChange('items', updatedItems);
      setEditingIndex(null);
      setEditingWork(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditingWork(null);
  };

  const handleDeleteWork = (index: number) => {
    const updatedItems = data.items.filter((_: any, i: number) => i !== index);
    onChange('items', updatedItems);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle>Works Section Settings</CardTitle>
          <CardDescription>
            Manage the main title and subtitle for the works section
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="works-title">Section Title</Label>
            <Input
              id="works-title"
              value={data.title || ''}
              onChange={(e) => onChange('title', e.target.value)}
              placeholder="Enter section title..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="works-subtitle">Section Subtitle</Label>
            <Input
              id="works-subtitle"
              value={data.subtitle || ''}
              onChange={(e) => onChange('subtitle', e.target.value)}
              placeholder="Enter section subtitle..."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Work Items ({data.items?.length || 0})</CardTitle>
          <CardDescription>
            Add, edit, or remove work items from your portfolio
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Existing Works */}
          <div className="space-y-3">
            <AnimatePresence>
              {data.items?.map((work: WorkItem, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="rounded-lg border bg-card p-4"
                >
                  {editingIndex === index && editingWork ? (
                    <WorkEditorInline
                      work={editingWork}
                      onChange={setEditingWork}
                      onSave={() => handleSaveEdit(index)}
                      onCancel={handleCancelEdit}
                    />
                  ) : (
                    <WorkItemCard
                      work={work}
                      index={index}
                      onEdit={handleStartEdit}
                      onDelete={handleDeleteWork}
                    />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {(!data.items || data.items.length === 0) && (
              <div className="text-center py-8 text-muted-foreground">
                <FileImage className="mx-auto h-12 w-12 mb-3 opacity-50" />
                <p>No works added yet. Add your first work below.</p>
              </div>
            )}
          </div>

          {/* Add New Work */}
          <NewWorkForm
            work={newWork}
            onChange={setNewWork}
            onAdd={handleAddWork}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
