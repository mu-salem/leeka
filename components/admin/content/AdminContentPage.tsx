'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdminLanguage } from '@/contexts/admin-language-context';
import { PageTransition } from '@/components/admin/page-transition';
import { PageHeader } from '@/components/admin/content/PageHeader';
import { ContentLanguageSelector } from '@/components/admin/content/ContentLanguageSelector';
import { ContentSectionEditor } from '@/components/admin/content/ContentSectionEditor';
import { WorksManager } from '@/components/admin/content/WorksManager';
import { ActionBar } from '@/components/admin/content/ActionBar';
import type { ContentLanguage, LanguageContent } from '@/components/admin/content/types';

export default function AdminContentPage() {
  const { t } = useAdminLanguage();
  const [contentLanguage, setContentLanguage] = useState<ContentLanguage>('en');
  const [hasChanges, setHasChanges] = useState(false);

  // Mock data structure
  const [content, setContent] = useState<LanguageContent>({
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
        <PageHeader t={t} hasChanges={hasChanges} />

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
        <ActionBar
          hasChanges={hasChanges}
          onSave={handleSave}
          onCancel={handleCancel}
          t={t}
        />
      </div>
    </PageTransition>
  );
}
