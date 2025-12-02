"use client"

import React, { useState } from 'react';
import { BookmarkList } from "@/components/bookmark-list"
import { Bookmark, ViewMode } from "@/components/bookmark-card"
import { AddBookmarkModal } from "@/components/add-bookmark-modal"
import { LayoutGrid, List } from 'lucide-react';

// Mock data (shared for now, ideally fetched)
const MOCK_BOOKMARKS: Bookmark[] = [
    {
        id: "1",
        title: "Next.js 15 Documentation",
        description: "The React Framework for the Web. Features Server Components, Streaming, and more.",
        url: "https://nextjs.org/docs",
        imageUrl: "https://assets.vercel.com/image/upload/v1662130559/nextjs/icon.png",
        tags: [{ id: "1", name: "Next.js" }, { id: "2", name: "React" }],
        isFavorite: true,
        isRead: false,
        createdAt: new Date()
    },
    {
        id: "2",
        title: "Vercel AI SDK",
        description: "Build AI-powered applications with React, Svelte, Vue, and Solid.",
        url: "https://sdk.vercel.ai/docs",
        imageUrl: "https://assets.vercel.com/image/upload/v1696613969/openai-doc-og.png",
        tags: [{ id: "3", name: "AI" }],
        isFavorite: false,
        isRead: true,
        createdAt: new Date()
    },
    {
        id: "3",
        title: "Tailwind CSS",
        description: "Rapidly build modern websites without ever leaving your HTML.",
        url: "https://tailwindcss.com",
        imageUrl: "https://tailwindcss.com/_next/static/media/social-card-large.a6e71726.jpg",
        tags: [{ id: "4", name: "CSS" }, { id: "5", name: "Design" }],
        isFavorite: true,
        isRead: true,
        createdAt: new Date()
    },
    {
        id: "4",
        title: "React Documentation",
        description: "The library for web and native user interfaces",
        url: "https://react.dev",
        tags: [{ id: "2", name: "React" }],
        isFavorite: false,
        isRead: false,
        createdAt: new Date()
    }
];

export default function BookmarksPage() {
    const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.GRID);

    return (
        <div className="flex flex-col gap-8 p-6 max-w-7xl mx-auto w-full">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Bookmarks</h1>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 bg-white dark:bg-[#0f172a] p-1 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
                        <button
                            onClick={() => setViewMode(ViewMode.GRID)}
                            className={`p-2 rounded-md transition-colors ${viewMode === ViewMode.GRID ? 'bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode(ViewMode.LIST)}
                            className={`p-2 rounded-md transition-colors ${viewMode === ViewMode.LIST ? 'bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                    <AddBookmarkModal />
                </div>
            </div>

            <BookmarkList
                bookmarks={MOCK_BOOKMARKS}
                viewMode={viewMode}
                onToggleFavorite={(id) => console.log('Toggle favorite', id)}
                onDelete={(id) => console.log('Delete', id)}
                onToggleRead={(id) => console.log('Toggle read', id)}
            />
        </div>
    )
}
