import { Timestamp } from "@google-cloud/firestore";
import { z } from "zod";

export const ConcertSchema = z.object({
  date: z.instanceof(Timestamp),
  venueId: z.string().max(50),
  artistId: z.string().max(50),
  id: z.string().max(50),
  organizer: z.string().max(100),
});

export type Concert = z.output<typeof ConcertSchema>;
export type ConcertInput = z.input<typeof ConcertSchema>;
