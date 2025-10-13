"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

export function HeroSection() {
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-16 sm:pt-20">
      {/* Background gradient shapes - contained within viewport */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-primary/20 dark:bg-primary/30 rounded-full blur-3xl animate-pulse -translate-x-1/3" />
        <div className="absolute bottom-1/4 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-accent/20 dark:bg-accent/30 rounded-full blur-3xl animate-pulse delay-1000 translate-x-1/3" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 w-full max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text */}
          <div
            className={`space-y-6 transition-all duration-1000 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance">{t.hero.title}</h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">{t.hero.subtitle}</p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                size="lg"
                onClick={() => scrollToSection("works")}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 hover:scale-105 glow-hover group"
              >
                {t.hero.cta1}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("contact")}
                className="border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-105"
              >
                {t.hero.cta2}
              </Button>
            </div>
          </div>

          {/* Right side - Mockup */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Animated dotted circles background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 100"
                >
                  {/* Larger outer circle - rotates counter-clockwise */}
                  <circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.6"
                    strokeDasharray="2 4"
                    className="text-primary/60 dark:text-primary/70 animate-spin-reverse"
                    style={{ animationDuration: "25s" }}
                  />
                  {/* Inner circle - rotates clockwise */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.7"
                    strokeDasharray="2 4"
                    className="text-primary/70 dark:text-primary/80 animate-spin-slow"
                    style={{ animationDuration: "20s" }}
                  />
                </svg>
              </div>
              
              {/* Hero image */}
              <img
                src="/hero.svg"
                alt="Device mockup"
                className="w-full h-full object-contain drop-shadow-2xl relative z-10"
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
          transform-origin: center;
        }
        .animate-spin-reverse {
          animation: spin-reverse 25s linear infinite;
          transform-origin: center;
        }
      `}</style>
    </section>
  )
}