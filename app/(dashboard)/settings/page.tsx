"use client"

import React from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { User, Settings as SettingsIcon, Palette, Shield, Bell, Smartphone, Zap, LogOut } from 'lucide-react';
import { useTheme } from "next-themes"

export default function SettingsPage() {
    const { setTheme, theme } = useTheme()

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#020617] transition-colors duration-300">
            <div className="flex flex-col lg:flex-row gap-8 p-6 max-w-7xl mx-auto w-full">
                {/* Sidebar Navigation */}
                <div className="w-full lg:w-64 shrink-0 space-y-2">
                    <div className="mb-6 px-4">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your preferences</p>
                    </div>

                    <nav className="flex flex-col gap-1">
                        {[
                            { id: 'general', icon: SettingsIcon, label: 'General' },
                            { id: 'profile', icon: User, label: 'Profile' },
                            { id: 'appearance', icon: Palette, label: 'Appearance' },
                            { id: 'notifications', icon: Bell, label: 'Notifications' },
                            { id: 'security', icon: Shield, label: 'Security' },
                        ].map((item) => (
                            <Button
                                key={item.id}
                                variant="ghost"
                                className="justify-start gap-3 px-4 py-6 hover:bg-gray-200/50 dark:hover:bg-gray-800/50 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
                            >
                                <item.icon size={18} />
                                <span className="font-medium">{item.label}</span>
                            </Button>
                        ))}
                    </nav>

                    <div className="mt-8 px-4">
                        <div className="p-4 rounded-xl bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 shadow-sm">
                            <div className="flex items-center gap-2 mb-2 text-blue-600 dark:text-blue-400 font-semibold text-sm">
                                <Zap size={16} />
                                <span>Pro Plan</span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">You are on the Pro plan. Enjoy all God Tier features.</p>
                            <Button size="sm" variant="outline" className="w-full border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-white">Manage Subscription</Button>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 space-y-6">
                    {/* General Settings */}
                    <Card className="bg-white dark:bg-[#0f172a] border-gray-200 dark:border-gray-800 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                                <SettingsIcon size={20} className="text-gray-500 dark:text-gray-400" />
                                General Preferences
                            </CardTitle>
                            <CardDescription className="text-gray-500 dark:text-gray-400">Customize how TagIt.ai works for you.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-[#1e293b] border border-gray-100 dark:border-gray-800">
                                <div className="space-y-0.5">
                                    <Label className="text-base text-gray-900 dark:text-white">Auto-tagging with AI</Label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Automatically analyze and tag new bookmarks.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-[#1e293b] border border-gray-100 dark:border-gray-800">
                                <div className="space-y-0.5">
                                    <Label className="text-base text-gray-900 dark:text-white">Smart Summaries</Label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Generate concise summaries for every saved link.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-[#1e293b] border border-gray-100 dark:border-gray-800">
                                <div className="space-y-0.5">
                                    <Label className="text-base text-gray-900 dark:text-white">Offline Mode</Label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Cache content for reading without internet.</p>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Appearance Settings */}
                    <Card className="bg-white dark:bg-[#0f172a] border-gray-200 dark:border-gray-800 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                                <Palette size={20} className="text-gray-500 dark:text-gray-400" />
                                Appearance
                            </CardTitle>
                            <CardDescription className="text-gray-500 dark:text-gray-400">Choose your preferred visual theme.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div
                                    onClick={() => setTheme("light")}
                                    className={`cursor-pointer group relative rounded-xl border-2 p-1 transition-all duration-200 ${theme === 'light' ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-transparent hover:border-gray-200 dark:hover:border-gray-700'}`}
                                >
                                    <div className="h-24 rounded-lg bg-[#ffffff] border border-gray-200 shadow-sm flex items-center justify-center mb-2 overflow-hidden">
                                        <div className="w-full h-full p-3 space-y-2">
                                            <div className="w-3/4 h-2 bg-gray-100 rounded"></div>
                                            <div className="w-1/2 h-2 bg-gray-100 rounded"></div>
                                            <div className="w-full h-8 bg-blue-50 rounded mt-4"></div>
                                        </div>
                                    </div>
                                    <div className="text-center font-medium text-sm text-gray-900 dark:text-white">Light</div>
                                </div>

                                <div
                                    onClick={() => setTheme("dark")}
                                    className={`cursor-pointer group relative rounded-xl border-2 p-1 transition-all duration-200 ${theme === 'dark' ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-transparent hover:border-gray-200 dark:hover:border-gray-700'}`}
                                >
                                    <div className="h-24 rounded-lg bg-[#0f172a] border border-gray-800 shadow-sm flex items-center justify-center mb-2 overflow-hidden">
                                        <div className="w-full h-full p-3 space-y-2">
                                            <div className="w-3/4 h-2 bg-gray-800 rounded"></div>
                                            <div className="w-1/2 h-2 bg-gray-800 rounded"></div>
                                            <div className="w-full h-8 bg-blue-900/20 rounded mt-4"></div>
                                        </div>
                                    </div>
                                    <div className="text-center font-medium text-sm text-gray-900 dark:text-white">Dark</div>
                                </div>

                                <div
                                    onClick={() => setTheme("system")}
                                    className={`cursor-pointer group relative rounded-xl border-2 p-1 transition-all duration-200 ${theme === 'system' ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-transparent hover:border-gray-200 dark:hover:border-gray-700'}`}
                                >
                                    <div className="h-24 rounded-lg bg-gray-50 dark:bg-[#1e293b] border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-center mb-2">
                                        <Smartphone size={24} className="text-gray-400" />
                                    </div>
                                    <div className="text-center font-medium text-sm text-gray-900 dark:text-white">System</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Profile Settings */}
                    <Card className="bg-white dark:bg-[#0f172a] border-gray-200 dark:border-gray-800 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                                <User size={20} className="text-gray-500 dark:text-gray-400" />
                                Profile Information
                            </CardTitle>
                            <CardDescription className="text-gray-500 dark:text-gray-400">Update your personal details.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-gray-900 dark:text-white">Display Name</Label>
                                    <Input id="name" defaultValue="Deepak B" className="bg-gray-50 dark:bg-[#1e293b] border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white focus:ring-blue-500/20" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-gray-900 dark:text-white">Email Address</Label>
                                    <Input id="email" defaultValue="deepak@example.com" className="bg-gray-50 dark:bg-[#1e293b] border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white focus:ring-blue-500/20" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t border-gray-100 dark:border-gray-800 pt-6">
                            <Button variant="destructive" className="gap-2 bg-red-500 hover:bg-red-600 text-white">
                                <LogOut size={16} />
                                Sign Out
                            </Button>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all">
                                Save Changes
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
