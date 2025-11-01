"use client"

import React from "react"

interface SharedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined"
}

export const SharedCard = React.forwardRef<HTMLDivElement, SharedCardProps>(
  ({ variant = "default", className, children, ...props }, ref) => {
    const baseStyles = "rounded-lg p-4 transition-all duration-200"

    const variantStyles = {
      default: "bg-card text-card-foreground border border-border",
      elevated: "bg-card text-card-foreground shadow-lg",
      outlined: "bg-transparent border-2 border-border",
    }

    return (
      <div ref={ref} className={`${baseStyles} ${variantStyles[variant]} ${className || ""}`} {...props}>
        {children}
      </div>
    )
  },
)

SharedCard.displayName = "SharedCard"
