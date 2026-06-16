"use client"

import { useState, useEffect } from "react"
import { LinesLeft, LinesRight } from "./Lines"
import TrackCanvas from "./TrackCanvas"
import { tracks } from "../lib/tracks"

type Track = typeof tracks[keyof typeof tracks]

export default function RaceCountdown({ targetDate, track, className = "", onDark = true }: { targetDate: string, track: Track, className?: string, onDark?: boolean }) {
  const textColor = onDark ? track.colorText : '#F4F4ED'
  const accentColor = onDark ? track.colorAccent : '#2C2C2C'
  const yearColor = onDark ? track.colorYear : track.colorAccent

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const target = new Date(targetDate)
    const interval = setInterval(() => {
      const now = new Date()
      const diff = target.getTime() - now.getTime()
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / (1000 * 60)) % 60)
      const seconds = Math.floor((diff / 1000) % 60)
      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <div className={`relative flex items-center justify-center pt-20 pb-22 ${className}`}>

      <LinesLeft color={textColor} className="absolute left-[-140px] w-[300px] mt-10 pointer-events-none" />
      <LinesRight color={textColor} className="absolute right-[-140px] w-[300px] mt-10 pointer-events-none" />

      <div className="relative flex flex-col -mt-6 items-center">
        <div className="w-[180px] h-[80px] mb-2">
          <TrackCanvas speed={0.004} trackFile="Austria" color={track.colorAccent} mirrorX={false} />
        </div>
        <p className="font-semibold text-[8px] -mt-6 mb-2" style={{ color: textColor }}>NEXT RACE BEGINS IN...</p>
        <p className="font-display text-[132px] leading-none whitespace-nowrap">
          <span style={{ color: textColor }}>{String(timeLeft.days).padStart(2, '0')}</span><span style={{ color: accentColor }} className="mr-4">D</span>
          <span style={{ color: textColor }}>{String(timeLeft.hours).padStart(2, '0')}</span><span style={{ color: accentColor }} className="mr-4">H</span>
          <span style={{ color: textColor }}>{String(timeLeft.minutes).padStart(2, '0')}</span><span style={{ color: accentColor }} className="mr-4">M</span>
          <span style={{ color: textColor }}>{String(timeLeft.seconds).padStart(2, '0')}</span><span style={{ color: accentColor }}>S</span>
        </p>
      </div>

      <p className="absolute font-marker mt-[58px] text-[92px] -rotate-[8.79deg] pointer-events-none" style={{ color: yearColor }}>
        RACE DAY
      </p>

    </div>
  )
}
