import { z } from "zod";

export const createLikeSchema = z.object({
  userId: z.string().cuid(),
  songId: z.string().cuid()
})

export const deleteLikeSchema = z.object({
  userId: z.string().cuid(),
  songId: z.string().cuid()
})
