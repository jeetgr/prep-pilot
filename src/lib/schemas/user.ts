import * as z from "zod";

export const userMeSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  createdAt: z.date(),
});

export type UserMe = z.infer<typeof userMeSchema>;
