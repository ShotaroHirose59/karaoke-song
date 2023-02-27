import { FormEvent } from "react"
import { useSongStore } from "../../store/song"
import { useMutateSong } from "../../hooks/useMutateSong"
import { LoadingMessasge } from "../LoadingMessage"

export function SongForm() {
  const { createSongMutation, updateSongMutation } = useMutateSong()
  const { editedSong } = useSongStore()
  const update = useSongStore((state) => state.updateEditedSong)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedSong.songId === '')
      createSongMutation.mutate({
        name: editedSong.name,
        songKey: editedSong.songKey
      })
    else {
      updateSongMutation.mutate({
        songId: editedSong.songId,
        name: editedSong.name,
        songKey: editedSong.songKey
      })
    }
  }

  const songKeyOptions: string[] = [
    '+6', '+5', '+4', '+3', '+2', '+1',
    '±0',
    '-1', '-2', '-3', '-4', '-5', '-6',
  ]
  const DEFAULT_SONG_KEY = '±0'

  return (
    <form onSubmit={handleSubmit} className="mb-5 text-center">
      {(createSongMutation.isLoading) && (
        <LoadingMessasge message="追加中" />
      )}
      {(updateSongMutation.isLoading) && (
         <LoadingMessasge message="更新中" />
      )}
      <input
        type="text"
        className="mb-3 border border-gray-300 px-3 py-2"
        placeholder="曲名"
        value={editedSong.name || ''}
        onChange={(e) => update({ ...editedSong, name: e.target.value })}
      />
      <p className="mb-3 text-pink-500">
        {createSongMutation.error?.data?.zodError &&
          createSongMutation.error.data.zodError.fieldErrors.name}
      </p>
      <select
        className="mb-3 border border-gray-300 px-3 py-2"
        placeholder="キー"
        value={editedSong.songKey || DEFAULT_SONG_KEY}
        onChange={(e) => update({ ...editedSong, songKey: e.target.value })}
      >
        {songKeyOptions.map((songKeyOption) => (
          <option value={songKeyOption} key={songKeyOption}>{songKeyOption}</option>
        ))}
      </select>
      <p className="mb-3 text-pink-500">
        {createSongMutation.error?.data?.zodError &&
          createSongMutation.error.data.zodError.fieldErrors.songKey}
      </p>
      <button className="rounded bg-indigo-600 py-1 px-3 text-white hover:bg-indigo-700 focus:outline-none">
        {editedSong.songId === '' ? '追加' : '更新'}
      </button>
    </form>
  )
}
 