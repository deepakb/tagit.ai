"use client"

import React, { useState, useEffect } from 'react';
import { AddBookmarkModal } from "@/components/add-bookmark-modal"
import { BookmarkCard, Bookmark, ViewMode } from "@/components/bookmark-card"
import { StatsCard } from "@/components/stats-card"
import { LayoutGrid, List, Clock, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';

interface DashboardClientProps {
    initialBookmarks: any[];
    stats: any;
}

export function DashboardClient({ initialBookmarks, stats }: DashboardClientProps) {
    const [bookmarks, setBookmarks] = useState<any[]>(initialBookmarks);
    const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.GRID);
    const [activeFilter, setActiveFilter] = useState<'all' | 'favorites' | 'unread'>('all');
    const router = useRouter();

    useEffect(() => {
        setBookmarks(initialBookmarks);
    }, [initialBookmarks]);

    const filteredBookmarks = bookmarks.filter(b => {
        if (activeFilter === 'favorites') return b.isFavorite;
        if (activeFilter === 'unread') return !b.isRead;
        return true;
    });

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this bookmark?")) return;
        const previousBookmarks = [...bookmarks];
        setBookmarks(prev => prev.filter(b => b.id !== id));
        try {
            const res = await fetch(`/api/bookmarks/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error("Failed to delete");
            router.refresh();
        } catch (error) {
            console.error("Delete failed", error);
            setBookmarks(previousBookmarks);
            alert("Failed to delete bookmark");
        }
    };

    const handleToggleFavorite = async (id: string) => {
        const bookmark = bookmarks.find(b => b.id === id);
        if (!bookmark) return;
        const previousBookmarks = [...bookmarks];
        setBookmarks(prev => prev.map(b =>
            b.id === id ? { ...b, isFavorite: !b.isFavorite } : b
        ));
        try {
            const res = await fetch(`/api/bookmarks/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ isFavorite: !bookmark.isFavorite })
            });
            if (!res.ok) throw new Error("Failed to update");
            router.refresh();
        } catch (error) {
            console.error("Update failed", error);
            setBookmarks(previousBookmarks);
        }
    };

    const handleToggleRead = async (id: string) => {
        const bookmark = bookmarks.find(b => b.id === id);
        if (!bookmark) return;
        const previousBookmarks = [...bookmarks];
        setBookmarks(prev => prev.map(b =>
            b.id === id ? { ...b, isRead: !b.isRead } : b
        ));
        try {
            const res = await fetch(`/api/bookmarks/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ isRead: !bookmark.isRead })
            });
            if (!res.ok) throw new Error("Failed to update");
            router.refresh();
        } catch (error) {
            console.error("Update failed", error);
            setBookmarks(previousBookmarks);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#020617] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Stats Section */}
                <StatsCard stats={stats} />

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Toolbar */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-0 z-10 bg-gray-50/95 dark:bg-[#020617]/95 backdrop-blur-xl py-4 -my-4 px-2 -mx-2">
                            <div className="flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-1 rounded-xl shadow-sm">
                                {['all', 'favorites', 'unread'].map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => setActiveFilter(filter as any)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeFilter === filter
                                            ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                                            : 'text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                            }`}
                                    >
                                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-1 rounded-xl shadow-sm">
                                    <button
                                        onClick={() => setViewMode(ViewMode.GRID)}
                                        className={`p-2 rounded-lg transition-all duration-300 ${viewMode === ViewMode.GRID ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
                                    >
                                        <LayoutGrid className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode(ViewMode.LIST)}
                                        className={`p-2 rounded-lg transition-all duration-300 ${viewMode === ViewMode.LIST ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
                                    >
                                        <List className="w-4 h-4" />
                                    </button>
                                </div>

                                <AddBookmarkModal />
                            </div>
                        </div>

                        {/* Grid */}
                        <div className={`grid gap-6 ${viewMode === ViewMode.GRID ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                            {filteredBookmarks.map((bookmark) => (
                                <BookmarkCard
                                    key={bookmark.id}
                                    bookmark={bookmark}
                                    viewMode={viewMode}
                                    onToggleFavorite={handleToggleFavorite}
                                    onDelete={handleDelete}
                                    onToggleRead={handleToggleRead}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Sidebar / Recent Activity */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm sticky top-24">
                            <div className="flex items-center gap-2 mb-6 font-semibold text-gray-900 dark:text-white">
                                <div className="p-1.5 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                                    <Clock size={16} />
                                </div>
                                <h3>Recent Activity</h3>
                            </div>
                            <div className="space-y-5">
                                {bookmarks.slice(0, 5).map((bookmark) => (
                                    <div key={bookmark.id} className="flex gap-3 items-start group cursor-pointer" onClick={() => router.push(`/reader/${bookmark.id}`)}>
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0 group-hover:scale-125 transition-all duration-300" />
                                        <div>
                                            <p className="text-sm font-medium line-clamp-1 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{bookmark.title}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {formatDistanceToNow(new Date(bookmark.createdAt), { addSuffix: true })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                {bookmarks.length === 0 && (
                                    <p className="text-sm text-gray-500 italic">No recent activity.</p>
                                )}
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                                <div className="flex items-center gap-2 mb-4 font-semibold text-gray-900 dark:text-white">
                                    <div className="p-1.5 rounded-md bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                                        <TrendingUp size={16} />
                                    </div>
                                    <h3>Trending Tags</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {['AI', 'Design', 'Next.js', 'React'].map(tag => (
                                        <span key={tag} className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-all duration-300 border border-gray-200 dark:border-gray-700">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
