import prisma from "@/lib/db"
import { auth } from "@/auth"
import { notFound, redirect } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"

export default async function ReaderPage({ params }: { params: { id: string } }) {
    const session = await auth()
    if (!session) redirect("/auth/login")

    const bookmark = await prisma.bookmark.findUnique({
        where: { id: params.id },
        include: { tags: { include: { tag: true } } },
    })

    if (!bookmark || bookmark.userId !== session.user?.id) { // Assuming user.id is available in session
        // Actually session.user.id might not be populated by default in NextAuth v5 without callback
        // But for now let's assume it is or we fetch user by email
        // If we fetched user by email in auth.ts, we might need to do it here too if session.user.id is missing
        // For safety, let's fetch user by email here if needed, but let's assume happy path for now
        // Or better, check email match if id is missing
        // const user = await prisma.user.findUnique({ where: { email: session.user.email! } })
        // if (bookmark.userId !== user?.id) return notFound()
    }

    // Re-fetch user to be safe if session.user.id is not guaranteed
    const user = await prisma.user.findUnique({ where: { email: session.user?.email! } })
    if (!bookmark || !user || bookmark.userId !== user.id) {
        return notFound()
    }

    return (
        <div className="mx-auto max-w-3xl px-4 py-8">
            <div className="mb-8 flex items-center justify-between">
                <Button variant="ghost" asChild className="gap-2">
                    <Link href="/dashboard">
                        <ArrowLeft size={16} />
                        Back
                    </Link>
                </Button>
                <Button variant="outline" asChild className="gap-2">
                    <Link href={bookmark.url} target="_blank">
                        <ExternalLink size={16} />
                        Original
                    </Link>
                </Button>
            </div>

            <article className="prose prose-stone dark:prose-invert lg:prose-lg">
                <h1 className="mb-4 text-4xl font-bold leading-tight">{bookmark.title}</h1>

                <div className="mb-6 flex flex-wrap gap-2">
                    {bookmark.tags.map(({ tag }) => (
                        <Badge key={tag.id} variant="secondary">
                            {tag.name}
                        </Badge>
                    ))}
                </div>

                {bookmark.aiSummary && (
                    <div className="mb-8 rounded-lg border bg-muted/50 p-6">
                        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                            AI Summary
                        </h3>
                        <p className="text-lg leading-relaxed">{bookmark.aiSummary}</p>
                    </div>
                )}

                {/* Placeholder for content if we had a scraper */}
                <div className="mt-8 space-y-4 text-lg leading-relaxed text-foreground/90">
                    {bookmark.content ? (
                        <div dangerouslySetInnerHTML={{ __html: bookmark.content }} />
                    ) : (
                        <p className="italic text-muted-foreground">
                            Content not available for reader view. Please visit the original URL.
                        </p>
                    )}
                </div>
            </article>
        </div>
    )
}
