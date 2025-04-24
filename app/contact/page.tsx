"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Phone, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { CartIcon } from "@/components/cart-icon"

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

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
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Simulate form submission
    try {
      // In a real application, you would send the form data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Message envoyé",
        description: "Nous vous répondrons dans les plus brefs délais.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
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
            <Link href="/contact" className="text-sm font-medium text-gold-500 hover:text-gold-400 underline">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <CartIcon />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/History2.jpg"
            alt="Background pattern"
            width={1080}
            height={1920}
            className="object-cover"
            priority
          />
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gold-500">
                Contactez-nous
              </h1>
              <p className="max-w-[700px] text-gray-300 md:text-xl mx-auto">
                Une question, une suggestion ou une demande spéciale ? N'hésitez pas à nous contacter, nous serons ravis
                de vous répondre.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="w-full py-12 bg-gradient-to-b from-black to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gold-500">Envoyez-nous un message</h2>
                <p className="text-gray-300">
                  Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gold-500">
                    Nom complet *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
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
                  <Label htmlFor="subject" className="text-gold-500">
                    Sujet
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="bg-black border-gold-800 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gold-500">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="min-h-[150px] bg-black border-gold-800 text-white"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gold-500 text-black hover:bg-gold-400"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Envoi en cours..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Envoyer le message
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gold-500">Informations de contact</h2>
                <p className="text-gray-300">
                  Vous préférez nous contacter directement ? Voici toutes nos coordonnées.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-full bg-gold-500 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gold-500">Adresse</h3>
                    <p className="text-gray-300 mt-1">
                     
                      90000 Tanger, Maroc
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-full bg-gold-500 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gold-500">Téléphone</h3>
                    <p className="text-gray-300 mt-1">+212 648 68 78 64</p>
                    <p className="text-gray-400 text-sm">Du lundi au vendredi, 9h-18h</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-full bg-gold-500 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gold-500">Email</h3>
                    <p className="text-gray-300 mt-1">khouloudbensellam78@gmail.com</p>
                    <p className="text-gray-400 text-sm">Nous répondons sous 24h</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-lg border border-gold-800 bg-black/50 mt-8">
                <h3 className="font-semibold text-gold-500 mb-4">Horaires d'ouverture</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Lundi - Vendredi</span>
                    <span className="text-gold-400">9h - 18h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Samedi</span>
                    <span className="text-gold-400">10h - 16h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Dimanche</span>
                    <span className="text-gold-400">Fermé</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full py-12 bg-black">
        <div className="container px-4 md:px-6">
          <div className="space-y-4 text-center mb-8">
            <h2 className="text-2xl font-bold text-gold-500">Nous trouver</h2>
            <p className="text-gray-300 max-w-[700px] mx-auto">
              Venez nous rendre visite dans notre boutique au cœur de Tnager pour découvrir et déguster nos chocolats.
            </p>
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
