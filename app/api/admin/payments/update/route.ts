import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { paymentId, status, notes, verifiedBy } = body

    // Update payment status
    const { data: payment, error: updateError } = await supabase
      .from("payments")
      .update({
        status,
        notes,
        verified_by: verifiedBy,
        verified_at: new Date().toISOString(),
      })
      .eq("id", paymentId)
      .select()
      .single()

    if (updateError) {
      console.error("Update error:", updateError)
      return NextResponse.json({ error: "Failed to update payment" }, { status: 500 })
    }

    // Send email notification to user
    if (status === "verified") {
      try {
        await fetch(`${request.nextUrl.origin}/api/emails/send-approval`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentId,
            userEmail: payment.user_email,
            userName: payment.user_name,
            tvtaAmount: payment.tvta_amount,
          }),
        })
      } catch (emailError) {
        console.error("Email send error:", emailError)
      }
    }

    return NextResponse.json({
      success: true,
      message: `Payment ${status} successfully`,
    })
  } catch (error) {
    console.error("Payment update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
