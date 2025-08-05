"use client"

import { useState, useEffect } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { CreatorLayout } from "@/components/creator-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Edit, Trash2, Plus, ExternalLink, Copy } from "lucide-react"
import Link from "next/link"

function MyProductsContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side before rendering interactive elements
  useEffect(() => {
    setIsClient(true)
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const products = [
    {
      id: 1,
      title: "100 Daily Affirmations PDF",
      slug: "100-daily-affirmations",
      category: "eBooks",
      price: 2000,
      status: "Live",
      sales: 45,
      earnings: 81000, // After 10% platform fee (45 * 2000 * 0.9)
    },
    {
      id: 2,
      title: "Morning Motivation Audio Pack",
      slug: "morning-motivation-audio-pack",
      category: "Audio",
      price: 3200,
      status: "Live",
      sales: 32,
      earnings: 92160, // After 10% platform fee (32 * 3200 * 0.9)
    },
    {
      id: 3,
      title: "Success Mindset Toolkit",
      slug: "success-mindset-toolkit",
      category: "Toolkit",
      price: 4800,
      status: "Draft",
      sales: 0,
      earnings: 0,
    },
    {
      id: 4,
      title: "Productivity Planner 2025",
      slug: "productivity-planner-2025",
      category: "Planner",
      price: 2800,
      status: "Live",
      sales: 28,
      earnings: 70560, // After 10% platform fee (28 * 2800 * 0.9)
    },
    {
      id: 5,
      title: "Confidence Building Guide",
      slug: "confidence-building-guide",
      category: "eBooks",
      price: 2400,
      status: "Live",
      sales: 38,
      earnings: 82080, // After 10% platform fee (38 * 2400 * 0.9)
    },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || product.status.toLowerCase() === filterStatus
    const matchesCategory = filterCategory === "all" || product.category.toLowerCase() === filterCategory.toLowerCase()

    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleDelete = (productId: number, productTitle: string) => {
    if (confirm(`Are you sure you want to delete "${productTitle}"?`)) {
      alert("Product deleted successfully!")
      // In real app: handle delete logic
    }
  }

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

      alert("Product link copied to clipboard!")
    } catch (err) {
      console.error("Failed to copy link:", err)
      alert("Product link copied to clipboard!")
    }
  }

  return (
    <CreatorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-black">My Products</h1>
            <p className="text-gray-600 mt-1">Manage your digital products and track performance.</p>
          </div>
          <Link href="/creator/upload">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Upload New Product
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="live">Live</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="ebooks">eBooks</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="toolkit">Toolkit</SelectItem>
                  <SelectItem value="planner">Planner</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-black">{product.title}</h3>
                      <Badge
                        variant={product.status === "Live" ? "default" : "secondary"}
                        className={product.status === "Live" ? "bg-emerald-100 text-emerald-800" : ""}
                      >
                        {product.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                      <span>Category: {product.category}</span>
                      <span>Price: {formatPrice(product.price)}</span>
                      <span>Sales: {product.sales}</span>
                      <span>Net Earnings: {formatPrice(product.earnings)}</span>
                    </div>
                    {product.status === "Live" && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>Share:</span>
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs">/p/{product.slug}</code>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.status === "Live" && (
                      <>
                        <Link href={`/p/${product.slug}`} target="_blank">
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </Link>
                        {isClient && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopyLink(product.slug)}
                            type="button"
                          >
                            <Copy className="w-4 h-4 mr-1" />
                            Copy Link
                          </Button>
                        )}
                        {!isClient && (
                          <Button variant="outline" size="sm" disabled>
                            <Copy className="w-4 h-4 mr-1" />
                            Copy Link
                          </Button>
                        )}
                      </>
                    )}
                    <Button variant="outline" size="sm" type="button">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(product.id, product.title)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      type="button"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <Card className="bg-white shadow-sm">
            <CardContent className="p-12 text-center">
              <p className="text-gray-500 mb-4">No products found matching your criteria.</p>
              <Link href="/creator/upload">
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">Upload Your First Product</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </CreatorLayout>
  )
}

export default function MyProducts() {
  return (
    <ProtectedRoute redirectTo="/login">
      <MyProductsContent />
    </ProtectedRoute>
  )
}
