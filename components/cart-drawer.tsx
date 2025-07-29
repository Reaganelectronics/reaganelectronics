"use client"

import { X, Plus, Minus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import Image from "next/image"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { CheckoutForm } from "@/components/checkout-form"

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { state, dispatch } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Add state for checkout form
  const [showCheckout, setShowCheckout] = useState(false)
  const [checkoutSuccess, setCheckoutSuccess] = useState(false)

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  // Replace the handleCheckout function with:
  const handleCheckout = () => {
    if (state.items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      })
      return
    }
    setShowCheckout(true)
  }

  if (!isOpen) return null

  // Update the return statement to include checkout form:
  if (showCheckout) {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden bg-white">
        <div className="h-full overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b">
            <Button variant="ghost" size="sm" onClick={() => setShowCheckout(false)}>
              ← Back to Cart
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <CheckoutForm
            onClose={(success) => {
              if (success) {
                setCheckoutSuccess(true)
                setTimeout(() => {
                  setShowCheckout(false)
                  onClose()
                  setCheckoutSuccess(false)
                }, 2000)
              } else {
                setShowCheckout(false)
                onClose()
              }
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {state.items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 border-b pb-4">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-md object-cover"
                    />

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium truncate">{item.name}</h3>
                      <p className="text-sm text-gray-500">${item.discountedPrice.toFixed(2)}</p>

                      <div className="flex items-center space-x-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-6 w-6 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>

                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-6 w-6 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="text-sm font-medium">${(item.discountedPrice * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>${state.total.toFixed(2)}</span>
              </div>

              <Button onClick={handleCheckout} disabled={isSubmitting} className="w-full">
                Checkout
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Orders are processed manually. We'll contact you for payment details.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
