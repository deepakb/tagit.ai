"use client"

import React from 'react';
import { Star, ExternalLink, Trash2, CheckCircle } from 'lucide-react';
import Link from 'next/link';

// Define types locally or import from a shared types file
export interface Bookmark {
    id: string;
    title: string;
    description: string | null;
    url: string;
    imageUrl?: string;
    isFavorite: boolean;
    isRead: boolean;
    tags: { id: string; name: string }[];
    createdAt: Date;
}

export enum ViewMode {
    GRID = 'grid',
    LIST = 'list'
}

interface Props {
    bookmark: Bookmark;
    viewMode?: ViewMode;
    onToggleFavorite?: (id: string) => void;
    onDelete?: (id: string) => void;
    onToggleRead?: (id: string) => void;
}

export const BookmarkCard: React.FC<Props> = ({
    bookmark,
    viewMode = ViewMode.GRID,
    onToggleFavorite,
    onDelete,
    onToggleRead
}) => {
    const isList = viewMode === ViewMode.LIST;
    const imageUrl = bookmark.imageUrl || `https://picsum.photos/seed/${bookmark.id}/400/200`; // Fallback image

    return (
        <div className={`group relative bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 ${isList ? 'flex flex-row h-32' : 'flex flex-col hover:shadow-xl hover:shadow-blue-900/5 dark:hover:shadow-blue-900/10 hover:-translate-y-1'}`}>

            {/* Image Section */}
            <div className={`relative overflow-hidden bg-gray-100 dark:bg-gray-800/50 ${isList ? 'w-48 shrink-0' : 'h-40 w-full'}`}>
                <img
                    src={imageUrl}
                    alt={bookmark.title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <button
                        onClick={(e) => { e.preventDefault(); onToggleRead?.(bookmark.id); }}
                        className={`p-1.5 rounded-lg backdrop-blur-md border border-white/10 transition-colors ${bookmark.isRead ? 'bg-green-500/20 text-green-400' : 'bg-black/50 text-white hover:bg-black/70'}`}
                        title={bookmark.isRead ? "Mark unread" : "Mark read"}
                    >
                        <CheckCircle className={`w-4 h-4 ${bookmark.isRead ? 'fill-green-500 text-green-500' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className={`flex-1 p-4 flex flex-col ${isList ? 'py-3' : ''}`}>
                <div className="flex-1">
                    <div className="flex justify-between items-start gap-3 mb-1.5">
                        <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 line-clamp-1 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                {bookmark.title}
                            </a>
                        </h3>
                        <button
                            onClick={() => onToggleFavorite?.(bookmark.id)}
                            className="text-gray-400 hover:text-yellow-400 transition-colors focus:outline-none shrink-0"
                        >
                            <Star className={`w-4 h-4 ${bookmark.isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                        </button>
                    </div>

                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 leading-relaxed">
                        {bookmark.description}
                    </p>
                </div>

                <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100 dark:border-gray-800/50">
                    <div className="flex flex-wrap gap-1.5">
                        {bookmark.tags.slice(0, 3).map(tag => (
                            <span key={tag.id} className={`text-[10px] px-2 py-0.5 rounded-md font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700`}>
                                #{tag.name}
                            </span>
                        ))}
                        {bookmark.tags.length > 3 && (
                            <span className="text-[10px] px-1.5 py-0.5 text-gray-400">+{bookmark.tags.length - 3}</span>
                        )}
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                            onClick={() => onDelete?.(bookmark.id)}
                            className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 rounded-md transition-colors"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <Link
                            href={`/reader/${bookmark.id}`}
                            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-200 rounded-md transition-colors"
                        >
                            <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
