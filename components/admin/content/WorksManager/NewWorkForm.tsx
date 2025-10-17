'use client';

import React, { useRef } from 'react';
import { Plus, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { WorkItem } from '../types';

interface NewWorkFormProps {
  work: WorkItem;
  onChange: (work: WorkItem) => void;
  onAdd: () => void;
}

export function NewWorkForm({ work, onChange, onAdd }: NewWorkFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...work, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="rounded-lg border border-dashed bg-muted/30 p-4 space-y-3">
      <h4 className="font-semibold text-sm flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Add New Work
      </h4>
      <div className="space-y-2">
        <Label>Work Title</Label>
        <Input
          value={work.title}
          onChange={(e) => onChange({ ...work, title: e.target.value })}
          placeholder="E.g., E-Commerce Platform"
        />
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={work.description}
          onChange={(e) => onChange({ ...work, description: e.target.value })}
          placeholder="Describe the work..."
          rows={3}
        />
      </div>
      <div className="space-y-2">
        <Label>Image</Label>
        <div className="flex gap-3">
          {work.image && (
            <div className="w-24 h-24 rounded-lg overflow-hidden border">
              <img 
                src={work.image} 
                alt="Preview" 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1 space-y-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
            >
              <Upload className="mr-2 h-4 w-4" />
              {work.image ? 'Change Image' : 'Upload Image'}
            </Button>
            {work.image && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onChange({ ...work, image: '' })}
                className="w-full"
              >
                <X className="mr-2 h-4 w-4" />
                Remove Image
              </Button>
            )}
          </div>
        </div>
      </div>
      <Button
        onClick={onAdd}
        disabled={!work.title || !work.description}
        className="w-full"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Work
      </Button>
    </div>
  );
}
