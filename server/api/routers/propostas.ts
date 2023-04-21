import { TRPCError } from "@trpc/server";
import { router, publicProcedure, protectedProcedure } from "../trpcContext";

export const propostaRouter = router({
  lookPropostasByUser: protectedProcedure.query(async ({ ctx }) => {
    const { userId } = ctx.auth;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const clients = await ctx.prisma.client.findMany({
      where: {
        sellerIdClerk: userId!,
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      include: {
        Proposta: true,
      },
    });
    if (!clients) throw new TRPCError({ code: "NOT_FOUND" });
    const propostasPerAmountOfDays = clients.map((proposta) => {
      const today = new Date();
      return {
        clientInfo: {
          name: proposta.firstName,
          telefone: proposta.phone,
          createdAt: proposta.createdAt,
        },
        today: proposta.Proposta.filter((proposta) => {
          return proposta.createdAt.getDate() === today.getDate();
        }),
        threeDays: proposta.Proposta.filter((proposta) => {
          const threeDaysAgo = new Date();
          threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
          return (
            proposta.createdAt.getDate() >= threeDaysAgo.getDate() &&
            proposta.createdAt.getDate() < today.getDate()
          );
        }),
        sevenDays: proposta.Proposta.filter((proposta) => {
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
          return (
            proposta.createdAt.getDate() >= sevenDaysAgo.getDate() &&
            proposta.createdAt.getDate() < today.getDate()
          );
        }),
      };
    });
    return propostasPerAmountOfDays;
  }),
});
