import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import { handleSignIn, handleSignOut } from "@/app/actions/auth"

export async function UserAuthButton() {
    const session = await auth()

    if (session?.user) {
        return (
            <div className="flex items-center gap-4">
                <span className="text-sm">{session.user.name}</span>
                <form action={handleSignOut}>
                    <Button variant="outline" type="submit">Sign Out</Button>
                </form>
            </div>
        )
    }

    return (
        <form action={handleSignIn}>
            <Button type="submit">Sign in with Google</Button>
        </form>
    )
}
