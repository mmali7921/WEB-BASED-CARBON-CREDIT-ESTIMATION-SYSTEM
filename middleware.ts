import NextAuth from "next-auth"
import { authConfig } from "./auth.config"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const isApiAuthRoute = req.nextUrl.pathname.startsWith("/api/auth")

    if (isApiAuthRoute) {
        return
    }

    if (!isLoggedIn) {
        let callbackUrl = req.nextUrl.pathname
        if (req.nextUrl.search) {
            callbackUrl += req.nextUrl.search
        }

        const encodedCallbackUrl = encodeURIComponent(callbackUrl)

        return Response.redirect(new URL(`/login?callbackUrl=${encodedCallbackUrl}`, req.nextUrl))
    }
})

export const config = {
    matcher: ["/calculator/:path*", "/dashboard/:path*"],
}
