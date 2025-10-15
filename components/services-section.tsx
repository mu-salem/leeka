"use client";

import { useLanguage } from "@/lib/language-context";
import { motion } from "framer-motion";
import {
  Globe,
  ShoppingCart,
  Smartphone,
  Search,
  Server,
  Palette,
} from "lucide-react";

export function ServicesSection() {
  const { t, language } = useLanguage();
  const isRTL = language === "ar";
  const intro = t.intro as any;

  const services = [
    {
      icon: Globe,
      title: t.services.items.web.title,
      description: t.services.items.web.description,
    },
    {
      icon: ShoppingCart,
      title: t.services.items.ecommerce.title,
      description: t.services.items.ecommerce.description,
    },
    {
      icon: Smartphone,
      title: t.services.items.mobile.title,
      description: t.services.items.mobile.description,
    },
    {
      icon: Search,
      title: t.services.items.seo.title,
      description: t.services.items.seo.description,
    },
    {
      icon: Server,
      title: t.services.items.hosting.title,
      description: t.services.items.hosting.description,
    },
    {
      icon: Palette,
      title: t.services.items.design.title,
      description: t.services.items.design.description,
    },
  ];

  return (
    <section
      id="services"
      className="relative py-20 sm:py-32 overflow-hidden"
    >
      {/* Animated mesh background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      {/* card */}
      <div className="relative container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Intro Content - Split Layout */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-32"
        >
          <div
            className={`grid lg:grid-cols-2 gap-12 items-start ${
              isRTL ? "rtl" : "ltr"
            }`}
          >
            {/* Left Column - Title & Main Content */}
            <div className="space-y-8">
              <div className="inline-block">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/50 bg-clip-text text-transparent">
                    {intro.title}
                  </span>
                </h2>
                
              </div>

              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p className="border-l-4 border-primary/30 pl-6">
                  {intro.paragraph1}
                </p>
                <p>{intro.paragraph2}</p>
              </div>
            </div>

            {/* Right Column - Services List & Closing */}
            <div className="lg:pt-12 space-y-8">
              <div className="bg-gradient-to-br from-card via-card/50 to-background border border-border/30 rounded-3xl p-8 backdrop-blur-sm shadow-xl">
                <p className="text-2xl font-bold mb-6 text-foreground">
                  {intro.subtitle}
                </p>
                <div className="space-y-4">
                  {intro.services.map((s: string, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.15 }}
                      viewport={{ once: true }}
                      className="group flex items-start gap-4 p-3 rounded-xl hover:bg-primary/5 transition-colors duration-300"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                        <div className="w-2 h-2 bg-background rounded-full" />
                      </div>
                      <span className="text-base text-muted-foreground leading-relaxed flex-1">
                        {s}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 border border-primary/20">
                <p className="text-lg font-semibold text-foreground relative z-10">
                  {intro.closing}
                </p>
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Services Grid - Staggered Layout */}
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-block relative">
              <h3 className="text-5xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent pb-4">
                {t.services.title}
              </h3>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
                className="h-2 bg-gradient-to-r from-transparent via-primary to-transparent"
              />
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60, rotate: -2 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="group h-full"
                >
                  <div className="relative h-full">
                    {/* Floating background effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 scale-105" />

                    <div className="relative bg-card/80 backdrop-blur-md border-2 border-border/50 rounded-3xl p-8 overflow-hidden transition-all duration-700 group-hover:border-primary/50 group-hover:bg-card h-full flex flex-col shadow-lg hover:shadow-2xl">
                      {/* Icon with circular background */}
                      <div className="relative mb-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 via-primary/10 to-transparent flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/30 transition-shadow duration-500">
                          <Icon className="h-10 w-10 text-primary transition-all duration-500 group-hover:scale-125" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-primary/5 blur-md" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col">
                        <h3 className="text-2xl font-bold mb-4 transition-colors duration-300 group-hover:text-primary">
                          {service.title}
                        </h3>

                        <p className="text-muted-foreground leading-relaxed text-base flex-1">
                          {service.description}
                        </p>
                      </div>

                      {/* Bottom gradient line */}
                      <motion.div
                        className="h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 mt-6 rounded-full"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      
    </section>
  );
}
