"use client"

import { useLanguage } from "@/lib/language-context"
import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "E-Commerce Platform",
    image: "/modern-ecommerce-website-hero-section.jpg",
  },
  {
    title: "SaaS Dashboard",
    image: "/saas-dashboard-analytics-interface.jpg",
  },
  {
    title: "Real Estate Portal",
    image: "/real-estate-website-hero.jpg",
  },
  {
    title: "Healthcare App",
    image: "/healthcare-web-app-interface.jpg",
  },
  {
    title: "Fintech Solution",
    image: "/fintech-banking-app-interface.jpg",
  },
  {
    title: "Education Platform",
    image: "/education-learning-platform-interface.jpg",
  },
]

const mobileApps = [
  {
    title: "Fitness Tracker",
    image: "/works/mobile/mobile1.png",
  },
  {
    title: "Food Delivery",
    image: "/works/mobile/mobile1.png",
  },
  {
    title: "Social Network",
    image: "/works/mobile/mobile1.png",
  },
  {
    title: "Music Player",
    image: "/works/mobile/mobile1.png",
  },
  {
    title: "Travel Booking",
    image: "/works/mobile/mobile1.png",
  },
]

export function WorksSection() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mobileApps.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + mobileApps.length) % mobileApps.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mobileApps.length)
  }

  return (
    <section id="works" ref={sectionRef} className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Apps Section */}
        <div className="mt-32">
          <div
            className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">{t.mobile.title}</h2>
            <p className="text-lg text-muted-foreground">{t.mobile.subtitle}</p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="relative h-[600px] flex items-center justify-center perspective-1000">
              {mobileApps.map((app, index) => {
                const offset = index - currentIndex
                const absOffset = Math.abs(offset)

                return (
                  <div
                    key={index}
                    className="absolute transition-all duration-700 ease-out"
                    style={{
                      transform: `translateX(${offset * 280}px) scale(${
                        absOffset === 0 ? 1 : 0.8
                      }) rotateY(${offset * 15}deg)`,
                      opacity: absOffset > 2 ? 0 : absOffset === 0 ? 1 : 0.5,
                      zIndex: 10 - absOffset,
                    }}
                  >
                    <div className="w-64 h-[520px] bg-card border-4 border-border rounded-[3rem] overflow-hidden shadow-2xl p-8">
                      <div className="w-full h-full overflow-hidden rounded-2xl">
                        <img src={app.image || "/placeholder.svg"} alt={app.title} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    {absOffset === 0 && <p className="text-center mt-6 text-lg font-semibold">{app.title}</p>}
                  </div>
                )
              })}
            </div>

            <div className="flex items-center justify-center gap-4 mt-8">
              <Button variant="outline" size="icon" onClick={goToPrevious} className="rounded-full bg-transparent">
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <div className="flex gap-2">
                {mobileApps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? "bg-primary w-8" : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              <Button variant="outline" size="icon" onClick={goToNext} className="rounded-full bg-transparent">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
