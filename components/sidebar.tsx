"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Logo } from "@/components/logo"
import { Home, Tag, Star, Archive, Settings, LogOut, Plus, Folder } from "lucide-react"
import { AddCollectionModal } from "@/components/add-collection-modal"

export function Sidebar() {
    const pathname = usePathname()

    const isActive = (path: string) => pathname === path

    return (
        <div className="flex h-full w-64 flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f172a]">
            <div className="flex h-20 items-center px-6">
                <Logo textSize="text-xl" iconSize="w-8 h-8" />
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-4 space-y-8">
                {/* Main Navigation */}
                <nav className="space-y-1">
                    <Link
                        href="/dashboard"
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${isActive('/dashboard')
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                    >
                        <Home className="h-4 w-4" />
                        Dashboard
                    </Link>
                    <Link
                        href="/bookmarks"
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${isActive('/bookmarks')
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                    >
                        <Tag className="h-4 w-4" />
                        All Bookmarks
                    </Link>
                    <Link
                        href="/favorites"
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${isActive('/favorites')
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                    >
                        <Star className="h-4 w-4" />
                        Favorites
                    </Link>
                    <Link
                        href="/archive"
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${isActive('/archive')
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                    >
                        <Archive className="h-4 w-4" />
                        Archive
                    </Link>
                </nav>

                {/* Collections */}
                <div>
                    <div className="flex items-center justify-between px-2 mb-2">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Collections</h3>
                        <AddCollectionModal />
                    </div>
                    <nav className="space-y-1">
                        {['Frontend', 'AI Research', 'Design System', 'Startups'].map((collection, i) => (
                            <Link
                                key={collection}
                                href={`/collections/${collection.toLowerCase().replace(' ', '-')}`}
                                className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200 transition-all group"
                            >
                                <span className={`w-2 h-2 rounded-full ${['bg-blue-400', 'bg-purple-400', 'bg-pink-400', 'bg-orange-400'][i]}`}></span>
                                {collection}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <nav className="space-y-1">
                    <Link
                        href="/settings"
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200 transition-all"
                    >
                        <Settings className="h-4 w-4" />
                        Settings
                    </Link>
                    <button className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all">
                        <LogOut className="h-4 w-4" />
                        Log out
                    </button>
                </nav>
            </div>
        </div>
    )
}
