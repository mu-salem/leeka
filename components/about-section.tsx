"use client";

import { useLanguage } from "@/lib/language-context";
import { Lightbulb, Sparkles, Shield } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function AboutSection() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
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

  const values = [
    {
      icon: Lightbulb,
      title: t.about.values.innovation.title,
      description: t.about.values.innovation.description,
    },
    {
      icon: Sparkles,
      title: t.about.values.simplicity.title,
      description: t.about.values.simplicity.description,
    },
    {
      icon: Shield,
      title: t.about.values.reliability.title,
      description: t.about.values.reliability.description,
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 sm:py-32 bg-secondary/30 dark:bg-secondary/20"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
          {/* Left Image */}
          <div className="lg:w-1/2 w-full max-w-full">
            <img
              src="/about.png"
              alt="About Lekka Tech"
              className="w-full max-w-full h-[300px] sm:h-[400px] object-cover rounded-2xl"
            />
          </div>

          {/* Right Content */}
          <div className="lg:w-1/2">
            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className=" mb-12"
              >
                <div className="inline-block relative">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent pb-4">
                    {t.about.mainTitle}
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
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t.about.mainDescription.part1}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t.about.mainDescription.part2}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t.about.mainDescription.part3}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t.about.mainDescription.part4}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t.about.mainDescription.part5}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className={`bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:scale-105 glow-hover ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-6 transition-transform duration-300 hover:rotate-6">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
