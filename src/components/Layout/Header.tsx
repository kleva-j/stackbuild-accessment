"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@radix-ui/themes";

export default function Header() {
  return (
    <header className="fixed top-0 z-30 flex w-full justify-center transition-all">
      <nav className="mx-5 flex h-16 w-full max-w-screen-xl items-center justify-between">
        <Link href="/" className="font-display flex items-center text-2xl">
          <Image
            src="/logo.png"
            alt="logo"
            width="30"
            height="30"
            className="mr-2 rounded-sm"
          ></Image>
          <p>Accessment</p>
        </Link>
        <div>
          <Button radius="large" variant="soft">
            Sign In
          </Button>
        </div>
      </nav>
    </header>
  );
}
