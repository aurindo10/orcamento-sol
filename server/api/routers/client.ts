import { z } from "zod";
import { router, publicProcedure } from "../trpcContext";
import { TRPCError } from "@trpc/server";

export const clientRouter = router({
  createClient: publicProcedure
    .input(
      z.object({
        name: z.string(),
        phone: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const client = await ctx.prisma.client.create({
        data: {
          firstName: input.name,
          phone: input.phone,
        },
      });
      return client;
    }),
});
