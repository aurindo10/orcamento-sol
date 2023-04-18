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
          whoCreatedId: ctx.auth.userId,
        },
      });
      return client;
    }),
  updateClient: publicProcedure
    .input(
      z.object({
        id: z.string(),
        consumo: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const client = await ctx.prisma.client.update({
        where: { id: input.id },
        data: {
          consumo: input.consumo,
        },
      });
      return client;
    }),
});
