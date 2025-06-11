import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    // Demo credentials
    const validCredentials = [
      { email: "admin@trailtiva.com", password: "admin123", name: "Admin User", role: "super_admin" },
      { email: "support@trailtiva.com", password: "support123", name: "Support User", role: "admin" },
    ]

    const user = validCredentials.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Create simple token (base64 encoded user info + timestamp)
    const tokenData = {
      email: user.email,
      name: user.name,
      role: user.role,
      exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    }

    const token = Buffer.from(JSON.stringify(tokenData)).toString("base64")

    return NextResponse.json({
      success: true,
      token,
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
