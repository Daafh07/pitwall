import { tracks } from "../lib/tracks";

type TrackKey = keyof typeof tracks;
type Track = typeof tracks[TrackKey];

export default function Home1({track}: {track: Track}) {
  return (
    <section className="relative min-h-screen pt-[70px] pb-[55px]" style={{ background: `${track.gradientDown}` }}>


    </section>
  )
}