'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminAuth } from '@/contexts/admin-auth-context';
import { useAdminLanguage } from '@/contexts/admin-language-context';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAdminAuth();
  const { t } = useAdminLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        router.push('/admin');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-4">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1 }}
          className="absolute -left-1/4 -top-1/4 h-96 w-96 rounded-full bg-blue-500/30 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -right-1/4 -bottom-1/4 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl"
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-lg"
      >
        <Card className="border-0 bg-white/10 shadow-2xl backdrop-blur-xl backdrop-saturate-150">
          <CardHeader className="space-y-6 pb-8 pt-10 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                delay: 0.3, 
                type: 'spring', 
                stiffness: 200,
                damping: 15
              }}
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/50"
            >
              <Lock className="h-10 w-10 text-white" strokeWidth={2.5} />
            </motion.div>
            
            <div className="space-y-3">
              <CardTitle className="text-4xl font-bold tracking-tight text-white">
                Lekka Admin
              </CardTitle>
              <CardDescription className="text-base text-slate-300">
                {t('login')} to access the dashboard
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="px-8 pb-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm font-medium text-red-200 backdrop-blur-sm"
                >
                  {error}
                </motion.div>
              )}

              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-semibold text-white">
                  {t('email')}
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@lekka.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 border-white/20 bg-white/10 pl-12 text-white placeholder:text-slate-400 backdrop-blur-sm transition-all focus:border-blue-400 focus:bg-white/15 focus:ring-2 focus:ring-blue-400/30"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="password" className="text-sm font-semibold text-white">
                  {t('password')}
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 border-white/20 bg-white/10 pl-12 text-white placeholder:text-slate-400 backdrop-blur-sm transition-all focus:border-blue-400 focus:bg-white/15 focus:ring-2 focus:ring-blue-400/30"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="border-white/20 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium text-slate-300 cursor-pointer select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t('rememberMe')}
                </label>
              </div>

              <Button
                type="submit"
                className="group relative h-12 w-full overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 text-base font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
                size="lg"
                disabled={isLoading}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative z-10 flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    t('login')
                  )}
                </span>
              </Button>
            </form>
          </CardContent>
        </Card>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-8 text-center text-sm font-medium text-slate-400"
        >
          <span className="inline-flex items-center gap-2">
            <Lock className="h-3.5 w-3.5" />
            Protected admin area - Authorized access only
          </span>
        </motion.p>
      </motion.div>
    </div>
  );
}