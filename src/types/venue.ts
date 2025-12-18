import { Concert } from "./concert"

export type Venue = {
  shortName: string
  longName: string
  region: string
  id: string
  description: string
  concerts: Concert[]
}
