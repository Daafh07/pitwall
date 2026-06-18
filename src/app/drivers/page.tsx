"use client"

import { LinesLeft, LinesRight } from "../components/Lines"
import { DriverDecor } from "../components/DriverDecor"
import { drivers } from "../lib/drivers"
import RevealText from "../components/RevealText"
import { motion } from "framer-motion"
import RevealMarker from "../components/RevealMarker"


export default function DriversPage() {
  return (
   <main  className="bg-[#111112] pt-[56px] overflow-x-clip">
    
          <section className="relative flex flex-col items-center pt-14 pb-14 overflow-x-clip">
    
    
            <LinesLeft color="#F4F4ED" className="absolute left-[-70px] top-[65px] h-[88px] pointer-events-none" delay={0.7} />
            <LinesRight color="#F4F4ED" className="absolute right-[-70px] top-[70px] h-[88px] pointer-events-none" delay={0.7} />
    
            <div className="relative">
              <h1 className="font-display text-[135px] leading-none text-[#F4F4ED]">DRIVERS</h1>
              <RevealMarker color="#ff7474" className="absolute top-14 right-[-60px] font-marker text-[60px] -rotate-[5.5deg] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.34)]">2026</RevealMarker>
            </div>
    
          </section>

          <section className="px-10 pb-16 grid grid-cols-2 gap-12 mr-4 ml-4">
          {drivers.map((driver, i) => (
            <div
              key={i}
              className="relative rounded-[25px] h-[360px] overflow-hidden"
              style={{ background: `linear-gradient(to bottom, ${driver.gradientFrom}, ${driver.gradientTo})` }}
            >

              <DriverDecor color={driver.up}  className="absolute top-4 left-85 pointer-events-none" />
              <DriverDecor color={driver.down} flip={true} className="absolute bottom-16 right-80 pointer-events-none" />

              <div className="absolute top-6 left-7">
                <RevealText color="white" className="font-display text-[38px] leading-none text-white">{driver.name}</RevealText>
                <RevealText color="white" delay={0.1} className="font-semibold text-[17px] text-white -mt-1">{driver.team}</RevealText>
                <img src={driver.teamicon} alt="" className="w-[17px] mt-0.5" />
              </div>

              <motion.p
                className="absolute right-28 top-7 font-year leading-none select-none pointer-events-none text-[280px]"
                style={{ color: driver.numberColor }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                {driver.number}
              </motion.p>

              <div className="absolute right-0 top-18 bottom-0 h-full w-[45%] overflow-hidden pointer-events-none">
                <motion.img
                  src={driver.image}
                  alt={driver.name}
                  className="absolute bottom-0 right-0 h-full w-full object-cover object-top"
                  initial={{ x: 60, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                  viewport={{ once: true }}
                />
              </div>

              <div className="absolute bottom-3 left-4">
                <div className="w-[42px] h-[42px] rounded-full overflow-hidden">
                  <img src={driver.flag} alt="" className="w-full h-full object-cover" />
                </div>
              </div>

            </div>
                
          
          ))}
        </section>

        <p className="text-center font-semibold text-[12px] text-[#7b7b7b] pb-28">14 more to come....</p>
     
      </main>
  )
}
