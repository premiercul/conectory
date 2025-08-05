"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ProtectedRoute } from "@/components/protected-route"
import { CreatorLayout } from "@/components/creator-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { User, Lock, CreditCard, Bell, Save, ExternalLink } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

function SettingsContent() {
  const [isSaving, setIsSaving] = useState(false)
  const { user } = useAuth()
  const [notifications, setNotifications] = useState({
    emailSales: true,
    emailMarketing: false,
    pushSales: true,
    pushMarketing: true,
  })

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Simulate save process
    setTimeout(() => {
      setIsSaving(false)
      alert("Settings saved successfully!")
    }, 1500)
  }

  const handleDisconnectAccount = () => {
    if (confirm("Are you sure you want to disconnect your payment account? This will pause your payouts.")) {
      alert("Payment account disconnected. You can reconnect anytime in Payout Settings.")
    }
  }

  return (
    <CreatorLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-black">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account preferences and settings.</p>
        </div>

        <form onSubmit={handleSave} className="space-y-8">
          {/* Profile Information */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Update Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue={user?.name?.split(" ")[0] || ""} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue={user?.name?.split(" ")[1] || ""} className="mt-1" />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue={user?.email || ""} className="mt-1" />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell your audience about yourself..."
                  defaultValue="Motivational content creator helping people achieve their goals through daily inspiration and practical tools."
                  rows={3}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Change Password
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" className="mt-1" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" minLength={6} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" minLength={6} className="mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Account */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-emerald-50 p-4 rounded-lg">
                <p className="text-sm text-emerald-800 mb-2">
                  <strong>Stripe Account Connected</strong>
                </p>
                <p className="text-sm text-emerald-700">
                  Your earnings will be automatically transferred to your connected Stripe account.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/creator/payout">
                  <Button type="button" variant="outline">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Manage Payout Settings
                  </Button>
                </Link>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDisconnectAccount}
                  className="text-red-600 hover:text-red-700 bg-transparent hover:bg-red-50"
                >
                  Disconnect Account
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email notifications for sales</p>
                    <p className="text-sm text-gray-600">Get notified when someone purchases your products</p>
                  </div>
                  <Switch
                    checked={notifications.emailSales}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, emailSales: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Marketing emails</p>
                    <p className="text-sm text-gray-600">Receive tips and updates about growing your business</p>
                  </div>
                  <Switch
                    checked={notifications.emailMarketing}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, emailMarketing: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push notifications for sales</p>
                    <p className="text-sm text-gray-600">Get instant notifications on your device</p>
                  </div>
                  <Switch
                    checked={notifications.pushSales}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, pushSales: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push marketing notifications</p>
                    <p className="text-sm text-gray-600">Receive promotional updates and tips</p>
                  </div>
                  <Switch
                    checked={notifications.pushMarketing}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, pushMarketing: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8" disabled={isSaving}>
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </CreatorLayout>
  )
}

export default function Settings() {
  return (
    <ProtectedRoute redirectTo="/login">
      <SettingsContent />
    </ProtectedRoute>
  )
}
