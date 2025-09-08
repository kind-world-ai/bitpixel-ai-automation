import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // BitPixel themed variants
        "bitpixel-orange": "bg-gradient-to-r from-bitpixel-blue-600 to-bitpixel-orange-600 text-white hover:from-bitpixel-blue-700 hover:to-bitpixel-orange-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300",
        "bitpixel-orange-outline": "border-2 border-bitpixel-blue-500 text-bitpixel-blue-500 hover:bg-bitpixel-blue-500 hover:text-white transition-all duration-300",
        "bitpixel-orange-glow": "bg-gradient-to-r from-bitpixel-blue-600 to-bitpixel-orange-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] transition-all duration-300",
        // BitPixel primary variants
        "bitpixel-primary": "bg-gradient-to-r from-bitpixel-orange-500 to-bitpixel-blue-500 text-white hover:from-bitpixel-orange-600 hover:to-bitpixel-blue-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300",
        "bitpixel-primary-outline": "border-2 border-bitpixel-orange-500 text-bitpixel-orange-600 hover:bg-bitpixel-orange-500 hover:text-white transition-all duration-300",
        "bitpixel-primary-glow": "bg-gradient-to-r from-bitpixel-orange-500 to-bitpixel-blue-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:shadow-[0_0_30px_rgba(249,115,22,0.7)] transition-all duration-300",
        // Keep legacy variants for compatibility
        automation: "bg-gradient-to-r from-bitpixel-blue-600 to-bitpixel-orange-600 text-white hover:from-bitpixel-blue-700 hover:to-bitpixel-orange-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300",
        "automation-outline": "border-2 border-bitpixel-blue-500 text-bitpixel-blue-500 hover:bg-bitpixel-blue-500 hover:text-white transition-all duration-300",
        "ai-glow": "bg-gradient-to-r from-bitpixel-blue-600 to-bitpixel-orange-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] transition-all duration-300",
        flame: "bg-gradient-to-r from-bitpixel-orange-500 to-bitpixel-blue-500 text-white hover:from-bitpixel-orange-600 hover:to-bitpixel-blue-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300",
        "flame-outline": "border-2 border-bitpixel-orange-500 text-bitpixel-orange-600 hover:bg-bitpixel-orange-500 hover:text-white transition-all duration-300",
        "flame-glow": "bg-gradient-to-r from-bitpixel-orange-500 to-bitpixel-blue-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:shadow-[0_0_30px_rgba(249,115,22,0.7)] transition-all duration-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-12 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }