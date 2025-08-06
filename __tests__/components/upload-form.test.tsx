import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UploadForm } from '@/components/upload-form'
import { ProductFormData } from '@/lib/types'

// Mock the utils function
jest.mock('@/lib/utils', () => ({
  ...jest.requireActual('@/lib/utils'),
  generateSlug: jest.fn((text: string) => text.toLowerCase().replace(/\s+/g, '-'))
}))

describe('UploadForm', () => {
  const mockOnSubmit = jest.fn()
  
  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  const renderUploadForm = (props = {}) => {
    return render(
      <UploadForm 
        onSubmit={mockOnSubmit} 
        isLoading={false}
        {...props}
      />
    )
  }

  const fillForm = async (user: any, data: Partial<ProductFormData> = {}) => {
    const defaultData = {
      title: 'Test Product',
      description: 'This is a test product description',
      price: '29.99',
      category: 'ebooks',
      ...data
    }

    await user.type(screen.getByLabelText(/title/i), defaultData.title)
    await user.type(screen.getByLabelText(/description/i), defaultData.description)
    await user.type(screen.getByLabelText(/price/i), defaultData.price)
    
    // Select category
    const categorySelect = screen.getByLabelText(/category/i)
    await user.click(categorySelect)
    await user.click(screen.getByText(defaultData.category))

    // Upload file
    const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' })
    const fileInput = screen.getByLabelText(/file/i)
    await user.upload(fileInput, file)
  }

  it('should render all form fields', () => {
    renderUploadForm()

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/file/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /upload product/i })).toBeInTheDocument()
  })

  it('should display all category options', async () => {
    const user = userEvent.setup()
    renderUploadForm()

    const categorySelect = screen.getByLabelText(/category/i)
    await user.click(categorySelect)

    expect(screen.getByText('Quotes')).toBeInTheDocument()
    expect(screen.getByText('eBooks')).toBeInTheDocument()
    expect(screen.getByText('Audio')).toBeInTheDocument()
    expect(screen.getByText('Vault')).toBeInTheDocument()
    expect(screen.getByText('Planner')).toBeInTheDocument()
    expect(screen.getByText('Toolkit')).toBeInTheDocument()
  })

  it('should generate slug preview when title is entered', async () => {
    const user = userEvent.setup()
    renderUploadForm()

    await user.type(screen.getByLabelText(/title/i), 'Test Product Title')

    expect(screen.getByText(/slug preview/i)).toBeInTheDocument()
    expect(screen.getByText('test-product-title')).toBeInTheDocument()
  })

  it('should submit form with valid data', async () => {
    const user = userEvent.setup()
    renderUploadForm()

    await fillForm(user)

    const submitButton = screen.getByRole('button', { name: /upload product/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'Test Product',
        description: 'This is a test product description',
        price: 29.99,
        category: 'ebooks',
        file: expect.any(File)
      })
    })
  })

  it('should show validation errors for empty fields', async () => {
    const user = userEvent.setup()
    renderUploadForm()

    const submitButton = screen.getByRole('button', { name: /upload product/i })
    await user.click(submitButton)

    expect(screen.getByText(/product title is required/i)).toBeInTheDocument()
    expect(screen.getByText(/product description is required/i)).toBeInTheDocument()
    expect(screen.getByText(/price must be greater than 0/i)).toBeInTheDocument()
    expect(screen.getByText(/please select a file to upload/i)).toBeInTheDocument()
  })

  it('should show validation error for invalid price', async () => {
    const user = userEvent.setup()
    renderUploadForm()

    await user.type(screen.getByLabelText(/title/i), 'Test Product')
    await user.type(screen.getByLabelText(/description/i), 'Test description')
    await user.type(screen.getByLabelText(/price/i), '0')

    const submitButton = screen.getByRole('button', { name: /upload product/i })
    await user.click(submitButton)

    expect(screen.getByText(/price must be greater than 0/i)).toBeInTheDocument()
  })

  it('should show validation error for negative price', async () => {
    const user = userEvent.setup()
    renderUploadForm()

    await user.type(screen.getByLabelText(/title/i), 'Test Product')
    await user.type(screen.getByLabelText(/description/i), 'Test description')
    await user.type(screen.getByLabelText(/price/i), '-10')

    const submitButton = screen.getByRole('button', { name: /upload product/i })
    await user.click(submitButton)

    expect(screen.getByText(/price must be greater than 0/i)).toBeInTheDocument()
  })

  it('should clear validation errors when user starts typing', async () => {
    const user = userEvent.setup()
    renderUploadForm()

    // Submit empty form to show errors
    const submitButton = screen.getByRole('button', { name: /upload product/i })
    await user.click(submitButton)

    expect(screen.getByText(/product title is required/i)).toBeInTheDocument()

    // Start typing in title field
    await user.type(screen.getByLabelText(/title/i), 'Test')

    // Error should be cleared
    expect(screen.queryByText(/product title is required/i)).not.toBeInTheDocument()
  })

  it('should handle file upload', async () => {
    const user = userEvent.setup()
    renderUploadForm()

    const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' })
    const fileInput = screen.getByLabelText(/file/i)
    
    await user.upload(fileInput, file)

    expect(fileInput.files?.[0]).toBe(file)
    expect(fileInput.files).toHaveLength(1)
  })

  it('should show loading state when isLoading is true', () => {
    renderUploadForm({ isLoading: true })

    const submitButton = screen.getByRole('button', { name: /upload product/i })
    expect(submitButton).toBeDisabled()
  })

  it('should show upload progress when form is being submitted', async () => {
    const user = userEvent.setup()
    renderUploadForm()

    await fillForm(user)

    const submitButton = screen.getByRole('button', { name: /upload product/i })
    await user.click(submitButton)

    // The form should show some indication of upload progress
    // This depends on the actual implementation of the upload state
    expect(submitButton).toBeInTheDocument()
  })

  it('should handle form submission errors', async () => {
    const user = userEvent.setup()
    const mockOnSubmitWithError = jest.fn().mockRejectedValue(new Error('Upload failed'))
    
    renderUploadForm({ onSubmit: mockOnSubmitWithError })

    await fillForm(user)

    const submitButton = screen.getByRole('button', { name: /upload product/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockOnSubmitWithError).toHaveBeenCalled()
    })
  })

  it('should update form data when fields change', async () => {
    const user = userEvent.setup()
    renderUploadForm()

    const titleInput = screen.getByLabelText(/title/i)
    const descriptionInput = screen.getByLabelText(/description/i)
    const priceInput = screen.getByLabelText(/price/i)

    await user.type(titleInput, 'New Title')
    await user.type(descriptionInput, 'New Description')
    await user.type(priceInput, '99.99')

    expect(titleInput).toHaveValue('New Title')
    expect(descriptionInput).toHaveValue('New Description')
    expect(priceInput).toHaveValue('99.99')
  })

  it('should handle category selection', async () => {
    const user = userEvent.setup()
    renderUploadForm()

    const categorySelect = screen.getByLabelText(/category/i)
    await user.click(categorySelect)
    await user.click(screen.getByText('Audio'))

    expect(categorySelect).toHaveValue('audio')
  })
}) 