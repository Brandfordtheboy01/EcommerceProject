import { z } from "zod";
import { router, publicProcedure } from "../init";
import { prisma } from "@/lib/prisma";

export const productsRouter = router({
  list: publicProcedure
    .input(z.object({
      page: z.number().optional().default(1),
      limit: z.number().optional().default(12),
      category: z.string().optional(),
      search: z.string().optional(),
      minPrice: z.number().optional(),
      maxPrice: z.number().optional(),
    }))
    .query(async ({ input }) => {
      const { page, limit, category, search, minPrice, maxPrice } = input;
      const skip = (page - 1) * limit;

      const where: any = {
        isActive: true,
      };

      if (category) {
        where.category = {
          slug: category,
        };
      }

      if (search) {
        where.OR = [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ];
      }

      if (minPrice !== undefined || maxPrice !== undefined) {
        where.basePrice = {};
        if (minPrice !== undefined) where.basePrice.gte = minPrice;
        if (maxPrice !== undefined) where.basePrice.lte = maxPrice;
      }

      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where,
          skip,
          take: limit,
          include: {
            vendor: {
              select: {
                id: true,
                businessName: true,
              },
            },
            category: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        }),
        prisma.product.count({ where }),
      ]);

      return {
        products,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const product = await prisma.product.findUnique({
        where: { id: input.id },
        include: {
          vendor: {
            select: {
              id: true,
              businessName: true,
              verificationStatus: true,
            },
          },
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          inventory: true,
          reviews: {
            include: {
              user: {
                select: {
                  name: true,
                },
              },
            },
            take: 10,
            orderBy: { createdAt: "desc" },
          },
        },
      });

      if (!product) {
        throw new Error("Product not found");
      }

      return product;
    }),
});
