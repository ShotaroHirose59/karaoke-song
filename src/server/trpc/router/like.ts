import { createLikeSchema, deleteLikeSchema } from '../../../schema/like'
import { t, authedProcedure } from '../trpc'

export const likeRouter = t.router({
  createLike: authedProcedure
    .input(createLikeSchema)
    .mutation(async ({ ctx, input }) => {
      const like = await ctx.prisma.like.create({
        data: {
          ...input
        }
      })
      return await ctx.prisma.song.findUniqueOrThrow({
        where: {
          id: like.songId
        }
      })
    }),
  deleteLike: authedProcedure
    .input(deleteLikeSchema)
    .mutation(async ({ctx, input}) => {
      // TODO deleteにする
      return await ctx.prisma.like.deleteMany({
        where: {
          userId: input.userId,
          songId: input.songId
        }
      })
    })
})
