"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate email sending
    setTimeout(() => {
      setIsSubmitting(false)
      setEmailSent(true)
    }, 1500)
  }

  if (emailSent) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <Card className="bg-white shadow-sm">
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-full mb-4 mx-auto">
                <Mail className="w-8 h-8 text-emerald-500" />
              </div>
              <CardTitle className="text-2xl font-bold text-black">Check Your Email</CardTitle>
              <p className="text-gray-600">We've sent a password reset link to your email address.</p>
            </CardHeader>

            <CardContent className="text-center">
              <p className="text-sm text-gray-600 mb-6">
                Didn't receive the email? Check your spam folder or try again.
              </p>

              <div className="space-y-4">
                <Button onClick={() => setEmailSent(false)} variant="outline" className="w-full bg-transparent">
                  Try Again
                </Button>

                <Link href="/login" className="block">
                  <Button variant="ghost" className="w-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <Card className="bg-white shadow-sm">
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4 mx-auto">
              <Mail className="w-8 h-8 text-blue-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-black">Forgot Password?</CardTitle>
            <p className="text-gray-600">Enter your email address and we'll send you a reset link.</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <Input id="email" type="email" placeholder="Enter your email address" required className="mt-1" />
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </Button>

              <div className="text-center">
                <Link href="/login" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                  <ArrowLeft className="w-4 h-4 inline mr-1" />
                  Back to Login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
