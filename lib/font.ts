import { Inter, Poppins } from "next/font/google"

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontPoppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})
