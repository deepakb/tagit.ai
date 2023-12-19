import type { Config } from "tailwindcss"
import animatePlugin from "tailwindcss-animate"

import { defaultPlugin } from "./plugin"

export const defaultPreset = {
  darkMode: "class",
  content: [],
  plugins: [animatePlugin, defaultPlugin],
} satisfies Config
