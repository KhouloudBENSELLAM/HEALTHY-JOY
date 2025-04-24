"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Download, LogOut } from 'lucide-react'
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CartIcon } from "@/components/cart-icon"

export default function AdminPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { data: session } = useSession()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders")
        const data = await response.json()

        if (data.orders) {
          setOrders(data.orders)
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des commandes:", err)
        setError("Impossible de charger les commandes. Veuillez réessayer plus tard.")
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const downloadExcel = async () => {
    try {
      window.open("/api/orders/excel", "_blank")
    } catch (err) {
      console.error("Erreur lors du téléchargement du fichier Excel:", err)
      setError("Impossible de télécharger le fichier Excel. Veuillez réessayer plus tard.")
    }
  }

  // Fonction pour formater le statut
  const formatStatus = (status) => {
    switch (status) {
      case "pending":
        return "En attente de paiement"
      case "paid":
        return "Payé"
      case "shipped":
        return "Expédié"
      case "delivered":
        return "Livré"
      case "cancelled":
        return "Annulé"
      default:
        return status
    }
  }

  // Fonction pour obtenir la classe CSS du statut
  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-900/30 text-amber-500"
      case "paid":
        return "bg-green-900/30 text-green-500"
      case "shipped":
        return "bg-blue-900/30 text-blue-500"
      case "delivered":
        return "bg-teal-900/30 text-teal-500"
      case "cancelled":
        return "bg-red-900/30 text-red-500"
      default:
        return "bg-gray-900/30 text-gray-500"
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-black">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-gold-500">CACAO LUXE</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-gold-500">Bonjour, {session?.user?.name}</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => signOut({ callbackUrl: "/" })}
              className="border-gold-500 text-gold-500"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8 bg-gradient-to-b from-black to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gold-500">Administration</h1>
              <p className="text-gray-300 mt-1">Gestion des commandes</p>
            </div>
            <Button onClick={downloadExcel} className="mt-4 md:mt-0 bg-gold-500 text-black hover:bg-gold-400">
              <Download className="mr-2 h-4 w-4" />
              Télécharger Excel
            </Button>
          </div>

          <div className="grid gap-6">
            <Card className="border-gold-800 bg-black/50">
              <CardHeader>
                <CardTitle className="text-gold-500">Commandes récentes</CardTitle>
                <CardDescription className="text-gray-300">
                  Liste de toutes les commandes passées sur le site
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <p className="text-gold-500">Chargement des commandes...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-8">
                    <p className="text-red-500">{error}</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-300">Aucune commande n'a été passée pour le moment.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-gold-500">ID</TableHead>
                          <TableHead className="text-gold-500">N° Facture</TableHead>
                          <TableHead className="text-gold-500">Date</TableHead>
                          <TableHead className="text-gold-500">Client</TableHead>
                          <TableHead className="text-gold-500">Total</TableHead>
                          <TableHead className="text-gold-500">Paiement</TableHead>
                          <TableHead className="text-gold-500">Statut</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order._id}>
                            <TableCell className="font-medium text-gold-500">
                              {order._id.toString().substring(0, 8)}...
                            </TableCell>
                            <TableCell>{order.invoiceNumber}</TableCell>
                            <TableCell>{new Date(order.createdAt).toLocaleDateString("fr-FR")}</TableCell>
                            <TableCell>{`${order.firstName} ${order.lastName}`}</TableCell>
                            <TableCell>{`${order.total} €`}</TableCell>
                            <TableCell>
                              {order.paymentMethod === "cash"
                                ? "À la livraison"
                                : order.paymentMethod === "card"
                                  ? "Carte bancaire"
                                  : "PayPal"}
                            </TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(order.status)}`}>
                                {formatStatus(order.status)}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
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
                <li className="text-sm text-gray-400">khouloudbensellam78@gamil.com</li>
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
