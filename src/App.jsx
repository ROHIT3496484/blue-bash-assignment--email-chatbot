"use client"

import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import ChatApp from "./pages/ChatApp"
import EmailApp from "./pages/EmailApp"
import "./styles/app.css"

export default function App() {
  const [notifications, setNotifications] = useState([])

  React.useEffect(() => {
    const handleNotification = (event) => {
      setNotifications((prev) => [...prev, event.detail])
      setTimeout(() => {
        setNotifications((prev) => prev.slice(1))
      }, 3000)
    }

    window.addEventListener("app-notification", handleNotification)
    return () => window.removeEventListener("app-notification", handleNotification)
  }, [])

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <div className="header-content">
            <h1 className="app-title">Micro-Frontend Dashboard</h1>
            <nav className="app-nav">
              <Link to="/" className="nav-link">
                Dashboard
              </Link>
              <Link to="/chat" className="nav-link">
                Chat
              </Link>
              <Link to="/email" className="nav-link">
                Email
              </Link>
            </nav>
          </div>
        </header>

        <div className="notification-container">
          {notifications.map((notif, idx) => (
            <div key={idx} className="notification">
              {notif.message}
            </div>
          ))}
        </div>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/chat" element={<ChatApp />} />
            <Route path="/email" element={<EmailApp />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>&copy; 2025 Micro-Frontend Architecture. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  )
}
