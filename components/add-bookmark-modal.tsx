"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Link, Type } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function AddBookmarkModal() {
    const [open, setOpen] = useState(false)
    const [activeTab, setActiveTab] = useState("url")
    const [url, setUrl] = useState("")
    const [text, setText] = useState("")
    const [title, setTitle] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const payload = {
                url: activeTab === "url" ? url : undefined,
                text: activeTab === "text" ? text : undefined,
                title: title || (activeTab === "url" ? url : "Untitled Note"),
                type: activeTab
            }

            const res = await fetch("/api/bookmarks", {
                method: "POST",
                body: JSON.stringify(payload),
            })

            if (!res.ok) throw new Error("Failed to save bookmark")

            const bookmark = await res.json()

            // Trigger AI processing in background
            try {
                fetch("/api/ai/tag", {
                    method: "POST",
                    body: JSON.stringify({
                        bookmarkId: bookmark.id,
                        bookmarkData: payload
                    })
                })
            } catch (aiError) {
                console.error("AI Tagging failed", aiError)
            }

            setOpen(false)
            setUrl("")
            setText("")
            setTitle("")
            router.refresh()

        } catch (error) {
            console.error(error)
            alert("Failed to save bookmark")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/25 transition-all duration-300 rounded-xl px-5">
                    <Plus size={18} />
                    <span className="font-medium">Add New</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-[#0f172a]/95 backdrop-blur-xl shadow-2xl shadow-primary/10 border-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 pointer-events-none" />

                <DialogHeader className="p-6 pb-4 relative z-10">
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                        Create New Item
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground/80">
                        Save a link or write a quick note. AI will organize it for you.
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="url" className="w-full relative z-10" onValueChange={setActiveTab}>
                    <div className="px-6 mb-6">
                        <TabsList className="grid w-full grid-cols-2 p-1 bg-secondary/40 rounded-xl">
                            <TabsTrigger
                                value="url"
                                className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all"
                            >
                                <Link size={16} /> Link
                            </TabsTrigger>
                            <TabsTrigger
                                value="text"
                                className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all"
                            >
                                <Type size={16} /> Note
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Title (Optional)</Label>
                            <Input
                                id="title"
                                placeholder="Give it a catchy name..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="bg-secondary/30 border-white/5 focus:border-primary/50 focus:ring-primary/20 transition-all h-11"
                            />
                        </div>

                        <TabsContent value="url" className="mt-0 space-y-2">
                            <Label htmlFor="url" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">URL</Label>
                            <Input
                                id="url"
                                placeholder="https://example.com/amazing-article"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                required={activeTab === "url"}
                                className="bg-secondary/30 border-white/5 focus:border-primary/50 focus:ring-primary/20 transition-all h-11"
                            />
                        </TabsContent>

                        <TabsContent value="text" className="mt-0 space-y-2">
                            <Label htmlFor="text" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Content</Label>
                            <Textarea
                                id="text"
                                placeholder="Write your thoughts here..."
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                required={activeTab === "text"}
                                className="min-h-[120px] bg-secondary/30 border-white/5 focus:border-primary/50 focus:ring-primary/20 transition-all resize-none"
                            />
                        </TabsContent>

                        <DialogFooter className="mt-2">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg shadow-primary/20 transition-all duration-300 h-11 rounded-xl"
                            >
                                {loading ? "Saving..." : "Save to Library"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
