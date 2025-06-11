"use client"
import { useState } from "react"
import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login attempt:", { email, password, rememberMe })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E4038] to-[#00A19B] flex items-center justify-center p-4">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80"
          alt="Luxury investment background"
          fill
          className="object-cover opacity-20"
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-white mb-2">Trailtiva</h1>
            <p className="text-white/80 text-sm">Adventure Investment Platform</p>
          </Link>
        </div>

        {/* Login Card */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-[#1E4038]">Member Login</CardTitle>
            <CardDescription className="text-gray-600">Access your investment dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#1E4038] font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="investor@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-gray-300 focus:border-[#00A19B] focus:ring-[#00A19B]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#1E4038] font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-gray-300 focus:border-[#00A19B] focus:ring-[#00A19B]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#00A19B] hover:bg-[#00A19B]/90 text-white font-medium py-3"
                size="lg"
              >
                Sign In to Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-white/80 text-xs">🔒 Your investment data is protected with bank-level security</p>
        </div>
      </div>
    </div>
  )
}
