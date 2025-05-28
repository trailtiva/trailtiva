"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function PurchasePage() {
  const [usdAmount, setUsdAmount] = useState("")
  const [tvtaAmount, setTvtaAmount] = useState("")
  const [usdtAmount, setUsdtAmount] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [transactionHash, setTransactionHash] = useState("")
  const [step, setStep] = useState(1)
  const [copied, setCopied] = useState(false)
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const TVTA_PRICE = 0.3
  const WALLET_ADDRESS = "0x742d35Cc6634C0532925a3b8D4C9db96590c6C8C"

  useEffect(() => {
    if (usdAmount) {
      const tvta = Math.floor(Number.parseFloat(usdAmount) / TVTA_PRICE)
      const usdt = Number.parseFloat(usdAmount)
      setTvtaAmount(tvta.toString())
      setUsdtAmount(usdt.toFixed(2))
    }
  }, [usdAmount])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmitPayment = async () => {
    if (transactionHash && walletAddress && userName && userEmail) {
      setIsSubmitting(true)
      try {
        const response = await fetch("/api/payments/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName,
            userEmail,
            usdAmount,
            tvtaAmount,
            usdtAmount,
            walletAddress,
            transactionHash,
          }),
        })

        if (response.ok) {
          setStep(4)
        } else {
          alert("Error submitting payment. Please try again.")
        }
      } catch (error) {
        alert("Error submitting payment. Please try again.")
      } finally {
        setIsSubmitting(false)
      }
    }
  }

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
              <Badge className="ml-3 bg-[#00A19B] text-white">Token Purchase</Badge>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1E4038] to-[#00A19B] text-white py-12">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80"
            alt="Investment background"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Purchase TVTA Tokens</h1>
          <p className="text-xl text-white/90 mb-6">Secure your position in the adventure economy revolution</p>
          <div className="flex justify-center items-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#00A19B]">$0.30</div>
              <div className="text-white/80 text-sm">Current Price</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#00A19B]">$0.35</div>
              <div className="text-white/80 text-sm">Next Tier Price</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#00A19B]">3.3M</div>
              <div className="text-white/80 text-sm">Tokens Left</div>
            </div>
          </div>
        </div>
      </section>

      {/* Purchase Flow */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? "bg-[#00A19B] text-white" : "bg-gray-200 text-gray-600"}`}
            >
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? "bg-[#00A19B]" : "bg-gray-200"}`}></div>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? "bg-[#00A19B] text-white" : "bg-gray-200 text-gray-600"}`}
            >
              2
            </div>
            <div className={`w-16 h-1 ${step >= 3 ? "bg-[#00A19B]" : "bg-gray-200"}`}></div>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? "bg-[#00A19B] text-white" : "bg-gray-200 text-gray-600"}`}
            >
              3
            </div>
            <div className={`w-16 h-1 ${step >= 4 ? "bg-[#00A19B]" : "bg-gray-200"}`}></div>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 4 ? "bg-[#00A19B] text-white" : "bg-gray-200 text-gray-600"}`}
            >
              4
            </div>
          </div>
        </div>

        {/* Step 1: Amount Selection */}
        {step === 1 && (
          <div className="space-y-8">
            {/* Wallet Compatibility Section */}
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-[#1E4038]">💳 Supported Payment Methods</CardTitle>
                <CardDescription>Choose your preferred way to pay with USDT</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-[#1E4038]">✅ Recommended Wallets</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#00A19B] rounded-full"></span>
                        <span>
                          <strong>Trust Wallet</strong> - Easiest for beginners
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#00A19B] rounded-full"></span>
                        <span>
                          <strong>MetaMask</strong> - Most popular
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#00A19B] rounded-full"></span>
                        <span>
                          <strong>Coinbase Wallet</strong> - User-friendly
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#00A19B] rounded-full"></span>
                        <span>
                          <strong>Rainbow Wallet</strong> - Modern interface
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-[#1E4038]">🏦 From Exchanges</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#00A19B] rounded-full"></span>
                        <span>
                          <strong>Binance</strong> - Withdraw USDT to Polygon
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#00A19B] rounded-full"></span>
                        <span>
                          <strong>KuCoin</strong> - Supports Polygon network
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#00A19B] rounded-full"></span>
                        <span>
                          <strong>Gate.io</strong> - Low withdrawal fees
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#00A19B] rounded-full"></span>
                        <span>
                          <strong>OKX</strong> - Multiple networks
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <Alert>
                  <AlertDescription>
                    <strong>Important:</strong> Make sure your wallet or exchange supports{" "}
                    <strong>Polygon network</strong>. This saves you 99% on transaction fees compared to Ethereum!
                  </AlertDescription>
                </Alert>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">💡 New to Crypto?</h4>
                  <p className="text-sm text-green-700 mb-2">
                    <strong>Easiest option:</strong> Download Trust Wallet app → Buy USDT → Send to our address
                  </p>
                  <p className="text-xs text-green-600">
                    Trust Wallet automatically uses Polygon network for lower fees
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Amount Selection */}
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-[#1E4038]">Select Purchase Amount</CardTitle>
                <CardDescription>Choose how much you want to invest in TVTA tokens</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="usd-amount">Investment Amount (USD)</Label>
                  <Input
                    id="usd-amount"
                    type="number"
                    placeholder="100"
                    value={usdAmount}
                    onChange={(e) => setUsdAmount(e.target.value)}
                    className="text-lg"
                  />
                </div>

                {usdAmount && (
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span>TVTA Tokens:</span>
                      <span className="font-bold text-[#00A19B]">{Number.parseInt(tvtaAmount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Price per Token:</span>
                      <span>${TVTA_PRICE}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>USDT Required:</span>
                      <span className="font-bold">{usdtAmount} USDT</span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-4">
                  <Button variant="outline" onClick={() => setUsdAmount("100")} className="p-4 h-auto flex-col">
                    <div className="font-bold">$100</div>
                    <div className="text-sm text-gray-600">333 TVTA</div>
                  </Button>
                  <Button variant="outline" onClick={() => setUsdAmount("500")} className="p-4 h-auto flex-col">
                    <div className="font-bold">$500</div>
                    <div className="text-sm text-gray-600">1,666 TVTA</div>
                  </Button>
                  <Button variant="outline" onClick={() => setUsdAmount("1000")} className="p-4 h-auto flex-col">
                    <div className="font-bold">$1,000</div>
                    <div className="text-sm text-gray-600">3,333 TVTA</div>
                  </Button>
                </div>

                <Button
                  className="w-full bg-[#00A19B] hover:bg-[#00A19B]/90"
                  onClick={() => setStep(2)}
                  disabled={!usdAmount || Number.parseFloat(usdAmount) < 100}
                >
                  Continue to Payment
                </Button>

                {usdAmount && Number.parseFloat(usdAmount) < 100 && (
                  <Alert>
                    <AlertDescription>Minimum purchase amount is $100</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Payment Instructions */}
        {step === 2 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-[#1E4038]">Send USDT Payment</CardTitle>
              <CardDescription>Send exactly {usdtAmount} USDT to the address below</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <AlertDescription>
                  <strong>Important:</strong> Only send USDT on Polygon network. Other networks will result in loss of
                  funds.
                </AlertDescription>
              </Alert>

              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Payment Amount</Label>
                  <div className="text-2xl font-bold text-[#00A19B]">{usdtAmount} USDT</div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600">Wallet Address</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="flex-1 p-3 bg-white border rounded text-sm break-all">{WALLET_ADDRESS}</code>
                    <Button
                      size="sm"
                      onClick={() => copyToClipboard(WALLET_ADDRESS)}
                      className="bg-[#00A19B] hover:bg-[#00A19B]/90"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600">Network</Label>
                  <div className="text-lg font-medium">Polygon Network</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Payment Instructions:</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                  <li>Copy the wallet address above</li>
                  <li>Open your crypto wallet (Trust Wallet, MetaMask, etc.)</li>
                  <li>Make sure you're on Polygon network</li>
                  <li>
                    Send exactly <strong>{usdtAmount} USDT</strong> to the address
                  </li>
                  <li>Save your transaction hash for the next step</li>
                </ol>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">📱 From Mobile Wallet</h4>
                  <p className="text-sm text-blue-700">Open app → Send → Paste address → Enter amount → Confirm</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">🏦 From Exchange</h4>
                  <p className="text-sm text-green-700">Withdraw → Select Polygon network → Paste address → Confirm</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button className="flex-1 bg-[#00A19B] hover:bg-[#00A19B]/90" onClick={() => setStep(3)}>
                  I've Sent the Payment
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Verify Payment */}
        {step === 3 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-[#1E4038]">Verify Your Payment</CardTitle>
              <CardDescription>Please provide your payment details for verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="user-name">Your Name</Label>
                <Input
                  id="user-name"
                  placeholder="John Doe"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="user-email">Your Email</Label>
                <Input
                  id="user-email"
                  type="email"
                  placeholder="john@example.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
                <p className="text-sm text-gray-600">We'll send confirmation to this email</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="wallet-address">Your Wallet Address</Label>
                <Input
                  id="wallet-address"
                  placeholder="0x..."
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                />
                <p className="text-sm text-gray-600">The wallet address you sent USDT from</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tx-hash">Transaction Hash</Label>
                <Input
                  id="tx-hash"
                  placeholder="0x..."
                  value={transactionHash}
                  onChange={(e) => setTransactionHash(e.target.value)}
                />
                <p className="text-sm text-gray-600">The transaction hash from your USDT transfer</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Order Summary:</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>USDT Sent:</span>
                    <span>{usdtAmount} USDT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TVTA Tokens:</span>
                    <span>{Number.parseInt(tvtaAmount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price per Token:</span>
                    <span>${TVTA_PRICE}</span>
                  </div>
                </div>
              </div>

              <Button
                className="flex-1 bg-[#00A19B] hover:bg-[#00A19B]/90"
                onClick={handleSubmitPayment}
                disabled={!walletAddress || !transactionHash || !userName || !userEmail || isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit for Verification"}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-[#1E4038]">Payment Submitted!</CardTitle>
              <CardDescription>Your TVTA token purchase is being processed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Thank you for your purchase!</h3>
                <p className="text-gray-600">
                  We've received your payment details and will verify your transaction within 24 hours.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg text-left">
                <h4 className="font-medium mb-2">What happens next:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• We verify your USDT payment on the blockchain</li>
                  <li>• Your TVTA tokens are allocated to your account</li>
                  <li>• You'll receive an email confirmation</li>
                  <li>• Tokens will be available in your dashboard</li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" asChild className="flex-1">
                  <Link href="/">Back to Home</Link>
                </Button>
                <Button asChild className="flex-1 bg-[#00A19B] hover:bg-[#00A19B]/90">
                  <Link href="/dashboard">View Dashboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
