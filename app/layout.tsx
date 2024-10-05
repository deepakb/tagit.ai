"use client"

import "@/styles/globals.css"

import Link from "next/link"

import { fontPoppins, fontSans } from "@/lib/font"
import { Header } from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontPoppins.variable} font-sans`}
    >
      <body className="font-poppins bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t border-border px-4 py-6 sm:flex-row md:px-6">
              <p className="text-xs text-muted-foreground">
                © 2024 Bookmarkq.ai. All rights reserved.
              </p>
              <nav className="flex gap-4 sm:ml-auto sm:gap-6">
                <Link
                  className="text-xs text-foreground underline-offset-4 hover:underline"
                  href="#"
                >
                  Terms of Service
                </Link>
                <Link
                  className="text-xs text-foreground underline-offset-4 hover:underline"
                  href="#"
                >
                  Privacy
                </Link>
              </nav>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
