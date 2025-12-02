import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen w-full bg-gray-50 dark:bg-[#020617]">
            <div className="hidden md:block fixed inset-y-0 z-50 w-64">
                <Sidebar />
            </div>
            <div className="flex flex-col w-full md:pl-64 transition-all duration-300">
                <DashboardHeader />
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    )
}
