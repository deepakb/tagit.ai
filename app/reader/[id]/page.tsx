"use client"

import React from 'react';
import { ArrowLeft, Calendar, ExternalLink, Tag, Share2, Bookmark, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from 'date-fns';

export default function ReaderPage({ params }: { params: { id: string } }) {
    // Mock data - in a real app, fetch based on params.id
    const bookmark = {
        id: params.id,
        title: "Understanding Server Components in Next.js 13",
        url: "https://nextjs.org/docs/getting-started/react-essentials",
        description: "A deep dive into how Server Components work, why they are useful, and how to use them effectively in your Next.js applications. This guide covers the mental model, data fetching, and composition patterns.",
        content: `
            <p>React Server Components allow you to write UI that can be rendered and optionally cached on the server. In Next.js, the rendering work is further split by route segments to enable streaming and partial rendering, and there are three different server rendering strategies:</p>
            <ul>
                <li>Static Rendering</li>
                <li>Dynamic Rendering</li>
                <li>Streaming</li>
            </ul>
            <p>This page guides you through how Server Components work, why you might use them, and how to use them in your Next.js App Router projects.</p>
            <h2>Why Server Components?</h2>
            <p>Server Components allow developers to better leverage server infrastructure. For example, you can move data fetching to the server, closer to your database, and keep large dependencies on the server so they don't impact client-side bundle size.</p>
        `,
        imageUrl: "https://picsum.photos/seed/nextjs/800/400",
        createdAt: new Date('2023-10-25'),
        tags: [
            { id: '1', name: 'Next.js' },
            { id: '2', name: 'React' },
            { id: '3', name: 'Frontend' }
        ],
        author: "Vercel Team"
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#020617] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Back Navigation */}
                <div className="mb-6">
                    <Link href="/dashboard" className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to Dashboard
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">

                            {/* Hero Image */}
                            <div className="h-64 w-full relative">
                                <img
                                    src={bookmark.imageUrl}
                                    alt={bookmark.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-6 right-6">
                                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight shadow-sm">
                                        {bookmark.title}
                                    </h1>
                                    <div className="flex items-center gap-4 text-white/90 text-sm">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4" />
                                            {formatDistanceToNow(bookmark.createdAt, { addSuffix: true })}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Avatar className="w-5 h-5 border border-white/20">
                                                <AvatarImage src="https://github.com/vercel.png" />
                                                <AvatarFallback>VT</AvatarFallback>
                                            </Avatar>
                                            {bookmark.author}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Body */}
                            <div className="p-6 md:p-10">
                                <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100 dark:border-gray-800">
                                    <div className="flex gap-2">
                                        {bookmark.tags.map(tag => (
                                            <Badge key={tag.id} variant="secondary" className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border-transparent">
                                                #{tag.name}
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600">
                                            <Share2 className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-yellow-500">
                                            <Bookmark className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="prose prose-slate dark:prose-invert max-w-none">
                                    <p className="lead text-lg text-gray-600 dark:text-gray-300 mb-6 font-medium">
                                        {bookmark.description}
                                    </p>
                                    <div dangerouslySetInnerHTML={{ __html: bookmark.content }} />
                                </div>

                                <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-center">
                                    <a
                                        href={bookmark.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors shadow-lg shadow-blue-500/20"
                                    >
                                        Read Original Article
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* AI Summary Card */}
                        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                                    <Tag className="w-4 h-4" />
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">AI Key Takeaways</h3>
                            </div>
                            <ul className="space-y-3">
                                {[
                                    "Server Components run on the server.",
                                    "Reduced client-side bundle size.",
                                    "Direct access to backend resources.",
                                    "Automatic code splitting."
                                ].map((point, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-gray-600 dark:text-gray-300">
                                        <span className="text-purple-500 font-bold">•</span>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Related Bookmarks */}
                        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Related Content</h3>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex gap-3 group cursor-pointer">
                                        <div className="w-16 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shrink-0">
                                            <img src={`https://picsum.photos/seed/${i}/100/100`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                Advanced Patterns in React Composition
                                            </h4>
                                            <p className="text-xs text-gray-500 mt-1">5 min read</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
