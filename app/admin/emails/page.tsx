"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Payment {
  id: number
  user_name: string
  user_email: string
  usd_amount: number
  tvta_amount: number
  status: string
  created_at: string
  transaction_hash?: string
  notes?: string
}

interface EmailTemplate {
  type: string
  subject: string
  content: string
}

export default function EmailManagementPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [emailType, setEmailType] = useState<"confirmation" | "approval">("confirmation")
  const [customSubject, setCustomSubject] = useState("")
  const [customContent, setCustomContent] = useState("")
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  const [emailTemplates, setEmailTemplates] = useState<any>({})
  const [allTemplates, setAllTemplates] = useState<any[]>([])

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (user) {
      fetchPayments()
      fetchTemplates()
    }
  }, [user])

  const fetchTemplates = async () => {
    try {
      const token = localStorage.getItem("admin_token")
      const response = await fetch("/api/admin/email-templates", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        const data = await response.json()
        setAllTemplates(data.templates)

        // Convert to the format expected by the component
        const templatesMap = {}
        data.templates.forEach((template) => {
          const key =
            template.template_type === "payment_confirmation"
              ? "confirmation"
              : template.template_type === "payment_approved"
                ? "approval"
                : template.template_type
          templatesMap[key] = {
            subject: template.subject,
            content: template.content,
            variables: template.variables,
          }
        })
        setEmailTemplates(templatesMap)
      }
    } catch (error) {
      console.error("Error fetching templates:", error)
    }
  }

  useEffect(() => {
    if (emailTemplates && emailTemplates[emailType]) {
      setCustomSubject(emailTemplates[emailType].subject || "")
      setCustomContent(emailTemplates[emailType].content || "")
    }
  }, [emailType, emailTemplates])

  const checkAuth = async () => {
    const token = localStorage.getItem("admin_token")
    if (!token) {
      router.push("/admin/login")
      return
    }

    try {
      const response = await fetch("/api/admin/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        router.push("/admin/login")
      }
    } catch (error) {
      router.push("/admin/login")
    }
  }

  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem("admin_token")
      const response = await fetch("/api/admin/payments", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        const data = await response.json()
        setPayments(data.payments)
      }
    } catch (error) {
      console.error("Error fetching payments:", error)
    }
  }

  const generateEmailContent = (payment: Payment) => {
    if (!payment || !emailTemplates[emailType]) return ""

    const dashboardLink = `${window.location.origin}/dashboard`
    const websiteLink = window.location.origin

    return customContent
      .replace(/\[USER_NAME\]/g, payment.user_name)
      .replace(/\[USD_AMOUNT\]/g, payment.usd_amount.toString())
      .replace(/\[TVTA_AMOUNT\]/g, payment.tvta_amount.toLocaleString())
      .replace(/\[TRANSACTION_HASH\]/g, payment.transaction_hash || "N/A")
      .replace(/\[DASHBOARD_LINK\]/g, dashboardLink)
      .replace(/\[WEBSITE_LINK\]/g, websiteLink)
      .replace(/\[REJECTION_REASON\]/g, payment.notes || "Please contact support for details")
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Copied to clipboard!")
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

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-[#1E4038]">Email Management</h1>
              <Badge className="ml-3 bg-[#00A19B] text-white">Manual Email System</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => router.push("/admin")}>
                Back to Admin
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="send" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="send">Send Emails</TabsTrigger>
            <TabsTrigger value="templates">Email Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="send" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Payment Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Select Payment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                  {payments.map((payment) => (
                    <div
                      key={payment.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedPayment?.id === payment.id
                          ? "border-[#00A19B] bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedPayment(payment)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{payment.user_name}</div>
                          <div className="text-sm text-gray-600">{payment.user_email}</div>
                          <div className="text-sm">
                            ${payment.usd_amount} • {payment.tvta_amount.toLocaleString()} TVTA
                          </div>
                        </div>
                        <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Email Composer */}
              <Card>
                <CardHeader>
                  <CardTitle>Compose Email</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email Type</Label>
                    <div className="flex gap-2">
                      <Button
                        variant={emailType === "confirmation" ? "default" : "outline"}
                        onClick={() => setEmailType("confirmation")}
                        className="flex-1"
                      >
                        Confirmation
                      </Button>
                      <Button
                        variant={emailType === "approval" ? "default" : "outline"}
                        onClick={() => setEmailType("approval")}
                        className="flex-1"
                      >
                        Approval
                      </Button>
                    </div>
                  </div>

                  {selectedPayment && (
                    <>
                      <div className="space-y-2">
                        <Label>To</Label>
                        <Input value={selectedPayment.user_email} disabled />
                      </div>

                      <div className="space-y-2">
                        <Label>Subject</Label>
                        <Input value={customSubject} onChange={(e) => setCustomSubject(e.target.value)} />
                      </div>

                      <div className="space-y-2">
                        <Label>Email Content</Label>
                        <Textarea
                          value={generateEmailContent(selectedPayment)}
                          readOnly
                          rows={12}
                          className="font-mono text-sm"
                        />
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">📧 Ready to Send</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          Copy the email content above and send it manually from admin@trailtiva.com
                        </p>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => copyToClipboard(generateEmailContent(selectedPayment))}
                            className="bg-[#00A19B] hover:bg-[#00A19B]/90"
                          >
                            📋 Copy Email Content
                          </Button>
                          <Button onClick={() => copyToClipboard(selectedPayment.user_email)} variant="outline">
                            📧 Copy Email Address
                          </Button>
                        </div>
                      </div>
                    </>
                  )}

                  {!selectedPayment && (
                    <div className="text-center py-8 text-gray-500">Select a payment to compose email</div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Confirmation Email Template</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>Subject</Label>
                      <Input value={emailTemplates?.confirmation?.subject || ""} disabled />
                    </div>
                    <div>
                      <Label>Content</Label>
                      <Textarea
                        value={emailTemplates?.confirmation?.content || ""}
                        rows={15}
                        disabled
                        className="font-mono text-sm"
                      />
                    </div>
                    <Button
                      onClick={() => copyToClipboard(emailTemplates?.confirmation?.content || "")}
                      variant="outline"
                      className="w-full"
                    >
                      Copy Template
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Approval Email Template</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>Subject</Label>
                      <Input value={emailTemplates?.approval?.subject || ""} disabled />
                    </div>
                    <div>
                      <Label>Content</Label>
                      <Textarea
                        value={emailTemplates?.approval?.content || ""}
                        rows={15}
                        disabled
                        className="font-mono text-sm"
                      />
                    </div>
                    <Button
                      onClick={() => copyToClipboard(emailTemplates?.approval?.content || "")}
                      variant="outline"
                      className="w-full"
                    >
                      Copy Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>📧 How to Use Manual Email System</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Step-by-Step Process:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li>Go to "Send Emails" tab</li>
                      <li>Select a payment from the list</li>
                      <li>Choose email type (Confirmation or Approval)</li>
                      <li>Click "Copy Email Content" to copy the personalized email</li>
                      <li>Click "Copy Email Address" to copy the recipient's email</li>
                      <li>Open your email client (Gmail, Outlook, etc.)</li>
                      <li>
                        Send from: <strong>admin@trailtiva.com</strong>
                      </li>
                      <li>Paste the recipient email and content</li>
                      <li>Send the email manually</li>
                    </ol>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">✅ Benefits:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>100% delivery rate - no spam issues</li>
                      <li>Personal touch from admin@trailtiva.com</li>
                      <li>Full control over email content</li>
                      <li>No dependency on external email services</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>✏️ Edit Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {allTemplates.map((template) => (
                      <div key={template.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{template.template_type}</h4>
                          <Badge variant="outline">{template.variables?.length || 0} variables</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Variables: {template.variables?.join(", ") || "None"}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setCustomSubject(template.subject)
                            setCustomContent(template.content)
                          }}
                        >
                          Load Template
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
