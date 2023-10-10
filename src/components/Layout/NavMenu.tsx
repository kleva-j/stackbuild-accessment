"use client";

import NextLink from "next/link";

import { Button, Avatar, Flex, Link, Box } from "@radix-ui/themes";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";

export default function NavMenu() {
  const { data: session } = useSession();

  const path = (usePathname() || "/").split("/")[1];
  const isHomePage = path !== "dashboard";

  if (session) {
    return (
      <Flex gap="4" align="center">
        <Link weight="bold" size="2" asChild mr="2">
          <NextLink href={`/${isHomePage ? "dashboard" : ""}`}>
            {isHomePage ? "Dashboard" : <Home size="18px" />}
          </NextLink>
        </Link>
        <Avatar
          src={
            session.user?.image ??
            "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
          }
          radius="full"
          size="2"
          fallback={
            <Box width="5" height="5">
              <svg viewBox="0 0 64 64" fill="currentColor">
                <path d="M41.5 14c4.687 0 8.5 4.038 8.5 9s-3.813 9-8.5 9S33 27.962 33 23 36.813 14 41.5 14zM56.289 43.609C57.254 46.21 55.3 49 52.506 49c-2.759 0-11.035 0-11.035 0 .689-5.371-4.525-10.747-8.541-13.03 2.388-1.171 5.149-1.834 8.07-1.834C48.044 34.136 54.187 37.944 56.289 43.609zM37.289 46.609C38.254 49.21 36.3 52 33.506 52c-5.753 0-17.259 0-23.012 0-2.782 0-4.753-2.779-3.783-5.392 2.102-5.665 8.245-9.472 15.289-9.472S35.187 40.944 37.289 46.609zM21.5 17c4.687 0 8.5 4.038 8.5 9s-3.813 9-8.5 9S13 30.962 13 26 16.813 17 21.5 17z" />
              </svg>
            </Box>
          }
        />
        <Button radius="large" variant="soft" onClick={() => signOut()}>
          Sign Out
        </Button>
      </Flex>
    );
  }

  return (
    <Flex align="center">
      <Button radius="large" variant="soft" onClick={() => signIn()}>
        Sign In
      </Button>
    </Flex>
  );
}
