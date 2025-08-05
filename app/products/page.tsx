"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Share2, Check } from "lucide-react"
import Image from "next/image"

export default function ProductsPage() {
  const [copiedLinks, setCopiedLinks] = useState<{ [key: string]: boolean }>({})
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side before rendering interactive elements
  useEffect(() => {
    setIsClient(true)
  }, [])

  const products = [
    {
      id: 1,
      title: "100 Daily Affirmations PDF",
      slug: "100-daily-affirmations",
      price: 2000, // ₦2,000
      type: "eBook",
      image: "/placeholder.svg?height=300&width=300&text=Daily+Affirmations",
      description: "Transform your mindset with powerful daily affirmations",
    },
    {
      id: 2,
      title: "Morning Motivation Audio Pack",
      slug: "morning-motivation-audio-pack",
      price: 3200, // ₦3,200
      type: "Audio",
      image: "/placeholder.svg?height=300&width=300&text=Morning+Audio",
      description: "Start your day right with energizing audio content",
    },
    {
      id: 3,
      title: "Success Mindset Toolkit",
      slug: "success-mindset-toolkit",
      price: 4800, // ₦4,800
      type: "Bundle",
      image: "/placeholder.svg?height=300&width=300&text=Success+Toolkit",
      description: "Complete toolkit for developing a winning mindset",
    },
    {
      id: 4,
      title: "Productivity Planner 2025",
      slug: "productivity-planner-2025",
      price: 2800, // ₦2,800
      type: "Planner",
      image: "/placeholder.svg?height=300&width=300&text=Productivity+Planner",
      description: "Plan your way to peak productivity this year",
    },
    {
      id: 5,
      title: "Confidence Building Guide",
      slug: "confidence-building-guide",
      price: 2400, // ₦2,400
      type: "eBook",
      image: "/placeholder.svg?height=300&width=300&text=Confidence+Guide",
      description: "Build unshakeable confidence in any situation",
    },
    {
      id: 6,
      title: "Meditation & Mindfulness Pack",
      slug: "meditation-mindfulness-pack",
      price: 4000, // ₦4,000
      type: "Audio",
      image: "/placeholder.svg?height=300&width=300&text=Meditation+Pack",
      description: "Find inner peace with guided meditation sessions",
    },
  ]

  const handleCopyLink = async (slug: string) => {
    if (!isClient) return

    try {
      const productUrl = `${window.location.origin}/p/${slug}`

      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(productUrl)
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement("textarea")
        textArea.value = productUrl
        textArea.style.position = "fixed"
        textArea.style.left = "-999999px"
        textArea.style.top = "-999999px"
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand("copy")
        document.body.removeChild(textArea)
      }

      setCopiedLinks((prev) => ({ ...prev, [slug]: true }))

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopiedLinks((prev) => ({ ...prev, [slug]: false }))
      }, 2000)
    } catch (err) {
      console.error("Failed to copy link:", err)
      // Still show success message even if copy failed
      setCopiedLinks((prev) => ({ ...prev, [slug]: true }))
      setTimeout(() => {
        setCopiedLinks((prev) => ({ ...prev, [slug]: false }))
      }, 2000)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Digital Products</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our collection of digital products designed to inspire, motivate, and transform your life.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <CardContent className="p-0">
                <div className="aspect-square bg-gray-50 overflow-hidden rounded-t-lg">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                    priority={product.id <= 3} // Prioritize first 3 images
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {product.type}
                    </Badge>
                    <span className="text-2xl font-bold text-black">{formatPrice(product.price)}</span>
                  </div>

                  <h3 className="text-xl font-semibold text-black mb-3">{product.title}</h3>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">{product.description}</p>

                  <div className="space-y-3">
                    <Link href={`/p/${product.slug}`} className="block">
                      <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">Buy Now</Button>
                    </Link>

                    {isClient && (
                      <Button
                        variant="outline"
                        onClick={() => handleCopyLink(product.slug)}
                        className="w-full bg-transparent"
                        type="button"
                      >
                        {copiedLinks[product.slug] ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Link Copied!
                          </>
                        ) : (
                          <>
                            <Share2 className="w-4 h-4 mr-2" />
                            Copy Link
                          </>
                        )}
                      </Button>
                    )}

                    {/* Fallback for server-side rendering */}
                    {!isClient && (
                      <Button variant="outline" className="w-full bg-transparent" disabled>
                        <Share2 className="w-4 h-4 mr-2" />
                        Copy Link
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
