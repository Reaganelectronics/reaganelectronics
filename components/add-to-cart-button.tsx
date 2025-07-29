"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import type { Product } from "@/lib/products"
import { useToast } from "@/hooks/use-toast"

interface AddToCartButtonProps {
  product: Product
  selectedColor?: string
}

export function AddToCartButton({ product, selectedColor }: AddToCartButtonProps) {
  const { dispatch } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    const productWithColor = {
      ...product,
      selectedColor: selectedColor || product.colors?.[0] || "",
      // Create unique ID for color variants
      id: selectedColor ? `${product.id}-${selectedColor.toLowerCase().replace(/\s+/g, "-")}` : product.id,
    }

    dispatch({ type: "ADD_ITEM", payload: productWithColor })
    toast({
      title: "Added to cart",
      description: `${product.name}${selectedColor ? ` in ${selectedColor}` : ""} has been added to your cart.`,
    })
  }

  return (
    <Button onClick={handleAddToCart} className="w-full">
      Add to Cart
    </Button>
  )
}
