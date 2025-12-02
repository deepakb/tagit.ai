"use client"

import React from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { User, Settings as SettingsIcon, Palette, Shield } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="flex flex-col gap-8 p-6 max-w-4xl mx-auto w-full">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="appearance">Appearance</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="mt-6 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Preferences</CardTitle>
                            <CardDescription>Manage your general account preferences.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Auto-tagging</Label>
                                    <p className="text-sm text-muted-foreground">Automatically suggest tags for new bookmarks using AI.</p>
                                </div>
                                <Switch />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Offline Mode</Label>
                                    <p className="text-sm text-muted-foreground">Save bookmarks locally when offline.</p>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="profile" className="mt-6 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile</CardTitle>
                            <CardDescription>Update your personal information.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" defaultValue="Deepak B" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" defaultValue="deepak@example.com" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save Changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="appearance" className="mt-6 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Theme</CardTitle>
                            <CardDescription>Customize the look and feel of the app.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="border-2 border-blue-500 rounded-lg p-4 bg-white text-center cursor-pointer">
                                    <div className="h-20 bg-gray-100 rounded mb-2"></div>
                                    <span className="text-sm font-medium">Light</span>
                                </div>
                                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-950 text-center cursor-pointer">
                                    <div className="h-20 bg-gray-800 rounded mb-2"></div>
                                    <span className="text-sm font-medium text-white">Dark</span>
                                </div>
                                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-100 dark:bg-gray-900 text-center cursor-pointer">
                                    <div className="h-20 bg-gradient-to-br from-white to-gray-900 rounded mb-2"></div>
                                    <span className="text-sm font-medium">System</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
