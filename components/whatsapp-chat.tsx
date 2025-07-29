"use client"

import { MessageCircle } from "lucide-react"

export function WhatsAppChat() {
  const phoneNumber = "+19092619453"
  const message = "Hi! I'm interested in your electronics auction. Can you help me?"

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber.replace(/[^\d]/g, "")}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <button onClick={handleWhatsAppClick} className="whatsapp-float" aria-label="Chat on WhatsApp">
      <MessageCircle className="h-6 w-6" />
    </button>
  )
}
