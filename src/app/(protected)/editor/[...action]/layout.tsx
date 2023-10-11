import { Container } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

export default function EditorLayout({ children }: PropsWithChildren) {
  return <Container>{children}</Container>;
}
