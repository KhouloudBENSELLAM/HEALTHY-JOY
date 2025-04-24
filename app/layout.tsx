import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProviderWrapper } from "@/components/theme-provider-wrapper"
import { CartProvider } from "@/contexts/cart-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HEALTHY JOY - Chocolats Healthy",
  description: "Découvrez nos palettes de chocolat artisanales, saines et délicieuses.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body suppressHydrationWarning className={inter.className}>
        <ThemeProviderWrapper>
          <CartProvider>{children}</CartProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  )
}
