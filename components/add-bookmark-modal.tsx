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
} from "@/components/ui/dialog" // Need to create Dialog
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea" // Need to create Textarea
import { Plus } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function AddBookmarkModal() {
    const [open, setOpen] = useState(false)
    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // 1. Save Bookmark
            const res = await fetch("/api/bookmarks", {
                method: "POST",
                body: JSON.stringify({ url, title: url }),
            })

            if (!res.ok) throw new Error("Failed to save bookmark")

            const bookmark = await res.json()

            // 2. Get AI Suggestions (optimistic, don't block UI too long if not needed, but here we wait)
            // In a real app, we might want to show these to the user first.
            // For MVP, we'll just trigger it and let it save in the background or show a toast.

            try {
                await fetch("/api/ai/tag", {
                    method: "POST",
                    body: JSON.stringify({
                        bookmarkId: bookmark.id,
                        bookmarkData: { url, title: url }
                    })
                })
            } catch (aiError) {
                console.error("AI Tagging failed", aiError)
            }

            setOpen(false)
            setUrl("")
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
                <Button className="gap-2">
                    <Plus size={16} />
                    Add Bookmark
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Bookmark</DialogTitle>
                    <DialogDescription>
                        Paste a URL to save it. AI will automatically tag it for you.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="url">URL</Label>
                        <Input
                            id="url"
                            placeholder="https://example.com"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />
                    </div>
                </form>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit} disabled={loading}>
                        {loading ? "Saving..." : "Save Bookmark"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
