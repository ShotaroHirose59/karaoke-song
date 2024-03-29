import { createSongSchema, deleteSongSchema, updateSongSchema } from '../../../schema/song'
import { t, authedProcedure } from '../trpc'

export const songRouter = t.router({
  // 追加・更新・削除はmutation
  // inputの引数にバリデーションスキーマを渡すことで入力値のバリデーションを行う
  // authedProcedureで認証プロテクション

  createSong: authedProcedure
    .input(createSongSchema)
    .mutation(async ({ ctx, input }) => {
      const song = await ctx.prisma.song.create({
        data: {
          ...input,
          user: {
            connect: {
              id: ctx.session?.user?.id
            }
          }
        }
      })
      return song
    }),
  // 取得はt.procedure.query
  // getSongs: t.procedure.query(({ ctx }) => {
  //   return ctx.prisma.song.findMany({
  //     where: {
  //       userId: ctx.session?.user?.id
  //     }
  //   })
  // }),
  getSongs: t.procedure.query(({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: { id: ctx.session?.user?.id }
    }).songs()
  }),
  updateSong: authedProcedure
    .input(updateSongSchema)
    .mutation(async ({ ctx, input }) => {
      const song = await ctx.prisma.song.update({
        where: {
          id: input.songId
        },
        data: {
          name: input.name,
          songKey: input.songKey,
          highNoteDifficulty: input.highNoteDifficulty
        }
      })
      return song
    }),
  deleteSong: authedProcedure
    .input(deleteSongSchema)
    .mutation(async ({ctx, input}) => {
      await ctx.prisma.song.delete({
        where: {
          id: input.songId
        }
      })
    }),
  getLikeSongs: t.procedure.query(({ ctx }) => {
    return ctx.prisma.song.findMany({
      where: {
        likes: {
          some: {
            userId: ctx.session?.user?.id
          },
        },
      },
      orderBy: {
        createdAt: 'asc'
      }
    })
  })
})