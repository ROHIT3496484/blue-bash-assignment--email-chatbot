import { NextResponse } from "next/server"

const mockEmails = [
  {
    id: "1",
    from: "john@example.com",
    subject: "Project Update",
    preview:
      "Here's the latest update on the project. We've made significant progress on the backend API and frontend components.",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    from: "sarah@example.com",
    subject: "Meeting Tomorrow",
    preview:
      "Don't forget about our meeting tomorrow at 2 PM. We'll be discussing the Q4 roadmap and budget allocation.",
    timestamp: "4 hours ago",
    read: true,
  },
  {
    id: "3",
    from: "team@example.com",
    subject: "Team Announcement",
    preview:
      "We're excited to announce the launch of our new product feature. This will be available to all users next week.",
    timestamp: "1 day ago",
    read: true,
  },
  {
    id: "4",
    from: "hr@example.com",
    subject: "Benefits Enrollment",
    preview: "It's time to enroll in our annual benefits program. Please complete your enrollment by Friday.",
    timestamp: "2 days ago",
    read: true,
  },
  {
    id: "5",
    from: "support@example.com",
    subject: "Support Ticket #12345",
    preview: "Thank you for contacting support. We've received your ticket and will respond within 24 hours.",
    timestamp: "3 days ago",
    read: true,
  },
]

export async function GET() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json(mockEmails)
  } catch (error) {
    console.error("[v0] Error fetching emails:", error)
    return NextResponse.json({ error: "Failed to fetch emails" }, { status: 500 })
  }
}
