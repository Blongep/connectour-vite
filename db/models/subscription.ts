import { z } from "zod";

export const SubscriptionSchema = z.object({
  id: z.string().max(50),
  artistId: z.string().max(50),
  userId: z.string().max(50),
});

export type Subscription = z.output<typeof OptionSchema>;
export type SubscriptionInput = z.input<typeof OptionSchema>;
