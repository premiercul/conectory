"use client"

import React from "react"

import type { ReactElement } from "react"

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { CreatorLayout } from "@/components/creator-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Shield, CheckCircle, AlertCircle, ArrowLeft, Banknote, Save } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"

function PayoutSettingsContent(): ReactElement {
  const [isSaving, setIsSaving] = useState(false)
  const [payoutMethod, setPayoutMethod] = useState("bank") // Default to bank transfer
  const [hasBankDetails, setHasBankDetails] = useState(false)
  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    accountNumber: "",
    accountHolderName: "",
    bankCode: "", // SWIFT/BIC or local bank code
  })
  const [error, setError] = useState("") // State for form errors

  // Simulate loading existing bank details
  // In a real app, this would fetch from a backend
  React.useEffect(() => {
    const savedDetails = localStorage.getItem("conectory_bank_details")
    if (savedDetails) {
      try {
        const parsedDetails = JSON.parse(savedDetails)
        setBankDetails(parsedDetails)
        setHasBankDetails(true)
      } catch (e) {
        console.error("Failed to parse bank details from localStorage", e)
        localStorage.removeItem("conectory_bank_details")
      }
    }
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("") // Clear previous errors
    setIsSaving(true)

    // Basic validation for bank details
    if (payoutMethod === "bank") {
      if (!bankDetails.bankName || !bankDetails.accountNumber || !bankDetails.accountHolderName) {
        setError("Please fill in all required bank details: Bank Name, Account Holder Name, and Account Number.")
        setIsSaving(false)
        return
      }
      if (bankDetails.accountNumber.length < 10 || !/^\d+$/.test(bankDetails.accountNumber)) {
        setError("Account Number must be at least 10 digits and contain only numbers.")
        setIsSaving(false)
        return
      }
    }

    // Simulate save process
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      localStorage.setItem("conectory_bank_details", JSON.stringify(bankDetails))
      setHasBankDetails(true)
      alert("Payout settings updated successfully!")
    } catch (err) {
      setError("Failed to save payout settings. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDisconnectBank = () => {
    if (confirm("Are you sure you want to remove your bank account details? This will pause your payouts.")) {
      localStorage.removeItem("conectory_bank_details")
      setBankDetails({
        bankName: "",
        accountNumber: "",
        accountHolderName: "",
        bankCode: "",
      })
      setHasBankDetails(false)
      alert("Bank account details removed successfully.")
    }
  }

  return (
    <CreatorLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/creator/earnings">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Earnings
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-black">Payout Settings</h1>
            <p className="text-gray-600 mt-1">Configure how you receive payments from your sales.</p>
          </div>
        </div>

        {/* Connection Status */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {hasBankDetails ? (
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-500" />
              )}
              Bank Account Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            {hasBankDetails ? (
              <div className="bg-emerald-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-emerald-600" />
                    <div>
                      <p className="font-medium text-emerald-800">Bank Account Connected</p>
                      <p className="text-sm text-emerald-700">
                        {bankDetails.accountHolderName} - {bankDetails.bankName} (***
                        {bankDetails.accountNumber.slice(-4)})
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleDisconnectBank}
                    className="text-red-600 hover:text-red-700 bg-transparent"
                    type="button"
                  >
                    Disconnect
                  </Button>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-emerald-900">Next Payout</p>
                    <p className="text-emerald-700">January 15, 2025</p>
                  </div>
                  <div>
                    <p className="font-medium text-emerald-900">Pending Amount</p>
                    <p className="text-emerald-700">{formatPrice(51000)}</p>
                  </div>
                  <div>
                    <p className="font-medium text-emerald-900">Payout Schedule</p>
                    <p className="text-emerald-700">Weekly</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-amber-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-amber-600" />
                  <div>
                    <p className="font-medium text-amber-800">No Bank Account Connected</p>
                    <p className="text-sm text-amber-700">Add your bank details to receive payouts</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payout Configuration */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Banknote className="w-5 h-5" />
              Payout Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="payoutMethod">Payout Method</Label>
                <Select value={payoutMethod} onValueChange={setPayoutMethod} disabled={isSaving}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Direct Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {payoutMethod === "bank" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      placeholder="e.g., Zenith Bank"
                      value={bankDetails.bankName}
                      onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                      required
                      className="mt-1"
                      disabled={isSaving}
                    />
                  </div>
                  <div>
                    <Label htmlFor="accountHolderName">Account Holder Name</Label>
                    <Input
                      id="accountHolderName"
                      placeholder="e.g., John Doe"
                      value={bankDetails.accountHolderName}
                      onChange={(e) => setBankDetails({ ...bankDetails, accountHolderName: e.target.value })}
                      required
                      className="mt-1"
                      disabled={isSaving}
                    />
                  </div>
                  <div>
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      id="accountNumber"
                      placeholder="e.g., 0123456789"
                      value={bankDetails.accountNumber}
                      onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                      required
                      className="mt-1"
                      type="text" // Changed to text to allow for more flexible input, validation will handle numbers
                      inputMode="numeric"
                      pattern="[0-9]*"
                      disabled={isSaving}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bankCode">Bank Code / SWIFT (Optional)</Label>
                    <Input
                      id="bankCode"
                      placeholder="e.g., ZEIBNGLA"
                      value={bankDetails.bankCode}
                      onChange={(e) => setBankDetails({ ...bankDetails, bankCode: e.target.value })}
                      className="mt-1"
                      disabled={isSaving}
                    />
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="schedule">Payout Schedule</Label>
                <Select defaultValue="weekly" disabled={isSaving}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily (minimum {formatPrice(10000)})</SelectItem>
                    <SelectItem value="weekly">Weekly (minimum {formatPrice(4000)})</SelectItem>
                    <SelectItem value="monthly">Monthly (minimum {formatPrice(2000)})</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select defaultValue="ngn" disabled={isSaving}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ngn">NGN - Nigerian Naira</SelectItem>
                    <SelectItem value="usd">USD - US Dollar</SelectItem>
                    <SelectItem value="eur">EUR - Euro</SelectItem>
                    <SelectItem value="gbp">GBP - British Pound</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Important Information</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Payouts are processed automatically based on your schedule</li>
                  <li>• A 10% platform fee is deducted from all sales</li>
                  <li>• Ensure your bank details are accurate to avoid payout delays</li>
                  <li>• Minimum payout amounts apply based on schedule</li>
                </ul>
              </div>

              <div className="flex gap-4 pt-6">
                <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white" disabled={isSaving}>
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Saving..." : "Save Settings"}
                </Button>
                <Button type="button" variant="outline" disabled={isSaving}>
                  Test Payout
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Payout History */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Payout History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: "Jan 8, 2025", amount: 57100, status: "Completed", method: "Bank Transfer", id: "po_1234" },
                { date: "Jan 1, 2025", amount: 39400, status: "Completed", method: "Bank Transfer", id: "po_1233" },
                { date: "Dec 25, 2024", amount: 62500, status: "Completed", method: "Bank Transfer", id: "po_1232" },
                { date: "Dec 18, 2024", amount: 81360, status: "Processing", method: "Bank Transfer", id: "po_1231" },
              ].map((payout, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-black">{formatPrice(payout.amount)}</p>
                    <p className="text-sm text-gray-600">
                      {payout.date} • {payout.method} • {payout.id}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        payout.status === "Completed"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {payout.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </CreatorLayout>
  )
}

export default function PayoutSettings() {
  return (
    <ProtectedRoute redirectTo="/login">
      <PayoutSettingsContent />
    </ProtectedRoute>
  )
}
