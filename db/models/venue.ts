import { z } from "zod";

export const VenueSchema = z.object({
  shortName: z.string().max(100),
  longName: z.string().max(100),
  region: z.string().max(100),
  id: z.string().max(50),
  description: z.string().max(500),
});

export type VenueInput = z.input<typeof VenueSchema>;
export type VenueOutput = z.output<typeof VenueSchema>;
