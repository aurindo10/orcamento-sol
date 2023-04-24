import { productRouter } from "./routers/produtos";
import { userRouter } from "./routers/user";
import { clientRouter } from "./routers/client";

import { router } from "./trpcContext";
import { propostaRouter } from "./routers/propostas";
import { precificacaoRouter } from "./routers/precificacao";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = router({
  product: productRouter,
  user: userRouter,
  client: clientRouter,
  proposta: propostaRouter,
  precificaca: precificacaoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
