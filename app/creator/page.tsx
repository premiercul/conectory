import { ProtectedRoute } from "@/components/protected-route"
import { CreatorLayout } from "@/components/creator-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Package, DollarSign, Download, TrendingUp, Upload, Eye, Plus } from "lucide-react"

function CreatorDashboardContent() {
  const stats = [
    {
      title: "Total Products",
      value: "12",
      icon: Package,
      change: "+2 this month",
    },
    {
      title: "Total Sales",
      value: "248",
      icon: DollarSign,
      change: "+18% from last month",
    },
    {
      title: "Daily Downloads",
      value: "34",
      icon: Download,
      change: "+12% from yesterday",
    },
    {
      title: "Total Earnings",
      value: "₦496,000", // Updated to Naira
      icon: TrendingUp,
      change: "+25% this month",
    },
  ]

  const recentActivity = [
    {
      type: "upload",
      message: "Uploaded 'Morning Motivation Pack'",
      time: "2 hours ago",
      icon: Upload,
    },
    {
      type: "sale",
      message: "Sale: 'Success Mindset Guide' - ₦2,800",
      time: "4 hours ago",
      icon: DollarSign,
    },
    {
      type: "edit",
      message: "Updated 'Daily Affirmations PDF'",
      time: "1 day ago",
      icon: Eye,
    },
    {
      type: "sale",
      message: "Sale: 'Productivity Planner' - ₦2,400",
      time: "1 day ago",
      icon: DollarSign,
    },
    {
      type: "upload",
      message: "Uploaded 'Confidence Building Audio'",
      time: "2 days ago",
      icon: Upload,
    },
  ]

  return (
    <CreatorLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-black">Welcome back, Creator!</h1>
          <p className="text-gray-600 mt-2">Here's what's happening with your products today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-black mt-2">{stat.value}</p>
                    <p className="text-sm text-emerald-600 mt-1">{stat.change}</p>
                  </div>
                  <div className="bg-emerald-50 p-3 rounded-full">
                    <stat.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
                      <div className="bg-gray-100 p-2 rounded-full">
                        <activity.icon className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-black">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/creator/upload" className="block">
                  <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Upload New Product
                  </Button>
                </Link>
                <Link href="/creator/products" className="block">
                  <Button variant="outline" className="w-full bg-transparent">
                    <Eye className="w-4 h-4 mr-2" />
                    View All Products
                  </Button>
                </Link>
                <Link href="/creator/earnings" className="block">
                  <Button variant="outline" className="w-full bg-transparent">
                    <DollarSign className="w-4 h-4 mr-2" />
                    View Earnings
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </CreatorLayout>
  )
}

export default function CreatorDashboard() {
  return (
    <ProtectedRoute redirectTo="/login">
      <CreatorDashboardContent />
    </ProtectedRoute>
  )
}
