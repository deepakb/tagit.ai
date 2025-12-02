import React from 'react';

interface Props {
    className?: string;
    iconSize?: string;
    textSize?: string;
}

export const Logo: React.FC<Props> = ({ className = "", iconSize = "w-8 h-8", textSize = "text-xl" }) => (
    <div className={`flex items-center gap-3 ${className} group cursor-pointer`}>
        <div className={`relative ${iconSize} flex items-center justify-center`}>
            {/* Abstract T shape with layers */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg shadow-lg shadow-blue-500/30 transform transition-transform group-hover:rotate-3 duration-300"></div>
            <div className="absolute inset-[2px] bg-white dark:bg-[#0f172a] rounded-md flex items-center justify-center overflow-hidden">
                {/* Internal geometry */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-blue-50 dark:bg-blue-900/20"></div>
                <div className="relative w-3/5 h-3/5 flex flex-col gap-1">
                    <div className="h-1.5 w-full bg-blue-600 rounded-full"></div>
                    <div className="flex gap-1 h-full">
                        <div className="w-1.5 h-full bg-indigo-500 rounded-full"></div>
                        <div className="flex-1 space-y-1 pt-1">
                            <div className="h-1 w-2/3 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                            <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Notification dot */}
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-sky-400 border-2 border-white dark:border-[#0f172a] rounded-full animate-pulse"></div>
        </div>
        <span className={`font-bold tracking-tight text-gray-900 dark:text-white ${textSize} font-sans`}>
            TagIt<span className="text-blue-600 dark:text-blue-400">.ai</span>
        </span>
    </div>
);
