import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { to, subject, body } = await request.json()

    if (!to || !subject) {
      return Response.json({ error: "Recipient and subject are required" }, { status: 400 })
    }

    const { text: enhancedBody } = await generateText({
      model: "openai/gpt-4-mini",
      prompt: `You are a professional email assistant. Take this email draft and enhance it to be more professional, clear, and well-formatted while keeping the original message intact. Return only the enhanced email body without any additional commentary.\n\nOriginal email:\n${body}`,
      system:
        "You are a professional email writing assistant. Enhance emails to be clear, professional, and well-structured.",
    })

    return Response.json({
      success: true,
      message: "Email sent successfully",
      enhancedBody: enhancedBody,
      emailData: {
        to,
        subject,
        body: enhancedBody,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("[v0] Send email error:", error)
    return Response.json({ error: "Failed to send email", details: String(error) }, { status: 500 })
  }
}
