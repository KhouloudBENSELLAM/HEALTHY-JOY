"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { TestimonialsWall } from "@/components/testimonials-wall"
import { TestimonialsBubbles } from "@/components/testimonials-bubbles"

export type Testimonial = {
  id: number
  name: string
  role: string
  content: string
  rating: number
  image: string
  company?: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sophie Martin",
    role: "Cliente fidèle",
    content:
      "Ces chocolats sont une révélation ! J'adore particulièrement la palette Superfoods qui me permet de me faire plaisir sans culpabilité. Un vrai délice pour les papilles et pour la santé.",
    rating: 5,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Thomas Dubois",
    role: "Chef pâtissier",
    company: "Le Chocolatier",
    content:
      "En tant que professionnel, je suis impressionné par la qualité et la finesse de ces chocolats. L'équilibre des saveurs est parfait et l'utilisation d'ingrédients naturels est remarquable.",
    rating: 5,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Emma Petit",
    role: "Nutritionniste",
    content:
      "Je recommande souvent ces chocolats à mes clients qui cherchent à se faire plaisir tout en prenant soin de leur santé. La palette Noir Intense est particulièrement riche en antioxydants.",
    rating: 4,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Lucas Bernard",
    role: "Amateur de chocolat",
    content:
      "J'ai découvert CACAO LUXE lors d'un salon gastronomique et je suis devenu accro ! La palette Orange & Épices est mon péché mignon, un vrai voyage gustatif.",
    rating: 5,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Julie Moreau",
    role: "Blogueuse culinaire",
    company: "Saveurs & Délices",
    content:
      "Ces chocolats sont non seulement délicieux mais aussi magnifiques. Ils font sensation lors de mes ateliers de dégustation et mes abonnés les adorent !",
    rating: 5,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Antoine Leroy",
    role: "Client",
    content:
      "J'offre régulièrement ces chocolats en cadeau et ils font toujours leur effet. La qualité est constante et le packaging est élégant. Un grand bravo à toute l'équipe !",
    rating: 4,
    image: "/placeholder.svg?height=200&width=200",
  },
]

export function TestimonialsSection() {
  const [activeView, setActiveView] = useState("carousel")

  return (
    <section className="w-full py-12 md:py-24 bg-black">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gold-500">Ce que nos clients disent</h2>
            <p className="max-w-[700px] text-gray-300 md:text-xl mx-auto">
              Découvrez les expériences de nos clients avec nos chocolats artisanaux et healthy.
            </p>
          </div>
        </div>

        <Tabs defaultValue="bubbles" className="w-full" onValueChange={setActiveView}>
          <div className="flex justify-center mb-8">
            <TabsList className="bg-black/50 border border-gold-800">
              {/* <TabsTrigger value="carousel" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
                Carrousel
              </TabsTrigger> */}
              <TabsTrigger value="wall" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
                Mur de chocolat
              </TabsTrigger>
              <TabsTrigger value="bubbles" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
                Bulles flottantes
              </TabsTrigger>
            </TabsList>
          </div>

          {/* <TabsContent value="carousel" className="mt-0">
            <TestimonialsCarousel testimonials={testimonials} className="h-[400px]" />
          </TabsContent> */}

          <TabsContent value="wall" className="mt-0">
            <TestimonialsWall testimonials={testimonials} />
          </TabsContent>

          <TabsContent value="bubbles" className="mt-0">
            <TestimonialsBubbles testimonials={testimonials} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
