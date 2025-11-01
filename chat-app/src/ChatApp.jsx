"use client"

import { useState, useRef, useEffect } from "react"
import "./styles/chat.css"

export default function ChatApp() {
  const [messages, setMessages] = useState([
    { id: 1, user: "Alice", text: "Hey, how are you?", timestamp: "10:30 AM" },
    { id: 2, user: "You", text: "I'm doing great! How about you?", timestamp: "10:31 AM" },
    { id: 3, user: "Alice", text: "Excellent! Let's discuss the project.", timestamp: "10:32 AM" },
  ])
  const [inputValue, setInputValue] = useState("")
  const [users, setUsers] = useState(["Alice", "Bob", "Charlie"])
  const [selectedUser, setSelectedUser] = useState("Alice")
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: "You",
        text: inputValue,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([...messages, newMessage])
      setInputValue("")

      // Emit event to host
      window.dispatchEvent(
        new CustomEvent("app-notification", {
          detail: { message: `Message sent to ${selectedUser}` },
        }),
      )
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <div className="sidebar-header">
          <h3>Conversations</h3>
        </div>
        <div className="users-list">
          {users.map((user) => (
            <div
              key={user}
              className={`user-item ${selectedUser === user ? "active" : ""}`}
              onClick={() => setSelectedUser(user)}
            >
              <div className="user-avatar">{user[0]}</div>
              <div className="user-info">
                <div className="user-name">{user}</div>
                <div className="user-status">Online</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-main">
        <div className="chat-header">
          <h2>{selectedUser}</h2>
          <div className="chat-actions">
            <button className="action-btn">📞</button>
            <button className="action-btn">📹</button>
            <button className="action-btn">ℹ️</button>
          </div>
        </div>

        <div className="messages-container">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.user === "You" ? "sent" : "received"}`}>
              <div className="message-content">
                <div className="message-text">{msg.text}</div>
                <div className="message-time">{msg.timestamp}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-area">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="chat-input"
            rows="3"
          />
          <button onClick={handleSendMessage} className="send-btn">
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
