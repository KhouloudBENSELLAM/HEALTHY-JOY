"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Types
export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

type CartContextType = {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  subtotal: number
  shipping: number
  total: number
}

// Créer le contexte
const CartContext = createContext<CartContextType | undefined>(undefined)

// Hook personnalisé pour utiliser le contexte
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart doit être utilisé à l'intérieur d'un CartProvider")
  }
  return context
}

// Provider du contexte
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Charger le panier depuis localStorage au chargement de la page
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Erreur lors du chargement du panier:", error)
        localStorage.removeItem("cart")
      }
    }
  }, [])

  // Sauvegarder le panier dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  // Calculer les totaux
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 4.99
  const total = subtotal + shipping

  // Ajouter un produit au panier
  const addToCart = (newItem: CartItem) => {
    setCartItems((prevItems) => {
      // Vérifier si le produit est déjà dans le panier
      const existingItemIndex = prevItems.findIndex((item) => item.id === newItem.id)

      if (existingItemIndex >= 0) {
        // Si le produit existe déjà, augmenter la quantité
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += newItem.quantity
        return updatedItems
      } else {
        // Sinon, ajouter le nouveau produit
        return [...prevItems, newItem]
      }
    })
  }

  // Supprimer un produit du panier
  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  // Mettre à jour la quantité d'un produit
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return

    setCartItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  // Vider le panier
  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        shipping,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
