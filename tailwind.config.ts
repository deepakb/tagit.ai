import type { Config } from "tailwindcss"
import { defaultPreset } from "./themes/default/preset"

const config = {
  presets: [defaultPreset],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
} satisfies Config

export default config
