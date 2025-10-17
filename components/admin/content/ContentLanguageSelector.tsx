'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import type { ContentLanguage } from './types';

interface ContentLanguageSelectorProps {
  selected: ContentLanguage;
  onChange: (lang: ContentLanguage) => void;
}

export function ContentLanguageSelector({ selected, onChange }: ContentLanguageSelectorProps) {
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
