import { z } from "zod";
import { router, publicProcedure } from "../init";
import { prisma } from "@/lib/prisma";

export const categoriesRouter = router({
  list: publicProcedure
    .query(async () => {
      const categories = await prisma.category.findMany({
        where: { parentId: null },
        include: {
          children: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          _count: {
            select: {
              products: true,
            },
          },
        },
        orderBy: { name: "asc" },
      });

      return categories;
    }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const category = await prisma.category.findUnique({
        where: { id: input.id },
        include: {
          parent: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          children: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          products: {
            take: 12,
            include: {
              vendor: {
                select: {
                  businessName: true,
                },
              },
            },
          },
        },
      });

      if (!category) {
        throw new Error("Category not found");
      }

      return category;
    }),

  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const category = await prisma.category.findUnique({
        where: { slug: input.slug },
        include: {
          parent: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          children: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      });

      if (!category) {
        throw new Error("Category not found");
      }

      return category;
    }),
});
