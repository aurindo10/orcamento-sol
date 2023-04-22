import { TRPCError } from "@trpc/server";
import { router, publicProcedure, protectedProcedure } from "../trpcContext";
import { z } from "zod";

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
  creatProposta: protectedProcedure
    .input(
      z.object({
        firstName: z.string(),
        phone: z.string(),
        consumo: z.number(),
        roofType: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx.auth;
      const foundedClient = await ctx.prisma.client.findFirst({
        where: {
          firstName: input.firstName,
          phone: input.phone,
        },
      });
      if (foundedClient) {
        const createdProposta = await ctx.prisma.proposta.create({
          data: {
            ClientInterestedId: foundedClient.id,
            consumo: input.consumo,
            sellerIdClerk: userId!,
            roofType: input.roofType,
          },
        });
        return { message: "Proposta cadastrada com sucesso" };
      }
      if (!foundedClient) {
        const createdClient = await ctx.prisma.client.create({
          data: {
            firstName: input.firstName,
            phone: input.phone,
            sellerIdClerk: userId!,
          },
        });
        if (createdClient) {
          console.log(createdClient.id);
          await ctx.prisma.proposta.create({
            data: {
              ClientInterestedId: createdClient.id,
              consumo: input.consumo,
              sellerIdClerk: userId!,
              roofType: input.roofType,
            },
          });
          return createdClient;
        }
      }
    }),
  lookForAllProposta: protectedProcedure.query(async ({ ctx }) => {
    const allPropostasDuringSevenDays = await ctx.prisma.proposta.findMany({
      where: {
        sellerIdClerk: ctx.auth.userId!,
        createdAt: {
          gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        },
      },
      include: {
        ClientInterested: true,
      },
    });
    const allClientes = await ctx.prisma.client.findMany({
      where: {
        sellerIdClerk: ctx.auth.userId!,
      },
    });
    const finalResult = {
      threeDays: allClientes.map((cliente) => {
        return {
          clientName: {
            name: cliente.firstName,
            phone: cliente.phone,
            propostas: allPropostasDuringSevenDays.filter((proposta) => {
              return (
                proposta.ClientInterestedId === cliente.id &&
                proposta.createdAt.getDate() >= new Date().getDate() - 3
              );
            }),
          },
        };
      }),
      today: allClientes.map((cliente) => {
        return {
          clientName: {
            name: cliente.firstName,
            phone: cliente.phone,
            propostas: allPropostasDuringSevenDays.filter((proposta) => {
              return (
                proposta.ClientInterestedId === cliente.id &&
                proposta.createdAt.getDate() === new Date().getDate()
              );
            }),
          },
        };
      }),
      sevenDays: allClientes.map((cliente) => {
        return {
          clientName: {
            name: cliente.firstName,
            phone: cliente.phone,
            propostas: allPropostasDuringSevenDays.filter((proposta) => {
              return (
                proposta.ClientInterestedId === cliente.id &&
                proposta.createdAt.getDate() >= new Date().getDate() - 7
              );
            }),
          },
        };
      }),
    };
    return finalResult;
  }),
});
