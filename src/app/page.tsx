import HomeContent from "./components/HomeContent";
import { tracks } from "./lib/tracks";

type TrackKey = keyof typeof tracks;

const coverImages: Record<string, string> = {
  monaco: "/covers/monacocover.png",
  barcelona: "/covers/barcelonacover.png",
  austria: "/covers/austriacover.png",
}

export default async function Home({ searchParams }: { searchParams: Promise<{ track?: string, from?: string }> }) {
  const { track, from } = await searchParams;
  const trackKey = (track as TrackKey) || "monaco";
  const activeTrack = tracks[trackKey] ?? tracks.monaco;
  const showCover = from !== "calendar" && !!coverImages[trackKey]

  return (
    <HomeContent track={activeTrack} trackKey={trackKey} showCover={showCover} />
  );
}
