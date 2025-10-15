'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, X, Upload, Image as ImageIcon, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdminLanguage } from '@/contexts/admin-language-context';
import { PageTransition } from '@/components/admin/page-transition';
import { Badge } from '@/components/ui/badge';

type ContentLanguage = 'en' | 'ar' | 'zh';

interface ContentSection {
  title: string;
  description: string;
  image?: string;
  subtitle?: string;
  buttonText?: string;
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
                  <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed bg-muted/30">
                    {data.image ? (
                      <div className="text-center">
                        <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          {data.image}
                        </p>
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
                  <Button variant="outline" size="sm">
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
    },
    ar: {
      hero: { title: 'مرحبا بكم في ليكا', description: 'شريكك الرقمي', buttonText: 'ابدأ الآن', image: 'hero.jpg' },
      about: { title: 'عن الشركة', description: 'نحن شركة رائدة...', image: 'about.jpg' },
      services: { title: 'خدماتنا', description: 'نقدم حلولاً شاملة...' },
      contact: { title: 'اتصل بنا', description: 'تواصل مع فريقنا', subtitle: 'نحن هنا للمساعدة' },
      footer: { description: '© 2025 ليكا. جميع الحقوق محفوظة.' },
    },
    zh: {
      hero: { title: '欢迎来到 Lekka', description: '您的数字合作伙伴', buttonText: '开始', image: 'hero.jpg' },
      about: { title: '关于我们', description: '我们是一家领先的公司...', image: 'about.jpg' },
      services: { title: '我们的服务', description: '我们提供全面的解决方案...' },
      contact: { title: '联系我们', description: '与我们的团队联系', subtitle: '我们在这里帮助' },
      footer: { description: '© 2025 Lekka。版权所有。' },
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
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
