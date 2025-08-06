import type { ReactNode } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

interface MainLayoutProps {
  children: ReactNode
  className?: string
}

/**
 * Main layout component that wraps all pages with navbar and footer
 * Provides consistent layout structure across the application
 */
export function MainLayout({ children, className = "" }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={`flex-1 ${className}`}>{children}</main>
      <Footer />
    </div>
  )
} 