"use client"

import { useLanguage } from "@/lib/language-context"
import { useEffect, useRef, useState } from "react"

const projects = [
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

export function WorksSection() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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

  return (
    <section id="works" ref={sectionRef} className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-full">
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">{t.works.title}</h2>
          <p className="text-lg text-muted-foreground">{t.works.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 cursor-pointer ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
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
                <h3 className="text-xl font-bold mb-2 text-primary group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
