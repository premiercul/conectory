"use client"

import type { ReactNode } from "react"
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react"
import { User } from "@/lib/types"
import { isValidEmail, validatePassword } from "@/lib/utils"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  requireAuth: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount - only run once
    const initializeAuth = () => {
      try {
        const savedUser = localStorage.getItem("conectory_user")
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser)
          // Validate user object structure
          if (parsedUser && parsedUser.id && parsedUser.email && parsedUser.name) {
            setUser(parsedUser)
          } else {
            localStorage.removeItem("conectory_user")
          }
        }
      } catch (error) {
        console.error("Error loading user from localStorage:", error)
        localStorage.removeItem("conectory_user")
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, []) // Empty dependency array - only run once on mount

  const login = useCallback(async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error("Email and password are required")
    }

    if (!isValidEmail(email)) {
      throw new Error("Please enter a valid email address")
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser: User = {
        id: Date.now().toString(),
        email: email.toLowerCase().trim(),
        name: email.split("@")[0],
        isCreator: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      setUser(mockUser)
      localStorage.setItem("conectory_user", JSON.stringify(mockUser))
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const signup = useCallback(async (name: string, email: string, password: string) => {
    if (!name || !email || !password) {
      throw new Error("All fields are required")
    }

    if (!isValidEmail(email)) {
      throw new Error("Please enter a valid email address")
    }

    const passwordValidation = validatePassword(password)
    if (!passwordValidation.isValid) {
      throw new Error(passwordValidation.errors[0])
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser: User = {
        id: Date.now().toString(),
        email: email.toLowerCase().trim(),
        name: name.trim(),
        isCreator: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      setUser(mockUser)
      localStorage.setItem("conectory_user", JSON.stringify(mockUser))
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    try {
      localStorage.removeItem("conectory_user")
    } catch (error) {
      console.error("Error removing user from localStorage:", error)
    }
  }, [])

  const requireAuth = useCallback(() => {
    return !!user
  }, [user])

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      user,
      isLoading,
      login,
      signup,
      logout,
      requireAuth,
    }),
    [user, isLoading, login, signup, logout, requireAuth],
  )

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
