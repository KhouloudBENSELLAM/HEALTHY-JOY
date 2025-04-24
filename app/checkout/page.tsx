"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/contexts/cart-context"
import { CartIcon } from "@/components/cart-icon"

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "France",
    paymentMethod: "card",
  })

  // Mock cart items - in a real app, this would come from a cart context or API
  const { cartItems, subtotal, shipping, total, clearCart } = useCart()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate form
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.postalCode
    ) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    try {
      // Generate a random invoice number
      const invoiceNumber = `INV-${Math.floor(100000 + Math.random() * 900000)}`

      // Préparer les données de la commande
      const orderData = {
        ...formData,
        invoiceNumber,
        total: Number.parseFloat(total.toFixed(2)),
        subtotal: Number.parseFloat(subtotal.toFixed(2)),
        shipping: Number.parseFloat(shipping.toFixed(2)),
        items: cartItems,
        status: formData.paymentMethod === "cash" ? "pending" : "paid",
      }

      // Envoyer les données à l'API
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message || "Erreur lors de l'enregistrement de la commande")
      }

      // Vider le panier après une commande réussie
      clearCart()

      // Rediriger vers la page de confirmation
      router.push(
        `/confirmation?total=${total.toFixed(2)}&invoice=${invoiceNumber}&name=${formData.firstName} ${
          formData.lastName
        }&paymentMethod=${formData.paymentMethod}&orderId=${result.orderId}`,
      )
    } catch (error) {
      console.error("Erreur lors de la soumission de la commande:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la soumission de votre commande. Veuillez réessayer.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
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

      <main className="flex-1 py-8 bg-gradient-to-b from-black to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="mb-6">
            <Link href="/panier" className="inline-flex items-center text-gold-500 hover:text-gold-400">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au panier
            </Link>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gold-500 mb-8">Finaliser votre commande</h1>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="p-6 rounded-lg border border-gold-800 bg-black/50">
                  <h2 className="text-xl font-bold text-gold-500 mb-4">Informations personnelles</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-gold-500">
                        Prénom *
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="bg-black border-gold-800 text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-gold-500">
                        Nom *
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="bg-black border-gold-800 text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gold-500">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-black border-gold-800 text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gold-500">
                        Téléphone *
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-black border-gold-800 text-white"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-lg border border-gold-800 bg-black/50">
                  <h2 className="text-xl font-bold text-gold-500 mb-4">Adresse de livraison</h2>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-gold-500">
                        Adresse *
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="bg-black border-gold-800 text-white"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-gold-500">
                          Ville *
                        </Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="bg-black border-gold-800 text-white"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode" className="text-gold-500">
                          Code postal *
                        </Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="bg-black border-gold-800 text-white"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country" className="text-gold-500">
                        Pays *
                      </Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="bg-black border-gold-800 text-white"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-lg border border-gold-800 bg-black/50">
                  <h2 className="text-xl font-bold text-gold-500 mb-4">Méthode de paiement</h2>
                  <RadioGroup
                    defaultValue="card"
                    name="paymentMethod"
                    className="space-y-3"
                    onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                  >
                    <div className="flex items-center space-x-2 rounded-md border border-gold-800 p-3">
                      <RadioGroupItem value="card" id="card" className="text-gold-500" />
                      <Label htmlFor="card" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-gold-500" />
                        <span>Carte bancaire</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border border-gold-800 p-3">
                      <RadioGroupItem value="paypal" id="paypal" className="text-gold-500" />
                      <Label htmlFor="paypal">PayPal</Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border border-gold-800 p-3">
                      <RadioGroupItem value="cash" id="cash" className="text-gold-500" />
                      <Label htmlFor="cash" className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-gold-500"
                        >
                          <rect width="20" height="12" x="2" y="6" rx="2" />
                          <circle cx="12" cy="12" r="2" />
                          <path d="M6 12h.01M18 12h.01" />
                        </svg>
                        <span>Paiement à la livraison</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gold-500 text-black hover:bg-gold-400"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Traitement en cours..." : "Confirmer la commande"}
                </Button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-lg border border-gold-800 bg-black/50 sticky top-24">
                <h2 className="text-xl font-bold text-gold-500 mb-4">Résumé de la commande</h2>

                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-300">
                        {item.name} <span className="text-gold-500">x{item.quantity}</span>
                      </span>
                      <span className="text-gold-500">{(item.price * item.quantity).toFixed(2)} DH</span>
                    </div>
                  ))}

                  <Separator className="my-2 bg-gold-900" />

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Sous-total</span>
                    <span className="text-gold-500">{subtotal.toFixed(2)} DH</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Frais de livraison</span>
                    <span className="text-gold-500">{shipping === 0 ? "Gratuit" : `${shipping.toFixed(2)} DH`}</span>
                  </div>

                  <Separator className="my-2 bg-gold-900" />

                  <div className="flex justify-between font-bold">
                    <span className="text-gold-500">Total</span>
                    <span className="text-gold-400">{total.toFixed(2)} DH</span>
                  </div>
                </div>
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
