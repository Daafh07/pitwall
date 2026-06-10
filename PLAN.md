# PITWALL — F1 Dashboard Build Plan

## Context

You're building PITWALL: a full-stack F1 information dashboard in Next.js 15 (App Router), React 19, TypeScript, and Tailwind CSS v4. The Figma design is complete and the project is already scaffolded with the right fonts (Bebas Neue + Mona Sans) and base colors. This plan is a **learning roadmap** — it tells you *what* to build, *in what order*, and *what concepts to learn*, but leaves the actual coding to you.

Data source: **OpenF1 API** (`https://api.openf1.org/v1`) — free, no auth, modern REST.

---

## What You're Building (from the Figma)

### Pages & Routes
| Route | What it is |
|---|---|
| `/` | Homepage — 3 scroll sections |
| `/calendar` | Full 2026 season calendar |
| `/calendar/[slug]` | Individual race detail page (e.g. `/calendar/monaco`) |
| `/drivers` | Driver grid |
| `/teams` | Team cards (MCL2026-style) |
| `/standings` | Championship tables |
| `/analytics` | Analytics/charts page |

### Homepage (3 scroll sections)
1. **HOME 1 — Hero**: Nav + "UPCOMING RACE / MONACO" + track minimap (circuit outline) + date/stats + schedule sidebar
2. **HOME 2 — Previous Winners**: Large year numbers, driver illustrations, past winners of this race (e.g. Norris 2026, Leclerc 2025/2024, Verstappen 2023)
3. **HOME 3 — History + Timer**: "HISTORY MADE" table of last 5 race results + race day countdown at the bottom

### Calendar Page
- Round list (01 AUSTRALIA → 22 ABU DHABI) with date, laps, winner columns
- Clicking a race expands a card showing the track minimap + schedule
- Countdown timer at the bottom

### Race Detail Page (`/calendar/[slug]`)
- Full scrollable page: hero with track + cover image, previous winners scroll, history/results section

### Drivers Page
- Grid of driver cards with photo, name, team, number

### Teams Page
- Team cards showing: team color theme, car illustration, both driver names

---

## Folder Structure

```
src/
  app/
    layout.tsx              ← root layout: header + footer wrap all pages
    page.tsx                ← homepage (3 sections)
    calendar/
      page.tsx              ← calendar listing
      [slug]/
        page.tsx            ← race detail page
    drivers/
      page.tsx
    teams/
      page.tsx
    standings/
      page.tsx
    analytics/
      page.tsx
    components/
      Header.tsx
      Footer.tsx
      TrackMinimap.tsx      ← Three.js component (client)
      Countdown.tsx         ← countdown timer (client, uses setInterval)
      RaceSchedule.tsx
      ResultsTable.tsx
      DriverCard.tsx
      TeamCard.tsx
      PreviousWinners.tsx
    lib/
      openf1.ts             ← typed API fetch functions
      types.ts              ← TypeScript interfaces (Meeting, Session, Driver…)
      utils.ts              ← helpers (date formatting, slug generation)
```

---

## Design System (from Figma)

| Token | Value | Where |
|---|---|---|
| Background | `#0a0a0a` | Already in globals.css |
| Primary red | `#8B0000` / `#C00000` | Backgrounds, hero |
| Accent lime | `#CCFF00` | "2026" text, highlights |
| White | `#FFFFFF` | Primary text |
| Font display | `var(--font-display)` | All big headings (Bebas Neue) |
| Font body | `var(--font-sans)` | Body text, tables (Mona Sans) |

Add these as Tailwind custom colors inside the `@theme` block in `globals.css`:
```css
--color-pit-red: #C00000;
--color-pit-lime: #CCFF00;
```

---

## Build Phases (in order)

### Phase 1 — Foundation & Layout
**Goal:** All routes exist, Header/Footer renders on every page.

- Add custom colors + spacing tokens to `globals.css` `@theme` block
- Build `<Header />`: horizontal nav with HOME · CALENDAR · DRIVERS · **PITWALL** (center) · TEAMS · STANDINGS · ANALYTICS using Next.js `<Link>`
- Build `<Footer />` with the F1 logo area
- Wrap both in `layout.tsx`
- Create stub `page.tsx` for all 7 routes so navigation works

**Concept to learn:** Next.js App Router layouts — one `layout.tsx` wraps all child pages automatically.

---

### Phase 2 — OpenF1 API Client
**Goal:** Typed functions to fetch F1 data, usable in server components.

Create `src/app/lib/types.ts` with interfaces:
```
Meeting { meeting_key, meeting_name, location, date_start, circuit_short_name, … }
Session { session_key, session_type, date_start, … }
Driver  { driver_number, full_name, name_acronym, team_name, team_colour, headshot_url, … }
```

Create `src/app/lib/openf1.ts` with fetch functions:
- `getMeetings(year: number): Promise<Meeting[]>`
- `getSessions(meetingKey: number): Promise<Session[]>`
- `getDrivers(sessionKey: number): Promise<Driver[]>`

**Key OpenF1 endpoints:**
```
GET https://api.openf1.org/v1/meetings?year=2026
GET https://api.openf1.org/v1/sessions?meeting_key=1234
GET https://api.openf1.org/v1/drivers?session_key=5678
```

