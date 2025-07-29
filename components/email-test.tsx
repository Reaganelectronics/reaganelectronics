"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Mail, CheckCircle, XCircle } from "lucide-react"

export function EmailTest() {
  const [isTestingOrder, setIsTestingOrder] = useState(false)
  const [isTestingContact, setIsTestingContact] = useState(false)
  const { toast } = useToast()

  const testOrderEmail = async () => {
    setIsTestingOrder(true)
    try {
      const testOrderData = {
        orderNumber: "TEST-" + Date.now(),
        customerInfo: {
          firstName: "Test",
          lastName: "Customer",
          email: "test@example.com",
          phone: "+1234567890",
          country: "USA",
        },
        shippingInfo: {
          address: "123 Test Street",
          city: "Test City",
          state: "Test State",
          zipCode: "12345",
          country: "USA",
        },
        shippingType: {
          name: "Standard Shipping",
          time: "5-7 business days",
          price: 9.99,
        },
        paymentMethod: "Test Payment",
        items: [
          {
            id: "test-item",
            name: "Test iPhone 15",
            category: "iPhone",
            selectedColor: "Blue",
            quantity: 1,
            originalPrice: 999,
            discountedPrice: 599,
            discount: 40,
            description: "Test product description",
            features: ["Test Feature 1", "Test Feature 2"],
            colors: ["Blue", "Black", "White"],
            inStock: true,
            image: "/images/iphone-15.jpg",
          },
        ],
        subtotal: 599,
        shippingCost: 9.99,
        totalAmount: 608.99,
        timestamp: new Date().toISOString(),
      }

      const response = await fetch("/api/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testOrderData),
      })

      if (response.ok) {
        toast({
          title: "Order email test successful!",
          description: "Check your email inbox for the test order.",
        })
      } else {
        const error = await response.json()
        throw new Error(error.error || "Failed to send test order email")
      }
    } catch (error) {
      toast({
        title: "Order email test failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsTestingOrder(false)
    }
  }

  const testContactEmail = async () => {
    setIsTestingContact(true)
    try {
      const response = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Test User",
          email: "test@example.com",
          message: "This is a test message to verify the contact form email functionality is working properly.",
        }),
      })

      if (response.ok) {
        toast({
          title: "Contact email test successful!",
          description: "Check your email inbox for the test contact message.",
        })
      } else {
        const error = await response.json()
        throw new Error(error.error || "Failed to send test contact email")
      }
    } catch (error) {
      toast({
        title: "Contact email test failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsTestingContact(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Email Functionality Test</h3>
        <p className="text-sm text-gray-600">Test both order and contact email systems</p>
      </div>

      <div className="space-y-4">
        <Button onClick={testOrderEmail} disabled={isTestingOrder} className="w-full bg-transparent" variant="outline">
          {isTestingOrder ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              Testing Order Email...
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Test Order Email
            </>
          )}
        </Button>

        <Button
          onClick={testContactEmail}
          disabled={isTestingContact}
          className="w-full bg-transparent"
          variant="outline"
        >
          {isTestingContact ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              Testing Contact Email...
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Test Contact Email
            </>
          )}
        </Button>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <div className="flex items-start">
          <XCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
          <div className="text-sm text-yellow-800">
            <p className="font-medium mb-1">Setup Required:</p>
            <p>Make sure your RESEND_API_KEY is configured in your environment variables.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
