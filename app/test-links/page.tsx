import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestLinksPage() {
  const links = [
    { name: "Homepage", href: "/", description: "Main landing page" },
    { name: "Products", href: "/products", description: "Product catalog" },
    { name: "Sign Up", href: "/signup", description: "User registration" },
    { name: "Login", href: "/login", description: "User authentication" },
    { name: "Forgot Password", href: "/forgot-password", description: "Password reset" },
    { name: "Checkout", href: "/checkout", description: "Purchase flow" },
    { name: "Creator Dashboard", href: "/creator", description: "Creator main dashboard" },
    { name: "Upload Product", href: "/creator/upload", description: "Product upload form" },
    { name: "My Products", href: "/creator/products", description: "Product management" },
    { name: "Earnings", href: "/creator/earnings", description: "Revenue tracking" },
    { name: "Payout Settings", href: "/creator/payout", description: "Payment configuration" },
    { name: "Settings", href: "/creator/settings", description: "Account settings" },
    { name: "Terms", href: "/terms", description: "Terms of service" },
    { name: "Privacy", href: "/privacy", description: "Privacy policy" },
    { name: "Contact", href: "/contact", description: "Contact form" },
  ]

  const productLinks = [
    { name: "Daily Affirmations", href: "/p/100-daily-affirmations" },
    { name: "Morning Audio", href: "/p/morning-motivation-audio-pack" },
    { name: "Success Toolkit", href: "/p/success-mindset-toolkit" },
    { name: "Productivity Planner", href: "/p/productivity-planner-2025" },
    { name: "Confidence Guide", href: "/p/confidence-building-guide" },
    { name: "Meditation Pack", href: "/p/meditation-mindfulness-pack" },
  ]

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Link Testing Page</h1>
          <p className="text-lg text-gray-600">Test all navigation links and functionality</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Main Pages */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Main Pages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {links.map((link, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-black">{link.name}</p>
                    <p className="text-sm text-gray-600">{link.description}</p>
                  </div>
                  <Link href={link.href}>
                    <Button variant="outline" size="sm">
                      Test
                    </Button>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Product Pages */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Product Pages (/p/[slug])</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {productLinks.map((link, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-black">{link.name}</p>
                    <p className="text-sm text-gray-600">{link.href}</p>
                  </div>
                  <Link href={link.href}>
                    <Button variant="outline" size="sm">
                      Test
                    </Button>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Link href="/">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">Back to Homepage</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
