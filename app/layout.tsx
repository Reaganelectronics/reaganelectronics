import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/components/cart-provider"
import { AuthProvider } from "@/components/auth-provider"
import { ErrorBoundary } from "@/components/error-boundary"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Reagan Midyear 80% Discount Electronics Auction",
  description:
    "Premium electronics at unbeatable prices - iPhones, AirPods, VR devices, and iPads with up to 80% discount",
  keywords: "iPhone, AirPods, VR, iPad, electronics, discount, auction, Reagan Electronics",
  authors: [{ name: "Reagan Electronics" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Reagan Midyear 80% Discount Electronics Auction",
    description: "Premium electronics at unbeatable prices - up to 80% off authentic products",
    type: "website",
    locale: "en_US",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <AuthProvider>
            <CartProvider>
              {children}
              <Toaster />
            </CartProvider>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
