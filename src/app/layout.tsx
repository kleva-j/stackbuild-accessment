import "./globals.css";
import "@radix-ui/themes/styles.css";

import type { Metadata } from "next";

import { FontSans, FontMono } from "@/lib/fonts";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth";
import { PropsWithChildren } from "react";

// Context providers
import QueryClientProvider from "@/components/Providers/QueryClientProvider";
import SessionProvider from "@/components/Providers/SessionProvider";
import ThemeProvider from "@/components/Providers/ThemeProvider";

// Layout components
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export const metadata: Metadata = {
  title: "StackBuild",
  description: "StackBuild Accessment.",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${FontSans.variable} ${FontMono.variable} font-sans`}>
        <QueryClientProvider>
          <SessionProvider session={session}>
            <ThemeProvider>
              <Header />
              {children}
              <Footer />
            </ThemeProvider>
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
