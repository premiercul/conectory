// Core application types
export interface User {
  id: string
  email: string
  name: string
  isCreator: boolean
  createdAt?: string
  updatedAt?: string
}

export interface Product {
  id: string
  title: string
  slug: string
  description: string
  price: number
  type: ProductType
  category: ProductCategory
  image: string
  downloadUrl: string
  features?: string[]
  creatorId: string
  creatorName: string
  createdAt: string
  updatedAt: string
  salesCount?: number
  rating?: number
}

export type ProductType = 'eBook' | 'Audio' | 'Bundle' | 'Planner' | 'Toolkit' | 'Vault'
export type ProductCategory = 'quotes' | 'ebooks' | 'audio' | 'vault' | 'planner' | 'toolkit'

export interface Order {
  id: string
  productId: string
  productTitle: string
  productSlug: string
  buyerId: string
  buyerEmail: string
  amount: number
  platformFee: number
  creatorEarnings: number
  status: OrderStatus
  createdAt: string
  downloadUrl: string
}

export type OrderStatus = 'pending' | 'completed' | 'failed' | 'refunded'

export interface CreatorStats {
  totalProducts: number
  totalSales: number
  totalEarnings: number
  monthlyEarnings: number
  dailyDownloads: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Form types
export interface LoginFormData {
  email: string
  password: string
}

export interface SignupFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface ProductFormData {
  title: string
  description: string
  price: number
  category: ProductCategory
  file: File | null
}

// Navigation types
export interface NavItem {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  isActive?: boolean
} 