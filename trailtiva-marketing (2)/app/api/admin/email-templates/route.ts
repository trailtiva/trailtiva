import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(request: NextRequest) {
  try {
    const { data: templates, error } = await supabase.from("email_templates").select("*").order("template_type")

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch templates" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      templates: templates || [],
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, subject, content } = body

    const { data: template, error } = await supabase
      .from("email_templates")
      .update({
        subject,
        content,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Update error:", error)
      return NextResponse.json({ error: "Failed to update template" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      template,
      message: "Template updated successfully",
    })
  } catch (error) {
    console.error("Template update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
