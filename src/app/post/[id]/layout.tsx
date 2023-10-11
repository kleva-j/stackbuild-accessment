import { Container } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

export default function PostLayout({ children }: PropsWithChildren) {
  return (
    <Container px="4" my="8">
      {children}
    </Container>
  );
}
