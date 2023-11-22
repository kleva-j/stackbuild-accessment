"use client";

import NextLink from "next/link";

import { Button, Flex, Link } from "@radix-ui/themes";
import { useUser, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";

const NavbarSkeleton = () => <div></div>;

export default function NavMenu() {
  const { isLoaded, isSignedIn } = useUser();

  const isHomePage = (usePathname() || "/").split("/")[1] !== "dashboard";

  if (!isLoaded) return <NavbarSkeleton />;
  if (!isSignedIn)
    return (
      <Flex align="center">
        <Button radius="large" variant="soft" asChild>
          <NextLink href="/sign-in">Sign In</NextLink>
        </Button>
      </Flex>
    );

  return (
    <Flex gap="4" align="center">
      <Link weight="bold" size="2" asChild mr="2">
        <NextLink href={`/${isHomePage ? "dashboard" : ""}`}>
          {isHomePage ? "Dashboard" : <Home size="18px" />}
        </NextLink>
      </Link>
      <UserButton afterSignOutUrl="/" />
    </Flex>
  );
}
