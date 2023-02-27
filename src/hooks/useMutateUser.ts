import { signOut } from "next-auth/react"
import { trpc } from "../utils/trpc"

export const useMutateUser = () => {
  const deleteUserMutation = trpc.user.deleteUser.useMutation({
    onSuccess: () => signOut()
  })

  return { deleteUserMutation }
}
