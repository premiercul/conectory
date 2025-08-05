import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-black">Terms of Service</CardTitle>
            <p className="text-gray-600 mt-2">Last updated: January 8, 2025</p>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-black mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 leading-relaxed">
                  By accessing and using Conectory, you accept and agree to be bound by the terms and provision of this
                  agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-black mb-4">2. Platform Description</h2>
                <p className="text-gray-700 leading-relaxed">
                  Conectory is a digital marketplace that allows creators to sell motivational content, eBooks, audio
                  files, and other digital products. We facilitate transactions between creators and customers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-black mb-4">3. Creator Responsibilities</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Ensure all uploaded content is original or properly licensed</li>
                  <li>Provide accurate product descriptions and pricing</li>
                  <li>Deliver digital products as promised</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-black mb-4">4. Platform Fees</h2>
                <p className="text-gray-700 leading-relaxed">
                  Conectory charges a 10% platform fee on all sales. This fee is automatically deducted from your
                  earnings and helps us maintain and improve the platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-black mb-4">5. Prohibited Content</h2>
                <p className="text-gray-700 leading-relaxed">
                  Users may not upload content that is illegal, harmful, threatening, abusive, defamatory, or violates
                  intellectual property rights.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-black mb-4">6. Contact Information</h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at legal@conectory.com.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
