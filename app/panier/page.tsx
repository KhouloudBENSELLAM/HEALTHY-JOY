"use client"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/contexts/cart-context"
import { CartIcon } from "@/components/cart-icon"

export default function CartPage() {
  const { toast } = useToast()
  const { cartItems, removeFromCart, updateQuantity, subtotal, shipping, total } = useCart()

  const removeItem = (id: string) => {
    removeFromCart(id)

    toast({
      title: "Produit retiré",
      description: "Le produit a été retiré de votre panier",
    })
  }

  if (cartItems.length === 0) {
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

        <main className="flex-1 py-12 bg-gradient-to-b from-black to-gray-950">
          <div className="container px-4 md:px-6 flex flex-col items-center justify-center min-h-[50vh]">
            <ShoppingBag className="h-16 w-16 text-gold-500 mb-4" />
            <h1 className="text-2xl font-bold text-gold-500 mb-2">Votre panier est vide</h1>
            <p className="text-gray-300 mb-6 text-center">Vous n'avez pas encore ajouté de produits à votre panier.</p>
            <Link href="/produits">
              <Button className="bg-gold-500 text-black hover:bg-gold-400">
                Découvrir nos produits
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
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

      <main className="flex-1 py-12 bg-gradient-to-b from-black to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <Link href="/produits" className="inline-flex items-center text-gold-500 hover:text-gold-400">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continuer mes achats
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-gold-500 mb-8">Votre Panier</h1>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 rounded-lg border border-gold-800 bg-black/50">
                  <div className="w-20 h-20 relative rounded overflow-hidden flex-shrink-0">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gold-500">{item.name}</h3>
                    <p className="text-gold-400 mt-1">{item.price} DH</p>

                    <div className="flex items-center mt-4 justify-between">
                      <div className="flex items-center border border-gold-800 rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-gold-500 hover:text-gold-400 hover:bg-transparent"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center text-gold-500">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-gold-500 hover:text-gold-400 hover:bg-transparent"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-gold-500 hover:text-gold-400 hover:bg-transparent"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-lg border border-gold-800 bg-black/50">
                <h2 className="text-xl font-bold text-gold-500 mb-4">Résumé de la commande</h2>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Sous-total</span>
                    <span className="text-gold-500">{subtotal.toFixed(2)} DH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Frais de livraison</span>
                    <span className="text-gold-500">{shipping === 0 ? "Gratuit" : `${shipping.toFixed(2)} DH`}</span>
                  </div>

                  <Separator className="my-4 bg-gold-900" />

                  <div className="flex justify-between font-bold">
                    <span className="text-gold-500">Total</span>
                    <span className="text-gold-400">{total.toFixed(2)} DH</span>
                  </div>

                  {shipping > 0 && (
                    <p className="text-sm text-gray-400 mt-2">
                      Plus que {(50 - subtotal).toFixed(2)} DH pour bénéficier de la livraison gratuite
                    </p>
                  )}
                </div>

                <Link href="/checkout">
                  <Button className="w-full mt-6 bg-gold-500 text-black hover:bg-gold-400">
                    Confirmer la commande
                  </Button>
                </Link>
              </div>

              <div className="p-4 rounded-lg border border-gold-800 bg-black/50">
                <h3 className="font-semibold text-gold-500 mb-2">Méthodes de paiement acceptées</h3>
                <p className="text-sm text-gray-300">Carte bancaire, PayPal, Apple Pay</p>
              </div>

              <div className="p-4 rounded-lg border border-gold-800 bg-black/50">
                <h3 className="font-semibold text-gold-500 mb-2">Politique de livraison</h3>
                <p className="text-sm text-gray-300">
                  Livraison gratuite à partir de 50€ d'achat. Livraison en 2-3 jours ouvrés.
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
              <h3 className="text-lg font-medium text-gold-500">HEALTHY JOY </h3>
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
