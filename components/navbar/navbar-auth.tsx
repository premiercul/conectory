import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User, LogOut } from "lucide-react"
import { User as UserType } from "@/lib/types"

interface NavbarAuthProps {
  user: UserType | null
  onLogout: () => void
  pathname: string
}

/**
 * Authentication section component
 * Handles user login/logout and user info display
 */
export function NavbarAuth({ user, onLogout, pathname }: NavbarAuthProps) {
  const isActive = (path: string) => pathname === path || pathname.startsWith(path)

  return (
    <div className="flex items-center space-x-4 pl-6 border-l border-gray-200">
      {user ? (
        <>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <User className="w-4 h-4" />
            <span className="max-w-32 truncate">{user.name}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onLogout} className="text-red-600">
            <LogOut className="w-4 h-4" />
          </Button>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  )
} 