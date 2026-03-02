import { auth } from "@/auth"

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const isApiAuthRoute = req.nextUrl.pathname.startsWith("/api/auth")

    if (isApiAuthRoute) {
        return
    }

    if (!isLoggedIn) {
        // Redirect unauthenticated users to a minimal sign-in page or the provider directly.
        return Response.redirect(new URL("/api/auth/signin", req.nextUrl))
    }
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
