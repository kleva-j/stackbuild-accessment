"use client";

import { ThemeProvider as NextThemes } from "next-themes";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

export default function ThemeProvider(props: PropsWithChildren) {
  return (
    <NextThemes attribute="class">
      <Theme>
        {props.children}
        {/* <ThemePanel /> */}
      </Theme>
    </NextThemes>
  );
}
