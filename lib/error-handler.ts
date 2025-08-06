/**
 * Custom error class for application-specific errors
 */
export class AppError extends Error {
  public readonly statusCode: number
  public readonly isOperational: boolean

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational

    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * Error types for different scenarios
 */
export const ErrorTypes = {
  VALIDATION: 'VALIDATION',
  AUTHENTICATION: 'AUTHENTICATION',
  AUTHORIZATION: 'AUTHORIZATION',
  NOT_FOUND: 'NOT_FOUND',
  NETWORK: 'NETWORK',
  SERVER: 'SERVER',
  UNKNOWN: 'UNKNOWN'
} as const

export type ErrorType = typeof ErrorTypes[keyof typeof ErrorTypes]

/**
 * Error handler class for centralized error management
 */
export class ErrorHandler {
  /**
   * Handles and logs errors
   */
  static handle(error: Error | AppError, context?: string): void {
    const errorInfo = {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
      type: this.getErrorType(error)
    }

    // Log error (in production, this would go to a logging service)
    console.error('Error occurred:', errorInfo)

    // In development, show more detailed errors
    if (process.env.NODE_ENV === 'development') {
      console.group('Error Details')
      console.error('Message:', error.message)
      console.error('Stack:', error.stack)
      console.error('Context:', context)
      console.groupEnd()
    }
  }

  /**
   * Creates user-friendly error messages
   */
  static getUserMessage(error: Error | AppError): string {
    if (error instanceof AppError) {
      return error.message
    }

    // Handle common error types
    if (error.message.includes('Network') || error.message.includes('fetch')) {
      return 'Network error. Please check your connection and try again.'
    }

    if (error.message.includes('Unauthorized') || error.message.includes('401')) {
      return 'Please log in to continue.'
    }

    if (error.message.includes('Forbidden') || error.message.includes('403')) {
      return 'You don\'t have permission to perform this action.'
    }

    if (error.message.includes('Not Found') || error.message.includes('404')) {
      return 'The requested resource was not found.'
    }

    // Default message
    return 'Something went wrong. Please try again.'
  }

  /**
   * Determines error type based on error message or status code
   */
  private static getErrorType(error: Error | AppError): ErrorType {
    if (error instanceof AppError) {
      if (error.statusCode >= 400 && error.statusCode < 500) {
        if (error.statusCode === 401) return ErrorTypes.AUTHENTICATION
        if (error.statusCode === 403) return ErrorTypes.AUTHORIZATION
        if (error.statusCode === 404) return ErrorTypes.NOT_FOUND
        return ErrorTypes.VALIDATION
      }
      if (error.statusCode >= 500) return ErrorTypes.SERVER
    }

    const message = error.message.toLowerCase()
    
    if (message.includes('validation') || message.includes('invalid')) {
      return ErrorTypes.VALIDATION
    }
    
    if (message.includes('unauthorized') || message.includes('authentication')) {
      return ErrorTypes.AUTHENTICATION
    }
    
    if (message.includes('forbidden') || message.includes('permission')) {
      return ErrorTypes.AUTHORIZATION
    }
    
    if (message.includes('not found') || message.includes('404')) {
      return ErrorTypes.NOT_FOUND
    }
    
    if (message.includes('network') || message.includes('fetch')) {
      return ErrorTypes.NETWORK
    }

    return ErrorTypes.UNKNOWN
  }

  /**
   * Creates validation errors
   */
  static validationError(message: string): AppError {
    return new AppError(message, 400)
  }

  /**
   * Creates authentication errors
   */
  static authenticationError(message: string = 'Authentication required'): AppError {
    return new AppError(message, 401)
  }

  /**
   * Creates authorization errors
   */
  static authorizationError(message: string = 'Access denied'): AppError {
    return new AppError(message, 403)
  }

  /**
   * Creates not found errors
   */
  static notFoundError(message: string = 'Resource not found'): AppError {
    return new AppError(message, 404)
  }

  /**
   * Creates server errors
   */
  static serverError(message: string = 'Internal server error'): AppError {
    return new AppError(message, 500)
  }
}

/**
 * Async error wrapper for better error handling in async functions
 */
export function withErrorHandling<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  context?: string
) {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args)
    } catch (error) {
      ErrorHandler.handle(error as Error, context)
      throw error
    }
  }
}

/**
 * Error boundary component props
 */
export interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

/**
 * Error boundary state
 */
export interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
} 