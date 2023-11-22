import "./globals.css";
import "@radix-ui/themes/styles.css";

import type { PropsWithChildren } from "react";
import type { Metadata } from "next";

import { FontSans, FontMono } from "@/lib/fonts";
import { ClerkProvider } from "@clerk/nextjs";

import ThemeProvider from "@/components/Providers/ThemeProvider";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export const metadata: Metadata = {
  title: "StackBuild",
  description: "StackBuild Accessment.",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${FontSans.variable} ${FontMono.variable} font-sans`}>
          <ThemeProvider>
            <div className="flex h-screen flex-col">
              <Header />
              <div className="flex-1 px-4">{children}</div>
              <Footer />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
