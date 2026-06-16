"use client";

import { usePathname, useSearchParams } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();
    const isHome = pathname === "/";

    const searchParams = useSearchParams();
    const trackOrder = ["monaco", "barcelona", "austria"] as const;
    const currentTrack = (searchParams.get("track") || "monaco") as typeof trackOrder[number];
    const currentIndex = trackOrder.indexOf(currentTrack);
    const nextTrack = trackOrder[(currentIndex + 1) % trackOrder.length];
    const prevTrack = trackOrder[(currentIndex - 1 + trackOrder.length) % trackOrder.length];

    const backHref = isHome ? `/?track=${prevTrack}` : "#";
    const nextHref = isHome ? `/?track=${nextTrack}` : "#";


    return (
    <footer className={`w-full h-[64px] flex items-center justify-between px-14 z-50 -mt-[64px] ${isHome ? "bg-[rgba(0,0,0,0.23)]" : "bg-[#2C2C2C]"}`}>

      {/* BACK */}
      <a href={backHref} className="flex items-center justify-center w-[75px] h-[32px] rounded-[31px] border-4 border-[#F4F4ED] bg-transparent">
        <span className="font-semibold text-[12px] text-[#F4F4ED]">BACK</span>
      </a>

      {/* TOP */}
      <button onClick={() => document.documentElement.scrollTo({top: 0, behavior: "smooth"})} className="flex items-center justify-center w-[120px] h-[40px] rounded-[31px] border-4 border-[#F4F4ED] cursor-pointer bg-transparent">
        <span className="font-semibold text-[14px] text-[#F4F4ED]">TOP</span>
      </button>

      {/* NEXT */}
      <a href={nextHref} className="flex items-center justify-center w-[75px] h-[32px] rounded-[31px] border-4 border-[#F4F4ED] bg-transparent">
        <span className="font-semibold text-[12px] text-[#F4F4ED]">NEXT</span>
      </a>

    </footer>
  );
}
