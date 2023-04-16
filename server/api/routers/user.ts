import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpcContext";
import { TRPCError } from "@trpc/server";
import { auth } from "@clerk/nextjs/app-beta";
export const userRouter = router({
  createUser: protectedProcedure.mutation(async ({ ctx }) => {
    console.log("createUser");
    const { userId, user } = ctx.auth;
    console.log(ctx.auth);
    const isThereUser = await ctx.prisma.user.findFirst({
      where: {
        clerkId: userId!,
      },
    });
    console.log("cheguei aqui");
    if (isThereUser) {
      console.log("eu to aqui");
      return { name: `Olá ${isThereUser}` };
    } else {
      console.log("n era pra eu aparecer");
      return await ctx.prisma.user.create({
        data: {
          clerkId: userId,
        },
      });
    }
  }),
  verifyIfItsWorker: publicProcedure.mutation(async ({ ctx, input }) => {
    const { userId, user } = ctx.auth;
    const isThereUser = await ctx.prisma.user.findFirst({
      where: {
        clerkId: userId!,
        workers: true,
      },
    });
    if (isThereUser) {
      return true;
    } else {
      return false;
    }
  }),
  turnUserIntoWorker: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        isWorker: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const updatedUser = await ctx.prisma.user.update({
        where: {
          clerkId: input.userId,
        },
        data: {
          workers: input.isWorker,
        },
      });
      if (updatedUser) {
        return updatedUser;
      } else {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro ao atualizar o usuário",
        });
      }
    }),
  getAllUsers: protectedProcedure.query(async ({ ctx }) => {
    console.log("sdasda");
    const users = await ctx.prisma.user.findMany();
    return users;
  }),
});
