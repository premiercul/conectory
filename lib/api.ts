import { Product, User, Order, CreatorStats, ApiResponse } from './types'
import { ErrorHandler, AppError } from './error-handler'

/**
 * API service class for handling all API calls
 * Provides centralized error handling and response formatting
 */
class ApiService {
  private baseUrl: string

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  }

  /**
   * Generic API request method with error handling
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}/api${endpoint}`
      const config: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      }

      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new AppError(
          data.error || `HTTP ${response.status}`,
          response.status
        )
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
      }
    } catch (error) {
      ErrorHandler.handle(error as Error, `API Request: ${endpoint}`)
      
      if (error instanceof AppError) {
        throw error
      }

      throw new AppError(
        'Network error. Please check your connection and try again.',
        500
      )
    }
  }

  // Authentication APIs
  async login(email: string, password: string): Promise<ApiResponse<User>> {
    return this.request<User>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async signup(name: string, email: string, password: string): Promise<ApiResponse<User>> {
    return this.request<User>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    })
  }

  async logout(): Promise<ApiResponse<void>> {
    return this.request<void>('/auth/logout', {
      method: 'POST',
    })
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.request<User>('/auth/me')
  }

  // Product APIs
  async getProducts(params?: {
    category?: string
    search?: string
    page?: number
    limit?: number
  }): Promise<ApiResponse<Product[]>> {
    const searchParams = new URLSearchParams()
    if (params?.category) searchParams.append('category', params.category)
    if (params?.search) searchParams.append('search', params.search)
    if (params?.page) searchParams.append('page', params.page.toString())
    if (params?.limit) searchParams.append('limit', params.limit.toString())

    const query = searchParams.toString()
    const endpoint = `/products${query ? `?${query}` : ''}`
    
    return this.request<Product[]>(endpoint)
  }

  async getProduct(slug: string): Promise<ApiResponse<Product>> {
    return this.request<Product>(`/products/${slug}`)
  }

  async createProduct(productData: FormData): Promise<ApiResponse<Product>> {
    return this.request<Product>('/products', {
      method: 'POST',
      body: productData,
      headers: {}, // Let browser set Content-Type for FormData
    })
  }

  async updateProduct(slug: string, productData: Partial<Product>): Promise<ApiResponse<Product>> {
    return this.request<Product>(`/products/${slug}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    })
  }

  async deleteProduct(slug: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/products/${slug}`, {
      method: 'DELETE',
    })
  }

  async uploadProductFile(file: File): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData()
    formData.append('file', file)

    return this.request<{ url: string }>('/products/upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    })
  }

  // Creator APIs
  async getCreatorProducts(): Promise<ApiResponse<Product[]>> {
    return this.request<Product[]>('/creator/products')
  }

  async getCreatorStats(): Promise<ApiResponse<CreatorStats>> {
    return this.request<CreatorStats>('/creator/stats')
  }

  async getCreatorOrders(): Promise<ApiResponse<Order[]>> {
    return this.request<Order[]>('/creator/orders')
  }

  // Order APIs
  async createOrder(productSlug: string): Promise<ApiResponse<Order>> {
    return this.request<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify({ productSlug }),
    })
  }

  async getOrder(orderId: string): Promise<ApiResponse<Order>> {
    return this.request<Order>(`/orders/${orderId}`)
  }

  async getUserOrders(): Promise<ApiResponse<Order[]>> {
    return this.request<Order[]>('/orders')
  }

  // Search and Discovery APIs
  async searchProducts(query: string): Promise<ApiResponse<Product[]>> {
    return this.request<Product[]>(`/search?q=${encodeURIComponent(query)}`)
  }

  async getFeaturedProducts(): Promise<ApiResponse<Product[]>> {
    return this.request<Product[]>('/products/featured')
  }

  async getTrendingProducts(): Promise<ApiResponse<Product[]>> {
    return this.request<Product[]>('/products/trending')
  }

  // Analytics APIs
  async trackProductView(slug: string): Promise<ApiResponse<void>> {
    return this.request<void>('/analytics/view', {
      method: 'POST',
      body: JSON.stringify({ slug }),
    })
  }

  async trackProductPurchase(orderId: string): Promise<ApiResponse<void>> {
    return this.request<void>('/analytics/purchase', {
      method: 'POST',
      body: JSON.stringify({ orderId }),
    })
  }

  // Utility APIs
  async healthCheck(): Promise<ApiResponse<{ status: string; timestamp: string }>> {
    return this.request<{ status: string; timestamp: string }>('/health')
  }

  async getAppConfig(): Promise<ApiResponse<{
    maxFileSize: number
    allowedFileTypes: string[]
    platformFee: number
  }>> {
    return this.request<{
      maxFileSize: number
      allowedFileTypes: string[]
      platformFee: number
    }>('/config')
  }
}

// Export singleton instance
export const apiService = new ApiService()

// Export individual methods for convenience
export const {
  login,
  signup,
  logout,
  getCurrentUser,
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductFile,
  getCreatorProducts,
  getCreatorStats,
  getCreatorOrders,
  createOrder,
  getOrder,
  getUserOrders,
  searchProducts,
  getFeaturedProducts,
  getTrendingProducts,
  trackProductView,
  trackProductPurchase,
  healthCheck,
  getAppConfig,
} = apiService 