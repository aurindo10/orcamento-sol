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
  getAllSurfaces: protectedProcedure.query(async ({ ctx }) => {
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
  getPricesFromFortlev: protectedProcedure
    .input(
      z.object({
        power: z.number(),
        roofType: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const token = await ctx.prisma.tokenFortLev.findFirst();
      const targetPower = (input.power / 30 / 5.32) * 1.32;
      const response = await axios({
        method: "post",
        url: "https://api.fortlevsolar.app/project/generator/batch-cheapest-options",
        data: {
          targetPower: targetPower,
          acPhases: targetPower < 12 ? 1 : 3,
          acNominalVoltage: targetPower < 12 ? "220" : "380",
          testingDiscounts: false,
          uf: "MA",
          city: "SAO DOMINGOS DO MARANHAO",
          surfaceId: input.roofType,
        },
        headers: {
          "x-access-token": token?.accessToken,
        },
      });
      const productsToCalculateTheFinalPrice = response.data.map(
        (produto: any) => {
          return {
            name: "Kit Gerador Fotovoltaico " + produto.systemPower + " kWp",
            price: produto.financialResume.finalPrice,
            discount: 0,
            power: produto.systemPower,
            roofType: "",
            generation: produto.systemPower * 5.32 * 30 * 0.8,
            panelBrand: produto.components.modules[0].componentInfos.name,
            inverterBrand: produto.components.inverters[0].componentInfos.name,
          };
        }
      );
      const products = productsToCalculateTheFinalPrice;
      const pricificationTable = await ctx.prisma.precificacao.findMany();
      const perKwp = pricificationTable.filter((precification) => {
        return precification.type === "perKwp";
      });
      const perRangeKwp = pricificationTable.filter((precification) => {
        return precification.type === "perRangeKwp";
      });
      const fixedValue = pricificationTable.filter((precification) => {
        return precification.type === "fixedValue";
      });
      const percentByTotal = pricificationTable.filter((precification) => {
        return precification.type === "percentByTotal";
      });
      const amountPanel = pricificationTable.filter((precification) => {
        return precification.type === "amountPanel";
      });
      const addedProducts = await ctx.prisma.$transaction(
        products.map((product: any) => {
          // perKwp
          for (let i = 0; i < perKwp.length; i += 1) {
            if (
              perKwp[i]?.minPower! <= product.power &&
              perKwp[i]?.maxPower! > product.power
            ) {
              product.price += perKwp[i]?.price! * product.power;
            }
          }
          // perRangeKwp
          for (let i = 0; i < perKwp.length; i += 1) {
            if (
              perRangeKwp[i]?.minPower! <= product.power &&
              perRangeKwp[i]?.maxPower! > product.power
            ) {
              product.price += perRangeKwp[i]?.price!;
            }
          }
          // fixedValue
          for (let i = 0; i < fixedValue.length; i += 1) {
            product.price += fixedValue[i]!.price!;
          }
          // amountPanel
          for (let i = 0; i < amountPanel.length; i += 1) {
            product.price += amountPanel[i]!.price! * (product.power / 0.5);
          }
          // percentByTotal
          let allPercent = 0;
          for (let i = 0; i < percentByTotal.length; i += 1) {
            allPercent += percentByTotal[i]?.percent!;
          }
          const e = allPercent / 100;
          const d = 1 - e;
          product.price = product.price / d;
          return ctx.prisma.product.create({ data: product });
        })
      );
      return addedProducts;
    }),
});
