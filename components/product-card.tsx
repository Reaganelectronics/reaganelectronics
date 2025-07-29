"use client"

import Image from "next/image"
import type { Product } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { ColorSelector } from "@/components/color-selector"
import { ImageLightbox } from "@/components/image-lightbox"
import { useState } from "react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "")
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const handleImageClick = () => {
    setIsLightboxOpen(true)
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <div className="cursor-pointer group h-full" onClick={handleImageClick}>
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
              priority={false}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/95 px-4 py-2 rounded-full text-sm font-medium shadow-lg transform group-hover:scale-105">
                🔍 View Full Size
              </div>
            </div>
          </div>
          <Badge className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white font-bold shadow-lg">
            {product.discount}% OFF
          </Badge>
        </div>

        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <p className="text-sm text-blue-600 mb-2 font-medium">Reagan Midyear 80% discount electronics Auction</p>

          <div className="mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-green-600">${product.discountedPrice.toFixed(2)}</span>
              <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

          {/* Color selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-4">
              <ColorSelector colors={product.colors} selectedColor={selectedColor} onColorChange={setSelectedColor} />
            </div>
          )}

          <div className="space-y-2">
            <AddToCartButton product={product} selectedColor={selectedColor} />
            <Button variant="outline" className="w-full bg-transparent">
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      {/* Image Lightbox */}
      <ImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        imageSrc={product.image}
        imageAlt={product.name}
      />
    </>
  )
}
