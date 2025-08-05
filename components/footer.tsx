import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex space-x-6">
            <Link href="/terms" className="text-sm text-gray-600 hover:text-black transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-black transition-colors">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-gray-600 hover:text-black transition-colors">
              Contact
            </Link>
          </div>
          <p className="text-sm text-gray-500">© 2025 Conectory. Built to inspire.</p>
        </div>
      </div>
    </footer>
  )
}
