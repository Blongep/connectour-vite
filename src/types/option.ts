import { Dayjs } from "dayjs"
export enum optionStatus {
  proposée = "proposée",
  acceptée = "acceptée",
  confirmée = "confirmée",
  refusée = "refusée",
}
export type Option = {
  id: string
  organizer: string
  artistId: string
  venueId: string
  venueName: string
  availabilityId: string
  date: Dayjs
  status: optionStatus
}
