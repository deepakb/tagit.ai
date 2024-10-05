import { fontFamily } from "tailwindcss/defaultTheme"
import plugin from "tailwindcss/plugin"

export const defaultPlugin = plugin(
  function ({ addBase }) {
    // addBase({
    //   ":root": {
    //     // Light mode colors
    //     "--background": "210 20% 98%", // Light gray background
    //     "--foreground": "220 15% 10%", // Dark gray text
    //     "--muted": "220 10% 90%", // Light muted background
    //     "--muted-foreground": "220 9% 46%", // Muted foreground
    //     "--primary": "220 90% 55%", // Vibrant blue
    //     "--primary-foreground": "0 0% 100%", // White text on primary
    //     "--secondary": "150 70% 45%", // Bright green for secondary
    //     "--secondary-foreground": "0 0% 100%", // White text on secondary
    //     "--accent": "280 85% 65%", // Vibrant purple accent
    //     "--accent-foreground": "0 0% 100%", // White text on accent
    //     "--destructive": "0 80% 55%", // Vibrant red
    //     "--destructive-foreground": "0 0% 100%", // White text on destructive
    //     "--border": "220 10% 85%", // Light border
    //     "--input": "220 10% 85%", // Light input background
    //     "--ring": "220 15% 70%", // Border/ring for focus
    //     "--radius": "0.5rem",
    //   },
    //   ".dark": {
    //     // Dark mode colors
    //     "--background": "220 30% 10%", // Dark background
    //     "--foreground": "0 0% 95%", // Light text on dark
    //     "--muted": "220 25% 15%", // Muted dark background
    //     "--muted-foreground": "220 15% 65%", // Muted dark foreground
    //     "--primary": "220 80% 65%", // Lighter blue for dark mode
    //     "--primary-foreground": "0 0% 10%", // Dark text on primary in dark mode
    //     "--secondary": "150 60% 50%", // Bright green secondary
    //     "--secondary-foreground": "0 0% 10%", // Dark text on secondary
    //     "--accent": "280 75% 70%", // Vibrant purple for dark mode
    //     "--accent-foreground": "0 0% 10%", // Dark text on accent
    //     "--destructive": "0 70% 60%", // Slightly muted red for dark mode
    //     "--destructive-foreground": "0 0% 10%", // Dark text on destructive
    //     "--border": "220 20% 30%", // Dark border
    //     "--input": "220 20% 30%", // Dark input background
    //     "--ring": "220 25% 40%", // Ring for focus
    //     "--radius": "0.5rem", // Border-radius
    //   },
    // }),
    addBase({
      "*": {
        "@apply border-border": {},
      },
      body: {
        "@apply bg-background text-foreground": {},
        "font-feature-settings": '"rlig" 1, "calt" 1',
      },
    })
  },
  {
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      extend: {
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
        },
        borderRadius: {
          lg: `var(--radius)`,
          md: `calc(var(--radius) - 2px)`,
          sm: "calc(var(--radius) - 4px)",
        },
        fontFamily: {
          sans: ["var(--font-sans)", ...fontFamily.sans],
          inter: ["var(--font-inter)", "sans-serif"],
          poppins: ["var(--font-poppins)", "sans-serif"],
        },
        keyframes: {
          "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },
      },
    },
  }
)
