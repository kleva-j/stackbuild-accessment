import { Sidebar } from "@/app/(protected)/dashboard/components/Sidebar";
import { Container, Flex } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Container my="8">
      <Flex gap={{ initial: "0", sm: "8" }} px="4">
        <Sidebar />
        {children}
      </Flex>
    </Container>
  );
}
