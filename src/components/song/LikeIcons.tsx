import { useSession } from 'next-auth/react'
import { useMutateLike } from '../../hooks/useMutateLike'
import { trpc } from '../../utils/trpc'
import { LikeIcon } from './LikeIcon'

type Props = {
  songId: string
}

export function LikeIcons(props: Props) {
  const { songId } = props
  const { data: session } = useSession()
  const { createLikeMutation, deleteLikeMutation } = useMutateLike()
  const utils = trpc.useContext()
  const previousLikeSongs = utils.song.getLikeSongs.getData()

  const clickLike = (songId: string) => {
    if (session?.user?.id) {
      createLikeMutation.mutate({
        userId: session.user.id,
        songId
      })
    }
  }
  const clickRemoveLike = (songId: string) => {
    if (session?.user?.id) {
      deleteLikeMutation.mutate({
        userId: session.user.id,
        songId
      })
    }
  }
  const isLliked = () => previousLikeSongs?.some((song) => {
    return song.id === songId
  })

  return (
    <>
      {!createLikeMutation.isLoading && (
        <>
          {isLliked() ?
            <LikeIcon
              style="w-5 mt-1 cursor-pointer text-red-400"
              handleClick={() => clickRemoveLike(songId)}
            />
            :
            <LikeIcon
              style="w-5 mt-1 cursor-pointer text-gray-400"
              handleClick={() => clickLike(songId)}
            />
          }
        </>
      )}
    </>
  )
}