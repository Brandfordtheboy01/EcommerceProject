import { z } from "zod";
import { router, publicProcedure } from "../init";
import { createClient } from "@/lib/supabase/server";

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
      const supabase = await createClient();
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      let query = supabase
        .from('products')
        .select(`
          id,
          title,
          description,
          base_price,
          compare_price,
          images,
          tags,
          is_active,
          is_featured,
          created_at,
          updated_at,
          vendor:vendor_profiles(
            id,
            business_name
          ),
          category:categories(
            id,
            name,
            slug
          )
        `, { count: 'exact' })
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (category) {
        query = query.eq('category.slug', category);
      }

      if (search) {
        query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
      }

      if (minPrice !== undefined) {
        query = query.gte('base_price', minPrice);
      }

      if (maxPrice !== undefined) {
        query = query.lte('base_price', maxPrice);
      }

      const { data: products, error, count } = await query.range(from, to);

      if (error) {
        throw new Error(error.message);
      }

      const total = count || 0;

      return {
        products: products?.map((p: any) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          basePrice: p.base_price,
          comparePrice: p.compare_price,
          images: p.images,
          tags: p.tags,
          isActive: p.is_active,
          isFeatured: p.is_featured,
          createdAt: p.created_at,
          updatedAt: p.updated_at,
          vendor: p.vendor,
          category: p.category,
        })) || [],
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
      const supabase = await createClient();

      const { data: product, error } = await supabase
        .from('products')
        .select(`
          id,
          title,
          description,
          base_price,
          compare_price,
          images,
          tags,
          attributes,
          is_active,
          is_featured,
          created_at,
          updated_at,
          vendor:vendor_profiles(
            id,
            business_name,
            verification_status
          ),
          category:categories(
            id,
            name,
            slug
          ),
          inventory:product_inventory(
            quantity,
            reserved,
            low_stock_threshold
          ),
          reviews:reviews(
            id,
            rating,
            comment,
            is_verified,
            created_at,
            user:users(
              name
            )
          )
        `)
        .eq('id', input.id)
        .single();

      if (error || !product) {
        throw new Error("Product not found");
      }

      return {
        id: product.id,
        title: product.title,
        description: product.description,
        basePrice: product.base_price,
        comparePrice: product.compare_price,
        images: product.images,
        tags: product.tags,
        attributes: product.attributes,
        isActive: product.is_active,
        isFeatured: product.is_featured,
        createdAt: product.created_at,
        updatedAt: product.updated_at,
        vendor: product.vendor,
        category: product.category,
        inventory: product.inventory,
        reviews: product.reviews?.map((r: any) => ({
          id: r.id,
          rating: r.rating,
          comment: r.comment,
          isVerified: r.is_verified,
          createdAt: r.created_at,
          user: r.user,
        })) || [],
      };
    }),
});
