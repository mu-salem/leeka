export type ContentLanguage = 'en' | 'ar' | 'zh';

export interface ContentSection {
  title: string;
  description: string;
  image?: string;
  subtitle?: string;
  buttonText?: string;
}

export interface WorkItem {
  title: string;
  description: string;
  image: string;
}

export interface WorksSection {
  title: string;
  subtitle: string;
  items: WorkItem[];
}

export interface ContentShape {
  hero: ContentSection;
  about: ContentSection;
  services: ContentSection;
  contact: ContentSection;
  footer: { description: string };
  works: WorksSection;
}

export interface LanguageContent {
  en: ContentShape;
  ar: ContentShape;
  zh: ContentShape;
}
