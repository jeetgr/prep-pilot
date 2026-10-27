import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";

import type { AppRouter } from "@/server/routers";

const link = new RPCLink({
  url: `${typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"}/api/rpc`,
});

export const orpc: RouterClient<AppRouter> = createORPCClient(link);
