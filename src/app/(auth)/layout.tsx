import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="grid h-full w-full place-items-center">{children}</div>
  );
}
