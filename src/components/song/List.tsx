import { trpc } from "../../utils/trpc"
import { SongItem } from "./Item"

export function SongList() {
  const { data, isLoading, error } = trpc.song.getSongs.useQuery()

  if (isLoading) {
    return <p>Loading song list...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }
  return (
    <ul>
      {data?.map((song) => (
        <SongItem
          key={song.id}
          songId={song.id}
          name={song.name}
          songKey={song.songKey}
        />
      ))}
    </ul>
  )
}