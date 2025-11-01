"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button, Input, Checkbox, Card } from "@/lib/design-system/components"
import { eventBus, Events } from "@/lib/design-system"
import {
  Trash2,
  Reply,
  Forward,
  Loader2,
  Plus,
  X,
  Send,
  Star,
  Mail,
  Search,
  Archive,
  ArchiveRestore,
  Inbox,
  Menu,
  RefreshCw,
  ChevronLeft,
  Settings,
  Clock,
  AlertCircle,
  FileText,
  ShoppingCart,
  Users,
  Megaphone,
  MessageSquare,
  Calendar,
  ChevronDown,
  Tag,
} from "lucide-react"

interface Email {
  id: string
  from: string
  to?: string
  subject: string
  body: string
  preview: string
  timestamp: string
  read: boolean
  starred?: boolean
  archived?: boolean
  category?:
    | "inbox"
    | "starred"
    | "sent"
    | "archived"
    | "snoozed"
    | "important"
    | "drafts"
    | "purchases"
    | "social"
    | "updates"
    | "forums"
    | "promotions"
    | "scheduled"
    | "spam"
    | "trash"
}

export default function EmailApp() {
  const [emails, setEmails] = useState<Email[]>([])
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showCompose, setShowCompose] = useState(false)
  const [composeData, setComposeData] = useState({ to: "", subject: "", body: "" })
  const [replyMode, setReplyMode] = useState(false)
  const [activeCategory, setActiveCategory] = useState<
    | "inbox"
    | "starred"
    | "sent"
    | "archived"
    | "snoozed"
    | "important"
    | "drafts"
    | "purchases"
    | "social"
    | "updates"
    | "forums"
    | "promotions"
    | "scheduled"
    | "spam"
    | "trash"
  >("inbox")
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest")
  const [sendingEmail, setSendingEmail] = useState(false)
  const [emailStatus, setEmailStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [selectedEmails, setSelectedEmails] = useState<Set<string>>(new Set())
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [showMoreCategories, setShowMoreCategories] = useState(false)
  const [draftId, setDraftId] = useState<string | null>(null)

  useEffect(() => {
    const mockEmails: Email[] = [
      {
        id: "1",
        from: "john.smith@techcorp.com",
        to: "you@example.com",
        subject: "Project Update - Q4 Planning",
        body: "Hi,\n\nHere's the latest update on the Q4 project planning. We've made significant progress on the backend infrastructure and are on track for the December release.\n\nKey milestones:\n- Database optimization: 95% complete\n- API endpoints: 100% complete\n- Testing phase: Starting next week\n\nPlease review the attached documentation and let me know if you have any questions.\n\nBest regards,\nJohn",
        preview: "Here's the latest update on the project...",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        read: false,
        starred: false,
        archived: false,
        category: "inbox",
      },
      {
        id: "2",
        from: "sarah.johnson@company.com",
        to: "you@example.com",
        subject: "Meeting Tomorrow at 2 PM",
        body: "Hi,\n\nDon't forget about our meeting tomorrow at 2 PM in Conference Room B. We'll be discussing the new feature roadmap and Q1 planning.\n\nAgenda:\n1. Feature prioritization\n2. Resource allocation\n3. Timeline review\n4. Q&A\n\nPlease come prepared with your team's input.\n\nThanks,\nSarah",
        preview: "Don't forget about our meeting tomorrow at 2 PM",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        read: true,
        starred: true,
        archived: false,
        category: "inbox",
      },
      {
        id: "3",
        from: "team@company.com",
        to: "you@example.com",
        subject: "Team Announcement - New Office Location",
        body: "Team,\n\nWe're excited to announce that we'll be moving to a new office location starting next month. The new space is larger and more modern, with better amenities for collaboration.\n\nNew Address:\n123 Tech Street\nSan Francisco, CA 94105\n\nMore details will be shared in the coming weeks. If you have any questions, please reach out to HR.\n\nBest,\nManagement",
        preview: "We're excited to announce...",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        read: true,
        starred: false,
        archived: false,
        category: "inbox",
      },
      {
        id: "4",
        from: "alex.kumar@techcorp.com",
        to: "you@example.com",
        subject: "Code Review - PR #456",
        body: "Hi,\n\nI've reviewed your pull request #456. Overall, the implementation looks good. Here are a few suggestions:\n\n1. Consider adding error handling for edge cases\n2. Add unit tests for the new utility functions\n3. Update the documentation\n\nPlease address these points and I'll approve the PR.\n\nThanks,\nAlex",
        preview: "I've reviewed your pull request...",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        read: false,
        starred: false,
        archived: false,
        category: "inbox",
      },
      {
        id: "5",
        from: "marketing@company.com",
        to: "you@example.com",
        subject: "Campaign Results - November Performance",
        body: "Hi,\n\nHere are the results from our November marketing campaign:\n\nMetrics:\n- Click-through rate: 4.2%\n- Conversion rate: 2.8%\n- Total leads: 1,250\n- ROI: 320%\n\nThis represents a 15% improvement over October. Great work to the entire team!\n\nDetailed report attached.\n\nBest,\nMarketing Team",
        preview: "Here are the results from our November marketing campaign...",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        read: true,
        starred: false,
        archived: false,
        category: "promotions",
      },
      {
        id: "6",
        from: "emma.wilson@company.com",
        to: "you@example.com",
        subject: "Design Review Feedback",
        body: "Hi,\n\nI've completed my review of the new UI design mockups. Overall design looks fantastic! Here's my feedback:\n\nStrengths:\n- Clean and intuitive layout\n- Great color scheme\n- Excellent typography choices\n\nFeedback:\n- Consider adding more whitespace in the sidebar\n- Button sizes could be slightly larger on mobile\n- Think about dark mode support\n\nGreat work!\n\nBest,\nEmma",
        preview: "I've completed my review of the new UI design...",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        read: false,
        starred: false,
        archived: false,
        category: "inbox",
      },
      {
        id: "7",
        from: "david.chen@techcorp.com",
        to: "you@example.com",
        subject: "Budget Approval - Q1 2024",
        body: "Hi,\n\nI'm pleased to inform you that your budget proposal for Q1 2024 has been approved. The amount of $50,000 will be allocated to your department.\n\nUsage Guidelines:\n- Must be spent by end of March\n- Weekly status reports required\n- Any changes need approval from finance\n\nCongratulations and please reach out if you have questions.\n\nBest,\nDavid",
        preview: "Your budget proposal for Q1 2024 has been approved...",
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        read: true,
        starred: false,
        archived: false,
        category: "inbox",
      },
      {
        id: "8",
        from: "jessica.brown@company.com",
        to: "you@example.com",
        subject: "Onboarding New Team Member",
        body: "Hi,\n\nWelcome to the team! We're excited to have you on board. Your onboarding starts next Monday.\n\nSchedule:\n- Monday: Company overview and office tour\n- Tuesday: Team introductions and project briefing\n- Wednesday: Technical setup and tools training\n- Thursday: First sprint planning\n- Friday: Feedback and reflection\n\nLooking forward to meeting you!\n\nBest,\nJessica",
        preview: "Welcome to the team! We're excited to have you on board...",
        timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
        read: true,
        starred: false,
        archived: false,
        category: "inbox",
      },
      {
        id: "9",
        from: "michael.garcia@company.com",
        to: "you@example.com",
        subject: "Performance Review Schedule",
        body: "Hi,\n\nIt's time for your mid-year performance review. I'd like to schedule a meeting with you to discuss your progress and goals.\n\nPotential times:\n- Monday 2-3 PM\n- Tuesday 10-11 AM\n- Wednesday 3-4 PM\n\nPlease let me know which time works best for you. We'll meet in my office (Building A, Room 405).\n\nBest,\nMichael",
        preview: "It's time for your mid-year performance review...",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        read: false,
        starred: true,
        archived: false,
        category: "inbox",
      },
      {
        id: "10",
        from: "lisa.anderson@company.com",
        to: "you@example.com",
        subject: "Resource Request - Additional Developers",
        body: "Hi,\n\nI wanted to discuss the resource request we mentioned last week. For the upcoming project, we need 3 additional developers with React experience.\n\nTimeline:\n- Request approval: This week\n- Recruitment: 2-3 weeks\n- Onboarding: 1 week\n\nTotal timeline to full capacity: ~4 weeks\n\nCan we schedule a call to discuss further?\n\nBest,\nLisa",
        preview: "I wanted to discuss the resource request we mentioned...",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        read: true,
        starred: false,
        archived: false,
        category: "inbox",
      },
      {
        id: "11",
        from: "robert.taylor@company.com",
        to: "you@example.com",
        subject: "System Maintenance - Friday Night",
        body: "Hi,\n\nPlease note that we'll be performing system maintenance this Friday night from 10 PM to 2 AM. During this time, the system will be unavailable.\n\nExpected downtime: 4 hours\nServices affected: All web applications\n\nWe apologize for any inconvenience. Please schedule any critical tasks before Friday.\n\nBest,\nRobert",
        preview: "Please note that we'll be performing system maintenance...",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        read: true,
        starred: false,
        archived: false,
        category: "updates",
      },
      {
        id: "12",
        from: "nicole.martinez@company.com",
        to: "you@example.com",
        subject: "Customer Feedback Summary",
        body: "Hi,\n\nHere's the summary of customer feedback from this month:\n\nPositive:\n- 92% satisfaction rate\n- Praised ease of use\n- Great customer support\n\nAreas for improvement:\n- Loading time could be faster\n- Mobile app needs better navigation\n- More payment options needed\n\nDetailed report attached.\n\nBest,\nNicole",
        preview: "Here's the summary of customer feedback from this month...",
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        read: true,
        starred: false,
        archived: false,
        category: "social",
      },
    ]

    setEmails(mockEmails)
    setLoading(false)
  }, [])

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffHours < 1) return "just now"
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`

    const month = date.toLocaleDateString("en-US", { month: "short" })
    const day = date.getDate()
    return `${month} ${day}`
  }

  const filteredEmails = emails
    .filter((email) => {
      if (activeCategory === "starred") return email.starred === true && !email.archived
      if (activeCategory === "sent")
        return email.from === "you@example.com" && !email.archived && email.category !== "drafts"
      if (activeCategory === "archived") return email.archived === true
      if (activeCategory === "drafts") return email.category === "drafts" && !email.archived
      if (activeCategory === "inbox")
        return email.from !== "you@example.com" && !email.archived && email.category === "inbox"
      return email.category === activeCategory && !email.archived
    })
    .filter(
      (email) =>
        searchQuery === "" ||
        email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.body.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      const timeA = new Date(a.timestamp).getTime()
      const timeB = new Date(b.timestamp).getTime()
      if (sortBy === "newest") return timeB - timeA
      return timeA - timeB
    })

  const handleDelete = (id: string) => {
    const updatedEmails = emails.filter((e) => e.id !== id)
    setEmails(updatedEmails)
    if (selectedEmail?.id === id) {
      setSelectedEmail(null)
    }
  }

  const handleToggleStar = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    const updatedEmails = emails.map((email) => (email.id === id ? { ...email, starred: !email.starred } : email))
    setEmails(updatedEmails)
    if (selectedEmail?.id === id) {
      setSelectedEmail({ ...selectedEmail, starred: !selectedEmail.starred })
    }

    const email = emails.find((e) => e.id === id)
    if (email) {
      eventBus.publish(Events.EMAIL_STARRED, { emailId: id, starred: !email.starred })
    }
  }

  const handleToggleArchive = (id: string) => {
    const updatedEmails = emails.map((e) => (e.id === id ? { ...e, archived: !e.archived } : e))
    setEmails(updatedEmails)
    if (selectedEmail?.id === id) {
      setSelectedEmail(null)
    }

    const email = emails.find((e) => e.id === id)
    if (email) {
      eventBus.publish(Events.EMAIL_ARCHIVED, { emailId: id, archived: !email.archived })
    }
  }

  const handleCompose = () => {
    setComposeData({ to: "", subject: "", body: "" })
    setReplyMode(false)
    setShowCompose(true)
    setDraftId(null)
    setEmailStatus(null)
  }

  const handleReply = () => {
    if (selectedEmail) {
      setComposeData({
        to: selectedEmail.from,
        subject: `Re: ${selectedEmail.subject}`,
        body: `\n\n---\nOn ${formatTimestamp(selectedEmail.timestamp)}, ${selectedEmail.from} wrote:\n${selectedEmail.body}`,
      })
      setReplyMode(true)
      setShowCompose(true)
      setEmailStatus(null)
    }
  }

  const handleSendEmail = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!composeData.to || !composeData.subject) {
      setEmailStatus({ type: "error", message: "Please fill in recipient and subject" })
      return
    }

    if (!emailRegex.test(composeData.to)) {
      setEmailStatus({ type: "error", message: "Please enter a valid email address (e.g., user@example.com)" })
      return
    }

    setSendingEmail(true)
    setEmailStatus(null)

    try {
      const response = await fetch("/api/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(composeData),
      })

      if (!response.ok) {
        throw new Error("Failed to send email")
      }

      const result = await response.json()

      const newEmail: Email = {
        id: result.emailId || String(Date.now()),
        from: "you@example.com",
        to: composeData.to,
        subject: composeData.subject,
        body: composeData.body,
        preview: composeData.body.substring(0, 50) + "...",
        timestamp: new Date().toISOString(),
        read: true,
        starred: false,
        archived: false,
        category: "sent",
      }

      if (draftId) {
        const updatedEmails = emails.filter((e) => e.id !== draftId)
        setEmails([newEmail, ...updatedEmails])
      } else {
        setEmails([newEmail, ...emails])
      }

      setShowCompose(false)
      setComposeData({ to: "", subject: "", body: "" })
      setDraftId(null)
      setEmailStatus({ type: "success", message: "Email sent successfully!" })

      eventBus.publish(Events.EMAIL_SENT, { email: newEmail })

      setTimeout(() => setEmailStatus(null), 3000)
    } catch (error) {
      setEmailStatus({ type: "error", message: "Failed to send email. Please try again." })
    } finally {
      setSendingEmail(false)
    }
  }

  const handleSelectEmail = (id: string) => {
    const newSelected = new Set(selectedEmails)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedEmails(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedEmails.size === filteredEmails.length) {
      setSelectedEmails(new Set())
    } else {
      setSelectedEmails(new Set(filteredEmails.map((e) => e.id)))
    }
  }

  const getEmailCount = (category: string): number => {
    switch (category) {
      case "inbox":
        return emails.filter((e) => e.category === "inbox" && !e.archived).length
      case "starred":
        return emails.filter((e) => e.starred === true && !e.archived).length
      case "sent":
        return emails.filter((e) => e.from === "you@example.com" && !e.archived && e.category !== "drafts").length
      case "drafts":
        return emails.filter((e) => e.category === "drafts" && !e.archived).length
      case "archived":
        return emails.filter((e) => e.archived === true).length
      case "snoozed":
        return emails.filter((e) => e.category === "snoozed").length
      case "important":
        return emails.filter((e) => e.category === "important").length
      case "purchases":
        return emails.filter((e) => e.category === "purchases" && !e.archived).length
      case "social":
        return emails.filter((e) => e.category === "social" && !e.archived).length
      case "updates":
        return emails.filter((e) => e.category === "updates" && !e.archived).length
      case "forums":
        return emails.filter((e) => e.category === "forums" && !e.archived).length
      case "promotions":
        return emails.filter((e) => e.category === "promotions" && !e.archived).length
      case "scheduled":
        return emails.filter((e) => e.category === "scheduled" && !e.archived).length
      case "spam":
        return emails.filter((e) => e.category === "spam").length
      case "trash":
        return emails.filter((e) => e.category === "trash").length
      default:
        return 0
    }
  }

  const handleSaveDraft = () => {
    if (!composeData.to && !composeData.subject && !composeData.body) {
      setEmailStatus({ type: "error", message: "Draft is empty" })
      return
    }

    const draftEmail: Email = {
      id: draftId || String(Date.now()),
      from: "you@example.com",
      to: composeData.to,
      subject: composeData.subject || "(no subject)",
      body: composeData.body,
      preview: composeData.body.substring(0, 50) + "...",
      timestamp: new Date().toISOString(),
      read: true,
      starred: false,
      archived: false,
      category: "drafts",
    }

    if (draftId) {
      const updatedEmails = emails.map((e) => (e.id === draftId ? draftEmail : e))
      setEmails(updatedEmails)
    } else {
      setEmails([draftEmail, ...emails])
      setDraftId(draftEmail.id)
    }

    setEmailStatus({ type: "success", message: "Draft saved successfully!" })
    setTimeout(() => setEmailStatus(null), 2000)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden flex-col">
      <div className="h-12 bg-white border-b border-gray-200 flex items-center px-4">
        <h1 className="text-lg font-semibold text-gray-800">Host App</h1>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div
          className={`${sidebarCollapsed ? "w-16" : "w-64"} border-r border-gray-200 flex flex-col transition-all duration-200 overflow-y-auto`}
        >
          <div className="p-4">
            <div className="mb-3">
              <h2 className="text-sm font-bold text-red-600">Email App</h2>
            </div>
            <Button
              onClick={handleCompose}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md"
              size={sidebarCollapsed ? "icon" : "default"}
            >
              <Plus className="w-5 h-5" />
              {!sidebarCollapsed && <span className="ml-2">Compose</span>}
            </Button>
          </div>

          {!sidebarCollapsed && <div className="px-4 py-2 border-b border-gray-200"></div>}

          <nav className="flex-1 px-2 space-y-1">
            <Button
              variant="ghost"
              className={`w-full justify-start ${activeCategory === "inbox" ? "bg-red-50 text-red-600 hover:bg-red-50" : "hover:bg-gray-100"}`}
              onClick={() => setActiveCategory("inbox")}
            >
              <Inbox className="w-5 h-5" />
              {!sidebarCollapsed && (
                <>
                  <span className="ml-3 flex-1 text-left">Inbox</span>
                  <span className="text-sm">{getEmailCount("inbox")}</span>
                </>
              )}
            </Button>

            <Button
              variant="ghost"
              className={`w-full justify-start ${activeCategory === "starred" ? "bg-red-50 text-red-600 hover:bg-red-50" : "hover:bg-gray-100"}`}
              onClick={() => setActiveCategory("starred")}
            >
              <Star className="w-5 h-5" />
              {!sidebarCollapsed && (
                <>
                  <span className="ml-3 flex-1 text-left">Starred</span>
                  <span className="text-sm">{getEmailCount("starred")}</span>
                </>
              )}
            </Button>

            <Button
              variant="ghost"
              className={`w-full justify-start ${activeCategory === "snoozed" ? "bg-red-50 text-red-600 hover:bg-red-50" : "hover:bg-gray-100"}`}
              onClick={() => setActiveCategory("snoozed")}
            >
              <Clock className="w-5 h-5" />
              {!sidebarCollapsed && <span className="ml-3 flex-1 text-left">Snoozed</span>}
            </Button>

            <Button
              variant="ghost"
              className={`w-full justify-start ${activeCategory === "important" ? "bg-red-50 text-red-600 hover:bg-red-50" : "hover:bg-gray-100"}`}
              onClick={() => setActiveCategory("important")}
            >
              <AlertCircle className="w-5 h-5" />
              {!sidebarCollapsed && <span className="ml-3 flex-1 text-left">Important</span>}
            </Button>

            <Button
              variant="ghost"
              className={`w-full justify-start ${activeCategory === "sent" ? "bg-red-50 text-red-600 hover:bg-red-50" : "hover:bg-gray-100"}`}
              onClick={() => setActiveCategory("sent")}
            >
              <Send className="w-5 h-5" />
              {!sidebarCollapsed && (
                <>
                  <span className="ml-3 flex-1 text-left">Sent</span>
                  <span className="text-sm">{getEmailCount("sent")}</span>
                </>
              )}
            </Button>

            <Button
              variant="ghost"
              className={`w-full justify-start ${activeCategory === "drafts" ? "bg-red-50 text-red-600 hover:bg-red-50" : "hover:bg-gray-100"}`}
              onClick={() => setActiveCategory("drafts")}
            >
              <FileText className="w-5 h-5" />
              {!sidebarCollapsed && (
                <>
                  <span className="ml-3 flex-1 text-left">Drafts</span>
                  <span className="text-sm">{getEmailCount("drafts")}</span>
                </>
              )}
            </Button>

            {!sidebarCollapsed && (
              <div className="mt-4 mb-2">
                <p className="text-xs font-semibold text-gray-600 px-3 mb-2">Categories</p>
              </div>
            )}

            <Button
              variant="ghost"
              className={`w-full justify-start ${activeCategory === "social" ? "bg-red-50 text-red-600 hover:bg-red-50" : "hover:bg-gray-100"}`}
              onClick={() => setActiveCategory("social")}
            >
              <Users className="w-5 h-5" />
              {!sidebarCollapsed && (
                <>
                  <span className="ml-3 flex-1 text-left">Social</span>
                  <span className="text-sm">{getEmailCount("social")}</span>
                </>
              )}
            </Button>

            <Button
              variant="ghost"
              className={`w-full justify-start ${activeCategory === "promotions" ? "bg-red-50 text-red-600 hover:bg-red-50" : "hover:bg-gray-100"}`}
              onClick={() => setActiveCategory("promotions")}
            >
              <Megaphone className="w-5 h-5" />
              {!sidebarCollapsed && (
                <>
                  <span className="ml-3 flex-1 text-left">Promotions</span>
                  <span className="text-sm">{getEmailCount("promotions")}</span>
                </>
              )}
            </Button>

            <Button
              variant="ghost"
              className={`w-full justify-start ${activeCategory === "updates" ? "bg-red-50 text-red-600 hover:bg-red-50" : "hover:bg-gray-100"}`}
              onClick={() => setActiveCategory("updates")}
            >
              <RefreshCw className="w-5 h-5" />
              {!sidebarCollapsed && (
                <>
                  <span className="ml-3 flex-1 text-left">Updates</span>
                  <span className="text-sm">{getEmailCount("updates")}</span>
                </>
              )}
            </Button>

            <Button
              variant="ghost"
              className={`w-full justify-start ${activeCategory === "forums" ? "bg-red-50 text-red-600 hover:bg-red-50" : "hover:bg-gray-100"}`}
              onClick={() => setActiveCategory("forums")}
            >
              <MessageSquare className="w-5 h-5" />
              {!sidebarCollapsed && (
                <>
                  <span className="ml-3 flex-1 text-left">Forums</span>
                  <span className="text-sm">{getEmailCount("forums")}</span>
                </>
              )}
            </Button>

            {showMoreCategories && (
              <>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${activeCategory === "purchases" ? "bg-red-50 text-red-600 hover:bg-red-50" : "hover:bg-gray-100"}`}
                  onClick={() => setActiveCategory("purchases")}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {!sidebarCollapsed && (
                    <>
                      <span className="ml-3 flex-1 text-left">Purchases</span>
                      <span className="text-sm">{getEmailCount("purchases")}</span>
                    </>
                  )}
                </Button>

                <Button
                  variant="ghost"
                  className={`w-full justify-start ${activeCategory === "scheduled" ? "bg-red-50 text-red-600 hover:bg-red-50" : "hover:bg-gray-100"}`}
                  onClick={() => setActiveCategory("scheduled")}
                >
                  <Calendar className="w-5 h-5" />
                  {!sidebarCollapsed && (
                    <>
                      <span className="ml-3 flex-1 text-left">Scheduled</span>
                      <span className="text-sm">{getEmailCount("scheduled")}</span>
                    </>
                  )}
                </Button>

                <Button
                  variant="ghost"
                  className={`w-full justify-start ${activeCategory === "spam" ? "bg-red-50 text-red-600 hover:bg-red-50" : "hover:bg-gray-100"}`}
                  onClick={() => setActiveCategory("spam")}
                >
                  <AlertCircle className="w-5 h-5" />
                  {!sidebarCollapsed && (
                    <>
                      <span className="ml-3 flex-1 text-left">Spam</span>
                      <span className="text-sm">{getEmailCount("spam")}</span>
                    </>
                  )}
                </Button>

                <Button
                  variant="ghost"
                  className={`w-full justify-start ${activeCategory === "trash" ? "bg-red-50 text-red-600 hover:bg-red-50" : "hover:bg-gray-100"}`}
                  onClick={() => setActiveCategory("trash")}
                >
                  <Trash2 className="w-5 h-5" />
                  {!sidebarCollapsed && (
                    <>
                      <span className="ml-3 flex-1 text-left">Trash</span>
                      <span className="text-sm">{getEmailCount("trash")}</span>
                    </>
                  )}
                </Button>

                <Button
                  variant="ghost"
                  className={`w-full justify-start ${activeCategory === "archived" ? "bg-red-50 text-red-600 hover:bg-red-50" : "hover:bg-gray-100"}`}
                  onClick={() => setActiveCategory("archived")}
                >
                  <Archive className="w-5 h-5" />
                  {!sidebarCollapsed && (
                    <>
                      <span className="ml-3 flex-1 text-left">Archived</span>
                      <span className="text-sm">{getEmailCount("archived")}</span>
                    </>
                  )}
                </Button>
              </>
            )}

            {!sidebarCollapsed && (
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-gray-100"
                onClick={() => setShowMoreCategories(!showMoreCategories)}
              >
                <ChevronDown className={`w-5 h-5 transition-transform ${showMoreCategories ? "rotate-180" : ""}`} />
                <span className="ml-3 flex-1 text-left">{showMoreCategories ? "Less" : "More"}</span>
              </Button>
            )}

            {!sidebarCollapsed && (
              <>
                <div className="mt-4 mb-2 border-t border-gray-200 pt-4">
                  <p className="text-xs font-semibold text-gray-600 px-3 mb-2">Labels</p>
                </div>

                <Button variant="ghost" className="w-full justify-start hover:bg-gray-100 text-sm">
                  <Tag className="w-4 h-4" />
                  <span className="ml-3 flex-1 text-left">Create new label</span>
                </Button>

                <Button variant="ghost" className="w-full justify-start hover:bg-gray-100 text-sm">
                  <Settings className="w-4 h-4" />
                  <span className="ml-3 flex-1 text-left">Manage labels</span>
                </Button>
              </>
            )}
          </nav>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="h-16 border-b border-gray-200 flex items-center px-4 gap-4 flex-shrink-0">
            <Button variant="ghost" size="icon" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
              <Menu className="w-5 h-5" />
            </Button>

            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search mail"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-100 border-0 rounded-lg focus-visible:ring-1 focus-visible:ring-blue-500"
                />
              </div>
            </div>

            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </header>

          {selectedEmail && !showCompose ? (
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-4xl mx-auto p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Button variant="ghost" size="icon" onClick={() => setSelectedEmail(null)}>
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleToggleArchive(selectedEmail.id)}>
                    {selectedEmail.archived ? <ArchiveRestore className="w-5 h-5" /> : <Archive className="w-5 h-5" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(selectedEmail.id)}>
                    <Trash2 className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleToggleStar(selectedEmail.id)}>
                    <Star className={`w-5 h-5 ${selectedEmail.starred ? "fill-yellow-400 text-yellow-400" : ""}`} />
                  </Button>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h1 className="text-2xl font-normal mb-4">{selectedEmail.subject}</h1>

                  <div className="flex items-start gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center font-semibold">
                      {selectedEmail.from.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{selectedEmail.from}</p>
                          <p className="text-sm text-gray-600">to {selectedEmail.to || "me"}</p>
                        </div>
                        <p className="text-sm text-gray-600">{formatTimestamp(selectedEmail.timestamp)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="prose max-w-none">
                    <p className="whitespace-pre-wrap text-gray-800">{selectedEmail.body}</p>
                  </div>

                  <div className="flex gap-2 mt-6 pt-6 border-t border-gray-200">
                    <Button onClick={handleReply} variant="outline" className="rounded-full bg-transparent">
                      <Reply className="w-4 h-4 mr-2" />
                      Reply
                    </Button>
                    <Button variant="outline" className="rounded-full bg-transparent">
                      <Forward className="w-4 h-4 mr-2" />
                      Forward
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : showCompose ? (
            <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
              <div className="max-w-3xl mx-auto">
                <Card className="shadow-lg">
                  <div className="bg-gray-800 text-white px-4 py-3 rounded-t-lg flex items-center justify-between">
                    <h3 className="font-medium">{replyMode ? "Reply" : draftId ? "Edit Draft" : "New Message"}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setShowCompose(false)
                        setDraftId(null)
                      }}
                      className="text-white hover:bg-gray-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-center border-b border-gray-200 pb-2">
                      <span className="text-sm text-gray-600 w-16">To</span>
                      <Input
                        value={composeData.to}
                        onChange={(e) => setComposeData({ ...composeData, to: e.target.value })}
                        placeholder="Recipients"
                        className="border-0 focus-visible:ring-0 px-0"
                      />
                    </div>

                    <div className="flex items-center border-b border-gray-200 pb-2">
                      <span className="text-sm text-gray-600 w-16">Subject</span>
                      <Input
                        value={composeData.subject}
                        onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })}
                        placeholder="Subject"
                        className="border-0 focus-visible:ring-0 px-0"
                      />
                    </div>

                    <textarea
                      value={composeData.body}
                      onChange={(e) => setComposeData({ ...composeData, body: e.target.value })}
                      placeholder="Type your message..."
                      className="w-full p-2 min-h-64 border-0 focus:outline-none resize-none"
                    />

                    {emailStatus && (
                      <div
                        className={`p-3 rounded-lg text-sm ${emailStatus.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
                      >
                        {emailStatus.message}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4">
                      <Button
                        onClick={handleSendEmail}
                        disabled={sendingEmail}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6"
                      >
                        {sendingEmail ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>Send</>
                        )}
                      </Button>
                      <Button onClick={handleSaveDraft} variant="outline" className="rounded-full px-6 bg-transparent">
                        Save Draft
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="h-12 border-b border-gray-200 flex items-center px-4 gap-2 flex-shrink-0">
                <Checkbox
                  checked={selectedEmails.size === filteredEmails.length && filteredEmails.length > 0}
                  onCheckedChange={handleSelectAll}
                />
                <Button variant="ghost" size="icon" disabled={selectedEmails.size === 0}>
                  <RefreshCw className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" disabled={selectedEmails.size === 0}>
                  <Archive className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" disabled={selectedEmails.size === 0}>
                  <Trash2 className="w-4 h-4" />
                </Button>

                <div className="flex-1" />

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}
                  className="text-sm border-0 bg-transparent focus:outline-none text-gray-600"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                </select>
              </div>

              <div className="flex-1 overflow-y-auto">
                {filteredEmails.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <Mail className="w-16 h-16 mb-4" />
                    <p className="text-lg">No messages</p>
                  </div>
                ) : (
                  filteredEmails.map((email) => (
                    <div
                      key={email.id}
                      className={`flex items-center gap-4 px-4 py-3 border-b border-gray-100 hover:shadow-sm cursor-pointer transition-all ${
                        !email.read ? "bg-white" : "bg-gray-50"
                      }`}
                      onClick={() => {
                        setSelectedEmail(email)
                        const updatedEmails = emails.map((e) => (e.id === email.id ? { ...e, read: true } : e))
                        setEmails(updatedEmails)
                      }}
                    >
                      <Checkbox
                        checked={selectedEmails.has(email.id)}
                        onCheckedChange={() => handleSelectEmail(email.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <button onClick={(e) => handleToggleStar(email.id, e)} className="flex-shrink-0">
                        <Star
                          className={`w-5 h-5 ${email.starred ? "fill-yellow-400 text-yellow-400" : "text-gray-400 hover:text-gray-600"}`}
                        />
                      </button>

                      <div className="flex-1 min-w-0 flex items-center gap-4">
                        <p className={`w-48 truncate ${!email.read ? "font-bold" : "font-normal"}`}>{email.from}</p>
                        <div className="flex-1 min-w-0 flex items-center gap-2">
                          <p className={`truncate ${!email.read ? "font-semibold" : "font-normal"}`}>{email.subject}</p>
                          <span className="text-gray-500">-</span>
                          <p className="text-gray-600 truncate text-sm">{email.preview}</p>
                        </div>
                        <p className="text-sm text-gray-600 flex-shrink-0 w-20 text-right">
                          {formatTimestamp(email.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
