import { LayoutDashboard, Upload, Package, DollarSign, Settings, LogOut } from "lucide-react"

// Main navigation links for Navbar
export const mainNavLinks = [
  { name: "Products", href: "/products" },
  { name: "Dashboard", href: "/creator", requiresAuth: true },
]

// Creator dashboard sidebar links
export const creatorNavLinks = [
  { name: "Dashboard", href: "/creator", icon: LayoutDashboard },
  { name: "Upload Product", href: "/creator/upload", icon: Upload },
  { name: "My Products", href: "/creator/products", icon: Package },
  { name: "Earnings", href: "/creator/earnings", icon: DollarSign },
  { name: "Settings", href: "/creator/settings", icon: Settings },
  { name: "Logout", href: "#", icon: LogOut, isAction: true },
] 