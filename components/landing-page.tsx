"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { BrainCircuit, Chrome, Group, Search, Tag, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HeroIllustration } from "@/components/hero-illustration"
import PricingSection from "@/components/pricing"

import { AboutUs } from "./about-us"

export function EnhancedLandingPage() {
  const iconAnimation = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    },
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <section className="relative w-full overflow-hidden py-12 md:py-24 lg:py-32 xl:py-48">
        <motion.div
          className="absolute inset-0 opacity-30 dark:opacity-20"
          animate={{
            backgroundImage: [
              "radial-gradient(circle at 50% 50%, #3b82f6 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, #8b5cf6 0%, transparent 50%)",
              "radial-gradient(circle at 20% 80%, #3b82f6 0%, transparent 50%)",
              "radial-gradient(circle at 50% 50%, #8b5cf6 0%, transparent 50%)",
            ],
          }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        />
        <div className="container relative px-4 md:px-6">
          <div className="flex flex-col items-center gap-1 lg:flex-row">
            <div className="flex-1 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-2"
              >
                <h1 className="animate-gradient bg-gradient-hero from-hero-start via-hero-middle to-hero-end bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
                  Bookmarq
                </h1>
                <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 md:text-2xl">
                  Organize Smarter, Discover Faster
                </p>
                <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-lg">
                  Transform the way you save, organize, and discover content
                  online with Bookmarq—the AI-powered bookmarking tool built for
                  efficiency. Effortlessly manage your favorite links, articles,
                  and resources with intuitive categories and smart suggestions.
                </p>
                <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-lg">
                  Whether you&apos;re a student, researcher, or professional,
                  our browser extension helps you find what you need, when you
                  need it—without endless scrolling.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col gap-4 sm:flex-row"
              >
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
                  Get Started
                </Button>
                <Button variant="outline">Learn More</Button>
              </motion.div>
            </div>
            <div className="w-full max-w-md flex-1 lg:max-w-none">
              <HeroIllustration />
            </div>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="w-full bg-secondary py-12 text-secondary-foreground md:py-24 lg:py-32"
      >
        <div className="container px-4 md:px-6">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Key Features
            </span>
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center rounded-lg bg-card p-6 text-center text-card-foreground shadow-lg"
            >
              <motion.div
                variants={iconAnimation}
                initial="hidden"
                animate="visible"
              >
                <BrainCircuit className="mb-4 h-12 w-12 text-primary" />
              </motion.div>
              <h3 className="mb-2 text-xl font-bold">
                AI-Powered Organization
              </h3>
              <p className="text-muted-foreground">
                Our AI automatically categorizes and tags your bookmarks for
                effortless retrieval.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center rounded-lg bg-card p-6 text-center text-card-foreground shadow-lg"
            >
              <motion.div
                variants={iconAnimation}
                initial="hidden"
                animate="visible"
              >
                <Zap className="mb-4 h-12 w-12 text-primary" />
              </motion.div>
              <h3 className="mb-2 text-xl font-bold">Smart Recommendations</h3>
              <p className="text-muted-foreground">
                Discover new content based on your browsing habits and
                interests.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center rounded-lg bg-card p-6 text-center text-card-foreground shadow-lg"
            >
              <motion.div
                variants={iconAnimation}
                initial="hidden"
                animate="visible"
              >
                <Chrome className="mb-4 h-12 w-12 text-primary" />
              </motion.div>
              <h3 className="mb-2 text-xl font-bold">Seamless Integration</h3>
              <p className="text-muted-foreground">
                Our browser extension works across all major browsers for a
                unified experience.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="w-full bg-background py-12 text-foreground md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-center text-3xl font-bold tracking-tighter text-transparent sm:text-5xl">
            Advanced Features
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center rounded-lg bg-card p-6 text-center text-card-foreground shadow-lg"
            >
              <motion.div
                variants={iconAnimation}
                initial="hidden"
                animate="visible"
              >
                <Tag className="mb-4 h-12 w-12 text-primary" />
              </motion.div>
              <h3 className="mb-2 text-xl font-bold">Custom Tagging</h3>
              <p className="text-muted-foreground">
                Create and manage your own tags for personalized organization.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center rounded-lg bg-card p-6 text-center text-card-foreground shadow-lg"
            >
              <motion.div
                variants={iconAnimation}
                initial="hidden"
                animate="visible"
              >
                <Group className="mb-4 h-12 w-12 text-primary" />
              </motion.div>
              <h3 className="mb-2 text-xl font-bold">AI Auto-Grouping</h3>
              <p className="text-muted-foreground">
                Let our AI automatically group related bookmarks for better
                organization.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center rounded-lg bg-card p-6 text-center text-card-foreground shadow-lg"
            >
              <motion.div
                variants={iconAnimation}
                initial="hidden"
                animate="visible"
              >
                <Search className="mb-4 h-12 w-12 text-primary" />
              </motion.div>
              <h3 className="mb-2 text-xl font-bold">Seamless Search</h3>
              <p className="text-muted-foreground">
                Find any bookmark instantly with our powerful search
                functionality.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <AboutUs />
      <section
        id="extension"
        className="w-full bg-secondary py-12 text-secondary-foreground md:py-24 lg:py-32"
      >
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <motion.img
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              alt="TagIt.ai Browser Extension Screenshot"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center shadow-2xl sm:w-full lg:order-last"
              height="310"
              src="/placeholder.svg?height=310&width=550"
              width="550"
            />
            <div className="flex flex-col justify-center space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-2"
              >
                <h2 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-3xl font-bold tracking-tighter text-transparent sm:text-5xl">
                  Browser Extension
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Save and organize your bookmarks with a single click. Our
                  powerful browser extension brings the full capability of
                  TagIt.ai right to your fingertips, no matter where you browse.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col gap-2 min-[400px]:flex-row"
              >
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Download for Chrome
                </Button>
                <Button variant="outline">Other Browsers</Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <section id="pricing">
        <PricingSection />
      </section>
      <section id="cta" className="w-full bg-muted py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-2"
            >
              <h2 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-3xl font-bold tracking-tighter text-transparent md:text-4xl/tight">
                Ready to Transform Your Bookmarking Experience?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of users who have revolutionized the way they
                save and access information online with TagIt.ai.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full max-w-sm space-y-2"
            >
              <form className="flex space-x-2">
                <Input
                  className="max-w-lg flex-1"
                  placeholder="Enter your email"
                  type="email"
                />
                <Button
                  type="submit"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Sign Up
                </Button>
              </form>
              <p className="text-xs text-muted-foreground">
                Start your free trial today. No credit card required.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
