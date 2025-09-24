import { z } from "zod";

export const ArtistSchema = z.object({
  shortName: z.string().max(50),
  longName: z.string().max(100),
  id: z.string().max(50),
  description: z.string().max(500),
});

export type Artist = z.output<typeof ArtistSchema>;
export type ArtistInput = z.input<typeof ArtistSchema>;
