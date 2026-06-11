//page.tsx - pagina waar de "home" wordt aangeroepen via de componenten.

import Home1 from "./components/Home1";
import { tracks } from "./lib/tracks";

type TrackKey = keyof typeof tracks;

export default async function Home({ searchParams }: { searchParams: Promise<{ track?: string }> }) {
  const { track } = await searchParams;
  const trackKey = (track as TrackKey) || "monaco";
  const activeTrack = tracks[trackKey] ?? tracks.monaco;

  return <Home1 track={activeTrack} />;
}