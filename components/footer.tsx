"use client"

import { useLanguage } from "@/lib/language-context"
import { ArrowUp, Facebook, Twitter, Instagram, Linkedin, Github, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  const { t, language } = useLanguage()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-secondary/50 dark:bg-secondary/30 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-full py-16">
        {/* Main Content - Logo + Three Columns */}
        <div className="grid md:grid-cols-12 gap-12 mb-12">
          {/* Logo and Description - يأخذ 5 أعمدة */}
          <div className="md:col-span-5 text-center md:text-start">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <img src="/logo.svg" alt="Lekka logo" className="h-30 w-auto" />
            </div>
            <p className="text-muted-foreground leading-relaxed">{t.footer.description}</p>
            {/* Social Media Icons */}
            <div className="border-t border-border pt-8 mb-8">
              <div className="mb-6">
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all hover:scale-110"
                  >
                    <Facebook className="h-5 w-5 text-primary" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all hover:scale-110"
                  >
                    <Twitter className="h-5 w-5 text-primary" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all hover:scale-110"
                  >
                    <Instagram className="h-5 w-5 text-primary" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all hover:scale-110"
                  >
                    <Linkedin className="h-5 w-5 text-primary" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all hover:scale-110"
                  >
                    <Github className="h-5 w-5 text-primary" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Three Columns - تأخذ 7 أعمدة وتتقاسمها بالتساوي */}
          <div className="md:col-span-7 grid md:grid-cols-3 gap-12">
            {/* Quick Links */}
            <div className="text-center md:text-start">
              <h4 className="font-bold text-lg mb-6">{t.footer.quickLinks}</h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => scrollToSection("hero")}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t.nav.home}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t.nav.about}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("works")}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t.nav.works}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t.nav.services}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t.nav.contact}
                  </button>
                </li>
              </ul>
            </div>

            {/* Our Services */}
            <div className="text-center md:text-start">
              <h4 className="font-bold text-lg mb-6">{t.footer.ourServices}</h4>
              <ul className="space-y-3">
                <li className="text-muted-foreground">{t.services.items.web.title}</li>
                <li className="text-muted-foreground">{t.services.items.mobile.title}</li>
                <li className="text-muted-foreground">{t.services.items.design.title}</li>
                <li className="text-muted-foreground">{t.services.items.cloud.title}</li>
                <li className="text-muted-foreground">{t.services.items.ai.title}</li>
                <li className="text-muted-foreground">{t.services.items.consulting.title}</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="text-center md:text-start">
              <h4 className="font-bold text-lg mb-6">{t.footer.contactInfo}</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-muted-foreground justify-center md:justify-start">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{t.contact.info.email}</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground justify-center md:justify-start">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{t.contact.info.phone}</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground justify-center md:justify-start">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{t.contact.info.address}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright and Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">{t.footer.copyright}</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span>{t.footer.backToTop}</span>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <ArrowUp className="h-5 w-5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  )
}