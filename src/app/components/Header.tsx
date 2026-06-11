"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";


export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className={`fixed top-0 w-full z-50 ${isHome ? "bg-[rgba(0,0,0,0.23)]" : "bg-[#2C2C2C]"} h-[56px]`}>
      <nav className="relative flex items-center justify-between h-full px-8">

        <div className="flex gap-8">
            <Link href="/" className={`font-semibold text-[14px] ${pathname === "/" ? "text-[#ff9d9d]" : "text-[#F4F4ED]"}`}>HOME</Link>
            <Link href="/calendar" className={`font-semibold text-[14px] ${pathname === "/calendar" ? "text-[#ff9d9d]" : "text-[#F4F4ED]"}`}>CALENDAR</Link>
            <Link href="/drivers" className={`font-semibold text-[14px] ${pathname === "/drivers" ? "text-[#ff9d9d]" : "text-[#F4F4ED]"}`}>DRIVERS</Link>
        </div>

        <span className="absolute left-1/2 -translate-x-1/2 font-display text-[26px] text-white flex items-center gap-2">
            <img src="/icons/vector-left.svg" alt="Left" className="h-4" />
          PITWALL
            <img src="/icons/vector-right.svg" alt="Right" className="h-4" />
        </span>

        <div className="flex gap-8">
            <Link href="/teams" className={`font-semibold text-[14px] ${pathname === "/teams" ? "text-[#ff9d9d]" : "text-[#F4F4ED]"}`}>TEAMS</Link>
            <Link href="/standings" className={`font-semibold text-[14px] ${pathname === "/standings" ? "text-[#ff9d9d]" : "text-[#F4F4ED]"}`}>STANDINGS</Link>
            <Link href="/analytics" className={`font-semibold text-[14px] ${pathname === "/analytics" ? "text-[#ff9d9d]" : "text-[#F4F4ED]"}`}>ANALYTICS</Link>
        </div>

      </nav>
    </header>
  );
}
