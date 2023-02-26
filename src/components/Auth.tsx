import { signIn } from "next-auth/react"
import { GithubLoginButton } from "react-social-login-buttons";

export function Auth() {
  return (
    <div>
      <GithubLoginButton onClick={() => signIn('github')} />
    </div>
  )
}
