"use client"

import { motion } from "framer-motion"
import { useRef } from "react"

export default function RevealText({ children, color, className, wrapperClassName, delay = 0, style, triggered }: {
  children: React.ReactNode
  color: string
  className?: string
  wrapperClassName?: string
  delay?: number
  style?: React.CSSProperties
  triggered?: boolean
}) {
  const useTriggered = triggered !== undefined
  const mountedTrue = useRef(triggered === true)
  const actualDelay = mountedTrue.current ? 0 : delay

  const sweepVariants = {
    hidden: { x: "-100%" },
    visible: { x: "100%" },
  }

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <div className={`relative overflow-hidden ${wrapperClassName ?? ""}`} style={{ width: "fit-content" }}>
      <motion.div
        className={className}
        style={style}
        variants={textVariants}
        initial="hidden"
        {...(useTriggered
          ? { animate: triggered ? "visible" : "hidden" }
          : { whileInView: "visible", viewport: { once: true } }
        )}
        transition={{ duration: 0, delay: actualDelay + 0.4 }}
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute inset-0"
        style={{ background: color }}
        variants={sweepVariants}
        initial="hidden"
        {...(useTriggered
          ? { animate: triggered ? "visible" : "hidden" }
          : { whileInView: "visible", viewport: { once: true } }
        )}
        transition={{ duration: 0.8, ease: "easeInOut", delay: actualDelay }}
      />
    </div>
  )
}
