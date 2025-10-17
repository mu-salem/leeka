'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ContentSectionEditorProps {
  title: string;
  fields: string[];
  data: any;
  onChange: (field: string, value: string) => void;
}

export function ContentSectionEditor({ title, fields, data, onChange }: ContentSectionEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In production, upload to server and get URL
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange('image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            Last edited: <span className="font-medium">2 hours ago</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {fields.includes('title') && (
            <div className="space-y-2">
              <Label htmlFor={`${title}-title`}>Title</Label>
              <Input
                id={`${title}-title`}
                value={data.title || ''}
                onChange={(e) => onChange('title', e.target.value)}
                placeholder="Enter title..."
              />
            </div>
          )}

          {fields.includes('subtitle') && (
            <div className="space-y-2">
              <Label htmlFor={`${title}-subtitle`}>Subtitle</Label>
              <Input
                id={`${title}-subtitle`}
                value={data.subtitle || ''}
                onChange={(e) => onChange('subtitle', e.target.value)}
                placeholder="Enter subtitle..."
              />
            </div>
          )}

          {fields.includes('description') && (
            <div className="space-y-2">
              <Label htmlFor={`${title}-description`}>Description</Label>
              <Textarea
                id={`${title}-description`}
                value={data.description || ''}
                onChange={(e) => onChange('description', e.target.value)}
                placeholder="Enter description..."
                rows={5}
              />
            </div>
          )}

          {fields.includes('buttonText') && (
            <div className="space-y-2">
              <Label htmlFor={`${title}-button`}>Button Text</Label>
              <Input
                id={`${title}-button`}
                value={data.buttonText || ''}
                onChange={(e) => onChange('buttonText', e.target.value)}
                placeholder="Enter button text..."
              />
            </div>
          )}

          {fields.includes('image') && (
            <div className="space-y-2">
              <Label>Image</Label>
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed bg-muted/30 overflow-hidden">
                    {data.image ? (
                      <div className="relative w-full h-full">
                        <img 
                          src={data.image} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="text-center">
                        <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          No image uploaded
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </Button>
                  {data.image && (
                    <Button variant="outline" size="sm" onClick={() => onChange('image', '')}>
                      <X className="mr-2 h-4 w-4" />
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
