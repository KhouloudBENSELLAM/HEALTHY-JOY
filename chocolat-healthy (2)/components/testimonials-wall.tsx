"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

type Testimonial = {
  id: number
  name: string
  role: string
  content: string
  rating: number
  image: string
  company?: string
}

interface TestimonialsWallProps {
  testimonials: Testimonial[]
}

export function TestimonialsWall({ testimonials }: TestimonialsWallProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState<boolean[]>([])
  const [isClient, setIsClient] = useState(false)

  // Réorganiser les témoignages en grille
  const gridTestimonials = [...testimonials]
  while (gridTestimonials.length < 6) {
    gridTestimonials.push(...testimonials.slice(0, 6 - gridTestimonials.length))
  }

  // Marquer que nous sommes côté client
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Animation d'entrée progressive - uniquement côté client
  useEffect(() => {
    if (!isClient) return

    const timeouts = gridTestimonials.map((_, index) => {
      return setTimeout(() => {
        setIsVisible((prev) => {
          const newState = [...prev]
          newState[index] = true
          return newState
        })
      }, index * 100)
    })

    return () => {
      timeouts.forEach(clearTimeout)
    }
  }, [gridTestimonials.length, isClient])

  return (
    <div className="w-full py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gridTestimonials.map((testimonial, index) => (
          <div
            key={`${testimonial.id}-${index}`}
            className={cn(
              "relative bg-black/50 border border-gold-800 rounded-lg p-6 shadow-lg h-full transition-all duration-500",
              isClient && isVisible[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20",
              hoveredIndex === index ? "scale-[1.03] border-gold-500" : "",
            )}
            style={{ transitionDelay: isClient ? `${index * 0.1}s` : "0s" }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            suppressHydrationWarning
          >
            {/* Effet de tablette de chocolat avec des carrés en relief */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-10 pointer-events-none">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="border border-gold-500 rounded-sm m-1"></div>
              ))}
            </div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gold-500 shadow-lg mr-3">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gold-500">{testimonial.name}</h4>
                    <p className="text-xs text-gray-400">
                      {testimonial.role}
                      {testimonial.company && `, ${testimonial.company}`}
                    </p>
                  </div>
                </div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < testimonial.rating ? "text-gold-500 fill-gold-500" : "text-gray-400",
                      )}
                    />
                  ))}
                </div>
              </div>

              <p className="text-gray-300 text-sm italic relative">
                <span className="absolute -top-3 -left-1 text-3xl text-gold-500 opacity-30">"</span>
                {testimonial.content}
                <span className="absolute -bottom-3 -right-1 text-3xl text-gold-500 opacity-30">"</span>
              </p>
            </div>

            {/* Effet de brillance au survol - uniquement côté client */}
            {isClient && hoveredIndex === index && (
              <div className="absolute inset-0 overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/10 to-transparent animate-shine" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
