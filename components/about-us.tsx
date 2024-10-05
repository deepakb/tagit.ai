"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { BookmarkIcon, Search, Users, Zap } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

export function AboutUs() {
  const controls = useAnimation()

  const features = [
    {
      icon: BookmarkIcon,
      title: "Smart Organization",
      description:
        "Effortlessly manage your bookmarks with AI-powered categories.",
    },
    {
      icon: Zap,
      title: "Quick Access",
      description:
        "Find what you need instantly with our intuitive search and suggestions.",
    },
    {
      icon: Search,
      title: "Discover More",
      description:
        "Get personalized recommendations based on your browsing habits.",
    },
    {
      icon: Users,
      title: "Built for Everyone",
      description:
        "Perfect for students, researchers, professionals, and casual browsers alike.",
    },
  ]

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, ease: "easeInOut" },
        opacity: { duration: 0.5 },
      },
    },
  }

  useEffect(() => {
    controls.start("visible")
  }, [controls])

  return (
    <section
      id="about"
      className="w-full overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 py-12 dark:from-blue-900 dark:to-purple-900 md:py-24 lg:py-32"
    >
      <div className="container relative px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center space-y-4 text-center"
        >
          <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold tracking-tighter text-transparent sm:text-5xl md:text-6xl">
            About Bookmarq
          </h2>
          <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Transform the way you save, organize, and discover content online
            with Bookmarq—the AI-powered bookmarking tool built for efficiency.
          </p>
        </motion.div>

        <div className="relative mt-16">
          <svg
            className="absolute left-0 top-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0,50 C25,20 75,80 100,50"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="0.5"
              variants={lineVariants}
              initial="hidden"
              animate={controls}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
                  <CardContent className="flex h-full flex-col items-center p-6 text-center">
                    <feature.icon className="mb-4 h-12 w-12 text-blue-600 dark:text-blue-400" />
                    <h3 className="mb-2 text-lg font-semibold">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative mt-16 overflow-hidden rounded-lg"
        >
          <div className="relative z-10 bg-white p-8 dark:bg-gray-800 md:p-12">
            <h3 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
              Unlock Your Digital Potential
            </h3>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Whether you are a student, researcher, or professional, our
              browser extension helps you find what you need, when you need
              it—without endless scrolling. Unlock faster access, personalized
              recommendations, and a clutter-free digital life with Bookmarq.
            </p>
            <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
              Start saving time today and stay ahead with the ultimate bookmark
              manager!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
