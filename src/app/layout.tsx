import "./globals.css";
import "@radix-ui/themes/styles.css";

import type { Metadata } from "next";

import { FontSans, FontMono } from "@/lib/fonts";
import { ClerkProvider } from "@clerk/nextjs";
import { PropsWithChildren } from "react";

// Context providers
import QueryClientProvider from "@/components/Providers/QueryClientProvider";
import ThemeProvider from "@/components/Providers/ThemeProvider";

// Layout components
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
          <QueryClientProvider>
            <ThemeProvider>
              <Header />
              {children}
              <Footer />
            </ThemeProvider>
          </QueryClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
