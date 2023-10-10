"use client";

import { FileTextIcon, GearIcon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import { usePathname } from "next/navigation";

import Link from "next/link";

type NavLinks = {
  href: string;
  path: string;
  label: string;
  icon: typeof GearIcon;
}[];

const navLinks: NavLinks = [
  { href: "/dashboard", label: "blog", path: "dashboard", icon: FileTextIcon },
  {
    href: "/dashboard/settings",
    label: "settings",
    path: "settings",
    icon: GearIcon,
  },
];

export const Sidebar = () => {
  const pathname = usePathname() ?? "";
  const path = pathname.split("/").pop();

  return (
    <Flex direction="column" gap="2" className="w-40">
      {navLinks.map((item) => {
        const Icon = item.icon;
        const isActive = path == item.path;
        return (
          <Button
            key={item.label}
            variant="soft"
            className="cursor-pointer"
            {...(!isActive ? { color: "gray" } : {})}
          >
            <Flex justify="start" align="center" width="100%" gap="2">
              <Icon />
              <Link href={item.href} className="capitalize">
                {item.label}
              </Link>
            </Flex>
          </Button>
        );
      })}
    </Flex>
  );
};
