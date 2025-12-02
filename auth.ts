import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import { z } from "zod"
import prisma from "@/lib/db"
import bcrypt from "bcryptjs"

// Mock hash for now to avoid native dependency issues in some envs, or use bcryptjs
// I'll assume bcryptjs is better for cross-platform
// npm install bcryptjs @types/bcryptjs

async function getUser(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        })
        return user
    } catch (error) {
        console.error("Failed to fetch user:", error)
        throw new Error("Failed to fetch user.")
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials)

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data
                    const user = await getUser(email)
                    if (!user || !user.hashedPassword) return null

                    const passwordsMatch = await bcrypt.compare(password, user.hashedPassword)

                    if (passwordsMatch) {
                        return user
                    }
                }

                console.log("Invalid credentials")
                return null
            },
        }),
        Google,
        GitHub,
    ],
    pages: {
        signIn: "/auth/login",
    },
})
