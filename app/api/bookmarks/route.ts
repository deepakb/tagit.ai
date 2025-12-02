import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/db';

export async function POST(req: NextRequest) {
    const session = await auth();

    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { url, title, description } = await req.json();

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const bookmark = await prisma.bookmark.create({
            data: {
                url,
                title: title || url, // Fallback title
                description,
                userId: user.id,
            }
        });

        return NextResponse.json(bookmark);
    } catch (error) {
        console.error('Error creating bookmark:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const session = await auth();

    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const bookmarks = await prisma.bookmark.findMany({
            where: { userId: user.id },
            include: { tags: { include: { tag: true } } },
            orderBy: { savedAt: 'desc' }
        });

        return NextResponse.json(bookmarks);
    } catch (error) {
        console.error('Error fetching bookmarks:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
