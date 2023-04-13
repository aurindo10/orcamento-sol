import { productRouter } from "./routers/produtos";
import { router } from "./trpcContext";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = router({
  product: productRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
