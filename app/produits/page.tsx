import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"

export default function ProduitsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation - Same as in home page */}
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

      {/* Products Header */}
      <section className="w-full py-12 md:py-24 bg-black text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gold-500">
                Nos Palettes de Chocolat
              </h1>
              <p className="max-w-[700px] text-gray-300 md:text-xl">
                Découvrez notre sélection de chocolats healthy, fabriqués avec des ingrédients naturels et sans sucres
                ajoutés.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="w-full py-12 bg-gradient-to-b from-black to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {Products.map((product) => (
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
        </div>
      </section>

      {/* Footer - Same as in home page */}
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
import { CartIcon } from "@/components/cart-icon"

const Products = [
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
  {
    id: 4,
    name: "Chocolat aux Noisettes et Pistaches",
    description: "Un mélange croquant de noisettes et pistaches dans un chocolat fondant.",
    price: "80",
    image: "/produits/Product3.jpg",
  },
  {
    id: 5,
    name: "Chocolat aux Fruits Rouges",
    description: "Alliance gourmande de chocolat blanc et éclats de fruits rouges naturels.",
    price: "90",
    image: "/produits/Product4.jpg",
  },
];
