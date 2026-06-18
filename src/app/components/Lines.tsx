"use client"

import { motion } from "framer-motion"

type Props = {
  color: string
  className?: string
  delay?: number
}

const leftLines = [
  { x1: 356,     x2: -148,     length: 504     },
  { x1: 335.543, x2: -147.999, length: 483.543 },
  { x1: 316.016, x2: -147.999, length: 464.016 },
  { x1: 291.84,  x2: -147.998, length: 439.84  },
]

const rightLines = [
  { x1: 504,     x2: 0,      length: 504     },
  { x1: 503.999, x2: 20.457, length: 483.543 },
  { x1: 503.999, x2: 39.984, length: 464.016 },
  { x1: 503.998, x2: 64.160, length: 439.84  },
]

const yPositions = [4.5, 37.5, 73.5, 106.5]

export function LinesLeft({ color, className = "", delay = 0 }: Props) {
  return (
    <svg width="356" height="111" viewBox="0 0 356 111" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {leftLines.map((line, i) => (
        <motion.line
          key={i}
          x1={line.x1} y1={yPositions[i]}
          x2={line.x2} y2={yPositions[i]}
          stroke={color}
          strokeWidth="9"
          strokeDasharray={line.length}
          initial={{ strokeDashoffset: -line.length }}
          whileInView={{ strokeDashoffset: 0 }}
          transition={{ duration: 0.6, delay: delay + i * 0.08, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      ))}
    </svg>
  )
}

export function LinesRight({ color, className = "", delay = 0 }: Props) {
  return (
    <svg width="356" height="111" viewBox="0 0 356 111" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {rightLines.map((line, i) => (
        <motion.line
          key={i}
          x1={line.x1} y1={yPositions[i]}
          x2={line.x2} y2={yPositions[i]}
          stroke={color}
          strokeWidth="9"
          strokeDasharray={line.length}
          initial={{ strokeDashoffset: line.length }}
          whileInView={{ strokeDashoffset: 0 }}
          transition={{ duration: 0.6, delay: delay + i * 0.08, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      ))}
    </svg>
  )
}
