import "./globals.css";
import "@radix-ui/themes/styles.css";

import type { Metadata } from "next";

import { FontSans, FontMono } from "@/lib/fonts";
import { getServerSession } from "next-auth";
import { PropsWithChildren } from "react";

// Context providers
import SessionProvider from "@/components/Providers/SessionProvider";
import ThemeProvider from "@/components/Providers/ThemeProvider";

export const metadata: Metadata = {
  title: "StackBuild",
  description: "StackBuild Accessment.",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const session = await getServerSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${FontSans.variable} ${FontMono.variable} font-sans`}>
        <SessionProvider session={session}>
          <ThemeProvider>{children}</ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
