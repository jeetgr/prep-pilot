import { userMeSchema } from "@/lib/schemas/user";
import { protectedProcedure } from "@/server/orpc";
import { getMe } from "@/server/services/user";

export const userRouter = {
  me: protectedProcedure
    .output(userMeSchema)
    .handler(({ context }) => getMe(context.user.id)),
};
