"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import { tracks } from "../lib/tracks";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const searchParams = useSearchParams();
  const trackKey = (searchParams.get("track") || "monaco") as keyof typeof tracks;
  const activeColor = tracks[trackKey]?.colorHighlight ?? "#ff9d9d";

  const [scrolled, setScrolled] = useState(false)
  const [vectorReady, setVectorReady] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (pathname !== "/") {
      const t = setTimeout(() => setVectorReady(true), 0)
      return () => clearTimeout(t)
    }
    const onCoverDismissed = () => setVectorReady(true)
    window.addEventListener("cover-dismissed", onCoverDismissed)
    return () => window.removeEventListener("cover-dismissed", onCoverDismissed)
  }, [pathname])

  return (
    <header className={`fixed top-0 w-full z-50 transition-colors duration-1500 ${isHome && scrolled ? "bg-black/60 backdrop-blur-sm" : isHome ? "bg-[rgba(0,0,0,0.23)]" : "bg-[#2C2C2C]"} h-[56px]`}>
      <nav className="relative flex items-center justify-between h-full px-8">

        <div className="flex gap-8">
            <Link href="/" className="font-semibold text-[14px]" style={{ color: pathname === "/" ? activeColor : "#F4F4ED" }}>HOME</Link>
            <Link href="/calendar" className="font-semibold text-[14px]" style={{ color: pathname === "/calendar" ? activeColor : "#F4F4ED" }}>CALENDAR</Link>
            <Link href="/drivers" className="font-semibold text-[14px]" style={{ color: pathname === "/drivers" ? activeColor : "#F4F4ED" }}>DRIVERS</Link>
        </div>

        <span className="absolute left-1/2 -translate-x-1/2 font-display text-[26px] text-[#F4F4ED] flex items-center gap-2">
            <motion.img src="/icons/vector-left.svg" alt="Left" className="h-4"
              initial={{ clipPath: "inset(-20px -20px -20px 100%)", opacity: 0 }}
              animate={vectorReady ? { clipPath: "inset(-20px -20px -20px -20px)", opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          <Link href="/">PITWALL</Link>
            <motion.img src="/icons/vector-right.svg" alt="Right" className="h-4"
              initial={{ clipPath: "inset(-20px 100% -20px 100%)", opacity: 0 }}
              animate={vectorReady ? { clipPath: "inset(-20px -20px -20px -20px)", opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
        </span>

        <div className="flex gap-8">
            <Link href="/teams" className="font-semibold text-[14px]" style={{ color: pathname === "/teams" ? activeColor : "#F4F4ED" }}>TEAMS</Link>
            <Link href="/standings" className="font-semibold text-[14px]" style={{ color: pathname === "/standings" ? activeColor : "#F4F4ED" }}>STANDINGS</Link>
            <Link href="/analytics" className="font-semibold text-[14px]" style={{ color: pathname === "/analytics" ? activeColor : "#F4F4ED" }}>ANALYTICS</Link>
        </div>

      </nav>
    </header>
  );
}
