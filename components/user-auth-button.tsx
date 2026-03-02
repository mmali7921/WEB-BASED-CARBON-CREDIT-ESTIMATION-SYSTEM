import { signIn, signOut, auth } from "@/auth"
import { Button } from "@/components/ui/button"

export async function UserAuthButton() {
    const session = await auth()

    if (session?.user) {
        return (
            <div className="flex items-center gap-4">
                <span className="text-sm">{session.user.name}</span>
                <form
                    action={async () => {
                        "use server"
                        await signOut()
                    }}
                >
                    <Button variant="outline" type="submit">Sign Out</Button>
                </form>
            </div>
        )
    }

    return (
        <form
            action={async () => {
                "use server"
                await signIn("google")
            }}
        >
            <Button type="submit">Sign in with Google</Button>
        </form>
    )
}
