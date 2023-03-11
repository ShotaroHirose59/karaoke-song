import { HeartIcon } from '@heroicons/react/24/solid'

type Props = {
  style: string
  handleClick: () => void
}

export function LikeIcon(props: Props) {
  const { style, handleClick } = props
  return <HeartIcon className={style} onClick={handleClick} />
}