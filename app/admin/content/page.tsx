'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, X, Upload, Image as ImageIcon, Calendar, Plus, Trash2, Edit, FileImage } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdminLanguage } from '@/contexts/admin-language-context';
import { PageTransition } from '@/components/admin/page-transition';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

type ContentLanguage = 'en' | 'ar' | 'zh';

interface ContentSection {
  title: string;
  description: string;
  image?: string;
  subtitle?: string;
  buttonText?: string;
}

interface WorkItem {
  title: string;
  description: string;
  image: string;
}

function ContentLanguageSelector({ 
  selected, 
  onChange 
}: { 
  selected: ContentLanguage; 
  onChange: (lang: ContentLanguage) => void;
}) {
  const languages = [
    { code: 'en' as const, label: 'English', flag: '🇬🇧' },
    { code: 'ar' as const, label: 'العربية', flag: '🇸🇦' },
    { code: 'zh' as const, label: '中文', flag: '🇨🇳' },
  ];

  return (
    <div className="flex gap-2">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={selected === lang.code ? 'default' : 'outline'}
          size="sm"
          onClick={() => onChange(lang.code)}
          className="gap-2"
        >
          <span>{lang.flag}</span>
          {lang.label}
        </Button>
      ))}
    </div>
  );
}

function ContentSectionEditor({ 
  title, 
  fields, 
  data, 
  onChange 
}: { 
  title: string; 
  fields: string[];
  data: any;
  onChange: (field: string, value: string) => void;
}) {
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

function WorksManager({ 
  data, 
  onChange 
}: { 
  data: any;
  onChange: (field: string, value: any) => void;
}) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newWork, setNewWork] = useState<WorkItem>({ title: '', description: '', image: '' });
  const [editingWork, setEditingWork] = useState<WorkItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (file: File, isNewWork: boolean = true) => {
    if (file) {
      // In production, upload to server and get URL
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isNewWork) {
          setNewWork({ ...newWork, image: reader.result as string });
        } else if (editingWork) {
          setEditingWork({ ...editingWork, image: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

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
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label>Work Title</Label>
                        <Input
                          value={editingWork.title}
                          onChange={(e) => setEditingWork({ ...editingWork, title: e.target.value })}
                          placeholder="Work title..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={editingWork.description}
                          onChange={(e) => setEditingWork({ ...editingWork, description: e.target.value })}
                          placeholder="Work description..."
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Image</Label>
                        <div className="flex gap-3">
                          {editingWork.image && (
                            <div className="w-24 h-24 rounded-lg overflow-hidden border">
                              <img 
                                src={editingWork.image} 
                                alt="Preview" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 space-y-2">
                            <input
                              type="file"
                              ref={editFileInputRef}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageUpload(file, false);
                              }}
                              accept="image/*"
                              className="hidden"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => editFileInputRef.current?.click()}
                              className="w-full"
                            >
                              <Upload className="mr-2 h-4 w-4" />
                              {editingWork.image ? 'Change Image' : 'Upload Image'}
                            </Button>
                            {editingWork.image && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingWork({ ...editingWork, image: '' })}
                                className="w-full"
                              >
                                <X className="mr-2 h-4 w-4" />
                                Remove Image
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          onClick={() => handleSaveEdit(index)}
                          disabled={!editingWork.title || !editingWork.description}
                        >
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCancelEdit}
                        >
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
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
                          onClick={() => handleStartEdit(index)}
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
                                onClick={() => handleDeleteWork(index)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
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
          <div className="rounded-lg border border-dashed bg-muted/30 p-4 space-y-3">
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Work
            </h4>
            <div className="space-y-2">
              <Label>Work Title</Label>
              <Input
                value={newWork.title}
                onChange={(e) => setNewWork({ ...newWork, title: e.target.value })}
                placeholder="E.g., E-Commerce Platform"
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={newWork.description}
                onChange={(e) => setNewWork({ ...newWork, description: e.target.value })}
                placeholder="Describe the work..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Image</Label>
              <div className="flex gap-3">
                {newWork.image && (
                  <div className="w-24 h-24 rounded-lg overflow-hidden border">
                    <img 
                      src={newWork.image} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 space-y-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file, true);
                    }}
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
                    {newWork.image ? 'Change Image' : 'Upload Image'}
                  </Button>
                  {newWork.image && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setNewWork({ ...newWork, image: '' })}
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
              onClick={handleAddWork}
              disabled={!newWork.title || !newWork.description}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Work
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function AdminContentPage() {
  const { t } = useAdminLanguage();
  const [contentLanguage, setContentLanguage] = useState<ContentLanguage>('en');
  const [hasChanges, setHasChanges] = useState(false);

  // Mock data structure
  const [content, setContent] = useState({
    en: {
      hero: { title: 'Welcome to Lekka', description: 'Your digital partner', buttonText: 'Get Started', image: 'hero.jpg' },
      about: { title: 'About Us', description: 'We are a leading company...', image: 'about.jpg' },
      services: { title: 'Our Services', description: 'We offer comprehensive solutions...' },
      contact: { title: 'Contact Us', description: 'Get in touch with our team', subtitle: 'We are here to help' },
      footer: { description: '© 2025 Lekka. All rights reserved.' },
      works: { 
        title: 'Our Works', 
        subtitle: 'Explore our portfolio',
        items: [
          { title: 'E-Commerce Platform', description: 'Modern shopping experience with seamless checkout', image: '/modern-ecommerce-website-hero-section.jpg' },
          { title: 'SaaS Dashboard', description: 'Analytics platform for business intelligence', image: '/saas-dashboard-analytics-interface.jpg' },
          { title: 'Real Estate Portal', description: 'Property listing and management system', image: '/real-estate-website-hero.jpg' },
        ]
      },
    },
    ar: {
      hero: { title: 'مرحبا بكم في ليكا', description: 'شريكك الرقمي', buttonText: 'ابدأ الآن', image: 'hero.jpg' },
      about: { title: 'عن الشركة', description: 'نحن شركة رائدة...', image: 'about.jpg' },
      services: { title: 'خدماتنا', description: 'نقدم حلولاً شاملة...' },
      contact: { title: 'اتصل بنا', description: 'تواصل مع فريقنا', subtitle: 'نحن هنا للمساعدة' },
      footer: { description: '© 2025 ليكا. جميع الحقوق محفوظة.' },
      works: { 
        title: 'أعمالنا', 
        subtitle: 'استكشف معرض أعمالنا',
        items: [
          { title: 'منصة تجارة إلكترونية', description: 'تجربة تسوق حديثة مع دفع سلس', image: '/modern-ecommerce-website-hero-section.jpg' },
          { title: 'لوحة تحكم SaaS', description: 'منصة تحليلات لذكاء الأعمال', image: '/saas-dashboard-analytics-interface.jpg' },
          { title: 'بوابة عقارات', description: 'نظام قوائم وإدارة العقارات', image: '/real-estate-website-hero.jpg' },
        ]
      },
    },
    zh: {
      hero: { title: '欢迎来到 Lekka', description: '您的数字合作伙伴', buttonText: '开始', image: 'hero.jpg' },
      about: { title: '关于我们', description: '我们是一家领先的公司...', image: 'about.jpg' },
      services: { title: '我们的服务', description: '我们提供全面的解决方案...' },
      contact: { title: '联系我们', description: '与我们的团队联系', subtitle: '我们在这里帮助' },
      footer: { description: '© 2025 Lekka。版权所有。' },
      works: { 
        title: '我们的作品', 
        subtitle: '探索我们的作品集',
        items: [
          { title: '电子商务平台', description: '无缝结账的现代购物体验', image: '/modern-ecommerce-website-hero-section.jpg' },
          { title: 'SaaS 仪表板', description: '商业智能分析平台', image: '/saas-dashboard-analytics-interface.jpg' },
          { title: '房地产门户', description: '房产列表和管理系统', image: '/real-estate-website-hero.jpg' },
        ]
      },
    },
  });

  const handleContentChange = (section: string, field: string, value: string) => {
    setContent((prev) => {
      const langContent = prev[contentLanguage] as any;
      return {
        ...prev,
        [contentLanguage]: {
          ...langContent,
          [section]: {
            ...langContent[section],
            [field]: value,
          },
        },
      };
    });
    setHasChanges(true);
  };

  const handleSave = () => {
    // In production, this would call your API
    console.log('Saving content:', content);
    setHasChanges(false);
    // Show success toast
  };

  const handleCancel = () => {
    // Reset changes
    setHasChanges(false);
  };

  const currentContent = content[contentLanguage];

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Header */}
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

        {/* Language Selector */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between rounded-lg border bg-card p-4"
        >
          <div>
            <h3 className="font-semibold">Content Language</h3>
            <p className="text-sm text-muted-foreground">
              Select the language you want to edit
            </p>
          </div>
          <ContentLanguageSelector
            selected={contentLanguage}
            onChange={setContentLanguage}
          />
        </motion.div>

        {/* Content Sections */}
        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="works">Works</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="footer">Footer</TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="space-y-4">
            <ContentSectionEditor
              title={t('heroSection')}
              fields={['title', 'description', 'buttonText', 'image']}
              data={currentContent.hero}
              onChange={(field, value) => handleContentChange('hero', field, value)}
            />
          </TabsContent>

          <TabsContent value="about" className="space-y-4">
            <ContentSectionEditor
              title={t('aboutSection')}
              fields={['title', 'description', 'image']}
              data={currentContent.about}
              onChange={(field, value) => handleContentChange('about', field, value)}
            />
          </TabsContent>

          <TabsContent value="services" className="space-y-4">
            <ContentSectionEditor
              title={t('servicesSection')}
              fields={['title', 'description']}
              data={currentContent.services}
              onChange={(field, value) => handleContentChange('services', field, value)}
            />
          </TabsContent>

          <TabsContent value="works" className="space-y-4">
            <WorksManager
              data={currentContent.works}
              onChange={(field, value) => handleContentChange('works', field, value)}
            />
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <ContentSectionEditor
              title={t('contactSection')}
              fields={['title', 'subtitle', 'description']}
              data={currentContent.contact}
              onChange={(field, value) => handleContentChange('contact', field, value)}
            />
          </TabsContent>

          <TabsContent value="footer" className="space-y-4">
            <ContentSectionEditor
              title={t('footerSection')}
              fields={['description']}
              data={currentContent.footer}
              onChange={(field, value) => handleContentChange('footer', field, value)}
            />
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky bottom-6 flex justify-end gap-4 rounded-lg border bg-card p-4 shadow-lg"
        >
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={!hasChanges}
          >
            <X className="mr-2 h-4 w-4" />
            {t('cancel')}
          </Button>
          <Button
            onClick={handleSave}
            disabled={!hasChanges}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            {t('save')} Changes
          </Button>
        </motion.div>
      </div>
    </PageTransition>
  );
}
