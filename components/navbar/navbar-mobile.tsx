import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User, LogOut } from "lucide-react"
import { User as UserType } from "@/lib/types"

interface NavbarMobileProps {
  isOpen: boolean
  user: UserType | null
  onLogout: () => void
  pathname: string
}

/**
 * Mobile navigation menu component
 * Displays navigation items in a collapsible mobile menu
 */
export function NavbarMobile({ isOpen, user, onLogout, pathname }: NavbarMobileProps) {
  const isActive = (path: string) => pathname === path || pathname.startsWith(path)

  if (!isOpen) return null

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
        {/* Main Navigation Links */}
        <Link
          href="/products"
          className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
            isActive("/products") 
              ? "text-emerald-600 bg-emerald-50" 
              : "text-gray-600 hover:text-black hover:bg-gray-50"
          }`}
        >
          Products
        </Link>

        {user && (
          <Link
            href="/creator"
            className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
              isActive("/creator") 
                ? "text-emerald-600 bg-emerald-50" 
                : "text-gray-600 hover:text-black hover:bg-gray-50"
            }`}
          >
            Dashboard
          </Link>
        )}

        {/* Auth Section */}
        {user ? (
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center px-3 py-2 text-sm text-gray-600">
              <User className="w-4 h-4 mr-2" />
              <span>{user.name}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onLogout} 
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        ) : (
          <div className="pt-4 border-t border-gray-200 space-y-2">
            <Link
              href="/signup"
              className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                isActive("/signup") 
                  ? "text-emerald-600 bg-emerald-50" 
                  : "text-gray-600 hover:text-black hover:bg-gray-50"
              }`}
            >
              Sign Up
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm" className="w-full">
                Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
} 