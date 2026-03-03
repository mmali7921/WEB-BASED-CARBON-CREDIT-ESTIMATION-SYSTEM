"use client"

import { Button } from "@/components/ui/button"
import { handleSignIn } from "@/app/actions/auth"
import { useSession, signOut } from "next-auth/react"

export function UserAuthButton() {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return <Button variant="ghost" disabled>Loading...</Button>
    }

    if (session?.user) {
        return (
            <div className="flex items-center gap-4">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:inline-block">
                    {session.user.name}
                </span>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="rounded-full text-[10px] uppercase tracking-widest font-bold px-6 border-border/50 hover:bg-secondary/40 transition-colors"
                >
                    Sign Out
                </Button>
            </div>
        )
    }

    return (
        <form action={handleSignIn}>
            <Button
                type="submit"
                size="sm"
                className="rounded-full text-[10px] uppercase tracking-widest font-bold px-6 bg-foreground text-background hover:opacity-90 transition-opacity"
            >
                Sign In
            </Button>
        </form>
    )
}
