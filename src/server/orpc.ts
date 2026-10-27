import "server-only";

import { ORPCError, os } from "@orpc/server";

import { auth } from "./auth";

const base = os.$context<{ headers: Headers }>();

const requireAuth = base.middleware(async ({ context, next }) => {
  const result = await auth.api.getSession({ headers: context.headers });
  if (!result) {
    throw new ORPCError("UNAUTHORIZED");
  }

  return next({ context: { user: result.user, session: result.session } });
});

export const publicProcedure = base;
export const protectedProcedure = base.use(requireAuth);
