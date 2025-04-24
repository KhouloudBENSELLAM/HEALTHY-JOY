import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CartIcon } from "@/components/cart-icon"
import { TestimonialsSection } from "@/components/testimonials-section"

export default function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: "Chocolat Noir Bio",
      description: "70% cacao, intense et sans sucre ajouté, issu de l’agriculture biologique.",
      price: "60",
      image: "/produits/history2.jpg",
    },
    {
      id: 2,
      name: "Chocolat aux Akajoux, Amounds et noisettes ",
      description: "Un mélange croquant de Akajoux ,noisettes et noisettes dans un chocolat fondant.",
      price: "70",
      image: "/produits/Product1.jpg",
    },
    {
      id: 3,
      name: "Chocolat aux Amandes",
      description: "Chocolat onctueux au lait avec éclats d’amandes grillées, riche en fibres.",
      price: "75",
      image: "/produits/Product2.jpg",
    },
    
  ];
  
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-black">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-gold-500">HEALTHY JOY</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium text-gold-500 hover:text-gold-400">
              Accueil
            </Link>
            <Link href="/produits" className="text-sm font-medium text-gold-500 hover:text-gold-400">
              Nos Chocolats
            </Link>
            <Link href="/a-propos" className="text-sm font-medium text-gold-500 hover:text-gold-400">
              À Propos
            </Link>
            <Link href="/contact" className="text-sm font-medium text-gold-500 hover:text-gold-400">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <CartIcon />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-8 md:py-16 lg:py-24 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/History.jpg"
            alt="Background pattern"
            width={1080}
            height={1920}
            className="object-cover"
            priority
          />
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none text-gold-500">
                  Découvrez Nos Chocolats Healthy
                </h1>
                <p className="max-w-[600px] text-gray-300 text-sm md:text-base lg:text-xl">
                  Des palettes de chocolat artisanales, saines et délicieuses. Fabriquées avec des ingrédients naturels
                  et sans sucres ajoutés.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/produits">
                  <Button className="bg-gold-500 text-black hover:bg-gold-400">
                    Découvrir nos produits
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-[250px] h-[350px] md:w-[450px] md:h-[600px]">
                <Image
                  src="/History.jpg"
                  alt="Palette de chocolat premium"
                  width={600}
                  height={450}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Featured Products */}
      
      <section className="w-full py-12 md:py-24 bg-gradient-to-b from-black to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gold-500">Nos Meilleures Ventes</h2>
              <p className="max-w-[700px] text-gray-300 md:text-xl">
                Découvrez nos palettes de chocolat les plus populaires, élaborées avec des ingrédients premium.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-12">
          {featuredProducts.map((product) => (
            <Link href={`/produits/${product.id}`} key={product.id} className="group">
              <div className="relative overflow-hidden rounded-lg border border-gold-800 bg-black/50 transition-all hover:border-gold-500">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={500}
                    height={400}
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-base md:text-lg text-gold-500">{product.name}</h3>
                  <p className="text-xs md:text-sm text-gray-300 mt-1 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mt-3 md:mt-4">
                    <span className="font-bold text-sm md:text-base text-gold-400">{product.price} DH</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gold-500 text-gold-500 hover:bg-gold-950 hover:text-gold-400 text-xs md:text-sm"
                    >
                      Voir détails
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          </div>
          <div className="flex justify-center mt-12">
            <Link href="/produits">
              <Button className="bg-gold-500 text-black hover:bg-gold-400">
                Voir tous nos produits
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-12 md:py-24 bg-black">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gold-500">
                Pourquoi Choisir Nos Chocolats
              </h2>
              <p className="max-w-[700px] text-gray-300 md:text-xl">
                Des chocolats sains et délicieux, conçus pour votre bien-être.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gold-800 bg-black/50">
              <div className="h-12 w-12 rounded-full bg-gold-500 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black"
                >
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gold-500 mb-2">Ingrédients Naturels</h3>
              <p className="text-gray-300">
                Uniquement des ingrédients biologiques et naturels, sans additifs artificiels.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gold-800 bg-black/50">
              <div className="h-12 w-12 rounded-full bg-gold-500 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black"
                >
                  <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"></path>
                  <path d="m7 16.5-4.74-2.85"></path>
                  <path d="m7 16.5 5-3"></path>
                  <path d="M7 16.5v5.17"></path>
                  <path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"></path>
                  <path d="m17 16.5-5-3"></path>
                  <path d="m17 16.5 4.74-2.85"></path>
                  <path d="M17 16.5v5.17"></path>
                  <path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"></path>
                  <path d="M12 8 7.26 5.15"></path>
                  <path d="m12 8 4.74-2.85"></path>
                  <path d="M12 13.5V8"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gold-500 mb-2">Sans Sucres Ajoutés</h3>
              <p className="text-gray-300">
                Édulcorés naturellement avec des alternatives saines comme le sirop d'érable ou le miel.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gold-800 bg-black/50">
              <div className="h-12 w-12 rounded-full bg-gold-500 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black"
                >
                  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gold-500 mb-2">Artisanal & Éthique</h3>
              <p className="text-gray-300">
                Fabriqués à la main en petits lots, avec du cacao issu du commerce équitable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-black border-t border-gold-900">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gold-500">HEALTHY JOY</h3>
              <p className="text-sm text-gray-400">
                Des chocolats healthy, élégants et délicieux pour tous les amateurs de douceurs.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gold-500">Navigation</h3>
              <ul className="space-y-1">
                <li>
                  <Link href="/" className="text-sm text-gray-400 hover:text-gold-400">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link href="/produits" className="text-sm text-gray-400 hover:text-gold-400">
                    Nos Chocolats
                  </Link>
                </li>
                <li>
                  <Link href="/a-propos" className="text-sm text-gray-400 hover:text-gold-400">
                    À Propos
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-gray-400 hover:text-gold-400">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gold-500">Légal</h3>
              <ul className="space-y-1">
                <li>
                  <Link href="/mentions-legales" className="text-sm text-gray-400 hover:text-gold-400">
                    Mentions Légales
                  </Link>
                </li>
                <li>
                  <Link href="/confidentialite" className="text-sm text-gray-400 hover:text-gold-400">
                    Politique de Confidentialité
                  </Link>
                </li>
                <li>
                  <Link href="/cgv" className="text-sm text-gray-400 hover:text-gold-400">
                    CGV
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gold-500">Contact</h3>
              <ul className="space-y-1">
                <li className="text-sm text-gray-400">khouloudbensellam78@gmail.com</li>
                <li className="text-sm text-gray-400">+212 648 68 78 64</li>
                <li className="text-sm text-gray-400">Tanger, Maroc</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 border-t border-gold-900 pt-6 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} HEALTHY JOY. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  )
}

