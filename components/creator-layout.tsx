"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  LayoutDashboard, 
  Package, 
  DollarSign, 
  Upload, 
  Settings, 
  Menu, 
  X,
  LogOut 
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface CreatorLayoutProps {
  children: React.ReactNode
}

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/creator",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/creator/products",
    icon: Package,
  },
  {
    title: "Upload",
    href: "/creator/upload",
    icon: Upload,
  },
  {
    title: "Earnings",
    href: "/creator/earnings",
    icon: DollarSign,
  },
  {
    title: "Settings",
    href: "/creator/settings",
    icon: Settings,
  },
]

export function CreatorLayout({ children }: CreatorLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout()
      window.location.href = "/"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Overlay - for both mobile and desktop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <Link href="/creator" className="flex items-center">
              <h1 className="text-xl font-bold text-black">Creator Dashboard</h1>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 font-semibold">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-medium text-black">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-2">
            {sidebarItems.map((item) => {
              // Fix the active state logic to prevent multiple highlights
              const isActive = pathname === item.href || 
                (item.href !== "/creator" && pathname.startsWith(item.href + "/")) ||
                (item.href === "/creator" && pathname === "/creator")
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      isActive 
                        ? "bg-emerald-500 text-white hover:bg-emerald-600" 
                        : "text-gray-600 hover:text-black hover:bg-gray-100"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="w-4 h-4 mr-3" />
                    {item.title}
                  </Button>
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="p-6 border-t border-gray-200">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div>
        {/* Header with Hamburger Menu */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold text-black">Creator Dashboard</h1>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
        </div>

        {/* Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
