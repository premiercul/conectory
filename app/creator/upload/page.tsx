"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ProtectedRoute } from "@/components/protected-route"
import { CreatorLayout } from "@/components/creator-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, AlertTriangle } from "lucide-react"

function UploadProductContent() {
  const [isUploading, setIsUploading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false)
      alert("Product published successfully! Your sharable link has been generated.")
      router.push("/creator/products")
    }, 2000)
  }

  return (
    <CreatorLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black">Upload New Digital Product</h1>
          <p className="text-gray-600 mt-2">Share your motivational content with the world.</p>
        </div>

        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Product Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">Product Title</Label>
                <Input id="title" placeholder="e.g., 100 Daily Affirmations PDF" required className="mt-1" />
                <p className="text-xs text-gray-500 mt-1">This will be used to generate your sharable product link</p>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your product and what value it provides..."
                  rows={4}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="file">Upload File</Label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PDF, EPUB, MP3, ZIP files up to 50MB</p>
                  <Input id="file" type="file" accept=".pdf,.epub,.mp3,.zip" required className="mt-2" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price (NGN)</Label>
                  <Input id="price" type="number" min="0" step="100" placeholder="2000" required className="mt-1" />
                  <p className="text-xs text-gray-500 mt-1">Enter amount in Nigerian Naira</p>
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select required>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quotes">Quotes</SelectItem>
                      <SelectItem value="ebooks">eBooks</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                      <SelectItem value="vault">Vault</SelectItem>
                      <SelectItem value="planner">Planner</SelectItem>
                      <SelectItem value="toolkit">Toolkit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Platform Fee Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
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
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
                  disabled={isUploading}
                >
                  {isUploading ? "Publishing..." : "Publish Product"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
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
