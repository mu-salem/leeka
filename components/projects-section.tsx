"use client"

import type React from "react"

import { useLanguage } from "@/lib/language-context"
import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const allProjects = [
  {
    title: "E-Commerce Platform",
    image: "/works/desktop/pro1.png",
  },
  {
    title: "SaaS Dashboard",
    image: "/works/desktop/pro1.png",
  },
  {
    title: "Real Estate Portal",
    image: "/works/desktop/pro1.png",
  },
  {
    title: "Healthcare App",
    image: "/works/desktop/pro2.png",
  },
  {
    title: "Fintech Solution",
    image: "/works/desktop/pro2.png",
  },
  {
    title: "Education Platform",
    image: "/works/desktop/pro2.png",
  },
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
  {
    title: "Travel Booking",
    image: "/works/mobile/mobile1.png",
  },
]

export function ProjectsSection() {
  const { t, language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null)

  const cardsPerSlide = 6
  const totalSlides = Math.ceil(allProjects.length / cardsPerSlide)

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

  // Auto-slide every 5 seconds
  useEffect(() => {
    startAutoSlide()
    return () => stopAutoSlide()
  }, [currentSlide])

  const startAutoSlide = () => {
    stopAutoSlide()
    autoSlideRef.current = setTimeout(() => {
      goToNextSlide()
    }, 5000)
  }

  const stopAutoSlide = () => {
    if (autoSlideRef.current) {
      clearTimeout(autoSlideRef.current)
    }
  }

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    startAutoSlide()
  }

  // Get cards for current slide
  const getCurrentCards = () => {
    const startIndex = currentSlide * cardsPerSlide
    return allProjects.slice(startIndex, startIndex + cardsPerSlide)
  }

  const handleProjectClick = (projectTitle: string) => {
    const phoneNumber = "201150148000" 
    const message = `Hello, I'm interested in working with you. Can we discuss potential collaboration opportunities?`
    
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section id="works" ref={sectionRef} className="py-20 sm:py-32 bg-secondary/30 dark:bg-secondary/20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 ">
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{t.projects.mainTitle}</h2>
        </div>

        <div className="relative">
          {/* Slider Container with smooth fade transition */}
          <div className="relative min-h-[800px] lg:min-h-[1000px]">
            {/* Grid Layout - 2 rows × 3 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {getCurrentCards().map((project, index) => (
                <div
                  key={`${currentSlide}-${index}`}
                  onClick={() => handleProjectClick(project.title)}
                  className={`group relative overflow-hidden rounded-3xl bg-card border-2 border-border hover:border-primary/60 transition-all duration-700 cursor-pointer hover:shadow-2xl hover:shadow-primary/20 h-[380px] lg:h-[480px] ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                  style={{ 
                    transitionDelay: `${index * 100}ms`,
                    animation: `fadeInUp 0.8s ease-out ${index * 0.1}s both`
                  }}
                >
                  {/* Image Container with Zoom Effect */}
                  <div className="h-full w-full overflow-hidden relative">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <h4 className="text-2xl lg:text-3xl font-bold mb-3 text-white drop-shadow-lg">
                        {project.title}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Combined Pagination Dots and Navigation Arrows */}
          <div className="flex items-center justify-between mt-12 px-4">
            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-3 flex-1">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-500 rounded-full ${
                    index === currentSlide
                      ? "w-12 h-3 bg-primary shadow-lg shadow-primary/50"
                      : "w-3 h-3 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows - Always on the right side */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  goToPrevSlide()
                  stopAutoSlide()
                  startAutoSlide()
                }}
                className="h-12 w-12 rounded-full bg-background/90 backdrop-blur-md hover:bg-primary hover:text-white border-2 border-border hover:border-primary shadow-lg hover:scale-105 transition-all duration-300"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  goToNextSlide()
                  stopAutoSlide()
                  startAutoSlide()
                }}
                className="h-12 w-12 rounded-full bg-background/90 backdrop-blur-md hover:bg-primary hover:text-white border-2 border-border hover:border-primary shadow-lg hover:scale-105 transition-all duration-300"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Add keyframe animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  )
}