import { Dayjs } from "dayjs"

export type Concert = {
  id: string
  organizer: string
  artistName: string
  artistId: string
  venueId: string
  venueName: string
  date: Dayjs
}
