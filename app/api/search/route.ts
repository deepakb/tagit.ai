import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/db';
import { generateEmbedding } from '@/lib/ai/tagging';

export async function GET(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');
    const type = searchParams.get('type') || 'hybrid'; // 'keyword', 'semantic', 'hybrid'

    if (!query) {
        return NextResponse.json({ error: 'Query required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    let results: any[] = [];

    // 1. Keyword Search (Basic)
    if (type === 'keyword' || type === 'hybrid') {
        const keywordResults = await prisma.bookmark.findMany({
            where: {
                userId: user.id,
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { description: { contains: query, mode: 'insensitive' } },
                    { url: { contains: query, mode: 'insensitive' } },
                    { tags: { some: { tag: { name: { contains: query, mode: 'insensitive' } } } } }
                ]
            },
            include: { tags: { include: { tag: true } } },
            take: 20
        });
        results = [...keywordResults];
    }

    // 2. Semantic Search (Vector)
    if (type === 'semantic' || type === 'hybrid') {
        try {
            const embedding = await generateEmbedding(query);

            if (embedding.length > 0) {
                // Since we are using Prisma without raw pgvector extension setup in schema yet,
                // we have to fetch all embeddings and calculate cosine similarity in memory (NOT SCALABLE but works for MVP/POC).
                // For production, use `await prisma.$queryRaw` with pgvector operator `<=>`.

                const allEmbeddings = await prisma.bookmarkEmbedding.findMany({
                    where: { bookmark: { userId: user.id } },
                    include: { bookmark: { include: { tags: { include: { tag: true } } } } }
                });

                const semanticResults = allEmbeddings
                    .map(record => {
                        const vector = JSON.parse(record.embedding);
                        const similarity = cosineSimilarity(embedding, vector);
                        return { bookmark: record.bookmark, score: similarity };
                    })
                    .filter(item => item.score > 0.7) // Threshold
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 20)
                    .map(item => item.bookmark);

                // Merge results (deduplicate)
                const existingIds = new Set(results.map(r => r.id));
                for (const res of semanticResults) {
                    if (!existingIds.has(res.id)) {
                        results.push(res);
                    }
                }
            }
        } catch (error) {
            console.error('Semantic search error:', error);
        }
    }

    return NextResponse.json(results);
}

function cosineSimilarity(vecA: number[], vecB: number[]) {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}
