import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../init";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export const authRouter = router({
  signIn: publicProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string().min(6),
    }))
    .mutation(async ({ input }) => {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: input.email,
        password: input.password,
      });

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, user: data.user };
    }),

  signUp: publicProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string().min(6),
      name: z.string().min(2),
      role: z.enum(["CUSTOMER", "VENDOR"]).default("CUSTOMER"),
    }))
    .mutation(async ({ input }) => {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.signUp({
        email: input.email,
        password: input.password,
        options: {
          data: {
            name: input.name,
            role: input.role,
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      // Create user record in our database
      if (data.user) {
        await prisma.user.create({
          data: {
            id: data.user.id,
            email: input.email,
            name: input.name,
            role: input.role,
            emailVerified: false,
          },
        });
      }

      return { success: true, user: data.user };
    }),

  signOut: protectedProcedure
    .mutation(async ({ ctx }) => {
      const supabase = await createClient();
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw new Error(error.message);
      }

      return { success: true };
    }),

  getSession: publicProcedure
    .query(async () => {
      const supabase = await createClient();
      const { data: { session } } = await supabase.auth.getSession();
      return { session };
    }),
});
