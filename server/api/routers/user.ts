import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpcContext";
import { TRPCError } from "@trpc/server";
import { clerkClient } from "@clerk/nextjs/server";
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
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const updatedUser = await clerkClient.users.updateUserMetadata(input.id, {
        publicMetadata: {
          worker: true,
          admin: false,
          masterAdmin: false,
        },
      });
      return updatedUser;
    }),
  turnUserIntoAdmin: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const allUser = await clerkClient.users.getUserList();
      console.log(allUser);
      const updatedUser = await clerkClient.users.updateUserMetadata(input.id, {
        publicMetadata: {
          worker: true,
          admin: true,
          masterAdmin: false,
        },
      });
      return updatedUser;
    }),
  turnUserIntoMasterAdmin: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const allUser = await clerkClient.users.getUserList();
      console.log(allUser);
      const updatedUser = await clerkClient.users.updateUserMetadata(input.id, {
        publicMetadata: {
          worker: true,
          admin: true,
          masterAdmin: true,
        },
      });
      return updatedUser;
    }),
  getAllUsers: protectedProcedure.query(async ({ ctx }) => {
    console.log("sdasda");
    const users = await ctx.prisma.user.findMany();
    return users;
  }),
});
