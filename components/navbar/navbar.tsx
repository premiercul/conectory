"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { User, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"
import { NavbarLogo } from "./navbar-logo"
import { NavbarLinks } from "./navbar-links"
import { NavbarAuth } from "./navbar-auth"
import { NavbarMobile } from "./navbar-mobile"

/**
 * Main navigation component
 * Handles responsive navigation with mobile menu
 */
export function Navbar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout()
      window.location.href = "/"
    }
  }

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavbarLogo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavbarLinks pathname={pathname} user={user} />
            <NavbarAuth user={user} onLogout={handleLogout} pathname={pathname} />
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
        <NavbarMobile 
          isOpen={mobileMenuOpen} 
          user={user} 
          onLogout={handleLogout}
          pathname={pathname}
        />
      </div>
    </nav>
  )
} 