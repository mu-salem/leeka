"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"

export function Navbar() {
  const { language, setLanguage, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isChangingLanguage, setIsChangingLanguage] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false) // Close mobile menu after navigation
    }
  }

  const handleLanguageChange = (newLang: "en" | "ar" | "zh") => {
    if (newLang === language) return // Don't change if already selected
    
    setIsChangingLanguage(true)
    
    // Show loading for 300ms then change language
    setTimeout(() => {
      setLanguage(newLang)
      setTimeout(() => {
        setIsChangingLanguage(false)
      }, 100)
    }, 300)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-full">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <button
              onClick={() => scrollToSection("hero")}
              className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity"
            >
              <img src="/logo.svg" alt="Lekka logo" className="h-10 sm:h-14 md:h-16 lg:h-20 w-auto" />
              <span className="hidden sm:inline text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight" 
                    style={{ fontFamily: "'Orbitron', 'Exo 2', sans-serif" }}>
                {t.site.title}
              </span>
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.nav.home}
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.nav.about}
              </button>
              <button
                onClick={() => scrollToSection("works")}
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.nav.works}
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.nav.services}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.nav.contact}
              </button>
            </div>

            <div className="flex items-center gap-3">
              {/* Theme Toggle Button */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="relative h-10 w-10 rounded-full bg-secondary/80 hover:bg-secondary border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-110 flex items-center justify-center group overflow-hidden"
                  aria-label="Toggle theme"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5 text-foreground transition-transform duration-300 group-hover:rotate-180 relative z-10" />
                  ) : (
                    <Moon className="h-5 w-5 text-foreground transition-transform duration-300 group-hover:-rotate-12 relative z-10" />
                  )}
                </button>
              )}

              {/* Language Toggle Switch - Three languages */}
              <div className={`relative h-10 rounded-full bg-secondary/80 border border-border/50 transition-all duration-300 flex items-center overflow-hidden p-0.5 ${
                language === "ar" ? "flex-row-reverse" : ""
              }`}>
                {/* Sliding background indicator */}
                <div 
                  className={`absolute top-0.5 bottom-0.5 w-[calc(33.33%-2px)] bg-primary/20 rounded-full transition-all duration-500 ease-out ${
                    language === "en" ? "left-0.5" : language === "ar" ? "right-0.5" : "left-1/3"
                  }`}
                />
                
                {/* EN Button */}
                <button
                  onClick={() => handleLanguageChange("en")}
                  disabled={isChangingLanguage}
                  className={`relative z-10 h-9 px-4 rounded-full font-bold text-sm transition-all duration-500 ${
                    language === "en" 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  EN
                </button>
                
                {/* ZH Button */}
                <button
                  onClick={() => handleLanguageChange("zh")}
                  disabled={isChangingLanguage}
                  className={`relative z-10 h-9 px-4 rounded-full font-bold text-sm transition-all duration-500 ${
                    language === "zh" 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  中文
                </button>
                
                {/* AR Button */}
                <button
                  onClick={() => handleLanguageChange("ar")}
                  disabled={isChangingLanguage}
                  className={`relative z-10 h-9 px-4 rounded-full font-bold text-sm transition-all duration-500 ${
                    language === "ar" 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  AR
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden h-10 w-10 rounded-full bg-secondary/80 hover:bg-secondary border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-110 flex items-center justify-center group overflow-hidden"
                aria-label="Toggle menu"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {mobileMenuOpen ? (
                  <X className="h-5 w-5 text-foreground relative z-10 transition-transform duration-300 group-hover:rotate-90" />
                ) : (
                  <Menu className="h-5 w-5 text-foreground relative z-10" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay with Backdrop Blur */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop with blur - closes menu on click */}
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Centered Menu Card */}
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 md:hidden w-[90%] max-w-md">
            <div className="bg-background/95 backdrop-blur-lg border border-border rounded-2xl shadow-2xl p-8">
              <div className="flex flex-col items-center gap-6">
                <button
                  onClick={() => scrollToSection("hero")}
                  className="text-2xl font-semibold text-foreground hover:text-primary transition-all duration-300 animate-slide-in"
                  style={{ animationDelay: "0ms" }}
                >
                  {t.nav.home}
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-2xl font-semibold text-foreground hover:text-primary transition-all duration-300 animate-slide-in"
                  style={{ animationDelay: "100ms" }}
                >
                  {t.nav.about}
                </button>
                <button
                  onClick={() => scrollToSection("works")}
                  className="text-2xl font-semibold text-foreground hover:text-primary transition-all duration-300 animate-slide-in"
                  style={{ animationDelay: "200ms" }}
                >
                  {t.nav.works}
                </button>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-2xl font-semibold text-foreground hover:text-primary transition-all duration-300 animate-slide-in"
                  style={{ animationDelay: "300ms" }}
                >
                  {t.nav.services}
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-2xl font-semibold text-foreground hover:text-primary transition-all duration-300 animate-slide-in"
                  style={{ animationDelay: "400ms" }}
                >
                  {t.nav.contact}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Language Change Loading Overlay */}
      {isChangingLanguage && (
        <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <div className="relative">
            {/* Spinning loader */}
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      )}
    </>
  )
}