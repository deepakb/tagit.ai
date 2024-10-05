"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { BookmarkIcon, UserCircle2 } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const isLoggedIn = false

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY) {
        setIsHeaderVisible(false)
      } else {
        setIsHeaderVisible(true)
      }

      setLastScrollY(currentScrollY)
      setShowScrollToTop(currentScrollY > 300)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const headerHeight = 56 // Approximate height of the header
      const targetPosition = section.offsetTop - headerHeight
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  }

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const headerVariants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: -100, opacity: 0 },
  }

  const navItemVariants = {
    hover: {
      scale: 1.1,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.pageYOffset > 300)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <AnimatePresence>
        {isHeaderVisible && (
          <motion.header
            className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background shadow-md"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={headerVariants}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto flex h-14 items-center justify-between px-4 lg:px-6">
              <div className="flex items-center">
                <Link className="mr-6 flex items-center" href="/">
                  <BookmarkIcon className="mr-2 h-6 w-6" />
                  <span className="bg-gradient-hero from-hero-start via-hero-middle to-hero-end bg-clip-text  text-xl font-bold tracking-tight text-transparent">
                    Bookmarq
                  </span>
                </Link>
                <nav className="flex items-center gap-2 sm:gap-4">
                  {["features", "extension", "pricing", "about"].map((item) => (
                    <motion.button
                      key={item}
                      className="text-sm font-medium underline-offset-4 hover:underline"
                      onClick={() => scrollToSection(item)}
                      whileHover="hover"
                      variants={navItemVariants}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </motion.button>
                  ))}
                </nav>
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                {isLoggedIn ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <motion.button
                        className="rounded-full p-2 transition-colors hover:bg-muted"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <UserCircle2 className="h-5 w-5" />
                      </motion.button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Log out</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/login"
                      className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                      Login
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            className="fixed bottom-4 right-4 rounded-full bg-primary p-2 text-primary-foreground shadow-lg"
            onClick={handleScrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
