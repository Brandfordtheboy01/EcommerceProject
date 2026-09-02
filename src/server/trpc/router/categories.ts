import { z } from "zod";
import { router, publicProcedure } from "../init";
import { createClient } from "@/lib/supabase/server";

export const categoriesRouter = router({
  list: publicProcedure
    .query(async () => {
      const supabase = await createClient();

      const { data: categories, error } = await supabase
        .from('categories')
        .select(`
          id,
          name,
          slug,
          description,
          icon,
          parent_id,
          children:categories(
            id,
            name,
            slug
          ),
          products:products(count)
        `)
        .is('parent_id', null)
        .order('name', { ascending: true });

      if (error) {
        throw new Error(error.message);
      }

      return categories?.map((c: any) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description,
        icon: c.icon,
        parentId: c.parent_id,
        children: c.children,
        productCount: c.products?.length || 0,
      })) || [];
    }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const supabase = await createClient();

      const { data: category, error } = await supabase
        .from('categories')
        .select(`
          id,
          name,
          slug,
          description,
          icon,
          parent_id,
          parent:parent_categories(
            id,
            name,
            slug
          ),
          children:categories(
            id,
            name,
            slug
          ),
          products:products(
            id,
            title,
            base_price,
            images,
            vendor:vendor_profiles(
              business_name
            )
          )
        `)
        .eq('id', input.id)
        .single();

      if (error || !category) {
        throw new Error("Category not found");
      }

      return {
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        icon: category.icon,
        parentId: category.parent_id,
        parent: category.parent,
        children: category.children,
        products: category.products?.slice(0, 12),
      };
    }),

  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const supabase = await createClient();

      const { data: category, error } = await supabase
        .from('categories')
        .select(`
          id,
          name,
          slug,
          description,
          icon,
          parent_id,
          parent:parent_categories(
            id,
            name,
            slug
          ),
          children:categories(
            id,
            name,
            slug
          )
        `)
        .eq('slug', input.slug)
        .single();

      if (error || !category) {
        throw new Error("Category not found");
      }

      return {
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        icon: category.icon,
        parentId: category.parent_id,
        parent: category.parent,
        children: category.children,
      };
    }),
});
