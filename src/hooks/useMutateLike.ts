import { trpc } from "../utils/trpc"

export const useMutateLike = () => {
  // react queryによってフロントエンドにキャッシュされているデータを書き換える必要がある
  const utils = trpc.useContext()
  const previousLikeSongs = utils.song.getLikeSongs.getData()

  // サーバーサイドの関数をremote procedure callで直接呼び出す
  const createLikeMutation = trpc.like.createLike.useMutation({
    onSuccess: (res) => {
      if (previousLikeSongs) {
        utils.song.getLikeSongs.setData([...previousLikeSongs, res])
      }
    }
  })

  const deleteLikeMutation = trpc.like.deleteLike.useMutation({
    // 第1引数は関数の返り値
    // 第2引数は関数に渡されたinputの引数の値
    onSuccess: (_, variables) => {
      if (previousLikeSongs) {
        utils.song.getLikeSongs.setData(
          previousLikeSongs.filter((song) => song.id !== variables.songId)
        )
      }
    }
  })

  return { createLikeMutation, deleteLikeMutation }
}