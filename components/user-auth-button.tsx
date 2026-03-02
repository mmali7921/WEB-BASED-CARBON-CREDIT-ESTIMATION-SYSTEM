"use client"

import { Button } from "@/components/ui/button"
import { handleSignIn, handleSignOut } from "@/app/actions/auth"
import { useSession } from "next-auth/react"

export function UserAuthButton() {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return <Button variant="ghost" disabled>Loading...</Button>
    }

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
