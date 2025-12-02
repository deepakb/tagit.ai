import { DashboardClient } from "@/components/dashboard-client";
import prisma from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await auth();
    if (!session?.user?.email) {
        redirect("/auth/login");
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    });

    if (!user) {
        redirect("/auth/login");
    }

    const bookmarks = await prisma.bookmark.findMany({
        where: { userId: user.id },
        include: { tags: { include: { tag: true } } },
        orderBy: { savedAt: 'desc' }
    });

    const formattedBookmarks = bookmarks.map(b => ({
        ...b,
        tags: b.tags.map(bt => bt.tag),
        imageUrl: b.thumbnail || undefined,
        createdAt: b.savedAt,
    }));

    const stats = {
        total: bookmarks.length,
        unread: bookmarks.filter(b => !b.isRead).length,
        favorites: bookmarks.filter(b => b.isFavorite).length,
        tagsCount: 0
    };

    return <DashboardClient initialBookmarks={formattedBookmarks} stats={stats} />;
}
