"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/product-card"
import { mockProducts } from "@/lib/mock-data"
import { Product, ProductCategory } from "@/lib/types"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all')
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side before rendering interactive elements
  useEffect(() => {
    setIsClient(true)
  }, [])

  const categories: { value: ProductCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'All Products' },
    { value: 'quotes', label: 'Quotes' },
    { value: 'ebooks', label: 'eBooks' },
    { value: 'audio', label: 'Audio' },
    { value: 'vault', label: 'Vault' },
    { value: 'planner', label: 'Planner' },
    { value: 'toolkit', label: 'Toolkit' },
  ]

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-6 space-y-4">
                  <div className="aspect-square bg-gray-200 rounded"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-4">Discover Digital Products</h1>
          <p className="text-gray-600">Find the perfect motivational content to fuel your success journey.</p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try selecting a different category or check back later for new products.</p>
          </div>
        )}
      </div>
    </div>
  )
}
