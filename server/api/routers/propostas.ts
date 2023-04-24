import { TRPCError } from "@trpc/server";
import { router, publicProcedure, protectedProcedure } from "../trpcContext";
import { z } from "zod";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
const BRAZIL_TIMEZONE = "America/Sao_Paulo";

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
    const date = dayjs(new Date());
    const sevenDaysAgo = dayjs()
      .tz(BRAZIL_TIMEZONE)
      .subtract(7, "day")
      .toDate();
    const threeDaysAgo = dayjs()
      .tz(BRAZIL_TIMEZONE)
      .subtract(3, "day")
      .toDate();
    const today = dayjs().tz(BRAZIL_TIMEZONE).toDate();
    const startOfDay = date.startOf("day").tz(BRAZIL_TIMEZONE).toDate();
    const endOfDay = date.endOf("day").tz(BRAZIL_TIMEZONE).toDate();
    return {
      today: await ctx.prisma.client.findMany({
        where: {
          sellerIdClerk: ctx.auth.userId!,
          Proposta: {
            some: {
              createdAt: {
                gte: startOfDay,
                lte: endOfDay,
              },
            },
          },
        },
        include: {
          Proposta: {
            where: {
              createdAt: {
                gte: startOfDay,
                lte: endOfDay,
              },
            },
          },
        },
      }),
      threeDays: await ctx.prisma.client.findMany({
        where: {
          sellerIdClerk: ctx.auth.userId!,
          Proposta: {
            some: {
              createdAt: {
                gte: dayjs(threeDaysAgo)
                  .startOf("day")
                  .tz(BRAZIL_TIMEZONE)
                  .toDate(),
                lt: dayjs(today).endOf("day").tz(BRAZIL_TIMEZONE).toDate(),
              },
            },
          },
        },
        include: {
          Proposta: {
            where: {
              createdAt: {
                gte: dayjs(threeDaysAgo)
                  .startOf("day")
                  .tz(BRAZIL_TIMEZONE)
                  .toDate(),
                lt: dayjs(today).endOf("day").tz(BRAZIL_TIMEZONE).toDate(),
              },
            },
          },
        },
      }),
      sevenDays: await ctx.prisma.client.findMany({
        where: {
          sellerIdClerk: ctx.auth.userId!,
          Proposta: {
            some: {
              createdAt: {
                gte: dayjs(sevenDaysAgo)
                  .startOf("day")
                  .tz(BRAZIL_TIMEZONE)
                  .toDate(),
                lt: dayjs(today).endOf("day").tz(BRAZIL_TIMEZONE).toDate(),
              },
            },
          },
        },
        include: {
          Proposta: {
            where: {
              createdAt: {
                gte: dayjs(sevenDaysAgo)
                  .startOf("day")
                  .tz(BRAZIL_TIMEZONE)
                  .toDate(),
                lt: dayjs(today).endOf("day").tz(BRAZIL_TIMEZONE).toDate(),
              },
            },
          },
        },
      }),
    };
  }),
  getPropostaByDay: protectedProcedure
    .input(
      z.object({
        date: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const date = dayjs(input.date);
      const startOfDay = date.startOf("day").tz(BRAZIL_TIMEZONE).toDate();
      const endOfDay = date.endOf("day").tz(BRAZIL_TIMEZONE).toDate();
      const clients = await ctx.prisma.client.findMany({
        where: {
          sellerIdClerk: ctx.auth.userId!,
          Proposta: {
            some: {
              createdAt: {
                gte: startOfDay,
                lte: endOfDay,
              },
            },
          },
        },
        include: {
          Proposta: {
            where: {
              createdAt: {
                gte: startOfDay,
                lte: endOfDay,
              },
            },
          },
        },
      });
      return clients;
    }),
});