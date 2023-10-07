import "./globals.css";
import "@radix-ui/themes/styles.css";

import type { Metadata } from "next";

import { FontSans, FontMono } from "@/lib/fonts";
import { PropsWithChildren } from "react";

import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "StackBuild",
  description: "StackBuild Accessment.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${FontSans.variable} ${FontMono.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
