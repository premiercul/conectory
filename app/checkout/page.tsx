"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Lock, CheckCircle, Download, AlertCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"

// Mock product data
const getProductBySlug = (slug: string) => {
  const products = {
    "100-daily-affirmations": {
      title: "100 Daily Affirmations PDF",
      price: 2000,
      type: "eBook",
      downloadUrl: "/sample-files/daily-affirmations.pdf",
    },
    "morning-motivation-audio-pack": {
      title: "Morning Motivation Audio Pack",
      price: 3200,
      type: "Audio",
      downloadUrl: "/sample-files/morning-motivation.zip",
    },
    "success-mindset-toolkit": {
      title: "Success Mindset Toolkit",
      price: 4800,
      type: "Bundle",
      downloadUrl: "/sample-files/success-toolkit.zip",
    },
    "productivity-planner-2025": {
      title: "Productivity Planner 2025",
      price: 2800,
      type: "Planner",
      downloadUrl: "/sample-files/productivity-planner.pdf",
    },
    "confidence-building-guide": {
      title: "Confidence Building Guide",
      price: 2400,
      type: "eBook",
      downloadUrl: "/sample-files/confidence-guide.pdf",
    },
    "meditation-mindfulness-pack": {
      title: "Meditation & Mindfulness Pack",
      price: 4000,
      type: "Audio",
      downloadUrl: "/sample-files/meditation-pack.zip",
    },
  }

  return products[slug as keyof typeof products] || null
}

function CheckoutContent() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [error, setError] = useState("")
  const [productInitialized, setProductInitialized] = useState(false)
  const searchParams = useSearchParams()
  const { user } = useAuth()

  const [product, setProduct] = useState({
    title: "100 Daily Affirmations PDF",
    price: 2000,
    type: "eBook",
    slug: "100-daily-affirmations",
    downloadUrl: "/sample-files/daily-affirmations.pdf",
  })

  // Initialize product only once
  useEffect(() => {
    if (!productInitialized) {
      const productSlug = searchParams.get("product")
      if (productSlug) {
        const productData = getProductBySlug(productSlug)
        if (productData) {
          setProduct({
            ...productData,
            slug: productSlug,
          })
        } else {
          setError("Product not found")
        }
      }
      setProductInitialized(true)
    }
  }, [searchParams, productInitialized])

  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }, [])

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setPaymentComplete(true)
    } catch (err) {
      setError("Payment failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = async () => {
    setIsDownloading(true)

    try {
      // Simulate download process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create a mock download
      const link = document.createElement("a")
      link.href = product.downloadUrl
      link.download = `${product.slug}.${product.type === "Audio" ? "zip" : "pdf"}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      alert(`${product.title} has been downloaded successfully!`)
    } catch (err) {
      alert("Download failed. Please try again or contact support.")
    } finally {
      setIsDownloading(false)
    }
  }

  if (error && !product.title) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <Card className="bg-white shadow-sm text-center">
            <CardContent className="p-8">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-black mb-4">Product Not Found</h1>
              <p className="text-gray-600 mb-6">The product you're trying to purchase doesn't exist.</p>
              <Button
                onClick={() => (window.location.href = "/products")}
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                Browse Products
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (paymentComplete) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <Card className="bg-white shadow-sm text-center">
            <CardContent className="p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-full mb-6">
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              </div>
              <h1 className="text-2xl font-bold text-black mb-4">Payment Successful!</h1>
              <p className="text-gray-600 mb-6">
                Thank you for your purchase. Your digital product "{product.title}" is now available for download.
              </p>
              <div className="space-y-3">
                <Button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isDownloading ? "Downloading..." : "Download Now"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => (window.location.href = "/products")}
                >
                  Continue Shopping
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Complete Your Purchase</h1>
          <p className="text-gray-600">Secure checkout powered by industry-standard encryption</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-black">{product.title}</h3>
                  <p className="text-sm text-gray-600">{product.type}</p>
                  <p className="text-sm text-gray-500">Purchased by: {user?.email}</p>
                </div>
                <span className="font-semibold">{formatPrice(product.price)}</span>
              </div>

              <Separator />

              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{formatPrice(product.price)}</span>
              </div>

              <div className="bg-emerald-50 p-4 rounded-lg mt-6">
                <p className="text-sm text-emerald-800">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Your payment is secured with 256-bit SSL encryption
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Instant Download:</strong> Get immediate access to your digital product after purchase.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePayment} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={user?.email || ""} disabled className="bg-gray-50" />
                  </div>

                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      required
                      disabled={isProcessing}
                      pattern="[0-9\s]{13,19}"
                      maxLength={19}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        required
                        disabled={isProcessing}
                        pattern="[0-9]{2}/[0-9]{2}"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvc">CVC</Label>
                      <Input
                        id="cvc"
                        placeholder="123"
                        required
                        disabled={isProcessing}
                        pattern="[0-9]{3,4}"
                        maxLength={4}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="name">Cardholder Name</Label>
                    <Input id="name" placeholder="John Doe" required disabled={isProcessing} />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : `Pay Now - ${formatPrice(product.price)}`}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By completing your purchase, you agree to our{" "}
                  <a href="/terms" className="text-emerald-600 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-emerald-600 hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <ProtectedRoute redirectTo="/login">
      <CheckoutContent />
    </ProtectedRoute>
  )
}
