import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpcContext";
import { TRPCError } from "@trpc/server";

export const precificacaoRouter = router({
  createParameter: protectedProcedure
    .input(
      z.object({
        type: z.string(),
        minPower: z.number(),
        maxPower: z.number(),
        price: z.number(),
        percent: z.number(),
        descricaoId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const createParameter = await ctx.prisma.precificacao.create({
        data: {
          type: input.type,
          minPower: input.minPower,
          maxPower: input.maxPower,
          createdAt: new Date(),
          sellerIdClerk: ctx.auth.userId,
          price: input.price,
          percent: input.percent,
          descricaoId: input.descricaoId,
        },
      });
      return createParameter;
    }),
  getAllPrecifications: protectedProcedure.query(async ({ ctx }) => {
    const getAllPrecifications = await ctx.prisma.precificacao.findMany();
    return getAllPrecifications;
  }),
  dellPrecification: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const dellPrecification = await ctx.prisma.precificacao.delete({
        where: {
          id: input.id,
        },
      });
      return dellPrecification;
    }),
});
