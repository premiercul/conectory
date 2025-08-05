import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Book, Zap, Heart, Download } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: Book,
      title: "Premium eBooks",
      description: "Curated collection of motivational and self-development books",
    },
    {
      icon: Heart,
      title: "Daily Quotes",
      description: "Fresh inspiration delivered to fuel your mindset every day",
    },
    {
      icon: Download,
      title: "Instant Access",
      description: "Download immediately after purchase, no waiting required",
    },
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 rounded-full mb-6">
              <Zap className="w-10 h-10 text-emerald-500" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
            Fuel Your Day.
            <br />
            Own What Inspires You.
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover and buy ebooks, quotes vaults, daily motivation packs, and digital wisdom.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white text-lg px-8 py-3 w-full sm:w-auto">
                Browse Products
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline" className="text-lg px-8 py-3 w-full sm:w-auto bg-transparent">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-black text-center mb-12">Everything You Need to Stay Motivated</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white shadow-sm border-0 hover:shadow-md transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-full mb-6">
                    <feature.icon className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-black mb-6">Ready to Transform Your Mindset?</h2>
          <p className="text-lg text-gray-600 mb-8">Join thousands who've already started their journey to success.</p>
          <Link href="/products">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white text-lg px-8 py-3">
              Start Browsing Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
