"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Check, Home } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CartIcon } from "@/components/cart-icon"

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const total = searchParams.get("total") || "0.00"
  const invoice = searchParams.get("invoice") || "INV-000000"
  const name = searchParams.get("name") || "Client"

  const date = new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

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
        <div className="container px-4 md:px-6 max-w-3xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <div className="h-24 w-24 rounded-full bg-gold-500 flex items-center justify-center mb-6">
              <Check className="h-12 w-12 text-black" />
            </div>
            <h1 className="text-3xl font-bold text-gold-500 mb-2">Commande Confirmée</h1>
            <p className="text-gray-300 max-w-md">
              Merci pour votre commande, {name}! Votre commande a été confirmée et sera expédiée dans les plus brefs
              délais.
            </p>
          </div>

          <div className="p-6 md:p-8 rounded-lg border border-gold-800 bg-black/50 mb-8">
            <div className="flex flex-col md:flex-row justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gold-500">Détails de la commande</h2>
                <p className="text-gray-300 text-sm mt-1">Date: {date}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <p className="text-gold-500 font-bold">Numéro de facture:</p>
                <p className="text-gray-300">{invoice}</p>
              </div>
            </div>

            <Separator className="my-6 bg-gold-900" />

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-300">Total</span>
                <span className="text-gold-500 font-bold">{total} €</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Statut du paiement</span>
                {searchParams.get("paymentMethod") === "cash" ? (
                  <span className="text-amber-500">À payer à la livraison</span>
                ) : (
                  <span className="text-green-500">Payé</span>
                )}
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Méthode de livraison</span>
                <span className="text-gold-500">Livraison standard</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Délai de livraison estimé</span>
                <span className="text-gold-500">2-3 jours ouvrés</span>
              </div>
            </div>

            <Separator className="my-6 bg-gold-900" />

            <div className="text-sm text-gray-300">
              <p>
                Un email de confirmation a été envoyé à votre adresse email. Si vous avez des questions concernant votre
                commande, n'hésitez pas à nous contacter.
              </p>
            </div>
          </div>

          {searchParams.get("paymentMethod") === "cash" && (
            <div className="mt-6 p-4 border border-gold-800 rounded-lg bg-black/50">
              <h3 className="text-lg font-semibold text-gold-500 mb-2">Instructions pour le paiement à la livraison</h3>
              <p className="text-sm text-gray-300">
                Veuillez préparer le montant exact de {total} DH en espèces pour le livreur. Les chèques ne sont pas
                acceptés.
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="w-full bg-gold-500 text-black hover:bg-gold-400">
                <Home className="mr-2 h-4 w-4" />
                Retour à l'accueil
              </Button>
            </Link>
            <Link href="/produits">
              <Button
                variant="outline"
                className="w-full border-gold-500 text-gold-500 hover:bg-gold-950 hover:text-gold-400"
              >
                Continuer mes achats
              </Button>
            </Link>
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
