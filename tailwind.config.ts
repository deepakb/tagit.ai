import { Config } from "tailwindcss"

import { defaultPreset } from "./themes/default/preset"

const config = {
  presets: [defaultPreset],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
} satisfies Config

export default config
