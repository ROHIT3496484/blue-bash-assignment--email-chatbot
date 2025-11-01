"use client"

import React from "react"

interface SharedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
}

export const SharedButton = React.forwardRef<HTMLButtonElement, SharedButtonProps>(
  ({ variant = "primary", size = "md", isLoading = false, children, className, ...props }, ref) => {
    const baseStyles = `
      font-medium rounded-lg transition-all duration-200 
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
    `

    const variantStyles = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
      outline: "border-2 border-primary text-primary hover:bg-primary/10",
      ghost: "text-primary hover:bg-primary/10",
    }

    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    }

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className || ""}`}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? "Loading..." : children}
      </button>
    )
  },
)

SharedButton.displayName = "SharedButton"
