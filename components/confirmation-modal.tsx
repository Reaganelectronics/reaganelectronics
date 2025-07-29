"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, Mail, CreditCard, X } from "lucide-react"

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  type: "contact" | "payment" | "order"
  data?: {
    name?: string
    email?: string
    orderNumber?: string
    amount?: number
    paymentMethod?: string
  }
}

export function ConfirmationModal({ isOpen, onClose, type, data }: ConfirmationModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  const getModalContent = () => {
    switch (type) {
      case "contact":
        return {
          icon: <Mail className="h-16 w-16 text-blue-600" />,
          title: "Message Sent Successfully!",
          subtitle: "Thank you for contacting us",
          message: `Hi ${data?.name || "there"}! We've received your message and will get back to you within 24 hours.`,
          details: [`Email: ${data?.email}`, "Response time: Within 24 hours", "Check your email for confirmation"],
          actionText: "Continue Browsing",
        }

      case "payment":
        return {
          icon: <CreditCard className="h-16 w-16 text-green-600" />,
          title: "Payment Processed!",
          subtitle: "Your payment has been confirmed",
          message: `Payment of $${data?.amount?.toFixed(2)} via ${data?.paymentMethod} has been successfully processed.`,
          details: [
            `Amount: $${data?.amount?.toFixed(2)}`,
            `Method: ${data?.paymentMethod}`,
            "Confirmation email sent",
            "Your order will be shipped soon",
          ],
          actionText: "Track Order",
        }

      case "order":
        return {
          icon: <CheckCircle className="h-16 w-16 text-green-600" />,
          title: "Order Placed Successfully!",
          subtitle: "We're processing your order",
          message: `Your order #${data?.orderNumber} has been received and is being processed.`,
          details: [
            `Order #: ${data?.orderNumber}`,
            `Total: $${data?.amount?.toFixed(2)}`,
            "Confirmation email sent",
            "We'll contact you for payment details",
          ],
          actionText: "Continue Shopping",
        }

      default:
        return {
          icon: <CheckCircle className="h-16 w-16 text-green-600" />,
          title: "Success!",
          subtitle: "Action completed successfully",
          message: "Your request has been processed.",
          details: [],
          actionText: "Continue",
        }
    }
  }

  const content = getModalContent()

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 relative animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Close button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Content */}
        <div className="p-8 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">{content.icon}</div>

          {/* Title and subtitle */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{content.title}</h2>
          <p className="text-lg text-gray-600 mb-6">{content.subtitle}</p>

          {/* Message */}
          <p className="text-gray-700 mb-6 leading-relaxed">{content.message}</p>

          {/* Details */}
          {content.details.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h4 className="font-semibold text-gray-900 mb-3">Details:</h4>
              <ul className="space-y-2">
                {content.details.map((detail, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action buttons */}
          <div className="space-y-3">
            <Button onClick={onClose} className="w-full">
              {content.actionText}
            </Button>

            {type === "contact" && (
              <Button variant="outline" onClick={() => (window.location.href = "/shop")} className="w-full">
                Browse Products
              </Button>
            )}

            {type === "order" && (
              <Button variant="outline" onClick={() => (window.location.href = "/shop")} className="w-full">
                Continue Shopping
              </Button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 rounded-b-lg">
          <p className="text-xs text-gray-500 text-center">
            {type === "contact" && "Need immediate assistance? Contact us via WhatsApp: +1 (909) 261‑9453"}
            {type === "payment" && "Questions about your payment? Contact us at rdiscountelectronic@gmail.com"}
            {type === "order" && "Questions about your order? We're here to help 24/7"}
          </p>
        </div>
      </div>
    </div>
  )
}
