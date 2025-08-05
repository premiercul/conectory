"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Upload, Package, DollarSign, Settings, LogOut, Menu, X } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface CreatorLayoutProps {
  children: React.ReactNode
}

export function CreatorLayout({ children }: CreatorLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { logout } = useAuth()

  const navigation = [
    { name: "Dashboard", href: "/creator", icon: LayoutDashboard },
    { name: "Upload Product", href: "/creator/upload", icon: Upload },
    { name: "My Products", href: "/creator/products", icon: Package },
    { name: "Earnings", href: "/creator/earnings", icon: DollarSign },
    { name: "Settings", href: "/creator/settings", icon: Settings },
    { name: "Logout", href: "#", icon: LogOut, isAction: true },
  ]

  const isActive = (path: string) => {
    if (path === "/creator" && pathname === "/creator") return true
    if (path !== "/creator" && pathname.startsWith(path)) return true
    return false
  }

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout()
      window.location.href = "/"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:translate-x-0 lg:flex lg:flex-col lg:w-64 lg:shadow-md
        `}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 flex-shrink-0">
          <Link href="/creator" className="flex items-center">
            <h1 className="text-xl font-bold text-black">Conectory</h1>
          </Link>
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="flex-1 mt-8 px-4 overflow-y-auto">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                    ${
                      isActive(item.href) && !item.isAction
                        ? "bg-emerald-50 text-emerald-700 border-r-2 border-emerald-500"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }
                    ${item.isAction ? "hover:bg-red-50 hover:text-red-600" : ""}
                  `}
                  onClick={(e) => {
                    if (item.isAction) {
                      e.preventDefault()
                      handleLogout()
                    } else {
                      setSidebarOpen(false)
                    }
                  }}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 flex-shrink-0">
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Creator Dashboard</h1>
          <div></div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
