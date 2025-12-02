"use client"

import { Search, Bell, User } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function DashboardHeader() {
    return (
        <header className="flex h-20 items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f172a] px-8">
            <div className="flex-1 max-w-xl">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search bookmarks, tags, or content..."
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm text-gray-900 dark:text-white placeholder:text-gray-400"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                        <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-1.5 font-mono text-[10px] font-medium text-gray-500 dark:text-gray-400">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <ThemeToggle />

                <button className="relative p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#0f172a]"></span>
                </button>

                <div className="h-8 w-px bg-gray-200 dark:bg-gray-800 mx-2"></div>

                <button className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-medium text-sm shadow-lg shadow-blue-500/20">
                        DB
                    </div>
                    <div className="hidden md:block text-left">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">Deepak B</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Pro Plan</div>
                    </div>
                </button>
            </div>
        </header>
    )
}
