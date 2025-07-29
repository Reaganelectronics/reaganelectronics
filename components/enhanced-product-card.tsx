"use client"

import Image from "next/image"
import type { Product } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { ColorSelector } from "@/components/color-selector"
import { ImageLightbox } from "@/components/image-lightbox"
import { useState } from "react"
import { Eye, ShoppingCart } from "lucide-react"

interface EnhancedProductCardProps {
  product: Product
  className?: string
}

export function EnhancedProductCard({ product, className = "" }: EnhancedProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "")
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleImageClick = () => {
    setIsLightboxOpen(true)
  }

  return (
    <>
      <div
        className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full group ${className}`}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="cursor-pointer h-full" onClick={handleImageClick}>
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className={`object-cover transition-all duration-700 ease-out group-hover:scale-110 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              quality={90}
            />

            {/* Loading skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full animate-bounce"></div>
              </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-semibold shadow-xl flex items-center gap-2 text-gray-800">
                  <Eye className="w-4 h-4" />
                  View Full Size
                </div>
              </div>
            </div>
          </div>

          {/* Discount badge */}
          <Badge className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-200">
            {product.discount}% OFF
          </Badge>

          {/* Stock indicator */}
          <div className="absolute top-4 left-4">
            <Badge
              variant={product.inStock ? "secondary" : "destructive"}
              className={`text-xs font-medium ${
                product.inStock
                  ? "bg-green-100 text-green-800 border-green-200"
                  : "bg-red-100 text-red-800 border-red-200"
              }`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Product name and category */}
          <div className="mb-3">
            <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-blue-600 font-medium">
              {product.category} {product.series && `• ${product.series}`}
            </p>
          </div>

          {/* Pricing */}
          <div className="mb-4">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-green-600">${product.discountedPrice.toFixed(2)}</span>
              <span className="text-lg text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              You save ${(product.originalPrice - product.discountedPrice).toFixed(2)}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">{product.description}</p>

          {/* Features preview */}
          {product.features && product.features.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {product.features.slice(0, 2).map((feature, index) => (
                  <Badge key={index} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                    {feature}
                  </Badge>
                ))}
                {product.features.length > 2 && (
                  <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600">
                    +{product.features.length - 2} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Color selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-4">
              <ColorSelector colors={product.colors} selectedColor={selectedColor} onColorChange={setSelectedColor} />
            </div>
          )}

          {/* Action buttons */}
          <div className="space-y-3 mt-auto">
            <AddToCartButton product={product} selectedColor={selectedColor} />
            <Button
              variant="outline"
              className="w-full bg-transparent hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-all duration-200"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Image Lightbox */}
      <ImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        imageSrc={product.image}
        imageAlt={product.name}
      />
    </>
  )
}
