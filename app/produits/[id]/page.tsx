"use client"

import { useState } from "react"
import { use } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/contexts/cart-context"
import { CartIcon } from "@/components/cart-icon"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart() // Moved here to ensure it's always called

  // Déballer params avec React.use()
  const resolvedParams = use(params)

  // Find the product based on the ID from the URL
  const product = products.find((p) => Number(p.id) === Number(resolvedParams.id));

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <h1 className="text-2xl font-bold text-gold-500">Produit non trouvé</h1>
        <p className="text-gray-300 mt-2">Le produit que vous recherchez n'existe pas.</p>
        <Link href="/produits">
          <Button className="mt-4 bg-gold-500 text-black hover:bg-gold-400">Retour aux produits</Button>
        </Link>
      </div>
    )
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image || "/placeholder.svg?height=100&width=100",
    })

    toast({
      title: "Produit ajouté au panier",
      description: `${quantity} x ${product.name} ajouté à votre panier`,
    })
  }

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

      {/* Product Detail */}
      <main className="flex-1 py-12 bg-gradient-to-b from-black to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <Link href="/produits" className="inline-flex items-center text-gold-500 hover:text-gold-400">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux produits
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-12">
            <div className="relative aspect-square overflow-hidden rounded-lg border border-gold-800">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-gold-500">{product.name}</h1>
              <p className="mt-2 text-xl font-semibold text-gold-400">{product.price} DH</p>
              <div className="mt-4 text-gray-300">{product.description}</div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center">
                  <span className="text-gold-500 mr-4">Catégorie:</span>
                  <span className="text-gray-300">{product.category}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gold-500 mr-4">Ingrédients:</span>
                  <ul className="text-gray-300">
                    {product.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center">
                  <span className="text-gold-500 mr-4">Poids:</span>
                  <span className="text-gray-300">{product.weight}</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <span className="text-gold-500 mr-0">Quantité:</span>
                <div className="flex items-center border border-gold-800 rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={decreaseQuantity}
                    className="text-gold-500 hover:text-gold-400 hover:bg-transparent"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-10 text-center text-gold-500">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={increaseQuantity}
                    className="text-gold-500 hover:text-gold-400 hover:bg-transparent"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button className="mt-8 bg-gold-500 text-black hover:bg-gold-400" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Ajouter au panier
              </Button>

              <div className="mt-8 p-4 border border-gold-800 rounded-lg bg-black/50">
                <h3 className="text-lg font-semibold text-gold-500">Livraison</h3>
                <p className="mt-2 text-gray-300">
                  Livraison gratuite à partir de 200 DH d'achat. Livraison en 2-3 jours ouvrés.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

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

const products = [
  {
    id: 1,
    name: "Chocolat Noir Bio",
    description: "70% cacao, intense et sans sucre ajouté, issu de l’agriculture biologique.",
    price: "60",
    image: "/produits/history2.jpg",
    weight: "100g",
    category: "Chocolat Noir",  // Catégorie ajoutée
    ingredients: ["Cacao", "Beurre de cacao", "Vanille"]  // Ingrédients ajoutés
  },
  {
    id: 2,
    name: "Chocolat aux Akajoux, Amandes et Noisettes",
    description: "Un mélange croquant de Akajoux, noisettes et amandes dans un chocolat fondant.",
    price: "70",
    image: "/produits/Product1.jpg",
    weight: "120g",
    category: "Chocolat au Lait",  // Catégorie ajoutée
    ingredients: ["Cacao", "Amandes", "Noisettes", "Akajoux"]  // Ingrédients ajoutés
  },
  {
    id: 3,
    name: "Chocolat aux Amandes",
    description: "Chocolat onctueux au lait avec éclats d’amandes grillées, riche en fibres.",
    price: "75",
    image: "/produits/Product2.jpg",
    weight: "110g",
    category: "Chocolat Noire aux Amandes",  // Catégorie ajoutée
    ingredients: ["Cacao", "Sucre", "Amandes", "Lait en poudre"]  // Ingrédients ajoutés
  },
  {
    id: 4,
    name: "Chocolat aux Noisettes et Pistaches",
    description: "Un mélange croquant de noisettes et pistaches dans un chocolat fondant.",
    price: "80",
    image: "/produits/Product3.jpg",
    weight: "130g",
    category: "Chocolat Noire aux noisettes et pisatache",  // Catégorie ajoutée
    ingredients: ["Cacao", "Noisettes", "Pistaches"]  // Ingrédients ajoutés
  },
  {
    id: 5,
    name: "Chocolat aux Fruits Rouges",
    description: "Alliance gourmande de chocolat  et éclats de fruits rouges naturels.",
    price: "90",
    image: "/produits/Product4.jpg",
    weight: "150g",
    category: "Chocolat Fruité",  // Catégorie ajoutée
    ingredients: ["Cacao",  "Fruits rouges (fraises, framboises)"]  // Ingrédients ajoutés
  },
];
