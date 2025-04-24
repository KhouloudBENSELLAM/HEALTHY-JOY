"use client"

import Link from "next/link"
import { ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"

export function CartIcon() {
  const { cartItems } = useCart()

  // Calculer le nombre total d'articles dans le panier
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0)

  return (
    <Link href="/panier">
      <Button
        variant="outline"
        size="icon"
        className="rounded-full border-gold-500 text-gold-500 hover:bg-gold-950 hover:text-gold-400 relative"
      >
        <ShoppingBag className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-gold-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
        <span className="sr-only">Panier</span>
      </Button>
    </Link>
  )
}
