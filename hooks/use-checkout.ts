import { useState, useCallback } from 'react'
import { Order, Product } from '@/lib/types'
import { apiService } from '@/lib/api'
import { ErrorHandler } from '@/lib/error-handler'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'

interface CheckoutItem {
  product: Product
  quantity: number
}

interface CheckoutState {
  items: CheckoutItem[]
  subtotal: number
  platformFee: number
  total: number
}

interface UseCheckoutReturn {
  checkoutState: CheckoutState
  isLoading: boolean
  error: string | null
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productSlug: string) => void
  updateQuantity: (productSlug: string, quantity: number) => void
  clearCart: () => void
  getCartItemCount: () => number
  getCartItem: (productSlug: string) => CheckoutItem | undefined
  isInCart: (productSlug: string) => boolean
  createOrder: (productSlug: string) => Promise<Order | null>
  processCheckout: (items: CheckoutItem[]) => Promise<Order[] | null>
  clearError: () => void
}

/**
 * Custom hook for managing checkout and cart operations
 */
export function useCheckout(): UseCheckoutReturn {
  const { user } = useAuth()
  const router = useRouter()
  const [checkoutState, setCheckoutState] = useState<CheckoutState>({
    items: [],
    subtotal: 0,
    platformFee: 0,
    total: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const PLATFORM_FEE_RATE = 0.10 // 10%

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const calculateTotals = useCallback((items: CheckoutItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    const platformFee = subtotal * PLATFORM_FEE_RATE
    const total = subtotal + platformFee

    return { subtotal, platformFee, total }
  }, [])

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCheckoutState(prev => {
      const existingItemIndex = prev.items.findIndex(item => item.product.slug === product.slug)
      
      let newItems: CheckoutItem[]
      
      if (existingItemIndex >= 0) {
        newItems = [...prev.items]
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity
        }
      } else {
        newItems = [...prev.items, { product, quantity }]
      }

      const totals = calculateTotals(newItems)
      
      return {
        ...prev,
        items: newItems,
        ...totals
      }
    })
  }, [calculateTotals])

  const removeFromCart = useCallback((productSlug: string) => {
    setCheckoutState(prev => {
      const newItems = prev.items.filter(item => item.product.slug !== productSlug)
      const totals = calculateTotals(newItems)
      
      return {
        ...prev,
        items: newItems,
        ...totals
      }
    })
  }, [calculateTotals])

  const updateQuantity = useCallback((productSlug: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productSlug)
      return
    }

    setCheckoutState(prev => {
      const newItems = prev.items.map(item => 
        item.product.slug === productSlug 
          ? { ...item, quantity }
          : item
      )
      const totals = calculateTotals(newItems)
      
      return {
        ...prev,
        items: newItems,
        ...totals
      }
    })
  }, [calculateTotals, removeFromCart])

  const clearCart = useCallback(() => {
    setCheckoutState({
      items: [],
      subtotal: 0,
      platformFee: 0,
      total: 0,
    })
  }, [])

  const getCartItemCount = useCallback(() => {
    return checkoutState.items.reduce((sum, item) => sum + item.quantity, 0)
  }, [checkoutState.items])

  const getCartItem = useCallback((productSlug: string) => {
    return checkoutState.items.find(item => item.product.slug === productSlug)
  }, [checkoutState.items])

  const isInCart = useCallback((productSlug: string) => {
    return checkoutState.items.some(item => item.product.slug === productSlug)
  }, [checkoutState.items])

  const createOrder = useCallback(async (productSlug: string): Promise<Order | null> => {
    if (!user) {
      setError('You must be logged in to create an order')
      router.push('/login')
      return null
    }

    try {
      setIsLoading(true)
      setError(null)

      const response = await apiService.createOrder(productSlug)
      
      if (response.success && response.data) {
        await apiService.trackProductPurchase(response.data.id)
        return response.data
      }
      
      return null
    } catch (err) {
      const errorMessage = ErrorHandler.getUserMessage(err as Error)
      setError(errorMessage)
      ErrorHandler.handle(err as Error, 'useCheckout.createOrder')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [user, router])

  const processCheckout = useCallback(async (items: CheckoutItem[]): Promise<Order[] | null> => {
    if (!user) {
      setError('You must be logged in to checkout')
      router.push('/login')
      return null
    }

    if (items.length === 0) {
      setError('Your cart is empty')
      return null
    }

    try {
      setIsLoading(true)
      setError(null)

      const orders: Order[] = []

      for (const item of items) {
        const order = await createOrder(item.product.slug)
        if (order) {
          orders.push(order)
        }
      }

      if (orders.length > 0) {
        clearCart()
        router.push(`/orders/${orders[0].id}`)
        return orders
      }
      
      return null
    } catch (err) {
      const errorMessage = ErrorHandler.getUserMessage(err as Error)
      setError(errorMessage)
      ErrorHandler.handle(err as Error, 'useCheckout.processCheckout')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [user, router, createOrder, clearCart])

  return {
    checkoutState,
    isLoading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemCount,
    getCartItem,
    isInCart,
    createOrder,
    processCheckout,
    clearError,
  }
} 