"use client"

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface Stats {
    total: number;
    unread: number;
    favorites: number;
    tagsCount: number;
}

interface Props {
    stats: Stats;
}

export const StatsCard: React.FC<Props> = ({ stats }) => {
    const data = [
        { name: 'Unread', value: stats.unread, color: '#f59e0b' },
        { name: 'Read', value: stats.total - stats.unread, color: '#10b981' },
    ];

    return (
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-8 relative overflow-hidden">
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="flex-1 z-10">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Knowledge Pulse</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Your library is growing. You&apos;ve curated <span className="font-semibold text-blue-500">{stats.total} items</span> so far.
                </p>

                <div className="flex gap-4">
                    <div className="flex-1 p-3 bg-gray-50 dark:bg-[#1e293b] rounded-lg border border-gray-100 dark:border-gray-800">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Saved</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
                    </div>
                    <div className="flex-1 p-3 bg-gray-50 dark:bg-[#1e293b] rounded-lg border border-gray-100 dark:border-gray-800">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">To Read</div>
                        <div className="text-2xl font-bold text-amber-500">{stats.unread}</div>
                    </div>
                    <div className="flex-1 p-3 bg-gray-50 dark:bg-[#1e293b] rounded-lg border border-gray-100 dark:border-gray-800">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Favorites</div>
                        <div className="text-2xl font-bold text-yellow-500">{stats.favorites}</div>
                    </div>
                </div>
            </div>

            <div className="w-32 h-32 relative shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={28}
                            outerRadius={40}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                            itemStyle={{ color: '#fff' }}
                            cursor={false}
                        />
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Ratio</div>
                </div>
            </div>
        </div>
    );
};
