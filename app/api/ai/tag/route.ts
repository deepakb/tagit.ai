import { NextRequest, NextResponse } from 'next/server';
import { suggestTags } from '@/lib/ai/tagging';
import { auth } from '@/auth';
import prisma from '@/lib/db';

export async function POST(req: NextRequest) {
    const session = await auth();

    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { bookmarkId, bookmarkData } = await req.json();

        // Get user's existing tags
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: { tags: true }
        });

        const existingTags = user?.tags.map((t: { name: string }) => t.name) || [];

        // Get AI suggestions
        const suggestions = await suggestTags(bookmarkData, existingTags);

        // If we have a bookmarkId, save suggestions to DB
        if (bookmarkId) {
            await Promise.all(
                suggestions.map(suggestion =>
                    prisma.aiTag.create({
                        data: {
                            bookmarkId,
                            tagName: suggestion.tag,
                            confidence: suggestion.confidence,
                            reasoning: suggestion.reasoning,
                        }
                    })
                )
            );
        }

        return NextResponse.json({ suggestions });
    } catch (error) {
        console.error('Error in AI tagging:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
