"use client"

import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  const handleClick = () => {
    // Replace with your actual WhatsApp number (international format without + or spaces)
    const phoneNumber = "+201150148000"
    const whatsappUrl = `https://wa.me/${phoneNumber}`
    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/90 dark:bg-accent/90 hover:bg-primary dark:hover:bg-accent text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 md:w-8 md:h-8 group-hover:scale-110 transition-transform" />
    </button>
  )
}
