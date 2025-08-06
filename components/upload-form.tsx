"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, AlertTriangle, CheckCircle } from "lucide-react"
import { ProductFormData, ProductCategory } from "@/lib/types"
import { generateSlug } from "@/lib/utils"

interface UploadFormProps {
  onSubmit: (data: ProductFormData) => Promise<void>
  isLoading?: boolean
}

export function UploadForm({ onSubmit, isLoading = false }: UploadFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    title: '',
    description: '',
    price: 0,
    category: 'ebooks',
    file: null,
  })
  const [errors, setErrors] = useState<Partial<ProductFormData>>({})
  const [isUploading, setIsUploading] = useState(false)

  const categories: { value: ProductCategory; label: string }[] = [
    { value: 'quotes', label: 'Quotes' },
    { value: 'ebooks', label: 'eBooks' },
    { value: 'audio', label: 'Audio' },
    { value: 'vault', label: 'Vault' },
    { value: 'planner', label: 'Planner' },
    { value: 'toolkit', label: 'Toolkit' },
  ]

  const validateForm = (): boolean => {
    const newErrors: Partial<ProductFormData> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Product title is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Product description is required'
    }

    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0'
    }

    if (!formData.file) {
      newErrors.file = 'Please select a file to upload'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsUploading(true)
    try {
      await onSubmit(formData)
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, file }))
    if (errors.file) {
      setErrors(prev => ({ ...prev, file: undefined }))
    }
  }

  const handleInputChange = (field: keyof ProductFormData, value: string | number | ProductCategory) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const generatedSlug = formData.title ? generateSlug(formData.title) : ''

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Product Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Title */}
          <div>
            <Label htmlFor="title">Product Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g., 100 Daily Affirmations PDF"
              className={`mt-1 ${errors.title ? 'border-red-500' : ''}`}
            />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">{errors.title}</p>
            )}
            {formData.title && (
              <p className="text-xs text-gray-500 mt-1">
                Generated slug: <code className="bg-gray-100 px-1 rounded">{generatedSlug}</code>
              </p>
            )}
          </div>

          {/* Product Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your product and what value it provides..."
              rows={4}
              className={`mt-1 ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">{errors.description}</p>
            )}
          </div>

          {/* File Upload */}
          <div>
            <Label htmlFor="file">Upload File</Label>
            <div className={`mt-1 border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              errors.file ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-emerald-400'
            }`}>
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500 mb-2">PDF, EPUB, MP3, ZIP files up to 50MB</p>
              <Input
                id="file"
                type="file"
                accept=".pdf,.epub,.mp3,.zip"
                onChange={handleFileChange}
                className="mt-2"
              />
              {formData.file && (
                <div className="mt-2 flex items-center justify-center text-sm text-emerald-600">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  {formData.file.name}
                </div>
              )}
            </div>
            {errors.file && (
              <p className="text-sm text-red-500 mt-1">{errors.file}</p>
            )}
          </div>

          {/* Price and Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price (NGN)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="100"
                value={formData.price || ''}
                onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
                placeholder="2000"
                className={`mt-1 ${errors.price ? 'border-red-500' : ''}`}
              />
              {errors.price && (
                <p className="text-sm text-red-500 mt-1">{errors.price}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">Enter amount in Nigerian Naira</p>
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange('category', value as ProductCategory)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isUploading || isLoading}
            className="w-full bg-emerald-500 hover:bg-emerald-600"
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Publishing Product...
              </>
            ) : (
              'Publish Product'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 