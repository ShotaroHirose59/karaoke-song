type Props = {
  message: string
}

export function LoadingMessasge(props: Props) {
  const { message } = props

  return <p className="mb-2 text-green-500">{message}...</p>
}