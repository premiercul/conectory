import { render, screen, fireEvent } from '@testing-library/react'
import { ProductCard } from '@/components/product-card'
import { Product } from '@/lib/types'

// Mock the useAuth hook
jest.mock('@/contexts/auth-context', () => ({
  useAuth: () => ({
    user: null,
    isLoading: false,
  }),
}))

// Mock the useCheckout hook
jest.mock('@/hooks/use-checkout', () => ({
  useCheckout: () => ({
    addToCart: jest.fn(),
    isInCart: () => false,
  }),
}))

describe('ProductCard', () => {
  const mockProduct: Product = {
    id: '1',
    title: '100 Daily Affirmations PDF',
    slug: '100-daily-affirmations',
    description: 'Transform your mindset with 100 powerful daily affirmations designed to boost confidence and motivation.',
    price: 2000,
    type: 'eBook',
    category: 'ebooks',
    image: '/images/products/affirmations.jpg',
    downloadUrl: '/downloads/affirmations.pdf',
    creatorId: 'creator1',
    creatorName: 'John Doe',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    salesCount: 156,
    rating: 4.8,
  }

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument()
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument()
    expect(screen.getByText('₦2,000')).toBeInTheDocument() // Price in NGN
    expect(screen.getByText('156 sold')).toBeInTheDocument() // Sales count
  })

  it('displays product type badge', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('eBook')).toBeInTheDocument()
  })

  it('displays rating when available', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('4.8')).toBeInTheDocument()
  })

  it('has buy now button', () => {
    render(<ProductCard product={mockProduct} />)
    
    const buyButton = screen.getByRole('button', { name: /buy now/i })
    expect(buyButton).toBeInTheDocument()
  })

  it('has view details link', () => {
    render(<ProductCard product={mockProduct} />)
    
    const viewLink = screen.getByRole('link', { name: '' }) // The link has no text, just an icon
    expect(viewLink).toHaveAttribute('href', `/p/${mockProduct.slug}`)
  })

  it('handles missing rating gracefully', () => {
    const productWithoutRating = { ...mockProduct, rating: undefined }
    render(<ProductCard product={productWithoutRating} />)
    
    // Should not crash and should still display other information
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument()
    expect(screen.getByText('₦2,000')).toBeInTheDocument()
  })

  it('handles missing sales count gracefully', () => {
    const productWithoutSales = { ...mockProduct, salesCount: undefined }
    render(<ProductCard product={productWithoutSales} />)
    
    // Should not crash and should still display other information
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument()
    expect(screen.getByText('₦2,000')).toBeInTheDocument()
  })

  it('displays product image with alt text', () => {
    render(<ProductCard product={mockProduct} />)
    
    const image = screen.getByAltText(mockProduct.title)
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', mockProduct.image)
  })
}) 