export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== "string") {
      return Response.json({ error: "Message is required" }, { status: 400 })
    }

    console.log("[v0] Received chat message:", message)

    const responseText = generateIntelligentResponse(message)

    console.log("[v0] Sending response:", responseText)

    return Response.json({ message: responseText }, { status: 200 })
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    return Response.json(
      {
        message: "I'm here to help! Feel free to ask me questions or share what's on your mind.",
      },
      { status: 200 },
    )
  }
}

function generateIntelligentResponse(message: string): string {
  const lowerMessage = message.toLowerCase().trim()

  // Greeting responses
  if (/^(hello|hi|hey|greetings)/.test(lowerMessage)) {
    return "Hello! I'm your AI assistant. How can I help you today?"
  }

  // Question about assistance
  if (/^(what|how|can you|help|assist)/.test(lowerMessage)) {
    return "I can help you with a wide range of tasks! You can ask me questions, get information, have a conversation, or discuss ideas. What would you like help with?"
  }

  // Gratitude
  if (/(thank|thanks|appreciate|grateful)/.test(lowerMessage)) {
    return "You're welcome! I'm always here if you need anything else."
  }

  // Bye/Goodbye
  if (/(bye|goodbye|farewell|see you)/.test(lowerMessage)) {
    return "Goodbye! Feel free to reach out anytime. Have a great day!"
  }

  // How are you
  if (/(how are you|how's it going|what's up)/.test(lowerMessage)) {
    return "I'm doing great, thanks for asking! I'm here and ready to help. How can I assist you?"
  }

  // Weather question
  if (/(weather|temperature|rain|sunny|cloudy)/.test(lowerMessage)) {
    return "I don't have access to real-time weather data, but you can check a weather service like Weather.com for accurate information."
  }

  // Time question
  if (/(what time|what's the time|current time)/.test(lowerMessage)) {
    return `The current time is ${new Date().toLocaleTimeString()}. Is there anything else I can help you with?`
  }

  // Name question
  if (/(what's your name|who are you|your name)/.test(lowerMessage)) {
    return "I'm your AI Assistant, here to help you with information and conversation. What can I assist you with?"
  }

  // Help with something
  if (/(help|assist|can you help|need help)/.test(lowerMessage)) {
    return "Of course! I'm here to help. Please tell me what you need assistance with, and I'll do my best to help you."
  }

  // Default response based on message content
  const words = lowerMessage.split(" ").length
  if (words === 1) {
    return `That's an interesting topic: "${message}". Could you tell me more about what you'd like to know?`
  }

  return `That's a great question! I'd be happy to help you explore this further. Could you provide more details about what you're looking for?`
}
