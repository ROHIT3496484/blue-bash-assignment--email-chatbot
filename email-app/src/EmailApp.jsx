"use client"

import { useState } from "react"
import "./styles/email.css"

export default function EmailApp() {
  const [emails, setEmails] = useState([
    {
      id: 1,
      from: "john@example.com",
      subject: "Project Update",
      preview: "Here's the latest update on the project...",
      date: "Today",
      read: false,
    },
    {
      id: 2,
      from: "sarah@example.com",
      subject: "Meeting Scheduled",
      preview: "The meeting has been scheduled for tomorrow...",
      date: "Yesterday",
      read: true,
    },
    {
      id: 3,
      from: "mike@example.com",
      subject: "Code Review",
      preview: "Please review the pull request...",
      date: "2 days ago",
      read: true,
    },
    {
      id: 4,
      from: "team@company.com",
      subject: "Team Announcement",
      preview: "Important announcement for the team...",
      date: "3 days ago",
      read: true,
    },
  ])
  const [selectedEmail, setSelectedEmail] = useState(null)
  const [showCompose, setShowCompose] = useState(false)
  const [composeData, setComposeData] = useState({ to: "", subject: "", body: "" })

  const handleSendEmail = () => {
    if (composeData.to && composeData.subject) {
      const newEmail = {
        id: emails.length + 1,
        from: "you@company.com",
        subject: composeData.subject,
        preview: composeData.body.substring(0, 50) + "...",
        date: "Now",
        read: true,
      }
      setEmails([newEmail, ...emails])
      setComposeData({ to: "", subject: "", body: "" })
      setShowCompose(false)

      // Emit event to host
      window.dispatchEvent(
        new CustomEvent("app-notification", {
          detail: { message: `Email sent to ${composeData.to}` },
        }),
      )
    }
  }

  const handleDeleteEmail = (id) => {
    setEmails(emails.filter((email) => email.id !== id))
    setSelectedEmail(null)
  }

  return (
    <div className="email-container">
      <div className="email-sidebar">
        <button className="compose-btn" onClick={() => setShowCompose(!showCompose)}>
          ✏️ Compose
        </button>
        <div className="folders">
          <div className="folder-item active">📥 Inbox</div>
          <div className="folder-item">⭐ Starred</div>
          <div className="folder-item">📤 Sent</div>
          <div className="folder-item">📋 Drafts</div>
          <div className="folder-item">🗑️ Trash</div>
        </div>
      </div>

      <div className="email-main">
        {showCompose && (
          <div className="compose-panel">
            <div className="compose-header">
              <h3>New Email</h3>
              <button className="close-btn" onClick={() => setShowCompose(false)}>
                ✕
              </button>
            </div>
            <div className="compose-form">
              <input
                type="email"
                placeholder="To:"
                value={composeData.to}
                onChange={(e) => setComposeData({ ...composeData, to: e.target.value })}
                className="compose-input"
              />
              <input
                type="text"
                placeholder="Subject:"
                value={composeData.subject}
                onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })}
                className="compose-input"
              />
              <textarea
                placeholder="Message body..."
                value={composeData.body}
                onChange={(e) => setComposeData({ ...composeData, body: e.target.value })}
                className="compose-textarea"
                rows="8"
              />
              <button className="send-email-btn" onClick={handleSendEmail}>
                Send
              </button>
            </div>
          </div>
        )}

        <div className="email-list">
          <div className="email-list-header">
            <h3>Inbox ({emails.length})</h3>
          </div>
          {emails.map((email) => (
            <div
              key={email.id}
              className={`email-item ${selectedEmail?.id === email.id ? "selected" : ""} ${!email.read ? "unread" : ""}`}
              onClick={() => setSelectedEmail(email)}
            >
              <div className="email-avatar">{email.from[0].toUpperCase()}</div>
              <div className="email-preview">
                <div className="email-from">{email.from}</div>
                <div className="email-subject">{email.subject}</div>
                <div className="email-snippet">{email.preview}</div>
              </div>
              <div className="email-date">{email.date}</div>
            </div>
          ))}
        </div>

        {selectedEmail && (
          <div className="email-detail">
            <div className="detail-header">
              <h2>{selectedEmail.subject}</h2>
              <button className="delete-btn" onClick={() => handleDeleteEmail(selectedEmail.id)}>
                🗑️ Delete
              </button>
            </div>
            <div className="detail-from">
              <strong>From:</strong> {selectedEmail.from}
            </div>
            <div className="detail-date">
              <strong>Date:</strong> {selectedEmail.date}
            </div>
            <div className="detail-body">
              <p>This is a sample email body. In a real application, this would contain the full email content.</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
            </div>
            <div className="detail-actions">
              <button className="action-btn">↩️ Reply</button>
              <button className="action-btn">↪️ Forward</button>
              <button className="action-btn">⭐ Star</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
