"use client"

import React from 'react';
import { LogOut, Settings, User, Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ProfileDropdown() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="outline-none rounded-full ring-2 ring-transparent hover:ring-blue-500/20 transition-all">
                    <Avatar className="h-9 w-9 border border-gray-200 dark:border-gray-700">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>DB</AvatarFallback>
                    </Avatar>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white dark:bg-[#0f172a] border-gray-200 dark:border-gray-800" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none text-gray-900 dark:text-white">Deepak B</p>
                        <p className="text-xs leading-none text-gray-500 dark:text-gray-400">deepak@example.com</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-100 dark:bg-gray-800" />
                <DropdownMenuItem asChild className="focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-gray-900 dark:focus:text-white cursor-pointer">
                    <Link href="/settings">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-gray-900 dark:focus:text-white cursor-pointer">
                    <Link href="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-gray-900 dark:focus:text-white cursor-pointer">
                        <Monitor className="mr-2 h-4 w-4" />
                        <span>Theme</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent className="bg-white dark:bg-[#0f172a] border-gray-200 dark:border-gray-800">
                            <DropdownMenuItem onClick={() => setTheme("light")} className="focus:bg-gray-100 dark:focus:bg-gray-800 cursor-pointer">
                                <Sun className="mr-2 h-4 w-4" />
                                <span>Light</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")} className="focus:bg-gray-100 dark:focus:bg-gray-800 cursor-pointer">
                                <Moon className="mr-2 h-4 w-4" />
                                <span>Dark</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")} className="focus:bg-gray-100 dark:focus:bg-gray-800 cursor-pointer">
                                <Monitor className="mr-2 h-4 w-4" />
                                <span>System</span>
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>

                <DropdownMenuSeparator className="bg-gray-100 dark:bg-gray-800" />
                <DropdownMenuItem className="text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-900/10 focus:text-red-600 dark:focus:text-red-400 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
