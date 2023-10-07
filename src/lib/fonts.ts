import { Inter, Fira_Mono } from "next/font/google";

export const FontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const FontMono = Fira_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
});
