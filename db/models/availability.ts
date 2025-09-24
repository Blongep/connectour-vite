import { Timestamp } from "@google-cloud/firestore";
import { z } from "zod";

export const AvailabilitySchema = z.object({
  id: z.string().max(50),
  artistId: z.string().max(50),
  zones: z.array(z.string().max(100)),
  startDate: z.instanceof(Timestamp),
  endDate: z.instanceof(Timestamp),
});

export type AvailabilityInput = z.input<typeof AvailabilitySchema>;
export type Availability = z.output<typeof AvailabilitySchema>;
