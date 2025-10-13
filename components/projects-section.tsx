"use client"

import type React from "react"

import { useLanguage } from "@/lib/language-context"
import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const webProjects = [
  {
    title: "E-Commerce Platform",
    description: "Modern shopping experience with seamless checkout",
    image: "/modern-ecommerce-website-hero-section.jpg",
  },
  {
    title: "SaaS Dashboard",
    description: "Analytics platform for business intelligence",
    image: "/saas-dashboard-analytics-interface.jpg",
  },
  {
    title: "Real Estate Portal",
    description: "Property listing and management system",
    image: "/real-estate-website-hero.jpg",
  },
  {
    title: "Healthcare App",
    description: "Patient management and telemedicine platform",
    image: "/healthcare-web-app-interface.jpg",
  },
  {
    title: "Fintech Solution",
    description: "Digital banking and payment processing",
    image: "/fintech-banking-app-interface.jpg",
  },
  {
    title: "Education Platform",
    description: "Online learning management system",
    image: "/education-learning-platform-interface.jpg",
  },
]

const mobileApps = [
  {
    title: "Fitness Tracker",
    image: "/fitness-app-mobile-screen-dark-theme.jpg",
  },
  {
    title: "Food Delivery",
    image: "/food-delivery-app-mobile-interface.jpg",
  },
  {
    title: "Social Network",
    image: "/social-media-app-mobile-feed.jpg",
  },
  {
    title: "Music Player",
    image: "/music-player-app-mobile-interface.jpg",
  },
  {
    title: "Travel Booking",
    image: "/travel-booking-app-mobile-screen.jpg",
  },
]

export function ProjectsSection() {
  const { t, language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const webScrollRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>
  const mobileScrollRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const scrollLeft = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -400, behavior: "smooth" })
    }
  }

  const scrollRight = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 400, behavior: "smooth" })
    }
  }

  return (
    <section id="works" ref={sectionRef} className="py-20 sm:py-32 bg-secondary/30 dark:bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-full">
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{t.projects.mainTitle}</h2>
        </div>

        <div className="mb-16">
          <div className={`flex items-center justify-between mb-6 ${language === "ar" ? "flex-row-reverse" : ""}`}>
            <h3 className="text-2xl sm:text-3xl font-bold">{t.projects.webTitle}</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scrollLeft(webScrollRef)}
                className="rounded-full bg-transparent"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scrollRight(webScrollRef)}
                className="rounded-full bg-transparent"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div
            ref={webScrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {webProjects.map((project, index) => (
              <div
                key={index}
                className="group relative flex-shrink-0 w-[320px] sm:w-[380px] overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h4 className="text-xl font-bold mb-2 text-primary group-hover:text-accent transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className={`flex items-center justify-between mb-6 ${language === "ar" ? "flex-row-reverse" : ""}`}>
            <h3 className="text-2xl sm:text-3xl font-bold">{t.projects.mobileTitle}</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scrollLeft(mobileScrollRef)}
                className="rounded-full bg-transparent"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scrollRight(mobileScrollRef)}
                className="rounded-full bg-transparent"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div
            ref={mobileScrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {mobileApps.map((app, index) => (
              <div
                key={index}
                className="group flex-shrink-0 w-[240px] transition-all duration-500 cursor-pointer hover:-translate-y-2"
              >
                <div className="w-full h-[480px] bg-card border-4 border-border rounded-[3rem] overflow-hidden shadow-2xl group-hover:border-primary/50 transition-all duration-500">
                  <img src={app.image || "/placeholder.svg"} alt={app.title} className="w-full h-full object-cover" />
                </div>
                <p className="text-center mt-4 text-lg font-semibold">{app.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
