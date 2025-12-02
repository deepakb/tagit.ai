import prisma from "@/lib/db"
import { auth } from "@/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Folder } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function CollectionsPage() {
    const session = await auth()
    if (!session?.user?.email) return null

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
            collections: {
                include: { _count: { select: { bookmarks: true } } }
            }
        }
    })

    if (!user) return null

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Collections</h1>
                <Button>New Collection</Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {user.collections.map((collection) => (
                    <Link key={collection.id} href={`/collections/${collection.id}`}>
                        <Card className="group transition-all hover:shadow-md">
                            <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                                    <Folder size={20} />
                                </div>
                                <div className="flex flex-col">
                                    <CardTitle className="text-base">{collection.name}</CardTitle>
                                    <span className="text-xs text-muted-foreground">
                                        {collection._count.bookmarks} bookmarks
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="line-clamp-2 text-sm text-muted-foreground">
                                    {collection.description || "No description"}
                                </p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}

                {user.collections.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8 text-center">
                        <Folder className="h-10 w-10 text-muted-foreground/50" />
                        <h3 className="text-lg font-semibold">No collections yet</h3>
                        <p className="text-sm text-muted-foreground">
                            Create a collection to organize your bookmarks.
                        </p>
                        <Button variant="outline" className="mt-2">Create Collection</Button>
                    </div>
                )}
            </div>
        </div>
    )
}
