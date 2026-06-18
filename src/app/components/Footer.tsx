"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Footer() {
    const pathname = usePathname();

    const pageOrder = ["/", "/calendar", "/drivers", "/teams", "/standings", "/analytics"] as const;
    const currentPageIndex = pageOrder.indexOf(pathname as typeof pageOrder[number]);
    const nextPage = pageOrder[(currentPageIndex + 1) % pageOrder.length];
    const prevPage = pageOrder[(currentPageIndex - 1 + pageOrder.length) % pageOrder.length];

    const backHref = prevPage;
    const nextHref = nextPage;


    return (
    <footer className={`w-full h-[64px] flex items-center justify-between px-14 z-50 -mt-[64px] ${pathname === "/" ? "bg-[rgba(0,0,0,0.23)]" : "bg-[#2C2C2C]"}`}>

      {/* BACK */}
      <Link href={backHref} className="flex items-center justify-center w-[75px] h-[32px] rounded-[31px] border-4 border-[#F4F4ED] bg-transparent">
        <span className="font-semibold text-[12px] text-[#F4F4ED]">BACK</span>
      </Link>

      {/* TOP */}
      <button onClick={() => document.documentElement.scrollTo({top: 0, behavior: "smooth"})} className="flex items-center justify-center w-[120px] h-[40px] rounded-[31px] border-4 border-[#F4F4ED] cursor-pointer bg-transparent">
        <span className="font-semibold text-[14px] text-[#F4F4ED]">TOP</span>
      </button>

      {/* NEXT */}
      <Link href={nextHref} className="flex items-center justify-center w-[75px] h-[32px] rounded-[31px] border-4 border-[#F4F4ED] bg-transparent">
        <span className="font-semibold text-[12px] text-[#F4F4ED]">NEXT</span>
      </Link>

    </footer>
  );
}
