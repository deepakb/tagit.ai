import NextAuth from "next-auth"
import { auth } from "@/auth"

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard")
    if (isOnDashboard) {
        if (isLoggedIn) return
        return Response.redirect(new URL("/auth/login", req.url))
    }
    return
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
