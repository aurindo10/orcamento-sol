import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpcContext";
import { TRPCError } from "@trpc/server";

export const precificacaoRouter = router({
  createParameter: protectedProcedure
    .input(
      z.object({
        descricao: z.string(),
        type: z.string(),
        minPower: z.number(),
        maxPower: z.number(),
        price: z.number(),
        percent: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const createParameter = await ctx.prisma.precificacao.create({
        data: {
          descricao: input.descricao,
          type: input.type,
          minPower: input.minPower,
          maxPower: input.maxPower,
          createdAt: new Date(),
          sellerIdClerk: ctx.auth.userId,
          price: input.price,
          percent: input.percent,
        },
      });
      return createParameter;
    }),
  getAllPrecifications: protectedProcedure.query(async ({ ctx }) => {
    const getAllPrecifications = await ctx.prisma.precificacao.findMany();
    return getAllPrecifications;
  }),
});