import { NextResponse } from "next/server"

export async function GET() {
  try {
    const requiredEnvVars = ["RESEND_API_KEY"]

    const missingVars = requiredEnvVars.filter((varName) => !process.env[varName])

    if (missingVars.length > 0) {
      return NextResponse.json(
        {
          error: "Missing environment variables",
          missing: missingVars,
        },
        { status: 400 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "All required environment variables are configured",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to check environment variables" }, { status: 500 })
  }
}
