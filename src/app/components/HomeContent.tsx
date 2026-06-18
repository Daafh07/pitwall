"use client"

import { useState } from "react"
import TrackCover from "./TrackCover"
import Home1 from "./Home1"
import Home2 from "./Home2"
import Home3 from "./Home3"
import { tracks } from "../lib/tracks"

type TrackKey = keyof typeof tracks
type Track = typeof tracks[TrackKey]

const coverImages: Record<string, string> = {
  monaco: "/covers/monacocover.png",
  barcelona: "/covers/barcelonacover.png",
  austria: "/covers/austriacover.png",
}

export default function HomeContent({ track, trackKey, showCover }: { track: Track, trackKey: string, showCover: boolean }) {
  const [coverDismissed, setCoverDismissed] = useState(false)

  function handleDismissed() {
    setCoverDismissed(true)
    window.dispatchEvent(new CustomEvent("cover-dismissed"))
  }

  return (
    <>
      {showCover && !coverDismissed && (
        <TrackCover
          coverImage={coverImages[trackKey]}
          track={track}
          onDismissed={handleDismissed}
        />
      )}
      <Home1 track={track} ready={!showCover || coverDismissed} />
      <Home2 track={track} />
      <Home3 track={track} />
    </>
  )
}
