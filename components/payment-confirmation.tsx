"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ConfirmationModal } from "@/components/confirmation-modal"

interface PaymentConfirmationProps {
  orderNumber: string
  amount: number
  paymentMethod: string
  onPaymentComplete: () => void
}

export function PaymentConfirmation({
  orderNumber,
  amount,
  paymentMethod,
  onPaymentComplete,
}: PaymentConfirmationProps) {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePaymentSubmit = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setShowConfirmation(true)
    }, 2000)
  }

  const handleConfirmationClose = () => {
    setShowConfirmation(false)
    onPaymentComplete()
  }

  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Complete Payment</h3>
        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span>Order:</span>
            <span className="font-medium">{orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span>Amount:</span>
            <span className="font-medium">${amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Method:</span>
            <span className="font-medium">{paymentMethod}</span>
          </div>
        </div>

        <Button onClick={handlePaymentSubmit} disabled={isProcessing} className="w-full">
          {isProcessing ? "Processing Payment..." : "Confirm Payment"}
        </Button>
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={handleConfirmationClose}
        type="payment"
        data={{
          orderNumber,
          amount,
          paymentMethod,
        }}
      />
    </>
  )
}
