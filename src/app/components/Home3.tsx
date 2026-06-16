"use client"

import { tracks } from "../lib/tracks";
import { races } from "../lib/calendar";
import RaceCountdown from "./RaceCountdown";

type TrackKey = keyof typeof tracks;
type Track = typeof tracks[TrackKey];

export default function Home3({track}: {track: Track}) {

    return (
        <section className="relative overflow-x-hidden" style={{ background: `${track.gradientDown}` }}>

        <div className="relative flex flex-col items-center pt-18">
            <div className="relative">
            <h2 className="font-display text-[135px] leading-none" style={{ color: track.colorText }}>
            HISTORY MADE
            </h2>
            <p className="absolute top-14 right-[-45px] font-marker text-[60px] -rotate-[8deg] xt-[76px] -rotate-[7deg] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.34)]" style={{ color: track.colorYear }}>
            2026
            </p>
        </div>
        <p className="font-semibold text-[19px] leading-none -mt-2" style={{ color: track.colorYear }}>
            LAST 5 2026 PERFORMANCES
        </p>
        </div>


        <div className="grid mt-20 mb-2 px-10" style={{ gridTemplateColumns: '120px 280px 320px 150px 1fr'}}>
        <p className="font-semibold text-[8px]" style={{ color: track.colorText }}>ROUND</p>
        <p className="font-semibold text-[8px]" style={{ color: track.colorText }}>LOCATION</p>
        <p className="font-semibold text-[8px]" style={{ color: track.colorText }}>WHEN</p>
        <p className="font-semibold text-[8px]" style={{ color: track.colorText }}>LAPS</p>
        <p className="font-semibold text-[8px]" style={{ color: track.colorText }}>WINNER</p>
        </div>

        
              
        {races.slice(0, 5).map((race, i) => (
        <div key={i} className="grid items-center h-[80px] px-10 bg-black/23" style={{ gridTemplateColumns: '120px 280px 320px 150px 1fr' }}>
            <p className="font-display text-[60px] leading-none" style={{ color: track.colorText }}>{race.round}</p>
            <p className="font-display text-[60px] leading-none" style={{ color: track.colorText }}>{race.location}</p>
            <p className="font-display text-[60px] leading-none" style={{ color: track.colorText }}>{race.when}</p>
            <p className="font-display text-[60px] leading-none" style={{ color: track.colorText }}>{race.laps}</p>
            <p className="font-display text-[60px] leading-none" style={{ color: track.colorText }}>{race.winner}</p>
        </div>
        ))}


        <div className="grid items-center h-[80px] mt-12 px-10 bg-black/23" style={{ gridTemplateColumns: '120px 280px 320px 150px 1fr' }}>
        <p className="font-display text-[60px] leading-none" style={{ color: track.colorText }}>{races[5].round}</p>
        <p className="font-display text-[60px] leading-none" style={{ color: track.colorText }}>{races[5].location}</p>
        <p className="font-display text-[60px] leading-none" style={{ color: track.colorText }}>{races[5].when}</p>
        <p className="font-display text-[60px] leading-none" style={{ color: track.colorText }}>{races[5].laps}</p>
        <p className="font-display text-[60px] leading-none" style={{ color: track.colorText }}>{races[5].winner}</p>
        </div>

        

        <RaceCountdown targetDate={tracks.austria.raceDate} track={track} className="mt-[-40px]" />

        </section>
    );

}