"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  const [user] = useState({
    name: "Alex Thompson",
    email: "alex@example.com",
    tvtaBalance: 15420,
    portfolioValue: 4626,
    totalInvested: 3500,
    profitLoss: 1126,
    referralRewards: 245,
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-[#1E4038]">
                Trailtiva
              </Link>
              <Badge className="ml-3 bg-[#00A19B] text-white">Member Dashboard</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome back, {user.name}</span>
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">Logout</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Stats */}
      <section className="relative bg-gradient-to-br from-[#1E4038] to-[#00A19B] text-white py-12">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80"
            alt="Investment background"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-white">{user.tvtaBalance.toLocaleString()}</div>
                <div className="text-white/80 text-sm">TVTA Tokens</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-white">${user.portfolioValue.toLocaleString()}</div>
                <div className="text-white/80 text-sm">Portfolio Value</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 opacity-60">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-white/60">---</div>
                <div className="text-white/60 text-sm">Total Profit</div>
                <div className="text-xs text-white/50 mt-1">Coming Soon</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 opacity-60">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-white/60">---</div>
                <div className="text-white/60 text-sm">Referral Rewards</div>
                <div className="text-xs text-white/50 mt-1">Coming Soon</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="marketplace" disabled>
              Marketplace
            </TabsTrigger>
            <TabsTrigger value="referrals" disabled>
              Referrals
            </TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#1E4038]">Recent Transactions</CardTitle>
                  <CardDescription>Your TVTA token purchases</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">TVTA Purchase</div>
                      <div className="text-sm text-gray-600">2 days ago</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#00A19B]">+10,000 TVTA</div>
                      <div className="text-sm text-gray-600">$3,000</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">TVTA Purchase</div>
                      <div className="text-sm text-gray-600">1 week ago</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#00A19B]">+5,420 TVTA</div>
                      <div className="text-sm text-gray-600">$1,626</div>
                    </div>
                  </div>
                  <div className="text-center py-4 text-gray-500 text-sm">
                    Adventure transactions will appear here after platform launch
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-[#1E4038]">Investment Summary</CardTitle>
                  <CardDescription>Your TVTA token holdings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total TVTA Tokens</span>
                      <span className="font-medium">{user.tvtaBalance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Token Price</span>
                      <span className="font-medium">$0.30</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Portfolio Value</span>
                      <span className="font-medium">${user.portfolioValue.toLocaleString()}</span>
                    </div>
                    <div className="pt-4 space-y-2">
                      <Button className="w-full bg-[#00A19B] hover:bg-[#00A19B]/90">Buy More TVTA</Button>
                      <div className="text-center text-sm text-gray-500 mt-2">
                        Adventure marketplace launches January 2026
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="marketplace" className="space-y-6">
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#1E4038] mb-4">Adventure Marketplace Coming Soon</h3>
                <p className="text-gray-600 mb-6">
                  The wholesale adventure marketplace will launch in January 2026. Early investors like you will get
                  first access to the best deals.
                </p>
                <Badge className="bg-[#00A19B] text-white px-4 py-2">🎯 Platform Launch: January 2026</Badge>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="referrals" className="space-y-6">
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#1E4038] mb-4">Referral Program Coming Soon</h3>
                <p className="text-gray-600 mb-6">
                  Earn 5% rewards for every friend you invite. The referral system will be activated when the platform
                  launches.
                </p>
                <Badge className="bg-[#00A19B] text-white px-4 py-2">🎯 Referrals Active: January 2026</Badge>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
