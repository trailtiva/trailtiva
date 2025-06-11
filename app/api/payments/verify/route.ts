import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userName, userEmail, usdAmount, tvtaAmount, usdtAmount, walletAddress, transactionHash } = body

    // Validate required fields
    if (!userName || !userEmail || !usdAmount || !tvtaAmount || !walletAddress || !transactionHash) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Insert payment record
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .insert({
        user_name: userName,
        user_email: userEmail,
        usd_amount: Number.parseFloat(usdAmount),
        tvta_amount: Number.parseInt(tvtaAmount),
        usdt_amount: Number.parseFloat(usdtAmount),
        wallet_address: walletAddress,
        transaction_hash: transactionHash,
        status: "pending",
      })
      .select()
      .single()

    if (paymentError) {
      console.error("Payment insert error:", paymentError)
      return NextResponse.json({ error: "Failed to save payment" }, { status: 500 })
    }

    // Send confirmation email
    try {
      await fetch(`${request.nextUrl.origin}/api/emails/send-confirmation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentId: payment.id,
          userEmail,
          userName,
          usdAmount,
          tvtaAmount,
          transactionHash,
        }),
      })
    } catch (emailError) {
      console.error("Email send error:", emailError)
      // Don't fail the payment if email fails
    }

    return NextResponse.json({
      success: true,
      paymentId: payment.id,
      message: "Payment submitted for verification",
    })
  } catch (error) {
    console.error("Payment verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
