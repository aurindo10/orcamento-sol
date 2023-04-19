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
      const addedProducts = await ctx.prisma.$transaction(
        products.map((product) => ctx.prisma.product.create({ data: product }))
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
