"use client"

import { useLanguage } from "@/lib/language-context"
import { useEffect, useRef, useState } from "react"
import { Award, Clock, DollarSign, Headphones, Lightbulb, Shield } from "lucide-react"

export function WhyChooseSection() {
  const { t, language } = useLanguage()
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

  const features = [
    {
      icon: Award,
      title: t.whyChoose.features.expertise.title,
      description: t.whyChoose.features.expertise.description,
    },
    {
      icon: Shield,
      title: t.whyChoose.features.quality.title,
      description: t.whyChoose.features.quality.description,
    },
    {
      icon: Headphones,
      title: t.whyChoose.features.support.title,
      description: t.whyChoose.features.support.description,
    },
    {
      icon: Lightbulb,
      title: t.whyChoose.features.innovation.title,
      description: t.whyChoose.features.innovation.description,
    },
    {
      icon: Clock,
      title: t.whyChoose.features.delivery.title,
      description: t.whyChoose.features.delivery.description,
    },
    {
      icon: DollarSign,
      title: t.whyChoose.features.pricing.title,
      description: t.whyChoose.features.pricing.description,
    },
  ]

  return (
    <section id="why-choose" ref={sectionRef} className="py-20 sm:py-32">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div
          className={`grid lg:grid-cols-2 gap-12 items-center ${
            isVisible ? "opacity-100" : "opacity-0"
          } transition-opacity duration-1000`}
        >
          <div
            className={`${language === "ar" ? "lg:order-2" : ""} transition-all duration-1000 ${
              isVisible ? "translate-x-0" : language === "ar" ? "translate-x-12" : "-translate-x-12"
            }`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
              <img
                src="/8527923.jpg"
                alt="Why Choose Lekka"
                className="relative w-full h-auto rounded-3xl shadow-2xl"
              />
            </div>
          </div>

          <div
            className={`${language === "ar" ? "lg:order-1" : ""} transition-all duration-1000 ${
              isVisible ? "translate-x-0" : language === "ar" ? "-translate-x-12" : "translate-x-12"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{t.whyChoose.title}</h2>
            <p className="text-lg text-muted-foreground mb-8">{t.whyChoose.subtitle}</p>

            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={index}
                    className={`flex gap-4 items-start transition-all duration-500 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
