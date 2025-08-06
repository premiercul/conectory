import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PageContainerProps {
  children: ReactNode
  className?: string
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl"
  padding?: "none" | "sm" | "md" | "lg" | "xl"
}

/**
 * Reusable page container component for consistent layout and spacing
 * Provides responsive max-width and padding options
 */
export function PageContainer({ 
  children, 
  className = "",
  maxWidth = "7xl",
  padding = "lg"
}: PageContainerProps) {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md", 
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl"
  }

  const paddingClasses = {
    none: "",
    sm: "px-4 py-4",
    md: "px-6 py-6", 
    lg: "px-4 py-8 md:px-6 lg:px-8",
    xl: "px-4 py-12 md:px-6 lg:px-8"
  }

  return (
    <div className={cn(
      "mx-auto w-full",
      maxWidthClasses[maxWidth],
      paddingClasses[padding],
      className
    )}>
      {children}
    </div>
  )
} 