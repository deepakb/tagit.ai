"use client"

import React, { useState } from 'react';
import { BookmarkList } from "@/components/bookmark-list"
import { Bookmark, ViewMode } from "@/components/bookmark-card"
import { LayoutGrid, List } from 'lucide-react';

// Mock data (shared for now, ideally fetched)
const MOCK_BOOKMARKS: Bookmark[] = [
    {
        id: "5",
        title: "Old Documentation",
        description: "Legacy docs for v1",
        url: "https://example.com/v1",
        tags: [{ id: "6", name: "Legacy" }],
        isFavorite: false,
        isRead: true,
        createdAt: new Date(),
        // Mocking archived property which isn't in interface yet but should be
    }
];

// Extend interface for this mock if needed, or update shared type
// For now, assuming Bookmark interface has isArchived or I'll filter by a property

export default function ArchivePage() {
    const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.GRID);
    // Mocking archived items
    const archivedBookmarks: Bookmark[] = [
        {
            id: "5",
            title: "Old Documentation",
            description: "Legacy docs for v1",
            url: "https://example.com/v1",
            tags: [{ id: "6", name: "Legacy" }],
            isFavorite: false,
            isRead: true,
            createdAt: new Date(),
        }
    ];

    return (
        <div className="flex flex-col gap-8 p-6 max-w-7xl mx-auto w-full">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Archive</h1>

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
                </div>
            </div>

            <BookmarkList
                bookmarks={archivedBookmarks}
                viewMode={viewMode}
                onToggleFavorite={(id) => console.log('Toggle favorite', id)}
                onDelete={(id) => console.log('Delete', id)}
                onToggleRead={(id) => console.log('Toggle read', id)}
            />
        </div>
    )
}
