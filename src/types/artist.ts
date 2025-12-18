import { Availability } from "./availability"
import { Concert } from "./concert"

export type Artist = {
  shortName: string
  longName: string
  id: string
  description: string
  availabilities: Availability[]
  concerts: Concert[]
}
