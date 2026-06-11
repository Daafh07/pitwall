import { tracks } from "../lib/tracks";
import TrackCanvas from "./TrackCanvas";

type TrackKey = keyof typeof tracks;
type Track = typeof tracks[TrackKey];


export default function Home1({track}: {track: Track}) {
  const trackOrder = ["monaco", "barcelona", "austria"] as const;
  const currentIndex = trackOrder.indexOf(track.name.toLowerCase() as typeof trackOrder[number]);
  const nextTrack = trackOrder[(currentIndex + 1) % trackOrder.length];
  const prevTrack = trackOrder[(currentIndex - 1 + trackOrder.length) % trackOrder.length];


  return (
    <section className="relative min-h-screen pt-[70px] pb-[55px]" style={{ background: `${track.gradientDown}` }}>

        <img src="/icons/lines-left.svg" alt="" className="absolute left-0 top-[110px] h-[88px] pointer-events-none" />
        <img src="/icons/lines-right.svg" alt="" className="absolute right-0 top-[110px] h-[88px] pointer-events-none" />

        <div className="flex flex-col items-center gap-0">
            <p className="font-semibold text-[20px]" style={{ color: track.colorText }}>UPCOMING RACE</p>
            <h1 className="font-display text-[135px] leading-none -mt-2" style={{ color: track.colorText }}>
                {track.name}
            </h1>
        </div>

        {/* Links */}
        <div className="relative ml-[60px] mr-[60px] mt-2 h-[520px] flex">
            <img src="/track-box.svg" alt="" className="absolute inset-0 w-full h-full" />

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

        {/* Midden + rechts */}
        <div className="flex flex-1 h-full px-6 pt-4 pb-6">

            {/* Stats + lege ruimte */}
            <div className="flex flex-col flex-1">
                <div className="flex gap-12">
                    <div className="flex flex-col">
                        <p className="font-semibold text-[8px]" style={{ color: track.colorText }}>WHEN</p>
                        <p className="font-display text-[45px] leading-none" style={{ color: track.colorAccent }}>{track.date_start}-{track.date_end}</p>
                        <p className="font-display text-[45px] leading-none" style={{ color: track.colorText }}>{track.month}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="font-semibold text-[8px]" style={{ color: track.colorText }}>LENGHT</p>
                        <div className="flex items-end gap-1">
                            <p className="font-display text-[30px] leading-none" style={{ color: track.colorAccent }}>{track.track_length.replace(' km', '')}</p>
                            <p className="font-display text-[18px] leading-none mb-1" style={{ color: track.colorText }}>KM</p>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <p className="font-semibold text-[8px]" style={{ color: track.colorText }}>DISTANCE</p>
                        <div className="flex items-end gap-1">
                            <p className="font-display text-[30px] leading-none" style={{ color: track.colorAccent }}>{track.race_distance.replace(' km', '')}</p>
                            <p className="font-display text-[18px] leading-none mb-1" style={{ color: track.colorText }}>KM</p>
                        </div>
                    </div>
                </div>

                {/* Track */}
                    <div className="flex-1 w-full">
                        <TrackCanvas />
                    </div>
            </div>

            

            {/* Rechter kolom */}
            <div className="flex flex-col w-[200px] gap-6">
                <div>
                    <p className="font-semibold text-[8px]" style={{ color: track.colorText }}>FACTS</p>
                    <p className="font-semibold text-[12px] text-white mt-1">{track.facts}</p>
                </div>
                <div>
                    <p className="font-semibold text-[8px] border-b" style={{ color: track.colorText, borderColor: track.colorAccent + '40' }}>SCHEDULE</p>
                    <div className="flex flex-col mt-1">
                        {Object.values(track.schedule).map((item, index) => (
                            <div key={index} className="flex border-b" style={{ borderColor: track.colorAccent + '40' }}>
                                <p className="font-display text-[20px] leading-tight w-[110px]" style={{ color: index === 0 ? track.colorAccent : track.colorText }}>{item.label}</p>
                                <p className="font-display text-[20px] leading-tight w-[70px]" style={{ color: index === 0 ? track.colorAccent : track.colorText }}>{item.date}</p>
                                <p className="font-display text-[20px] leading-tight" style={{ color: index === 0 ? track.colorAccent : track.colorText }}>{item.time}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-auto pt-40">

                    <p className="font-semibold text-[8px]" style={{ color: track.colorText }}>CIRCUIT RECORD</p>
                    <p className="font-semibold text-[12px] text-white" >{track.circuit_record} {track.record_driver}</p>

                </div>


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
