import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { paymentId, userEmail, userName, tvtaAmount } = body

    const emailContent = {
      from: "Trailtiva Support <onboarding@resend.dev>",
      to: userEmail,
      subject: "🎉 TVTA Tokens Approved - Welcome to Trailtiva!",
      headers: {
        "X-Entity-Ref-ID": paymentId.toString(),
      },
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1E4038 0%, #00A19B 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Payment Verified!</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Your TVTA tokens are now active</p>
          </div>
          
          <div style="padding: 30px; background: white;">
            <h2 style="color: #1E4038; margin-bottom: 20px;">Congratulations ${userName}!</h2>
            
            <p>Your payment has been successfully verified and your TVTA tokens are now active in your account.</p>
            
            <div style="background: linear-gradient(135deg, #00A19B 0%, #17B18C 100%); padding: 25px; border-radius: 12px; margin: 25px 0; text-align: center;">
              <h3 style="color: white; margin: 0 0 10px 0; font-size: 24px;">${Number.parseInt(tvtaAmount).toLocaleString()} TVTA</h3>
              <p style="color: white; margin: 0; opacity: 0.9;">Tokens Successfully Allocated</p>
            </div>
            
            <h3 style="color: #1E4038;">What you can do now:</h3>
            <ul style="color: #666; line-height: 1.6;">
              <li><strong>Access your dashboard</strong> - View your token balance and portfolio</li>
              <li><strong>Refer friends</strong> - Earn 5% rewards on their purchases</li>
              <li><strong>Stay updated</strong> - Get exclusive early investor updates</li>
              <li><strong>Prepare for launch</strong> - Platform goes live January 2026</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${request.nextUrl.origin}/dashboard" 
                 style="background: #00A19B; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
                🚀 View Your Dashboard
              </a>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h4 style="color: #1E4038; margin-top: 0;">🎯 Next Steps:</h4>
              <p style="color: #666; margin: 0;">Keep an eye out for platform updates as we approach our January 2026 launch. Early investors like you will get first access to the best adventure deals!</p>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              Welcome to the future of adventure investing! If you have any questions, our team is here to help.
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
      console.log("Approval email sent successfully:", emailResult)

      // Log successful email to database
      await supabase.from("email_logs").insert({
        payment_id: paymentId,
        recipient_email: userEmail,
        email_type: "payment_approved",
        subject: emailContent.subject,
        status: "sent",
      })

      return NextResponse.json({
        success: true,
        message: "Approval email sent successfully",
        emailId: emailResult.data?.id,
      })
    } catch (emailError) {
      console.error("Resend approval email error:", emailError)

      // Log failed email to database
      await supabase.from("email_logs").insert({
        payment_id: paymentId,
        recipient_email: userEmail,
        email_type: "payment_approved",
        subject: emailContent.subject,
        status: "failed",
      })

      return NextResponse.json({
        success: false,
        message: "Failed to send approval email",
        error: emailError,
      })
    }
  } catch (error) {
    console.error("Approval email send error:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
