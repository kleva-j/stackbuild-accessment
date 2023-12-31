import NavMenu from "@/components/Layout/NavMenu";
import Link from "next/link";

import { Container, Text, Flex } from "@radix-ui/themes";
import { Twitter } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b-[0.5px] border-slate-300 px-4 transition-all dark:border-slate-600">
      <Container size="4">
        <nav className="flex h-16 items-center justify-between">
          <Link href="/" className="font-display flex items-center text-2xl">
            <Flex gap="2">
              <Twitter />
              <Text size="4" weight="bold">
                xwitter
              </Text>
            </Flex>
          </Link>
          <NavMenu />
        </nav>
      </Container>
    </header>
  );
}
