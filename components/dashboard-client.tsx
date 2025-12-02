"use client"

import React, { useState } from 'react';
import { AddBookmarkModal } from "@/components/add-bookmark-modal"
import { BookmarkCard, Bookmark, ViewMode } from "@/components/bookmark-card"
import { StatsCard } from "@/components/stats-card"
import { LayoutGrid, List } from 'lucide-react';

interface DashboardClientProps {
    initialBookmarks: any[]; // Using any to avoid strict type mismatch for now, or define proper type
    stats: any;
}

export function DashboardClient({ initialBookmarks, stats }: DashboardClientProps) {
    const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.GRID);
    const [activeFilter, setActiveFilter] = useState<'all' | 'favorites' | 'unread'>('all');

    const filteredBookmarks = initialBookmarks.filter(b => {
        if (activeFilter === 'favorites') return b.isFavorite;
        if (activeFilter === 'unread') return !b.isRead;
        return true;
    });

    return (
        <div className="flex flex-col gap-8 p-6 max-w-7xl mx-auto w-full">
            {/* Stats Section */}
            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                <StatsCard stats={stats} />
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-0 z-10 bg-gray-50/80 dark:bg-[#020617]/80 backdrop-blur-xl py-4 -my-4 px-2 -mx-2">
                <div className="flex items-center gap-2 bg-white dark:bg-[#0f172a] p-1 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                    {['all', 'favorites', 'unread'].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter as any)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeFilter === filter
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}
                        >
                            {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </button>
                    ))}
                </div>

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

            {/* Grid */}
            <div className={`grid gap-6 ${viewMode === ViewMode.GRID ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                {filteredBookmarks.map((bookmark) => (
                    <BookmarkCard
                        key={bookmark.id}
                        bookmark={bookmark}
                        viewMode={viewMode}
                        onToggleFavorite={(id) => console.log('Toggle favorite', id)}
                        onDelete={(id) => console.log('Delete', id)}
                        onToggleRead={(id) => console.log('Toggle read', id)}
                    />
                ))}
            </div>
        </div>
    )
}
