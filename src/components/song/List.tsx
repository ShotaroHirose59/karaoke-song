import { useSongStore } from "../../store/song"
import { trpc } from "../../utils/trpc"
import { SongItem } from "./Item"
import { SongTabs } from "./Tabs"

export function SongList() {
  const { data: songs, isLoading, error } = trpc.song.getSongs.useQuery()
  const { data: likeSongs } = trpc.song.getLikeSongs.useQuery()
  const { activeTab } = useSongStore()

  if (isLoading) {
    return <p>Loading song list...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }
  return (
    <>
      <SongTabs />
      {activeTab === 'like' ?
        <>
          <ul>
            {likeSongs?.map((song) => (
              <SongItem
                key={song.id}
                songId={song.id}
                name={song.name}
                songKey={song.songKey}
                highNoteDifficulty={song.highNoteDifficulty}
              />
            ))}
          </ul>
        </>
        :
        <>
          <ul>
            {songs?.map((song) => (
              <SongItem
                key={song.id}
                songId={song.id}
                name={song.name}
                songKey={song.songKey}
                highNoteDifficulty={song.highNoteDifficulty}
              />
            ))}
          </ul>
        </>
      }
    </>
  )
}