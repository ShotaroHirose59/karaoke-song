// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { likeRouter } from "./like";
import { songRouter } from "./song";
import { userRouter } from "./user";

export const appRouter = t.router({
  user: userRouter,
  song: songRouter,
  like: likeRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
