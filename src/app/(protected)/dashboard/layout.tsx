import { Sidebar } from "@/app/(protected)/dashboard/components/Sidebar";
import { Container, Flex } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Container pt="8">
      <Flex gap="8">
        <Sidebar />
        {children}
      </Flex>
    </Container>
  );
}
