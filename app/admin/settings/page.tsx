'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAdminLanguage } from '@/contexts/admin-language-context';
import { PageTransition } from '@/components/admin/page-transition';

export default function AdminSettingsPage() {
  const { t } = useAdminLanguage();
  const [settings, setSettings] = useState({
    contactInfo: {
      email: 'contact@lekka.com',
      phone: '+1 234 567 8900',
      address: '123 Business Street, City, Country',
    },
    socialLinks: {
      facebook: 'https://facebook.com/lekka',
      twitter: 'https://twitter.com/lekka',
      instagram: 'https://instagram.com/lekka',
      linkedin: 'https://linkedin.com/company/lekka',
    },
    globalSettings: {
      maintenanceMode: false,
      emailNotifications: true,
      twoFactorAuth: false,
      publicRegistration: true,
    },
  });

  const handleSave = () => {
    // In production, this would call your API
    console.log('Saving settings:', settings);
  };

  const updateContactInfo = (field: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value,
      },
    }));
  };

  const updateSocialLinks = (field: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [field]: value,
      },
    }));
  };

  const updateGlobalSettings = (field: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      globalSettings: {
        ...prev.globalSettings,
        [field]: value,
      },
    }));
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{t('settings')}</h1>
            <p className="text-muted-foreground mt-2">
              Manage your application settings and preferences
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                {t('contactInfo')}
              </CardTitle>
              <CardDescription>
                Update your business contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {t('email')}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.contactInfo.email}
                    onChange={(e) => updateContactInfo('email', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {t('phone')}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={settings.contactInfo.phone}
                    onChange={(e) => updateContactInfo('phone', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {t('address')}
                </Label>
                <Input
                  id="address"
                  value={settings.contactInfo.address}
                  onChange={(e) => updateContactInfo('address', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{t('socialLinks')}</CardTitle>
              <CardDescription>
                Manage your social media profiles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="facebook" className="flex items-center gap-2">
                    <Facebook className="h-4 w-4" />
                    {t('facebook')}
                  </Label>
                  <Input
                    id="facebook"
                    type="url"
                    value={settings.socialLinks.facebook}
                    onChange={(e) => updateSocialLinks('facebook', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter" className="flex items-center gap-2">
                    <Twitter className="h-4 w-4" />
                    {t('twitter')}
                  </Label>
                  <Input
                    id="twitter"
                    type="url"
                    value={settings.socialLinks.twitter}
                    onChange={(e) => updateSocialLinks('twitter', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagram" className="flex items-center gap-2">
                    <Instagram className="h-4 w-4" />
                    {t('instagram')}
                  </Label>
                  <Input
                    id="instagram"
                    type="url"
                    value={settings.socialLinks.instagram}
                    onChange={(e) => updateSocialLinks('instagram', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4" />
                    {t('linkedin')}
                  </Label>
                  <Input
                    id="linkedin"
                    type="url"
                    value={settings.socialLinks.linkedin}
                    onChange={(e) => updateSocialLinks('linkedin', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Global Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Global Settings</CardTitle>
              <CardDescription>
                Configure system-wide preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenance" className="text-base font-medium">
                    Maintenance Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Enable maintenance mode to prevent user access
                  </p>
                </div>
                <Switch
                  id="maintenance"
                  checked={settings.globalSettings.maintenanceMode}
                  onCheckedChange={(checked) => updateGlobalSettings('maintenanceMode', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications" className="text-base font-medium">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications for important events
                  </p>
                </div>
                <Switch
                  id="notifications"
                  checked={settings.globalSettings.emailNotifications}
                  onCheckedChange={(checked) => updateGlobalSettings('emailNotifications', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="2fa" className="text-base font-medium">
                    Two-Factor Authentication
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Require 2FA for all admin users
                  </p>
                </div>
                <Switch
                  id="2fa"
                  checked={settings.globalSettings.twoFactorAuth}
                  onCheckedChange={(checked) => updateGlobalSettings('twoFactorAuth', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="registration" className="text-base font-medium">
                    Public Registration
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Allow new users to register accounts
                  </p>
                </div>
                <Switch
                  id="registration"
                  checked={settings.globalSettings.publicRegistration}
                  onCheckedChange={(checked) => updateGlobalSettings('publicRegistration', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-end"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              onClick={handleSave}
              className="gap-2"
            >
              <Save className="h-5 w-5" />
              {t('save')} {t('settings')}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
