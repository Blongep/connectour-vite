import { Dayjs } from "dayjs"
import { Option } from "./option"

export type Availability = {
  id: string
  artistId: string
  artistName: string
  zones: string[]
  startDate: Dayjs
  endDate: Dayjs
  options: Option[]
}
