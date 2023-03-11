import { updateSongInput } from '../../schema/song'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useMutateSong } from '../../hooks/useMutateSong'
import { useSongStore } from '../../store/song'
import { LoadingMessasge } from '../LoadingMessage'
import { LikeIcons } from './LikeIcons'

export function SongItem(props: updateSongInput) {
  const { songId, name, songKey } = props
  const { activeTab } = useSongStore()
  const update = useSongStore((state) => state.updateEditedSong)
  const { deleteSongMutation } = useMutateSong()

  return (
    <li>
      <div className="float-left flex mr-4">
        <LikeIcons songId={songId} />
      </div>
      <span>{name}</span>
      <span className="ml-4">{songKey}</span>
      {activeTab === 'all' && (
        <>
          <div className="float-right ml-8 flex">
            <PencilIcon
              className="mx-1 h-5 w-5 cursor-pointer text-indigo-600"
              onClick={() => {
                update({ songId, name, songKey })
              }}
            />
            <TrashIcon
              className="h-5 w-5 cursor-pointer text-indigo-600"
              onClick={() => {
                deleteSongMutation.mutate({ songId })
              }}
            />
          </div>
          <>
            {deleteSongMutation.isLoading && (
              <LoadingMessasge message="削除中" />
            )}
          </>
        </>
      )}
    </li>
  )
}
