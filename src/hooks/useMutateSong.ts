import { useSongStore } from "../store/song"
import { trpc } from "../utils/trpc"

export const useMutateSong = () => {
  // react queryによってフロントエンドにキャッシュされているデータを書き換える必要がある
  const utils = trpc.useContext()
  // Songのキャッシュ
  const previousSongs = utils.song.getSongs.getData()
  const reset = useSongStore((state) => state.resetEditedSong)

  // サーバーサイドの関数をremote procedure callで直接呼び出す
  const createSongMutation = trpc.song.createSong.useMutation({
    // resはcreateSong関数の返り値
    onSuccess: (res) => {
      // 既存のSongが存在する場合はキャッシュを更新
      if (previousSongs) {
        utils.song.getSongs.setData([res, ...previousSongs])
      }
      reset()
    }
  })

  const updateSongMutation = trpc.song.updateSong.useMutation({
    onSuccess: (res) => {
      if (previousSongs) {
        // 更新したタスクのIDに一致するオブジェクトだけ更新後のオブジェクトで置き換える
        utils.song.getSongs.setData(
          previousSongs.map((song) => (song.id === res.id ? res : song))
        )
        reset()
      }
    }
  })

  const deleteSongMutation = trpc.song.deleteSong.useMutation({
    // 第1引数は関数の返り値
    // 第2引数は関数に渡されたinputの引数の値
    onSuccess: (_, variables) => {
      if (previousSongs) {
        utils.song.getSongs.setData(
          previousSongs.filter((song) => song.id !== variables.songId)
        )
      }
    }
  })

  return { createSongMutation, updateSongMutation, deleteSongMutation }
}