import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { createClient } from "@/lib/supabase/server";

export { TRPCError };

export const createContext = async () => {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return {
    session,
    user: session?.user,
  };
};

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.user) {
    throw new TRPCError({ 
      code: "UNAUTHORIZED",
      message: "Authentication required" 
    });
  }
  return next();
});

// Role-based procedures
export const adminProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session || !ctx.user) {
    throw new TRPCError({ 
      code: "UNAUTHORIZED",
      message: "Authentication required" 
    });
  }

  const supabase = await createClient();
  const { data: user } = await supabase
    .from('users')
    .select('role')
    .eq('id', ctx.user.id)
    .single();

  if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
    throw new TRPCError({ 
      code: "FORBIDDEN",
      message: "Admin access required" 
    });
  }

  return next({ ctx: { ...ctx, user: { ...ctx.user, role: user.role } } });
});

export const vendorProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session || !ctx.user) {
    throw new TRPCError({ 
      code: "UNAUTHORIZED",
      message: "Authentication required" 
    });
  }

  const supabase = await createClient();
  const { data: user } = await supabase
    .from('users')
    .select('role')
    .eq('id', ctx.user.id)
    .single();

  if (!user || user.role !== 'VENDOR') {
    throw new TRPCError({ 
      code: "FORBIDDEN",
      message: "Vendor access required" 
    });
  }

  return next({ ctx: { ...ctx, user: { ...ctx.user, role: user.role } } });
});

export const customerProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session || !ctx.user) {
    throw new TRPCError({ 
      code: "UNAUTHORIZED",
      message: "Authentication required" 
    });
  }

  const supabase = await createClient();
  const { data: user } = await supabase
    .from('users')
    .select('role')
    .eq('id', ctx.user.id)
    .single();

  if (!user || user.role !== 'CUSTOMER') {
    throw new TRPCError({ 
      code: "FORBIDDEN",
      message: "Customer access required" 
    });
  }

  return next({ ctx: { ...ctx, user: { ...ctx.user, role: user.role } } });
});
