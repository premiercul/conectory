import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-black">Privacy Policy</CardTitle>
            <p className="text-gray-600 mt-2">Last updated: January 8, 2025</p>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-black mb-4">1. Information We Collect</h2>
                <p className="text-gray-700 leading-relaxed">
                  We collect information you provide directly to us, such as when you create an account, upload
                  products, or make purchases. This includes your name, email address, payment information, and content
                  you upload.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-black mb-4">2. How We Use Your Information</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>To provide and maintain our services</li>
                  <li>To process transactions and send related information</li>
                  <li>To send you technical notices and support messages</li>
                  <li>To communicate with you about products, services, and events</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-black mb-4">3. Information Sharing</h2>
                <p className="text-gray-700 leading-relaxed">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your
                  consent, except as described in this policy or as required by law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-black mb-4">4. Data Security</h2>
                <p className="text-gray-700 leading-relaxed">
                  We implement appropriate security measures to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-black mb-4">5. Cookies</h2>
                <p className="text-gray-700 leading-relaxed">
                  We use cookies to enhance your experience, analyze site usage, and assist in our marketing efforts.
                  You can control cookie settings through your browser.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-black mb-4">6. Contact Us</h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at privacy@conectory.com.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
