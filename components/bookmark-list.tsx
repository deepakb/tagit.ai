"use client"

import React from 'react';
import { BookmarkCard, Bookmark, ViewMode } from "@/components/bookmark-card"
import { Search, Folder } from 'lucide-react';

interface Props {
    bookmarks: Bookmark[];
    viewMode: ViewMode;
    searchQuery?: string;
    onToggleFavorite?: (id: string) => void;
    onDelete?: (id: string) => void;
    onToggleRead?: (id: string) => void;
}

export const BookmarkList: React.FC<Props> = ({
    bookmarks,
    viewMode,
    searchQuery = "",
    onToggleFavorite,
    onDelete,
    onToggleRead
}) => {
    if (bookmarks.length === 0) {
        return (
            <div className="text-center py-24 rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 bg-white dark:bg-[#0f172a]/50">
                <div className="inline-flex p-4 rounded-full mb-4 bg-blue-50 dark:bg-gray-900">
                    {searchQuery ? (
                        <Search className="w-6 h-6 text-blue-500 dark:text-gray-500" />
                    ) : (
                        <Folder className="w-6 h-6 text-blue-500 dark:text-gray-500" />
                    )}
                </div>
                <h3 className="text-lg font-medium mb-1 text-gray-900 dark:text-white">
                    {searchQuery ? 'No matches found' : 'No bookmarks found'}
                </h3>
                <p className="max-w-xs mx-auto text-gray-500">
                    {searchQuery ? 'Try adjusting your search terms.' : 'This collection is empty.'}
                </p>
            </div>
        );
    }

    return (
        <div className={`grid gap-6 ${viewMode === ViewMode.GRID ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
            {bookmarks.map((bookmark) => (
                <BookmarkCard
                    key={bookmark.id}
                    bookmark={bookmark}
                    viewMode={viewMode}
                    onToggleFavorite={onToggleFavorite}
                    onDelete={onDelete}
                    onToggleRead={onToggleRead}
                />
            ))}
        </div>
    );
};
