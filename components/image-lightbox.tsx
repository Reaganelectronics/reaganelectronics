"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageLightboxProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  imageAlt: string
  images?: Array<{ src: string; alt: string }>
  currentIndex?: number
}

export function ImageLightbox({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  images = [],
  currentIndex = 0,
}: ImageLightboxProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex)
  const hasMultipleImages = images.length > 1

  useEffect(() => {
    setCurrentImageIndex(currentIndex)
  }, [currentIndex])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return

      switch (event.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          if (hasMultipleImages) {
            setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
          }
          break
        case "ArrowRight":
          if (hasMultipleImages) {
            setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
          }
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, hasMultipleImages, images.length, onClose])

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

  const currentImage = hasMultipleImages ? images[currentImageIndex] : { src: imageSrc, alt: imageAlt }

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
  }

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4">
      {/* Close button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onClose}
        className="absolute top-6 right-6 z-10 text-white hover:bg-white/20 bg-black/30 backdrop-blur-sm rounded-full w-12 h-12"
      >
        <X className="h-6 w-6" />
      </Button>

      {/* Navigation buttons */}
      {hasMultipleImages && (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={goToPrevious}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 bg-black/30 backdrop-blur-sm rounded-full w-12 h-12"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={goToNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 bg-black/30 backdrop-blur-sm rounded-full w-12 h-12"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </>
      )}

      {/* Image container with enhanced styling */}
      <div className="relative max-w-[95vw] max-h-[90vh] flex items-center justify-center">
        <div className="relative bg-white rounded-lg p-2 shadow-2xl">
          <Image
            src={currentImage.src || "/placeholder.svg"}
            alt={currentImage.alt}
            width={1200}
            height={1200}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            priority
            quality={95}
          />
        </div>
      </div>

      {/* Enhanced image info */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium">
        {hasMultipleImages ? `${currentImageIndex + 1} / ${images.length}` : "Click outside to close"}
      </div>

      {/* Click outside to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose} aria-label="Close lightbox" />
    </div>
  )
}
