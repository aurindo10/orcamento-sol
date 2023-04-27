import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpcContext";
import { TRPCError } from "@trpc/server";

export const productRouter = router({
  createProduct: publicProcedure
    .input(
      z.object({
        name: z.string(),
        price: z.number(),
        generation: z.number(),
        inverterBrand: z.string(),
        panelBrand: z.string(),
        power: z.number(),
        roofType: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const product = await ctx.prisma.product.create({
        data: {
          name: input.name,
          price: input.price,
          generation: input.generation,
          inverterBrand: input.inverterBrand,
          panelBrand: input.panelBrand,
          power: input.power,
          roofType: input.roofType,
          whoCreatedId: ctx.auth.userId,
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      if (!product) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not create product",
        });
      }
      return product;
    }),
  updateProduct: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        price: z.number(),
        generation: z.number(),
        inverterBrand: z.string(),
        panelBrand: z.string(),
        power: z.number(),
        roofType: z.string(),
      })
    )
    .mutation(
      // eslint-disable-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      async ({ ctx, input }) => {
        const product = await ctx.prisma.product.update({
          where: { id: input.id },
          data: {
            name: input.name,
            price: input.price,
            generation: input.generation,
            inverterBrand: input.inverterBrand,
            panelBrand: input.panelBrand,
            power: input.power,
            roofType: input.roofType,
            whoCreatedId: ctx.auth.userId,
          },
        });
        if (!product) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Could not update product",
          });
        }
        return product;
      }
    ),
  getAllProducts: publicProcedure
    .input(
      z.object({
        take: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const products = await ctx.prisma.product.findMany({
        take: input.take,
      });
      if (!products) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not get products",
        });
      }
      return products;
    }),
  getAmountOfProducts: publicProcedure.mutation(async ({ ctx }) => {
    const amount = await ctx.prisma.product.count();
    if (!amount) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Could not get amount of products",
      });
    }
    return amount;
  }),
  lookForProduct: publicProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      const products = await ctx.prisma.product.findMany({
        where: {
          generation: input,
        },
      });
      if (!products) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not get products",
        });
      }
      return products;
    }),
  lookForProductByPowerAndRoof: publicProcedure
    .input(
      z.object({
        power: z.number(),
        roofType: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const minGeneration = input.power - 200;
      const maxGeneration = input.power + 200;
      const products = await ctx.prisma.product.findMany({
        where: {
          roofType: input.roofType,
          generation: {
            gte: minGeneration,
            lte: maxGeneration,
          },
        },
        orderBy: {
          generation: "asc",
        },
      });
      if (!products) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not get products",
        });
      }
      return products;
    }),
  deleteProduct: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.prisma.product.delete({
        where: {
          id: input.id,
        },
      });
      if (!product) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not delete product",
        });
      }
      return product;
    }),
  createManyProducts: protectedProcedure
    .input(
      z.object({
        data: z.array(
          z.object({
            name: z.string(),
            price: z.number(),
            discount: z.number(),
            generation: z.number(),
            inverterBrand: z.string(),
            panelBrand: z.string(),
            power: z.number(),
            roofType: z.string(),
            whoCreatedId: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const products = input.data;
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
        products.map((product) => {
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
  deleteAllProducts: protectedProcedure.mutation(async ({ ctx }) => {
    const products = await ctx.prisma.product.deleteMany();
    if (!products) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Could not delete products",
      });
    }
    return products;
  }),
});
