"use client";

import type React from "react";

import { useLanguage } from "@/lib/language-context";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Dribbble,
  MessageCircle,
  MapPin,
} from "lucide-react";
import { ConsultationDialog } from "@/components/consultation-dialog";

export function ContactSection() {
  const { t, language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("[v0] Form submitted");
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 sm:py-32 bg-secondary/30 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-full relative z-10">
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t.contact.title}
          </h2>
          <p className="text-lg text-muted-foreground">{t.contact.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  placeholder={t.contact.form.name}
                  className="bg-card border-border"
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder={t.contact.form.email}
                  className="bg-card border-border"
                  required
                />
              </div>
              <div>
                <Textarea
                  placeholder={t.contact.form.message}
                  rows={6}
                  className="bg-card border-border resize-none"
                  required
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity glow-hover"
              >
                {t.contact.form.submit}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div
            className={`space-y-8 transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="space-y-6">
              {/* Email */}
              <a 
                href="https://your-link-here.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 cursor-pointer hover:bg-accent/10 p-3 rounded-lg transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-semibold">lekkatechnology@gmail.com</p>
                </div>
              </a>

              {/* Phone */}
              <a 
                href="https://your-link-here.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 cursor-pointer hover:bg-accent/10 p-3 rounded-lg transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-semibold">+201150148000</p>
                </div>
              </a>

              {/* Address */}
              <a 
                href="https://your-link-here.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 cursor-pointer hover:bg-accent/10 p-3 rounded-lg transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-semibold">
                    123 Tech Street, Innovation City, IC 12345
                  </p>
                </div>
              </a>

              {/* Messenger */}
              <a 
                href="https://your-link-here.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 cursor-pointer hover:bg-accent/10 p-3 rounded-lg transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Messenger</p>
                  <p className="font-semibold">Chat with us instantly</p>
                  <p className="font-semibold">We reply within minutes</p>
                </div>
              </a>
            </div>

            <div className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">Follow us</p>
              <div className="flex gap-4">
                <a
                  href="https://your-link-here.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-card border border-border hover:border-primary/50 flex items-center justify-center transition-all hover:-translate-y-1 glow-hover"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://your-link-here.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-card border border-border hover:border-primary/50 flex items-center justify-center transition-all hover:-translate-y-1 glow-hover"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://your-link-here.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-card border border-border hover:border-primary/50 flex items-center justify-center transition-all hover:-translate-y-1 glow-hover"
                >
                  <Dribbble className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Enhanced CTA with impressive animated background */}
      <div className="mt-12 w-full">
        <div className="max-w-7xl mx-auto px-4 py-8 w-full">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-8 sm:p-12 md:p-16 w-full">
            {/* Animated gradient orbs */}
            <div className="absolute inset-0 opacity-40">
              <div className="absolute top-0 left-0 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
              <div
                className="absolute bottom-0 right-0 w-56 sm:w-80 md:w-[28rem] h-56 sm:h-80 md:h-[28rem] bg-blue-500 rounded-full filter blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-indigo-500 rounded-full filter blur-3xl animate-pulse"
                style={{ animationDelay: "2s" }}
              ></div>
            </div>

            {/* Animated grid pattern overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)",
              }}
            ></div>

            {/* Floating decorative elements */}
            <div className="hidden sm:block absolute top-10 left-10 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 border-2 border-purple-400/30 rounded-lg rotate-12 animate-pulse"></div>
            <div
              className="hidden sm:block absolute bottom-10 right-10 w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 border-2 border-blue-400/30 rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="hidden sm:block absolute top-1/2 right-20 w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 bg-purple-500/20 rounded-lg rotate-45 animate-pulse"
              style={{ animationDelay: "1.5s" }}
            ></div>

            <div className="relative z-10 text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
                <span className="text-purple-300 text-sm tracking-widest uppercase font-semibold">
                  {t.contact.cta.smallLabel}
                </span>
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
              </div>

              <h3 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                {t.contact.cta.titleLine1}
                <br />
                {t.contact.cta.titleLine2}
              </h3>

              <p className="text-gray-200 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                {t.contact.cta.paragraph}
              </p>

              <div className="flex justify-center">
                <button 
                  onClick={() => setIsDialogOpen(true)}
                  className="group relative bg-white text-purple-900 px-10 py-4 rounded-full uppercase tracking-wider font-bold transition-all duration-300 shadow-2xl hover:shadow-purple-500/50"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    {t.contact.cta.button}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConsultationDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </section>
  );
}