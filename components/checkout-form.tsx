"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { ConfirmationModal } from "@/components/confirmation-modal"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, Smartphone, DollarSign, Building, Bitcoin, Banknote } from "lucide-react"

interface CheckoutFormProps {
  onClose: () => void
}

export function CheckoutForm({ onClose }: CheckoutFormProps) {
  const { state, dispatch } = useCart()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")

  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
  })

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  })

  const [shippingType, setShippingType] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")

  const shippingOptions = [
    { id: "standard", name: "Standard Shipping", time: "5-7 business days", price: 9.99 },
    { id: "express", name: "Express Shipping", time: "2-3 business days", price: 19.99 },
    { id: "overnight", name: "Overnight Shipping", time: "1 business day", price: 39.99 },
  ]

  const paymentMethods = [
    { id: "apple-pay", name: "Apple Pay", icon: Smartphone },
    { id: "paypal", name: "PayPal", icon: CreditCard },
    { id: "cashapp", name: "Cash App", icon: DollarSign },
    { id: "zelle", name: "Zelle", icon: Building },
    { id: "venmo", name: "Venmo", icon: CreditCard },
    { id: "chime", name: "Chime", icon: Building },
    { id: "bitcoin", name: "Bitcoin", icon: Bitcoin },
    { id: "bank-transfer", name: "Direct Bank Transfer", icon: Banknote },
  ]

  const selectedShipping = shippingOptions.find((option) => option.id === shippingType)
  const selectedPaymentMethod = paymentMethods.find((pm) => pm.id === paymentMethod)
  const shippingCost = selectedShipping?.price || 0
  const subtotal = state.total
  const totalAmount = subtotal + shippingCost

  const generateOrderNumber = () => {
    return `RGA-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  }

  const handleInputChange = (section: "customer" | "shipping", field: string, value: string) => {
    if (section === "customer") {
      setCustomerInfo((prev) => ({ ...prev, [field]: value }))
    } else {
      setShippingInfo((prev) => ({ ...prev, [field]: value }))
    }
  }

  const validateForm = () => {
    const requiredCustomerFields = ["firstName", "lastName", "email", "phone", "country"]
    const requiredShippingFields = ["address", "city", "state", "zipCode", "country"]

    for (const field of requiredCustomerFields) {
      if (!customerInfo[field as keyof typeof customerInfo]) {
        toast({
          title: "Missing customer information",
          description: `Please fill in your ${field.replace(/([A-Z])/g, " $1").toLowerCase()}.`,
          variant: "destructive",
        })
        return false
      }
    }

    for (const field of requiredShippingFields) {
      if (!shippingInfo[field as keyof typeof shippingInfo]) {
        toast({
          title: "Missing shipping information",
          description: `Please fill in the ${field.replace(/([A-Z])/g, " $1").toLowerCase()}.`,
          variant: "destructive",
        })
        return false
      }
    }

    if (!shippingType) {
      toast({
        title: "Select shipping method",
        description: "Please choose a shipping option.",
        variant: "destructive",
      })
      return false
    }

    if (!paymentMethod) {
      toast({
        title: "Select payment method",
        description: "Please choose a payment method.",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const newOrderNumber = generateOrderNumber()
      const orderData = {
        orderNumber: newOrderNumber,
        customerInfo,
        shippingInfo,
        shippingType: selectedShipping,
        paymentMethod: selectedPaymentMethod?.name,
        items: state.items,
        subtotal,
        shippingCost,
        totalAmount,
        timestamp: new Date().toISOString(),
      }

      const response = await fetch("/api/send-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      if (response.ok) {
        setOrderNumber(newOrderNumber)
        setShowConfirmation(true)
        dispatch({ type: "CLEAR_CART" })
      } else {
        throw new Error("Failed to submit order")
      }
    } catch (error) {
      toast({
        title: "Error submitting order",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleConfirmationClose = () => {
    setShowConfirmation(false)
    onClose()
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Checkout</h2>
          <p className="text-gray-600">Complete your order information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Customer Information */}
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={customerInfo.firstName}
                  onChange={(e) => handleInputChange("customer", "firstName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={customerInfo.lastName}
                  onChange={(e) => handleInputChange("customer", "lastName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => handleInputChange("customer", "email", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => handleInputChange("customer", "phone", e.target.value)}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="customerCountry">Country *</Label>
                <Input
                  id="customerCountry"
                  value={customerInfo.country}
                  onChange={(e) => handleInputChange("customer", "country", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  value={shippingInfo.address}
                  onChange={(e) => handleInputChange("shipping", "address", e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={shippingInfo.city}
                    onChange={(e) => handleInputChange("shipping", "city", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State/Province *</Label>
                  <Input
                    id="state"
                    value={shippingInfo.state}
                    onChange={(e) => handleInputChange("shipping", "state", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                  <Input
                    id="zipCode"
                    value={shippingInfo.zipCode}
                    onChange={(e) => handleInputChange("shipping", "zipCode", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="shippingCountry">Country *</Label>
                <Input
                  id="shippingCountry"
                  value={shippingInfo.country}
                  onChange={(e) => handleInputChange("shipping", "country", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Shipping Method */}
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Shipping Method</h3>
            <RadioGroup value={shippingType} onValueChange={setShippingType}>
              {shippingOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{option.name}</div>
                        <div className="text-sm text-gray-600">{option.time}</div>
                      </div>
                      <div className="font-semibold">${option.price.toFixed(2)}</div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon
                  return (
                    <div key={method.id} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Label htmlFor={method.id} className="flex items-center space-x-2 cursor-pointer flex-1">
                        <Icon className="h-5 w-5 text-gray-600" />
                        <span>{method.name}</span>
                      </Label>
                    </div>
                  )
                })}
              </div>
            </RadioGroup>
            <p className="text-sm text-gray-600 mt-3">
              Payment will be processed manually after order confirmation. We'll contact you with payment instructions.
            </p>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-3">
              {state.items.map((item) => (
                <div key={`${item.id}-${item.selectedColor}`} className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    {item.selectedColor && <span className="text-sm text-gray-600"> - {item.selectedColor}</span>}
                    <span className="text-sm text-gray-600"> × {item.quantity}</span>
                  </div>
                  <span>${(item.discountedPrice * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={isSubmitting} className="w-full py-3 text-lg">
            {isSubmitting ? "Processing Order..." : `Place Order - $${totalAmount.toFixed(2)}`}
          </Button>
        </form>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={handleConfirmationClose}
        type="order"
        data={{
          orderNumber,
          amount: totalAmount,
          paymentMethod: selectedPaymentMethod?.name,
        }}
      />
    </>
  )
}
