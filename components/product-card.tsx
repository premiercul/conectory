"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Copy, Check } from "lucide-react"
import { Product } from "@/lib/types"
import { formatPrice, copyToClipboard } from "@/lib/utils"
import { useState } from "react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [copied, setCopied] = useState(false)

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault()
    window.location.href = `/checkout?product=${product.slug}`
  }

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const productUrl = `${window.location.origin}/p/${product.slug}`
    const success = await copyToClipboard(productUrl)
    
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // Reset after 2 seconds
    }
  }

  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
          onError={(e) => {
            // Fallback to a placeholder if image fails to load
            const target = e.target as HTMLImageElement
            target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-size='16' fill='%236b7280'%3EProduct Image%3C/text%3E%3C/svg%3E"
          }}
        />
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
            {product.type}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-black line-clamp-2 leading-tight">
            {product.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-emerald-600">
              {formatPrice(product.price)}
            </span>
            {product.salesCount && (
              <span className="text-xs text-gray-500">
                {product.salesCount} sold
              </span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 space-x-2">
        <Button
          onClick={handleBuyNow}
          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
          size="sm"
        >
          Buy Now
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-transparent hover:bg-gray-50"
          onClick={handleCopyLink}
          title={copied ? "Link copied!" : "Copy product link"}
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </CardFooter>
    </Card>
  )
} 