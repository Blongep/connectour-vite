import { Timestamp } from "@google-cloud/firestore"
import { z } from "zod"
import { optionStatus } from "../../src/types/option"

export const OptionSchema = z.object({
  id: z.string().max(50),
  organizer: z.string().max(100),
  venueId: z.string().max(50),
  artistId: z.string().max(50),
  availabilityId: z.string().max(50),
  date: z.instanceof(Timestamp),
  status: z.nativeEnum(optionStatus),
})

export type Option = z.output<typeof OptionSchema>
export type OptionInput = z.input<typeof OptionSchema>
