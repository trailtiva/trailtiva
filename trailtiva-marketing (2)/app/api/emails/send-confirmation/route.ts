import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { paymentId, userEmail, userName, usdAmount, tvtaAmount, transactionHash } = body

    const emailContent = {
      from: "Trailtiva Support <onboarding@resend.dev>",
      to: userEmail,
      subject: "TVTA Token Purchase Confirmation - Payment Received",
      headers: {
        "X-Entity-Ref-ID": paymentId.toString(),
      },
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1E4038 0%, #00A19B 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Trailtiva</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Adventure Investment Platform</p>
          </div>
          
          <div style="padding: 30px; background: white;">
            <h2 style="color: #1E4038; margin-bottom: 20px;">Payment Confirmation</h2>
            
            <p>Dear ${userName},</p>
            
            <p>Thank you for your TVTA token purchase! We've received your payment details and are now verifying your transaction.</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1E4038; margin-top: 0;">Purchase Details:</h3>
              <p><strong>Investment Amount:</strong> $${usdAmount}</p>
              <p><strong>TVTA Tokens:</strong> ${Number.parseInt(tvtaAmount).toLocaleString()}</p>
              <p><strong>Transaction Hash:</strong> <code style="font-size: 12px; background: #e9ecef; padding: 2px 4px; border-radius: 3px;">${transactionHash}</code></p>
              <p><strong>Status:</strong> <span style="color: #00A19B; font-weight: bold;">Pending Verification</span></p>
            </div>
            
            <h3 style="color: #1E4038;">What happens next:</h3>
            <ul style="color: #666; line-height: 1.6;">
              <li>Our team will verify your USDT payment on the blockchain (usually within 24 hours)</li>
              <li>Once verified, your TVTA tokens will be allocated to your account</li>
              <li>You'll receive another email confirmation when tokens are available</li>
              <li>You can track your investment in your member dashboard</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${request.nextUrl.origin}/dashboard" 
                 style="background: #00A19B; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                View Dashboard
              </a>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              If you have any questions, please contact our support team. Thank you for joining the adventure economy revolution!
            </p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px;">
            <p>© 2024 Trailtiva. Building the future of adventure investing.</p>
          </div>
        </div>
      `,
    }

    // Send actual email via Resend
    try {
      const emailResult = await resend.emails.send(emailContent)
      console.log("Email sent successfully:", emailResult)

      // Log successful email to database
      await supabase.from("email_logs").insert({
        payment_id: paymentId,
        recipient_email: userEmail,
        email_type: "payment_confirmation",
        subject: emailContent.subject,
        status: "sent",
      })

      return NextResponse.json({
        success: true,
        message: "Confirmation email sent successfully",
        emailId: emailResult.data?.id,
      })
    } catch (emailError) {
      console.error("Resend email error:", emailError)

      // Log failed email to database
      await supabase.from("email_logs").insert({
        payment_id: paymentId,
        recipient_email: userEmail,
        email_type: "payment_confirmation",
        subject: emailContent.subject,
        status: "failed",
      })

      return NextResponse.json({
        success: false,
        message: "Failed to send email",
        error: emailError,
      })
    }
  } catch (error) {
    console.error("Email send error:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
