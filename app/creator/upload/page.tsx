"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ProtectedRoute } from "@/components/protected-route"
import { CreatorLayout } from "@/components/creator-layout"
import { UploadForm } from "@/components/upload-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, ExternalLink } from "lucide-react"
import { ProductFormData } from "@/lib/types"
import { createMockProduct } from "@/lib/mock-data"
import { useAuth } from "@/contexts/auth-context"

function UploadProductContent() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [generatedSlug, setGeneratedSlug] = useState("")
  const router = useRouter()
  const { user } = useAuth()

  const handleSubmit = async (formData: ProductFormData) => {
    if (!user) {
      throw new Error("You must be logged in to upload products")
    }

    setIsUploading(true)
    setUploadSuccess(false)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create mock product
      const newProduct = createMockProduct({
        ...formData,
        creatorId: user.id,
        creatorName: user.name,
        slug: formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        type: formData.category === 'quotes' ? 'eBook' : 
              formData.category === 'audio' ? 'Audio' :
              formData.category === 'planner' ? 'Planner' :
              formData.category === 'toolkit' ? 'Toolkit' :
              formData.category === 'vault' ? 'Vault' : 'eBook',
        image: '/placeholder.svg?height=300&width=300&text=' + encodeURIComponent(formData.title),
        downloadUrl: formData.file ? `/uploads/${formData.file.name}` : '',
      })

      setGeneratedSlug(newProduct.slug)
      setUploadSuccess(true)

      // Show success message for 3 seconds before redirecting
      setTimeout(() => {
        router.push("/creator/products")
      }, 3000)

    } catch (error) {
      console.error("Upload failed:", error)
      throw error
    } finally {
      setIsUploading(false)
    }
  }

  if (uploadSuccess) {
    return (
      <CreatorLayout>
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-black">Product Published Successfully!</h1>
            <p className="text-gray-600 mt-2">Your product is now live and ready for customers.</p>
          </div>

          <Card className="bg-white shadow-sm border-emerald-200">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
                <h2 className="text-xl font-semibold text-black mb-2">Product Live!</h2>
                <p className="text-gray-600 mb-6">
                  Your product has been published and is now available for purchase.
                </p>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-2">Shareable Link:</p>
                  <div className="flex items-center justify-between bg-white p-3 rounded border">
                    <code className="text-sm text-emerald-600 flex-1">
                      {typeof window !== 'undefined' ? `${window.location.origin}/p/${generatedSlug}` : `/p/${generatedSlug}`}
                    </code>
                    <button
                      onClick={() => {
                        const url = `${window.location.origin}/p/${generatedSlug}`
                        navigator.clipboard.writeText(url)
                        alert("Link copied to clipboard!")
                      }}
                      className="ml-2 text-emerald-600 hover:text-emerald-700"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-500">
                  Redirecting to your products dashboard in a few seconds...
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </CreatorLayout>
    )
  }

  return (
    <CreatorLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black">Upload New Digital Product</h1>
          <p className="text-gray-600 mt-2">Share your motivational content with the world.</p>
        </div>

        {/* Platform Fee Notice */}
        <Card className="bg-amber-50 border-amber-200 mb-6">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-800">Platform Fee Notice</p>
                <p className="text-sm text-amber-700 mt-1">
                  Conectory charges a 10% platform fee on all sales. This helps us maintain the platform and support
                  creators like you.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <UploadForm onSubmit={handleSubmit} isLoading={isUploading} />
      </div>
    </CreatorLayout>
  )
}

export default function UploadProduct() {
  return (
    <ProtectedRoute redirectTo="/login">
      <UploadProductContent />
    </ProtectedRoute>
  )
}
