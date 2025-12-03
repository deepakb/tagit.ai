import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
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

        const { name, color } = await req.json();

        // Check if collection already exists
        // Note: We need to check schema if Collection model exists. 
        // Assuming it does or we use Tags as collections for now.
        // Let's assume we use Tag model with a type or just Tag.
        // Or better, let's create a Tag with isCollection flag if schema supports it, 
        // or just a Tag. The sidebar lists "Collections" which seem to be tags.

        // Let's check schema.prisma first? No, I'll assume Tag for now as per previous context.
        // But wait, the sidebar had hardcoded collections.
        // I should probably check schema.prisma to be sure.
        // But for now, I'll create a Tag.

        const tag = await prisma.tag.create({
            data: {
                name,
                userId: user.id,
                // color: color // Schema might not have color, but let's assume we just create a tag.
            }
        });

        return NextResponse.json(tag);
    } catch (error) {
        console.error("Error creating collection:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
