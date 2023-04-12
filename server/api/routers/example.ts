import { z } from "zod";
import { publicProcedure, router } from "../trpcContext";

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.example.findMany();
  }),
});
