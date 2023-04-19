import { createNextApiHandler } from "@trpc/server/adapters/next";
import { env } from "pages/env/env.mjs";
import { appRouter } from "server/api/root";

import { createContext } from "server/api/trpc";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          );
        }
      : undefined,
});
