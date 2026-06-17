"use client"

import { tracks } from "../lib/tracks";
import TrackCanvas from "./TrackCanvas";
import { LinesLeft, LinesRight } from "./Lines";
import RevealText from "./RevealText";

type TrackKey = keyof typeof tracks;
type Track = typeof tracks[TrackKey];


export default function Home1({track}: {track: Track}) {
  const trackOrder = ["monaco", "barcelona", "austria"] as const;
  const currentIndex = trackOrder.indexOf(track.name.toLowerCase() as typeof trackOrder[number]);
  const nextTrack = trackOrder[(currentIndex + 1) % trackOrder.length];
  const prevTrack = trackOrder[(currentIndex - 1 + trackOrder.length) % trackOrder.length];


  return (
    <section className="relative min-h-screen pt-[70px] pb-[55px]" style={{ background: `${track.gradientDown}` }}>

        <LinesLeft color={track.colorText} className="absolute left-0 top-[105px] h-[88px] pointer-events-none" />
        <LinesRight color={track.colorText} className="absolute right-0 top-[110px] h-[88px] pointer-events-none" />

        <div className="flex flex-col items-center gap-0">
            <p className="font-semibold text-[18px]" style={{ color: track.colorText }}>UPCOMING RACE</p>
            <p color={track.colorAccent} className="font-display text-[135px] leading-none -mt-2" style={{ color: track.colorText }}>
                {track.name}
            </p>
        </div>

        {/* Links */}
        <div className="relative ml-[60px] mr-[60px] mt-2 h-[520px] flex">
            <svg preserveAspectRatio="none" width="100%" height="100%" overflow="visible" viewBox="0 0 1367 616" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
              <path d="M1267.4 613H29C14.6406 613 3 601.359 3 587V312.252C3 305.216 5.85183 298.48 10.9042 293.583L54.9832 250.858C60.0356 245.961 62.8875 239.225 62.8875 232.189V29C62.8875 14.6406 74.528 3 88.8874 3H1338C1352.36 3 1364 14.6406 1364 29L1364 436.847C1364 446.724 1358.4 455.748 1349.56 460.138L1307.84 480.834C1298.99 485.223 1293.4 494.247 1293.4 504.125L1293.4 587C1293.4 601.359 1281.76 613 1267.4 613Z" stroke={track.colorText} strokeWidth="6" />
            </svg>

            <div className="flex flex-col items-center py-6 px-2 w-[54px] h-full">

                <div className="flex items-center justify-center -mt-6 w-[54px]">
                    <p className="font-display text-[38px] leading-none whitespace-nowrap" style={{ color: track.colorText, writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                        {track.geo}
                    </p>
                </div>
                <img src={track.flag} alt="" className="w-[25px] ml-[-5px] mt-2" />

                <div className="flex-1" />

            </div>

            <img src="/icons/f1-logo.svg" alt="" className="absolute bottom-6 left-6 w-[70px]" />

        
        <div className="absolute inset-0">
            <TrackCanvas
              trackFile={track.name}
              color={track.colorAccent}
              mirrorX={track.name === "Monaco"}
            />
        </div>

        {/* Teksten bovenop canvas */}
        <div className="flex flex-1 h-full px-6 pt-4 pb-6 pointer-events-none">
            {/* Stats links */}
            <div className="flex gap-12">
                <div className="flex flex-col">
                    <p className="font-semibold text-[8px]" style={{ color: track.colorText }}>WHEN</p>
                    <RevealText color={track.colorAccent} className="font-display text-[45px] leading-none" style={{ color: track.colorAccent }}>{track.date_start}-{track.date_end}</RevealText>
                    <RevealText color={track.colorAccent} className="font-display text-[45px] leading-none" style={{ color: track.colorText }}>{track.month}</RevealText>
                </div>
                <div className="flex flex-col">
                    <p className="font-semibold text-[8px]" style={{ color: track.colorText }}>LENGHT</p>
                    <div className="flex items-end gap-1">
                        <RevealText color={track.colorAccent} className="font-display text-[30px] leading-none" style={{ color: track.colorAccent }}>{track.track_length.replace(' km', '')}</RevealText>
                        <RevealText color={track.colorAccent} className="font-display text-[18px] leading-none mb-1" style={{ color: track.colorText }}>KM</RevealText>
                    </div>
                </div>
                <div className="flex flex-col">
                    <p className="font-semibold text-[8px]" style={{ color: track.colorText }}>DISTANCE</p>
                    <div className="flex items-end gap-1">
                        <RevealText color={track.colorAccent} className="font-display text-[30px] leading-none" style={{ color: track.colorAccent }}>{track.race_distance.replace(' km', '')}</RevealText>
                        <RevealText color={track.colorAccent} className="font-display text-[18px] leading-none mb-1" style={{ color: track.colorText }}>KM</RevealText>
                    </div>
                </div>
            </div>
        </div>

        {/* Rechter kolom: absolute rechts */}
        <div className="absolute top-4 right-6 bottom-4 flex flex-col w-[200px] gap-6">
            <div>
                <p className="font-semibold text-[8px]" style={{ color: track.colorText }}>FACTS</p>
                <RevealText color={track.colorAccent} className="font-semibold text-[12px] text-[#F4F4ED] mt-1">{track.facts}</RevealText>
            </div>
            <div>
                <p className="font-semibold text-[8px] border-b" style={{ color: track.colorText, borderColor: track.colorAccent + '40' }}>SCHEDULE</p>
                <div className="flex flex-col mt-1">
                    {Object.values(track.schedule).map((item, index) => (
                        <div key={index} className="flex border-b" style={{ borderColor: track.colorAccent + '40' }}>
                            <RevealText color={track.colorAccent} delay={index * 0.05} className="font-display text-[20px] leading-tight w-[100px]" style={{ color: index === 0 ? track.colorAccent : track.colorText }}>{item.label}</RevealText>
                            <RevealText color={track.colorAccent} delay={index * 0.05 + 0.05} className="font-display text-[20px] leading-tight w-[65px]" style={{ color: index === 0 ? track.colorAccent : track.colorText }}>{item.date}</RevealText>
                            <RevealText color={track.colorAccent} delay={index * 0.05 + 0.1} className="font-display text-[20px] leading-tight" style={{ color: index === 0 ? track.colorAccent : track.colorText }}>{item.time}</RevealText>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-auto">
                <p className="font-semibold text-[8px]" style={{ color: track.colorText }}>CIRCUIT RECORD</p>
                <RevealText color={track.colorAccent} className="font-semibold text-[12px] text-[#F4F4ED]">{track.circuit_record} {track.record_driver}</RevealText>
            </div>
        </div>

        <div className="flex flex-col gap-2 absolute bottom-1 right-0">
            <a href={`/?track=${nextTrack}`} className="w-[46px] h-[46px] rounded-[14px] flex items-center justify-center" style={{ backgroundColor: track.colorAccent }}>
                <img src="/icons/btn-forward.svg" alt="Next" className="w-[14px]" />
            </a>
            <a href={`/?track=${prevTrack}`} className="w-[46px] h-[46px] rounded-[14px] flex items-center justify-center" style={{ backgroundColor: track.colorAccent }}>
                <img src="/icons/btn-backward.svg" alt="Previous" className="w-[14px]" />
            </a>
        </div>

    </div>

        

    </section>
  )
}
