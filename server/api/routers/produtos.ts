import { z } from "zod";
import { router, protectedProcedure } from "../trpcContext";

export const productRouter = router({
  createProduct: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        price: z.number(),
        description: z.string(),
        generation: z.string(),
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
      return product;
    }),
});
