import { useState, useEffect, useCallback } from 'react'
import { Product, ProductCategory } from '@/lib/types'
import { apiService } from '@/lib/api'
import { ErrorHandler } from '@/lib/error-handler'
import { useAuth } from '@/contexts/auth-context'

interface UseProductsOptions {
  category?: ProductCategory
  search?: string
  page?: number
  limit?: number
  autoFetch?: boolean
}

interface UseProductsReturn {
  products: Product[]
  isLoading: boolean
  error: string | null
  hasMore: boolean
  totalCount: number
  fetchProducts: (options?: UseProductsOptions) => Promise<void>
  fetchProduct: (slug: string) => Promise<Product | null>
  createProduct: (productData: FormData) => Promise<Product | null>
  updateProduct: (slug: string, data: Partial<Product>) => Promise<Product | null>
  deleteProduct: (slug: string) => Promise<boolean>
  refreshProducts: () => Promise<void>
  clearError: () => void
}

/**
 * Custom hook for managing product operations
 * Provides state management, caching, and error handling for products
 */
export function useProducts(options: UseProductsOptions = {}): UseProductsReturn {
  const { user } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(options.page || 1)

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const fetchProducts = useCallback(async (fetchOptions?: UseProductsOptions) => {
    const opts = { ...options, ...fetchOptions }
    
    try {
      setIsLoading(true)
      setError(null)

      const response = await apiService.getProducts({
        category: opts.category,
        search: opts.search,
        page: opts.page || currentPage,
        limit: opts.limit || 12,
      })

      if (response.success && response.data) {
        const newProducts = response.data
        
        // If it's the first page, replace products
        // If it's a subsequent page, append products
        if (opts.page === 1 || !opts.page) {
          setProducts(newProducts)
        } else {
          setProducts(prev => [...prev, ...newProducts])
        }

        setHasMore(newProducts.length === (opts.limit || 12))
        setTotalCount(response.data.length) // This should come from API pagination metadata
        setCurrentPage(opts.page || 1)
      }
    } catch (err) {
      const errorMessage = ErrorHandler.getUserMessage(err as Error)
      setError(errorMessage)
      ErrorHandler.handle(err as Error, 'useProducts.fetchProducts')
    } finally {
      setIsLoading(false)
    }
  }, [options, currentPage])

  const fetchProduct = useCallback(async (slug: string): Promise<Product | null> => {
    try {
      setError(null)
      
      const response = await apiService.getProduct(slug)
      
      if (response.success && response.data) {
        return response.data
      }
      
      return null
    } catch (err) {
      const errorMessage = ErrorHandler.getUserMessage(err as Error)
      setError(errorMessage)
      ErrorHandler.handle(err as Error, 'useProducts.fetchProduct')
      return null
    }
  }, [])

  const createProduct = useCallback(async (productData: FormData): Promise<Product | null> => {
    if (!user) {
      setError('You must be logged in to create products')
      return null
    }

    try {
      setIsLoading(true)
      setError(null)

      const response = await apiService.createProduct(productData)
      
      if (response.success && response.data) {
        // Add the new product to the current list
        setProducts(prev => [response.data!, ...prev])
        return response.data
      }
      
      return null
    } catch (err) {
      const errorMessage = ErrorHandler.getUserMessage(err as Error)
      setError(errorMessage)
      ErrorHandler.handle(err as Error, 'useProducts.createProduct')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [user])

  const updateProduct = useCallback(async (slug: string, data: Partial<Product>): Promise<Product | null> => {
    if (!user) {
      setError('You must be logged in to update products')
      return null
    }

    try {
      setError(null)

      const response = await apiService.updateProduct(slug, data)
      
      if (response.success && response.data) {
        // Update the product in the current list
        setProducts(prev => 
          prev.map(product => 
            product.slug === slug ? response.data! : product
          )
        )
        return response.data
      }
      
      return null
    } catch (err) {
      const errorMessage = ErrorHandler.getUserMessage(err as Error)
      setError(errorMessage)
      ErrorHandler.handle(err as Error, 'useProducts.updateProduct')
      return null
    }
  }, [user])

  const deleteProduct = useCallback(async (slug: string): Promise<boolean> => {
    if (!user) {
      setError('You must be logged in to delete products')
      return false
    }

    try {
      setError(null)

      const response = await apiService.deleteProduct(slug)
      
      if (response.success) {
        // Remove the product from the current list
        setProducts(prev => prev.filter(product => product.slug !== slug))
        return true
      }
      
      return false
    } catch (err) {
      const errorMessage = ErrorHandler.getUserMessage(err as Error)
      setError(errorMessage)
      ErrorHandler.handle(err as Error, 'useProducts.deleteProduct')
      return false
    }
  }, [user])

  const refreshProducts = useCallback(async () => {
    await fetchProducts({ page: 1 })
  }, [fetchProducts])

  // Auto-fetch products on mount if autoFetch is true
  useEffect(() => {
    if (options.autoFetch !== false) {
      fetchProducts()
    }
  }, [fetchProducts, options.autoFetch])

  // Reset products when category or search changes
  useEffect(() => {
    if (options.autoFetch !== false) {
      setProducts([])
      setCurrentPage(1)
      fetchProducts({ page: 1 })
    }
  }, [options.category, options.search])

  return {
    products,
    isLoading,
    error,
    hasMore,
    totalCount,
    fetchProducts,
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    refreshProducts,
    clearError,
  }
}

/**
 * Hook for managing creator's own products
 */
export function useCreatorProducts() {
  const { user } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCreatorProducts = useCallback(async () => {
    if (!user) {
      setError('You must be logged in to view your products')
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const response = await apiService.getCreatorProducts()
      
      if (response.success && response.data) {
        setProducts(response.data)
      }
    } catch (err) {
      const errorMessage = ErrorHandler.getUserMessage(err as Error)
      setError(errorMessage)
      ErrorHandler.handle(err as Error, 'useCreatorProducts.fetchCreatorProducts')
    } finally {
      setIsLoading(false)
    }
  }, [user])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  useEffect(() => {
    if (user) {
      fetchCreatorProducts()
    }
  }, [user, fetchCreatorProducts])

  return {
    products,
    isLoading,
    error,
    fetchCreatorProducts,
    clearError,
  }
}

/**
 * Hook for managing featured and trending products
 */
export function useFeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchFeaturedProducts = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await apiService.getFeaturedProducts()
      
      if (response.success && response.data) {
        setFeaturedProducts(response.data)
      }
    } catch (err) {
      const errorMessage = ErrorHandler.getUserMessage(err as Error)
      setError(errorMessage)
      ErrorHandler.handle(err as Error, 'useFeaturedProducts.fetchFeaturedProducts')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchTrendingProducts = useCallback(async () => {
    try {
      setError(null)

      const response = await apiService.getTrendingProducts()
      
      if (response.success && response.data) {
        setTrendingProducts(response.data)
      }
    } catch (err) {
      const errorMessage = ErrorHandler.getUserMessage(err as Error)
      setError(errorMessage)
      ErrorHandler.handle(err as Error, 'useFeaturedProducts.fetchTrendingProducts')
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  useEffect(() => {
    fetchFeaturedProducts()
    fetchTrendingProducts()
  }, [fetchFeaturedProducts, fetchTrendingProducts])

  return {
    featuredProducts,
    trendingProducts,
    isLoading,
    error,
    fetchFeaturedProducts,
    fetchTrendingProducts,
    clearError,
  }
} 