"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, Download, Share2, CheckCircle, ArrowLeft } from "lucide-react"
import { mockProducts } from "@/lib/mock-data"
import { Product } from "@/lib/types"
import { formatPrice, copyToClipboard } from "@/lib/utils"
import Link from "next/link"

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const slug = params.slug as string
    const foundProduct = mockProducts.find(p => p.slug === slug)
    setProduct(foundProduct || null)
    setIsLoading(false)
  }, [params.slug])

  const handleShare = async () => {
    const url = `${window.location.origin}/p/${product?.slug}`
    const success = await copyToClipboard(url)
    
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleBuyNow = () => {
    window.location.href = `/checkout?product=${product?.slug}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold text-black mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
            <Link href="/products">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                Browse Products
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/products">
            <Button variant="ghost" className="text-gray-600 hover:text-black">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'%3E%3Crect width='600' height='600' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-size='24' fill='%236b7280'%3EProduct Image%3C/text%3E%3C/svg%3E"
                }}
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                  {product.type}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold text-black mb-2">{product.title}</h1>
              <p className="text-gray-600 mb-4">by {product.creatorName}</p>
              <div className="text-3xl font-bold text-emerald-600 mb-4">
                {formatPrice(product.price)}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-black mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="font-semibold text-black mb-3">What's Included</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Separator />

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Sales:</span>
                <span className="ml-2 font-medium">{product.salesCount || 0}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleBuyNow}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 text-lg"
                size="lg"
              >
                <Download className="w-5 h-5 mr-2" />
                Buy Now - {formatPrice(product.price)}
              </Button>
              
              <Button
                onClick={handleShare}
                variant="outline"
                className="w-full bg-transparent"
                size="lg"
              >
                <Share2 className="w-5 h-5 mr-2" />
                {copied ? "Link Copied!" : "Share Product"}
              </Button>
            </div>

            {/* Security Notice */}
            <div className="bg-emerald-50 p-4 rounded-lg">
              <p className="text-sm text-emerald-800">
                <strong>Secure Purchase:</strong> Your payment is protected with industry-standard encryption. 
                Get instant access to your digital product after purchase.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
