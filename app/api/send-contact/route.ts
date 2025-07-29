import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      
      <h3>Message:</h3>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
        ${message.replace(/\n/g, "<br>")}
      </div>
      
      <p style="margin-top: 20px;"><strong>Please respond to this inquiry as soon as possible.</strong></p>
    `

    const data = await resend.emails.send({
      from: "Reagan Electronics <contact@reaganelectronics.com>",
      to: ["rdiscountelectronic@gmail.com"],
      subject: `Contact Form: ${name} - ${email}`,
      html: emailContent,
      replyTo: email,
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error sending contact email:", error)
    return NextResponse.json({ error: "Failed to send contact email" }, { status: 500 })
  }
}
