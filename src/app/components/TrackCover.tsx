"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import DecorDots from "./DecorDots"

type CoverData = {
  name: string
  coverLabel: string
  coverNameColor: string
  coverLabelColor: string
  coverButtonColor: string
  coverNameFont: string
  coverLabelFont: string
  coverNameOffset: number
}

export default function TrackCover({ coverImage, onDismissed, track }: { coverImage: string, onDismissed?: () => void, track: CoverData }) {
  const [y, setY] = useState(0)
  const [visible, setVisible] = useState(true)
  const dismissedRef = useRef(false)

  const animate = () => {
    if (dismissedRef.current) return
    dismissedRef.current = true

    const start = performance.now()
    const duration = 900

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const ease = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2
      setY(-ease * 100)
      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        document.body.style.overflow = ""
        document.documentElement.style.overflow = ""
        setVisible(false)
        onDismissed?.()
      }
    }

    requestAnimationFrame(tick)
  }

  useEffect(() => {
    document.body.style.overflow = "hidden"

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      window.removeEventListener("wheel", handleWheel)
      animate()
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => {
      window.removeEventListener("wheel", handleWheel)
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-50 cursor-pointer overflow-hidden"
      style={{ transform: `translateY(${y}%)` }}
      onClick={animate}
    >
      <img src={coverImage} alt="" className="w-full h-full object-cover" />

      {/* Label + naam rechtsboven */}
      <div className="absolute top-10 right-14 text-right">
        <p className={`${track.coverLabelFont} font-semibold text-[22px] tracking-wider`} style={{ color: track.coverLabelColor }}>{track.coverLabel}</p>
        <div className="relative overflow-hidden" style={{ width: "fit-content", marginLeft: "auto" }}>
          <p className={`${track.coverNameFont} text-[120px] leading-none`} style={{ color: track.coverNameColor, marginTop: track.coverNameOffset }}>{track.name.toUpperCase()}</p>
          <motion.div className="absolute inset-0" style={{ background: track.coverNameColor }}
            initial={{ x: 0 }} animate={{ x: "100%" }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
          />
        </div>
      </div>

      {/* Lines linksboven */}
      <div className="absolute top-10 left-0 w-[300px] pointer-events-none">
        <svg width="356" height="111" viewBox="0 0 356 111" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          {[{x1:356,x2:-148,len:504},{x1:335.543,x2:-148,len:483.543},{x1:316.016,x2:-148,len:464.016},{x1:291.84,x2:-148,len:439.84}].map((l,i) => (
            <motion.line key={i} x1={l.x1} y1={[4.5,37.5,73.5,106.5][i]} x2={l.x2} y2={[4.5,37.5,73.5,106.5][i]}
              stroke={track.coverNameColor} strokeWidth="9"
              strokeDasharray={l.len}
              initial={{ strokeDashoffset: -l.len }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
            />
          ))}
        </svg>
      </div>

      {/* Lines rechtsonder */}
      <div className="absolute bottom-20 right-0 w-[300px] pointer-events-none rotate-180">
        <svg width="356" height="111" viewBox="0 0 356 111" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          {[{x1:356,x2:-148,len:504},{x1:335.543,x2:-148,len:483.543},{x1:316.016,x2:-148,len:464.016},{x1:291.84,x2:-148,len:439.84}].map((l,i) => (
            <motion.line key={i} x1={l.x1} y1={[4.5,37.5,73.5,106.5][i]} x2={l.x2} y2={[4.5,37.5,73.5,106.5][i]}
              stroke={track.coverNameColor} strokeWidth="9"
              strokeDasharray={l.len}
              initial={{ strokeDashoffset: -l.len }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
            />
          ))}
        </svg>
      </div>

      {/* Decor dots linksonder */}
      <DecorDots color={track.coverNameColor} className="absolute pointer-events-none" style={{ left: "-370px", bottom: "60px", width: "718px" }} />

      {/* Scroll down knop */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="px-8 py-3 rounded-full opacity-90" style={{ backgroundColor: track.coverButtonColor }}>
          <p className="font-semibold text-[16px] text-white whitespace-nowrap">Scroll</p>
        </div>
      </div>
    </div>
  )
}
