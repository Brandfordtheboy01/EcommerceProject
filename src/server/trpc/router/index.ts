import { router } from "../init";
import { productsRouter } from "./products";
import { authRouter } from "./auth";
import { categoriesRouter } from "./categories";

export const appRouter = router({
  products: productsRouter,
  auth: authRouter,
  categories: categoriesRouter,
});

export type AppRouter = typeof appRouter;