**Concept to learn:** Server Components in Next.js — `async function Page()` can directly `await` fetch calls, no `useEffect` needed.

---

### Phase 3 — Homepage Hero (HOME 1)
**Goal:** The hero section renders with real upcoming race data.

- In `page.tsx`, fetch the next upcoming meeting from OpenF1
- Build the left track panel (static SVG circuit outline for now)
- Build the stats area: date, track length, race distance
- Build the right schedule sidebar (practice/qualifying/race times)
- Match the dark red gradient background from the Figma

**Concept to learn:** Passing server-fetched data as props down to client components.

---

### Phase 4 — Previous Winners (HOME 2)
**Goal:** The scroll section shows who won this race in the last 3–4 years.

- Since OpenF1 covers recent seasons, fetch race results for the same circuit across years
- Map years to drivers: large year numbers with driver illustration/headshot below
- Use `headshot_url` from OpenF1 driver data for driver images
- Red/orange gradient background, big Bebas Neue year text

---

### Phase 5 — History Table + Countdown (HOME 3)
**Goal:** Results table + working countdown timer.

- Fetch results for the last 5–6 completed races of the current season
- Render a table: Round · Location · Date · Laps · Winner
- Build `<Countdown />` as a **client component** (`"use client"`)
  - Uses `useState` + `useEffect` with `setInterval` to tick down
  - Target date = race start time from OpenF1 session data
  - Displays DD:HH:MM:SS in Bebas Neue

**Concept to learn:** The `"use client"` boundary — only components that need browser APIs (timers, event listeners) need it.

---

### Phase 6 — Calendar Page
**Goal:** Full race list with expandable cards.

- Fetch all 2026 meetings from OpenF1
- Render the table: Round · Location · Date · Laps · Winner
- Clicking a race row expands an inline card showing the track minimap + session schedule
- Reuse `<Countdown />` from Phase 5 at the bottom
- Active/upcoming race gets a highlighted expanded card by default

---

### Phase 7 — Race Detail Page (`/calendar/[slug]`)
**Goal:** Clicking a race goes to its full detail page.

- Dynamic route: `app/calendar/[slug]/page.tsx`
- `slug` = kebab-case race name (e.g. `monaco`, `british-grand-prix`)
- Reuse the same 3-section layout as the homepage but for that specific race
- Cover image (can use a placeholder gradient per team/country initially)

**Concept to learn:** Dynamic routes in Next.js — `params.slug` gives you the URL segment.

---

### Phase 8 — Drivers Page
**Goal:** Grid of all 2026 drivers.

- Fetch drivers from the most recent session of 2026
- Render `<DriverCard />` for each: photo, number, name, team color
- Team color from `team_colour` field in OpenF1 driver data

---

### Phase 9 — Teams Page
**Goal:** One card per team in McLaren-style design.

- Group drivers by team
- `<TeamCard />`: team background color, car illustration (can use placeholder or team logo), driver names side by side
- You have 10 teams: McLaren, Ferrari, Red Bull, Mercedes, Aston Martin, Alpine, Williams, Haas, RB, Sauber/Audi

---

### Phase 10 — Standings Page
**Goal:** Drivers + Constructors championship tables.

- OpenF1 doesn't directly expose standings — you'll need to aggregate race results or use **Jolpica API** (`https://api.jolpi.ca/ergast/f1/2026/driverStandings`) which does expose them directly
- Two tabs: Driver Standings · Constructor Standings

---

### Phase 11 — Three.js Track Minimap
**Goal:** Replace static SVG with an interactive Three.js track.

Install dependencies:
```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

In `<TrackMinimap />` (`"use client"`):
- Use `@react-three/fiber`'s `<Canvas>` component
- Draw the circuit as a `THREE.CatmullRomCurve3` (smooth curve through GPS waypoints)
- Render using `<Line>` from `@react-three/drei`
- Add subtle camera rotation with `useFrame` for a slow spin effect
- Circuit coordinates: can be found as SVG path data online, or hardcode ~20–30 waypoints per track

**Concept to learn:** React Three Fiber — Three.js as JSX inside React. `useFrame` runs on every animation tick (like `requestAnimationFrame`).

---

### Phase 12 — Analytics Page
**Goal:** Charts comparing driver performance.

Use **Recharts** (`npm install recharts`) — the easiest charting library in React.
Ideas:
- Lap time comparison across drivers per race
- Points progression over the season
- Qualifying vs race pace deltas

---

## Key Concepts Summary

| When | Learn |
|---|---|
| Phase 1–2 | Next.js App Router: layouts, server components, `Link` |
| Phase 3–4 | Async server components, props, `fetch` in Next.js |
| Phase 5 | `"use client"`, `useState`, `useEffect`, `setInterval` |
| Phase 7 | Dynamic routes, `params` |
| Phase 11 | Three.js basics, React Three Fiber, `useFrame` |
| Phase 12 | Recharts, data transformation |

---

## Verification

After each phase, run `npm run dev` and check:
- Page renders without console errors
- Data from OpenF1 shows up in the UI (open devtools → Network tab to inspect API calls)
- Navigation links work across all pages
- `npm run build` passes before moving to the next phase

For Phase 5 (countdown): open the page, wait 2–3 seconds, verify the timer is counting down.
For Phase 11 (Three.js): verify the track rotates smoothly and renders the correct circuit shape.
