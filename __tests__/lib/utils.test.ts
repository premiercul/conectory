import {
  cn,
  isValidEmail,
  validatePassword,
  formatPrice,
  generateSlug,
  copyToClipboard,
  debounce,
  throttle,
  formatDate,
  formatRelativeTime,
  truncateText,
  generateId,
  isValidFileType,
  isValidFileSize,
  formatFileSize,
  sleep,
  retry
} from '@/lib/utils'

describe('Utility Functions', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2')
      expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
      expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
    })
  })

  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true)
      expect(isValidEmail('test+tag@example.org')).toBe(true)
    })

    it('should reject invalid email addresses', () => {
      expect(isValidEmail('invalid-email')).toBe(false)
      expect(isValidEmail('test@')).toBe(false)
      expect(isValidEmail('@example.com')).toBe(false)
      expect(isValidEmail('')).toBe(false)
    })
  })

  describe('validatePassword', () => {
    it('should validate strong passwords', () => {
      const result = validatePassword('StrongPass123')
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should reject weak passwords', () => {
      const result = validatePassword('weak')
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Password must be at least 8 characters long')
      expect(result.errors).toContain('Password must contain at least one uppercase letter')
      expect(result.errors).toContain('Password must contain at least one number')
    })
  })

  describe('formatPrice', () => {
    it('should format prices correctly', () => {
      expect(formatPrice(0)).toBe('₦0')
      expect(formatPrice(9.99)).toBe('₦9.99')
      expect(formatPrice(1000)).toBe('₦1,000')
      expect(formatPrice(1234.56)).toBe('₦1,234.56')
    })
  })

  describe('generateSlug', () => {
    it('should generate valid slugs', () => {
      expect(generateSlug('Hello World')).toBe('hello-world')
      expect(generateSlug('Product Name 123')).toBe('product-name-123')
      expect(generateSlug('Special@Characters!')).toBe('specialcharacters')
      expect(generateSlug('  Multiple   Spaces  ')).toBe('multiple-spaces')
    })
  })

  describe('copyToClipboard', () => {
    beforeEach(() => {
      // Mock navigator.clipboard
      Object.assign(navigator, {
        clipboard: {
          writeText: jest.fn().mockResolvedValue(undefined)
        }
      })
      
      // Mock document.execCommand
      Object.assign(document, {
        execCommand: jest.fn().mockReturnValue(true)
      })
    })

    it('should copy text to clipboard', async () => {
      const result = await copyToClipboard('test text')
      expect(result).toBe(true)
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test text')
    })

    it('should handle clipboard errors', async () => {
      navigator.clipboard.writeText = jest.fn().mockRejectedValue(new Error('Clipboard error'))
      
      const result = await copyToClipboard('test text')
      expect(result).toBe(false)
    })
  })

  describe('debounce', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('should debounce function calls', () => {
      const mockFn = jest.fn()
      const debouncedFn = debounce(mockFn, 1000)

      debouncedFn('test1')
      debouncedFn('test2')
      debouncedFn('test3')

      expect(mockFn).not.toHaveBeenCalled()

      jest.advanceTimersByTime(1000)

      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn).toHaveBeenCalledWith('test3')
    })
  })

  describe('throttle', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('should throttle function calls', () => {
      const mockFn = jest.fn()
      const throttledFn = throttle(mockFn, 1000)

      throttledFn('test1')
      throttledFn('test2')
      throttledFn('test3')

      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn).toHaveBeenCalledWith('test1')

      jest.advanceTimersByTime(1000)

      throttledFn('test4')
      expect(mockFn).toHaveBeenCalledTimes(2)
      expect(mockFn).toHaveBeenCalledWith('test4')
    })
  })

  describe('formatDate', () => {
    it('should format dates correctly', () => {
      const date = new Date('2024-01-15')
      expect(formatDate(date)).toBe('January 15, 2024')
      expect(formatDate('2024-01-15')).toBe('January 15, 2024')
    })
  })

  describe('formatRelativeTime', () => {
    beforeEach(() => {
      jest.useFakeTimers()
      jest.setSystemTime(new Date('2024-01-15T12:00:00Z'))
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('should format relative times correctly', () => {
      // Test with exact minute difference
      expect(formatRelativeTime('2024-01-15T11:59:30Z')).toBe('just now')
      expect(formatRelativeTime('2024-01-15T11:30:00Z')).toBe('30 minutes ago')
      expect(formatRelativeTime('2024-01-15T10:00:00Z')).toBe('2 hours ago')
      expect(formatRelativeTime('2024-01-14T12:00:00Z')).toBe('1 days ago')
    })
  })

  describe('truncateText', () => {
    it('should truncate long text', () => {
      expect(truncateText('Short text', 20)).toBe('Short text')
      expect(truncateText('This is a very long text that needs to be truncated', 20)).toBe('This is a very long...')
    })
  })

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId()
      const id2 = generateId()
      
      expect(id1).toHaveLength(9)
      expect(id2).toHaveLength(9)
      expect(id1).not.toBe(id2)
    })
  })

  describe('isValidFileType', () => {
    it('should validate file types', () => {
      const file = new File([''], 'test.pdf', { type: 'application/pdf' })
      
      expect(isValidFileType(file, ['application/pdf'])).toBe(true)
      expect(isValidFileType(file, ['image/jpeg', 'image/png'])).toBe(false)
    })
  })

  describe('isValidFileSize', () => {
    it('should validate file sizes', () => {
      const file = new File(['x'.repeat(1024 * 1024)], 'test.txt', { type: 'text/plain' }) // 1MB
      
      expect(isValidFileSize(file, 2)).toBe(true) // 2MB limit
      expect(isValidFileSize(file, 0.5)).toBe(false) // 0.5MB limit
    })
  })

  describe('formatFileSize', () => {
    it('should format file sizes correctly', () => {
      expect(formatFileSize(0)).toBe('0 Bytes')
      expect(formatFileSize(1024)).toBe('1 KB')
      expect(formatFileSize(1024 * 1024)).toBe('1 MB')
      expect(formatFileSize(1024 * 1024 * 1024)).toBe('1 GB')
    })
  })

  describe('sleep', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('should sleep for specified time', async () => {
      const sleepPromise = sleep(1000)
      
      jest.advanceTimersByTime(1000)
      
      await sleepPromise
      // If we reach here, the sleep completed successfully
    })
  })

  describe('retry', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('should retry failed operations', async () => {
      let attempts = 0
      const mockFn = jest.fn().mockImplementation(() => {
        attempts++
        if (attempts < 3) {
          throw new Error('Failed')
        }
        return 'success'
      })

      const retryPromise = retry(mockFn, 3, 1000)
      
      // Advance timers for each retry
      jest.advanceTimersByTime(1000) // First retry
      jest.advanceTimersByTime(2000) // Second retry
      
      const result = await retryPromise
      
      expect(result).toBe('success')
      expect(mockFn).toHaveBeenCalledTimes(3)
    }, 10000) // Increase timeout

    it('should throw error after max attempts', async () => {
      const mockFn = jest.fn().mockRejectedValue(new Error('Always fails'))

      const retryPromise = retry(mockFn, 2, 1000)
      
      jest.advanceTimersByTime(1000) // First retry
      jest.advanceTimersByTime(2000) // Second retry
      
      await expect(retryPromise).rejects.toThrow('Always fails')
      expect(mockFn).toHaveBeenCalledTimes(2)
    }, 10000) // Increase timeout
  })
}) 