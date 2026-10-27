import { userRouter } from "./user";

export const appRouter = {
  user: userRouter,
};

export type AppRouter = typeof appRouter;
