import { ProtectedRoute } from "@/components/protected-route"
import Link from "next/link"
import { CreatorLayout } from "@/components/creator-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, TrendingUp, Calendar, Settings, Info, BarChart3 } from "lucide-react"

function EarningsContent() {
  const earningsData = {
    total: 325800, // ₦325,800 (After 10% platform fee)
    last7Days: 66692, // ₦66,692 (After 10% platform fee)
    thisMonth: 231392, // ₦231,392 (After 10% platform fee)
    lastMonth: 215200, // ₦215,200 (After 10% platform fee)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const recentSales = [
    {
      product: "100 Daily Affirmations PDF",
      grossAmount: "₦2,000",
      netAmount: "₦1,800", // After 10% fee
      date: "2 hours ago",
      buyer: "john@example.com",
    },
    {
      product: "Morning Motivation Audio Pack",
      grossAmount: "₦3,200",
      netAmount: "₦2,880", // After 10% fee
      date: "4 hours ago",
      buyer: "sarah@example.com",
    },
    {
      product: "Productivity Planner 2025",
      grossAmount: "₦2,800",
      netAmount: "₦2,520", // After 10% fee
      date: "6 hours ago",
      buyer: "mike@example.com",
    },
    {
      product: "Confidence Building Guide",
      grossAmount: "₦2,400",
      netAmount: "₦2,160", // After 10% fee
      date: "1 day ago",
      buyer: "emma@example.com",
    },
    {
      product: "Success Mindset Toolkit",
      grossAmount: "₦4,800",
      netAmount: "₦4,320", // After 10% fee
      date: "1 day ago",
      buyer: "alex@example.com",
    },
  ]

  return (
    <CreatorLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-black">Earnings</h1>
            <p className="text-gray-600 mt-1">Track your revenue and manage payouts.</p>
          </div>
          <Link href="/creator/payout">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
              <Settings className="w-4 h-4 mr-2" />
              Setup Payout
            </Button>
          </Link>
        </div>

        {/* Platform Fee Notice */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800">Earnings Information</p>
                <p className="text-sm text-blue-700 mt-1">
                  All earnings shown are net amounts after Conectory's 10% platform fee. This fee helps us maintain the
                  platform and support creators like you.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Earnings Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                  <p className="text-3xl font-bold text-black mt-2">{formatPrice(earningsData.total)}</p>
                  <p className="text-sm text-emerald-600 mt-1">All time</p>
                </div>
                <div className="bg-emerald-50 p-3 rounded-full">
                  <DollarSign className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Last 7 Days</p>
                  <p className="text-3xl font-bold text-black mt-2">{formatPrice(earningsData.last7Days)}</p>
                  <p className="text-sm text-emerald-600 mt-1">+12% from previous</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-full">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-3xl font-bold text-black mt-2">{formatPrice(earningsData.thisMonth)}</p>
                  <p className="text-sm text-emerald-600 mt-1">+7.5% from last month</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-full">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Last Month</p>
                  <p className="text-3xl font-bold text-black mt-2">{formatPrice(earningsData.lastMonth)}</p>
                  <p className="text-sm text-gray-500 mt-1">Previous period</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-full">
                  <Calendar className="w-6 h-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Recent Sales - Side by Side Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Earnings Overview Chart */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Earnings Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">Earnings Chart</p>
                  <p className="text-sm text-gray-400 mt-1">Visual analytics coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Sales */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {recentSales.map((sale, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-black truncate">{sale.product}</p>
                      <p className="text-xs text-gray-500 truncate">{sale.buyer}</p>
                      <p className="text-xs text-gray-500">{sale.date}</p>
                    </div>
                    <div className="text-right ml-4 flex-shrink-0">
                      <p className="text-sm font-semibold text-emerald-600">{sale.netAmount}</p>
                      <p className="text-xs text-gray-500 line-through">{sale.grossAmount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </CreatorLayout>
  )
}

export default function Earnings() {
  return (
    <ProtectedRoute redirectTo="/login">
      <EarningsContent />
    </ProtectedRoute>
  )
}
