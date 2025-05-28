import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = body

    if (!token) {
      return NextResponse.json({ error: "Token required" }, { status: 400 })
    }

    try {
      // Decode simple token
      const decoded = JSON.parse(Buffer.from(token, "base64").toString())

      // Check if token is expired
      if (Date.now() > decoded.exp) {
        return NextResponse.json({ error: "Token expired" }, { status: 401 })
      }

      return NextResponse.json({
        success: true,
        user: {
          email: decoded.email,
          name: decoded.name,
          role: decoded.role,
        },
      })
    } catch (decodeError) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }
  } catch (error) {
    console.error("Token verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
