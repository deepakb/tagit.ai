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
import { Plus, FolderPlus } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

const COLORS = [
    { name: 'Blue', value: 'bg-blue-400' },
    { name: 'Purple', value: 'bg-purple-400' },
    { name: 'Pink', value: 'bg-pink-400' },
    { name: 'Orange', value: 'bg-orange-400' },
    { name: 'Green', value: 'bg-green-400' },
    { name: 'Red', value: 'bg-red-400' },
]

export function AddCollectionModal() {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const [selectedColor, setSelectedColor] = useState(COLORS[0].value)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch("/api/collections", {
                method: "POST",
                body: JSON.stringify({ name, color: selectedColor }),
            })

            if (!res.ok) throw new Error("Failed to create collection")

            setOpen(false)
            setName("")
            router.refresh()
        } catch (error) {
            console.error(error)
            alert("Failed to create collection")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="group flex items-center justify-center w-8 h-8 rounded-full bg-secondary/50 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-300 border border-transparent hover:border-primary/20">
                    <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden bg-[#0f172a]/95 backdrop-blur-xl shadow-2xl shadow-primary/10 border-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 pointer-events-none" />

                <DialogHeader className="p-6 pb-2 relative z-10">
                    <DialogTitle className="flex items-center gap-3 text-xl font-semibold tracking-tight">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                            <FolderPlus className="w-5 h-5" />
                        </div>
                        New Collection
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground/80 ml-1">
                        Create a space to organize your inspiration.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="p-6 pt-2 space-y-6 relative z-10">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Collection Name</Label>
                        <Input
                            id="name"
                            placeholder="e.g., Design Inspiration"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="bg-secondary/30 border-white/5 focus:border-primary/50 focus:ring-primary/20 transition-all h-11"
                        />
                    </div>

                    <div className="space-y-3">
                        <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Color Theme</Label>
                        <div className="flex flex-wrap gap-3">
                            {COLORS.map((color) => (
                                <button
                                    key={color.value}
                                    type="button"
                                    onClick={() => setSelectedColor(color.value)}
                                    className={`w-8 h-8 rounded-full ${color.value} transition-all duration-300 relative group ${selectedColor === color.value
                                        ? 'ring-2 ring-offset-2 ring-primary scale-110 ring-offset-background'
                                        : 'hover:scale-110 hover:shadow-lg opacity-80 hover:opacity-100'
                                        }`}
                                    title={color.name}
                                >
                                    {selectedColor === color.value && (
                                        <span className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-white shadow-sm" />
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <DialogFooter className="pt-2">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg shadow-primary/20 transition-all duration-300 h-11"
                        >
                            {loading ? "Creating..." : "Create Collection"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
