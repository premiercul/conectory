"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { User, Menu, X } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const pathname = usePathname()
  const { user } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) => pathname === path || pathname.startsWith(path)
  const isHomepage = pathname === "/"

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-black">Conectory</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Main Navigation Links */}
            <div className="flex items-center space-x-6">
              <Link
                href="/products"
                className={`text-sm font-medium transition-colors ${
                  isActive("/products") ? "text-emerald-600" : "text-gray-600 hover:text-black"
                }`}
              >
                Products
              </Link>

              {user && (
                <Link
                  href="/creator"
                  className={`text-sm font-medium transition-colors ${
                    isActive("/creator") ? "text-emerald-600" : "text-gray-600 hover:text-black"
                  }`}
                >
                  Dashboard
                </Link>
              )}
            </div>

            {/* Auth Section */}
            {user ? (
              <div className="flex items-center space-x-4 pl-6 border-l border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  <span className="max-w-32 truncate">{user.name}</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4 pl-6 border-l border-gray-200">
                <Link
                  href="/signup"
                  className={`text-sm font-medium transition-colors ${
                    isActive("/signup") ? "text-emerald-600" : "text-gray-600 hover:text-black"
                  }`}
                >
                  Sign Up
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/products"
                className={`text-sm font-medium transition-colors ${
                  isActive("/products") ? "text-emerald-600" : "text-gray-600 hover:text-black"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>

              {user ? (
                <>
                  <Link
                    href="/creator"
                    className={`text-sm font-medium transition-colors ${
                      isActive("/creator") ? "text-emerald-600" : "text-gray-600 hover:text-black"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <User className="w-4 h-4" />
                      <span>{user.name}</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                  <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600" size="sm">
                      Sign Up
                    </Button>
                  </Link>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full bg-transparent" size="sm">
                      Login
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
