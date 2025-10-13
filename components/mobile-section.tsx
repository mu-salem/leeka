"use client"

import { useLanguage } from "@/lib/language-context"
import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

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

export function MobileSection() {
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
    <section id="mobile" ref={sectionRef} className="py-20 sm:py-32 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-full">
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">{t.mobile.title}</h2>
          <p className="text-lg text-muted-foreground">{t.mobile.subtitle}</p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="relative h-[600px] flex items-center justify-center perspective-1000 overflow-x-hidden">
            {mobileApps.map((app, index) => {
              const offset = index - currentIndex
              const absOffset = Math.abs(offset)

              return (
                <div
                  key={index}
                  className="absolute transition-all duration-700 ease-out"
                  style={{
                    transform: `translateX(${offset * 200}px) scale(${
                      absOffset === 0 ? 1 : 0.8
                    }) rotateY(${offset * 15}deg)`,
                    opacity: absOffset > 2 ? 0 : absOffset === 0 ? 1 : 0.5,
                    zIndex: 10 - absOffset,
                  }}
                >
                  <div className="w-48 sm:w-56 md:w-64 h-[420px] sm:h-[480px] md:h-[520px] bg-card border-4 border-border rounded-[3rem] overflow-hidden shadow-2xl">
                    <img src={app.image || "/placeholder.svg"} alt={app.title} className="w-full h-full object-cover" />
                  </div>
                  {absOffset === 0 && <p className="text-center mt-6 text-base sm:text-lg font-semibold">{app.title}</p>}
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
    </section>
  )
}
