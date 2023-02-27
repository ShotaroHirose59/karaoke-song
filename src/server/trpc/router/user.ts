import { deleteUserSchema } from '../../../schema/user'
import { t, authedProcedure } from '../trpc'

export const userRouter = t.router({
  deleteUser: authedProcedure
    .input(deleteUserSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.user.delete({
        where: {
          id: input.userId
        }
      })
    })
})