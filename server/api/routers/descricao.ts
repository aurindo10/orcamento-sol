import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpcContext";
import { TRPCError } from "@trpc/server";

export const descricaoRouter = router({
  createDescricao: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const createdDescricao = await ctx.prisma.descricao.create({
        data: {
          name: input.name,
        },
        include: {
          Precificacao: true,
        },
      });
      return createdDescricao;
    }),
  getAllDescricao: protectedProcedure.query(async ({ ctx }) => {
    const getAllDescricao = await ctx.prisma.descricao.findMany({
      include: {
        Precificacao: true,
      },
    });
    return getAllDescricao;
  }),
  deleteDescricao: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const deletedDescricao = await ctx.prisma.descricao.delete({
        where: {
          id: input.id,
        },
      });
      return deletedDescricao;
    }),
});
