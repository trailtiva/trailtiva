"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface Payment {
  id: number
  user_name: string
  user_email: string
  usd_amount: number
  tvta_amount: number
  usdt_amount: number
  wallet_address: string
  transaction_hash: string
  status: string
  created_at: string
  verified_at?: string
  verified_by?: string
  notes?: string
}

interface User {
  email: string
  name: string
  role: string
}

export default function AdminDashboard() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [notes, setNotes] = useState("")
  const [processing, setProcessing] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (user) {
      fetchPayments()
    }
  }, [user])

  const checkAuth = async () => {
    const token = localStorage.getItem("admin_token")

    if (!token) {
      router.push("/admin/login")
      return
    }

    try {
      const response = await fetch("/api/admin/auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        localStorage.removeItem("admin_token")
        router.push("/admin/login")
      }
    } catch (error) {
      localStorage.removeItem("admin_token")
      router.push("/admin/login")
    } finally {
      setAuthLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("admin_token")
    router.push("/admin/login")
  }

  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem("admin_token")
      const response = await fetch("/api/admin/payments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setPayments(data.payments)
      }
    } catch (error) {
      console.error("Error fetching payments:", error)
    } finally {
      setLoading(false)
    }
  }

  const updatePaymentStatus = async (paymentId: number, status: string) => {
    setProcessing(true)
    try {
      const token = localStorage.getItem("admin_token")
      const response = await fetch("/api/admin/payments/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          paymentId,
          status,
          notes,
          verifiedBy: user?.email,
        }),
      })

      if (response.ok) {
        await fetchPayments()
        setSelectedPayment(null)
        setNotes("")
      }
    } catch (error) {
      console.error("Error updating payment:", error)
    } finally {
      setProcessing(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "verified":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00A19B] mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  const pendingPayments = payments.filter((p) => p.status === "pending")
  const verifiedPayments = payments.filter((p) => p.status === "verified")
  const rejectedPayments = payments.filter((p) => p.status === "rejected")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-[#1E4038]">Trailtiva Admin</h1>
              <Badge className="ml-3 bg-[#00A19B] text-white">Payment Verification</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome, <strong>{user.name}</strong>
              </div>
              <div className="text-sm text-gray-500">{pendingPayments.length} pending</div>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="relative bg-gradient-to-br from-[#1E4038] to-[#00A19B] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-white">{pendingPayments.length}</div>
                <div className="text-white/80 text-sm">Pending</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-white">{verifiedPayments.length}</div>
                <div className="text-white/80 text-sm">Verified</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-white">
                  ${verifiedPayments.reduce((sum, p) => sum + Number(p.usd_amount), 0).toLocaleString()}
                </div>
                <div className="text-white/80 text-sm">Total Verified</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-white">
                  {verifiedPayments.reduce((sum, p) => sum + p.tvta_amount, 0).toLocaleString()}
                </div>
                <div className="text-white/80 text-sm">TVTA Allocated</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">Pending ({pendingPayments.length})</TabsTrigger>
            <TabsTrigger value="verified">Verified ({verifiedPayments.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedPayments.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {loading ? (
              <div className="text-center py-8">Loading payments...</div>
            ) : pendingPayments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No pending payments</div>
            ) : (
              pendingPayments.map((payment) => (
                <Card key={payment.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg">{payment.user_name}</h3>
                          <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                        </div>
                        <p className="text-gray-600">{payment.user_email}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Amount:</span> ${payment.usd_amount}
                          </div>
                          <div>
                            <span className="text-gray-500">TVTA:</span> {payment.tvta_amount.toLocaleString()}
                          </div>
                          <div>
                            <span className="text-gray-500">Wallet:</span>
                            <code className="text-xs ml-1">{payment.wallet_address.slice(0, 10)}...</code>
                          </div>
                          <div>
                            <span className="text-gray-500">Date:</span>{" "}
                            {new Date(payment.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            onClick={() => setSelectedPayment(payment)}
                            className="bg-[#00A19B] hover:bg-[#00A19B]/90"
                          >
                            Review
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Payment Verification</DialogTitle>
                            <DialogDescription>Review and verify this TVTA token purchase</DialogDescription>
                          </DialogHeader>
                          {selectedPayment && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium">Customer</Label>
                                  <p className="text-lg">{selectedPayment.user_name}</p>
                                  <p className="text-gray-600">{selectedPayment.user_email}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Purchase Amount</Label>
                                  <p className="text-lg">${selectedPayment.usd_amount}</p>
                                  <p className="text-gray-600">{selectedPayment.tvta_amount.toLocaleString()} TVTA</p>
                                </div>
                              </div>

                              <div>
                                <Label className="text-sm font-medium">Wallet Address</Label>
                                <code className="block p-2 bg-gray-100 rounded text-sm break-all">
                                  {selectedPayment.wallet_address}
                                </code>
                              </div>

                              <div>
                                <Label className="text-sm font-medium">Transaction Hash</Label>
                                <code className="block p-2 bg-gray-100 rounded text-sm break-all">
                                  {selectedPayment.transaction_hash}
                                </code>
                                <a
                                  href={`https://polygonscan.com/tx/${selectedPayment.transaction_hash}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#00A19B] text-sm hover:underline"
                                >
                                  View on PolygonScan →
                                </a>
                              </div>

                              <div>
                                <Label htmlFor="notes">Admin Notes</Label>
                                <Textarea
                                  id="notes"
                                  placeholder="Add verification notes..."
                                  value={notes}
                                  onChange={(e) => setNotes(e.target.value)}
                                />
                              </div>

                              <div className="flex gap-3">
                                <Button
                                  onClick={() => updatePaymentStatus(selectedPayment.id, "verified")}
                                  disabled={processing}
                                  className="flex-1 bg-green-600 hover:bg-green-700"
                                >
                                  {processing ? "Processing..." : "Verify & Approve"}
                                </Button>
                                <Button
                                  onClick={() => updatePaymentStatus(selectedPayment.id, "rejected")}
                                  disabled={processing}
                                  variant="destructive"
                                  className="flex-1"
                                >
                                  {processing ? "Processing..." : "Reject"}
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="verified" className="space-y-4">
            {verifiedPayments.map((payment) => (
              <Card key={payment.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">{payment.user_name}</h3>
                        <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                      </div>
                      <p className="text-gray-600">{payment.user_email}</p>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Amount:</span> ${payment.usd_amount}
                        </div>
                        <div>
                          <span className="text-gray-500">TVTA:</span> {payment.tvta_amount.toLocaleString()}
                        </div>
                        <div>
                          <span className="text-gray-500">Verified:</span>{" "}
                          {payment.verified_at ? new Date(payment.verified_at).toLocaleDateString() : "N/A"}
                        </div>
                      </div>
                      {payment.notes && <p className="text-sm text-gray-600 italic">Notes: {payment.notes}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            {rejectedPayments.map((payment) => (
              <Card key={payment.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">{payment.user_name}</h3>
                        <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                      </div>
                      <p className="text-gray-600">{payment.user_email}</p>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Amount:</span> ${payment.usd_amount}
                        </div>
                        <div>
                          <span className="text-gray-500">TVTA:</span> {payment.tvta_amount.toLocaleString()}
                        </div>
                        <div>
                          <span className="text-gray-500">Rejected:</span>{" "}
                          {payment.verified_at ? new Date(payment.verified_at).toLocaleDateString() : "N/A"}
                        </div>
                      </div>
                      {payment.notes && <p className="text-sm text-red-600 italic">Reason: {payment.notes}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
