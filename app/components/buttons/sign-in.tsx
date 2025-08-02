
import { signIn, signOut } from "@/auth"
import { sign } from "crypto"
 
export default function SignIn() {
  const SignIn = async (provider: string) => {
    "use server"

    await signIn(provider, {redirectTo: "/courses"})
  } 
  
  return (
    <>
    <button onSubmit={() => SignIn("github")}>Signin with GitHub</button>
    <button onSubmit={() => SignIn("google")}>Signin with Google</button>
 
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
    </>

  )
} 