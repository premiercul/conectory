import Link from "next/link"

/**
 * Navbar logo component
 * Displays the Conectory brand name as a clickable link
 */
export function NavbarLogo() {
  return (
    <Link href="/" className="flex items-center">
      <h1 className="text-2xl font-bold text-black">Conectory</h1>
    </Link>
  )
} 