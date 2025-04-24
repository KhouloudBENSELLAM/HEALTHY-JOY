"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type Testimonial = {
  id: number
  name: string
  role: string
  content: string
  rating: number
  image: string
  company?: string
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[]
}

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const nextTestimonial = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)

    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  const prevTestimonial = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        nextTestimonial()
      }, 5000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused, testimonials.length, isAnimating])

  return (
    <div
      className="relative w-full overflow-hidden py-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute top-1/2 left-4 z-10 -translate-y-1/2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-gold-500 bg-black/50 text-gold-500 hover:bg-gold-950 hover:text-gold-400"
          onClick={prevTestimonial}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Précédent</span>
        </Button>
      </div>

      <div className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-gold-500 bg-black/50 text-gold-500 hover:bg-gold-950 hover:text-gold-400"
          onClick={nextTestimonial}
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Suivant</span>
        </Button>
      </div>

      <div className="relative mx-auto max-w-4xl">
        <div className="flex items-center justify-center">
          <div className="w-full">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={cn(
                  "absolute top-0 left-0 w-full transition-all duration-500 ease-in-out",
                  index === activeIndex
                    ? "opacity-100 translate-x-0"
                    : index < activeIndex || (activeIndex === 0 && index === testimonials.length - 1)
                      ? "opacity-0 -translate-x-full"
                      : "opacity-0 translate-x-full",
                )}
                style={{
                  display:
                    Math.abs(index - activeIndex) <= 1 ||
                    (activeIndex === 0 && index === testimonials.length - 1) ||
                    (activeIndex === testimonials.length - 1 && index === 0)
                      ? "block"
                      : "none",
                }}
              >
                <div className="relative bg-black/50 border border-gold-800 rounded-lg p-8 shadow-lg transform transition-transform hover:scale-[1.02] hover:border-gold-500">
                  {/* Effet de tablette de chocolat avec des carrés en relief */}
                  <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 opacity-10 pointer-events-none">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="border border-gold-500 rounded-sm m-1"></div>
                    ))}
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 items-center md:items-start relative z-10">
                    <div className="flex-shrink-0">
                      <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-gold-500 shadow-lg">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <div className="flex justify-center md:justify-start mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-5 w-5",
                              i < testimonial.rating ? "text-gold-500 fill-gold-500" : "text-gray-400",
                            )}
                          />
                        ))}
                      </div>

                      <p className="text-gray-300 italic mb-4 relative">
                        <span className="absolute -top-4 -left-2 text-4xl text-gold-500 opacity-30">"</span>
                        {testimonial.content}
                        <span className="absolute -bottom-4 -right-2 text-4xl text-gold-500 opacity-30">"</span>
                      </p>

                      <div>
                        <h4 className="font-bold text-gold-500">{testimonial.name}</h4>
                        <p className="text-sm text-gray-400">
                          {testimonial.role}
                          {testimonial.company && `, ${testimonial.company}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicateurs */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === activeIndex ? "bg-gold-500 w-6" : "bg-gray-600 hover:bg-gold-700",
              )}
              onClick={() => setActiveIndex(index)}
              aria-label={`Voir le témoignage ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
