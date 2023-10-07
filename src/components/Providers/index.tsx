"use client";

import { Theme, ThemePanel } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";

export default function Providers(props: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class">
      <Theme>
        {props.children}
        <ThemePanel />
      </Theme>
    </ThemeProvider>
  );
}
