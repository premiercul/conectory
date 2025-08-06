import Link from "next/link"
import { User } from "@/lib/types"

interface NavbarLinksProps {
  pathname: string
  user: User | null
}

/**
 * Navigation links component
 * Displays main navigation items with active state
 */
export function NavbarLinks({ pathname, user }: NavbarLinksProps) {
  const isActive = (path: string) => pathname === path || pathname.startsWith(path)

  return (
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
  )
} 