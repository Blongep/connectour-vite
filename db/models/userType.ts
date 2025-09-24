import { z } from "zod";

export const UserTypeSchema = z.object({
  id: z.string().max(50),
  type: z.string().max(100),
  userId: z.string().max(50),
});

export type UserType = z.output<typeof UserTypeSchema>;
export type UserTypeInput = z.input<typeof UserTypeSchema>;
