import { Venue } from "../types/venue"

const venues: Venue[] = [
  {
    id: "0",
    shortName: "trianon",
    longName: "Le Trianon",
    region: "Paris, France",
    description: "A historic theater in Paris.",
    concerts: [],
  },
  {
    id: "1",
    shortName: "transbordeur",
    longName: "Le Transbordeur",
    region: "Lyon, France",
    description: "A popular concert venue in Lyon.",
    concerts: [],
  },
  {
    id: "2",
    shortName: "rockarena",
    longName: "Rock Arena",
    region: "Bordeaux, France",
    description: "A large venue for rock concerts.",
    concerts: [],
  },
  {
    id: "3",
    shortName: "coldcrash",
    longName: "Cold Crash",
    region: "Marseille, France",
    description: "An intimate venue for indie bands.",
    concerts: [],
  },
  {
    id: "4",
    shortName: "metaldome",
    longName: "Metal Dome",
    region: "Lille, France",
    description: "A dome-shaped venue for metal concerts.",
    concerts: [],
  },
]

export const fetchVenues = (): Venue[] => {
  const data = localStorage.getItem("venues")
  if (data === null) {
    localStorage.setItem("venues", JSON.stringify(venues))
    return venues
  }
  const parsedData = JSON.parse(data)
  return parsedData || []
}

export const fetchVenue = (shortVenueName: string): Venue => {
  const venueFound = fetchVenues().find((venue) => venue.shortName === shortVenueName)
  if (venueFound === undefined) {
    throw new Response("Not Found", { status: 404 })
  }
  return venueFound
}
