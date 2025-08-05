"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Share2, Check, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"

// Mock product data - in real app, this would come from database
const getProductBySlug = (slug: string) => {
  const products = {
    "100-daily-affirmations": {
      id: 1,
      title: "100 Daily Affirmations PDF",
      slug: "100-daily-affirmations",
      price: 2000, // ₦2,000
      type: "eBook",
      image: "/placeholder.svg?height=400&width=400&text=Daily+Affirmations",
      description:
        "Transform your mindset with 100 powerful daily affirmations designed to boost confidence, attract success, and create positive change in your life. This comprehensive PDF includes morning and evening affirmations, plus guidance on how to use them effectively.",
      features: [
        "100 carefully crafted affirmations",
        "Morning and evening routines",
        "Printable format for easy access",
        "Bonus meditation guide included",
      ],
      downloadUrl: "/sample-files/daily-affirmations.pdf",
    },
    "morning-motivation-audio-pack": {
      id: 2,
      title: "Morning Motivation Audio Pack",
      slug: "morning-motivation-audio-pack",
      price: 3200, // ₦3,200
      type: "Audio",
      image: "/placeholder.svg?height=400&width=400&text=Morning+Audio",
      description:
        "Start every day with purpose and energy. This audio pack contains 10 powerful morning motivation sessions to kickstart your day with positivity and drive.",
      features: [
        "10 high-quality audio sessions",
        "5-15 minute episodes",
        "MP3 format for all devices",
        "Bonus wake-up meditation",
      ],
      downloadUrl: "/sample-files/morning-motivation.zip",
    },
    "success-mindset-toolkit": {
      id: 3,
      title: "Success Mindset Toolkit",
      slug: "success-mindset-toolkit",
      price: 4800, // ₦4,800
      type: "Bundle",
      image: "/placeholder.svg?height=400&width=400&text=Success+Toolkit",
      description:
        "Complete toolkit for developing a winning mindset. Includes worksheets, audio guides, and actionable strategies.",
      features: [
        "5 comprehensive worksheets",
        "3 guided audio sessions",
        "Goal-setting templates",
        "Progress tracking tools",
      ],
      downloadUrl: "/sample-files/success-toolkit.zip",
    },
    "productivity-planner-2025": {
      id: 4,
      title: "Productivity Planner 2025",
      slug: "productivity-planner-2025",
      price: 2800, // ₦2,800
      type: "Planner",
      image: "/placeholder.svg?height=400&width=400&text=Productivity+Planner",
      description: "Plan your way to peak productivity this year with this comprehensive digital planner.",
      features: [
        "12-month planning pages",
        "Weekly and daily layouts",
        "Goal tracking sections",
        "Habit tracker included",
      ],
      downloadUrl: "/sample-files/productivity-planner.pdf",
    },
    "confidence-building-guide": {
      id: 5,
      title: "Confidence Building Guide",
      slug: "confidence-building-guide",
      price: 2400, // ₦2,400
      type: "eBook",
      image: "/placeholder.svg?height=400&width=400&text=Confidence+Guide",
      description: "Build unshakeable confidence in any situation with proven strategies and exercises.",
      features: [
        "Step-by-step confidence building",
        "Practical exercises",
        "Real-world applications",
        "Bonus confidence affirmations",
      ],
      downloadUrl: "/sample-files/confidence-guide.pdf",
    },
    "meditation-mindfulness-pack": {
      id: 6,
      title: "Meditation & Mindfulness Pack",
      slug: "meditation-mindfulness-pack",
      price: 4000, // ₦4,000
      type: "Audio",
      image: "/placeholder.svg?height=400&width=400&text=Meditation+Pack",
      description:
        "Find inner peace with guided meditation sessions designed for beginners and experienced practitioners.",
      features: [
        "8 guided meditation sessions",
        "Beginner to advanced levels",
        "Stress relief techniques",
        "Mindfulness exercises",
      ],
      downloadUrl: "/sample-files/meditation-pack.zip",
    },
  }

  return products[slug as keyof typeof products] || null
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [linkCopied, setLinkCopied] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const { user } = useAuth()
  const product = getProductBySlug(params.slug)

  // Ensure we're on the client side before rendering interactive elements
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link href="/products">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">Browse All Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleCopyLink = async () => {
    if (!isClient) return

    try {
      const productUrl = `${window.location.origin}/p/${product.slug}`

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

      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy link:", err)
      // Still show success message even if copy failed
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    }
  }

  const handleBuyNow = () => {
    if (!user) {
      alert("Please sign in to make a purchase")
      window.location.href = "/login"
      return
    }
    window.location.href = `/checkout?product=${product.slug}`
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                width={400}
                height={400}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">
                {product.type}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">{product.title}</h1>
              <p className="text-3xl font-bold text-emerald-600 mb-6">{formatPrice(product.price)}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-black mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-black mb-3">What's Included</h2>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 pt-6">
              <Button
                onClick={handleBuyNow}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-lg py-3"
                type="button"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Buy Now - {formatPrice(product.price)}
              </Button>

              {isClient && (
                <Button variant="outline" onClick={handleCopyLink} className="w-full bg-transparent" type="button">
                  {linkCopied ? (
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

            {!user && (
              <div className="bg-amber-50 p-4 rounded-lg">
                <p className="text-sm text-amber-800">
                  <strong>Sign in required:</strong> Please{" "}
                  <Link href="/login" className="underline hover:text-amber-900">
                    sign in
                  </Link>{" "}
                  or{" "}
                  <Link href="/signup" className="underline hover:text-amber-900">
                    create an account
                  </Link>{" "}
                  to make a purchase.
                </p>
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Instant Download:</strong> Get immediate access to your digital product after purchase. All
                files are delivered via email and available in your account dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
