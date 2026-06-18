"use client"

import { tracks } from "../lib/tracks";
import DecorDots from "./DecorDots";
import { motion } from "framer-motion"
import RevealText from "../components/RevealText"
import RevealMarker from "../components/RevealMarker"



type TrackKey = keyof typeof tracks;
type Track = typeof tracks[TrackKey];


export default function Home2({track}: {track: Track}) {
  return (
    <section className="relative overflow-hidden" style={{ background: `linear-gradient(to bottom, ${track.colorDark} 7%, ${track.colorPrimary} 30%, ${track.colorPrimary} 40%, ${track.colorDark} 60%, ${track.colorDark} 70%, ${track.colorPrimary} 100%)` }}>

      <div className="relative flex flex-col items-center mt-18">
        <DecorDots color={track.colorAccent} className="absolute pointer-events-none" style={{left: '-250px', width: '718px', top: '10%', transform: 'translateY(-50%)'}} />
        <h2 className="relative font-display text-[135px] leading-none -mt-2" style={{ color: track.colorText }}>
          {track.name.toUpperCase()}
        </h2>
        <RevealMarker color={track.colorPrimary} className="font-semibold text-[16px] leading-none -mt-3">LAST GP WINNERS</RevealMarker>
      </div>

      {track.winners.map((winner, index) => (
        <div key={index} className="relative flex items-center h-[900px] -mt-25">
     
        <motion.p className="absolute inset-0 flex items-center justify-center font-year tracking-tight text-[565px] leading-none" style={{ color: track.colorYear }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          viewport={{ once: true }}
        >{winner.year}</motion.p>

        <DecorDots color={track.colorAccent} className={`absolute pointer-events-none ${[" scale-y-[-1]", "", " scale-y-[-1]"][index % 3]}`} style={{left: `${[-580, -540, -500][index % 3]}px`, width: '718px', top: index === 1 ? 'calc(50% - 280px)' : `calc(50% + ${[120, 180][index === 0 ? 0 : 1]}px)`}} />
        <DecorDots color={track.colorAccent} className={`absolute pointer-events-none scale-x-[-1]${["", " scale-y-[-1]", ""][index % 3]}`} style={{right: `${[-430, -460, -400][index % 3]}px`, width: '718px', top: index === 1 ? 'calc(50% + 60px)' : `calc(50% - ${[210, 150][index === 0 ? 0 : 1]}px)`}} />
        {index === 0 && <DecorDots color={track.colorAccent} className="absolute pointer-events-none scale-x-[-1]" style={{right: '-300px', width: '718px', bottom: '-40px'}} />}
        {index === 1 && <DecorDots color={track.colorAccent} className="absolute pointer-events-none scale-y-[-1]" style={{left: '-300px', width: '718px', bottom: '-40px'}} />}

          <motion.img
            src={winner.image}
            alt={winner.name}
            className={`absolute bottom-[-1px] h-[700px] ${winner.side === "right" ? "right-[20%]" : "left-[20%] scale-x-[-1]"}`}
            initial={{ x: winner.side === "right" ? 200 : 200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
          />


          <div className={`absolute ${winner.side === "right" ? "left-[23%]" : "right-[23%]"} flex flex-col items-center`}>
            <RevealText color={track.colorAccent} className="font-display text-[40px] leading-none" style={{ color: track.colorAccent }}>
              {winner.name}
            </RevealText>
            {winner.description.split("|").map((line, i) => (
              <RevealText key={i} color={track.colorAccent} delay={0.1 + i * 0.1} className="font-medium text-[10px]" style={{ color: track.colorText }}>
                {line}
              </RevealText>
            ))}
          </div>


        </div>
      ))}

    </section>
  )
}