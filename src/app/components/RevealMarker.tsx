"use client"

import { motion } from "framer-motion"

export default function RevealMarker({ children, color, className, style, delay = 0.3, direction = "ltr", triggered }: {
  children: React.ReactNode
  color: string
  className?: string
  style?: React.CSSProperties
  delay?: number
  direction?: "ltr" | "btt"
  triggered?: boolean
}) {
  const initial = direction === "btt"
    ? { clipPath: "inset(100% -20px -20px -20px)", opacity: 0 }
    : { clipPath: "inset(-20px 100% -20px -20px)", opacity: 0 }
  const visible = { clipPath: "inset(-20px -20px -20px -20px)", opacity: 1 }

  return (
    <motion.p
      className={className}
      style={{ color, ...style }}
      initial={initial}
      {...(triggered !== undefined
        ? { animate: triggered ? visible : initial }
        : { whileInView: visible, viewport: { once: true } }
      )}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
    >
      {children}
    </motion.p>
  )
}
