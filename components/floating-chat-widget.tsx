"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button, Card } from "@/lib/design-system/components"
import { MessageCircle, X, Maximize2, Minimize2 } from "lucide-react"
import ChatApp from "@/components/chat-app"

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const widgetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updatePosition = () => {
      if (!isOpen) {
        setPosition({
          x: window.innerWidth - 140,
          y: window.innerHeight - 70,
        })
      } else if (!isFullscreen) {
        setPosition({
          x: window.innerWidth - 420,
          y: window.innerHeight - 620,
        })
      }
    }
    updatePosition()
    window.addEventListener("resize", updatePosition)
    return () => window.removeEventListener("resize", updatePosition)
  }, [isFullscreen, isOpen])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isFullscreen) return
    setIsDragging(true)
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isFullscreen) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragOffset, isFullscreen])

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  if (!isOpen) {
    return (
      <div
        className="fixed z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full h-14 px-6 shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Chat App
        </Button>
      </div>
    )
  }

  return (
    <div
      ref={widgetRef}
      className={`fixed z-50 ${isFullscreen ? "inset-0" : ""}`}
      style={
        isFullscreen
          ? {}
          : {
              left: `${position.x}px`,
              top: `${position.y}px`,
              width: "400px",
              height: "600px",
            }
      }
    >
      <Card className={`flex flex-col shadow-2xl h-full ${isFullscreen ? "w-full rounded-none" : ""}`}>
        {/* Header */}
        <div
          className={`flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white ${
            !isFullscreen ? "cursor-move" : ""
          } rounded-t-lg`}
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            <h3 className="font-semibold">Chat App</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="h-8 w-8 text-white hover:bg-blue-500 transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-white hover:bg-blue-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Chat Content */}
        <div className="flex-1 overflow-hidden">
          <ChatApp />
        </div>
      </Card>
    </div>
  )
}
