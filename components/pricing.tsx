import { motion } from "framer-motion"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function PricingSection() {
  const tiers = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started",
      features: [
        "Up to 100 bookmarks",
        "Basic AI categorization",
        "Chrome extension",
        "1 device sync",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$9.99",
      description: "Ideal for power users",
      features: [
        "Unlimited bookmarks",
        "Advanced AI categorization",
        "All browser extensions",
        "Unlimited device sync",
        "Custom tags",
        "Priority support",
      ],
      cta: "Upgrade to Pro",
      highlighted: true,
    },
    {
      name: "Team",
      price: "$19.99",
      description: "Best for small teams",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Shared collections",
        "Admin controls",
        "API access",
        "Dedicated account manager",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ]

  return (
    <section
      id="pricing"
      className="w-full bg-background py-12 md:py-24 lg:py-32"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-5xl">
              Choose Your Plan
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Select the perfect plan for your bookmarking needs. Upgrade or
              downgrade at any time.
            </p>
          </motion.div>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col rounded-lg bg-card p-6 text-card-foreground shadow-lg ${
                tier.highlighted ? "ring-2 ring-primary" : ""
              }`}
            >
              <h3 className="text-2xl font-bold">{tier.name}</h3>
              <p className="mt-2 text-muted-foreground">{tier.description}</p>
              <p className="mt-4">
                <span className="text-4xl font-extrabold">{tier.price}</span>
                <span className="text-base font-medium text-muted-foreground">
                  /month
                </span>
              </p>
              <ul className="mt-6 space-y-4">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="ml-3 text-base">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`mt-8 ${
                  tier.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {tier.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
