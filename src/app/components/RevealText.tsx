"use client"

import { motion } from "framer-motion"

export default function RevealText({ children, color, className, wrapperClassName, delay = 0, style }: {
  children: React.ReactNode
  color: string
  className?: string
  wrapperClassName?: string
  delay?: number
  style?: React.CSSProperties
}) {
  return (
    <div className={`relative overflow-hidden ${wrapperClassName ?? ""}`} style={{ width: "fit-content" }}>
      <div className={className} style={style}>{children}</div>
      <motion.div
        className="absolute inset-0"
        style={{ background: color }}
        initial={{ x: 0 }}
        whileInView={{ x: "100%" }}
        transition={{ duration: 0.8, ease: "easeInOut", delay }}
        viewport={{ once: true }}
      />
    </div>
  )
}
