"use client"

import { useState, useEffect, useRef } from "react"
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

interface TestimonialsBubblesProps {
  testimonials: Testimonial[]
}

export function TestimonialsBubbles({ testimonials }: TestimonialsBubblesProps) {
  const [visibleTestimonials, setVisibleTestimonials] = useState<number[]>([0, 1, 2])
  const [animatingOut, setAnimatingOut] = useState<number | null>(null)
  const [animatingIn, setAnimatingIn] = useState<number | null>(null)
  const [isClient, setIsClient] = useState(false)
  const bubblesRef = useRef<Array<{ size: number; left: string; top: string; duration: number; delay: number }>>([])

  // Initialiser les positions des bulles uniquement côté client
  useEffect(() => {
    setIsClient(true)

    // Initialiser les bulles décoratives avec des positions aléatoires
    bubblesRef.current = Array(8)
      .fill(0)
      .map(() => ({
        size: Math.floor(Math.random() * 40 + 20),
        left: `${Math.floor(Math.random() * 80 + 10)}%`,
        top: `${Math.floor(Math.random() * 80 + 10)}%`,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
      }))
  }, [])

  useEffect(() => {
    if (!isClient) return

    const interval = setInterval(() => {
      // Choisir un témoignage aléatoire à remplacer
      const indexToReplace = Math.floor(Math.random() * visibleTestimonials.length)
      const oldIndex = visibleTestimonials[indexToReplace]

      // Marquer ce témoignage comme sortant
      setAnimatingOut(oldIndex)

      // Après l'animation de sortie, remplacer par un nouveau
      setTimeout(() => {
        let newIndex
        do {
          newIndex = Math.floor(Math.random() * testimonials.length)
        } while (visibleTestimonials.includes(newIndex))

        const newVisible = [...visibleTestimonials]
        newVisible[indexToReplace] = newIndex

        setVisibleTestimonials(newVisible)
        setAnimatingOut(null)
        setAnimatingIn(newIndex)

        // Réinitialiser l'animation d'entrée après qu'elle soit terminée
        setTimeout(() => {
          setAnimatingIn(null)
        }, 700)
      }, 700)
    }, 4000)

    return () => clearInterval(interval)
  }, [testimonials.length, visibleTestimonials, isClient])

  // Positions fixes pour le rendu initial
  const positions = [
    { left: "10%", top: "20%" },
    { left: "50%", top: "10%" },
    { left: "80%", top: "30%" },
  ]

  return (
    <div className="w-full py-8 relative min-h-[400px]">
      {visibleTestimonials.map((testimonialIndex, index) => {
        const testimonial = testimonials[testimonialIndex]

        return (
          <div
            key={`bubble-${testimonialIndex}-${index}`}
            className={cn(
              "absolute w-64 md:w-80 transition-all duration-700",
              animatingOut === testimonialIndex ? "opacity-0 translate-y-[-50px]" : "opacity-100 translate-y-0",
              animatingIn === testimonialIndex ? "opacity-0 translate-y-[50px] animate-fade-in-up" : "",
            )}
            style={{
              left: positions[index].left,
              top: positions[index].top,
              zIndex: 10 - index,
            }}
          >
            <div className="bg-black/70 border border-gold-800 rounded-lg p-4 shadow-lg backdrop-blur-sm">
              <div className="flex items-center mb-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gold-500 shadow-lg mr-3">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gold-500 text-sm">{testimonial.name}</h4>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-3 w-3",
                          i < testimonial.rating ? "text-gold-500 fill-gold-500" : "text-gray-400",
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-gray-300 text-xs italic">"{testimonial.content}"</p>
            </div>

            {/* Connecteur en forme de bulle */}
            <div className="absolute -bottom-2 left-5 w-4 h-4 bg-black/70 border-b border-r border-gold-800 transform rotate-45"></div>
          </div>
        )
      })}

      {/* Bulles décoratives - uniquement rendues côté client */}
      {isClient &&
        bubblesRef.current.map((bubble, i) => (
          <div
            key={`deco-bubble-${i}`}
            className="absolute rounded-full bg-gold-500/10 border border-gold-500/20 animate-float"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: bubble.left,
              top: bubble.top,
              zIndex: 1,
              animationDuration: `${bubble.duration}s`,
              animationDelay: `${bubble.delay}s`,
            }}
          />
        ))}
    </div>
  )
}
