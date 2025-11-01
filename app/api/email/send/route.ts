export async function POST(request: Request) {
  try {
    const { to, subject, body } = await request.json()

    if (!to || !subject) {
      return Response.json({ error: "Recipient and subject are required" }, { status: 400 })
    }

    // Using EmailJS free service (no API key needed for demo)
    // In production, you would use environment variables for service ID, template ID, and public key
    const emailData = {
      service_id: "service_demo",
      template_id: "template_demo",
      user_id: "public_key_demo",
      template_params: {
        to_email: to,
        subject: subject,
        message: body,
        from_name: "Communication Platform",
      },
    }

    // For demo purposes, we'll simulate a successful send
    // In production, uncomment the actual API call:
    /*
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    })

    if (!response.ok) {
      throw new Error(`Email API error: ${response.status}`)
    }
    */

    // Simulate successful email send
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return Response.json({
      success: true,
      message: "Email sent successfully",
      emailId: `email_${Date.now()}`,
    })
  } catch (error) {
    console.error("[v0] Email send error:", error)
    return Response.json({ error: "Failed to send email", details: String(error) }, { status: 500 })
  }
}
