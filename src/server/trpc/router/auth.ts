import { z } from "zod";
import { router, publicProcedure, protectedProcedure, TRPCError } from "../init";
import { createClient } from "@/lib/supabase/server";

// Password validation schema (relaxed for development)
const passwordSchema = z.string()
  .min(6, "Password must be at least 6 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

export const authRouter = router({
  signIn: publicProcedure
    .input(z.object({
      email: z.string().email("Invalid email address"),
      password: z.string().min(1, "Password is required"),
    }))
    .mutation(async ({ input }) => {
      const supabase = await createClient();
      
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: input.email,
          password: input.password,
        });

        if (error) {
          console.error("Sign in error:", error);
          throw new TRPCError({ 
            code: "UNAUTHORIZED",
            message: error.message 
          });
        }

        // Check if user exists in our database
        const { data: user } = await supabase
          .from('users')
          .select('id, email, name, role, email_verified')
          .eq('id', data.user.id)
          .maybeSingle();

        if (!user) {
          throw new TRPCError({ 
            code: "NOT_FOUND",
            message: "User account not found" 
          });
        }

        return { 
          success: true, 
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            emailVerified: user.email_verified
          }
        };
      } catch (error) {
        console.error("Sign in error:", error);
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({ 
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred during sign in" 
        });
      }
    }),

  signUp: publicProcedure
    .input(z.object({
      email: z.string().email("Invalid email address"),
      password: passwordSchema,
      name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
      role: z.enum(["CUSTOMER", "VENDOR"]).default("CUSTOMER"),
    }))
    .mutation(async ({ input }) => {
      const supabase = await createClient();
      
      try {
        // Check if email already exists
        const { data: existingUser } = await supabase
          .from('users')
          .select('email')
          .eq('email', input.email)
          .maybeSingle();

        if (existingUser) {
          throw new TRPCError({ 
            code: "CONFLICT",
            message: "Email already registered" 
          });
        }

        const { data, error } = await supabase.auth.signUp({
          email: input.email,
          password: input.password,
          options: {
            data: {
              name: input.name,
              role: input.role,
            },
            emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
          },
        });

        if (error) {
          console.error("Supabase auth error:", error);
          throw new TRPCError({ 
            code: "INTERNAL_SERVER_ERROR",
            message: error.message 
          });
        }

        // Create user record in our database via Supabase
        if (data.user) {
          const { error: dbError } = await supabase
            .from('users')
            .insert({
              id: data.user.id,
              email: input.email,
              name: input.name,
              role: input.role,
              email_verified: false,
            });

          if (dbError) {
            console.error("Database insert error:", dbError);
            throw new TRPCError({ 
              code: "INTERNAL_SERVER_ERROR",
              message: `Failed to create user account: ${dbError.message}` 
            });
          }
        }

        return { 
          success: true, 
          user: data.user,
          message: "Account created successfully. Please check your email to verify your account."
        };
      } catch (error) {
        console.error("Signup error:", error);
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({ 
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred during signup" 
        });
      }
    }),

  signOut: protectedProcedure
    .mutation(async ({ ctx }) => {
      const supabase = await createClient();
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw new TRPCError({ 
          code: "INTERNAL_SERVER_ERROR",
          message: error.message 
        });
      }

      return { success: true };
    }),

  getSession: publicProcedure
    .query(async () => {
      const supabase = await createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { data: user } = await supabase
          .from('users')
          .select('id, email, name, role, email_verified')
          .eq('id', session.user.id)
          .single();

        return { 
          session: {
            ...session,
            user: user || session.user
          }
        };
      }
      
      return { session: null };
    }),

  verifyEmail: publicProcedure
    .input(z.object({
      token: z.string(),
    }))
    .mutation(async ({ input }) => {
      const supabase = await createClient();
      const { error } = await supabase.auth.verifyOtp({
        token: input.token,
        type: 'email',
      });

      if (error) {
        throw new TRPCError({ 
          code: "BAD_REQUEST",
          message: error.message 
        });
      }

      return { success: true, message: "Email verified successfully" };
    }),

  resendVerificationEmail: protectedProcedure
    .mutation(async ({ ctx }) => {
      const supabase = await createClient();
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: ctx.user.email!,
      });

      if (error) {
        throw new TRPCError({ 
          code: "INTERNAL_SERVER_ERROR",
          message: error.message 
        });
      }

      return { success: true, message: "Verification email sent" };
    }),
});
