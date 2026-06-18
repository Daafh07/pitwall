"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { tracks } from "../lib/tracks"
import { races } from "../lib/calendar"
import { LinesLeft, LinesRight } from "../components/Lines"
import RaceCountdown from "../components/RaceCountdown"
import TrackCanvas from "../components/TrackCanvas"
import { AnimatePresence, motion } from "framer-motion"
import RevealMarker from "../components/RevealMarker"
import RevealText from "../components/RevealText"


type TrackKey = keyof typeof tracks

const upcomingRound = 6

const trackKeyByRound: Record<number, TrackKey> = {
  6: "monaco",
  7: "barcelona",
  8: "austria",
}

export default function CalendarPage() {
  return <Suspense><CalendarContent /></Suspense>
}

function CalendarContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialTrack = searchParams.get("track") as TrackKey | null
  const [selectedTrack, setSelectedTrack] = useState<TrackKey | null>(initialTrack)
  const track = selectedTrack ? tracks[selectedTrack] : tracks.monaco
  const [hoveredTrack, setHoveredTrack] = useState<TrackKey | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })



  return (
    <main className="bg-[#111112] pt-[56px] overflow-x-clip">

      <section className="relative flex flex-col items-center pt-10 pb-14 overflow-x-clip">


        <LinesLeft color="#F4F4ED" className="absolute left-[-70px] top-[65px] h-[88px] pointer-events-none" delay={0.7} />
        <LinesRight color="#F4F4ED" className="absolute right-[-70px] top-[70px] h-[88px] pointer-events-none" delay={0.7} />

        <p className="font-semibold text-[18px] text-[#F4F4ED] mb-[-10px]">UPCOMING</p>

        <div className="relative">
          <h1 className="font-display text-[135px] leading-none text-[#F4F4ED]">CALENDAR</h1>
          <RevealMarker color={track.colorAccent} className="absolute top-14 right-[-46px] font-marker text-[60px] -rotate-[5.5deg] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.34)]">
            2026
          </RevealMarker>
        </div>

      </section>

      
      <section>


        <div className="grid px-10 mb-2 sticky top-[56px] z-10 bg-[#111112] py-2" style={{ gridTemplateColumns: '120px 320px 280px 140px 1fr' }}>
          <p className="font-semibold text-[8px] text-[#F4F4ED]">ROUND</p>
          <p className="font-semibold text-[8px] text-[#F4F4ED]">LOCATION</p>
          <p className="font-semibold text-[8px] text-[#F4F4ED]">WHEN</p>
          <p className="font-semibold text-[8px] text-[#F4F4ED]">LAPS</p>
          <p className="font-semibold text-[8px] text-[#F4F4ED]">WINNER</p>
        </div>

        {races.map((race, i) => {
          const roundNum = Number(race.round)
          const trackKey = trackKeyByRound[roundNum]
          const isSelected = trackKey === selectedTrack
          const isHovered = trackKey === hoveredTrack
          const isCompleted = roundNum < upcomingRound
          const rowColor = isSelected
            ? tracks[trackKey].colorAccent
            : isHovered && trackKey
              ? tracks[trackKey].colorAccent
              : '#F4F4ED'
          return (
            <div key={i}>
              <div

                onMouseEnter={() => trackKey && !isSelected && setHoveredTrack(trackKey)}
                onMouseLeave={() => setHoveredTrack(null)}
                onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}

                onClick={() => { if (trackKey) { setSelectedTrack(trackKey); router.replace(`/calendar?track=${trackKey}`, { scroll: false }) } }}
                className={`relative grid items-center h-[80px] px-10 border-t border-b border-[#2C2C2C] ${trackKey ? 'cursor-pointer' : ''}`}
                style={{
                  gridTemplateColumns: '120px 320px 280px 140px 1fr',
                  background: isSelected ? '#2c2c2c' : isHovered && trackKey ? '#2c2c2c' : 'rgba(0,0,0,0.23)',
                }}
              >
                {isCompleted && (
                  <motion.p
                    className="absolute left-[50px] font-marker text-[80px] rotate-[16deg] leading-none pointer-events-none drop-shadow-[0px_4px_4px_rgba(0,0,0,0.34)]"
                    style={{ color: track.colorAccent }}
                    initial={{ clipPath: "inset(-20px 100% -20px -20px)", opacity: 0 }}
                    whileInView={{ clipPath: "inset(-20px -20px -20px -20px)", opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 + i * 0.05 }}
                    viewport={{ once: true }}
                  >
                    /
                  </motion.p>
                )}
                <p className="font-display text-[60px]" style={{ color: rowColor, transition: 'color 0.3s ease' }}>{race.round}</p>
                <p className="font-display text-[60px]" style={{ color: rowColor, transition: 'color 0.3s ease' }}>{race.location}</p>
                <p className="font-display text-[60px]" style={{ color: rowColor, transition: 'color 0.3s ease' }}>{race.when}</p>
                <p className="font-display text-[60px]" style={{ color: rowColor, transition: 'color 0.3s ease' }}>{race.laps}</p>
                <p className="font-display text-[60px]" style={{ color: rowColor, transition: 'color 0.3s ease' }}>{race.winner}</p>
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: '#111112' }}
                  initial={{ x: 0 }}
                  whileInView={{ x: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut", delay: i * 0.05 }}
                  viewport={{ once: true, amount: 0.1 }}
                />
              </div>
              <AnimatePresence mode="wait">
              {isSelected && (
                <motion.div
                id="expanded-card"
                key={selectedTrack}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0, transition: { opacity: { duration: 0.05 }, height: { duration: 0.7 } } }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
                className="relative mx-[60px] my-12"
                onAnimationComplete={() => { if (isSelected) { setTimeout(() => { const el = document.getElementById("expanded-card"); if (el) { const rect = el.getBoundingClientRect(); const middle = rect.top + window.scrollY + rect.height / 2 - window.innerHeight / 2; window.scrollTo({ top: middle, behavior: "smooth" }) } }, 50) } }}
                  >

                  <svg preserveAspectRatio="none" width="100%" height="100%" overflow="visible" viewBox="0 0 1367 616" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
                    <path d="M1267.4 613H29C14.6406 613 3 601.359 3 587V312.252C3 305.216 5.85183 298.48 10.9042 293.583L54.9832 250.858C60.0356 245.961 62.8875 239.225 62.8875 232.189V29C62.8875 14.6406 74.528 3 88.8874 3H1338C1352.36 3 1364 14.6406 1364 29L1364 436.847C1364 446.724 1358.4 455.748 1349.56 460.138L1307.84 480.834C1298.99 485.223 1293.4 494.247 1293.4 504.125L1293.4 587C1293.4 601.359 1281.76 613 1267.4 613Z" stroke={track.colorAccent} strokeWidth="6" />
                  </svg>
                  <div className="relative h-[520px] flex">

                    <div className="flex flex-col items-center py-6 px-2 w-[54px] h-full">
                      <p className="font-display text-[38px] leading-none whitespace-nowrap" style={{ color: '#F4F4ED', writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                        {track.geo}
                      </p>
                      <img src={track.flag} alt="" className="w-[25px] ml-[-5px] mt-2" />
                    </div>

                    <div className="absolute inset-0">
                      <TrackCanvas
                        trackFile={track.name}
                        color={track.colorAccent}
                        mirrorX={selectedTrack === "monaco"}
                      />
                    </div>

                    <div className="flex flex-1 h-full px-6 pt-4 pb-6 pointer-events-none">
                      <div className="flex gap-12">
                        <div className="flex flex-col">
                          <p className="font-semibold text-[8px]" style={{ color: '#F4F4ED' }}>WHEN</p>
                          <RevealText color={track.colorAccent} className="font-display text-[45px] leading-none" style={{ color: track.colorAccent }}>{track.date_start}-{track.date_end}</RevealText>
                          <RevealText color={track.colorAccent} className="font-display text-[45px] leading-none" style={{ color: '#F4F4ED' }}>{track.month}</RevealText>
                        </div>
                        <div className="flex flex-col">
                          <p className="font-semibold text-[8px]" style={{ color: '#F4F4ED' }}>LENGTH</p>
                          <div className="flex items-end gap-1">
                            <RevealText color={track.colorAccent} className="font-display text-[30px] leading-none" style={{ color: track.colorAccent }}>{track.track_length.replace(' km', '')}</RevealText>
                            <RevealText color={track.colorAccent} className="font-display text-[18px] leading-none mb-1" style={{ color: '#F4F4ED' }}>KM</RevealText>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <p className="font-semibold text-[8px]" style={{ color: '#F4F4ED' }}>DISTANCE</p>
                          <div className="flex items-end gap-1">
                            <RevealText color={track.colorAccent} className="font-display text-[30px] leading-none" style={{ color: track.colorAccent }}>{track.race_distance.replace(' km', '')}</RevealText>
                            <RevealText color={track.colorAccent} className="font-display text-[18px] leading-none mb-1" style={{ color: '#F4F4ED' }}>KM</RevealText>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-4 right-6 bottom-4 flex flex-col w-[200px] gap-6">
                      <div>
                        <p className="font-semibold text-[8px]" style={{ color: '#F4F4ED' }}>FACTS</p>
                        <RevealText color={track.colorAccent} className="font-semibold text-[12px] text-[#F4F4ED] mt-1">{track.facts}</RevealText>
                      </div>
                      <div>
                        <p className="font-semibold text-[8px] border-b" style={{ color: '#F4F4ED', borderColor: '#282C20' }}>SCHEDULE</p>
                        <div className="flex flex-col mt-1">
                          {Object.values(track.schedule).map((item, index) => (
                            <div key={index} className="flex border-b" style={{ borderColor: '#282C20' }}>
                              <RevealText color={track.colorAccent} delay={index * 0.05} className="font-display text-[20px] leading-tight w-[100px]" style={{ color: index === 0 ? track.colorAccent : '#F4F4ED' }}>{item.label}</RevealText>
                              <RevealText color={track.colorAccent} delay={index * 0.05 + 0.05} className="font-display text-[20px] leading-tight w-[65px]" style={{ color: index === 0 ? track.colorAccent : '#F4F4ED' }}>{item.date}</RevealText>
                              <RevealText color={track.colorAccent} delay={index * 0.05 + 0.1} className="font-display text-[20px] leading-tight" style={{ color: index === 0 ? track.colorAccent : '#F4F4ED' }}>{item.time}</RevealText>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-auto">
                        <p className="font-semibold text-[8px]" style={{ color: '#F4F4ED' }}>CIRCUIT RECORD</p>
                        <RevealText color={track.colorAccent} className="font-semibold text-[12px] text-[#F4F4ED]">{track.circuit_record} {track.record_driver}</RevealText>
                      </div>
                    </div>

                    <img src="/icons/f1-logo.svg" alt="" className="absolute bottom-6 left-6 w-[70px]" />
                    <a
                      href={`/?track=${selectedTrack}&from=calendar`}
                      className="absolute bottom-14.5 right-0 w-[46px] h-[46px] rounded-[10px] bg-[#F4F4ED] flex items-center justify-center"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="9" stroke="#111112" strokeWidth="2"/>
                        <rect x="9" y="8" width="2" height="7" rx="1" fill="#111112"/>
                        <rect x="9" y="5" width="2" height="2" rx="1" fill="#111112"/>
                      </svg>
                    </a>

                  </div>
                </motion.div>
              )}
              </AnimatePresence>
            </div>
          )
        })}

      </section>

      <RaceCountdown targetDate={tracks.austria.raceDate} track={track} className="-mt-8" onDark={false} />

      {hoveredTrack && (
        <div
          className="fixed pointer-events-none z-50 w-[200px] h-[150px] bg-[#2C2C2C] rounded-lg overflow-hidden"
          style={{ left: mousePos.x + 16, top: mousePos.y + 16 }}
        >
          <TrackCanvas
            speed={0.002}
            trackFile={tracks[hoveredTrack].name}
            color={tracks[hoveredTrack].colorAccent}
            mirrorX={hoveredTrack === "monaco"}
          />
        </div>
      )}

    </main>
  )
}