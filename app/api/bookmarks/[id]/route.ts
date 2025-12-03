import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@/auth";

export async function DELETE(
    req: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Verify ownership
        const bookmark = await prisma.bookmark.findUnique({
            where: { id: params.id }
        });

        if (!bookmark || bookmark.userId !== user.id) {
            return NextResponse.json({ error: "Bookmark not found or unauthorized" }, { status: 404 });
        }

        await prisma.bookmark.delete({
            where: { id: params.id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting bookmark:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(
    req: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const body = await req.json();
        const { isFavorite, isRead } = body;

        // Verify ownership
        const bookmark = await prisma.bookmark.findUnique({
            where: { id: params.id }
        });

        if (!bookmark || bookmark.userId !== user.id) {
            return NextResponse.json({ error: "Bookmark not found or unauthorized" }, { status: 404 });
        }

        const updatedBookmark = await prisma.bookmark.update({
            where: { id: params.id },
            data: {
                isFavorite: isFavorite !== undefined ? isFavorite : undefined,
                isRead: isRead !== undefined ? isRead : undefined,
            }
        });

        return NextResponse.json(updatedBookmark);
    } catch (error) {
        console.error("Error updating bookmark:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
