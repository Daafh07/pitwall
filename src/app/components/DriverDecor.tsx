"use client"

import { motion } from "framer-motion"

type Props = {
  color: string
  className?: string
  flip?: boolean
}

export function DriverDecor({ color, className = "", flip = false }: Props) {
  return (
    <svg
      width="243" height="42" viewBox="0 0 243 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={flip ? { transform: "rotate(180deg)" } : {}}
    >
      <motion.line
        x1="12.66" y1="4.5" x2="243" y2="4.5"
        stroke={color} strokeWidth="7"
        strokeDasharray={230.34}
        initial={{ strokeDashoffset: -230.34 }}
        whileInView={{ strokeDashoffset: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      />
      <motion.line
        x1="0" y1="30" x2="243" y2="30"
        stroke={color} strokeWidth="7"
        strokeDasharray={243}
        initial={{ strokeDashoffset: -243 }}
        whileInView={{ strokeDashoffset: 0 }}
        transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
        viewport={{ once: true }}
      />
    </svg>
  )
}
