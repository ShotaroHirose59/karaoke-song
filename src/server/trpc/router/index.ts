// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { songRouter } from "./song";

export const appRouter = t.router({
  song: songRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
