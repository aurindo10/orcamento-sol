import { z } from "zod";
const axios = require("axios");
import { router, publicProcedure, protectedProcedure } from "../trpcContext";
import { TRPCError } from "@trpc/server";
export const fortlevRouter = router({
  getAuthenthication: protectedProcedure.mutation(async ({ ctx }) => {
    const response = await axios.post(
      "https://api.fortlevsolar.app/authenticate",
      {
        email: "sol.engenhariasolar@gmail.com",
        password: "Sucesso123#",
      }
    );
    const deleteMany = ctx.prisma.tokenFortLev.deleteMany();
    const tokenCreated = ctx.prisma.tokenFortLev.create({
      data: {
        accessToken: response.data.token,
      },
    });
    const tokenUpdated = await ctx.prisma.$transaction([
      deleteMany,
      tokenCreated,
    ]);
    return tokenUpdated[1].accessToken;
  }),
  getProducts: protectedProcedure
    // .input(
    //   z.object({
    //     // targetPower: z.number(),
    //     // acPhases: z.number(),
    //     // acNominalVoltage: z.string(),
    //     // testingDiscounts: z.boolean(),
    //     // uf: z.string(),
    //     // city: z.string(),
    //   })
    // )
    .mutation(async ({ ctx, input }) => {
      console.log("cheguei");
      const token = await ctx.prisma.tokenFortLev.findFirst();
      console.log(token);
      const response = await axios({
        method: "post",
        url: "https://api.fortlevsolar.app/project/generator/batch-cheapest-options",
        data: {
          targetPower: 20,
          acPhases: 3,
          acNominalVoltage: "380",
          testingDiscounts: false,
          uf: "MA",
          city: "SAO DOMINGOS DO MARANHAO",
        },
        headers: {
          "x-access-token": token?.accessToken,
        },
      });
      console.log(response.data);
      return response.data;
    }),
  getAllSurfaces: protectedProcedure.mutation(async ({ ctx }) => {
    const token = await ctx.prisma.tokenFortLev.findFirst();
    const response = await axios({
      method: "get",
      url: "https://api.fortlevsolar.app/surface/all",
      headers: {
        "x-access-token": token?.accessToken,
      },
    });
    return response.data;
  }),
});
