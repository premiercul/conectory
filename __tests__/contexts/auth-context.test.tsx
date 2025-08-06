import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from '@/contexts/auth-context'
import { User } from '@/lib/types'

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

// Test component to access auth context
function TestComponent() {
  const { user, isLoading, login, signup, logout, requireAuth } = useAuth()
  
  return (
    <div>
      <div data-testid="user">{user ? user.name : 'No user'}</div>
      <div data-testid="loading">{isLoading ? 'Loading' : 'Not loading'}</div>
      <div data-testid="auth-status">{requireAuth() ? 'Authenticated' : 'Not authenticated'}</div>
      <button onClick={() => login('test@example.com', 'Password123')} data-testid="login-btn">
        Login
      </button>
      <button onClick={() => signup('Test User', 'test@example.com', 'Password123')} data-testid="signup-btn">
        Sign Up
      </button>
      <button onClick={logout} data-testid="logout-btn">Logout</button>
    </div>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear()
    localStorageMock.setItem.mockClear()
    localStorageMock.removeItem.mockClear()
    jest.clearAllMocks()
  })

  it('should provide initial state', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    // Wait for initial loading to complete
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Not loading')
    })

    expect(screen.getByTestId('user')).toHaveTextContent('No user')
    expect(screen.getByTestId('auth-status')).toHaveTextContent('Not authenticated')
  })

  it('should load user from localStorage on mount', async () => {
    const mockUser: User = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      isCreator: true,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    }
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser))

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Not loading')
    })

    expect(screen.getByTestId('user')).toHaveTextContent('Test User')
    expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated')
  })

  it('should handle invalid localStorage data', async () => {
    localStorageMock.getItem.mockReturnValue('invalid json')

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Not loading')
    })

    expect(screen.getByTestId('user')).toHaveTextContent('No user')
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('conectory_user')
  })

  it('should handle login successfully', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Not loading')
    })

    fireEvent.click(screen.getByTestId('login-btn'))

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('test')
    })

    expect(localStorageMock.setItem).toHaveBeenCalled()
    expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated')
  })

  it('should handle signup successfully', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Not loading')
    })

    fireEvent.click(screen.getByTestId('signup-btn'))

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('Test User')
    })

    expect(localStorageMock.setItem).toHaveBeenCalled()
    expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated')
  })

  it('should handle logout', async () => {
    const mockUser: User = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      isCreator: true,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    }
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser))

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('Test User')
    })

    fireEvent.click(screen.getByTestId('logout-btn'))

    expect(screen.getByTestId('user')).toHaveTextContent('No user')
    expect(screen.getByTestId('auth-status')).toHaveTextContent('Not authenticated')
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('conectory_user')
  })

  it('should throw error when useAuth is used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      render(<TestComponent />)
    }).toThrow('useAuth must be used within an AuthProvider')

    consoleSpy.mockRestore()
  })
}) 